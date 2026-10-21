# stats_donnee_defi.py
# EleveAI — Maths 4e — série « Statistiques », cycle 4, épisode 05 : DÉFIS SUR
# LA LECTURE DE DONNÉES (micro du coach : stat_donnee_defi, notion stat_donnee),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : le défi complet du niveau (retrouver
# une barre effacée grâce au total, fréquence de catégories regroupées, écart
# entre deux barres, pourcentage d'un camembert → effectif).
# Short jumeau : stats_donnee_defi_short.py (orange, un cran plus bas).
#
# ⭐ Décor et métier : les LANGUES et la culture ; une LINGUISTE étudie comment
# vivent les langues à La Réunion (problématique : retrouver une donnée perdue,
# juger une réponse). Données VRAISEMBLABLES (enquête imaginée dans un collège) :
# langue parlée le plus souvent à la maison par 200 élèves : créole 70, les deux
# langues 80, français 40 (la barre effacée : 200 − 160), autre 10 ; créole seul
# ou avec le français : 150 ÷ 200 = 0,75 = 75 % ; écart 80 − 10 = 70 (piège : 80).
# Défi : 600 élèves, camembert 35 / 45 / 15 / 5 % → 45 % de 600 = 6 × 45 = 270.
# ⭐ Les figures sont CELLES DU COACH (manim/canvas_stats.py) : `stat_graph`
# barres (axe gradué de 20 en 20, petit trait pour 70 et 10) et camembert
# (`valeursParts` + `pourcentages`), comme genDefiEffaceGraphe / genDefiCamembert.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque 4e, stat_donnee_defi) : genDefiEffaceGraphe →
# 02-03 · genDefiFreqRegroupee → 04 · genDefiEcart → 05 · genDefiCamembert → 06 / 06b.
# Écrans : 00 garde · 01 la linguiste · 02 la barre effacée · 03 la retrouver ·
# 04 regrouper deux barres · 05 le piège de l'écart · 06 défi (camembert) ·
# 06b correction · 07 ce que tu as appris · 08 fin (règle du 19/10).
#
# Voix : manim/voix/4e-stats-donnee-defi.json (débit −10), WAV dans
# public/sons/4e-stats-donnee-defi/ ; calage : manim/scripts/4e/stats_donnee_defi_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/4e/stats_donnee_defi.py StatsDonneeDefi4e -o eleveai-maths-4e-stats-donnee-defi --media_dir manim/scripts/4e/media-donnee-defi
# Sortie : manim/sorties/4e/maths/statistiques/05-donnee-defi/eleveai-maths-4e-stats-donnee-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats4e_lote_commun import *  # noqa: E402,F403

CATS = ["Créole", "Les deux", "Français", "Autre"]
LAB = ["Créole", "Les 2", "Français", "Autre"]   # les étiquettes courtes du diagramme
VALS = [70, 80, 40, 10]
COUL = ["#fca5a5", "#c4b5fd", "#93c5fd", "#fcd34d"]
PCTS = [35, 45, 15, 5]
TXT = ["#fca5a5", "#c4b5fd", "#93c5fd", "#fcd34d"]


def bulle(s, couleur, fs=34):
    """Une bulle de parole avec un mot (« Bonjou ! »)."""
    t = Text(s, font_size=fs, color=NUIT, weight=BOLD)
    b = RoundedRectangle(width=t.width + 0.5, height=t.height + 0.4, corner_radius=0.25, fill_color=couleur,
                         fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    q = Polygon(P(-0.15, 0), P(0.2, 0), P(-0.25, -0.35), fill_color=couleur, fill_opacity=1, stroke_width=0)
    q.next_to(b, DOWN, buff=-0.04).shift(LEFT * b.width * 0.2)
    return VGroup(q, b, t.move_to(b))


class StatsDonneeDefi4e(Paysage4e):
    nom_voix = "4e-stats-donnee-defi"
    fichier_marques = "stats_donnee_defi_marques.json"

    def graphe(self, centre=P(-3.2, -0.3), largeur=5.95, hauteur=3.7, fs=26):
        return Barres(LAB, VALS, pas=20, sous_pas=10, couleurs=COUL, nom_axe="Élèves", titre="Langue à la maison",
                      largeur=largeur, hauteur=hauteur, fs=fs, centre=centre)

    def trou(self, g):
        """La place de la barre effacée : un cadre pointillé et un « ? »."""
        b = g.barres[2]
        r = Rectangle(width=b.width, height=1.1).move_to(b.get_bottom(), aligned_edge=DOWN)
        d = DashedVMobject(r, num_dashes=24).set_stroke(ORANGE_Q, 4)
        q = texte("?", 44, ORANGE_Q).move_to(r)
        return VGroup(d, q)

    def graphe_plein(self, valeurs=True, **kw):
        g = self.graphe(**kw)
        self.add(g)
        vals = VGroup(*[g.valeur(i, fs=30) for i in range(4)])
        if valeurs:
            self.add(vals)
        return g, vals

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les données", self.identite, "verte")
        g = Barres(LAB, VALS, pas=20, couleurs=COUL, largeur=3.8, hauteur=2.0, fs=24, centre=P(-0.6, 0.15))
        trou = self.trou(g)
        self.au_mot("Défis sur les données")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9), run_time=0.7)
        self.play(g.pousser([0, 1, 3], run_time=0.8))
        self.au_mot("Une barre effacée")
        self.play(Create(trou[0]), FadeIn(trou[1], scale=1.5), run_time=0.5)
        self.au_mot("sauras-tu")
        self.insister(trou[1], 1.6, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : la linguiste ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Une linguiste")
        b1 = bulle("Bonjou !", COUL[0], 40).move_to(P(-4.6, 2.0))
        b2 = bulle("Bonjour !", COUL[2], 40).move_to(P(-2.6, 0.9))
        metier = self.t("Linguiste", 46, BLEU_CALCUL).move_to(P(-3.6, -0.7))
        self.play(FadeIn(b1, scale=0.6), run_time=0.4)
        self.play(FadeIn(b2, scale=0.6), FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("comment vivent les langues")
        sous = self.bloc(["comprendre comment", "vivent les langues"], 32, VERT_OK).next_to(metier, DOWN, buff=0.25)
        sous.set_x(-3.6)
        self.play(FadeIn(sous, shift=UP * 0.2), run_time=0.5)
        self.au_mot("200 élèves")
        e = self.col(self.ligne([("200", AMBRE), ("élèves", WHITE)], 50), 2.3)
        self.play(FadeIn(e[0], scale=1.7), FadeIn(e[1]), run_time=0.45)
        self.au_mot("quelle langue")
        q = self.col(self.bloc(["Quelle langue", "à la maison ?"], 42), 1.0)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("une barre a été effacée")
        g = Barres(LAB, VALS, pas=20, couleurs=COUL, largeur=3.0, hauteur=1.4, fs=20, centre=P(3.3, -1.25))
        trou = self.trou(g)
        self.play(FadeIn(g.fond), g.pousser([0, 1, 3], run_time=0.6), run_time=0.6)
        self.play(Create(trou[0]), FadeIn(trou[1], scale=1.5), run_time=0.4)
        self.insister(trou[1], 1.6, 0.25)
        self.attendre_voix()

    # ── 02 : la barre effacée ───────────────────────────────────────────────

    def ecran_efface(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-efface")
        g = self.graphe()
        self.au_mot("Les barres qui restent")
        self.play(FadeIn(g.fond), run_time=0.5)
        for i, mot in [(0, "créole, 70"), (1, "Les deux langues, 80"), (3, "Une autre langue, 10")]:
            self.au_mot(mot)
            v = g.valeur(i, fs=30)
            lg = self.ligne([(CATS[i] + " :", TXT[i]), (str(VALS[i]), WHITE)], 40)
            self.col(lg, {0: 2.2, 1: 1.3, 3: 0.4}[i])
            self.play(g.pousser(i, run_time=0.4), FadeIn(v, scale=1.6, run_time=0.4), FadeIn(lg, shift=RIGHT * 0.2),
                      run_time=0.4)
        self.au_mot("La barre du français")
        trou = self.trou(g)
        lf = self.col(self.ligne([("Français :", TXT[2]), ("?", ORANGE_RETENUE)], 40), -0.5)
        self.play(Create(trou[0]), FadeIn(trou[1], scale=1.5), FadeIn(lf, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("a disparu")
        self.insister(VGroup(trou, lf[1]), 1.25, 0.3)
        self.attendre_voix()

    # ── 03 : la retrouver grâce au total ────────────────────────────────────

    def ecran_retrouver(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-retrouver")
        g = self.graphe()
        vals = VGroup(*[g.valeur(i, fs=30) for i in range(4)])
        trou = self.trou(g)
        self.add(g.fond, *[g.barres[i] for i in (0, 1, 3)], *[vals[i] for i in (0, 1, 3)], trou)
        self.au_mot("Le total")
        tot = self.col(self.ligne([("Total :", WHITE), ("200", AMBRE), ("élèves", WHITE)], 44), 2.3)
        self.au_mot("200 élèves")
        self.play(FadeIn(tot, shift=RIGHT * 0.2), run_time=0.45)
        somme = self.col(self.ligne([("70", WHITE), ("+", WHITE), ("80", WHITE), ("+", WHITE), ("10", WHITE)], 48,
                                    0.16), 1.2)
        for k, (mot, i) in enumerate([("70 plus", 0), ("80 plus", 1), ("10, égale", 3)]):
            self.au_mot(mot)
            morceaux = [somme[2 * k]] + ([somme[2 * k - 1]] if k else [])
            self.play(*[FadeIn(m, scale=1.5) for m in morceaux], Indicate(g.barres[i], color=AMBRE), run_time=0.3)
        self.au_mot("160. Il")
        s160 = self.ligne([("=", WHITE), ("160", BLEU_CALCUL)], 48).next_to(somme, RIGHT, buff=0.2)
        self.play(FadeIn(s160, scale=1.4), run_time=0.35)
        self.au_mot("200 moins 160")
        diff = self.col(self.ligne([("200", AMBRE), ("−", WHITE), ("160", BLEU_CALCUL)], 48), 0.1)
        self.play(FadeIn(diff, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 40")
        r40 = self.ligne([("=", WHITE), ("40", VERT_OK)], 48).next_to(diff, RIGHT, buff=0.2)
        self.play(FadeIn(r40, scale=1.4), run_time=0.35)
        self.insister(r40[1], 1.5, 0.3)
        self.au_mot("La barre du français monte")
        v2 = g.valeur(2, fs=30)
        self.play(FadeOut(trou), g.pousser(2, run_time=0.8), run_time=0.8)
        self.play(FadeIn(v2, scale=1.6), Flash(v2, color=VERT_OK), run_time=0.5)
        fr40 = self.col(self.ligne([("Français :", TXT[2]), ("40", VERT_OK)], 44), -1.2)
        self.play(FadeIn(fr40, shift=RIGHT * 0.2), Create(self.encadrer(fr40)), run_time=0.5)
        self.attendre_voix()

    # ── 04 : regrouper deux barres ──────────────────────────────────────────

    def ecran_regrouper(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-regrouper")
        g, vals = self.graphe_plein()
        self.au_mot("Quelle part")
        q = self.col(self.bloc(["Créole, seul ou", "avec le français ?"], 42), 2.3)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Je regroupe deux barres")
        self.play(g.estomper([0, 1], 0.25), *[vals[i].animate.set_opacity(0.3) for i in (2, 3)], run_time=0.5)
        self.play(Indicate(VGroup(g.barres[0], g.barres[1], vals[0], vals[1]), color=AMBRE, scale_factor=1.06),
                  run_time=0.6)
        s = self.col(self.ligne([("70", TXT[0]), ("+", WHITE), ("80", TXT[1])], 50), 1.0)
        self.au_mot("70 plus 80")
        self.play(FadeIn(s, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 150")
        r150 = self.ligne([("=", WHITE), ("150", AMBRE)], 50).next_to(s, RIGHT, buff=0.2)
        self.play(FadeIn(r150, scale=1.4), run_time=0.35)
        self.au_mot("je divise par le total")
        d = self.col(self.ligne([("150", AMBRE), ("÷", WHITE), ("200", WHITE)], 50), -0.15)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 0,75")
        r = self.ligne([("=", WHITE), ("0,75", VERT_OK)], 50).next_to(d, RIGHT, buff=0.2)
        self.play(FadeIn(r, scale=1.4), run_time=0.35)
        self.au_mot("soit 75 %")
        pc = self.col(self.ligne([("soit", WHITE), ("75 %", VERT_OK)], 56), -1.3)
        self.play(FadeIn(pc, scale=0.7), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(d, r, pc))), run_time=0.4)
        self.insister(pc[1], 1.3, 0.3)
        self.attendre_voix()

    # ── 05 : le piège de l'écart ────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        g, vals = self.graphe_plein()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 2.5)
        self.play(Write(titre), run_time=0.4)
        self.au_mot("la plus haute barre")
        self.play(g.estomper([1, 3], 0.25), *[vals[i].animate.set_opacity(0.3) for i in (0, 2)], run_time=0.5)
        self.au_mot("Pas 80")
        p80 = self.col(self.ligne([("Pas", WHITE), ("80", ROUGE_ERREUR), ("!", WHITE)], 48), 1.4)
        self.play(FadeIn(p80, shift=RIGHT * 0.2), Indicate(vals[1], color=ROUGE_ERREUR, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("c'est la plus haute")
        x = croix(p80[1], sw=7)
        haute = self.col(self.t("80 = la plus haute", 36, ORANGE_RETENUE), 0.6)
        self.play(Create(x), FadeIn(haute), run_time=0.45)
        self.au_mot("L'écart")
        xg = g.barres[1].get_left()[0] - 0.12
        niveau = DashedLine(g.barres[3].get_corner(UL), P(xg, g.barres[3].get_top()[1]), color=AMBRE,
                            stroke_width=5, dash_length=0.1)
        fl = DoubleArrow(P(xg, g.barres[3].get_top()[1]), P(xg, g.barres[1].get_top()[1]), buff=0,
                         color=VERT_OK, stroke_width=6, tip_length=0.18)
        self.play(Create(niveau), GrowFromCenter(fl), run_time=0.6)
        calc = self.col(self.ligne([("80", TXT[1]), ("−", WHITE), ("10", TXT[3])], 50), -0.5)
        self.au_mot("80 moins 10")
        self.play(FadeIn(calc, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 70")
        r = self.ligne([("=", WHITE), ("70", VERT_OK), ("élèves", WHITE)], 50).next_to(calc, RIGHT, buff=0.2)
        if r.get_right()[0] > 6.6:
            VGroup(calc, r).scale_to_fit_width(5.6).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(calc, r))), run_time=0.4)
        self.insister(r[1], 1.4, 0.3)
        self.attendre_voix()

    # ── 06 : défi (le camembert du département) ─────────────────────────────

    def camembert(self):
        return Camembert(CATS, PCTS, rayon=1.85, couleurs=COUL, valeurs_parts=True, pourcentages=True,
                         titre="600 élèves", fs=28, centre=P(-3.4, -0.35))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        cam = self.camembert()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("600 élèves")
        e = self.col(self.ligne([("Département :", WHITE), ("600", AMBRE), ("élèves", WHITE)], 40), 1.7)
        self.play(FadeIn(e, shift=RIGHT * 0.2), FadeIn(cam.fond), run_time=0.45)
        for i, mot in enumerate(["créole, 35 %", "Les deux langues, 45 %", "Français, 15 %", "Autre, 5 %"]):
            self.au_mot(mot)
            self.play(GrowFromPoint(cam.parts[i], cam.centre), FadeIn(cam.textes[i]), run_time=0.4)
        self.au_mot("Combien d'élèves")
        q = self.col(self.bloc(["Combien d'élèves parlent", "les deux langues ?"], 40), 0.4)
        self.play(FadeIn(q, shift=RIGHT * 0.2), cam.focus(1, 0.35), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -1.0)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06b-correction")
        cam = self.camembert()
        self.add(cam)
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.6)
        self.play(Write(titre), cam.focus(1, 0.35), run_time=0.5)
        self.au_mot("45 % de 600")
        l0 = self.col(self.ligne([("45 %", TXT[1]), ("de", WHITE), ("600", AMBRE), ("?", WHITE)], 44), 1.7)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 % de 600")
        l1 = self.col(self.ligne([("1 %", WHITE), ("de", WHITE), ("600", AMBRE), (":", WHITE)], 42), 0.8)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("600 divisé par 100")
        l2 = self.col(self.ligne([("600", AMBRE), ("÷", WHITE), ("100", WHITE)], 46), -0.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 6")
        r6 = self.ligne([("=", WHITE), ("6", BLEU_CALCUL)], 46).next_to(l2, RIGHT, buff=0.2)
        self.play(FadeIn(r6, scale=1.4), run_time=0.3)
        self.au_mot("45 fois 6")
        l3 = self.col(self.ligne([("45", TXT[1]), ("×", WHITE), ("6", BLEU_CALCUL)], 46), -0.95)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 270")
        r270 = self.ligne([("=", WHITE), ("270", VERT_OK), ("élèves", WHITE)], 46).next_to(l3, RIGHT, buff=0.2)
        self.play(FadeIn(r270, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(l3, r270))), run_time=0.4)
        self.au_mot("Attention")
        att = self.col(self.bloc(["45 : le pourcentage,", "pas des élèves !"], 34, ORANGE_RETENUE), -2.0)
        self.play(FadeIn(att, shift=UP * 0.2), Indicate(cam.textes[1], color=ORANGE_RETENUE), run_time=0.6)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        g = self.graphe(centre=P(-4.9, -0.3), largeur=2.6, hauteur=2.6, fs=22)
        self.add(g)
        self.XL = -2.3
        lignes = self.finale([("Avec le total, je retrouve", "une barre effacée."),
                              ("Une fréquence :", "je divise toujours par le total."),
                              ("Un pourcentage du total", "redonne un effectif.")], [1.7, 0.1, -1.5], fs=38)
        self.au_mot("Avec le total")
        self.montrer_ligne(lignes[0], Indicate(g.barres[2], color=AMBRE))
        self.au_mot("Pour une fréquence")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et un pourcentage")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_efface()
        self.ecran_retrouver()
        self.ecran_regrouper()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
