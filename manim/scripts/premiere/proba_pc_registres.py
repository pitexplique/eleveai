# proba_pc_registres.py
# EleveAI — Maths 1re spé — série « Probabilités conditionnelles », épisode 2 :
# traduire « et », « parmi », « sachant que » (micro : pc_registres), AVEC VOIX.
# Paysage 16:9, CEINTURE MARRON. Short jumeau : proba_pc_registres_short.py.
#
# ⭐ Le fil : le TABLEAU À DOUBLE ENTRÉE du coach (canvas `tableau_donnees`,
# TableauDonneesCanvas.tsx : en-têtes ardoise, première colonne bleu ciel, cases
# blanches, cases allumées en jaune cerclé de jaune foncé), SANS nombres :
#   « et »                     = UNE CASE (Pluie × Retard) ;
#   « parmi les jours de pluie » = la LIGNE Pluie (le reste s'estompe) ;
#   « sachant retard »          = la COLONNE Retard ;
#   le piège                    = la ligne PUIS la colonne, la même case.
#
# Écrans : 00 garde · 01 le car jaune, R et P (le tableau se monte) · 02 « et »
# · 03 « parmi » · 04 « sachant que » · 05 la méthode · 06 le piège · 07 défi ·
# 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/premiere-proba-registres.json (débit −6).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/proba_pc_registres.py ProbaRegistresPremiere -o eleveai-maths-premiere-proba-registres --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere/maths/probabilites/02-parmi-sachant/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Couleurs du canvas du coach (Tailwind) : slate-800, sky-100, yellow-200/500.
ARDOISE = "#1E293B"
CIEL = "#E0F2FE"
ENCRE = "#0F172A"
JAUNE_CASE = "#FEF08A"
JAUNE_ANNEAU = "#EAB308"
CAR = "#FACC15"
C_P = BLEU_CALCUL        # l'événement P (pluie), sur fond sombre
C_P_CLAIR = "#0284C7"    # le même, sur la colonne bleu ciel
C_R = ORANGE_RETENUE     # l'événement R (retard)


class NotionPremiere(Notion6e):
    identite = "Maths 1re spé — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les écritures (que des Text) ────────────────────────────────────────────

def colorer(T, texte, mot, couleur):
    """Colore `mot` dans le Text T écrit avec `texte` (les espaces ne comptent pas)."""
    s = texte.replace(" ", "")
    m = mot.replace(" ", "")
    i = s.find(m)
    if i >= 0 and len(T) == len(s):
        VGroup(*T[i:i + len(m)]).set_color(couleur)
    return T


def note_cond(cond, ev, suite="", fs=56, c_cond=C_P, c_ev=C_R, color=WHITE):
    """P_cond(ev) suite : l'indice est un vrai petit caractère, abaissé."""
    texte = f"P{cond}({ev}){suite}"
    T = Text(texte, font_size=fs, color=color)
    n = len(cond.replace(" ", ""))
    idx = VGroup(*T[1:1 + n])
    w0 = idx.width
    idx.scale(0.6, about_edge=DL).shift(DOWN * 0.16 * fs / 56)
    VGroup(*T[1 + n:]).shift(LEFT * (w0 - idx.width - 0.03 * fs / 56))
    idx.set_color(c_cond)
    VGroup(*T[2 + n:2 + n + len(ev.replace(" ", ""))]).set_color(c_ev)
    return T


def note_inter(suite="", fs=56, color=WHITE):
    """P(P ∩ R) suite."""
    T = Text(f"P(P ∩ R){suite}", font_size=fs, color=color)
    T[2].set_color(C_P)
    T[3].set_color(JAUNE_TITRE)
    T[4].set_color(C_R)
    return T


# ── les dessins : le car jaune, le nuage, la pluie ──────────────────────────

def car_jaune(s=1.0):
    """Le car jaune de La Réunion, de profil (vers la droite)."""
    caisse = RoundedRectangle(width=3.0, height=1.25, corner_radius=0.18, fill_color=CAR, fill_opacity=1,
                              stroke_color="#A16207", stroke_width=3)
    nez = RoundedRectangle(width=0.5, height=0.75, corner_radius=0.12, fill_color=CAR, fill_opacity=1,
                           stroke_color="#A16207", stroke_width=3).move_to(P(1.55, -0.25))
    vitres = VGroup(*[RoundedRectangle(width=0.5, height=0.42, corner_radius=0.06, fill_color="#BAE6FD",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.1 + 0.62 * k, 0.22))
                      for k in range(4)])
    pare_brise = Polygon(P(1.15, 0.45), P(1.42, 0.45), P(1.42, -0.02), P(1.15, -0.02), fill_color="#BAE6FD",
                         fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=2.9, height=0.1, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    phare = Circle(radius=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(1.74, -0.4))
    roues = VGroup()
    for x in (-0.85, 0.95):
        roues.add(VGroup(Circle(radius=0.3, fill_color=ENCRE, fill_opacity=1, stroke_color=GREY_B, stroke_width=2),
                         Circle(radius=0.11, fill_color=GREY_B, fill_opacity=1, stroke_width=0)).move_to(P(x, -0.66)))
    return VGroup(nez, caisse, vitres, pare_brise, bande, phare, roues).scale(s)


def nuage(s=1.0, couleur="#CBD5E1"):
    bulles = VGroup(*[Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, r in [(-0.7, -0.1, 0.42), (-0.15, 0.2, 0.6), (0.55, 0.05, 0.48), (0.95, -0.15, 0.32)]])
    base = RoundedRectangle(width=2.1, height=0.5, corner_radius=0.25, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(P(0.1, -0.3))
    return VGroup(bulles, base).scale(s)


def pluie(centre, largeur=2.0, hauteur=1.4, n=14, vitesse=3.0):
    """Des gouttes qui tombent en boucle sous le nuage (updater)."""
    gouttes = VGroup(*[Line(P(0, 0), P(-0.05, -0.2), color=C_P, stroke_width=3) for _ in range(n)])
    xs = [centre[0] - largeur / 2 + largeur * ((k * 0.61) % 1.0) for k in range(n)]
    phases = [(k * 0.37) % 1.0 for k in range(n)]
    horloge = {"t": 0.0}

    def tombe(m, dt):
        horloge["t"] += dt
        for k, g in enumerate(m):
            f = (horloge["t"] * vitesse / hauteur + phases[k]) % 1.0
            g.move_to(P(xs[k], centre[1] + hauteur / 2 - f * hauteur))

    tombe(gouttes, 0)
    gouttes.add_updater(tombe)
    return gouttes


# ── LE TABLEAU À DOUBLE ENTRÉE du coach (tableau_donnees), sans nombres ─────

class TableauCar(VGroup):
    """Pluie / Pas de pluie × Retard / Pas de retard.

    `cases[i][j]` : la case de la ligne i (0 = Pluie) et de la colonne j
    (0 = Retard). `lignes[i]`, `colonnes[j]` : les étiquettes. `etat()` renvoie
    les animations vers un état « allumé » : ce qui est allumé passe au jaune
    du coach, le reste s'estompe ; sans rien d'allumé, tout est normal.
    """

    def __init__(self, w_lab=2.8, w_col=3.0, h_ent=0.8, h_lig=1.0, fs=26, coin="Jours",
                 lignes=(("Pluie (P)", "P"), ("Pas de pluie", None)),
                 colonnes=(("Retard (R)", "R"), ("Pas de retard", None)), **kw):
        super().__init__(**kw)
        larg = w_lab + 2 * w_col
        haut = h_ent + 2 * h_lig
        x0, y0 = -larg / 2, haut / 2

        def rect(x, y, w, h, fond):
            return Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1, stroke_color="#94A3B8",
                             stroke_width=2).move_to(P(x + w / 2, y - h / 2))

        self.coin = VGroup(rect(x0, y0, w_lab, h_ent, ARDOISE))
        self.coin.add(Text(coin, font_size=fs - 4, color=WHITE, weight=BOLD).move_to(self.coin[0]))
        self.colonnes = VGroup()
        for j, (txt, lettre) in enumerate(colonnes):
            r = rect(x0 + w_lab + j * w_col, y0, w_col, h_ent, ARDOISE)
            t = Text(txt, font_size=fs, color=WHITE, weight=BOLD)
            if lettre:
                colorer(t, txt, f"({lettre})", C_R)
            if t.width > w_col * 0.9:
                t.scale_to_fit_width(w_col * 0.9)
            self.colonnes.add(VGroup(r, t.move_to(r)))
        self.lignes = VGroup()
        for i, (txt, lettre) in enumerate(lignes):
            r = rect(x0, y0 - h_ent - i * h_lig, w_lab, h_lig, CIEL)
            t = Text(txt, font_size=fs, color=ENCRE, weight=BOLD)
            if lettre:
                colorer(t, txt, f"({lettre})", C_P_CLAIR)
            if t.width > w_lab * 0.9:
                t.scale_to_fit_width(w_lab * 0.9)
            self.lignes.add(VGroup(r, t.move_to(r)))
        self.cases = [[rect(x0 + w_lab + j * w_col, y0 - h_ent - i * h_lig, w_col, h_lig, WHITE)
                       for j in range(2)] for i in range(2)]
        self.add(self.coin, self.colonnes, self.lignes, *[c for l in self.cases for c in l])

    def tout(self):
        return [c for l in self.cases for c in l]

    def etat(self, cases=(), lignes=(), colonnes=()):
        """Les animations vers : cases allumées = `cases` + celles des lignes et colonnes données."""
        allume = set(cases) | {(i, j) for i in lignes for j in range(2)} | {(i, j) for j in colonnes for i in range(2)}
        rien = not allume
        anims = []
        for i in range(2):
            for j in range(2):
                c = self.cases[i][j]
                if (i, j) in allume:
                    anims.append(c.animate.set_fill(JAUNE_CASE, 1).set_stroke(JAUNE_ANNEAU, 7))
                elif rien:
                    anims.append(c.animate.set_fill(WHITE, 1).set_stroke("#94A3B8", 2))
                else:
                    anims.append(c.animate.set_fill(WHITE, 0.18).set_stroke("#94A3B8", 1))
        lig_on = set(lignes) | {i for i, _ in cases}
        col_on = set(colonnes) | {j for _, j in cases}
        for i, l in enumerate(self.lignes):
            anims.append(l.animate.set_opacity(1 if (rien or i in lig_on) else 0.25))
        for j, c in enumerate(self.colonnes):
            anims.append(c.animate.set_opacity(1 if (rien or j in col_on) else 0.25))
        return anims

    def anneau(self, i, j, couleur=ROUGE_ERREUR):
        """Un cadre épais autour d'une case (la case visée dans le groupe)."""
        return SurroundingRectangle(self.cases[i][j], color=couleur, buff=0.06, stroke_width=7)

    def cadre_ligne(self, i, couleur=C_P):
        return SurroundingRectangle(VGroup(self.lignes[i], *self.cases[i]), color=couleur, buff=0.1,
                                    stroke_width=6)

    def cadre_colonne(self, j, couleur=C_R):
        return SurroundingRectangle(VGroup(self.colonnes[j], self.cases[0][j], self.cases[1][j]), color=couleur,
                                    buff=0.1, stroke_width=6)


class ProbaRegistresPremiere(NotionPremiere):
    nom_voix = "premiere-proba-registres"

    XT, YT = -2.5, 0.15   # le centre du tableau
    XN = 4.0              # le centre des écritures, à droite du tableau

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def phrase(self, texte, mots=(), font_size=36, y=2.45, largeur=12.4):
        """Une phrase entre guillemets, des mots colorés : [(mot, couleur), …]."""
        T = Text(texte, font_size=font_size)
        for m, c in mots:
            colorer(T, texte, m, c)
        if T.width > largeur:
            T.scale_to_fit_width(largeur)
        return T.move_to(P(-0.4, y))

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, s=0.9):
        return TableauCar().scale(s).move_to(P(self.XT, self.YT))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Parmi, sachant que, et", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        colorer(titre, "Parmi, sachant que, et", "Parmi", C_P)
        colorer(titre, "Parmi, sachant que, et", "sachantque", C_R)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("marron").move_to(P(-0.6, -2.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        car = car_jaune(0.75).move_to(P(-7.5, 0.35))
        nu = nuage(0.8).move_to(P(1.6, 1.25))
        gt = pluie(P(1.6, 0.25), 1.6, 1.3, 12)
        self.add(nu, gt)
        self.au_mot("traduire une phrase")
        self.play(car.animate.move_to(P(-2.2, 0.35)), run_time=1.0, rate_func=rate_functions.ease_out_sine)
        sous = self.t("traduire une phrase en probabilité", 36, BLEU_CALCUL).move_to(P(-0.6, -1.05))
        self.play(FadeIn(sous, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=1.0)
        gt.clear_updaters()

    # ── 01 : le car jaune ; R et P ; le tableau se monte ────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le car jaune")
        car = car_jaune(0.6).move_to(P(-8.0, 2.35))
        self.play(car.animate.move_to(P(-4.6, 2.35)), run_time=1.0, rate_func=rate_functions.ease_out_sine)
        tab = self.tableau(0.9)
        self.au_mot("On note R")
        r = self.ligne_def("R", "le car est en retard", C_R).move_to(P(1.3, 2.55))
        self.play(FadeIn(r, shift=LEFT * 0.2), FadeIn(tab.coin), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in tab.colonnes], lag_ratio=0.3), run_time=0.7)
        self.au_mot("et P")
        p = self.ligne_def("P", "il pleut", C_P).next_to(r, DOWN, buff=0.22).align_to(r, LEFT)
        nu = nuage(0.45).move_to(P(-2.6, 2.7))
        gt = pluie(P(-2.6, 2.15), 0.9, 0.8, 8)
        self.play(FadeIn(p, shift=LEFT * 0.2), FadeIn(nu), run_time=0.5)
        self.add(gt)
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in tab.lignes], lag_ratio=0.3), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(c) for c in tab.tout()], lag_ratio=0.15), run_time=0.6)
        self.attendre_voix()
        gt.clear_updaters()

    def case_vers_notation(self, tab, i, j):
        """La case allumée s'envole, en petit, au-dessus de la place de l'écriture."""
        mini = tab.cases[i][j].copy()
        self.play(mini.animate.scale(0.45).move_to(P(self.XN, self.YT + 1.05)), run_time=0.6)
        fl = Arrow(mini.get_bottom(), P(self.XN, self.YT - 0.35), buff=0.08, color=JAUNE_TITRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.3)
        return mini, fl

    def ligne_def(self, lettre, sens, couleur, fs=34):
        texte = f"{lettre} : « {sens} »"
        T = Text(texte, font_size=fs)
        T[0].set_color(couleur)
        return T

    # ── 02 : « et » = UNE CASE ──────────────────────────────────────────────

    def ecran_et(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-et")
        self.titre_ecran("« et »")
        tab = self.tableau()
        self.add(tab)
        ph = self.phrase("« Il pleut et le car est en retard »",
                         [("Il pleut", C_P), ("et", JAUNE_TITRE), ("en retard", C_R)], 38)
        self.play(FadeIn(ph, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("les deux en même temps")
        self.play(*tab.etat(cases=[(0, 0)]), run_time=0.6)
        self.insister(tab.cases[0][0], 0.3)
        mini, fl = self.case_vers_notation(tab, 0, 0)
        self.au_mot("C'est P de P inter R")
        n = note_inter(fs=60).move_to(P(self.XN, self.YT - 0.75))
        self.play(GrowArrow(fl), FadeIn(n, shift=DOWN * 0.2), run_time=0.6)
        self.play(Indicate(n[3], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.attendre_voix()

    # ── 03 : « parmi » = UNE LIGNE ──────────────────────────────────────────

    def ecrire_cond(self, cond, ev, valeur, mot_note, mot_valeur, c_cond, c_ev, y=None):
        """P_cond(ev) au mot `mot_note`, puis « = valeur » au mot `mot_valeur`."""
        y = self.YT - 0.45 if y is None else y
        n = note_cond(cond, ev, f" = {valeur}", fs=54, c_cond=c_cond, c_ev=c_ev).move_to(P(self.XN, y))
        k = 3 + len(cond) + len(ev)  # P, indice, (, ev, )
        self.au_mot(mot_note)
        self.play(FadeIn(VGroup(*n[:k]), shift=DOWN * 0.2), run_time=0.5)
        self.play(Indicate(n[1:1 + len(cond)], color=c_cond, scale_factor=2.0), run_time=0.6)
        self.au_mot(mot_valeur)
        self.play(FadeIn(VGroup(*n[k:]), shift=LEFT * 0.2), run_time=0.4)
        self.play(VGroup(*n[k + 1:]).animate.scale(1.3), run_time=0.3)
        self.play(VGroup(*n[k + 1:]).animate.scale(1 / 1.3), run_time=0.3)
        return n

    def ecran_parmi(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-parmi")
        self.titre_ecran("« parmi »")
        tab = self.tableau()
        self.add(tab)
        ph = self.phrase("« Parmi les jours de pluie, 30 % ont un retard »",
                         [("Parmi", JAUNE_TITRE), ("les jours de pluie", C_P), ("30 %", JAUNE_TITRE),
                          ("un retard", C_R)], 38)
        self.play(FadeIn(ph, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("on se place dans les jours de pluie")
        cadre = tab.cadre_ligne(0)
        self.play(*tab.etat(lignes=[0]), Create(cadre), run_time=0.7)
        ici = self.t("on se place ici", 30, C_P).move_to(P(self.XN, tab.lignes[0].get_center()[1] + 0.15))
        fl = Arrow(ici.get_left(), cadre.get_right() + LEFT * 0.0, buff=0.1, color=C_P, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)
        self.play(FadeIn(ici, shift=LEFT * 0.2), GrowArrow(fl), run_time=0.5)
        ann = tab.anneau(0, 0, C_R)
        self.play(Create(ann), run_time=0.4)
        self.play(FadeOut(fl), ici.animate.shift(UP * 0.55), run_time=0.3)
        self.ecrire_cond("P", "R", "0,3", "C'est P indice P de R", "égale 0,3", C_P, C_R)
        self.attendre_voix()

    # ── 04 : « sachant que » = UNE COLONNE ──────────────────────────────────

    def ecran_sachant(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sachant")
        self.titre_ecran("« sachant que »")
        tab = self.tableau()
        self.add(tab)
        ph = self.phrase("« Sachant que le car est en retard, il pleut dans 60 % des cas »",
                         [("Sachant que", JAUNE_TITRE), ("le car est en retard", C_R), ("il pleut", C_P),
                          ("60 %", JAUNE_TITRE)], 36)
        self.play(FadeIn(ph, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("on se place dans les retards")
        cadre = tab.cadre_colonne(0)
        self.play(*tab.etat(colonnes=[0]), Create(cadre), run_time=0.7)
        ici = self.t("on se place ici", 30, C_R).next_to(cadre, DOWN, buff=0.12)
        self.play(FadeIn(ici, shift=UP * 0.2), run_time=0.4)
        ann = tab.anneau(0, 0, C_P)
        self.play(Create(ann), run_time=0.4)
        self.ecrire_cond("R", "P", "0,6", "C'est P indice R de P", "égale 0,6", C_R, C_P, y=self.YT + 0.3)
        self.attendre_voix()

    # ── 05 : la méthode ─────────────────────────────────────────────────────

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("La méthode")
        tab = TableauCar().scale(0.62).move_to(P(-3.9, 0.35))
        self.add(tab)
        self.au_mot("chercher le groupe")
        l1 = self.t("Chercher le groupe dans lequel on se place", 36).move_to(P(-0.6, 2.35))
        colorer(l1, "Chercher le groupe dans lequel on se place", "le groupe", JAUNE_TITRE)
        self.play(FadeIn(l1, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Il vient après")
        tags = VGroup(self.etiquette("« parmi »", C_P), self.etiquette("« sachant que »", C_R),
                      self.etiquette("« chez les »", VERT_OK)).arrange(DOWN, buff=0.25).move_to(P(2.6, 0.55))
        self.au_mot("parmi")
        cad = tab.cadre_ligne(0)
        self.play(GrowFromCenter(tags[0]), *tab.etat(lignes=[0]), Create(cad), run_time=0.5)
        self.au_mot("sachant que")
        cad2 = tab.cadre_colonne(0)
        self.play(GrowFromCenter(tags[1]), *tab.etat(colonnes=[0]), ReplacementTransform(cad, cad2), run_time=0.5)
        self.au_mot("chez les")
        cad3 = tab.cadre_ligne(1, VERT_OK)
        self.play(GrowFromCenter(tags[2]), *tab.etat(lignes=[1]), ReplacementTransform(cad2, cad3), run_time=0.5)
        self.au_mot("Il va en indice")
        n = note_cond("groupe", "…", fs=60, c_cond=JAUNE_TITRE, c_ev=WHITE).move_to(P(-0.6, -2.0))
        self.play(FadeIn(n, shift=LEFT * 0.2), run_time=0.5)
        fl = Arrow(tags.get_bottom(), n[1:7].get_top() + UP * 0.05, buff=0.12, color=JAUNE_TITRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.2)
        ind = self.t("en indice", 30, JAUNE_TITRE).next_to(n[1:7], DOWN, buff=0.2)
        self.play(GrowArrow(fl), FadeIn(ind, shift=UP * 0.15), run_time=0.5)
        self.insister(n[1:7], 0.35)
        self.attendre_voix()

    # ── 06 : le piège : la LIGNE puis la COLONNE ────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        ga = TableauCar().scale(0.6).move_to(P(-3.65, 0.9))
        dr = TableauCar().scale(0.6).move_to(P(2.95, 0.9))
        self.play(FadeIn(ga), FadeIn(dr), run_time=0.5)
        self.au_mot("P indice P de R et")
        na = note_cond("P", "R", fs=50).next_to(ga, UP, buff=0.3)
        self.play(FadeIn(na, shift=DOWN * 0.15), *ga.etat(lignes=[0]), Create(ga.cadre_ligne(0)), run_time=0.6)
        self.au_mot("P indice R de P")
        nb = note_cond("R", "P", fs=50, c_cond=C_R, c_ev=C_P).next_to(dr, UP, buff=0.3)
        self.play(FadeIn(nb, shift=DOWN * 0.15), *dr.etat(colonnes=[0]), Create(dr.cadre_colonne(0)), run_time=0.6)
        self.au_mot("pas la même chose")
        neq = self.t("≠", 80, ROUGE_ERREUR).move_to(P(-0.37, 0.9))
        self.play(FadeIn(neq, scale=0.4), run_time=0.4)
        self.insister(neq, 0.3)
        self.au_mot("30 % des jours de pluie")
        ca = VGroup(self.t("30 % des jours de pluie", 28), self.t("ont un retard", 28)).arrange(DOWN, buff=0.12)
        colorer(ca[0], "30 % des jours de pluie", "30 %", JAUNE_TITRE)
        colorer(ca[0], "30 % des jours de pluie", "jours de pluie", C_P)
        colorer(ca[1], "ont un retard", "retard", C_R)
        ca.next_to(ga, DOWN, buff=0.4)
        self.play(FadeIn(ca, shift=UP * 0.15), Create(ga.anneau(0, 0, C_R)), run_time=0.5)
        self.au_mot("60 % des retards")
        cb = VGroup(self.t("60 % des retards", 28), self.t("ont lieu sous la pluie", 28)).arrange(DOWN, buff=0.12)
        colorer(cb[0], "60 % des retards", "60 %", JAUNE_TITRE)
        colorer(cb[0], "60 % des retards", "retards", C_R)
        colorer(cb[1], "ont lieu sous la pluie", "pluie", C_P)
        cb.next_to(dr, DOWN, buff=0.4)
        self.play(FadeIn(cb, shift=UP * 0.15), Create(dr.anneau(0, 0, C_P)), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def phrase_defi(self):
        return self.phrase("« 12 % des jours, il pleut et le car est en retard. »",
                           [("12 %", JAUNE_TITRE), ("il pleut", C_P), ("et", JAUNE_TITRE), ("en retard", C_R)],
                           36, y=2.3)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        tab = self.tableau(0.9)
        self.play(FadeIn(tab), run_time=0.4)
        self.au_mot("12 % des jours")
        ph = self.phrase_defi()
        self.play(FadeIn(ph, shift=DOWN * 0.15), run_time=0.5)
        self.play(Indicate(ph[1:4], color=JAUNE_TITRE, scale_factor=1.25), run_time=0.6)
        self.au_mot("Comment l'écrire")
        q = self.t("Comment l'écrire ?", 32, WHITE).move_to(P(self.XN, self.YT + 0.2))
        pq = self.t("P… ?", 60, JAUNE_TITRE).next_to(q, DOWN, buff=0.35)
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(pq, scale=0.6), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tab = self.tableau(0.9)
        ph = self.phrase_defi()
        self.add(tab, ph)
        self.au_mot("Les deux en même temps")
        self.play(*tab.etat(cases=[(0, 0)]), run_time=0.5)
        self.insister(tab.cases[0][0], 0.3)
        self.au_mot("sans groupe de référence")
        self.play(*[c.animate.set_opacity(1) for c in (*tab.lignes, *tab.colonnes)],
                  *[tab.cases[i][j].animate.set_fill(WHITE, 1) for i, j in ((0, 1), (1, 0), (1, 1))], run_time=0.4)
        cadre = SurroundingRectangle(VGroup(*tab.tout()), color=WHITE, buff=0.1, stroke_width=6)
        tous = self.t("sans groupe de référence", 30).next_to(cadre, DOWN, buff=0.15)
        self.play(Create(cadre), FadeIn(tous, shift=UP * 0.15), run_time=0.6)
        self.au_mot("P de P inter R égale 0,12")
        n = note_inter(" = 0,12", fs=54).move_to(P(self.XT + 0.6, -2.45))
        self.play(FadeIn(VGroup(*n[:6]), shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("égale 0,12")
        self.play(FadeIn(VGroup(*n[6:]), shift=LEFT * 0.2), run_time=0.4)
        self.play(Create(SurroundingRectangle(n, color=VERT_OK, buff=0.2)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        l1 = self.t("« et » : une intersection ∩", 42)
        colorer(l1, "« et » : une intersection ∩", "et", JAUNE_TITRE)
        l2 = self.t("« parmi », « sachant que » : le groupe en indice", 42)
        colorer(l2, "« parmi », « sachant que » : le groupe en indice", "en indice", JAUNE_TITRE)
        l3 = VGroup(note_cond("A", "B", fs=54, c_cond=JAUNE_TITRE, c_ev=WHITE), self.t("≠", 52, ROUGE_ERREUR),
                    note_cond("B", "A", fs=54, c_cond=JAUNE_TITRE, c_ev=WHITE)).arrange(RIGHT, buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 12.4:
            lignes.scale_to_fit_width(12.4)
        lignes.move_to(P(-0.4, 0.7))
        for mot, l in zip(["une intersection", "le groupe va en indice", "n'est pas P indice B"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : les tableaux croisés", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_et()
        self.ecran_parmi()
        self.ecran_sachant()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
