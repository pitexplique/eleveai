# stats_interpreter.py
# EleveAI — Maths 6e — série « Statistiques », épisode 09 : INTERPRÉTER UN
# GRAPHIQUE (micro du coach : stat_donnee_interpreter — lire les nombres et le
# début de l'axe avant de conclure ; l'axe TRONQUÉ du JT, `stat_graph` + yMin),
# AVEC VOIX. Paysage 16:9, CEINTURE ORANGE : il ne suffit plus de lire, il faut
# JUGER une affirmation et démasquer un axe qui ne part pas de 0 (deux crans
# au-dessus du « je vois », un au-dessus des épisodes de lecture, jaunes).
# Short jumeau : stats_interpreter_short.py (jaune, un cran plus bas).
#
# ⭐ Décor et métier : les MÉDIAS, le journal télévisé ; une JOURNALISTE DE
# DONNÉES vérifie les chiffres avant qu'on les montre. Le piège du
# statisticien : l'axe tronqué. Données : inscriptions à la médiathèque,
# 1 000 en 2024, 1 040 en 2025 (+40) ; l'axe du reportage part de 980, donc la
# barre de 2025 (60 au-dessus) paraît trois fois plus haute que celle de 2024
# (20 au-dessus). Défi : vélos, 500 en janvier, 1 000 en février = vraiment
# deux fois plus (axe depuis 0).
# ⭐ La figure est CELLE DU COACH (`stat_graph` barres, manim/canvas_stats.py ;
# mini=980 = le `yMin` du coach). Les nombres de l'axe du reportage sont d'abord
# CACHÉS (comme à la télévision), puis révélés à l'écran 04.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Écrans : 00 garde · 01 la journaliste de données, le reportage · 02 le
# graphique (× 3 ?!) · 03 lire les nombres (1 000, 1 040) · 04 l'axe commence
# à 980 · 05 le vrai graphique (axe depuis 0 : +40) · 06 le piège · 07 défi
# (vélos) · 07b correction (500 × 2 = 1 000) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/6e-stats-interpreter.json (débit −10), WAV dans
# public/sons/6e-stats-interpreter/ ; calage mot à mot :
# manim/scripts/6e/stats_interpreter_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_interpreter.py StatsInterpreter6e -o eleveai-maths-6e-stats-interpreter --media_dir manim/scripts/6e/media-interpreter
# Sortie : manim/sorties/6e/maths/statistiques/09-interpreter/eleveai-maths-6e-stats-interpreter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT, Barres, fr, texte  # noqa: E402

ANS = ["2024", "2025"]
INSCRITS = [1000, 1040]
C_BAR = ["#93c5fd", "#fca5a5"]
VELOS = [500, 1000]


def tele(largeur=4.6, hauteur=2.9):
    """Un téléviseur : cadre sombre, écran (le contenu se pose dessus), pied."""
    cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, fill_color="#1e293b",
                             fill_opacity=1, stroke_color="#64748b", stroke_width=4)
    ecran = RoundedRectangle(width=largeur - 0.35, height=hauteur - 0.35, corner_radius=0.1, fill_color="#0b1220",
                             fill_opacity=1, stroke_width=0)
    pied = Polygon(P(-0.3, -hauteur / 2), P(0.3, -hauteur / 2), P(0.6, -hauteur / 2 - 0.45),
                   P(-0.6, -hauteur / 2 - 0.45), fill_color="#475569", fill_opacity=1, stroke_width=0)
    return VGroup(pied, cadre, ecran)


def bandeau_jt(s, larg):
    """Le bandeau rouge du journal télévisé."""
    t = Text(s, font_size=30, color=WHITE, font="Arial", weight=BOLD)
    if t.width > larg - 0.3:
        t.scale_to_fit_width(larg - 0.3)
    fond = Rectangle(width=larg, height=t.height + 0.3, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    return VGroup(fond, t.move_to(fond))


def journaliste(r=0.3):
    tete = Circle(radius=r, fill_color="#8d5524", fill_opacity=1, stroke_width=0)
    chev = Circle(radius=r * 1.25, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(
        tete.get_center() + UP * r * 0.15)
    corps = Polygon(P(-1.8 * r, -4 * r), P(1.8 * r, -4 * r), P(1.2 * r, -1.15 * r), P(-1.2 * r, -1.15 * r),
                    fill_color="#0d9488", fill_opacity=1, stroke_width=0)
    ordi = VGroup(Polygon(P(-1.3 * r, -2.6 * r), P(1.3 * r, -2.6 * r), P(1.6 * r, -3.1 * r), P(-1.6 * r, -3.1 * r),
                          fill_color="#cbd5e1", fill_opacity=1, stroke_width=0),
                  Rectangle(width=2.4 * r, height=1.5 * r, fill_color="#334155", fill_opacity=1, stroke_color="#cbd5e1",
                            stroke_width=3).move_to(P(0, -1.85 * r)))
    return VGroup(chev, tete, corps, ordi).shift(RIGHT * 0)


def velo(s=0.5, c="#22c55e"):
    r1 = Circle(radius=0.35, stroke_color=WHITE, stroke_width=4).move_to(P(-0.55, 0))
    r2 = Circle(radius=0.35, stroke_color=WHITE, stroke_width=4).move_to(P(0.55, 0))
    cadre = VMobject(stroke_color=c, stroke_width=6).set_points_as_corners(
        [P(-0.55, 0), P(-0.1, 0), P(0.3, 0.45), P(-0.25, 0.45), P(-0.1, 0), P(0.3, 0.45), P(0.55, 0)])
    selle = Line(P(-0.35, 0.6), P(-0.1, 0.6), stroke_color=WHITE, stroke_width=5)
    guidon = Line(P(0.25, 0.6), P(0.45, 0.6), stroke_color=WHITE, stroke_width=5)
    return VGroup(r1, r2, cadre, selle, guidon).scale(s)


def livres(s=0.5):
    cs = ["#ef4444", "#3b82f6", "#eab308", "#22c55e"]
    return VGroup(*[Rectangle(width=0.22, height=0.9 - 0.08 * (k % 2), fill_color=c, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5) for k, c in enumerate(cs)]).arrange(
        RIGHT, buff=0.03, aligned_edge=DOWN).scale(s / 0.5)


class StatsInterpreterBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-interpreter"
    fichier_marques = "stats_interpreter_marques.json"
    identite = "Maths 6e — EleveAI"
    G = P(-3.3, -0.3)

    def graphe_jt(self, centre=None, cache=True, titre="Médiathèque : inscrits", **kw):
        """Le graphique du reportage : axe TRONQUÉ (de 980 à 1 060), nombres cachés."""
        g = Barres(ANS, INSCRITS, pas=20, mini=980, maxi=1060, couleurs=C_BAR, nom_axe="Inscrits",
                   titre=titre, largeur=4.0, hauteur=4.0, fs=28,
                   centre=self.G if centre is None else centre, **kw)
        if cache:
            for nb in g.nombres.values():
                nb.set_opacity(0)
        return g

    def graphe_vrai(self, centre=None, titre="Médiathèque : inscrits", **kw):
        """Le même graphique, axe depuis 0."""
        return Barres(ANS, INSCRITS, pas=200, maxi=1200, couleurs=C_BAR, nom_axe="Inscrits",
                      titre=titre, largeur=4.0, hauteur=4.0, fs=28,
                      centre=self.G if centre is None else centre, **kw)

    def empiler(self, g, i_base, n, couleur=WHITE):
        """n copies (contour) de la barre i_base posées l'une sur l'autre, à côté
        de la barre suivante : « trois fois plus haute ? »."""
        b = g.barres[i_base]
        h = b.height
        x = g.barres[i_base + 1].get_right()[0] + 0.32
        y0 = b.get_bottom()[1]
        return VGroup(*[Rectangle(width=0.32, height=h, stroke_color=couleur, stroke_width=5, fill_opacity=0)
                        .move_to(P(x, y0 + h * (k + 0.5))) for k in range(n)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter un graphique", self.identite, "orange")
        tv = tele(3.6, 2.4).move_to(P(-0.6, 0.15))
        g = Barres(["", ""], INSCRITS, pas=20, mini=980, maxi=1060, couleurs=C_BAR, largeur=1.9, hauteur=1.3,
                   fs=18, carte=False)
        for nb in g.nombres.values():
            nb.set_opacity(0)
        g.move_to(tv[2])
        fond = RoundedRectangle(width=2.9, height=1.75, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                                stroke_width=0).move_to(tv[2])
        self.au_mot("Au journal télévisé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tv, scale=0.9),
                  FadeIn(fond), FadeIn(g.fond), run_time=0.6)
        self.play(g.pousser(run_time=0.7))
        self.au_mot("peut tromper")
        q = self.t("?", 80, ROUGE_ERREUR).next_to(tv, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.25)
        self.au_mot("démasquer")
        loupe = VGroup(Circle(radius=0.5, stroke_color=AMBRE, stroke_width=8),
                       Line(P(0.36, -0.36), P(0.85, -0.85), stroke_color=AMBRE, stroke_width=12))
        loupe.move_to(tv[2].get_corner(DL) + P(0.5, 0.45))
        self.play(FadeIn(loupe, scale=0.5), run_time=0.4)
        self.play(loupe.animate.shift(RIGHT * 0.3 + UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : la journaliste de données ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une journaliste de données")
        pers = journaliste().scale(1.6).move_to(P(-4.6, 0.0))
        metier = self.t("Journaliste de données", 44, BLEU_CALCUL).move_to(P(-3.4, 2.7))
        self.play(FadeIn(pers, shift=UP * 0.3), Write(metier), run_time=0.8)
        self.au_mot("vérifie les chiffres")
        coches = VGroup(*[self.coche(VERT_OK, 0.2) for _ in range(3)]).arrange(DOWN, buff=0.25).next_to(pers, RIGHT,
                                                                                                    buff=0.3)
        self.play(LaggedStart(*[Create(c) for c in coches], lag_ratio=0.3), run_time=0.8)
        self.au_mot("à la télévision")
        tv = tele(6.2, 3.7).move_to(P(3.2, 0.5))
        self.play(FadeIn(tv, scale=0.9), run_time=0.5)
        self.au_mot("un reportage annonce")
        lv = livres(1.3).move_to(tv[2].get_center() + UP * 0.55)
        self.play(FadeIn(lv, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Les inscriptions")
        b = bandeau_jt("Les inscriptions à la médiathèque\nEXPLOSENT !", tv[2].width).move_to(
            tv[2].get_bottom() + UP * 0.6)
        self.play(FadeIn(b, shift=LEFT * 0.4), run_time=0.5)
        self.au_mot("explosent")
        self.play(Flash(b, color=ORANGE_RETENUE, line_length=0.35, flash_radius=1.6), run_time=0.6)
        self.insister(b, 1.08, 0.25)
        self.attendre_voix()

    # ── 02 : le graphique du reportage ──────────────────────────────────────

    def ecran_graph(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-graph")
        g = self.graphe_jt()
        self.au_mot("Sur le graphique")
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.play(g.pousser(run_time=0.9))
        self.add(g)
        self.au_mot("la barre de 2025")
        self.play(g.focus(1, 0.5), run_time=0.4)
        self.au_mot("trois fois plus haute")
        pile = self.empiler(g, 0, 3, ORANGE_RETENUE)
        e = self.col(self.ligne([("3 fois", ORANGE_RETENUE), ("plus haute ?!", WHITE)], 46), 1.2)
        self.play(g.rallumer(), run_time=0.2)
        self.play(LaggedStart(*[Create(r) for r in pile], lag_ratio=0.4), FadeIn(e, shift=RIGHT * 0.2),
                  run_time=1.0)
        self.au_mot("Impressionnant")
        imp = self.col(self.t("Impressionnant !", 50, ORANGE_RETENUE), -0.2)
        self.play(FadeIn(imp, scale=1.5), run_time=0.4)
        self.insister(imp, 1.15, 0.3)
        self.attendre_voix()

    # ── 03 : lire les nombres ───────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.graphe_jt()
        self.add(g)
        self.au_mot("Mais la journaliste lit les nombres")
        tit = self.col(self.t("Je lis les nombres", 44, JAUNE_TITRE), 2.4)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), run_time=0.4)
        vals = []
        for i, (m1, m2, y) in enumerate([("2024 :", "1 000 inscrits", 1.2), ("2025 :", "1 040 inscrits", 0.0)]):
            self.au_mot(m1)
            l = self.ligne([(ANS[i] + " :", C_BAR[i]), (fr(INSCRITS[i]), WHITE), ("inscrits", WHITE)], 44)
            self.col(l, y)
            self.play(g.focus(i, 0.4), FadeIn(l[0], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(m2)
            v = g.valeur(i, fs=28)
            self.play(FadeIn(v, scale=1.6), FadeIn(l[1:], scale=1.3), run_time=0.4)
            vals.append(v)
        self.play(g.rallumer(), run_time=0.3)
        self.attendre_voix()

    # ── 04 : l'axe commence à 980 ───────────────────────────────────────────

    def ecran_axe(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-axe")
        g = self.graphe_jt()
        self.add(g, *[g.valeur(i, fs=28) for i in range(2)])
        self.au_mot("elle regarde l'axe")
        tit = self.col(self.t("Je regarde l'axe", 44, JAUNE_TITRE), 2.4)
        self.play(FadeIn(tit, shift=RIGHT * 0.2), Indicate(g.axe_y, color=AMBRE), run_time=0.6)
        self.au_mot("il ne commence pas à 0")
        z = self.col(self.ligne([("pas à", WHITE), ("0", ROUGE_ERREUR), ("!", ROUGE_ERREUR)], 46), 1.2)
        self.play(FadeIn(z, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Il commence à 980")
        nb = g.nombre(980)
        self.play(nb.animate.set_opacity(1), run_time=0.3)
        self.play(nb.animate.scale(1.9).set_color(ROUGE_ERREUR), run_time=0.35)
        self.play(nb.animate.scale(1 / 1.9), run_time=0.35)
        d = self.col(self.ligne([("mais à", WHITE), ("980", ROUGE_ERREUR)], 46), 0.1)
        self.play(FadeIn(d, scale=0.7), LaggedStart(*[g.nombre(v).animate.set_opacity(1)
                                                      for v in (1000, 1020, 1040, 1060)], lag_ratio=0.2),
                  run_time=0.7)
        self.au_mot("On a coupé le bas des barres")
        # les bas coupés : ce qui manque sous l'axe, en pointillé, et la coupure en zigzag
        y0 = g.axe_x.get_start()[1]
        manque = VGroup()
        for b in g.barres:
            x0, x1 = b.get_left()[0], b.get_right()[0]
            manque.add(DashedVMobject(Rectangle(width=x1 - x0, height=1.1).move_to(P((x0 + x1) / 2, y0 - 0.55)),
                                      num_dashes=24).set_stroke(ROUGE_ERREUR, 3))
        zz = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=5).set_points_as_corners(
            [P(g.axe_x.get_start()[0] + 0.15 * k, y0 + (0.08 if k % 2 else -0.08)) for k in range(int(4.1 / 0.15))])
        c = self.col(self.bloc(["On a coupé", "le bas des barres !"], 42, ROUGE_ERREUR), -1.3)
        self.play(Create(zz), Create(manque), FadeIn(c, shift=UP * 0.2), run_time=0.8)
        self.insister(c, 1.08, 0.3)
        self.attendre_voix()

    # ── 05 : le vrai graphique ──────────────────────────────────────────────

    def ecran_vrai(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-vrai")
        g = self.graphe_jt(cache=False)
        self.add(g)
        self.au_mot("Avec un axe qui part de 0")
        g2 = self.graphe_vrai()
        tit = self.col(self.ligne([("Axe depuis", WHITE), ("0", VERT_OK)], 44), 2.4)
        self.play(FadeTransform(g, g2), FadeIn(tit, shift=RIGHT * 0.2), run_time=1.2)
        self.au_mot("presque pareilles")
        niveau = DashedLine(g2.barres[0].get_corner(UL) + LEFT * 0.1, g2.barres[1].get_corner(UR) + RIGHT * 0.15,
                            color=AMBRE, stroke_width=4, dash_length=0.1).shift(
            UP * (g2.barres[0].get_top()[1] - g2.barres[0].get_corner(UL)[1]))
        pp = self.col(self.t("presque pareilles", 42, AMBRE), 1.4)
        self.play(Create(niveau), FadeIn(pp, shift=RIGHT * 0.2), run_time=0.5)
        calc = self.ligne([("1 040", C_BAR[1]), ("−", WHITE), ("1 000", C_BAR[0]), ("=", WHITE), ("40", VERT_OK)],
                          46, 0.22)
        self.col(calc, 0.3)
        self.au_mot("1 040 moins")
        self.play(FadeIn(calc[0], scale=1.4), FadeIn(calc[1]), run_time=0.35)
        self.au_mot("1 000, égale")
        self.play(FadeIn(calc[2], scale=1.4), FadeIn(calc[3]), run_time=0.35)
        self.au_mot("40 inscrits de plus")
        plus = self.col(self.t("inscrits de plus", 40), -0.45)
        self.play(FadeIn(calc[4], scale=1.6), FadeIn(plus), run_time=0.4)
        self.insister(calc[4], 1.4, 0.25)
        self.au_mot("Ça augmente un peu")
        u = self.col(self.t("Ça augmente un peu.", 40, VERT_OK), -1.35)
        self.play(FadeIn(u, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Ça n'explose pas")
        n = self.col(self.t("Ça n'explose pas !", 40, ROUGE_ERREUR), -2.1)
        self.play(FadeIn(n, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Le piège")
        titre = self.t("Le piège", 50, ROUGE_ERREUR).to_edge(UP, buff=0.35)
        # deux cartes ENTIÈRES côte à côte, sans chevauchement (titre court : « Médiathèque »)
        g1 = self.graphe_jt(cache=False, titre="Médiathèque").scale_to_fit_width(3.25)
        g2 = self.graphe_vrai(titre="Médiathèque").scale_to_fit_width(3.25)
        g1.move_to(P(0, -0.2)).align_to(P(-6.85, 0), LEFT)
        g2.move_to(P(0, -0.2)).next_to(g1, RIGHT, buff=0.3)
        self.play(Write(titre), FadeIn(g1), FadeIn(g2), run_time=0.7)
        self.au_mot("croire la hauteur des barres")
        x = croix(g1.barres, sw=6)
        e1 = self.col(self.bloc(["croire la hauteur", "des barres"], 38, ROUGE_ERREUR), 1.7, xl=0.9)
        self.play(Create(x), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("sans lire les nombres")
        e2 = self.col(self.bloc(["lire les nombres"], 38, VERT_OK), 0.5, xl=0.9)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), Circumscribe(VGroup(*g2.nombres.values()), color=VERT_OK),
                  run_time=0.6)
        self.au_mot("ni le début de l'axe")
        e3 = self.col(self.bloc(["et le début de l'axe"], 38, VERT_OK), -0.2, xl=0.9)
        self.play(FadeIn(e3, shift=RIGHT * 0.2), Indicate(g1.nombre(980), color=ROUGE_ERREUR, scale_factor=1.8),
                  Indicate(g2.nombre(0), color=VERT_OK, scale_factor=1.8), run_time=0.7)
        self.au_mot("Interpréter, c'est vérifier")
        e4 = self.col(self.bloc(["Interpréter,", "c'est vérifier", "avant de conclure."], 36, JAUNE_TITRE), -1.45,
                      xl=0.9)
        self.play(FadeIn(e4, shift=UP * 0.2), Create(self.coche(VERT_OK, 0.3).next_to(g2, DOWN, buff=0.15)),
                  run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi (les vélos) ───────────────────────────────────────────────

    def graphe_velos(self, centre=None):
        return Barres(["janvier", "février"], VELOS, pas=200, maxi=1200, couleurs=["#86efac", "#22c55e"],
                      nom_axe="Vélos vendus", titre="Vélos vendus", largeur=4.0, hauteur=4.0, fs=28,
                      centre=self.G if centre is None else centre)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        g = self.graphe_velos()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), FadeIn(g.fond, scale=0.95), run_time=0.6)
        self.au_mot("500 vélos")
        v0 = g.valeur(0, fs=28)
        l1 = self.col(VGroup(velo(0.45), self.ligne([("500", WHITE), ("en janvier", WHITE)], 40)).arrange(
            RIGHT, buff=0.3), 1.5)
        self.play(g.pousser(0, run_time=0.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        self.play(FadeIn(v0, scale=1.5), run_time=0.3)
        self.au_mot("1 000 en février")
        v1 = g.valeur(1, fs=28)
        l2 = self.col(VGroup(velo(0.45), self.ligne([("1 000", WHITE), ("en février", WHITE)], 40)).arrange(
            RIGHT, buff=0.3), 0.6)
        self.play(g.pousser(1, run_time=0.6), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.play(FadeIn(v1, scale=1.5), run_time=0.3)
        self.au_mot("Le journal dit")
        b = bandeau_jt("« deux fois plus »", 4.6)
        self.col(b, -0.4)
        self.play(FadeIn(b, shift=LEFT * 0.4), run_time=0.5)
        self.au_mot("A-t-il raison")
        r = self.col(self.t("A-t-il raison ?", 44, ORANGE_RETENUE), -1.2)
        self.play(FadeIn(r, scale=0.7), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -1.95)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        g = self.graphe_velos()
        self.add(g, g.valeur(0, fs=28), g.valeur(1, fs=28))
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Oui")
        oui = self.col(self.t("Oui !", 52, VERT_OK), 1.65)
        self.play(FadeIn(oui, scale=1.5), run_time=0.35)
        calc = self.ligne([("500", WHITE), ("×", WHITE), ("2", AMBRE), ("=", WHITE), ("1 000", VERT_OK)], 50, 0.25)
        self.col(calc, 0.6)
        self.au_mot("500 fois 2")
        pile = self.empiler(g, 0, 2, AMBRE)
        self.play(FadeIn(calc[:3], scale=1.3), LaggedStart(*[Create(r) for r in pile], lag_ratio=0.5), run_time=0.8)
        self.au_mot("égale 1 000")
        self.play(FadeIn(calc[3:], scale=1.3), Indicate(g.barres[1], color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.play(Create(self.encadrer(calc)), run_time=0.35)
        self.au_mot("vraiment deux fois plus")
        v = self.col(self.bloc(["Cette fois, c'est vraiment", "deux fois plus !"], 38, VERT_OK), -0.45)
        self.play(FadeIn(v, shift=UP * 0.2), Circumscribe(g.nombre(0), color=VERT_OK), run_time=0.6)
        self.au_mot("Lire les nombres")
        l = self.col(self.bloc(["Lire les nombres :", "savoir quand", "le titre dit vrai."], 34, JAUNE_TITRE), -1.75, xl=0.9)
        self.play(FadeIn(l, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g = self.graphe_vrai()
        self.add(g)
        lignes = self.finale([("Je lis le titre,", "les nombres", "et le début de l'axe."),
                              ("Je compare", "les vrais nombres."),
                              ("Je dis seulement ce que", "les données montrent.")], [1.9, 0.3, -1.2])
        self.au_mot("je lis le titre")
        self.montrer_ligne(lignes[0], Circumscribe(g.titre, color=AMBRE))
        self.au_mot("le début de l'axe")
        self.play(Indicate(g.nombre(0), color=AMBRE, scale_factor=2), run_time=0.6)
        self.au_mot("Je compare les vrais nombres")
        self.montrer_ligne(lignes[1], *[FadeIn(g.valeur(i, fs=28), scale=1.4) for i in range(2)])
        self.au_mot("Et je dis seulement")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_graph()
        self.ecran_lire()
        self.ecran_axe()
        self.ecran_vrai()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsInterpreter6e(StatsInterpreterBase):
    identite = "Maths 6e — EleveAI"
