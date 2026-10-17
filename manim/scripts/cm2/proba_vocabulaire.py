# proba_vocabulaire.py
# EleveAI — Maths CM2 — série « Probabilités », épisode 1 : certain, possible,
# impossible… et « 1 chance sur 6 » (micro : probabilite_vocabulaire), AVEC
# VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : proba_vocabulaire_short.py (ceinture blanche, « faire 6 »).
#
# ⭐⭐ LES CANVAS DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx),
# repris tels quels pour que l'élève retrouve SON dessin :
#   · « de »      : les 6 faces en grille 3 × 2 sur une carte blanche, faces
#                   claires (#f8fafc) bordées d'ardoise, faces SURLIGNÉES en
#                   ambre (#fef3c7, bord #fbbf24) ;
#   · « billes »  : billes en grille (colonnes = min(6, max(3, ⌈√n⌉)) → 4 pour
#                   10 billes), rouge #ef4444 / bleu #3b82f6, lettre R / B au
#                   centre, sur une carte blanche ;
#   · « tableau » : « Événement | Type », la case du mot surlignée en ambre.
#
# Écrans : 00 garde · 01 le jeu de l'oie (le dé roule, faire 6) · 02 les trois
# mots (le tableau du coach se remplit) · 03 les chances (deux cartes de dé :
# 1 chance sur 6, 3 chances sur 6) · 04 la méthode (on compte les gagnants,
# puis tous les cas) · 05 le piège (« sur 3 » barré) · 06 défi du sac de 10
# billes · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/cm2-proba-vocabulaire.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm2/proba_vocabulaire.py ProbaVocabulaireCM2 -o eleveai-maths-cm2-proba-vocabulaire --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/01-vocabulaire/.

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
from annonce_probabilites import de, de_qui_roule  # noqa: E402

# couleurs du canvas du coach
ARDOISE = "#0F172A"
FACE_CLAIRE = "#F8FAFC"
FACE_AMBRE = "#FEF3C7"
BORD_AMBRE = "#FBBF24"
BORD_GRIS = "#CBD5E1"
CARTE_FOND = "#FFFFFF"
ROUGE_BILLE = "#EF4444"
BLEU_BILLE = "#3B82F6"
GRIS_ETEINT = "#6B7280"

# les mots, chacun sa couleur, partout
C_CERTAIN = VERT_OK
C_POSSIBLE = BLEU_CALCUL
C_IMPOSSIBLE = ROUGE_ERREUR

POINTS_COACH = {  # ProbabilitesCanvas.tsx, pointsDe (repère 0 → 100)
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


class NotionCM2(Notion6e):
    identite = "Maths CM2 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach, en Manim ───────────────────────────────────────────

def face_coach(f, cote=1.0):
    """Une case du canvas « de » : le cadre (gris, ou ambre si surligné) et la
    face arrondie avec ses points. [0] cadre, [1] face, [2] points."""
    cadre = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.12,
                             fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=3)
    k = cote / 100
    face = RoundedRectangle(width=84 * k, height=84 * k, corner_radius=16 * k,
                            fill_color=FACE_CLAIRE, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    pts = VGroup(*[Dot(P((x - 50) * k, (50 - y) * k), radius=6 * k * 1.15, color=ARDOISE)
                   for x, y in POINTS_COACH[f]])
    return VGroup(cadre, face, pts)


def surligner(case):
    """L'animation qui SURLIGNE une face, comme `surligne` dans le coach."""
    return [case[0].animate.set_stroke(BORD_AMBRE, 5).set_fill(FACE_AMBRE),
            case[1].animate.set_fill(FACE_AMBRE)]


def eteindre(case):
    return [case[0].animate.set_stroke(BORD_GRIS, 3).set_fill(CARTE_FOND),
            case[1].animate.set_fill(FACE_CLAIRE)]


def carte_de(cote=1.0, gap=0.2, surligne=()):
    """Le canvas « de » : 6 faces en grille de 3 colonnes sur une carte blanche.
    Renvoie (carte, faces) ; faces[f - 1] est la face f."""
    faces = VGroup(*[face_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 2 * gap + 0.1, height=faces.height + 2 * gap + 0.1,
                            corner_radius=0.2, fill_color=CARTE_FOND, fill_opacity=1,
                            stroke_color=BORD_GRIS, stroke_width=2).move_to(faces)
    for f in surligne:
        c = faces[f - 1]
        c[0].set_stroke(BORD_AMBRE, 5).set_fill(FACE_AMBRE)
        c[1].set_fill(FACE_AMBRE)
    return VGroup(fond, faces), faces


def bille_coach(couleur, lettre, r=0.4):
    """Une bille du canvas « billes » : disque coloré bordé d'ardoise, lettre
    blanche cernée au centre."""
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    l = Text(lettre, font_size=int(r * 70), color=WHITE, weight=BOLD)
    l.set_stroke(ARDOISE, width=2, background=True).move_to(d)
    return VGroup(d, l)  # R / B : redondant avec la couleur dite (toléré)


def carte_billes(elements, r=0.4, pas=1.0):
    """Le canvas « billes » : colonnes = min(6, max(3, ⌈√n⌉)). Renvoie (carte, billes)."""
    n = len(elements)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    billes = VGroup()
    for i, (coul, lettre) in enumerate(elements):
        b = bille_coach(coul, lettre, r).move_to(P((i % cols) * pas, -(i // cols) * pas))
        billes.add(b)
    lignes = math.ceil(n / cols)
    fond = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                            fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    fond.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    return VGroup(fond, billes), billes


def case_oie(n, cote=0.62, couleur="#FDE68A"):
    c = Square(cote, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=2)
    return VGroup(c, Text(str(n), font_size=20, color=ARDOISE, weight=BOLD).move_to(c))  # décor


def piste_oie(centre, n=15):
    """Un jeu de l'oie SIMPLIFIÉ : des cases numérotées en spirale."""
    cases = VGroup()
    a, r = PI, 2.7
    for i in range(n):
        coul = ["#FDE68A", "#BFDBFE", "#BBF7D0"][i % 3]
        cases.add(case_oie(i + 1, 0.7, coul).move_to(centre + P(r * math.cos(a), r * math.sin(a))))
        a -= 0.78 / r  # pas constant le long de la spirale
        r -= 0.085
    return cases


def pion(couleur=ROUGE_BILLE, s=1.0):
    tete = Circle(radius=0.11, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    corps = Polygon(P(-0.14, -0.22), P(0.14, -0.22), P(0.06, 0.0), P(-0.06, 0.0),
                    fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete.move_to(P(0, 0.08))
    return VGroup(corps, tete).scale(s)


class ProbaVocabulaireCM2(NotionCM2):
    nom_voix = "cm2-proba-vocabulaire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
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

    def chances(self, a, b, font_size=48, couleur=JAUNE_TITRE):
        """« a chance(s) sur b », les nombres en couleur."""
        mot = "chance" if a == 1 else "chances"
        return self.ligne([(str(a), couleur), (mot, WHITE), ("sur", WHITE), (str(b), couleur)], font_size, 0.2)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1,
                    stroke_width=sw, color=color)

    def badge(self, n, couleur=VERT_OK, r=0.2):
        d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=2)
        return VGroup(d, Text(str(n), font_size=int(r * 110), color=BLACK, weight=BOLD).move_to(d))

    # ── le canvas « tableau » du coach ──────────────────────────────────────

    def tableau_coach(self, n_lignes, larg=(3.4, 2.7), h=0.8, fs=32):
        """Grille vide « Événement | Type » (en-têtes du coach : étiquettes
        redondantes, tolérées). Renvoie (grille, centres[ligne][col])."""
        g = VGroup()
        x0 = -(larg[0] + larg[1]) / 2
        centres = []
        for r in range(n_lignes + 1):
            ligne_c = []
            x = x0
            for c in range(2):
                fond = "#F1F5F9" if r == 0 else CARTE_FOND
                case = Rectangle(width=larg[c], height=h, fill_color=fond, fill_opacity=1,
                                 stroke_color="#E2E8F0", stroke_width=2).move_to(P(x + larg[c] / 2, -r * h))
                g.add(case)
                ligne_c.append(case)
                x += larg[c]
            centres.append(ligne_c)
        for c, ent in enumerate(["Événement", "Type"]):
            g.add(Text(ent, font_size=fs, color="#1E293B", weight=BOLD).move_to(centres[0][c]))
        cadre = RoundedRectangle(width=sum(larg) + 0.06, height=(n_lignes + 1) * h + 0.06, corner_radius=0.1,
                                 stroke_color=BORD_GRIS, stroke_width=3).move_to(g)
        g.add(cadre)
        return g, centres

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.ligne([("Certain,", C_CERTAIN), ("possible,", C_POSSIBLE), ("impossible", C_IMPOSSIBLE)], 56, 0.3)
        titre.to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.3)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.2)
        d = de_qui_roule(P(-2.2, 0.35), 1.5)
        self.add(d)
        self.au_mot("et entre les deux")
        q = self.t("?", 130, JAUNE_TITRE).move_to(P(1.2, 0.35))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 0.35)
        self.attendre_voix(marge=1.0)
        d.clear_updaters()

    # ── 01 : le jeu de l'oie ────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le jeu de l'oie")
        piste = piste_oie(P(-3.3, -0.2), 17)
        p = pion().move_to(piste[3].get_center() + UP * 0.05)
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in piste], lag_ratio=0.06), run_time=1.0)
        self.play(FadeIn(p, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("on lance un dé")
        roule = de_qui_roule(P(2.4, 0.4), 1.8, periode=0.15)
        self.add(roule)
        self.au_mot("faire 6")
        roule.clear_updaters()
        self.remove(roule)
        six = face_coach(6, 1.9).move_to(P(2.4, 0.4))
        self.add(six)
        self.play(*surligner(six), run_time=0.3)
        self.insister(six, 0.3)
        self.au_mot("pour rejouer")
        regle = self.ligne([("faire", WHITE), ("6", JAUNE_TITRE), ("→", WHITE), ("rejouer !", VERT_OK)], 44, 0.25)
        regle.next_to(six, DOWN, buff=0.45)
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.4)
        for c in piste[4:7]:
            self.play(p.animate.move_to(c.get_center() + UP * 0.05), run_time=0.22)
        self.attendre_voix()

    # ── 02 : les trois mots (le tableau du coach se remplit) ────────────────

    def ecran_trois_mots(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-trois-mots")
        self.titre_ecran("Les trois mots")
        carte, faces = carte_de(0.95, 0.18)
        carte.move_to(P(-4.0, 0.2))
        tab, cx = self.tableau_coach(3, (3.1, 3.3), 0.85, 30)
        tab.move_to(P(1.55, 0.55))
        self.play(FadeIn(carte, shift=UP * 0.2), FadeIn(tab), run_time=0.8)
        fonces = {"certain": "#15803D", "impossible": "#B91C1C", "possible": "#1D4ED8"}

        def remplir(rang, ev, mot):
            e = Text(ev, font_size=30, color="#1E293B", weight=BOLD).move_to(cx[rang][0])
            m = Text(mot, font_size=30, color=fonces[mot], weight=BOLD).move_to(cx[rang][1])
            return e, m

        def mot_case(rang, m):
            case = cx[rang][1]
            self.play(case.animate.set_fill(FACE_AMBRE), FadeIn(m, scale=0.6), run_time=0.35)
            self.play(m.animate.scale(1.35), run_time=0.25)
            self.play(m.animate.scale(1 / 1.35), case.animate.set_fill(CARTE_FOND), run_time=0.25)

        self.au_mot("entre 1 et 6")
        e1, m1 = remplir(1, "entre 1 et 6", "certain")
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.3)
        self.play(LaggedStart(*[AnimationGroup(*surligner(f)) for f in faces], lag_ratio=0.12), run_time=0.8)
        self.au_mot(": certain")
        mot_case(1, m1)

        self.au_mot("Faire 0")
        e2, m2 = remplir(2, "0", "impossible")
        zero = VGroup(RoundedRectangle(width=0.9, height=0.9, corner_radius=0.12, stroke_color=C_IMPOSSIBLE,
                                       stroke_width=4).set_stroke(opacity=0.8),
                      self.t("0", 56, C_IMPOSSIBLE)).next_to(carte, UP, buff=0.3)
        zero[1].move_to(zero[0])
        self.play(*[a for f in faces for a in eteindre(f)], FadeIn(e2, shift=RIGHT * 0.2),
                  FadeIn(zero, scale=0.5), run_time=0.4)
        self.play(Wiggle(carte, scale_value=1.05), run_time=0.5)
        croix = VGroup(Line(zero.get_corner(UL), zero.get_corner(DR)), Line(zero.get_corner(UR), zero.get_corner(DL)))
        self.play(Create(croix.set_stroke(C_IMPOSSIBLE, 8)), run_time=0.3)
        self.au_mot(": impossible")
        mot_case(2, m2)

        self.au_mot("Faire 6")
        e3, m3 = remplir(3, "6", "possible")
        self.play(*surligner(faces[5]), FadeIn(e3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(faces[5].animate.scale(1.25), run_time=0.25)
        self.play(faces[5].animate.scale(1 / 1.25), run_time=0.25)
        self.au_mot(": possible.")
        mot_case(3, m3)
        self.attendre_voix()

    # ── 03 : les chances ────────────────────────────────────────────────────

    def ecran_chances(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-chances")
        self.titre_ecran("Possible… combien de chances ?")
        mot = self.t("possible", 64, C_POSSIBLE).move_to(P(-0.6, 0.6))
        self.play(FadeIn(mot, scale=0.6), run_time=0.4)
        self.au_mot("ça ne dit pas tout")
        self.insister(mot, 0.3)

        self.au_mot("Faire 6")
        cg, fg = carte_de(0.88, 0.16)
        cg.move_to(P(-4.0, 0.15))
        tg = self.ligne([("faire", WHITE), ("6", JAUNE_TITRE)], 40, 0.2).next_to(cg, UP, buff=0.3)
        self.play(FadeOut(mot, shift=UP * 0.3), FadeIn(cg, shift=UP * 0.2), FadeIn(tg), run_time=0.6)
        self.play(*surligner(fg[5]), run_time=0.3)
        self.play(fg[5].animate.scale(1.3), run_time=0.25)
        self.play(fg[5].animate.scale(1 / 1.3), run_time=0.25)
        self.au_mot("1 chance sur 6")
        r1 = self.chances(1, 6, 46).next_to(cg, DOWN, buff=0.4)
        self.play(FadeIn(r1, shift=UP * 0.2), run_time=0.4)
        self.insister(r1[0], 0.3)

        self.au_mot("nombre pair")
        cd, fd = carte_de(0.88, 0.16)
        cd.move_to(P(1.6, 0.15))
        td = self.t("un nombre pair", 40, WHITE).next_to(cd, UP, buff=0.3)
        self.play(FadeIn(cd, shift=UP * 0.2), FadeIn(td), run_time=0.5)
        for ex, f in zip(["2,", "4 ou", "ou 6"], (2, 4, 6)):
            self.au_mot(ex)
            self.play(*surligner(fd[f - 1]), run_time=0.15)
            self.play(fd[f - 1].animate.scale(1.25), run_time=0.2)
            self.play(fd[f - 1].animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("3 chances sur 6")
        r3 = self.chances(3, 6, 46).next_to(cd, DOWN, buff=0.4)
        self.play(FadeIn(r3, shift=UP * 0.2), run_time=0.4)
        self.insister(r3[0], 0.3)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("Compter les chances")
        carte, faces = carte_de(1.0, 0.2, surligne=(2, 4, 6))
        carte.move_to(P(-3.3, 0.35))
        self.play(FadeIn(carte, shift=UP * 0.2), run_time=0.5)

        self.au_mot("qui me font gagner")
        b_g = VGroup()
        for f in (2, 4, 6):  # ⛔ pas de numéros 1, 2, 3 : un anneau vert, sans nombre
            b = SurroundingRectangle(faces[f - 1], color=VERT_OK, buff=0.05, stroke_width=7, corner_radius=0.12)
            b_g.add(b)
            self.play(Create(b), run_time=0.2)
            self.play(VGroup(faces[f - 1], b).animate.scale(1.15), run_time=0.15)
            self.play(VGroup(faces[f - 1], b).animate.scale(1 / 1.15), run_time=0.15)
        l1 = self.ligne([("3", VERT_OK), ("cas gagnants", VERT_OK)], 44, 0.2).move_to(P(2.0, 1.4))

        self.au_mot("puis tous les cas")
        cadre = SurroundingRectangle(carte, color=JAUNE_TITRE, buff=0.08, stroke_width=6)
        self.play(Create(cadre), run_time=0.4)
        self.play(LaggedStart(*[f.animate(rate_func=there_and_back).scale(1.15) for f in faces], lag_ratio=0.15),
                  run_time=0.9)

        self.au_mot("3 cas gagnants")
        self.play(FadeIn(l1, shift=LEFT * 0.2), Indicate(b_g, color=VERT_OK, scale_factor=1.08), run_time=0.5)
        self.au_mot("sur 6 cas")
        sur = self.t("sur", 40).next_to(l1, DOWN, buff=0.3)
        l2 = self.ligne([("6", JAUNE_TITRE), ("cas", WHITE)], 44, 0.2).next_to(sur, DOWN, buff=0.3)
        self.play(FadeIn(sur), FadeIn(l2, shift=LEFT * 0.2), cadre.animate.set_stroke(width=10), run_time=0.3)
        self.play(cadre.animate.set_stroke(width=6), run_time=0.25)

        self.au_mot(": 3 chances sur 6")
        res = self.chances(3, 6, 52, VERT_OK).move_to(P(-0.6, -2.55))
        res[3].set_color(JAUNE_TITRE)
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.5)
        self.insister(res, 0.35)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        carte, faces = carte_de(0.85, 0.18, surligne=(2, 4, 6))
        carte.move_to(P(2.5, 0.45))
        self.add(carte)
        self.au_mot("3 chances sur 6")
        bon = self.chances(3, 6, 50, VERT_OK).move_to(P(-3.4, 1.5))
        ok = self.coche(taille=0.3).next_to(bon, RIGHT, buff=0.3)
        self.play(FadeIn(bon, shift=UP * 0.2), run_time=0.4)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("3 chances sur 3")
        faux = self.chances(3, 3, 50, ROUGE_ERREUR).move_to(P(-3.4, 0.0))
        self.play(FadeIn(faux, shift=UP * 0.2), run_time=0.4)
        self.play(Create(self.barrer(faux, sw=9)), run_time=0.35)
        self.insister(faux[3], 0.3)

        self.au_mot("On compte TOUS")
        cadre = SurroundingRectangle(faces, color=JAUNE_TITRE, buff=0.12, stroke_width=6)
        tous = self.t("TOUS les cas", 44, JAUNE_TITRE).next_to(carte, DOWN, buff=0.35)
        self.play(Create(cadre), FadeIn(tous, shift=UP * 0.2), run_time=0.5)
        self.insister(tous, 0.3)
        self.au_mot("même ceux qui font perdre")
        perdants = [faces[f - 1] for f in (1, 3, 5)]
        self.play(*[f[0].animate.set_stroke(ROUGE_ERREUR, 6) for f in perdants], run_time=0.3)
        self.play(*[f.animate.scale(1.2) for f in perdants], run_time=0.3)
        self.play(*[f.animate.scale(1 / 1.2) for f in perdants], run_time=0.3)
        self.play(Indicate(bon, color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : défi, le sac de 10 billes ──────────────────────────────────────

    def sac_de_billes(self):
        elements = [(ROUGE_BILLE, "R")] * 2 + [(BLEU_BILLE, "B")] * 8
        carte, billes = carte_billes(elements, r=0.34, pas=0.85)
        carte.move_to(P(-3.0, 0.05))
        larg, haut = carte.width + 0.7, carte.height + 0.7
        corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.5, stroke_color=WHITE, stroke_width=4,
                                 fill_color="#E0F2FE", fill_opacity=0.08).move_to(carte)
        col = Polygon(P(-0.7, 0), P(0.7, 0), P(0.4, 0.4), P(-0.4, 0.4), stroke_color=WHITE, stroke_width=4,
                      fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
        lien = Line(P(-0.5, 0), P(0.5, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
        return VGroup(corps, col, lien), carte, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        sac, carte, billes = self.sac_de_billes()
        self.au_mot("Dans un sac")
        self.play(Create(sac), FadeIn(carte[0]), run_time=0.6)
        self.au_mot("2 billes rouges")
        lr = self.ligne([("2", JAUNE_TITRE), ("rouges", ROUGE_BILLE)], 48, 0.2).move_to(P(2.2, 1.5))
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in billes[:2]], lag_ratio=0.3),
                  FadeIn(lr, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("8 billes bleues")
        lb = self.ligne([("8", JAUNE_TITRE), ("bleues", BLEU_BILLE)], 48, 0.2).next_to(lr, DOWN, buff=0.35)
        self.play(LaggedStart(*[FadeIn(b, scale=0.3) for b in billes[2:]], lag_ratio=0.1),
                  FadeIn(lb, shift=LEFT * 0.2), run_time=0.9)
        self.au_mot("Combien de chances")
        q = VGroup(self.t("Combien de chances", 36, ORANGE_RETENUE),
                   self.t("sur combien ?", 36, ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        q.move_to(P(2.5, -0.75))
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.au_mot("tirer une rouge")
        self.play(*[b.animate.scale(1.3) for b in billes[:2]], run_time=0.3)
        self.play(*[b.animate.scale(1 / 1.3) for b in billes[:2]], run_time=0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        sac, carte, billes = self.sac_de_billes()
        self.add(sac, carte)
        self.au_mot("2 billes rouges")
        lr = self.ligne([("2", JAUNE_TITRE), ("rouges", ROUGE_BILLE)], 48, 0.2).move_to(P(2.2, 1.5))
        anneaux = VGroup(*[Circle(radius=0.44, stroke_color=BORD_AMBRE, stroke_width=7).move_to(b) for b in billes[:2]])
        self.play(Create(anneaux), FadeIn(lr, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("10 billes en tout")
        tous = VGroup(*[Circle(radius=0.42, stroke_color=JAUNE_TITRE, stroke_width=5).move_to(b) for b in billes])
        self.play(LaggedStart(*[Create(c) for c in tous], lag_ratio=0.12), run_time=1.0)
        lt = self.ligne([("10", JAUNE_TITRE), ("en tout", WHITE)], 48, 0.2).next_to(lr, DOWN, buff=0.35)
        self.play(FadeIn(lt, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("2 chances sur 10")
        res = self.chances(2, 10, 52, VERT_OK).move_to(P(2.6, -0.9))
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.4)
        self.insister(res, 0.35)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(taille=0.3),
                    self.ligne([("certain", C_CERTAIN), ("·", WHITE), ("possible", C_POSSIBLE), ("·", WHITE),
                                ("impossible", C_IMPOSSIBLE)], 46, 0.3)).arrange(RIGHT, buff=0.35)
        l2 = VGroup(self.coche(taille=0.3),
                    self.ligne([("cas gagnants", VERT_OK), ("sur", WHITE),
                                ("tous les cas", JAUNE_TITRE)], 44, 0.22)).arrange(RIGHT, buff=0.35)
        lignes = VGroup(l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.9)
        if lignes.width > 10.5:
            lignes.scale_to_fit_width(10.5)
        lignes.move_to(P(-0.6, 0.9))
        self.au_mot("Certain, possible")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l1[0]), run_time=0.4)
        self.au_mot("on compte les chances")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(l2[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : c'est quoi, le hasard ?", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_trois_mots()
        self.ecran_chances()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
