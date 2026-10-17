# proba_modele.py
# EleveAI — Maths 2de — série « Probabilités », épisode 2 : la loi de
# probabilité (micro : proba_modele), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_modele_short.py (ceinture jaune, le dé truqué).
#
# Écrans : 00 garde · 01 le dé truqué (le dé roule, les barres des résultats,
# le 6 double) · 02 la loi = un TABLEAU (celui du coach) · 03 le calcul (p, 2p,
# 7p = 1, les cases passent à 1/7 et 2/7) · 04 l'événement « pair » (les
# colonnes 2, 4, 6 et les faces du dé s'allument, la somme se construit) ·
# 05 le piège 3/6 · 06 défi de la ROUE (rouge 0,5, bleu 0,3, vert ?) ·
# 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas du coach repris (lib/tutor-v4/components/ProbabilitesCanvas.tsx) :
#   · « tableau » : ligne d'en-tête « Issue » sur fond gris clair, ligne
#     « Probabilité » sur fond blanc, cases allumées en ambre (casesSurlignees) ;
#   · « de » : faces en carré arrondi clair, points sombres, faces surlignées
#     en ambre (deCanvas([2, 4, 6]) = « nombre pair ») ;
#   · « roue » : secteurs proportionnels aux poids, partant du haut dans le sens
#     des aiguilles, rouge #ef4444 / bleu #3b82f6 / vert #22c55e, contour
#     sombre, étiquette blanche cerclée, moyeu et flèche en haut.
#
# Voix : manim/voix/seconde-proba-modele.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba_modele.py ProbaModeleSeconde -o eleveai-maths-seconde-proba-modele --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/02-loi-de-probabilite/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de, de_qui_roule  # noqa: E402

# Les couleurs du canvas du coach (Tailwind slate / amber).
ENTETE_FOND = "#F1F5F9"   # slate-100
TRAIT_CASE = "#CBD5E1"    # slate-300 (un peu plus marqué que slate-200 sur fond noir)
ENCRE = "#1E293B"         # slate-800
AMBRE_FOND = "#FEF3C7"    # amber-100
AMBRE_ENCRE = "#78350F"   # amber-900
AMBRE_BORD = "#FBBF24"    # amber-400
SOMBRE = "#0F172A"
ROUGE_C, BLEU_C, VERT_C = "#EF4444", "#3B82F6", "#22C55E"


class NotionSeconde2(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach ─────────────────────────────────────────────────────

def frac_txt(num, den, fs=28, color=ENCRE):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    n = Text(str(num), font_size=fs, color=color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=color, weight=BOLD)
    larg = max(n.width, d.width) + 0.12
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.07)


def contenu(c, fs=28, color=ENCRE):
    """Le contenu d'une case : « a/b » devient une fraction écrite."""
    if isinstance(c, Mobject):
        return c
    if "/" in c:
        a, b = c.split("/")
        return frac_txt(a, b, fs, color)
    return Text(c, font_size=fs, color=color, weight=BOLD)


class TableauLoi(VGroup):
    """Le tableau de loi du coach : « Issue | … » puis « Probabilité | … ».

    self.ent[i], self.val[i] : les cases (fond) de la colonne i ;
    self.t_ent[i], self.t_val[i] : leurs textes (None si vide)."""

    def __init__(self, issues, probas=None, larg_lab=2.4, larg=1.15, h_ent=0.75, h_val=1.15,
                 fs=28, fs_lab=26, noms=("Issue", "Probabilité")):
        super().__init__()
        n = len(issues)
        self.fs = fs
        self.lab_ent = Rectangle(width=larg_lab, height=h_ent, fill_color=ENTETE_FOND, fill_opacity=1,
                                 stroke_color=TRAIT_CASE, stroke_width=2)
        self.lab_val = Rectangle(width=larg_lab, height=h_val, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=TRAIT_CASE, stroke_width=2)
        self.lab_ent.move_to(P(larg_lab / 2, -h_ent / 2))
        self.lab_val.move_to(P(larg_lab / 2, -h_ent - h_val / 2))
        self.ent, self.val = VGroup(), VGroup()
        for i in range(n):
            x = larg_lab + larg * (i + 0.5)
            self.ent.add(Rectangle(width=larg, height=h_ent, fill_color=ENTETE_FOND, fill_opacity=1,
                                   stroke_color=TRAIT_CASE, stroke_width=2).move_to(P(x, -h_ent / 2)))
            self.val.add(Rectangle(width=larg, height=h_val, fill_color=WHITE, fill_opacity=1,
                                   stroke_color=TRAIT_CASE, stroke_width=2).move_to(P(x, -h_ent - h_val / 2)))
        self.txt_lab = VGroup(Text(noms[0], font_size=fs_lab, color=ENCRE, weight=BOLD).move_to(self.lab_ent),
                              Text(noms[1], font_size=fs_lab, color=ENCRE, weight=BOLD).move_to(self.lab_val))
        self.t_ent = [contenu(s, fs).move_to(r) for s, r in zip(issues, self.ent)]
        probas = probas or [None] * n
        self.t_val = [contenu(s, fs).move_to(r) if s is not None else None for s, r in zip(probas, self.val)]
        self.fonds = VGroup(self.lab_ent, self.lab_val, self.ent, self.val)
        # les textes AU-DESSUS des fonds : un fond animé (set_fill) remonte sinon devant
        for t in [self.txt_lab, *self.t_ent, *[t for t in self.t_val if t is not None]]:
            t.set_z_index(2)
        self.add(self.fonds, self.txt_lab, *self.t_ent, *[t for t in self.t_val if t is not None])

    def ecrire(self, i, s, color=ENCRE):
        """La nouvelle étiquette de la case i (non ajoutée)."""
        return contenu(s, self.fs, color).move_to(self.val[i]).set_z_index(2)

    def colonne(self, i):
        g = VGroup(self.ent[i], self.val[i], self.t_ent[i])
        if self.t_val[i] is not None:
            g.add(self.t_val[i])
        return g


def face_coach(face, cote=0.8, actif=False):
    """Une face du canvas « de » du coach : carré arrondi clair, points sombres ;
    surlignée en ambre quand elle est dans l'événement."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16,
                             fill_color=AMBRE_FOND if actif else "#F8FAFC", fill_opacity=1,
                             stroke_color=SOMBRE, stroke_width=3)
    pos = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
           4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
           6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}[face]
    pts = VGroup(*[Dot(P(x * cote * 0.24, y * cote * 0.24), radius=cote * 0.07, color=SOMBRE) for x, y in pos])
    g = VGroup(corps, pts)
    if actif:
        g.add(SurroundingRectangle(corps, color=AMBRE_BORD, buff=0.05, corner_radius=cote * 0.2, stroke_width=4))
    return g


def roue_coach(poids, couleurs, rayon=1.6):
    """La roue du coach : secteurs proportionnels, du haut dans le sens des
    aiguilles, contour sombre ; moyeu et flèche fixe en haut.
    Renvoie (disque, secteurs, milieux des secteurs (angles), flèche+moyeu)."""
    total = sum(poids)
    a = PI / 2
    secteurs, milieux = VGroup(), []
    for w, c in zip(poids, couleurs):
        ang = TAU * w / total
        s = Sector(radius=rayon, start_angle=a - ang, angle=ang, fill_color=c, fill_opacity=1,
                   stroke_color=SOMBRE, stroke_width=3)
        secteurs.add(s)
        milieux.append(a - ang / 2)
        a -= ang
    moyeu = Dot(radius=0.09, color=SOMBRE)
    fleche = Triangle(fill_color=WHITE, fill_opacity=1, stroke_color=SOMBRE, stroke_width=2)
    fleche.scale(0.2).rotate(PI).move_to(P(0, rayon + 0.08))
    return secteurs, milieux, VGroup(moyeu, fleche)


def etiquette_roue(texte, fs=30):
    """Étiquette blanche cerclée de sombre (paintOrder="stroke" du coach)."""
    fond = Text(texte, font_size=fs, color=SOMBRE, weight=BOLD, stroke_color=SOMBRE, stroke_width=7)
    dessus = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    return VGroup(fond, dessus.move_to(fond))


def barres_resultats(hauteurs, pas=0.62, larg=0.42, unite=0.55, cote_face=0.42, six_orange=True):
    """Les résultats notés : une barre par face, la face du dé dessous."""
    barres, faces = VGroup(), VGroup()
    for k, h in enumerate(hauteurs):
        x = (k - 2.5) * pas
        b = Rectangle(width=larg, height=max(h * unite, 0.001), fill_color=ORANGE_RETENUE if (k == 5 and six_orange) else BLEU_CALCUL,
                      fill_opacity=0.9, stroke_width=0)
        b.move_to(P(x, 0), aligned_edge=DOWN)
        barres.add(b)
        faces.add(face_coach(k + 1, cote_face).move_to(P(x, -0.32)))
    sol = Line(P(-3 * pas, 0), P(3 * pas, 0), color=WHITE, stroke_width=2)
    return barres, faces, sol


class ProbaModeleSeconde(NotionSeconde2):
    nom_voix = "seconde-proba-modele"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def pf(self, num, den, fs=40, color=WHITE):
        """Une fraction blanche (hors tableau)."""
        return frac_txt(num, den, fs, color)

    def proba(self, quoi, fs=40, color=WHITE):
        """« P(quoi) » en Text."""
        return self.t(f"P({quoi})", fs, color)

    def tableau_de(self, probas=None, y=1.9):
        # ⛔ PAS D'ÉCART : les issues sont les faces DESSINÉES, pas des chiffres non dits.
        tab = TableauLoi([face_coach(f, 0.5) for f in range(1, 7)], probas)
        tab.move_to(P(-0.6, y))
        return tab

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La loi de probabilité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        d = de_qui_roule(P(-2.4, 0.5), 1.5, periode=0.15)
        self.add(d)
        self.au_mot("comment écrire")
        q = self.t("truqué ?", 60, ORANGE_RETENUE).move_to(P(0.9, 0.5))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.35)
        self.attendre_voix(marge=1.0)
        d.clear_updaters()

    # ── 01 : le dé truqué ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un dé truqué")
        roule = de_qui_roule(P(-4.6, 0.6), 1.6, periode=0.14)
        self.add(roule)
        self.au_mot("est truqué")
        tq = self.etiquette("truqué", ORANGE_RETENUE, 32).move_to(P(-4.6, -1.0))
        self.play(GrowFromCenter(tq), run_time=0.4)
        self.au_mot("On a noté")
        barres, faces, sol = barres_resultats([1, 1, 1, 1, 1, 1], pas=0.95, larg=0.62, unite=1.2, cote_face=0.6)
        g = VGroup(barres, faces, sol).move_to(P(1.2, 0.4))
        for b in barres:
            b.stretch_to_fit_height(0.01, about_edge=DOWN)
        self.play(Create(sol), LaggedStart(*[FadeIn(f, shift=UP * 0.2) for f in faces], lag_ratio=0.1),
                  run_time=0.8)
        self.play(*[b.animate.stretch_to_fit_height(1.2, about_edge=DOWN) for b in barres], run_time=1.0)
        self.au_mot("le 6 sort")
        self.play(Indicate(faces[5], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.au_mot("deux fois plus")
        self.play(barres[5].animate.stretch_to_fit_height(2.4, about_edge=DOWN), run_time=0.8)
        acc = BraceBetweenPoints(barres[5].get_corner(UR) + RIGHT * 0.08, barres[5].get_corner(DR) + RIGHT * 0.08,
                                 direction=RIGHT, color=ORANGE_RETENUE)
        x2 = self.t("× 2", 40, ORANGE_RETENUE).next_to(acc, RIGHT, buff=0.12)
        self.play(GrowFromCenter(acc), FadeIn(x2, scale=0.5), run_time=0.5)
        self.insister(x2, 0.3)
        self.au_mot("chacune des autres")
        self.play(*[Indicate(b, color=BLEU_CALCUL, scale_factor=1.08) for b in barres[:5]], run_time=0.6)
        roule.clear_updaters()
        self.attendre_voix()

    # ── 02 : une loi = un tableau ───────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-loi")
        self.titre_ecran("Une loi de probabilité")
        tab = self.tableau_de(y=1.5)
        self.au_mot("c'est un tableau")
        self.play(FadeIn(tab.fonds), FadeIn(tab.txt_lab), run_time=0.7)
        self.au_mot("chaque issue")
        self.play(Indicate(tab.txt_lab[0], color=BLEU_CALCUL),
                  LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in tab.t_ent], lag_ratio=0.12), run_time=0.9)
        self.au_mot("sa probabilité")
        trous = [tab.ecrire(i, "?", AMBRE_ENCRE) for i in range(6)]
        self.play(Indicate(tab.txt_lab[1], color=BLEU_CALCUL),
                  LaggedStart(*[FadeIn(t, scale=0.5) for t in trous], lag_ratio=0.1), run_time=0.9)
        self.au_mot("entre 0 et 1")
        r1 = self.ligne([("chaque probabilité :", WHITE), ("entre", WHITE), ("0", JAUNE_TITRE), ("et", WHITE),
                         ("1", JAUNE_TITRE)], 38, 0.2).move_to(P(-0.6, -0.85))
        self.play(FadeIn(r1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("leur somme vaut 1")
        r2 = self.ligne([("leur somme", WHITE), ("=", WHITE), ("1", JAUNE_TITRE)], 44, 0.25).move_to(P(-0.6, -1.9))
        cadre = SurroundingRectangle(r2, color=VERT_OK, buff=0.2)
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(r2[2], 0.3)
        self.attendre_voix()

    # ── 03 : le calcul : p, 2p, 7p = 1 ──────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("La même probabilité p")
        tab = self.tableau_de(y=1.6)
        self.add(tab)
        self.au_mot("Les faces 1 à 5")
        cinq = VGroup(*[tab.ent[i] for i in range(5)])
        self.play(cinq.animate.set_fill(AMBRE_FOND), run_time=0.5)
        self.au_mot("même probabilité p")
        ps = [tab.ecrire(i, "p") for i in range(5)]
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in ps], lag_ratio=0.15), run_time=0.9)
        self.play(cinq.animate.set_fill(ENTETE_FOND), run_time=0.3)
        self.au_mot("La face 6 a 2p")
        p6 = tab.ecrire(5, "2p", ORANGE_RETENUE)
        self.play(tab.val[5].animate.set_fill(AMBRE_FOND), FadeIn(p6, scale=0.5), run_time=0.5)
        self.insister(p6, 0.3)

        y = -0.75
        self.au_mot("Somme")
        somme = self.t("Somme :", 40, WHITE).move_to(P(-4.4, y))
        self.play(FadeIn(somme, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("5p plus")
        a = self.t("5p", 44, BLEU_CALCUL).next_to(somme, RIGHT, buff=0.35)
        self.play(*[Indicate(p, color=BLEU_CALCUL) for p in ps], FadeIn(a, shift=UP * 0.15), run_time=0.5)
        self.au_mot("plus 2p")
        b = self.ligne([("+", WHITE), ("2p", ORANGE_RETENUE)], 44, 0.2).next_to(a, RIGHT, buff=0.25)
        self.play(Indicate(p6, color=ORANGE_RETENUE), FadeIn(b, shift=UP * 0.15), run_time=0.5)
        self.au_mot("7p, égale")
        c = self.ligne([("=", WHITE), ("7p", JAUNE_TITRE)], 44, 0.2).next_to(b, RIGHT, buff=0.25)
        self.play(FadeIn(c, shift=UP * 0.15), run_time=0.4)
        self.au_mot("égale 1")
        d = self.ligne([("=", WHITE), ("1", VERT_OK)], 44, 0.2).next_to(c, RIGHT, buff=0.25)
        self.play(FadeIn(d, shift=UP * 0.15), run_time=0.4)
        self.insister(d[1], 0.3)

        self.au_mot("p vaut 1 sur 7")
        res = self.ligne([("Donc", WHITE), ("p", BLEU_CALCUL), ("=", WHITE), (self.pf(1, 7, 40, VERT_OK), None)],
                         44, 0.25).move_to(P(-2.6, -2.15))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.5)
        septiemes = [tab.ecrire(i, "1/7") for i in range(5)]
        self.play(*[ReplacementTransform(p, s) for p, s in zip(ps, septiemes)], run_time=0.8)
        self.au_mot("face 6 vaut 2 sur 7")
        r6 = self.ligne([("face 6 :", WHITE), (self.pf(2, 7, 40, ORANGE_RETENUE), None)], 40, 0.25)
        r6.next_to(res, RIGHT, buff=0.9)
        f6 = tab.ecrire(5, "2/7", AMBRE_ENCRE)
        self.play(FadeIn(r6, shift=UP * 0.15), ReplacementTransform(p6, f6), run_time=0.6)
        self.insister(f6, 0.3)
        self.attendre_voix()

    # ── 04 : la probabilité d'un événement ──────────────────────────────────

    def ecran_evenement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-evenement")
        self.titre_ecran("La probabilité d'un événement")
        tab = self.tableau_de(y=1.55)
        self.add(tab)
        self.au_mot("c'est la somme")
        regle = self.ligne([("P(événement)", BLEU_CALCUL), ("=", WHITE), ("somme des probabilités de ses issues", WHITE)],
                           32, 0.2).move_to(P(-0.6, -0.3))
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.6)

        self.au_mot("Obtenir un nombre pair")
        ev = self.etiquette("Obtenir un nombre pair", BLEU_CALCUL, 30).move_to(P(-0.6, -1.3))
        self.play(GrowFromCenter(ev), run_time=0.5)
        for ex, i in zip(["2, 4", "4 et", "et 6"], (1, 3, 5)):
            self.au_mot(ex)
            allume = face_coach(i + 1, 0.5, actif=True).move_to(tab.t_ent[i]).set_z_index(2)
            self.play(tab.ent[i].animate.set_fill(AMBRE_FOND), tab.val[i].animate.set_fill(AMBRE_FOND),
                      Transform(tab.t_ent[i], allume), run_time=0.35)

        y = -2.6
        tete = self.ligne([("P(pair)", BLEU_CALCUL), ("=", WHITE)], 40, 0.2).move_to(P(-5.0, y))
        morceaux = [("1 sur 7, plus", 1, 1), ("plus 1 sur 7", 3, 1), ("plus 2 sur 7", 5, 2)]
        prec = tete
        for k, (ex, i, num) in enumerate(morceaux):
            self.au_mot(ex)
            f = self.pf(num, 7, 36, WHITE)
            v = tab.ecrire(i, f"{num}/7", AMBRE_ENCRE)
            self.play(FadeIn(v, scale=0.5), run_time=0.25)
            if k:
                plus = self.t("+", 40).next_to(prec, RIGHT, buff=0.2)
                f.next_to(plus, RIGHT, buff=0.2)
                self.play(FadeIn(plus), TransformFromCopy(v, f), run_time=0.4)
            else:
                f.next_to(tete, RIGHT, buff=0.25)
                self.play(FadeIn(tete), TransformFromCopy(v, f), run_time=0.4)
            prec = f
        self.au_mot("4 sur 7")
        eg = self.t("=", 40).next_to(prec, RIGHT, buff=0.25)
        r = self.pf(4, 7, 44, VERT_OK).next_to(eg, RIGHT, buff=0.25)
        self.play(FadeIn(eg), FadeIn(r, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(r, 0.3)
        self.attendre_voix()

    # ── 05 : le piège 3/6 ───────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("dire 3 sur 6")
        faux = self.ligne([("P(pair)", WHITE), ("=", WHITE), (self.pf(3, 6, 44, ORANGE_RETENUE), None),
                           ("?", ORANGE_RETENUE)], 44, 0.25).move_to(P(-0.6, 2.2))
        self.play(FadeIn(faux, shift=DOWN * 0.15), run_time=0.5)
        self.insister(faux[2], 0.3)

        self.au_mot("dé équilibré")
        b1, f1, s1 = barres_resultats([1] * 6, pas=0.55, larg=0.38, unite=0.8, cote_face=0.4, six_orange=False)
        g1 = VGroup(b1, f1, s1).move_to(P(-3.9, 0.15))
        l1 = self.t("dé équilibré", 34, BLEU_CALCUL).next_to(g1, DOWN, buff=0.3)
        ok = VGroup(self.pf(3, 6, 40, WHITE), self.coche(taille=0.25)).arrange(RIGHT, buff=0.3)
        ok.next_to(l1, DOWN, buff=0.3)
        self.play(FadeIn(g1), FadeIn(l1), run_time=0.5)
        self.play(FadeIn(ok[0], shift=UP * 0.15), Create(ok[1]), run_time=0.5)

        self.au_mot("pas pour un dé truqué")
        b2, f2, s2 = barres_resultats([1, 1, 1, 1, 1, 2], pas=0.55, larg=0.38, unite=0.8, cote_face=0.4)
        g2 = VGroup(b2, f2, s2)
        g2.shift(P(2.4 - s2.get_center()[0], s1.get_center()[1] - s2.get_center()[1]))
        l2 = self.t("dé truqué", 34, ORANGE_RETENUE).move_to(P(2.4, l1.get_center()[1]))
        non = self.pf(3, 6, 40, WHITE).move_to(P(2.4, ok.get_center()[1]))
        self.play(FadeIn(g2), FadeIn(l2), FadeIn(non), run_time=0.5)
        self.play(Create(self.barrer(non, sw=7)), run_time=0.4)
        self.au_mot("4 sur 7")
        bon = self.pf(4, 7, 44, VERT_OK).next_to(non, RIGHT, buff=0.6)
        self.play(FadeIn(bon, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(bon, color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(bon, 0.3)
        self.attendre_voix()

    # ── 06 : défi de la roue ────────────────────────────────────────────────

    C_ROUE = P(-3.7, 0.0)
    R_ROUE = 1.75

    def roue(self):
        secteurs, milieux, fixe = roue_coach([0.5, 0.3, 0.2], [ROUGE_C, BLEU_C, VERT_C], self.R_ROUE)
        VGroup(secteurs, fixe).shift(self.C_ROUE)
        return secteurs, milieux, fixe

    def lbl_roue(self, milieux, k, texte, fs=32):
        a = milieux[k]
        return etiquette_roue(texte, fs).move_to(self.C_ROUE + 0.6 * self.R_ROUE * P(math.cos(a), math.sin(a)))

    def tableau_roue(self, probas=None):
        tab = TableauLoi(["Rouge", "Bleu", "Vert"], probas, larg_lab=2.4, larg=1.55)
        return tab.move_to(P(2.35, 0.6))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        secteurs, milieux, fixe = self.roue()
        self.au_mot("Une roue")
        self.play(FadeIn(secteurs, scale=0.8), FadeIn(fixe), run_time=0.5)
        self.play(Rotate(secteurs, angle=-2 * TAU, about_point=self.C_ROUE), run_time=1.6,
                  rate_func=rate_functions.ease_out_cubic)
        tab = self.tableau_roue()
        self.au_mot("trois couleurs")
        self.play(FadeIn(tab.fonds), FadeIn(tab.txt_lab), run_time=0.6)
        vals = []
        for ex, k, s in [("rouge 0,5", 0, "0,5"), ("bleu 0,3", 1, "0,3")]:
            self.au_mot(ex)
            lr = self.lbl_roue(milieux, k, s)
            v = tab.ecrire(k, s)
            self.play(FadeIn(tab.t_ent[k]), FadeIn(lr, scale=0.5), FadeIn(v, scale=0.5), Indicate(secteurs[k], color=[ROUGE_C, BLEU_C][k], scale_factor=1.08),
                      run_time=0.5)
            vals.append(v)
        self.au_mot("probabilité de vert")
        lv = self.lbl_roue(milieux, 2, "?", 40)
        q = tab.ecrire(2, "?", ORANGE_RETENUE)
        self.play(FadeIn(tab.t_ent[2]), FadeIn(lv, scale=0.5), FadeIn(q, scale=0.5), tab.val[2].animate.set_fill(AMBRE_FOND), run_time=0.5)
        self.insister(q, 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        secteurs, milieux, fixe = self.roue()
        tab = self.tableau_roue()
        q = tab.ecrire(2, "?", ORANGE_RETENUE)
        tab.val[2].set_fill(AMBRE_FOND)
        lr = [self.lbl_roue(milieux, 0, "0,5"), self.lbl_roue(milieux, 1, "0,3")]
        lv = self.lbl_roue(milieux, 2, "?", 40)
        self.add(secteurs, fixe, tab, q, lv)
        y = -1.0
        self.au_mot("La somme vaut 1")
        s = self.ligne([("somme", WHITE), ("=", WHITE), ("1", JAUNE_TITRE)], 40, 0.2).move_to(P(2.35, y))
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.5)
        self.au_mot("1 moins 0,5")
        a = self.ligne([("1", JAUNE_TITRE), ("− 0,5", ROUGE_C)], 40, 0.2)
        a.move_to(P(0, y - 0.9)).align_to(P(-0.2, 0), LEFT)
        v5 = tab.ecrire(0, "0,5")
        self.play(FadeIn(a, shift=UP * 0.15), FadeIn(v5, scale=0.5), FadeIn(lr[0], scale=0.5), run_time=0.5)
        self.au_mot("moins 0,3")
        b = self.t("− 0,3", 40, BLEU_C).next_to(a, RIGHT, buff=0.2)
        v3 = tab.ecrire(1, "0,3")
        self.play(FadeIn(b, shift=UP * 0.15), FadeIn(v3, scale=0.5), FadeIn(lr[1], scale=0.5), run_time=0.5)
        self.au_mot("vert vaut 0,2")
        c = self.ligne([("=", WHITE), ("0,2", VERT_OK)], 44, 0.2).next_to(b, RIGHT, buff=0.25)
        v = tab.ecrire(2, "0,2", AMBRE_ENCRE)
        lv2 = self.lbl_roue(milieux, 2, "0,2")
        self.play(FadeIn(c, scale=0.5), ReplacementTransform(q, v), ReplacementTransform(lv, lv2), run_time=0.5)
        self.play(Create(SurroundingRectangle(c[1], color=VERT_OK, buff=0.1)), run_time=0.3)
        self.insister(lv2, 0.3)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une loi de probabilité donne", "Une loi : chaque issue et sa probabilité"),
            ("entre 0 et 1", "Chaque probabilité est entre 0 et 1"),
            ("de somme 1", "La somme des probabilités vaut 1"),
            ("La probabilité d'un événement", "P(événement) = somme de ses issues"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.9, 0.4))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : calculer avec une loi", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_loi()
        self.ecran_calcul()
        self.ecran_evenement()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
