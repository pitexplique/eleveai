# prop_defi.py
# EleveAI — Maths CM1 ET CM2 — série « Proportionnalité » CM, lot CM-B,
# épisode 08 : LE GRAND DÉFI : COMPARER DEUX OFFRES (micro du coach :
# prop_defi), épisode COMMUN, AVEC VOIX. Paysage 16:9 : CM1 CEINTURE VERTE
# (la paysage complète du niveau ; un défi garde la verte), CM2 CEINTURE JAUNE
# (le même cours en rappel, comme prop_tableau.py). Short jumeau :
# prop_defi_short.py (blanche).
# ⭐ Méthode travaillée : la VALEUR POUR 1 (passage par l'unité) : on divise le
# total par le nombre de sacs, puis on compare. ⛔ Pas de produit en croix ;
# « ÷ » écrit, la voix dit « divisé par ». ⛔ Pas d'argent (CM) : kilos,
# bananes, litres.
# ⭐ Leurres : 1. comparer les totaux (le piège : B a plus de kilos en tout,
# mais aussi plus de sacs ; question 1 : 36 > 20 → « l'offre B ») ; 2. croire
# que des offres égales sont différentes (question 2 : 60 kg > 40 kg, alors
# que 10 kg par sac des deux côtés → « elles se valent »).
#
# Décor et métier : ANIMAUX, Ilyes, SOIGNEUR dans un parc animalier : graines
# des perroquets (A : 3 sacs = 24 kg ; B : 5 sacs = 35 kg), bananes des singes,
# eau, foin, croquettes. Nombres inventés pour le calcul (pas de fait réel à
# sourcer). Centres d'intérêt : animaux.
#
# Micro → écrans : situation (01) ; le piège des totaux (02) ; la valeur pour
# 1 sac (03, 04) ; QUESTION 1 (05, bananes) ; offres égales (06, seaux) ;
# QUESTION 2 (07, foin) ; grand défi (08) et correction (08b, croquettes) ;
# ce que tu as appris (09) ; fin (10).
#
# Voix : manim/voix/cm-prop-defi.json (validée par Frédéric le 01/11, débit
# −10, ne cite aucune classe), WAV dans public/sons/cm-prop-defi/ ; marques mot
# à mot : manim/scripts/cm1/prop_defi_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py, non modifiés.
# Ajouté ICI : ilyes(), perroquet(), sac(), caisse(), seau(), Offre (la carte
# d'une offre, ses pictos, ses nombres posés au mot), ligne_rep() bornée et
# _disposer_q() en 34 (prop_tableau.py CM), garde() sans audit de l'identité.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_defi.py PropDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_defi.py PropDefiCM1 -o eleveai-maths-cm1-prop-defi --media_dir manim/scripts/cm1/media-prop-defi
# Garde CM2 seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/prop_defi.py PropDefiCM2 -o garde-cm2-prop-defi --media_dir manim/scripts/cm1/media-prop-defi
# python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/cm1/maths/proportionnalite/08-defi/eleveai-maths-cm1-prop-defi.mp4
#           manim/sorties/cm2/maths/proportionnalite/08-defi/eleveai-maths-cm2-prop-defi.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # cm1 DEVANT : jamais un prop_* 6e homonyme

from prop_commun import *  # noqa: E402,F403

TOILE = "#d6b98c"        # la toile de jute des sacs de graines
FOIN = "#eab308"
CROQ = "#c2410c"
BOIS = "#a16207"
BANANE = "#facc15"
EAU = "#38bdf8"
COUL_A = "#60a5fa"       # la carte A (bleue)
COUL_B = "#f472b6"       # la carte B (rose)
COUL_C = "#a78bfa"       # la carte C (violette)
FOND_CARTE = "#0f172a"
KG = "#fbbf24"           # les totaux (kilos, bananes, litres)


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ilyes(s=1.0):
    """Ilyes, soigneur : polo vert kaki, casquette verte."""
    p = personne(peau="#8d5524", tenue="#4d7c0f", cheveux="#1f2937", longs=False, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color="#365314",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.8)
    visiere = Ellipse(width=r * 1.5, height=r * 0.3, fill_color="#1a2e05", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.42 + RIGHT * r * 0.5)
    p.add(calotte, visiere)
    return p


def perroquet(s=1.0):
    """Un perroquet rouge et bleu, de profil, sur sa branche."""
    corps = Ellipse(width=0.5, height=0.8, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0, 0))
    tete = Circle(radius=0.2, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0.08, 0.45))
    oeil = Dot(P(0.15, 0.5), radius=0.04, color=WHITE)
    bec = Polygon(P(0.25, 0.5), P(0.42, 0.38), P(0.24, 0.32), fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    aile = Ellipse(width=0.3, height=0.6, fill_color="#2563eb", fill_opacity=1, stroke_width=0).move_to(P(-0.1, -0.05))
    queue = Polygon(P(-0.12, -0.35), P(0.08, -0.35), P(-0.1, -0.9), fill_color="#16a34a", fill_opacity=1,
                    stroke_width=0)
    branche = Line(P(-0.5, -0.4), P(0.5, -0.4), color=BOIS, stroke_width=7)
    return VGroup(queue, branche, corps, aile, tete, bec, oeil).scale(s)


def sac(s=1.0, couleur=TOILE):
    """Un sac fermé (toile, ficelle) : largeur ≈ 0,62 × s. .corps : la toile."""
    corps = RoundedRectangle(width=0.62, height=0.72, corner_radius=0.14, fill_color=couleur, fill_opacity=1,
                             stroke_color="#78350f", stroke_width=2)
    col = Polygon(P(-0.16, 0.34), P(0.16, 0.34), P(0.22, 0.52), P(-0.22, 0.52), fill_color=couleur, fill_opacity=1,
                  stroke_color="#78350f", stroke_width=2)
    ficelle = Line(P(-0.17, 0.38), P(0.17, 0.38), color="#78350f", stroke_width=4)
    g = VGroup(col, corps, ficelle).scale(s)
    g.corps = corps
    return g


def caisse(s=1.0):
    """Une caisse en bois pleine de bananes : largeur ≈ 0,7 × s."""
    bois = Rectangle(width=0.7, height=0.45, fill_color=BOIS, fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    lattes = VGroup(*[Line(P(-0.35, y), P(0.35, y), color="#713f12", stroke_width=2) for y in (-0.07, 0.08)])
    bananes = VGroup(*[Arc(radius=0.2, start_angle=-PI * 0.85, angle=PI * 0.7, color=BANANE, stroke_width=7)
                       .move_to(P(x, 0.3)) for x in (-0.18, 0.0, 0.18)])
    g = VGroup(bananes, bois, lattes).scale(s)
    g.corps = bois
    return g


def seau(s=1.0):
    """Un seau d'eau (bleu, anse) : largeur ≈ 0,62 × s."""
    corps = Polygon(P(-0.31, 0.3), P(0.31, 0.3), P(0.22, -0.32), P(-0.22, -0.32), fill_color="#94a3b8",
                    fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2)
    eau = Ellipse(width=0.56, height=0.12, fill_color=EAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.28))
    anse = Arc(radius=0.3, start_angle=0, angle=PI, color="#e2e8f0", stroke_width=3).move_to(P(0, 0.45))
    g = VGroup(anse, corps, eau).scale(s)
    g.corps = corps
    return g


def singe(s=1.0):
    """Une tête de singe (brun, visage clair, deux oreilles)."""
    tete = Circle(radius=0.36, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    oreilles = VGroup(*[Circle(radius=0.13, fill_color="#78350f", fill_opacity=1, stroke_width=0)
                        .move_to(P(dx, 0.05)) for dx in (-0.4, 0.4)])
    visage = Ellipse(width=0.48, height=0.4, fill_color="#fcd9b6", fill_opacity=1, stroke_width=0).move_to(P(0, -0.08))
    yeux = VGroup(*[Dot(P(dx, 0.02), radius=0.04, color="#111827") for dx in (-0.1, 0.1)])
    bouche = Arc(radius=0.1, start_angle=-PI * 0.85, angle=PI * 0.7, color="#111827", stroke_width=3).move_to(
        P(0, -0.17))
    return VGroup(oreilles, tete, visage, yeux, bouche).scale(s)


class Offre(VGroup):
    """La carte d'une offre (au style des cartes du coach, sur fond sombre) :
    titre « Offre A » en haut, n pictos au milieu, « 3 sacs » + « 24 kg » en
    bas. Rien n'est ajouté à la scène.
    .carte .titre .pictos .qte .tot · .fond = carte + titre · .marques(v) : un
    nombre posé sur chaque picto (Texts, à FadeIn au mot)."""

    def __init__(self, lettre, n, picto, qte, tot, couleur, larg=4.4, haut=2.7, s=0.8, centre=ORIGIN, fs=36,
                 titre=None, **kw):
        super().__init__(**kw)
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=FOND_CARTE,
                                      fill_opacity=1, stroke_color=couleur, stroke_width=4)
        self.titre = Text(titre or f"Offre {lettre}", font_size=fs, color=couleur, weight=BOLD)
        self.titre.move_to(self.carte.get_top() + DOWN * (0.18 + self.titre.height / 2))
        self.pictos = VGroup(*[picto(s) for _ in range(n)]).arrange(RIGHT, buff=0.1)
        if self.pictos.width > larg - 0.4:
            self.pictos.scale_to_fit_width(larg - 0.4)
        self.qte = Text(qte, font_size=fs, color=WHITE)
        self.tot = Text(tot, font_size=fs, color=KG, weight=BOLD)
        bas = VGroup(self.qte, self.tot).arrange(RIGHT, buff=0.45)
        if bas.width > larg - 0.35:
            bas.scale_to_fit_width(larg - 0.35)
        bas.move_to(self.carte.get_bottom() + UP * (0.2 + bas.height / 2))
        haut_libre = self.titre.get_bottom()[1] - 0.08
        bas_libre = bas.get_top()[1] + 0.08
        if self.pictos.height > haut_libre - bas_libre:
            self.pictos.scale_to_fit_height(haut_libre - bas_libre)
        self.pictos.move_to(P(0, (haut_libre + bas_libre) / 2))
        self.fond = VGroup(self.carte, self.titre)
        self.add(self.carte, self.titre, self.pictos, self.qte, self.tot)
        self.move_to(centre)

    def marques(self, v, fs=None, couleur=NUIT):
        """Le nombre v (8) écrit sur chaque picto : « 8 kg dans chaque sac »."""
        g = VGroup()
        for p in self.pictos:
            c = getattr(p, "corps", p)
            f = fs or max(16, int(c.height * 55 * (0.72 if len(str(v)) > 1 else 1.0)))
            t = Text(str(v), font_size=f, color=couleur, weight=BOLD)
            g.add(t.move_to(c.get_center()))
        return pas_audit(g)  # posées avec le résultat du calcul (lui, audité)


def base_ligne(lg):
    """Les morceaux d'une ligne posés sur la MÊME ligne de base (« par seau »,
    sans jambage haut, ne remonte plus au-dessus de « 6 L ») ; renvoie lg."""
    ref = None
    for m in lg:
        if not isinstance(m, Text) or not m.original_text.strip():
            continue
        full = Text("x" + m.original_text, font_size=48, font=m.font)
        reste = VGroup(*full[1:])
        k = m.height / max(reste.height, 1e-6)
        off = (reste.get_center()[1] - full[0].get_bottom()[1]) * k
        b = m.get_center()[1] - off
        if ref is None:
            ref = b
        else:
            m.shift(UP * (ref - b))
    return lg


def calc_morceaux(morceaux, fs=40, buff=0.16):
    """Une ligne de calcul (Texts), non jouée."""
    return base_ligne(VGroup(*[Text(s, font_size=fs, color=c) for s, c in morceaux]).arrange(RIGHT, buff=buff))


def entourer(m, couleur=VERT_OK, buff=0.16):
    """Le cadre vert de la bonne offre (renvoyé, non ajouté)."""
    return SurroundingRectangle(m, color=couleur, buff=buff, corner_radius=0.25, stroke_width=8)


class PropDefiBaseCM(PaysageProp):
    nom_voix = "cm-prop-defi"
    fichier_marques = "prop_defi_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
    XA, XB, YC = -1.35, 3.6, 0.95   # les deux cartes des écrans 01 à 04
    Y_POUR, Y_CALC = -0.85, -1.6     # « pour 1 sac » et le calcul, sous chaque carte

    def garde(self, *a, **k):
        """L'identité (« CM1 » porte un 1) et l'échelle sont du décor : ni
        synchro, ni audit (comme frac_cm_commun.PaysageCM)."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py (CM) : la taille de la ligne remplacée, bornée à droite."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """CM : la phrase de réponse en 34 (au lieu de 30), sous les cartes."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.col(self.bloc(phrase, 34, VERT_OK), cartes.get_bottom()[1] - 0.3)
        ph2.align_to(P(0, cartes.get_bottom()[1] - 0.2), UP)
        self.ph_q = ph2
        for c in cartes:  # les choix s arrêtent à 1,1 du bord droit : place de la coche (prop_coefficient_short.py)
            corps = c[1][1]
            lim = c[0].get_right()[0] - 1.1
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g)
                corps.shift(RIGHT * (g - corps.get_left()[0]))
        return tete, q, cartes, pause, rebours, ph2

    # ── petits outils ──────────────────────────────────────────────────────
    def ligne(self, morceaux, fs=40, buff=0.2):
        return base_ligne(super().ligne(morceaux, fs, buff))

    def au(self, mot):
        """au_mot(mot) ; mot peut être (extrait, n) ; None : rien."""
        if mot is None:
            return
        if isinstance(mot, tuple):
            self.au_mot(*mot)
        else:
            self.au_mot(mot)

    def jouer(self, lg, mots, avec=None):
        """Les morceaux de la ligne lg, chacun à SON mot ; avec[k] : des
        animations jouées avec le morceau k (le geste sur la figure)."""
        avec = avec or {}
        for k, (m, mot) in enumerate(zip(lg, mots)):
            self.au(mot)
            dernier = k == len(lg) - 1
            self.play(FadeIn(m, scale=1.3) if dernier else FadeIn(m, shift=RIGHT * 0.2), *avec.get(k, []),
                      run_time=0.4 if dernier else 0.3)
        return lg

    def calc_sous(self, offre, total, n, res, unite, mots, y=None, fs=42, couleur=VERT_OK, marques=True):
        """« 24 ÷ 3 = 8 kg » centré sous la carte, morceau par morceau au mot ;
        avec le dernier morceau, la valeur pour 1 s'écrit sur chaque picto."""
        lg = calc_morceaux([(str(total), KG), (f"÷ {n}", WHITE), ("=", WHITE), (f"{res} {unite}".strip(), couleur)],
                           fs)
        lg.move_to(P(offre.get_x(), self.Y_CALC if y is None else y))
        mk = offre.marques(res) if marques else VGroup()
        self.jouer(lg, mots, {0: [Indicate(offre.tot, color=WHITE, scale_factor=1.15)],
                              1: [Indicate(offre.pictos, color=WHITE, scale_factor=1.08)],
                              3: [LaggedStart(*[FadeIn(t, scale=1.4) for t in mk], lag_ratio=0.1)]})
        lg.marques = mk
        return lg

    def gagnant(self, m, couleur=VERT_OK, buff=0.16):
        """La bonne offre ENTOURÉE, puis agrandie un instant."""
        cad = entourer(m, couleur, buff)
        self.play(Create(cad), run_time=0.5)
        self.insister(VGroup(m, cad), 1.06, 0.25)
        return cad

    def deux_offres(self, s=0.8):
        """Les graines des perroquets : A = 3 sacs, 24 kg ; B = 5 sacs, 35 kg."""
        a = Offre("A", 3, sac, "3 sacs", "24 kg", COUL_A, s=s, centre=P(self.XA, self.YC))
        b = Offre("B", 5, sac, "5 sacs", "35 kg", COUL_B, s=s, centre=P(self.XB, self.YC))
        return a, b

    def soigneur(self):
        """Ilyes à gauche, son perroquet sur la branche (décor des écrans 02 à 04)."""
        pers = ilyes(1.0).move_to(P(-5.6, -0.7))
        oiseau = perroquet(0.9).move_to(P(-4.5, 1.35))
        return pers, oiseau

    def sous_titre(self, s, couleur=BLEU_CALCUL, x=0.0, y=None, fs=30):
        return self.t(s, fs, couleur).move_to(P(x, self.Y_POUR if y is None else y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le grand défi de la proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("grand")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        cartes = VGroup()
        for lettre, coul, x in (("A", COUL_A, -2.3), ("B", COUL_B, 2.1)):
            c = RoundedRectangle(width=3.2, height=1.9, corner_radius=0.2, fill_color=FOND_CARTE, fill_opacity=1,
                                 stroke_color=coul, stroke_width=4)
            tt = pas_audit(Text(f"Offre {lettre}", font_size=34, color=coul, weight=BOLD))
            tt.move_to(c.get_top() + DOWN * 0.42)
            q = Text("?", font_size=64, color=ORANGE_RETENUE, weight=BOLD).move_to(c.get_center() + DOWN * 0.3)
            cartes.add(VGroup(c, tt, q).move_to(P(x, 0.45)))
        q = self.t("Quelle offre est la meilleure ?", 42, ORANGE_RETENUE).move_to(P(-0.1, -1.15))
        self.au_mot("Quelle")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cartes], lag_ratio=0.3),
                  FadeIn(q, shift=UP * 0.15), run_time=0.7)
        self.au_mot("meilleure")
        self.play(LaggedStart(*[Indicate(c[2], color=AMBRE, scale_factor=1.3) for c in cartes], lag_ratio=0.3),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ilyes, soigneur ; les deux offres de graines ───────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, oiseau = self.soigneur()
        self.au_mot("Voici Ilyes")
        nom = self.t("Ilyes", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("soigneur")
        met = self.t("soigneur", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("perroquets")
        self.play(FadeIn(oiseau, shift=DOWN * 0.3), FadeOut(nom), run_time=0.5)
        a, b = self.deux_offres()
        for o, mots in ((a, ("Offre A", "3 sacs", "24 kilos")), (b, ("Offre B", "5 sacs", "35 kilos"))):
            self.au_mot(mots[0])
            self.play(FadeIn(o.fond, shift=UP * 0.2), run_time=0.4)
            self.au_mot(mots[1])
            self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in o.pictos], lag_ratio=0.15),
                      FadeIn(o.qte, shift=RIGHT * 0.2), run_time=0.6)
            self.au_mot(mots[2])
            self.play(FadeIn(o.tot, scale=1.4), run_time=0.4)
        q = self.bloc(["Dans quelle offre les sacs", "sont-ils les plus lourds ?"], 38, ORANGE_RETENUE)
        for x in q:
            x.set_x(1.1)
        q.move_to(P(1.1, -1.65))
        self.au_mot("Dans quelle")
        self.poser_lignes(q, "up", 0.35)
        self.au_mot("lourds")
        self.play(Indicate(a.pictos, color=AMBRE, scale_factor=1.08), Indicate(b.pictos, color=AMBRE,
                                                                                scale_factor=1.08), run_time=0.8)
        self.attendre_voix()

    def decor_offres(self, avec_met=True):
        """Ilyes, son perroquet et les deux cartes complètes (déjà vus : self.add)."""
        pers, oiseau = self.soigneur()
        met = self.t("soigneur", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        a, b = self.deux_offres()
        self.add(pers, oiseau, a, b, *([met] if avec_met else []))
        return a, b

    # ── 02 : le piège : comparer les totaux ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("02-piege")
        a, b = self.decor_offres()
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR).move_to(P(1.1, 3.1))
        self.play(Write(tit), run_time=0.5)
        l1 = self.t("plus de kilos en tout", 32, KG).move_to(P(self.XB, self.Y_POUR))
        self.au_mot("plus de kilos")
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(b.tot, color=KG, scale_factor=1.35), run_time=0.6)
        l2 = self.t("mais aussi plus de sacs", 32, COUL_B).move_to(P(self.XB, self.Y_POUR - 0.6))
        self.au_mot("Mais elle")
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("plus de sacs")
        self.play(LaggedStart(*[Indicate(p, color=WHITE, scale_factor=1.25) for p in b.pictos], lag_ratio=0.12),
                  run_time=0.9)
        fin = self.t("On ne peut pas comparer les totaux.", 36, ROUGE_ERREUR).move_to(P(1.15, -2.6))
        tots = VGroup(a.tot, b.tot)
        self.au_mot("On ne peut")
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.5)
        self.au_mot("totaux")
        self.play(*[Circumscribe(t, color=ROUGE_ERREUR, buff=0.08) for t in tots], run_time=0.8)
        self.attendre_voix()

    # ── 03 : l'astuce : la valeur pour 1 sac (offre A) ──────────────────────
    def ecran_unite(self):
        self.ecran("03-unite")
        a, b = self.decor_offres()
        tit = self.ligne([("L'astuce :", JAUNE_TITRE), ("la valeur", JAUNE_TITRE), ("pour 1 sac", JAUNE_TITRE)], 46).move_to(P(1.1, 3.1))
        self.au_mot("L'astuce")
        self.play(FadeIn(tit[0], shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("valeur")
        self.play(FadeIn(tit[1], shift=DOWN * 0.15), run_time=0.3)
        pa = self.sous_titre("pour 1 sac", x=self.XA)
        self.au_mot("1 sac")
        self.play(FadeIn(tit[2], shift=DOWN * 0.15), FadeIn(pa, shift=UP * 0.15),
                  Indicate(a.pictos[0], color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.insister(VGroup(tit[1], tit[2]), 1.12, 0.25)
        self.au_mot("Offre A")
        self.play(Indicate(a.titre, color=WHITE, scale_factor=1.2), run_time=0.4)
        self.calc_sous(a, 24, 3, 8, "kg", ["24", "par 3", "égale", "8 kilos"])
        self.au_mot("par sac")
        self.play(Indicate(a.pictos, color=VERT_OK, scale_factor=1.1), run_time=0.6)
        self.attendre_voix()

    def calc_fixe(self, offre, total, n, res, unite, fs=42, couleur=VERT_OK, y=None):
        """Le calcul déjà vu (posé d'un bloc par self.add) et ses marques."""
        lg = calc_morceaux([(str(total), KG), (f"÷ {n}", WHITE), ("=", WHITE), (f"{res} {unite}".strip(), couleur)],
                           fs).move_to(P(offre.get_x(), self.Y_CALC if y is None else y))
        return VGroup(lg, offre.marques(res))

    # ── 04 : offre B, puis on compare ───────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("04-comparer")
        a, b = self.decor_offres()
        pa = self.sous_titre("pour 1 sac", x=self.XA)
        ca = self.calc_fixe(a, 24, 3, 8, "kg")
        self.add(pa, ca)
        pb = pas_audit(self.sous_titre("pour 1 sac", x=self.XB))  # « par sac » : dit à la fin
        self.au_mot("Offre B")
        self.play(FadeIn(pb, shift=UP * 0.15), Indicate(b.titre, color=WHITE, scale_factor=1.2), run_time=0.5)
        cb = self.calc_sous(b, 35, 5, 7, "kg", ["35", "par 5", "égale", "7 kilos"], couleur=ORANGE_RETENUE)
        cmp_ = self.ligne([("8 kg", VERT_OK), (">", WHITE), ("7 kg", ORANGE_RETENUE)], 54).move_to(P(1.1, -2.6))
        self.au_mot("8, c'est")
        self.play(FadeIn(cmp_[0], scale=1.3), Indicate(ca[0][3], color=VERT_OK, scale_factor=1.3), run_time=0.45)
        self.au_mot("plus que")
        self.play(FadeIn(cmp_[1], scale=1.3), run_time=0.3)
        self.au_mot("que 7")
        self.play(FadeIn(cmp_[2], scale=1.3), Indicate(cb[3], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.45)
        tag = self.t("les plus lourds !", 36, VERT_OK).move_to(P(self.XA, 2.85))
        self.au_mot("les sacs")
        cad = entourer(VGroup(a, ca), VERT_OK, 0.14)
        self.play(Create(cad), run_time=0.5)
        self.au_mot("plus lourds")
        self.play(FadeIn(tag, scale=1.2), run_time=0.4)
        self.insister(VGroup(a, ca, cad), 1.05, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (les bananes des singes) ────────────────────────────
    def mini(self, lettre, n, picto, qte, tot, couleur, y, s=0.62, x=-3.9):
        return Offre(lettre, n, picto, qte, tot, couleur, larg=4.6, haut=2.4, s=s, fs=30, centre=P(x, y))

    def montrer_offre(self, o, mots):
        """Une carte qui entre au mot : le titre, puis les pictos et la quantité,
        puis le total."""
        self.au(mots[0])
        self.play(FadeIn(o.fond, shift=UP * 0.15), run_time=0.3)
        self.au(mots[1])
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.25) for p in o.pictos], lag_ratio=0.12),
                  FadeIn(o.qte, shift=RIGHT * 0.15), run_time=0.45)
        self.au(mots[2])
        self.play(FadeIn(o.tot, scale=1.4), run_time=0.35)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = self.mini("A", 2, caisse, "2 caisses", "20 bananes", COUL_A, 1.6, s=1.0)
        b = self.mini("B", 4, caisse, "4 caisses", "36 bananes", COUL_B, -1.05, s=1.0)
        sg = singe(0.95).move_to(P(-0.75, 2.2))

        def avant(sc):
            sc.au_mot("singes")
            sc.play(FadeIn(sg, shift=DOWN * 0.3), run_time=0.4)
            sc.montrer_offre(a, ("Offre A", "2 caisses", "20 bananes"))
            sc.montrer_offre(b, ("Offre B", "4 caisses", "36 bananes"))
            sc.au_mot("Où les")

        def apres(sc):
            l0 = sc.ligne_rep(0, ["A :", "20 ÷", "2 =", "10."])
            l1 = sc.ligne_rep(1, ["B :", "36 ÷", "4 =", "9."])
            l2 = sc.ligne_rep(2, ["10, c'est", "plus que 9 !"])
            ma, mb = a.marques(10), b.marques(9)
            sc.jouer(l0, ["Offre A", "20", "par 2", "10 bananes"],
                     {3: [LaggedStart(*[FadeIn(t, scale=1.4) for t in ma], lag_ratio=0.15)]})
            sc.jouer(l1, ["Offre B", "36", "par 4", "9. 10"],
                     {3: [LaggedStart(*[FadeIn(t, scale=1.4) for t in mb], lag_ratio=0.1)]})
            sc.jouer(l2, ["10, c'est", "que 9"])
            sc.gagnant(a)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Où les caisses ont-elles", "le plus de bananes ?"],
                            [self.t("l'offre A", 36), self.t("l'offre B", 36), self.t("elles se valent", 36)], 0,
                            ["A : 20 ÷ 2 = 10.", "B : 36 ÷ 4 = 9.", "10, c'est plus que 9 !"],
                            mots_choix=("A : l'offre", "B : l'offre", "C :"), avant_q=avant,
                            autres_r=apres)

    # ── 06 : parfois, les offres se valent (les seaux d'eau) ────────────────
    def ecran_egal(self):
        self.ecran("06-egal")
        tit = self.t("Parfois, les offres se valent.", 46, JAUNE_TITRE).move_to(P(-0.3, 3.15))
        self.au_mot("Parfois")
        self.play(Write(tit), run_time=0.7)
        xa, xb, y = -3.0, 2.4, 1.15
        a = Offre("A", 2, seau, "2 seaux", "12 L", COUL_A, haut=2.5, s=0.85, centre=P(xa, y))
        b = Offre("B", 3, seau, "3 seaux", "18 L", COUL_B, haut=2.5, s=0.85, centre=P(xb, y))
        pas_audit(a.titre)
        pas_audit(b.titre)
        self.montrer_offre(a, ("2 seaux", "2 seaux", "12 litres"))
        self.montrer_offre(b, ("3 seaux", "3 seaux", "18 litres"))
        ca = self.calc_sous(a, 12, 2, 6, "L", ["12 divisé", "par 2", "2, égale", "6. 18"], y=-0.75)
        cb = self.calc_sous(b, 18, 3, 6, "L", ["18 divisé", "par 3", "3, égale", "6. 6"], y=-0.75)
        eg = self.t("=", 72, AMBRE).move_to(P((xa + xb) / 2, -0.75))
        lg = self.ligne([("6 L", VERT_OK), ("par seau", VERT_OK), ("dans les deux cas", WHITE)], 40)
        lg.move_to(P(-0.3, -1.75))
        self.au_mot("6 litres par")
        self.play(FadeIn(lg[0], scale=1.2), GrowFromCenter(eg), Indicate(ca[3], color=VERT_OK, scale_factor=1.3),
                  Indicate(cb[3], color=VERT_OK, scale_factor=1.3), run_time=0.4)
        self.au_mot("par seau")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.25)
        self.au_mot("dans les deux")
        self.play(FadeIn(lg[2], shift=RIGHT * 0.2), run_time=0.35)
        v = self.tampon("C'est proportionnel !", VERT_OK, 40).move_to(P(-0.3, -2.7))
        self.au_mot("c'est proportionnel")
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (le foin : elles se valent) ─────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        a = self.mini("A", 4, lambda s: sac(s, FOIN), "4 sacs", "40 kg", COUL_A, 1.6, s=0.95)
        b = self.mini("B", 6, lambda s: sac(s, FOIN), "6 sacs", "60 kg", COUL_B, -1.05, s=0.95)
        note = self.bloc(["Plus de foin, mais aussi", "plus de sacs !"], 28, ORANGE_RETENUE)
        for x in note:
            x.set_x(-3.9)
        note.move_to(P(-3.9, -2.98))

        def avant(sc):
            sc.montrer_offre(a, ("Offre A", "4 sacs", "40 kilos"))
            sc.montrer_offre(b, ("Offre B", "6 sacs", "60 kilos"))
            sc.au_mot("Où les")

        def apres(sc):
            l0 = sc.ligne_rep(0, ["40 ÷", "4 =", "10."])
            l1 = sc.ligne_rep(1, ["60 ÷", "6 =", "10."])
            l2 = sc.ligne_rep(2, ["10 kg par sac", "partout :"])
            l3 = sc.ligne_rep(3, ["elles se valent !"])
            ma, mb = a.marques(10), b.marques(10)
            sc.jouer(l0, ["40", "par 4", "10. 60"],
                     {2: [LaggedStart(*[FadeIn(t, scale=1.4) for t in ma], lag_ratio=0.1)]})
            sc.jouer(l1, ["60", "par 6", "10. 10"],
                     {2: [LaggedStart(*[FadeIn(t, scale=1.4) for t in mb], lag_ratio=0.08)]})
            sc.jouer(l2, ["10 kilos", "des deux"],
                     {0: [Indicate(ma, color=VERT_OK, scale_factor=1.3), Indicate(mb, color=VERT_OK, scale_factor=1.3)]})
            sc.jouer(l3, ["elles se valent"])
            sc.gagnant(VGroup(a, b))
            sc.au_mot("L'offre B")
            sc.play(FadeIn(note[0], shift=UP * 0.15), Indicate(b.tot, color=KG, scale_factor=1.3), run_time=0.5)
            sc.au_mot("plus de sacs")
            sc.play(FadeIn(note[1], shift=UP * 0.15), Indicate(b.pictos, color=WHITE, scale_factor=1.1), run_time=0.6)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Où les sacs sont-ils", "les plus lourds ?"],
                            [self.t("l'offre A", 36), self.t("l'offre B", 36), self.t("elles se valent", 36)], 2,
                            ["40 ÷ 4 = 10.", "60 ÷ 6 = 10.", "10 kg par sac partout :", "elles se valent !"],
                            mots_choix=("A : l'offre", "B : l'offre", "C :"), avant_q=avant,
                            autres_r=apres)

    # ── 08 : à toi de jouer : trois offres de croquettes ────────────────────
    XS3 = (-4.15, 0.0, 4.15)

    def trois_offres(self):
        croq = lambda s: sac(s, CROQ)  # noqa: E731
        return [Offre(l, n, croq, f"{n} sacs", f"{kg} kg", c, larg=3.75, haut=2.55, s=0.62, fs=34,
                      centre=P(x, 1.0))
                for l, n, kg, c, x in (("A", 2, 18, COUL_A, self.XS3[0]), ("B", 3, 24, COUL_B, self.XS3[1]),
                                       ("C", 5, 50, COUL_C, self.XS3[2]))]

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.ligne([("À toi de jouer,", JAUNE_TITRE), ("le grand défi !", JAUNE_TITRE)], 50).move_to(P(0, 3.1))
        self.au_mot("À toi")
        self.play(FadeIn(tit[0], shift=DOWN * 0.15), run_time=0.45)
        self.au_mot("le grand")
        self.play(FadeIn(tit[1], scale=1.2), run_time=0.45)
        offres = self.trois_offres()
        for o in offres:
            pas_audit(o.titre)
        self.au_mot("Trois offres")
        self.play(LaggedStart(*[FadeIn(o.fond, shift=UP * 0.2) for o in offres], lag_ratio=0.2), run_time=0.7)
        for o, (l, n, kg) in zip(offres, (("A :", "2 sacs", "18 kilos"), ("B :", "3 sacs", "24 kilos"),
                                         ("C :", "5 sacs", "50 kilos"))):
            self.au_mot(l)
            self.play(Indicate(o.titre, color=WHITE, scale_factor=1.25), run_time=0.35)
            self.montrer_offre(o, (None, n, kg))
        q = self.t("Dans quelle offre les sacs sont-ils les plus lourds ?", 36, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.au_mot("Dans quelle")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        offres = self.trois_offres()
        self.add(*offres)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        cs = []
        for o, (l, kg, n, r, mots) in zip(offres, (
                ("A", 18, 2, 9, ["18", "par 2", "2, égale", "9 kilos"]),
                ("B", 24, 3, 8, ["24", "par 3", "3, égale", "8. C"]),
                ("C", 50, 5, 10, ["50", "par 5", "5, égale", "10. Les"]))):
            self.au_mot(f"{l} : {kg}" if l != "A" else "A : 18")
            self.play(Indicate(o.titre, color=WHITE, scale_factor=1.2), run_time=0.3)
            cs.append(self.calc_sous(o, kg, n, r, "kg", mots, y=-0.8, fs=38,
                                     couleur=VERT_OK if l == "C" else ORANGE_RETENUE))
        fin = VGroup(self.t("Les sacs de l'offre C sont les plus lourds :", 38, VERT_OK),
                     self.ligne([("10 kg", VERT_OK), ("chacun.", VERT_OK)], 38)).arrange(DOWN, buff=0.15)
        fin.move_to(P(-0.3, -2.2))
        self.au_mot("Les sacs")
        self.play(Create(entourer(VGroup(offres[2], cs[2]), VERT_OK, 0.12)), FadeIn(fin[0], shift=UP * 0.15),
                  run_time=0.5)
        self.au_mot("10 kilos chacun")
        self.play(FadeIn(fin[1][0], scale=1.2), Indicate(cs[2][3], color=VERT_OK, scale_factor=1.3), run_time=0.4)
        self.au_mot("chacun")
        self.play(FadeIn(fin[1][1], shift=RIGHT * 0.15), run_time=0.3)
        self.insister(fin[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = Offre("A", 3, sac, "3 sacs", "24 kg", COUL_A, larg=4.0, haut=2.4, s=0.7, centre=P(0, 1.3))
        b = Offre("B", 5, sac, "5 sacs", "35 kg", COUL_B, larg=4.0, haut=2.4, s=0.7, centre=P(0, -1.75))
        ca = calc_morceaux([("24", KG), ("÷ 3", WHITE), ("=", WHITE), ("8 kg", VERT_OK)], 38).next_to(a, DOWN, 0.15)
        cb = calc_morceaux([("35", KG), ("÷ 5", WHITE), ("=", WHITE), ("7 kg", ORANGE_RETENUE)], 38)
        cb.next_to(b, DOWN, 0.15)
        cad = entourer(VGroup(a, ca), VERT_OK, 0.1)
        ma, mb = a.marques(8), b.marques(7)
        VGroup(VGroup(a, ca, cad, ma), VGroup(b, cb, mb)).arrange(DOWN, buff=0.45)  # un vrai espace sous le cadre
        fig = VGroup(a, ca, b, cb, cad, ma, mb)
        pas_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour comparer deux offres, on ne", "regarde pas seulement le total."),
            ("On calcule la valeur pour 1,", "puis on compare."),
            ("Si les valeurs pour 1 sont égales,", "les offres se valent.")], fs=38)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(VGroup(a.tot, b.tot), color=KG))
        self.au_mot("On calcule")
        self.montrer_ligne(lignes[1], Indicate(VGroup(ca, cb), color=WHITE, scale_factor=1.05))
        self.au_mot("Si les")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_piege, self.ecran_unite,
                  self.ecran_comparer, self.ecran_question1, self.ecran_egal, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde CM2 seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("10-abonne")


class PropDefiCM1(PropDefiBaseCM):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PropDefiCM2(PropDefiBaseCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
