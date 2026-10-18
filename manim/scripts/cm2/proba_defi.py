# proba_defi.py
# EleveAI — Maths CM2 — série « Probabilités », épisode 5 : le grand défi
# (micro : probabilite_defi), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba_defi_short.py (combien de noires ajouter ?).
#
# Trois défis enchaînés, chacun « Mets pause, et cherche ! » puis sa correction.
# Écrans : 00 garde · 01 trois défis · 02 défi 1 (le sac : 4 noires, 6 vertes)
# · 02b correction (les billes en face à face, on en ajoute 2) · 03 défi 2 (deux
# stands, deux roues) · 03b correction (la roue A coupée en 12) · 04 défi 3 (le
# dé : faire 6 ou un nombre pair) · 04b correction · 05 ce que tu as appris
# (fin de la série) · 06 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm2/maths/probabilites.bank.ts, micro probabilite_defi) :
#   · « billes » (urneCanvas, genDefiAjout) : billes en grille de
#     min(6, max(3, ⌈√n⌉)) colonnes sur carte blanche, liseré ardoise, lettre
#     blanche cernée — noire #1f2937 « N », verte #22c55e « V » ;
#   · « roue » (urneCanvas / roueNum, deuxSacs) : secteurs égaux, départ en haut,
#     sens horaire, liseré ardoise, pointe noire en haut, moyeu ; les cases
#     GAGNANTES en jaune #eab308 comme les favorables de roueNum ;
#   · « de » (deCanvas, defi_fixed_4) : 6 faces en grille 3 × 2, faces
#     surlignées en ambre.
#
# Voix : manim/voix/cm2-proba-defi.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm2/proba_defi.py ProbaDefiCM2 -o eleveai-maths-cm2-proba-defi --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/05-defis/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
# ⚠️ seconde/ a aussi un proba_vocabulaire.py : on charge celui du CM2 par son chemin
import importlib.util  # noqa: E402

_spec = importlib.util.spec_from_file_location("cm2_proba_vocabulaire",
                                               Path(__file__).resolve().parent / "proba_vocabulaire.py")
_voc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_voc)
ARDOISE, BORD_GRIS, CARTE_FOND = _voc.ARDOISE, _voc.BORD_GRIS, _voc.CARTE_FOND
carte_de, surligner = _voc.carte_de, _voc.surligner

# couleurs du coach (HEX de la banque CM2)
C_NOIR = "#1f2937"
C_VERT = "#22c55e"
C_JAUNE = "#eab308"
C_PERD = "#cbd5e1"      # case perdante (sans couleur nommée) : gris clair
GRIS_ETEINT = "#6B7280"
CEINTURE = "jaune"


class NotionCM2(Notion6e):
    identite = "Maths CM2 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── canvas « billes » ───────────────────────────────────────────────────────

def bille(couleur, lettre, r=0.34):
    """Une bille du coach : disque coloré, liseré ardoise, lettre blanche cernée."""
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    if couleur == C_NOIR:
        d.set_stroke("#94a3b8", 3)  # la noire reste visible sur fond sombre
    l = Text(lettre, font_size=int(r * 72), color=WHITE, weight=BOLD)
    l.set_stroke(ARDOISE, width=2, background=True).move_to(d)
    return VGroup(d, l)  # N / V : redondant avec la couleur dite (toléré)


def noire(r=0.34):
    return bille(C_NOIR, "N", r)


def verte(r=0.34):
    return bille(C_VERT, "V", r)


def places_grille(n, pas, cols=None):
    """Les centres du canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉))."""
    cols = cols or min(6, max(3, math.ceil(math.sqrt(n))))
    return [P((i % cols) * pas, -(i // cols) * pas) for i in range(n)], cols


def carte_vide(n, pas, cols):
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    return fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))


def sac_autour(carte, couleur=WHITE):
    """Le sac (dessin) autour de la carte du coach : corps, col, lien orange."""
    corps = RoundedRectangle(width=carte.width + 0.7, height=carte.height + 0.7, corner_radius=0.5,
                             stroke_color=couleur, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.7, 0), P(0.7, 0), P(0.4, 0.4), P(-0.4, 0.4), stroke_color=couleur, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
    lien = Line(P(-0.5, 0), P(0.5, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
    return VGroup(corps, col, lien)


# ── canvas « roue » (les stands) ────────────────────────────────────────────

def disque_cases(n, gagnantes, r=1.25):
    """n secteurs égaux, départ en haut, sens horaire ; les `gagnantes` (indices)
    en jaune, les autres en gris clair. Renvoie un VGroup de secteurs."""
    g = VGroup()
    for i in range(n):
        debut = PI / 2 - i * 2 * PI / n
        g.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-2 * PI / n, start_angle=debut,
                            fill_color=C_JAUNE if i in gagnantes else C_PERD, fill_opacity=1,
                            stroke_color=ARDOISE, stroke_width=3))
    return g


def roue_stand(centre, n, gagnantes, r=1.25):
    """La roue du coach sur une carte blanche, pointe noire en haut, moyeu.
    Renvoie (tout, carte, disque)."""
    disque = disque_cases(n, gagnantes, r).move_to(centre)
    moyeu = Dot(centre, radius=r * 0.06, color=ARDOISE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ARDOISE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r - 0.12 * r / 1.4), aligned_edge=DOWN)
    carte = RoundedRectangle(width=2 * r + 0.7, height=2 * r + 0.9, corner_radius=0.2, fill_color=CARTE_FOND,
                             fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2).move_to(centre + UP * 0.1)
    return VGroup(carte, disque, moyeu, pointe), carte, disque


def auvent(largeur, centre_haut, couleurs=("#ef4444", WHITE)):
    """Le toit rayé d'un stand de kermesse (dessin)."""
    n = 6
    w = largeur / n
    g = VGroup()
    for i in range(n):
        x0 = centre_haut[0] - largeur / 2 + i * w
        g.add(Polygon(P(x0, centre_haut[1]), P(x0 + w, centre_haut[1]), P(x0 + w, centre_haut[1] - 0.4),
                      P(x0 + w / 2, centre_haut[1] - 0.55), P(x0, centre_haut[1] - 0.4),
                      fill_color=couleurs[i % 2], fill_opacity=1, stroke_color=ARDOISE, stroke_width=2))
    return g


def faire_tourner(disque, centre, vitesse=5.0):
    disque.add_updater(lambda m, dt: m.rotate(-vitesse * dt, about_point=centre))


# ── la vidéo ────────────────────────────────────────────────────────────────

class ProbaDefiCM2(NotionCM2):
    nom_voix = "cm2-proba-defi"

    PAS = 0.85
    R = 0.34
    X_SAC, Y_SAC = -3.6, 0.15

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def chances(self, a, b, font_size=48, couleur=JAUNE_TITRE, mot=None):
        mot = mot or ("chance" if a == 1 else "chances")
        return self.ligne([(str(a), couleur), (mot, WHITE), ("sur", WHITE), (str(b), couleur)], font_size, 0.2)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pause_icone(self, h=0.8, couleur=ORANGE_RETENUE):
        barres = VGroup(*[RoundedRectangle(width=h * 0.28, height=h, corner_radius=0.06, fill_color=couleur,
                                           fill_opacity=1, stroke_width=0) for _ in range(2)])
        barres.arrange(RIGHT, buff=h * 0.22)
        rond = Circle(radius=h * 0.9, stroke_color=couleur, stroke_width=5).move_to(barres)
        return VGroup(rond, barres)

    def loupe(self, s=1.0, couleur=BLEU_CALCUL):
        verre = Circle(radius=0.42, stroke_color=couleur, stroke_width=8)
        manche = Line(P(0.3, -0.3), P(0.75, -0.75), color=couleur, stroke_width=14)
        return VGroup(verre, manche).scale(s)

    def mets_pause(self):
        """« Mets pause, et cherche ! » en orange, avec le bouton pause qui bat."""
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)
        ic = self.pause_icone(0.32).next_to(ch, LEFT, buff=0.35)
        self.play(Write(ch), FadeIn(ic, scale=0.5), run_time=0.8)
        self.play(ic.animate.scale(1.4), run_time=0.25)
        self.play(ic.animate.scale(1 / 1.4), run_time=0.25)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le grand défi", 66, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(CEINTURE).move_to(P(-0.6, -2.75))
        self.add(ech)
        # les trois dessins des défis : le sac, la roue du stand, le dé
        pos, cols = places_grille(10, 0.5)
        billes = VGroup(*[(noire(0.2) if i < 4 else verte(0.2)).move_to(p) for i, p in enumerate(pos)])
        fond = carte_vide(10, 0.5, cols)
        petit = VGroup(fond, billes)
        sac = VGroup(sac_autour(fond), petit).move_to(P(-4.0, 0.0))
        roue, _, disque = roue_stand(P(-0.6, 0.0), 6, {0, 3}, r=0.95)
        carte, faces = carte_de(0.62, 0.12)
        carte.move_to(P(3.0, 0.0))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.9)
        self.play(LaggedStart(FadeIn(sac, shift=UP * 0.3), FadeIn(roue, shift=UP * 0.3),
                              FadeIn(carte, shift=UP * 0.3), lag_ratio=0.3), run_time=1.0)
        faire_tourner(disque, P(-0.6, 0.0), 6.0)
        self.au_mot("probabilités")
        self.play(*surligner(faces[5]), run_time=0.3)
        self.attendre_voix(marge=1.0)
        disque.clear_updaters()

    # ── 01 : trois défis ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Trois défis")
        titre = self.t("Trois défis", 50, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.6)
        xs = [-4.4, -0.6, 3.2]
        cartes = VGroup()
        for x in xs:
            c = RoundedRectangle(width=3.0, height=2.6, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                 stroke_width=4, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, 0.9))
            cartes.add(c)
        pos, cols = places_grille(10, 0.42)
        icone1 = VGroup(carte_vide(10, 0.42, cols),
                        *[(noire(0.16) if i < 4 else verte(0.16)).move_to(p) for i, p in enumerate(pos)])
        icone1.move_to(cartes[0])
        icone2 = VGroup(roue_stand(P(0, 0), 6, {0, 3}, 0.62)[0].move_to(P(xs[1] - 0.7, 0.9)),
                        roue_stand(P(0, 0), 12, {0, 4, 8}, 0.62)[0].move_to(P(xs[1] + 0.7, 0.9)))
        icone2.scale_to_fit_width(2.6).move_to(cartes[1])
        icone3 = carte_de(0.5, 0.1)[0].move_to(cartes[2])
        icones = [icone1, icone2, icone3]
        self.play(LaggedStart(*[AnimationGroup(Create(c), FadeIn(i, scale=0.6)) for c, i in zip(cartes, icones)],
                              lag_ratio=0.35), run_time=1.4)
        self.au_mot("mets pause")
        ic = self.pause_icone(0.55).move_to(P(-2.4, -1.6))
        mp = self.t("pause", 44, ORANGE_RETENUE).next_to(ic, RIGHT, buff=0.35)
        self.play(FadeIn(ic, scale=0.4), FadeIn(mp, shift=LEFT * 0.2), run_time=0.5)
        self.insister(ic, 0.25)
        self.au_mot("cherche")
        lp = self.loupe(0.8).move_to(P(1.6, -1.6))
        ch = self.t("cherche", 44, BLEU_CALCUL).next_to(lp, RIGHT, buff=0.3)
        self.play(FadeIn(lp, scale=0.4), FadeIn(ch, shift=LEFT * 0.2), run_time=0.5)
        self.play(lp.animate.shift(RIGHT * 0.25 + UP * 0.1), run_time=0.3)
        self.play(lp.animate.shift(LEFT * 0.25 + DOWN * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : défi 1, le sac ─────────────────────────────────────────────────

    def sac_defi1(self):
        """Le sac du défi 1 : la carte du coach réservée pour 12 billes (4 colonnes).
        Renvoie (sac, carte, places)."""
        pos, cols = places_grille(12, self.PAS)
        fond = carte_vide(12, self.PAS, cols)
        decal = P(self.X_SAC, self.Y_SAC) - fond.get_center()
        fond.shift(decal)
        places = [p + decal for p in pos]
        return sac_autour(fond), fond, places

    def ecran_defi1(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("02-defi1")
        titre = self.t("Défi 1", 52, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        sac, fond, places = self.sac_defi1()
        self.au_mot("Un sac")
        self.play(Create(sac), FadeIn(fond), run_time=0.6)
        self.au_mot("4 billes noires")
        noires = VGroup(*[noire(self.R).move_to(places[i]) for i in range(4)])
        l_n = self.ligne([("4", JAUNE_TITRE), ("noires", WHITE)], 50).move_to(P(2.1, 1.75))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.4) for b in noires], lag_ratio=0.2),
                  FadeIn(l_n, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("6 billes vertes")
        vertes = VGroup(*[verte(self.R).move_to(places[4 + i]) for i in range(6)])
        l_v = self.ligne([("6", JAUNE_TITRE), ("vertes", C_VERT)], 50).next_to(l_n, DOWN, buff=0.35)
        l_v.align_to(l_n, LEFT)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.4) for b in vertes], lag_ratio=0.15),
                  FadeIn(l_v, shift=LEFT * 0.2), run_time=0.9)
        self.au_mot("Combien de billes noires")
        trous = VGroup(*[DashedVMobject(Circle(radius=self.R, color=ORANGE_RETENUE, stroke_width=4), num_dashes=12)
                         .move_to(places[10 + i]) for i in range(2)])
        q = self.ligne([("+", ORANGE_RETENUE), ("?", ORANGE_RETENUE), ("noires", WHITE)], 50)
        q.next_to(l_v, DOWN, buff=0.5).align_to(l_n, LEFT)
        self.play(FadeIn(q, scale=0.6), Create(trous), run_time=0.5)
        self.insister(q[1], 0.25)
        self.au_mot("1 chance sur 2")
        cible = self.chances(1, 2, 46, JAUNE_TITRE).next_to(q, DOWN, buff=0.45).align_to(l_n, LEFT)
        self.play(FadeIn(cible, shift=UP * 0.2), run_time=0.4)
        self.au_mot("tirer une noire")
        self.play(*[b.animate.scale(1.3) for b in noires], run_time=0.25)
        self.play(*[b.animate.scale(1 / 1.3) for b in noires], run_time=0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.attendre_voix(marge=2.0)

    def ecran_correction1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02b-correction1")
        self.titre_ecran("Correction")
        sac, fond, places = self.sac_defi1()
        noires = VGroup(*[noire(self.R).move_to(places[i]) for i in range(4)])
        vertes = VGroup(*[verte(self.R).move_to(places[4 + i]) for i in range(6)])
        self.add(sac, fond, noires, vertes)
        self.au_mot("autant de noires")
        # face à face : une noire en face de chaque verte
        x0, pas = -5.3, 0.95
        y_n, y_v = 1.0, -0.6
        self.play(FadeOut(sac), FadeOut(fond),
                  *[b.animate.move_to(P(x0 + i * pas, y_n)) for i, b in enumerate(noires)],
                  *[b.animate.move_to(P(x0 + i * pas, y_v)) for i, b in enumerate(vertes)], run_time=0.9)
        trous = VGroup(*[DashedVMobject(Circle(radius=self.R, color=ORANGE_RETENUE, stroke_width=4), num_dashes=12)
                         .move_to(P(x0 + (4 + i) * pas, y_n)) for i in range(2)])
        liens = VGroup(*[DashedLine(P(x0 + i * pas, y_v + self.R + 0.05), P(x0 + i * pas, y_n - self.R - 0.05),
                                    color=WHITE, stroke_width=3, dash_length=0.08) for i in range(6)])
        self.play(LaggedStart(*[Create(l) for l in liens], lag_ratio=0.12), Create(trous), run_time=0.9)
        aut = VGroup(self.t("autant de noires", 40), self.ligne([("que de", WHITE), ("vertes", C_VERT)], 40))
        aut.arrange(DOWN, buff=0.2).move_to(P(2.6, 1.6))
        self.play(FadeIn(aut, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(": 6 noires")
        six = self.ligne([("6", JAUNE_TITRE), ("noires", WHITE)], 56).move_to(P(2.6, 0.1))
        rangee = SurroundingRectangle(VGroup(noires, trous), color=JAUNE_TITRE, buff=0.12, corner_radius=0.15)
        self.play(FadeIn(six, scale=0.6), Create(rangee), run_time=0.5)
        self.insister(six[0], 0.3)
        self.au_mot("J'en ajoute 2")
        nouvelles = VGroup(*[noire(self.R).move_to(t.get_center() + UP * 2.2) for t in trous])
        plus = self.t("+ 2", 90, VERT_OK).move_to(P(2.6, -1.5))
        self.play(FadeIn(nouvelles, shift=DOWN * 0.3), run_time=0.3)
        self.play(*[n.animate.move_to(t) for n, t in zip(nouvelles, trous)], FadeOut(trous),
                  FadeIn(plus, scale=0.4), run_time=0.6, rate_func=rate_functions.ease_out_bounce)
        self.insister(plus, 0.3)
        self.play(Indicate(liens, color=VERT_OK, scale_factor=1.0), run_time=0.6)
        self.attendre_voix()

    # ── 03 : défi 2, les deux stands ────────────────────────────────────────

    XA2, XB2, YR = -4.5, 0.1, 0.1
    R2 = 1.0

    def stand(self, x, nom, n, gagnantes, couleurs):
        """Un stand de kermesse : son nom, son auvent rayé, sa roue (canvas « roue »)."""
        roue, carte, disque = roue_stand(P(x, self.YR), n, gagnantes, self.R2)
        toit = auvent(carte.width + 0.3, P(x, carte.get_top()[1] + 0.5), couleurs)
        nom_t = self.t(nom, 40, WHITE).next_to(toit, UP, buff=0.15)
        return VGroup(nom_t, toit, roue), disque

    def gagnants(self, a, b, x):
        """« a gagnants » / « sur b », sur deux lignes sous la roue."""
        g = VGroup(self.ligne([(str(a), JAUNE_TITRE), ("gagnants", WHITE)], 40, 0.18),
                   self.ligne([("sur", WHITE), (str(b), JAUNE_TITRE)], 40, 0.18)).arrange(DOWN, buff=0.12)
        return g.next_to(P(x, self.YR - self.R2 - 0.35), DOWN, buff=0.1)

    def ecran_defi2(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("03-defi2")
        titre = self.t("Défi 2", 52, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        sa, da = self.stand(self.XA2, "Stand A", 6, {0, 3}, ("#ef4444", WHITE))
        sb, db = self.stand(self.XB2, "Stand B", 12, {0, 4, 8}, ("#3b82f6", WHITE))
        self.au_mot("Stand A")
        self.play(FadeIn(sa, shift=UP * 0.3), run_time=0.5)
        self.au_mot("2 gagnants sur 6")
        ga = self.gagnants(2, 6, self.XA2)
        self.play(FadeIn(ga, shift=UP * 0.2), run_time=0.4)
        self.play(*[da[i].animate.scale(1.15) for i in (0, 3)], run_time=0.25)
        self.play(*[da[i].animate.scale(1 / 1.15) for i in (0, 3)], run_time=0.25)
        self.au_mot("Stand B")
        self.play(FadeIn(sb, shift=UP * 0.3), run_time=0.5)
        self.au_mot("3 gagnants sur 12")
        gb = self.gagnants(3, 12, self.XB2)
        self.play(FadeIn(gb, shift=UP * 0.2), run_time=0.4)
        self.play(*[db[i].animate.scale(1.15) for i in (0, 4, 8)], run_time=0.25)
        self.play(*[db[i].animate.scale(1 / 1.15) for i in (0, 4, 8)], run_time=0.25)
        self.au_mot("Où jouer")
        q = self.t("Où jouer ?", 54, ORANGE_RETENUE).move_to(P(4.6, 1.2))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        faire_tourner(da, P(self.XA2, self.YR), 4.0)
        faire_tourner(db, P(self.XB2, self.YR), 4.0)
        self.attendre_voix(marge=2.0)
        da.clear_updaters()
        db.clear_updaters()

    def ecran_correction2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03b-correction2")
        self.titre_ecran("Correction")
        sa, da = self.stand(self.XA2, "Stand A", 6, {0, 3}, ("#ef4444", WHITE))
        sb, db = self.stand(self.XB2, "Stand B", 12, {0, 4, 8}, ("#3b82f6", WHITE))
        self.add(sa, sb)
        self.au_mot("Je ramène à 12")
        ram = self.ligne([("Je ramène à", WHITE), ("12", JAUNE_TITRE)], 36).move_to(P(4.5, 1.6))
        self.play(FadeIn(ram, shift=LEFT * 0.2), run_time=0.4)
        # la roue A coupée en 12 : chaque case en deux
        da12 = disque_cases(12, {0, 1, 6, 7}, self.R2).move_to(da)
        coupes = VGroup(*[Line(da.get_center(), da.get_center() + self.R2 * np.array(
            [math.cos(PI / 2 - (2 * i + 1) * PI / 6), math.sin(PI / 2 - (2 * i + 1) * PI / 6), 0]),
            color=ARDOISE, stroke_width=3) for i in range(6)])
        self.play(LaggedStart(*[Create(c) for c in coupes], lag_ratio=0.15), run_time=0.9)
        sa[2][1].become(da12)
        self.remove(coupes)
        self.au_mot("2 sur 6")
        a1 = self.ligne([("2", JAUNE_TITRE), ("sur", WHITE), ("6", JAUNE_TITRE)], 44).move_to(
            P(self.XA2, self.YR - self.R2 - 0.95))
        self.play(FadeIn(a1, shift=UP * 0.2), run_time=0.35)
        self.au_mot("c'est 4 sur 12")
        a2 = self.ligne([("4", JAUNE_TITRE), ("sur", WHITE), ("12", JAUNE_TITRE)], 44).move_to(a1)
        self.play(ReplacementTransform(a1, a2), run_time=0.45)
        jaunes = [sa[2][1][i] for i in (0, 1, 6, 7)]
        self.play(*[j.animate.scale(1.15) for j in jaunes], run_time=0.25)
        self.play(*[j.animate.scale(1 / 1.15) for j in jaunes], run_time=0.25)
        self.au_mot("4 sur 12 contre")
        self.insister(a2, 0.25)
        self.au_mot("3 sur 12")
        b1 = self.ligne([("3", JAUNE_TITRE), ("sur", WHITE), ("12", JAUNE_TITRE)], 44).move_to(
            P(self.XB2, a2.get_y()))
        self.play(FadeIn(b1, shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(b1, color=WHITE, scale_factor=1.15), run_time=0.5)
        self.au_mot("le stand A")
        cadre = SurroundingRectangle(VGroup(sa, a2), color=VERT_OK, buff=0.15, stroke_width=7, corner_radius=0.2)
        self.play(Create(cadre), VGroup(sb, b1).animate.set_opacity(0.35), run_time=0.5)
        lsa = self.t("le stand A", 50, VERT_OK).move_to(P(4.7, 0.2))
        ok = self.coche(taille=0.32).next_to(lsa, DOWN, buff=0.35)
        self.play(FadeIn(lsa, scale=0.6), Create(ok), run_time=0.4)
        self.insister(lsa, 0.3)
        self.attendre_voix()

    # ── 04 : défi 3, le dé ──────────────────────────────────────────────────

    def ecran_defi3(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("04-defi3")
        titre = self.t("Défi 3", 52, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Avec un dé")
        carte, faces = carte_de(1.3, 0.24)
        carte.move_to(P(-3.4, 0.1))
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("le plus probable")
        q = self.t("le plus probable ?", 44, ORANGE_RETENUE).move_to(P(2.7, 1.9))
        self.play(FadeIn(q, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("faire 6")
        f6 = self.ligne([("faire", WHITE), ("6", JAUNE_TITRE)], 50).move_to(P(2.7, 0.85))
        self.play(FadeIn(f6, scale=0.6), Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("ou faire")
        ou = self.t("ou", 40, GRIS_ETEINT).move_to(P(2.7, 0.05))
        self.play(FadeIn(ou), run_time=0.25)
        self.au_mot("un nombre pair")
        np_ = self.t("un nombre pair", 50, BLEU_CALCUL).move_to(P(2.7, -0.75))
        self.play(FadeIn(np_, scale=0.6), run_time=0.4)
        self.insister(VGroup(f6, ou, np_), 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.attendre_voix(marge=2.0)

    def ecran_correction3(self):
        self.clear()
        self.add_mascotte()
        self.dire("04b-correction3")
        self.titre_ecran("Correction")
        self.au_mot("Faire 6")
        cg, fg = carte_de(1.0, 0.18)
        cg.move_to(P(-3.9, 0.15))
        tg = self.ligne([("faire", WHITE), ("6", JAUNE_TITRE)], 40).next_to(cg, UP, buff=0.3)
        self.play(FadeIn(cg, shift=UP * 0.2), FadeIn(tg), run_time=0.5)
        self.play(*surligner(fg[5]), run_time=0.3)
        self.play(fg[5].animate.scale(1.3), run_time=0.2)
        self.play(fg[5].animate.scale(1 / 1.3), run_time=0.2)
        self.au_mot("1 chance sur 6")
        r1 = self.chances(1, 6, 44).next_to(cg, DOWN, buff=0.4)
        self.play(FadeIn(r1, shift=UP * 0.2), run_time=0.4)
        self.insister(r1[0], 0.25)
        self.au_mot("Faire un nombre pair")
        cd, fd = carte_de(1.0, 0.18)
        cd.move_to(P(1.6, 0.15))
        td = self.t("un nombre pair", 40, BLEU_CALCUL).next_to(cd, UP, buff=0.3)
        self.play(FadeIn(cd, shift=UP * 0.2), FadeIn(td), run_time=0.5)
        for ex, f in zip(["pair, 2", "4 ou", "ou 6"], (2, 4, 6)):
            self.au_mot(ex)
            self.play(*surligner(fd[f - 1]), run_time=0.15)
            self.play(fd[f - 1].animate.scale(1.25), run_time=0.18)
            self.play(fd[f - 1].animate.scale(1 / 1.25), run_time=0.18)
        self.au_mot("3 chances sur 6")
        r3 = self.chances(3, 6, 44).next_to(cd, DOWN, buff=0.4)
        self.play(FadeIn(r3, shift=UP * 0.2), run_time=0.4)
        self.insister(r3[0], 0.25)
        self.au_mot("Le nombre pair est")
        cadre = SurroundingRectangle(VGroup(cd, td, r3), color=VERT_OK, buff=0.15, stroke_width=7,
                                     corner_radius=0.2)
        self.play(Create(cadre), VGroup(cg, tg, r1).animate.set_opacity(0.4), run_time=0.5)
        ch = self.chute("plus probable", color=VERT_OK, font_size=46).set_x(cd.get_x())
        ok = self.coche(taille=0.3).next_to(ch, LEFT, buff=0.6)
        self.play(FadeIn(ch, shift=UP * 0.2), Create(ok), run_time=0.45)
        self.play(Indicate(ch, color=WHITE, scale_factor=1.12), run_time=0.6)
        self.attendre_voix()

    # ── 05 : ce que tu as appris (fin de la série) ──────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("05-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        textes = ["Compter les chances", "Comparer au même total", "Changer un sac"]
        # petites icônes : le dé (6 surligné), la roue A en 12, le sac
        i1 = carte_de(0.36, 0.06, surligne=(6,))[0]
        i2 = roue_stand(P(0, 0), 12, {0, 1, 6, 7}, 0.45)[0]
        pos, cols = places_grille(12, 0.3)
        f3 = carte_vide(12, 0.3, cols)
        i3 = VGroup(f3, *[(noire(0.12) if k < 6 else verte(0.12)).move_to(p) for k, p in enumerate(pos)])
        i3 = VGroup(sac_autour(f3), i3)
        lignes = VGroup()
        for k, (txt, ic) in enumerate(zip(textes, (i1, i2, i3))):
            ic.scale_to_fit_height(1.1)
            l = VGroup(self.coche(taille=0.3), self.t(txt, 46)).arrange(RIGHT, buff=0.35)
            lignes.add(VGroup(l, ic))
        for k, g in enumerate(lignes):
            g[0].move_to(P(0, 1.6 - 1.45 * k)).align_to(P(-4.0, 0), LEFT)
            g[1].move_to(P(-5.0, g[0].get_y()))
        for ex, g in zip(["Compter les chances", "comparer au même total", "changer un sac"], lignes):
            self.au_mot(ex)
            self.play(FadeIn(g[1], scale=0.5), FadeIn(g[0][1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(g[0][0]), run_time=0.3)
        self.au_mot("Bravo")
        ch = self.chute("Bravo, tu as fini la série !", color=VERT_OK, font_size=46)
        self.play(Write(ch), run_time=0.8)
        self.play(Flash(ch, color=VERT_OK, line_length=0.35), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 06 : abonnement (rien qui ne soit dit) ──────────────────────────────

    def page_abonnement(self, voix="06-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_defi1()
        self.ecran_correction1()
        self.ecran_defi2()
        self.ecran_correction2()
        self.ecran_defi3()
        self.ecran_correction3()
        self.ecran_finale()
        self.page_abonnement(voix="06-abonne")
