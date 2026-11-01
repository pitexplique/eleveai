# prop_graphique.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 22 : PROPORTIONNALITÉ ET GRAPHIQUE (micro du coach :
# prop_graphique, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9
# SEULEMENT (le short 4e-prop-proportionnalite-short-graphique existe déjà),
# CEINTURE VERTE.
# ⭐ Méthode travaillée : LE GRAPHIQUE. Deux grandeurs sont proportionnelles
# quand les points sont ALIGNÉS sur une droite qui passe par l'ORIGINE ; une
# droite qui part d'ailleurs (1 bar) : pas proportionnel ; un graphique se lit
# dans les deux sens (25 m → 2,5 bars ; 1,5 bar → 15 m). Coefficient × 0,1 dans
# le tableau ; pas de produit en croix ; « ÷ » jamais nécessaire ici.
# ⭐ Leurres (fil rouge, consigne-videos-proportionnalite.md) : erreur 2 « croire
# tout proportionnel » (question 1 : alignés mais pas par l'origine ; écran 06 :
# 20 m → 4 bars barré, la pression totale ne double pas) ; erreur 3 « mauvais
# coefficient » (question 2 : 150 m, 1,5 m).
#
# Décor et métier : MER, Noé, BIOLOGISTE MARIN, qui plonge pour compter les
# poissons d'un récif.
# Chiffres réels (physique de la plongée, relevé le 01/11/2026) : l'eau de mer
# ajoute ≈ 1 bar tous les 10 m (masse volumique ≈ 1 025 kg/m³ : 1 025 × 9,81 ×
# 10 ≈ 1,0 × 10⁵ Pa) ; l'air en surface ≈ 1 bar (atmosphère normale 1,013 bar,
# BIPM / Météo-France) ; pression absolue = 1 bar + profondeur ÷ 10, la règle
# des manuels de plongée (FFESSM, niveau 1). Donc la pression de l'EAU est
# proportionnelle à la profondeur, la pression TOTALE ne l'est pas.
# Centres d'intérêt : animaux-marins, sciences.
#
# Écrans : 00 garde · 01 Noé, le récif, l'eau qui appuie · 02 tableau 10/20/30 m
# → 1/2/3 bars, × 0,1 · 03 le repère : points alignés, droite par l'origine ·
# 04 QUESTION 1 (alignés, pas par l'origine : proportionnel ?) · 05 l'air :
# 1 bar en surface, 0/10/20 m → 1/2/3 bars, la droite part de 1 bar ·
# 06 piège : 20 m → 4 bars barré, 3 bars · 07 lire 25 m → 2,5 bars ·
# 08 QUESTION 2 (1,5 bar → ? m) · 09 défi 40 m · 09b correction 4 bars, 5 bars ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-graphique.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-graphique/ ; marques mot à mot :
# manim/scripts/4e/prop_graphique_marques.json (scripts/marques_dump.ps1 puis
# un convertisseur qui garde UNE marque par occurrence : « 10 mètres. 10 mètres »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés : TableauProp, DroiteOrigine) ; base de l'épisode 18
# (PropGrandeurCoherenceBase : choix loin de la coche, question_pause qui
# n'audite plus les choix à la réponse). Ajouté ICI : noe() (le plongeur),
# poisson(), recif(), Mer (la colonne d'eau graduée), fleches_pression(),
# Graphe (le repère du coach + droites de l'eau et de la pression totale).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_graphique.py PropGraphique4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_graphique.py PropGraphique4e -o eleveai-maths-4e-prop-graphique --media_dir manim/media-prop-4e-22
# Sortie : manim/sorties/4e/maths/proportionnalite/22-graphique/eleveai-maths-4e-prop-graphique.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_coherence import PropGrandeurCoherenceBase, barre_r, croix_r  # noqa: E402

EAU_C = "#2563eb"      # la pression de l'EAU (proportionnelle) : bleu
TOT_C = "#ea580c"      # la pression TOTALE (eau + air) : orange
EAU_CL = "#7dd3fc"     # les flèches de pression, sur la mer
MER = ("#0ea5e9", "#0369a1", "#0c4a6e", "#082f49")


def poisson(couleur="#facc15", s=1.0, sens=1):
    corps = Ellipse(width=0.62, height=0.32, fill_color=couleur, fill_opacity=1, stroke_width=0)
    queue = Polygon(P(-0.28, 0), P(-0.5, 0.17), P(-0.5, -0.17), fill_color=couleur, fill_opacity=1, stroke_width=0)
    oeil = Dot(P(0.17, 0.04), radius=0.035, color="#0f172a")
    g = VGroup(queue, corps, oeil).scale(s)
    if sens < 0:
        g.flip(UP)
    return g


def recif(l=5.0):
    """Le récif : des coraux (branches, boules) posés sur le sable."""
    sable = RoundedRectangle(width=l, height=0.35, corner_radius=0.12, fill_color="#fde68a", fill_opacity=1,
                             stroke_width=0)
    g = VGroup(sable)
    for i, (dx, c) in enumerate(zip((-2.0, -1.0, 0.1, 1.2, 2.0), ("#f472b6", "#fb923c", "#a78bfa", "#f43f5e", "#34d399"))):
        if i % 2 == 0:
            br = VGroup(*[Line(P(dx, 0.1), P(dx + a, 0.75 + 0.15 * (i % 3)), color=c, stroke_width=9)
                          for a in (-0.25, 0, 0.25)])
        else:
            br = VGroup(*[Circle(radius=0.2, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(dx + a, 0.3 + b))
                          for a, b in ((-0.18, 0), (0.18, 0), (0, 0.28))])
        g.add(br)
    return g


def noe(s=1.0):
    """Noé, biologiste marin : combinaison sombre à bande turquoise, masque,
    tuba, bouteille jaune dans le dos, palmes. .tete .masque"""
    p = personne(peau="#a16207", tenue="#1e293b", cheveux="#111827")
    bande = Polygon(P(-0.62, -1.3), P(0.62, -1.3), P(0.58, -1.12), P(-0.58, -1.12), fill_color="#14b8a6",
                    fill_opacity=1, stroke_width=0)
    bout = RoundedRectangle(width=0.42, height=1.2, corner_radius=0.18, fill_color="#facc15", fill_opacity=1,
                            stroke_color="#a16207", stroke_width=2).move_to(P(-0.72, -1.0))
    masque = RoundedRectangle(width=0.7, height=0.32, corner_radius=0.12, fill_color="#bae6fd", fill_opacity=0.9,
                              stroke_color="#0f172a", stroke_width=4).move_to(P(0.03, 0.05))
    tuba = VMobject(stroke_color="#f97316", stroke_width=7).set_points_smoothly(
        [P(0.4, -0.25), P(0.52, 0.1), P(0.5, 0.6)])
    palmes = VGroup(*[Polygon(P(x - 0.3, -1.9), P(x + 0.3, -1.9), P(x + 0.42, -2.35), P(x - 0.42, -2.35),
                              fill_color="#14b8a6", fill_opacity=1, stroke_width=0) for x in (-0.35, 0.35)])
    g = VGroup(bout, p, bande, palmes, masque, tuba)
    g.tete, g.masque = p.tete, masque
    return g.scale(s)


def fleches_pression(centre, r=0.95, n=8, long=0.35, couleur=EAU_CL):
    """Des flèches qui APPUIENT de tous côtés vers le plongeur."""
    g = VGroup()
    for k in range(n):
        a = TAU * k / n + 0.2
        u = np.array([np.cos(a), np.sin(a), 0])
        g.add(Arrow(centre + u * (r + long), centre + u * r, buff=0, color=couleur, stroke_width=5,
                    tip_length=0.15, max_tip_length_to_length_ratio=0.5))
    return g


class Mer(VGroup):
    """La colonne d'eau, de la surface (y = haut) à prof_max mètres (y = bas),
    en bandes de plus en plus sombres ; des traits de graduation tous les
    10 m sur le bord gauche (sans nombre : on les écrit au mot). .y(m)"""

    def __init__(self, x0, x1, haut, bas, prof_max=40, **kw):
        super().__init__(**kw)
        self.haut, self.bas, self.pm, self.x0 = haut, bas, prof_max, x0
        n = len(MER)
        bandes = VGroup(*[Rectangle(width=x1 - x0, height=(haut - bas) / n, fill_color=c, fill_opacity=1,
                                    stroke_width=0).move_to(P((x0 + x1) / 2, haut - (i + 0.5) * (haut - bas) / n))
                          for i, c in enumerate(MER)])
        vague = VMobject(stroke_color=WHITE, stroke_width=4).set_points_smoothly(
            [P(x0 + (x1 - x0) * i / 8, haut + (0.06 if i % 2 else -0.04)) for i in range(9)])
        self.traits = VGroup(*[Line(P(x0, self.y(m)), P(x0 + 0.3, self.y(m)), color=WHITE, stroke_width=4)
                               for m in range(0, prof_max + 1, 10)])
        self.fond = VGroup(bandes, vague, self.traits)
        self.add(self.fond)

    def y(self, m):
        return self.haut - (self.haut - self.bas) * m / self.pm

    def etiquette(self, m, fs=26):
        return gras(f"{m} m", fs, WHITE).next_to(P(self.x0 + 0.3, self.y(m)), RIGHT, buff=0.1)


class Graphe(VGroup):
    """Le repère du coach (DroiteOrigine) : profondeur 0 → 40 m, pression
    0 → 5 bars. .dr (le repère) · .p(x, y) · .noms (axes, à montrer au mot) ·
    pt(x, y, c) · eau() (droite de O à 40 m, 4 bars) · tot() (de 1 bar à 5 bars)
    · leg_eau() / leg_tot() (les étiquettes des droites)."""

    def __init__(self, centre=P(-3.4, -0.35), largeur=4.9, hauteur=4.0, **kw):
        super().__init__(**kw)
        self.dr = DroiteOrigine(40, 5, 10, 1, largeur=largeur, hauteur=hauteur, fs=24, nom_x="Profondeur (m)",
                                nom_y="Pression (bar)", centre=centre)
        sans(self.dr)
        self.noms = self.dr.fond[4]
        self.fond = self.dr.fond
        self.add(self.dr)

    def p(self, x, y):
        return self.dr.p(x, y)

    def pt(self, x, y, couleur=EAU_C, r=0.09):
        return Dot(self.p(x, y), radius=r, color=couleur)

    def eau(self, sw=6):
        return Line(self.p(0, 0), self.p(40, 4), color=EAU_C, stroke_width=sw)

    def tot(self, sw=6):
        return Line(self.p(0, 1), self.p(40, 5), color=TOT_C, stroke_width=sw)

    def leg_eau(self):
        return gras("eau", 26, EAU_C).move_to(self.p(33, 2.55))

    def leg_tot(self):
        return gras("totale", 26, TOT_C).move_to(self.p(7, 3.0))

    def complet(self, eau=True, tot=False, points=True):
        """Le repère et ses droites déjà posés (décor redit : sans synchro)."""
        g = VGroup(self.fond)
        if eau:
            g.add(self.eau(), self.leg_eau())
            if points:
                g.add(*[self.pt(x, x / 10) for x in (10, 20, 30)])
        if tot:
            g.add(self.tot(), self.leg_tot())
            if points:
                g.add(*[self.pt(x, 1 + x / 10, TOT_C) for x in (0, 10, 20)])
        return sans(g)


class PropGraphiqueBase(PropGrandeurCoherenceBase):
    nom_voix = "4e-prop-graphique"
    fichier_marques = "prop_graphique_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Proportionnalité et graphique", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Proportionnalité")
        pl = noe(0.55).move_to(P(-5.3, -0.2))
        bulles = VGroup(*[Circle(radius=r, stroke_color=EAU_CL, stroke_width=3).move_to(P(-4.85 + dx, 0.75 + dy))
                          for r, dx, dy in ((0.08, 0, 0), (0.11, 0.15, 0.35), (0.14, -0.05, 0.75))])
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(pl, shift=DOWN * 0.3),
                  run_time=0.8)
        q = self.t("La plongée de Noé", 44, AMBRE).move_to(P(1.6, 0.25))
        self.au_mot("La plongée")
        self.play(FadeIn(q, scale=1.15), LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in bulles], lag_ratio=0.3),
                  run_time=0.6)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Noé, biologiste marin ; plus il descend, plus l'eau appuie ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        mer = Mer(-6.3, -0.9, 2.7, -3.25)
        rc = recif(5.2).move_to(P(-3.6, -2.75))
        pois = VGroup(poisson("#facc15", 0.9).move_to(P(-5.2, -1.6)), poisson("#f472b6", 0.8, -1).move_to(P(-2.0, -1.3)),
                      poisson("#fb923c", 0.7).move_to(P(-4.1, -2.0)), poisson("#a3e635", 0.75, -1).move_to(P(-1.6, -2.1)))
        pl = noe(0.5).move_to(P(-3.5, 1.4))
        self.add(mer.fond, rc)
        self.au_mot("Voici Noé")
        nom = self.t("Noé", 44, BLEU_CALCUL).move_to(P(3.0, 2.7))
        self.play(FadeIn(pl, shift=DOWN * 0.3), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.6)
        met = self.t("biologiste marin", 36, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2)
        self.montre("biologiste marin", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        self.montre("compter les poissons", LaggedStart(*[FadeIn(f, scale=1.3) for f in pois], lag_ratio=0.25), rt=0.8)
        self.play(*[f.animate.shift(RIGHT * 0.35 * (1 if i % 2 == 0 else -1)) for i, f in enumerate(pois)],
                  run_time=0.6)
        L1 = self.lc([("Plus il descend,", WHITE)], 0.75, fs=38)
        self.jouer(L1, ["Plus il descend"], {0: [pl.animate.move_to(P(-3.5, -0.4))]})
        f1 = fleches_pression(pl.masque.get_center() + DOWN * 0.35, r=0.75, long=0.3)
        L2 = self.lc([("plus l'eau appuie.", EAU_CL)], 0.0, fs=38)
        self.jouer(L2, ["plus l'eau appuie"], {0: [LaggedStart(*[GrowArrow(a) for a in f1], lag_ratio=0.1)]})
        self.play(f1.animate.scale(0.85), run_time=0.3)
        self.play(f1.animate.scale(1 / 0.85), run_time=0.3)
        L3 = self.lc([("Pression", AMBRE), ("proportionnelle", AMBRE)], -1.0, fs=36)
        L4 = self.lc([("à la profondeur ?", AMBRE)], -1.6, fs=36)
        self.jouer(L3, ["Cette pression", "proportionnelle"])
        self.jouer(L4, ["à la profondeur"])
        self.insister(VGroup(L3, L4), 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : le tableau 10/20/30 m → 1/2/3 bars, × 0,1 ──────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        mer = Mer(-6.3, -4.25, 2.6, -3.0, prof_max=30)
        pl = noe(0.28).move_to(P(-4.55, mer.y(0) - 0.2))
        self.play(FadeIn(mer.fond), FadeIn(pl), run_time=0.5)
        L0 = self.ligne([("Environ", WHITE), ("1 bar", EAU_CL), ("tous les", WHITE), ("10 m", WHITE)], 38)
        L0.move_to(P(0.75, 2.55))
        self.jouer(L0, ["environ", "1 bar", "tous les", "10 mètres"])
        tb = TableauProp(["Profondeur (m)", "Pression de l'eau (bar)"], [[10, 20, 30], [1, 2, 3]], montrer=False,
                         largeur_case=1.15, largeur_libelle=3.3, centre=P(0.75, 0.6))
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), run_time=0.4)
        for c, m in enumerate((10, 20, 30)):
            et = mer.etiquette(m)
            mot_m = ("10 mètres", 2) if m == 10 else f"{m} mètres"
            mot_b = ("1 bar", 2) if m == 10 else f"{m // 10} bars"
            self.au_mot(*mot_m) if isinstance(mot_m, tuple) else self.au_mot(mot_m)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(et, shift=RIGHT * 0.1),
                      pl.animate.move_to(P(-4.55, mer.y(m) + 0.2)), run_time=0.4)
            self.au_mot(*mot_b) if isinstance(mot_b, tuple) else self.au_mot(mot_b)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), run_time=0.35)
        fl = tb.fleche_lat("× 0,1")
        L1 = self.ligne([("On multiplie toujours par", WHITE), ("0,1", AMBRE)], 36).move_to(P(0.75, -1.05))
        self.jouer(L1, ["On multiplie", "0,1"], {1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)]})
        self.insister(fl.etiquette, 1.2, 0.25)
        tp = self.tampon("Proportionnelle !", fs=36).move_to(P(0.75, -2.15))
        self.montre("est proportionnelle", FadeIn(tp, scale=1.3), rt=0.45)
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : le repère : points alignés, droite par l'origine ──────────────
    def ecran_graphique(self):
        self.ecran("03-graphique")
        g = Graphe()
        nx, ny = g.noms[0], g.noms[1]
        self.add(VGroup(*[m for m in g.fond if m is not g.noms]))
        pts = [g.pt(x, x / 10) for x in (10, 20, 30)]
        self.montre("Plaçons ces points", LaggedStart(*[FadeIn(d, scale=2.5) for d in pts], lag_ratio=0.35), rt=0.9)
        self.montre("En bas", FadeIn(nx, shift=UP * 0.1), Indicate(g.dr.fond[2][0], color=AMBRE), rt=0.5)
        self.montre("À gauche", FadeIn(ny, shift=DOWN * 0.1), Indicate(g.dr.fond[2][1], color=AMBRE), rt=0.5)
        L1 = self.lc([("Points alignés", WHITE)], 2.6, fs=40)
        d = g.eau()
        self.jouer(L1, ["Les points sont alignés"], {0: [Create(d)]})
        self.play(*[Indicate(p, color=EAU_C, scale_factor=1.8) for p in pts], run_time=0.5)
        L2 = self.lc([("La droite passe", WHITE)], 1.75, fs=40)
        L2b = self.lc([("par l'origine", VERT_OK)], 1.05, fs=40)
        o = g.pt(0, 0, VERT_OK, 0.12)
        anneau = Circle(radius=0.28, color=VERT_OK, stroke_width=6).move_to(g.p(0, 0))
        self.jouer(L2, ["Et la droite passe"])
        self.jouer(L2b, ["par l'origine"], {0: [FadeIn(o, scale=2), Create(anneau)]})
        L3 = self.lc([("0 m", WHITE), ("→", WHITE), ("0 bar", WHITE)], 0.2, fs=40)
        self.jouer(L3, ["0 mètre", None, "0 bar"])
        self.play(Indicate(anneau, color=VERT_OK, scale_factor=1.3), run_time=0.4)
        tp = self.tampon("Proportionnalité !", fs=38).move_to(P(3.4, -1.0))
        self.montre("la proportionnalité", FadeIn(tp, scale=1.3), rt=0.45)
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (alignés, mais pas par l'origine : proportionnel ?) ─
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = DroiteOrigine(10, 10, 1, 1, largeur=4.4, hauteur=3.8, fs=22, centre=P(-3.6, -0.3))
        sans(dr)
        d = Line(dr.p(0, 3), dr.p(10, 8), color=TOT_C, stroke_width=6)
        pts = VGroup(*[Dot(dr.p(x, 3 + x / 2), radius=0.1, color="#dc2626") for x in (2, 4, 6, 8)])
        self.add(dr, d, pts)
        self.XL = 0.2  # des cartes plus larges : le choix C tient sur une ligne

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Il faut les deux :", "des points alignés,"])
            l1 = sc.ligne_rep(1, ["et une droite", "par l'origine."])
            o = Circle(radius=0.3, color=ROUGE_ERREUR, stroke_width=6).move_to(dr.p(0, 0))
            sc.montre("Il faut", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("des points", FadeIn(l0[1], shift=UP * 0.15), Indicate(pts, color="#dc2626", scale_factor=1.4),
                      rt=0.5)
            sc.montre("et une droite", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("passe par", FadeIn(l1[1], shift=UP * 0.15), Create(o), Flash(dr.p(0, 0), color=ROUGE_ERREUR),
                      rt=0.5)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Points alignés, droite qui ne", "passe pas par l'origine :", "proportionnel ?"],
                            [self.t("oui", 32), self.t("non", 32), self.t("seulement si la droite monte", 30)], 1,
                            ["Il faut les deux : des points alignés,", "et une droite par l'origine."],
                            mot_q="Sur un graphique", autres_r=apres)
        del self.XL

    # ── 05 : l'air : 1 bar en surface ; la droite part de 1 bar ─────────────
    def ecran_air(self):
        self.ecran("05-air")
        g = Graphe()
        self.add(g.complet(eau=True))
        L0 = self.lc([("L'air en surface :", WHITE), ("1 bar", TOT_C)], 2.9, fs=36, xl=0.55)
        self.jouer(L0, ["À la surface", ("1 bar", 1)], {1: [Flash(g.p(0, 1), color=TOT_C)]})
        L1 = self.lc([("Totale =", TOT_C), ("1 bar", WHITE), ("+ l'eau", EAU_CL)], 2.2, fs=36, xl=0.55)
        self.jouer(L1, ["La pression totale", ("1 bar", 2), "plus la pression"])
        tb = TableauProp(["Profondeur (m)", "Pression totale (bar)"], [[0, 10, 20], [1, 2, 3]], montrer=False,
                         largeur_case=1.0, largeur_libelle=2.9, hauteur=0.75, fs=30, centre=P(3.5, 0.45))
        sans(tb.libelles)
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), run_time=0.35)
        pts = []
        for c, (m, b, mm, mb) in enumerate(((0, 1, "0 mètre", ("1 bar", 3)), (10, 2, "10 mètres", "2 bars"),
                                            (20, 3, "20 mètres", "3 bars"))):
            self.au_mot(mm)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), run_time=0.3)
            self.au_mot(*mb) if isinstance(mb, tuple) else self.au_mot(mb)
            d = g.pt(m, b, TOT_C)
            pts.append(d)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), FadeIn(d, scale=2.5), run_time=0.35)
        dt = g.tot()
        self.montre("encore alignés", Create(dt), FadeIn(sans(g.leg_tot())), rt=0.6)
        L2 = self.lc([("La droite part de", WHITE), ("1 bar", TOT_C)], -1.0, fs=36, xl=0.55)
        anneau = Circle(radius=0.26, color=TOT_C, stroke_width=6).move_to(g.p(0, 1))
        self.jouer(L2, ["mais la droite part", ("1 bar", 4)], {1: [Create(anneau)]})
        L3 = self.lc([("Pas par l'origine", ROUGE_ERREUR)], -1.65, fs=36, xl=0.55)
        x0 = croix_r(Dot(g.p(0, 0)), r=0.18, sw=6)
        self.jouer(L3, ["Elle ne passe pas"], {0: [Create(x0)]})
        tp = self.tampon("Pas proportionnelle !", ROUGE_ERREUR, fs=32).move_to(P(2.6, -2.5))
        self.montre("n'est pas proportionnelle", FadeIn(tp, scale=1.3), rt=0.45)
        self.insister(tp, 1.05, 0.25)
        self.attendre_voix()

    # ── 06 : le piège : 20 m → 4 bars barré, 3 bars ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        g = Graphe()
        self.add(g.complet(eau=False, tot=True))
        tit = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.75, fs=42, xl=0.55)
        self.jouer(tit, ["Attention"])
        L1 = self.lc([("10 m", WHITE), ("→", WHITE), ("2 bars", TOT_C)], 1.75, fs=40, xl=0.55)
        a1 = Circle(radius=0.22, color=NUIT, stroke_width=5).move_to(g.p(10, 2))
        self.jouer(L1, ["À 10 mètres", None, "2 bars"], {2: [Create(a1)]})
        L2 = self.lc([("20 m", WHITE), ("→", WHITE), ("4 bars", ROUGE_ERREUR)], 0.85, fs=40, xl=0.55)
        faux = Dot(g.p(20, 4), radius=0.11, color=ROUGE_ERREUR)
        self.jouer(L2, ["À 20 mètres", None, "4 bars"], {2: [FadeIn(faux, scale=2)]})
        self.play(Create(barre_r(L2)), Create(croix_r(faux, r=0.2, sw=6)), run_time=0.4)
        L3 = self.lc([("20 m", WHITE), ("→", WHITE), ("3 bars", VERT_OK)], -0.05, fs=40, xl=0.55)
        a2 = Circle(radius=0.22, color=VERT_OK, stroke_width=5).move_to(g.p(20, 3))
        L3[0]._pas_audit = True  # « 20 m » redit de la ligne barrée (la voix ne le redit pas)
        L3[0].sans_synchro = True
        L3[2].sans_synchro = True  # « 3 bars » dit « mais de 3 »
        self.jouer(L3, ["mais de 3", None, None], {2: [Create(a2)]})
        L4 = self.lc([("Doubler la profondeur", WHITE)], -1.05, fs=36, xl=0.55)
        L5 = self.lc([("ne double pas", ROUGE_ERREUR)], -1.65, fs=36, xl=0.55)
        L6 = self.lc([("la pression totale.", ROUGE_ERREUR)], -2.25, fs=36, xl=0.55)
        self.jouer(L4, ["Doubler"])
        self.jouer(L5, ["ne double pas"])
        self.jouer(L6, ["pas la pression totale"])
        self.insister(VGroup(L4, L5, L6), 1.04, 0.25)
        self.attendre_voix()

    # ── 07 : lire le graphique : 25 m → 2,5 bars ───────────────────────────
    def ecran_lire(self):
        self.ecran("07-lire")
        g = Graphe()
        self.add(g.complet(eau=True))
        tit = self.lc([("Lire le graphique", JAUNE_TITRE)], 2.75, fs=42, xl=0.55)
        self.jouer(tit, ["Le graphique sert"])
        self.montre("Sur la droite", Indicate(VGroup(g.eau(), g.leg_eau()), color=EAU_C, scale_factor=1.05), rt=0.5)
        c25 = gras("25", 24, "#dc2626").next_to(g.p(25, 0), DOWN, buff=0.12)
        L1 = self.lc([("25 m", "#f87171")], 1.6, fs=44, xl=0.55)
        self.jouer(L1, ["25 mètres"], {0: [FadeIn(c25, scale=1.4), Flash(g.p(25, 0), color="#dc2626")]})
        up = Arrow(g.p(25, 0), g.p(25, 2.5), buff=0, color="#dc2626", stroke_width=6, tip_length=0.18)
        fl1 = Arrow(P(0, 0), DOWN * 0.7, buff=0, color=WHITE, stroke_width=5).next_to(L1, DOWN, buff=0.12)
        self.montre("on monte", GrowArrow(up), GrowArrow(fl1), rt=0.6)
        self.play(Flash(g.p(25, 2.5), color="#dc2626"), run_time=0.4)
        gauche = Arrow(g.p(25, 2.5), g.p(0, 2.5), buff=0, color="#dc2626", stroke_width=6, tip_length=0.18)
        self.montre("à gauche", GrowArrow(gauche), rt=0.6)
        c25b = gras("2,5", 24, "#dc2626").next_to(g.p(4, 2.5), UP, buff=0.08)
        L2 = self.lc([("2,5", EAU_CL), ("bars", EAU_CL)], -0.35, fs=44, xl=0.55)
        L2.next_to(fl1, DOWN, buff=0.12).align_to(L1, LEFT)
        self.jouer(L2, ["2,5 bars", "bars"], {0: [FadeIn(c25b, scale=1.4)]})
        self.play(Circumscribe(L2, color=EAU_CL), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (1,5 bar → quelle profondeur ?) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = Graphe()
        self.add(g.complet(eau=True))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1 bar", "tous les 10 m."])
            sc.montre("1 bar", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("tous les", FadeIn(l0[1], shift=UP * 0.15), rt=0.3)
            l1 = sc.ligne_rep(1, ["1,5 × 10", "= 15 m"])
            h = Arrow(g.p(0, 1.5), g.p(15, 1.5), buff=0, color="#dc2626", stroke_width=6, tip_length=0.18)
            v = Arrow(g.p(15, 1.5), g.p(15, 0), buff=0, color="#dc2626", stroke_width=6, tip_length=0.18)
            c15 = gras("15", 24, "#dc2626").next_to(g.p(15, 0), DOWN, buff=0.12)
            c15b = gras("1,5", 24, "#dc2626").next_to(g.p(4, 1.5), UP, buff=0.08)
            sc.montre("1,5 fois", FadeIn(l1[0], shift=UP * 0.15), GrowArrow(h), FadeIn(c15b, scale=1.4), rt=0.5)
            sc.montre("15 mètres", FadeIn(l1[1], scale=1.3), GrowArrow(v), FadeIn(c15, scale=1.4), rt=0.5)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Sur la droite de l'eau,", "quelle profondeur", "pour 1,5 bar ?"],
                            [self.t("15 m", 34), self.t("150 m", 34), self.t("1,5 m", 34)], 0,
                            ["1 bar tous les 10 m.", "1,5 × 10 = 15 m"], mot_q="Sur la droite", autres_r=apres)

    # ── 09 : défi : 40 m ────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        mer = Mer(-6.3, -3.2, 2.6, -3.0, prof_max=40)
        pl = noe(0.3).move_to(P(-4.6, mer.y(0) - 0.2))
        self.add(sans(VGroup(mer, pl)))
        tit = self.lc([("À toi de jouer !", JAUNE_TITRE)], 2.8, fs=48, xl=-1.5)
        self.jouer(tit, ["À toi de jouer"])
        L0 = self.lc([("Noé descend à", WHITE), ("40 m", BLEU_CALCUL)], 1.75, fs=40, xl=-1.5)
        et = mer.etiquette(40)
        self.jouer(L0, ["Noé descend", "40 mètres"], {1: [pl.animate.move_to(P(-4.3, mer.y(40) + 0.75)), FadeIn(et)]})
        f = fleches_pression(pl.masque.get_center() + DOWN * 0.2, r=0.55, long=0.3)
        L1 = self.lc([("Pression de l'eau ?", EAU_CL)], 0.75, fs=40, xl=-1.5)
        self.jouer(L1, ["Quelle est la pression"], {0: [LaggedStart(*[GrowArrow(a) for a in f], lag_ratio=0.08)]})
        L2 = self.lc([("Pression totale ?", TOT_C)], -0.15, fs=40, xl=-1.5)
        self.jouer(L2, ["Et la pression totale"])
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        g = Graphe()
        self.add(g.complet(eau=True, tot=True, points=False))
        tit = self.lc([("Correction", JAUNE_TITRE)], 2.8, fs=46, xl=0.55)
        self.play(FadeIn(tit[0], shift=RIGHT * 0.15), run_time=0.4)
        L0 = self.lc([("Pression de l'eau :", EAU_CL)], 1.9, fs=36, xl=0.55)
        self.jouer(L0, ["Pression de l'eau"])
        L1 = self.lc([("40 × 0,1", WHITE), ("= 4 bars", EAU_CL)], 1.2, fs=40, xl=0.55)
        p4 = g.pt(40, 4, EAU_C, 0.12)
        self.jouer(L1, ["40 fois", "égale 4"], {1: [FadeIn(p4, scale=2.5)]})
        self.insister(L1[1], 1.12, 0.25)
        L2 = self.lc([("Pression totale :", TOT_C)], 0.15, fs=36, xl=0.55)
        self.jouer(L2, ["Pression totale"])
        L3 = self.lc([("1 + 4", WHITE), ("= 5 bars", TOT_C)], -0.55, fs=40, xl=0.55)
        p5 = g.pt(40, 5, TOT_C, 0.12)
        self.jouer(L3, ["1 plus 4", "égale 5"], {1: [FadeIn(p5, scale=2.5)]})
        self.insister(L3[1], 1.12, 0.25)
        cad = self.boite(VGroup(L0, L1, L2, L3), VERT_OK)
        self.play(Create(cad), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        g = Graphe()
        fig = g.complet(eau=True, tot=True, points=False)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Proportionnelles : points alignés", "sur une droite qui passe", "par l'origine."),
            ("Une droite qui part d'ailleurs :", "pas proportionnel."),
            ("Un graphique se lit", "dans les deux sens.")], fs=34)
        self.au_mot("Sur un graphique")
        self.montrer_ligne(lignes[0])
        self.au_mot("Une droite qui part")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et un graphique")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_graphique()
        self.ecran_question1()
        self.ecran_air()
        self.ecran_piege()
        self.ecran_lire()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropGraphique4e(PropGraphiqueBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
