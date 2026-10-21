# stats_graphique_lire.py
# EleveAI — Maths CM1 ET CM2 — série « Statistiques », épisode 05 : LIRE UN
# DIAGRAMME EN BARRES sur un axe gradué (micro du coach : lecture d'un
# graphique, `stat_graph` barres avec showAxis + step), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE (lire un petit trait sans nombre, un cran
# au-dessus du « je vois »). Short jumeau : stats_graphique_lire_short.py (blanche).
#
# ⭐ Décor et métier : le SPORT, Paris 2024 ; une JOURNALISTE SPORTIVE montre
# les médailles de la France à la télévision. Données réelles : or 16,
# argent 26, bronze 22, total 64.
# ⭐ La figure est CELLE DU COACH, redessinée par manim/canvas_stats.py
# (Barres : carte blanche, titre dans la carte, axe gradué 0, 4, 8… avec un
# PETIT TRAIT entre deux nombres, qui vaut 2 de plus ; 26 et 22 tombent sur un
# petit trait). Le geste de lecture se VOIT : flèche qui monte la barre, puis
# pointillé ambre jusqu'à l'axe, valeur lue dans une pastille.
# ⛔ PAS D'ÉCART : une valeur ne s'écrit qu'au mot où la voix la dit ; les
# nombres de l'axe sont des étiquettes (dits « 0, 4, 8, 12… » à l'écran 02).
#
# Écrans : 00 garde · 01 Paris 2024, la journaliste à la télévision · 02 les
# axes (catégories, nombres de 4 en 4, petits traits agrandis, barres) · 03 l'or
# (16) · 04 l'argent (26) et le bronze (22) sur les petits traits · 05 le piège
# (loupe sur 20 – 24 : +4, +2 +2, ni 20 ni 24 : 22) · 06 défi · 06b correction
# (16 + 26 + 22 = 64) · 07 ce que tu as appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/cm-stats-graphique-lire.json (débit −10), WAV dans
# public/sons/cm-stats-graphique-lire/ ; calage mot à mot :
# manim/scripts/cm1/stats_graphique_lire_marques.json (marques.ps1 + conv.py).
# ⭐ UNE voix, UN script, DEUX rendus : StatsGraphiqueLireCM2 ne change que
# l'identité (« Maths CM2 — EleveAI »). La voix ne cite aucune classe.
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_lire.py StatsGraphiqueLireCM1 -o eleveai-maths-cm1-stats-graphique-lire --media_dir manim/scripts/cm1/media-graphique-lire
# python -m manim render -qh --disable_caching manim/scripts/cm1/stats_graphique_lire.py StatsGraphiqueLireCM2 -o eleveai-maths-cm2-stats-graphique-lire --media_dir manim/scripts/cm1/media-graphique-lire-cm2
# Sorties : manim/sorties/cm1/maths/statistiques/05-graphique-lire/ et
#           manim/sorties/cm2/maths/statistiques/05-graphique-lire/

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, NUIT, Barres, texte  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

OR, ARGENT, BRONZE = "#facc15", "#cbd5e1", "#c97b3d"
MEDAILLES = ["Or", "Argent", "Bronze"]
VALEURS = [16, 26, 22]
COUL_TXT = [OR, "#e2e8f0", "#e0a06a"]  # les mêmes, un peu plus clairs pour écrire sur le noir


def P(x, y):
    return np.array([x, y, 0.0])


def medaille(couleur, r=0.5):
    """Une médaille dessinée : le disque, un cercle gravé, le ruban bleu et rouge."""
    rub_g = Polygon(P(-0.55 * r, 1.9 * r), P(-0.1 * r, 1.9 * r), P(0.25 * r, 0.6 * r), P(-0.2 * r, 0.6 * r),
                    fill_color="#1d4ed8", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    rub_d = Polygon(P(0.55 * r, 1.9 * r), P(0.1 * r, 1.9 * r), P(-0.25 * r, 0.6 * r), P(0.2 * r, 0.6 * r),
                    fill_color="#dc2626", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    disque = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    grave = Circle(radius=0.68 * r, stroke_color=NUIT, stroke_width=2, stroke_opacity=0.35)
    return VGroup(rub_g, rub_d, disque, grave)


def tele(largeur=4.6, hauteur=2.9):
    """Un téléviseur : cadre sombre, écran blanc (le contenu se pose dessus), pied."""
    cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, fill_color="#1e293b",
                             fill_opacity=1, stroke_color="#64748b", stroke_width=4)
    ecran = RoundedRectangle(width=largeur - 0.35, height=hauteur - 0.35, corner_radius=0.1, fill_color="#0b1220",
                             fill_opacity=1, stroke_width=0)
    pied = Polygon(P(-0.3, -hauteur / 2), P(0.3, -hauteur / 2), P(0.6, -hauteur / 2 - 0.45),
                   P(-0.6, -hauteur / 2 - 0.45), fill_color="#475569", fill_opacity=1, stroke_width=0)
    return VGroup(pied, cadre, ecran)


def croix(mob, color=ROUGE_ERREUR, sw=7):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)


class MotsCales:
    """au_mot() calé sur les MOTS (marques WinRT), repris de proba_bin_defi.py :
    le prorata des caractères dérive sur « 0, 4, 8, 12… »."""

    fichier_marques = None

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques or not self._duree_voix:
            return super().au_mot(extrait)
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


class StatsGraphiqueLireBase(MotsCales, Notion6e):
    nom_voix = "cm-stats-graphique-lire"
    fichier_marques = "stats_graphique_lire_marques.json"
    identite = "Maths CM1 — EleveAI"
    G = P(-3.25, -0.42)  # le centre du graphique, à gauche
    XL = 0.95            # le bord gauche de la colonne de droite

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, s, fs=40, color=WHITE):
        return Text(s, font_size=fs, color=color)

    def col(self, mob, y):
        """Pose mob dans la colonne de droite, calé à gauche, sans déborder."""
        mob.move_to(P(0, y)).align_to(P(self.XL, 0), LEFT)
        if mob.get_right()[0] > 6.7:
            mob.scale_to_fit_width(6.7 - self.XL).align_to(P(self.XL, 0), LEFT)
        return mob

    def ligne(self, morceaux, fs=40, buff=0.2):
        """Une ligne de morceaux colorés ; ligne[i] = i-ème morceau."""
        return VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, k=1.5, run_time=0.35, about=None):
        kw = {"about_point": about} if about is not None else {}
        self.play(mob.animate.scale(k, **kw), run_time=run_time)
        self.play(mob.animate.scale(1 / k, **kw), run_time=run_time)

    def graphe(self, titre=True, centre=None):
        """Le diagramme des médailles, comme dans le coach (non ajouté)."""
        return Barres(MEDAILLES, VALEURS, pas=4, sous_pas=2, couleurs=[OR, ARGENT, BRONZE], nom_axe="Médailles",
                      titre="France, Paris 2024" if titre else None, largeur=4.8, hauteur=3.9, fs=30,
                      colonne_lue=True, centre=self.G if centre is None else centre)

    def graphe_pret(self):
        """Le graphique entier posé d'un coup (barres comprises), ajouté."""
        g = self.graphe()
        self.add(g)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lire un diagramme en barres", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.85))
        g = Barres(MEDAILLES, VALEURS, pas=4, sous_pas=2, couleurs=[OR, ARGENT, BRONZE], largeur=3.6, hauteur=2.2,
                   fs=26, centre=P(-0.6, 0.15))
        self.au_mot("Un diagramme en barres")
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.6)
        self.play(g.pousser(run_time=0.8))
        self.au_mot("sais-tu le lire")
        q = self.t("?", 90, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Paris 2024, la journaliste sportive ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Jeux olympiques")
        anneaux = VGroup(*[Circle(radius=0.32, stroke_color=c, stroke_width=7) for c in
                           ("#0081C8", "#FCB131", "#000000", "#00A651", "#EE334E")])
        for k, a in enumerate(anneaux):
            a.move_to(P(-0.72 + 0.72 * (k % 3) + (0.36 if k >= 3 else 0), -0.32 * (k >= 3)))
        anneaux[2].set_stroke(WHITE)  # l'anneau noir, visible sur le fond noir
        anneaux.move_to(P(-4.0, 2.55))
        self.play(LaggedStart(*[Create(a) for a in anneaux], lag_ratio=0.15), run_time=0.8)
        self.au_mot("de Paris, en 2024")
        titre = self.t("Paris 2024", 56, JAUNE_TITRE).next_to(anneaux, RIGHT, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        self.au_mot("des médailles")
        meds = VGroup(*[medaille(c, 0.55) for c in (OR, ARGENT, BRONZE)]).arrange(RIGHT, buff=0.55)
        meds.move_to(P(-4.0, 0.2))
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.5) for m in meds], lag_ratio=0.3), run_time=0.9)
        self.au_mot("Une journaliste sportive")
        tv = tele().move_to(P(2.7, 0.55))
        metier = self.t("Journaliste sportive", 40, BLEU_CALCUL).next_to(tv, DOWN, buff=0.75)
        self.play(FadeIn(tv, scale=0.9), run_time=0.5)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("avec un diagramme en barres")
        mini = Barres(MEDAILLES, VALEURS, pas=4, sous_pas=2, couleurs=[OR, ARGENT, BRONZE], largeur=2.6,
                      hauteur=1.45, fs=20, centre=tv[2].get_center())
        if mini.height > tv[2].height * 0.94:
            mini.scale_to_fit_height(tv[2].height * 0.94).move_to(tv[2])
        self.play(FadeIn(mini.fond, scale=0.9), run_time=0.4)
        self.play(mini.pousser(run_time=1.0))
        nom = self.t("un diagramme en barres", 34, WHITE).next_to(meds, DOWN, buff=0.6)
        self.play(FadeIn(nom, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les axes ───────────────────────────────────────────────────────

    def ecran_axes(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-axes")
        g = self.graphe()
        # la carte, le titre, les axes et la grille d'abord ; le reste AU MOT
        base = VGroup(g.carte, g.titre, g.nom_axe, g.grille, g.axe_x, g.axe_y)
        self.au_mot("En bas")
        bas = self.col(self.t("En bas : les médailles", 38), 2.3)
        self.play(FadeIn(base, scale=0.95), FadeIn(bas, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Indicate(g.axe_x, color=AMBRE), run_time=0.4)
        for k, mot in enumerate(["or,", "argent,", "bronze."]):
            self.au_mot(mot)
            self.play(FadeIn(g.etiquettes[k], shift=UP * 0.2), run_time=0.25)
            self.insister(g.etiquettes[k], 1.4, 0.18)
        self.au_mot("Sur le côté")
        cote = self.col(self.t("Sur le côté : les nombres", 38), 1.35)
        self.play(FadeIn(cote, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.5)
        majeurs = sorted(g.nombres)
        for v, mot in zip(majeurs[:4], ["0, 4", "4, 8", "8, 12", "12…"]):
            self.au_mot(mot)
            self.play(FadeIn(g.nombre(v), scale=1.5), FadeIn(g.trait(v)), run_time=0.25)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(g.nombre(v)), FadeIn(g.trait(v))) for v in majeurs[4:]],
                              lag_ratio=0.3), run_time=0.8)
        self.au_mot("un petit trait")
        petits = VGroup(*[g.trait(v) for v in sorted(g.traits) if v not in g.nombres])
        pt = VGroup(self.t("entre deux nombres :", 36, AMBRE), self.t("un petit trait", 36, AMBRE))
        self.col(pt.arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.3)
        self.play(LaggedStart(*[FadeIn(m) for m in petits], lag_ratio=0.1), FadeIn(pt, shift=RIGHT * 0.2),
                  run_time=0.6)
        # AGRANDIR puis rétrécir les petits traits, pour que l'œil les trouve
        self.play(*[m.animate.scale(2.8).set_color(AMBRE) for m in petits], run_time=0.4)
        self.wait(0.4)
        self.play(*[m.animate.scale(1 / 2.8).set_color(NUIT) for m in petits], run_time=0.4)
        self.au_mot("Plus la barre est haute")
        self.play(g.pousser(run_time=0.9))
        self.add(g)
        fl = Arrow(P(0, -1.9), P(0, -0.35), buff=0, color=VERT_OK, stroke_width=8)
        haute = VGroup(self.t("plus haute", 38, VERT_OK), self.t("= plus de médailles", 38))
        haute.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        grp = VGroup(fl, haute).arrange(RIGHT, buff=0.3)
        self.col(grp, -1.35)
        self.play(GrowArrow(fl), FadeIn(haute[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("plus il y a de médailles")
        self.play(FadeIn(haute[1], shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : l'or ───────────────────────────────────────────────────────────

    def ecran_or(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-or")
        g = self.graphe_pret()
        self.au_mot("La barre de l'or")
        tit = self.col(VGroup(medaille(OR, 0.32), self.t("L'or", 48, OR)).arrange(RIGHT, buff=0.3), 2.3)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), g.focus(0, 0.35), run_time=0.5)
        self.au_mot("Je monte")
        e1 = self.col(self.ligne([("1.", AMBRE), ("Je monte en haut", WHITE)], 38), 1.2)
        fl = g.monter(0)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.9)
        self.au_mot("puis je vais vers les nombres")
        e2 = self.col(self.ligne([("2.", AMBRE), ("Je vais vers les nombres", WHITE)], 38), 0.3)
        tr = g.vers_axe(0)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Create(tr), run_time=0.9)
        self.au_mot("16 médailles")
        nb = g.nombre(16)
        res = self.col(self.ligne([("16", OR), ("médailles d'or", WHITE)], 50), -1.0)
        self.play(nb.animate.scale(1.8).set_color(AMBRE), FadeIn(res, scale=0.6), run_time=0.4)
        self.play(nb.animate.scale(1 / 1.8), run_time=0.4)
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(res, cadre), 1.15, 0.3)
        self.attendre_voix()

    # ── 04 : l'argent et le bronze, sur les petits traits ───────────────────

    def lire_petit_trait(self, g, i, y, mots):
        """Argent ou bronze : allumer, monter, pointillé jusqu'au PETIT TRAIT
        (agrandi), les deux nombres qui l'entourent, puis la valeur lue.
        mots = (barre, monter, petit trait, entre, valeur) ; y = la ligne de droite."""
        v = VALEURS[i]
        bas, haut = v - 2, v + 2
        self.au_mot(mots[0])
        fl = g.monter(i)
        if mots[1] is None:  # le bronze : la voix va vite, allumer et monter ensemble
            self.play(g.focus(i, 0.35), GrowArrow(fl), run_time=0.6)
        else:
            self.play(g.focus(i, 0.35), run_time=0.4)
            self.au_mot(mots[1])
            self.play(GrowArrow(fl), run_time=0.5)
        self.au_mot(mots[2])
        tr = g.vers_axe(i)
        self.play(Create(tr), run_time=0.5)
        trait = g.trait(v)
        self.play(trait.animate.scale(2.8).set_color(AMBRE), run_time=0.25)
        self.play(trait.animate.scale(1 / 2.8), run_time=0.25)
        self.au_mot(mots[3])
        entre = VGroup(medaille([OR, ARGENT, BRONZE][i], 0.26),
                       self.ligne([("entre", WHITE), (str(bas), WHITE), ("et", WHITE), (str(haut), WHITE)], 38))
        entre.arrange(RIGHT, buff=0.3)
        self.col(entre, y)
        self.play(FadeIn(entre, shift=RIGHT * 0.2), Indicate(g.nombre(bas), color=AMBRE, scale_factor=1.5),
                  Indicate(g.nombre(haut), color=AMBRE, scale_factor=1.5), run_time=0.7)
        self.au_mot(mots[4])
        suite = DashedLine(g.y_axe(v), P(g._x_lu(), g.y_axe(v)[1]), color=AMBRE, stroke_width=6, dash_length=0.14,
                           dashed_ratio=0.6)
        lu = g.lu(v)
        res = self.ligne([(MEDAILLES[i] + " :", WHITE), (str(v), COUL_TXT[i])], 48)
        self.col(res, y - 0.9)
        self.play(Create(suite), run_time=0.25)
        self.play(FadeIn(lu, scale=1.6), FadeIn(res[0]), FadeIn(res[1], scale=1.6), trait.animate.set_color(NUIT),
                  run_time=0.4)
        self.insister(res[1], 1.4, 0.25)
        return VGroup(fl, tr, suite, lu)

    def ecran_autres(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autres")
        g = self.graphe_pret()
        self.lire_petit_trait(g, 1, 2.25, ("L'argent", "la barre arrive", "au petit trait entre 24",
                                           "entre 24 et 28", "26. Le"))
        self.lire_petit_trait(g, 2, 0.05, ("Le bronze", None, "au petit trait entre 20",
                                           "entre 20 et 24", "22."))
        self.play(g.rallumer(), run_time=0.4)
        self.attendre_voix()

    # ── 05 : le piège (la loupe sur 20 – 24) ────────────────────────────────

    def loupe(self, centre):
        """L'axe de 20 à 24 AGRANDI, sur une carte blanche : 20, le petit trait, 24.
        Renvoie (carte, axe, traits {20, 22, 24}, nombres {20, 24}, y(v))."""
        cx, cy = centre[0], centre[1]
        carte = RoundedRectangle(width=2.6, height=4.2, corner_radius=0.22, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=AMBRE, stroke_width=5).move_to(centre)
        xa = cx + 0.05
        y = lambda v: cy - 1.55 + (v - 20) / 4 * 3.1  # noqa: E731
        axe = Line(P(xa, y(19.4)), P(xa, y(24.6)), color=NUIT, stroke_width=6)
        traits = {20: Line(P(xa - 0.4, y(20)), P(xa, y(20)), color=NUIT, stroke_width=6),
                  22: Line(P(xa - 0.22, y(22)), P(xa, y(22)), color=NUIT, stroke_width=5),
                  24: Line(P(xa - 0.4, y(24)), P(xa, y(24)), color=NUIT, stroke_width=6)}
        nombres = {v: texte(v, 44).next_to(traits[v], LEFT, buff=0.12) for v in (20, 24)}
        return carte, axe, traits, nombres, y, xa

    def arc(self, y0, y1, x, courbure, etiquette, couleur):
        """Un saut de y0 à y1, bombé vers la droite (angle = courbure × π), et son étiquette."""
        a = ArcBetweenPoints(P(x + 0.05, y0), P(x + 0.05, y1), angle=PI * courbure, color=couleur, stroke_width=5)
        a.add_tip(tip_length=0.18)
        e = texte(etiquette, 34, couleur).next_to(a, RIGHT, buff=0.08)
        return VGroup(a, e)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        g = self.graphe_pret()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.3)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("oublier les petits traits")
        oubli = self.col(self.t("oublier les petits traits", 36, ORANGE_RETENUE), 2.6)
        petits = VGroup(*[g.trait(v) for v in sorted(g.traits) if v not in g.nombres])
        self.play(FadeIn(oubli, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*[m.animate.scale(2.6).set_color(ROUGE_ERREUR) for m in petits], run_time=0.35)
        self.play(*[m.animate.scale(1 / 2.6).set_color(NUIT) for m in petits], run_time=0.35)
        self.au_mot("de 4 en 4")
        carte, axe, traits, nombres, y, xa = self.loupe(P(2.4, -0.15))
        zone = Rectangle(width=0.55, height=g.y_axe(24)[1] - g.y_axe(20)[1] + 0.4, stroke_color=AMBRE,
                         stroke_width=5).move_to(P(g.y_axe(22)[0] - 0.08, g.y_axe(22)[1]))
        self.play(Create(zone), FadeIn(VGroup(carte, axe, *traits.values(), *nombres.values()), scale=0.5),
                  run_time=0.6)
        quatre = self.arc(y(20), y(24), xa, 0.5, "+4", BLEU_CALCUL)
        c1 = self.t("de 4 en 4", 38, BLEU_CALCUL).move_to(P(5.25, 1.2))
        self.play(Create(quatre[0]), FadeIn(quatre[1]), FadeIn(c1, shift=LEFT * 0.2), run_time=0.7)
        self.au_mot("un petit trait, c'est 2 de plus")
        self.play(traits[22].animate.scale(1.8).set_color(AMBRE), run_time=0.3)
        self.play(traits[22].animate.scale(1 / 1.8), FadeOut(quatre), run_time=0.3)
        deux = VGroup(self.arc(y(20), y(22), xa, 0.75, "+2", VERT_OK), self.arc(y(22), y(24), xa, 0.75, "+2", VERT_OK))
        c2 = VGroup(self.t("petit trait :", 34, AMBRE), self.t("2 de plus", 38, VERT_OK)).arrange(DOWN, buff=0.15)
        c2.move_to(P(5.25, -0.1))
        self.play(LaggedStart(*[AnimationGroup(Create(d[0]), FadeIn(d[1])) for d in deux], lag_ratio=0.6),
                  FadeIn(c2, shift=LEFT * 0.2), run_time=1.0)
        self.au_mot("La barre du bronze")
        self.play(g.focus(2, 0.35), run_time=0.4)
        fl = g.monter(2)
        tr = g.vers_axe(2)
        self.play(GrowArrow(fl), run_time=0.5)
        self.play(Create(tr), run_time=0.6)
        self.au_mot("ni à 20")
        x20 = croix(nombres[20].copy().scale(1.05), sw=6)
        self.play(Create(x20), nombres[20].animate.set_opacity(0.4), run_time=0.4)
        self.au_mot("ni à 24")
        x24 = croix(nombres[24].copy().scale(1.05), sw=6)
        self.play(Create(x24), nombres[24].animate.set_opacity(0.4), run_time=0.4)
        self.au_mot("c'est 22")
        p22 = g.lu(22).scale(1.25).next_to(traits[22], LEFT, buff=0.12)
        lu = g.lu(22)
        suite = DashedLine(g.y_axe(22), P(g._x_lu(), g.y_axe(22)[1]), color=AMBRE, stroke_width=6, dash_length=0.14)
        c3 = self.ligne([("c'est", WHITE), ("22", COUL_TXT[2])], 44).move_to(P(5.0, -1.4))
        self.play(FadeIn(p22, scale=1.6), Create(suite), FadeIn(lu, scale=1.6), FadeIn(c3, scale=0.7), run_time=0.5)
        coche = self.coche(VERT_OK, 0.3).next_to(c3, RIGHT, buff=0.25)
        self.play(Create(coche), run_time=0.3)
        self.insister(c3[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        g = self.graphe_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Quelle barre")
        q1 = VGroup(self.ligne([("1.", AMBRE), ("Quelle barre est", WHITE)], 38),
                    self.t("la plus haute ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.col(q1, 1.15)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.06) for b in g.barres], lag_ratio=0.3),
                  run_time=0.9)
        self.au_mot("combien de médailles")
        q2 = VGroup(self.ligne([("2.", AMBRE), ("Combien de médailles", WHITE)], 38),
                    self.t("en tout ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.col(q2, -0.35)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -1.65)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        g = self.graphe_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.45)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("La plus haute")
        haut = self.col(VGroup(medaille(ARGENT, 0.28), self.t("La plus haute : l'argent", 38)).arrange(RIGHT, buff=0.3),
                        1.35)
        self.play(FadeIn(haut, shift=RIGHT * 0.2), g.focus(1, 0.35), run_time=0.5)
        self.au_mot("c'est l'argent")
        fl, tr = g.monter(1), g.vers_axe(1, jusqu_au_lu=True)
        self.play(GrowArrow(fl), run_time=0.4)
        self.play(Create(tr), run_time=0.5)
        self.au_mot("avec 26")
        lu = g.lu(26)
        self.play(FadeIn(lu, scale=1.6), run_time=0.35)
        self.au_mot("En tout")
        self.play(g.rallumer(), FadeOut(fl), run_time=0.4)
        somme = self.ligne([("16", COUL_TXT[0]), ("+", WHITE), ("26", COUL_TXT[1]), ("+", WHITE),
                            ("22", COUL_TXT[2])], 58, 0.3)
        self.col(somme, 0.1)
        for k, (mot, idx) in enumerate([("16 plus", [0]), ("26 plus", [1, 2]), ("22, égale", [3, 4])]):
            self.au_mot(mot)
            self.play(*[FadeIn(somme[j], scale=1.5) for j in idx], Indicate(g.barres[k], color=WHITE,
                                                                             scale_factor=1.06), run_time=0.4)
        self.au_mot("64 médailles")
        tot = self.ligne([("=", WHITE), ("64", VERT_OK), ("médailles", WHITE)], 58, 0.3)
        tot.next_to(somme, DOWN, buff=0.4).align_to(somme, LEFT)
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.4)
        cadre = SurroundingRectangle(VGroup(somme, tot), color=VERT_OK, buff=0.22, corner_radius=0.15, stroke_width=5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(tot[1], 1.4, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        g = self.graphe_pret()
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)), run_time=0.7)
        textes = [("Je lis le titre", "et les catégories."), ("Je monte en haut,", "puis vers les nombres."),
                  ("Je regarde de combien", "en combien ils avancent.")]
        lignes = VGroup()
        for (a, b), y in zip(textes, [1.75, 0.15, -1.45]):
            bloc = VGroup(self.t(a, 36), self.t(b, 36)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            lg = VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.3)
            lignes.add(self.col(lg, y))
        self.au_mot("Je lis le titre")
        self.play(FadeIn(lignes[0][1], shift=RIGHT * 0.2), Indicate(g.titre, color=AMBRE), run_time=0.6)
        self.au_mot("les catégories")
        self.play(Indicate(g.etiquettes, color=AMBRE), Create(lignes[0][0]), run_time=0.6)
        self.au_mot("Je monte")
        fl = g.monter(1)
        self.play(FadeIn(lignes[1][1], shift=RIGHT * 0.2), GrowArrow(fl), run_time=0.7)
        self.au_mot("puis je vais vers les nombres")
        tr = g.vers_axe(1, jusqu_au_lu=True)
        self.play(Create(tr), Create(lignes[1][0]), run_time=0.7)
        self.play(FadeIn(g.lu(26), scale=1.5), run_time=0.3)
        self.au_mot("Et je regarde")
        self.play(FadeIn(lignes[2][1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("de combien en combien")
        self.play(LaggedStart(*[Indicate(g.nombre(v), color=AMBRE, scale_factor=1.4) for v in sorted(g.nombres)],
                              lag_ratio=0.25), Create(lignes[2][0]), run_time=1.4)
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre (modèle : stmg/proba_au_moins_un.py)."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_axes()
        self.ecran_or()
        self.ecran_autres()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class StatsGraphiqueLireCM1(StatsGraphiqueLireBase):
    identite = "Maths CM1 — EleveAI"


class StatsGraphiqueLireCM2(StatsGraphiqueLireBase):
    """Même vidéo pour le CM2 : seule l'identité change."""

    identite = "Maths CM2 — EleveAI"
