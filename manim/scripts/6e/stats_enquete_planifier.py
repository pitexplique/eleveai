# stats_enquete_planifier.py
# EleveAI — Maths 6e — série « Statistiques », épisode 04 : PLANIFIER UNE
# ENQUÊTE (micro du coach : stat_enquete_planifier — la question exacte, et à
# qui la poser), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE : aucun calcul, mais
# un raisonnement de statisticien (échantillon biaisé, question vague) qu'il
# faut juger soi-même ; un cran au-dessus du « je vois ». Short jumeau :
# stats_enquete_planifier_short.py (blanche).
#
# ⭐ Décor et métier : les RÉSEAUX SOCIAUX et le sondage ; une CHARGÉE
# D'ÉTUDES prépare des enquêtes justes. Le piège du statisticien : « tout le
# monde le pense » sur un réseau = un échantillon biaisé.
# Données : 180 « oui » sur 200 réponses (les abonnés d'un compte) ; le
# collège : 4 niveaux de 80 élèves (points), 20 tirés au hasard par niveau,
# 80 en tout.
# ⭐ Le collège est DESSINÉ : un point par élève, une couleur par niveau ; les
# abonnés du compte sont un petit groupe dans un coin ; l'échantillon juste
# allume 20 points dans CHAQUE colonne, éparpillés (le hasard se voit).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit ; les noms
# des niveaux (6e, 5e, 4e, 3e) sont des étiquettes.
#
# Écrans : 00 garde · 01 le sondage du réseau (180 sur 200) · 02 qui a
# répondu ? (le biais) · 03 la chargée d'études, deux questions · 04 la
# question exacte (vague / un nombre) · 05 à qui ? (4 × 20 au hasard = 80) ·
# 06 le piège (ses amis, sa classe) · 07 défi (l'équipe de basket) · 07b
# correction · 08 ce que tu as appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/6e-stats-enquete-planifier.json (débit −10), WAV dans
# public/sons/6e-stats-enquete-planifier/ ; calage mot à mot :
# manim/scripts/6e/stats_enquete_planifier_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/6e/stats_enquete_planifier.py StatsEnquetePlanifier6e -o eleveai-maths-6e-stats-enquete-planifier --media_dir manim/scripts/6e/media-enquete-planifier
# Sortie : manim/sorties/6e/maths/statistiques/04-enquete-planifier/eleveai-maths-6e-stats-enquete-planifier.mp4

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats6_lotc_commun import *  # noqa: E402,F403
from canvas_stats import AMBRE, NUIT  # noqa: E402

NIVEAUX = ["6e", "5e", "4e", "3e"]
C_NIV = ["#93c5fd", "#fcd34d", "#6ee7b7", "#fca5a5"]  # une couleur par niveau (celles du coach)
GRIS_PT = "#475569"


# ── les dessins ─────────────────────────────────────────────────────────────

def telephone(h=3.6):
    """Un smartphone : coque sombre, écran clair (le contenu se pose dessus)."""
    w = h * 0.52
    coque = RoundedRectangle(width=w, height=h, corner_radius=0.25, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=4)
    ecran = RoundedRectangle(width=w - 0.22, height=h - 0.5, corner_radius=0.12, fill_color="#f8fafc",
                             fill_opacity=1, stroke_width=0)
    hp = RoundedRectangle(width=0.5, height=0.07, corner_radius=0.03, fill_color="#64748b", fill_opacity=1,
                          stroke_width=0).move_to(coque.get_top() + DOWN * 0.13)
    return VGroup(coque, ecran, hp)


def college(n_col=5, n_lig=16, pas=0.23, r=0.08, gap=0.5, couleurs=True):
    """Le collège : 4 colonnes (une par niveau) de points, un point = un élève.
    Renvoie un VGroup de 4 VGroup de points (colonnes[k][i])."""
    cols = VGroup()
    for k in range(4):
        pts = VGroup(*[Dot(P(i * pas, -j * pas), radius=r, color=C_NIV[k] if couleurs else GRIS_PT)
                       for j in range(n_lig) for i in range(n_col)])
        cols.add(pts)
    cols.arrange(RIGHT, buff=gap)
    return cols


def personne(couleur="#7c3aed", peau="#c68642", cheveux="#1f2937", r=0.3):
    tete = Circle(radius=r, fill_color=peau, fill_opacity=1, stroke_width=0)
    chev = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color=cheveux,
                         fill_opacity=1, stroke_width=0).move_to(tete.get_top() + DOWN * r * 0.32)
    corps = Polygon(P(-1.7 * r, -3.9 * r), P(1.7 * r, -3.9 * r), P(1.2 * r, -1.15 * r), P(-1.2 * r, -1.15 * r),
                    fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(corps, tete, chev)


def ballon(r=0.5):
    b = Circle(radius=r, fill_color="#ea580c", fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    l1 = Line(P(-r, 0), P(r, 0), stroke_color=NUIT, stroke_width=3)
    l2 = Line(P(0, -r), P(0, r), stroke_color=NUIT, stroke_width=3)
    a1 = ArcBetweenPoints(P(-0.6 * r, 0.8 * r), P(-0.6 * r, -0.8 * r), angle=-PI / 2.2, stroke_color=NUIT,
                          stroke_width=3)
    a2 = ArcBetweenPoints(P(0.6 * r, 0.8 * r), P(0.6 * r, -0.8 * r), angle=PI / 2.2, stroke_color=NUIT,
                          stroke_width=3)
    return VGroup(b, l1, l2, a1, a2)


def lune(r=0.45):
    d = Circle(radius=r, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    trou = Circle(radius=r * 0.85, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(P(0.4 * r, 0.25 * r))
    return VGroup(d, trou)


def carte_question(s, color=NUIT, fs=32, larg=None):
    """Une question écrite sur une carte blanche (style coach)."""
    t = Text(s, font_size=fs, color=color, font="Arial", weight=BOLD)
    if larg and t.width > larg - 0.4:
        t.scale_to_fit_width(larg - 0.4)
    fond = RoundedRectangle(width=(larg or t.width + 0.5), height=t.height + 0.4, corner_radius=0.15,
                            fill_color=WHITE, fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
    return VGroup(fond, t.move_to(fond))


def tirage(col, n, graine):
    """n points tirés au hasard dans une colonne (la même graine = le même tirage)."""
    rnd = random.Random(graine)
    return VGroup(*[col[i] for i in sorted(rnd.sample(range(len(col)), n))])


class StatsEnquetePlanifierBase(MotsCales6, OutilsPaysage, Notion6e):
    nom_voix = "6e-stats-enquete-planifier"
    fichier_marques = "stats_enquete_planifier_marques.json"
    identite = "Maths 6e — EleveAI"

    def college_pose(self, centre=P(-3.45, -0.2), echelle=0.95):
        """Le collège dessiné (non ajouté), avec le nom des niveaux sous les colonnes."""
        cols = college().scale(echelle).move_to(centre)
        noms = VGroup(*[self.t(n, 30, C_NIV[k]).next_to(cols[k], DOWN, buff=0.2) for k, n in enumerate(NIVEAUX)])
        cadre = SurroundingRectangle(VGroup(cols, noms), color="#64748b", buff=0.25, corner_radius=0.15,
                                     stroke_width=3)
        lab = self.t("le collège", 32, "#94a3b8").next_to(cadre, UP, buff=0.12)
        return cols, noms, cadre, lab

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Planifier une enquête", self.identite, "jaune")
        bulle = carte_question("« Tout le monde le pense. »", fs=40).move_to(P(-1.2, 0.3))
        pointe = Polygon(P(-2.6, -0.2), P(-2.0, -0.2), P(-2.9, -0.8), fill_color=WHITE, fill_opacity=1,
                         stroke_width=0)
        self.au_mot("Tout le monde")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(VGroup(pointe, bulle), scale=0.8),
                  run_time=0.6)
        self.au_mot("Vraiment")
        q = self.t("Vraiment ?", 60, ORANGE_RETENUE).next_to(bulle, RIGHT, buff=0.4)
        if q.get_right()[0] > 6.6:
            q.shift(LEFT * (q.get_right()[0] - 6.6))
            VGroup(bulle, pointe).shift(LEFT * 1.2)
        self.play(FadeIn(q, scale=0.4), run_time=0.35)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : le sondage du réseau social ────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        tel = telephone(5.8).move_to(P(-3.9, -0.2))
        ec = tel[1]
        self.au_mot("Sur un réseau social")
        self.play(FadeIn(tel, shift=UP * 0.3), run_time=0.6)
        self.au_mot("faut-il finir")
        compte = VGroup(Circle(radius=0.18, fill_color="#ec4899", fill_opacity=1, stroke_width=0),
                        Text("@un_compte", font_size=22, color=NUIT, font="Arial", weight=BOLD)).arrange(RIGHT, buff=0.12)
        compte.move_to(ec.get_top() + DOWN * 0.4)
        q = VGroup(*[Text(s, font_size=26, color=NUIT, font="Arial", weight=BOLD) for s in
                     ("Faut-il finir", "les cours à midi ?")]).arrange(DOWN, buff=0.08)
        q.scale_to_fit_width(ec.width - 0.4).next_to(compte, DOWN, buff=0.3)
        self.play(FadeIn(compte), FadeIn(q, shift=UP * 0.2), run_time=0.5)
        lq = self.col(self.t("Finir les cours à midi ?", 40), 2.3)
        self.play(FadeIn(lq, shift=RIGHT * 0.2), run_time=0.4)
        # la barre du sondage dans le téléphone
        x0, larg = ec.get_left()[0] + 0.25, ec.width - 0.5
        rail = RoundedRectangle(width=larg, height=0.42, corner_radius=0.1, fill_color="#e2e8f0", fill_opacity=1,
                                stroke_width=0).move_to(P(ec.get_center()[0], q.get_bottom()[1] - 1.1))
        plein = RoundedRectangle(width=larg * 0.9, height=0.42, corner_radius=0.1, fill_color="#22c55e",
                                 fill_opacity=1, stroke_width=0).align_to(rail, LEFT).align_to(rail, DOWN)
        oui = Text("Oui", font_size=24, color=WHITE, font="Arial", weight=BOLD).move_to(rail).align_to(
            P(x0 + 0.15, 0), LEFT)
        self.au_mot("180 réponses oui")
        n180 = Text("180", font_size=31, color=NUIT, font="Arial", weight=BOLD)
        n200 = Text("sur 200", font_size=31, color=NUIT, font="Arial", weight=BOLD)
        VGroup(n180, n200).arrange(RIGHT, buff=0.12).next_to(rail, DOWN, buff=0.15)
        r1 = self.col(self.ligne([("180", VERT_OK), ("oui", WHITE)], 48), 1.1)
        self.play(FadeIn(rail), GrowFromEdge(plein, LEFT), FadeIn(oui), FadeIn(n180), FadeIn(r1, scale=0.6),
                  run_time=0.6)
        self.au_mot("sur 200")
        r2 = self.col(self.ligne([("sur", WHITE), ("200", AMBRE), ("réponses", WHITE)], 48), 0.1)
        self.play(FadeIn(r2, scale=0.6), FadeIn(n200), run_time=0.4)
        self.insister(r1[0], 1.3, 0.25)
        self.au_mot("tout le monde est d'accord")
        acc = self.col(self.t("Tout le monde d'accord ?", 40, ORANGE_RETENUE), -1.3)
        self.play(FadeIn(acc, shift=UP * 0.2), run_time=0.45)
        self.insister(acc, 1.12, 0.3)
        self.attendre_voix()

    # ── 02 : qui a répondu ? ────────────────────────────────────────────────

    def ecran_biais(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-biais")
        cols, noms, cadre, lab = self.college_pose()
        self.au_mot("Non")
        non = self.col(self.t("Non !", 60, ROUGE_ERREUR), 2.6)
        self.play(FadeIn(non, scale=1.6), run_time=0.35)
        self.au_mot("Qui a répondu")
        qui = self.col(self.t("Qui a répondu ?", 42), 1.6)
        self.play(FadeIn(qui, shift=RIGHT * 0.2), FadeIn(VGroup(cols, noms, cadre, lab)), run_time=0.6)
        self.au_mot("Seulement les abonnés")
        # les abonnés : un petit groupe, dans un coin (surtout une couleur)
        abon = VGroup(*[cols[0][i] for i in (0, 1, 2, 5, 6, 7, 10, 11)], *[cols[1][i] for i in (0, 1, 5)])
        bulle = SurroundingRectangle(abon, color="#ec4899", buff=0.12, corner_radius=0.2, stroke_width=6)
        ab = self.col(self.t("les abonnés du compte", 38, "#f9a8d4"), 0.55)
        self.play(VGroup(*[p for c in cols for p in c if p not in abon]).animate.set_opacity(0.25),
                  Create(bulle), FadeIn(ab, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("ceux qui avaient envie")
        env = self.col(self.bloc(["qui avaient envie", "de répondre"], 38, "#f9a8d4"), -0.35)
        self.play(FadeIn(env, shift=RIGHT * 0.2), LaggedStart(*[Indicate(p, scale_factor=2.2, color=WHITE)
                                                                for p in abon], lag_ratio=0.08), run_time=1.0)
        self.au_mot("Ils ne représentent pas")
        ne = self.col(self.bloc(["pas tout le collège"], 42, ROUGE_ERREUR), -1.75)
        self.play(FadeIn(ne, shift=UP * 0.2), Indicate(cadre, color=ROUGE_ERREUR), run_time=0.6)
        self.play(VGroup(*[p for c in cols for p in c]).animate.set_opacity(1), run_time=0.5)
        self.insister(ne, 1.12, 0.3)
        self.attendre_voix()

    # ── 03 : la chargée d'études ────────────────────────────────────────────

    def ecran_metier(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-metier")
        self.au_mot("Préparer une enquête juste")
        pers = personne().scale(2.3).move_to(P(-4.3, -0.2))
        bloc = RoundedRectangle(width=1.5, height=1.9, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                                stroke_color="#94a3b8", stroke_width=3).scale(1.4).move_to(P(-1.9, -0.5))
        traits = VGroup(*[VGroup(Square(0.18, stroke_color=NUIT, stroke_width=3),
                                 Line(P(0, 0), P(0.8, 0), stroke_color="#94a3b8", stroke_width=5)).arrange(RIGHT, buff=0.12)
                          for _ in range(4)]).arrange(DOWN, buff=0.22).scale(1.4).move_to(bloc)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(VGroup(bloc, traits), shift=UP * 0.3), run_time=0.7)
        self.au_mot("chargée d'études")
        metier = self.t("Chargée d'études", 48, BLEU_CALCUL).move_to(P(-3.2, 2.6))
        self.play(Write(metier), run_time=0.6)
        self.insister(metier, 1.15, 0.3)
        self.au_mot("deux questions")
        q1 = self.col(self.ligne([("1.", AMBRE), ("Quelle question ?", WHITE)], 44), 1.0)
        q2 = self.col(self.ligne([("2.", AMBRE), ("À qui la poser ?", WHITE)], 44), -0.4)
        self.play(LaggedStart(FadeIn(q1, shift=RIGHT * 0.3), FadeIn(q2, shift=RIGHT * 0.3), lag_ratio=0.4),
                  run_time=0.9)
        self.attendre_voix()

    # ── 04 : la question exacte ─────────────────────────────────────────────

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        self.au_mot("Un : quelle question")
        h = self.ligne([("1.", AMBRE), ("Quelle question exacte ?", JAUNE_TITRE)], 46).to_edge(UP, buff=0.45)
        self.play(FadeIn(h, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("Aimes-tu le sport")
        vague = carte_question("« Aimes-tu le sport ? »", fs=36).move_to(P(-2.6, 1.3))
        self.play(FadeIn(vague, scale=0.8), run_time=0.45)
        self.au_mot("c'est trop vague")
        x = croix(vague, sw=6)
        tv = self.t("trop vague", 40, ROUGE_ERREUR).next_to(vague, RIGHT, buff=0.5)
        rep = VGroup(*[self.t(s, 30, "#94a3b8") for s in ("« un peu »", "« bof »", "« oui ! »")])
        rep.arrange(RIGHT, buff=0.4).next_to(vague, DOWN, buff=0.25)
        self.play(Create(x), FadeIn(tv, shift=LEFT * 0.2), LaggedStart(*[FadeIn(r) for r in rep], lag_ratio=0.3),
                  run_time=0.8)
        self.au_mot("Combien de fois")
        bonne = carte_question("« Combien de fois par semaine fais-tu du sport ? »", fs=34).move_to(P(-0.5, -1.0))
        self.play(FadeIn(bonne, scale=0.8), run_time=0.5)
        self.au_mot("la réponse est un nombre")
        cad = self.encadrer(bonne, VERT_OK, 0.12)
        nb = self.t("la réponse est un nombre", 40, VERT_OK).next_to(bonne, DOWN, buff=0.45)
        self.play(Create(cad), FadeIn(nb, shift=UP * 0.2), run_time=0.5)
        self.insister(nb, 1.15, 0.3)
        self.attendre_voix()

    # ── 05 : à qui la poser ? ───────────────────────────────────────────────

    def ecran_qui(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-qui")
        cols, noms, cadre, lab = self.college_pose()
        self.au_mot("Deux : à qui")
        h = self.col(self.ligne([("2.", AMBRE), ("À qui la poser ?", JAUNE_TITRE)], 44), 2.6)
        self.play(FadeIn(h, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le collège a 4 niveaux")
        n4 = self.col(self.ligne([("4", AMBRE), ("niveaux", WHITE)], 44), 1.5)
        self.play(FadeIn(VGroup(cadre, lab)), LaggedStart(*[FadeIn(VGroup(c, n), shift=UP * 0.2)
                                                           for c, n in zip(cols, noms)], lag_ratio=0.25),
                  FadeIn(n4, scale=0.6), run_time=1.0)
        self.au_mot("On interroge 20 élèves")
        tires = [tirage(cols[k], 20, 7 + k) for k in range(4)]
        reste = VGroup(*[p for k in range(4) for p in cols[k] if p not in tires[k]])
        n20 = VGroup(*[self.t("20", 34, WHITE).next_to(noms[k], DOWN, buff=0.15) for k in range(4)])
        e20 = self.col(self.ligne([("20", AMBRE), ("élèves", WHITE)], 44), 0.5)
        self.play(reste.animate.set_opacity(0.2), FadeIn(e20, scale=0.6), run_time=0.5)
        self.au_mot("dans chaque niveau")
        ch = self.col(self.t("dans chaque niveau", 40), -0.35)
        self.play(FadeIn(ch, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(n, scale=1.5) for n in n20], lag_ratio=0.2),
                  run_time=0.8)
        self.au_mot("tirés au hasard")
        hasard = self.col(self.t("tirés au hasard", 40, BLEU_CALCUL), -1.2)
        self.play(FadeIn(hasard, shift=RIGHT * 0.2),
                  LaggedStart(*[p.animate.scale(1.6).set_color(WHITE) for t in tires for p in t], lag_ratio=0.01),
                  run_time=1.2)
        self.au_mot("80 élèves en tout")
        tot = self.col(self.ligne([("80", VERT_OK), ("élèves en tout", WHITE)], 36), -2.25)
        self.play(FadeIn(tot, scale=0.6), Create(self.encadrer(tot)), run_time=0.5)
        self.insister(tot[0], 1.4, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        cols, noms, cadre, lab = self.college_pose()
        self.add(cols, noms, cadre, lab)
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("seulement ses amis")
        amis = VGroup(*[cols[2][i] for i in (36, 37, 41, 42, 43)])
        b1 = SurroundingRectangle(amis, color=ROUGE_ERREUR, buff=0.1, corner_radius=0.15, stroke_width=6)
        e1 = self.col(VGroup(self.t("seulement", 38), self.t("ses amis", 40, ROUGE_ERREUR)).arrange(
            RIGHT, buff=0.2), 1.4)
        tout = VGroup(*[p for c in cols for p in c])
        self.play(tout.animate.set_opacity(0.25), run_time=0.3)
        self.play(amis.animate.set_opacity(1).scale(1.5), Create(b1), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("ou seulement sa classe")
        classe = VGroup(*[cols[0][i] for i in range(50, 80)])
        b2 = SurroundingRectangle(classe, color=ROUGE_ERREUR, buff=0.1, corner_radius=0.15, stroke_width=6)
        e2 = self.col(VGroup(self.t("ou seulement", 38), self.t("sa classe", 40, ROUGE_ERREUR)).arrange(
            RIGHT, buff=0.2), 0.5)
        self.play(classe.animate.set_opacity(1), Create(b2), FadeIn(e2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le résultat serait faussé")
        f = self.col(self.t("Résultat faussé !", 46, ROUGE_ERREUR), -0.9)
        self.play(FadeIn(f, scale=1.5), Indicate(cadre, color=ROUGE_ERREUR), run_time=0.5)
        self.insister(f, 1.15, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.au_mot("À toi de jouer")
        titre = self.t("À toi de jouer", 50, JAUNE_TITRE).to_edge(UP, buff=0.4)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("à quelle heure les élèves se couchent")
        lit = VGroup(RoundedRectangle(width=2.2, height=0.35, corner_radius=0.08, fill_color="#a16207",
                                      fill_opacity=1, stroke_width=0),
                     RoundedRectangle(width=2.0, height=0.3, corner_radius=0.1, fill_color="#bfdbfe",
                                      fill_opacity=1, stroke_width=0).shift(UP * 0.3),
                     RoundedRectangle(width=0.6, height=0.28, corner_radius=0.1, fill_color=WHITE,
                                      fill_opacity=1, stroke_width=0).shift(UP * 0.4 + LEFT * 0.6))
        nuit = VGroup(lune(0.4).move_to(P(1.0, 0.9)), lit).move_to(P(-4.3, 1.4))
        q = carte_question("À quelle heure les élèves se couchent ?", fs=32).move_to(P(1.6, 1.55))
        self.play(FadeIn(nuit, shift=DOWN * 0.2), FadeIn(q, scale=0.8), run_time=0.6)
        self.au_mot("seulement l'équipe de basket")
        equipe = VGroup(*[personne("#ea580c", r=0.24) for _ in range(5)])
        equipe.arrange(RIGHT, buff=0.18).move_to(P(-3.9, -0.9))
        b = ballon(0.45).next_to(equipe, RIGHT, buff=0.3)
        e1 = self.col(VGroup(self.t("seulement", 38), self.t("l'équipe de basket", 40, "#fb923c")).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12), 0.1)
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in equipe], lag_ratio=0.15), FadeIn(b, scale=0.5),
                  FadeIn(e1, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("à l'entraînement du soir")
        e2 = self.col(self.t("à l'entraînement du soir", 38), -0.95)
        l2 = lune(0.3).next_to(equipe, UP, buff=0.3)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), FadeIn(l2, scale=0.5), run_time=0.5)
        self.au_mot("Bonne idée")
        bi = self.col(self.t("Bonne idée ?", 46, ORANGE_RETENUE), -1.75)
        self.play(FadeIn(bi, scale=0.6), run_time=0.4)
        self.insister(bi, 1.2, 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-3.2, -2.75))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        cols, noms, cadre, lab = self.college_pose()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Non")
        non = self.col(self.t("Non.", 54, ROUGE_ERREUR), 1.85)
        self.play(FadeIn(non, scale=1.5), run_time=0.35)
        self.au_mot("Ces élèves ne représentent pas")
        equipe = VGroup(*[cols[3][i] for i in (0, 1, 2, 3, 4)])
        b = SurroundingRectangle(equipe, color="#fb923c", buff=0.1, corner_radius=0.12, stroke_width=6)
        bal = ballon(0.22).next_to(b, UP, buff=0.12)
        e1 = self.col(self.t("pas tout le collège", 40, ROUGE_ERREUR), 1.0)
        self.play(FadeIn(VGroup(cols, noms, cadre, lab)), run_time=0.4)
        self.play(VGroup(*[p for c in cols for p in c if p not in equipe]).animate.set_opacity(0.25),
                  Create(b), FadeIn(bal, scale=0.5), FadeIn(e1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Il faut des élèves de chaque niveau")
        e2 = self.col(self.bloc(["des élèves", "de chaque niveau"], 38, VERT_OK), 0.0)
        self.play(FadeOut(VGroup(b, bal)), VGroup(*[p for c in cols for p in c]).animate.set_opacity(1),
                  FadeIn(e2, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(n, color=VERT_OK, scale_factor=1.5) for n in noms], lag_ratio=0.2),
                  run_time=0.9)
        self.au_mot("tirés au hasard")
        e3 = self.col(self.t("tirés au hasard", 38, BLEU_CALCUL), -1.0)
        tires = [tirage(cols[k], 20, 7 + k) for k in range(4)]
        reste = VGroup(*[p for k in range(4) for p in cols[k] if p not in tires[k]])
        self.play(FadeIn(e3, shift=RIGHT * 0.2), reste.animate.set_opacity(0.2),
                  *[p.animate.scale(1.5).set_color(WHITE) for t in tires for p in t], run_time=0.8)
        self.au_mot("et une question précise")
        q = carte_question("« À quelle heure te couches-tu ? »", fs=26).move_to(P(2.35, -2.15))
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.play(Create(self.encadrer(q, VERT_OK, 0.1)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        cols, noms, cadre, lab = self.college_pose(centre=P(-3.6, -0.5), echelle=0.95)
        self.add(cols, noms, cadre, lab)
        lignes = self.finale([("Une question précise,", "une réponse claire."),
                              ("Des personnes", "de chaque groupe,", "tirées au hasard."),
                              ("Sinon, « tout le", "monde le pense »", "ne veut rien dire.")], [2.1, 0.55, -1.15], fs=32)
        self.au_mot("une question précise")
        self.montrer_ligne(lignes[0])
        self.au_mot("Et des personnes de chaque groupe")
        tires = [tirage(cols[k], 20, 7 + k) for k in range(4)]
        reste = VGroup(*[p for k in range(4) for p in cols[k] if p not in tires[k]])
        self.montrer_ligne(lignes[1], reste.animate.set_opacity(0.2))
        self.au_mot("tirées au hasard")
        self.play(*[p.animate.scale(1.5).set_color(WHITE) for t in tires for p in t], run_time=0.7)
        self.au_mot("Sinon")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_biais()
        self.ecran_metier()
        self.ecran_question()
        self.ecran_qui()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsEnquetePlanifier6e(StatsEnquetePlanifierBase):
    identite = "Maths 6e — EleveAI"
