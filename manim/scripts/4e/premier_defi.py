# premier_defi.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 11 : DÉFI NOMBRES PREMIERS
# (compter les diviseurs sans les écrire). Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : premier_defi.
# Décor et métier : Elsa, organisatrice de tournois de jeux vidéo. Centre : jeux-video.
# Écrans : garde (00) ; les 36 joueurs d'Elsa (01) ; commençons petit, 12 (02) ; on vérifie dans la
# grille des choix (03) ; QUESTION 1 (03q) ; retour à Elsa, 36 (04) ; le piège (05) ; QUESTION 2 (05q) ;
# défi 72 (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-premier-defi.json ; marques : premier_defi_marques.json.
#
# VISUEL : chaque facteur premier a sa couleur (2 bleu ciel, 3 orange, 5 violet) et ses jetons ronds ;
# un diviseur = une case de la GRILLE DES CHOIX (ligne = combien de 2, colonne = combien de 3).
# La voix dit « zéro, un ou deux 2 » : l'écran écrit « 0, 1 ou 2 fois le 2 » ; _plan_eq (ci-dessous)
# fait attendre au chiffre 0, 1, 2, 3, 4 son mot « zéro », « un », « deux »… s'il vient avant le chiffre.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/premier_defi.py PremierDefi4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/premier_defi.py PremierDefi4e -o eleveai-maths-4e-premier-defi --media_dir manim/scripts/4e/media-div-11
# Sortie : manim/sorties/4e/maths/divisibilite/11-defi/eleveai-maths-4e-premier-defi.mp4

import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

C2 = "#7dd3fc"          # le facteur 2
C3 = ORANGE_RETENUE     # le facteur 3
C5 = "#c4b5fd"          # le facteur 5
COUL = {"2": C2, "3": C3, "5": C5}
NEON = "#a855f7"        # la tenue d'Elsa, les cadres d'équipe
EN_LETTRES = {"0": "zéro", "1": "un", "2": "deux", "3": "trois", "4": "quatre"}


# ── Les objets de l'épisode (propres à ce script) ───────────────────────────
def elsa(s=0.66):
    """Elsa : le sweat violet de l'organisatrice et le casque de commentatrice."""
    p = personne(peau="#e0ac69", tenue=NEON, cheveux="#7c2d12", longs=True, s=s)
    return VGroup(p, casque_audio(p))


def joueur(r=0.07, c=C2):
    """Un joueur vu de face : la tête et les épaules."""
    tete = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0)
    buste = Ellipse(width=3.0 * r, height=1.7 * r, fill_color=c, fill_opacity=1, stroke_width=0)
    buste.next_to(tete, DOWN, buff=0.03 * r / 0.07)
    return VGroup(buste, tete)


def manette(w=1.6, c="#334155"):
    """Une manette de jeu : le corps, la croix et les quatre boutons."""
    corps = RoundedRectangle(width=w, height=w * 0.5, corner_radius=w * 0.22, fill_color=c, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    croix = VGroup(Rectangle(width=w * 0.2, height=w * 0.07), Rectangle(width=w * 0.07, height=w * 0.2))
    croix.set_fill(WHITE, 1).set_stroke(width=0).move_to(corps.get_center() + LEFT * w * 0.25)
    boutons = VGroup(*[Circle(radius=w * 0.035, fill_color=col, fill_opacity=1, stroke_width=0)
                       .move_to(corps.get_center() + RIGHT * w * 0.25 + P(dx * w, dy * w))
                       for col, dx, dy in ((VERT_OK, 0, 0.07), (PIEGE, 0.07, 0), (C2, -0.07, 0), (JAUNE_TITRE, 0, -0.07))])
    return VGroup(corps, croix, boutons)


def trophee(h=1.4):
    """Une coupe de tournoi."""
    coupe = Polygon(P(-0.5, 0.5), P(0.5, 0.5), P(0.28, -0.1), P(-0.28, -0.1), fill_color=JAUNE_TITRE, fill_opacity=1,
                    stroke_width=0)
    anses = VGroup(*[Arc(radius=0.17, start_angle=PI / 2 * (1 if x < 0 else -1), angle=PI * (1 if x < 0 else 1),
                         arc_center=P(x, 0.3), stroke_color=JAUNE_TITRE, stroke_width=6) for x in (-0.5, 0.5)])
    pied = Rectangle(width=0.12, height=0.3, fill_color="#ca8a04", fill_opacity=1, stroke_width=0).move_to(P(0, -0.25))
    socle = RoundedRectangle(width=0.6, height=0.16, corner_radius=0.04, fill_color="#92400e", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.45))
    etoile = Star(n=5, outer_radius=0.12, inner_radius=0.05, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.25))
    return VGroup(anses, coupe, pied, socle, etoile).scale(h / 1.0)


def jeton(n, r=0.2):
    """Le jeton rond d'un facteur premier (une donnée de figure, déjà dite)."""
    c = COUL[str(n)]
    rond = Circle(radius=r, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=c, stroke_width=4)
    return VGroup(rond, T(str(n), int(r * 150), c, audit=False, gras=True).move_to(rond))


def jetons(n, k, r=0.16, buff=0.06):
    """k jetons du facteur n, côte à côte ; aucun : un petit tiret gris."""
    if k == 0:
        return Line(LEFT * r * 0.8, RIGHT * r * 0.8, color="#64748b", stroke_width=4)
    return VGroup(*[jeton(n, r) for _ in range(k)]).arrange(RIGHT, buff=buff)


def colorer(e):
    """Dans « 36 = 2 × 2 × 3 × 3 », chaque facteur premier prend sa couleur (après le =)."""
    vu = False
    for a in e.atomes:
        if a.original_text == "=":
            vu = True
        elif vu and a.original_text in COUL:
            a.set_color(COUL[a.original_text])
    return e


def boites(n, kmax, w=1.2, h=0.8, buff=0.18, r=0.14):
    """Les choix d'un facteur : une boîte par nombre de fois (0, 1, …, kmax), avec ses jetons."""
    g = VGroup()
    for k in range(kmax + 1):
        b = RoundedRectangle(width=w, height=h, corner_radius=0.1, stroke_color=COUL[str(n)], stroke_width=3,
                             fill_color=FOND_CARTE, fill_opacity=1)
        g.add(VGroup(b, jetons(n, k, r=r).move_to(b)))
    return g.arrange(RIGHT, buff=buff)


class Grille(VGroup):
    """La grille des choix : ligne i = i fois le facteur a, colonne j = j fois le facteur b.
    .cases[i][j] : la case (un rectangle) ; .centre(i, j)."""

    def __init__(self, a, ka, b, kb, w=1.3, h=0.85, r=0.13, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cases = []
        fond = VGroup()
        for i in range(ka + 1):
            rang = []
            for j in range(kb + 1):
                c = Rectangle(width=w, height=h, stroke_color="#94a3b8", stroke_width=2, fill_color=FOND_CARTE,
                              fill_opacity=1).move_to(P(j * w, -i * h))
                rang.append(c)
                fond.add(c)
            self.cases.append(rang)
        self.etiq_l = VGroup(*[jetons(a, i, r=r, buff=0.04).next_to(self.cases[i][0], LEFT, buff=0.15) for i in range(ka + 1)])
        self.etiq_c = VGroup(*[jetons(b, j, r=r, buff=0.04).next_to(self.cases[0][j], UP, buff=0.15) for j in range(kb + 1)])
        for m in self.etiq_c:
            if m.width > w - 0.1:
                m.scale_to_fit_width(w - 0.1)
        self.fond = fond
        self.add(fond, self.etiq_l, self.etiq_c)
        self.move_to(centre)

    def toutes(self):
        return [c for rang in self.cases for c in rang]


class PremierDefi4e(PaysageDiv):
    nom_voix = "4e-premier-defi"
    fichier_marques = "premier_defi_marques.json"
    ceinture = "verte"

    def _plan_eq(self, e, debut, fin, sauf=()):
        """Celui d'equation_commun, et un chiffre 0 à 4 attend aussi son mot en lettres
        (« zéro, un ou deux 2 » s'écrit « 0, 1 ou 2 fois le 2 »)."""
        voix, cur = self._texte_voix, debut
        plan = []
        for a in e.atomes:
            if any(a is x for x in sauf):
                continue
            t = a.original_text
            mots = [PAROLE.get(t, t)] + ([EN_LETTRES[t]] if t in EN_LETTRES and EN_LETTRES[t] != PAROLE.get(t, t) else [])
            motif = "(?:" + "|".join(re.escape(m) for m in mots) + ")"
            m = re.compile(r"(?<![\w,])" + motif + r"(?![\w])", re.I).search(voix, cur, fin)
            if m is None:
                plan.append((None, a))
            else:
                if m.group(0).lower() != t.lower() and t in EN_LETTRES:
                    a._pas_audit = True   # dit en lettres (« un ») : l'audit cherche le chiffre « 1 »
                plan.append((m.start(), a))
                cur = m.end()
        # Un atome muet part avec son voisin de droite (la ponctuation avec celui de gauche) ;
        # plusieurs muets de suite (« fois le ») restent ensemble jusqu'au prochain mot dit.
        lots, attente = [], []
        for pos, a in plan:
            if pos is not None:
                lots.append([pos, attente + [a]])
                attente = []
            elif a.original_text in ")],.:;?!»" and lots and not attente:
                lots[-1][1].append(a)
            else:
                attente.append(a)
        if attente and lots:
            lots[-1][1] += attente
        return lots

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Celui d'equation_commun, mais une ligne trop longue rétrécit AVANT d'être posée
        (« Combien a-t-il de diviseurs ? » dépassait le bord droit)."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref)
        if e.get_right()[0] > 6.3:
            gauche = max(e.get_left()[0], self.XL)
            e.scale_to_fit_width(6.3 - gauche)
            e.shift(RIGHT * (gauche - e.get_left()[0]))
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def rang(self, s, phrase, x, y, fs=40, maxw=None, avec=()):
        """Une ligne « 0, 1 ou 2 fois le 2 : 3 choix. », le facteur coloré, posée au mot."""
        e = self.lg(s, x, y, fs, maxw=maxw)
        a = e.atomes
        for i, t in enumerate(a):
            if t.original_text in COUL and i > 0 and a[i - 1].original_text == "le":
                t.set_color(COUL[t.original_text])
            if t.original_text == "choix" and i > 0:
                a[i - 1].set_color(JAUNE_TITRE)
                t.set_color(JAUNE_TITRE)
        self.dit(e, phrase, avec=avec)
        return e

    def allumer(self, cases, c=VERT_OK, rt=0.6):
        self.play(LaggedStart(*[cs.animate.set_fill("#14532d", 1).set_stroke(c, width=4) for cs in cases],
                              lag_ratio=0.12), run_time=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les nombres premiers", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        fig = VGroup(trophee(1.5), manette(1.9)).arrange(DOWN, buff=0.35).move_to(P(-4.4, 0.25))
        l1 = self.lg("Compter les diviseurs,", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Compter les diviseurs,", avec=[FadeIn(fig, shift=UP * 0.3)])
        l2 = self.lg("sans les écrire ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "sans les écrire ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les 36 joueurs d'Elsa ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = elsa().move_to(P(-5.85, 2.3))
        tas = VGroup(*[joueur().move_to(f) for f in en_vrac(36, -4.9, -1.2, -2.6, 0.9, graine=11)])
        self.dit(self.lg("Elsa organise des tournois", 3.2, 3.0, 40, CIEL), "Elsa organise des tournois",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("de jeux vidéo.", 3.2, 2.4, 38), "de jeux vidéo.")
        self.dit(self.lg("36 joueurs sont inscrits.", 3.2, 1.6, 38), "36 joueurs sont inscrits.",
                 avec=[LaggedStart(*[FadeIn(j, scale=0.4) for j in tas], lag_ratio=0.03)])
        self.dit(self.lg("Elle veut des équipes", 3.2, 0.85, 38), "Elle veut des équipes")
        # 6 équipes de 6 : 2 rangées de 3 équipes, chaque équipe en 2 rangées de 3 joueurs
        cibles, cadres = VGroup(), VGroup()
        teintes = [C2, C3, VERT_OK, JAUNE_TITRE, "#f472b6", C5]
        for k in range(6):
            cx, cy = -4.35 + (k % 3) * 1.45, -0.35 - (k // 3) * 1.45
            for i in range(6):
                cibles.add(joueur(c=teintes[k]).move_to(P(cx + (i % 3 - 1) * 0.34, cy + 0.2 - (i // 3) * 0.42)))
            cadres.add(RoundedRectangle(width=1.25, height=1.15, corner_radius=0.12, stroke_color=NEON,
                                        stroke_width=3).move_to(P(cx, cy)))
        self.dit(self.lg("de même taille.", 3.2, 0.25, 38), "de même taille.",
                 avec=[Transform(tas, cibles, run_time=1.0)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.1), run_time=0.5)
        q1 = self.lg("Combien de tailles d'équipe", 3.2, -0.65, 42, JAUNE_TITRE, maxw=5.6)
        self.dit(q1, "Combien de tailles d'équipe")
        q2 = self.lg("sont possibles ?", 3.2, -1.3, 44, JAUNE_TITRE)
        self.dit(q2, "sont possibles ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.dit(self.lg("C'est le nombre", 2.9, -2.2, 38, VERT_OK), "C'est le nombre")
        self.dit(self.lg("de diviseurs de 36.", 2.9, -2.8, 38, VERT_OK), "de diviseurs de 36.")
        self.attendre_voix(marge=0.8)

    # ── 02 : commençons petit, 12 ───────────────────────────────────────────
    def ecran_petit(self):
        self.ecran("02-petit")
        self.dit(self.lg("Commençons petit.", 0, 3.2, 44, JAUNE_TITRE), "Commençons petit.")
        e = colorer(F("12 = 2 × 2 × 3", 56)).move_to(P(0, 2.25))
        self.dire_eq(e, "12 égale 2 fois 2 fois 3.", echelle=1.2)
        self.dit(self.lg("Un diviseur de 12, c'est un choix :", 0, 1.25, 40, CIEL, maxw=12),
                 "Un diviseur de 12, c'est un choix :")
        b2 = boites(2, 2).move_to(P(3.45, 0.05))
        b3 = boites(3, 1).move_to(P(2.75, -1.2))
        self.rang("0, 1 ou 2 fois le 2", "zéro, un ou deux 2", -2.6, 0.05, 44,
                  avec=[LaggedStart(*[FadeIn(b, shift=LEFT * 0.2) for b in b2], lag_ratio=0.3)])
        self.rang("et 0 ou 1 fois le 3.", "et zéro ou un 3.", -2.6, -1.2, 44,
                  avec=[LaggedStart(*[FadeIn(b, shift=LEFT * 0.2) for b in b3], lag_ratio=0.3)])
        fin = F("3 choix × 2 choix : 6 diviseurs.", 46).move_to(P(0, -2.55))
        for i in (0, 1, 3, 4):
            fin.atomes[i].set_color(JAUNE_TITRE)
        self.dire_eq(fin, "3 choix fois 2 choix : 6 diviseurs.", echelle=1.15,
                     avec=[Indicate(b2, color=JAUNE_TITRE, scale_factor=1.05)])
        self.play(Indicate(b3, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.insister(fin, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : on vérifie, la grille des choix ────────────────────────────────
    def ecran_verif(self):
        self.ecran("03-verif")
        g = Grille(2, 2, 3, 1, w=1.6, h=0.95, r=0.15, centre=P(-2.6, -0.55))
        rappel = colorer(F("12 = 2 × 2 × 3", 40).sans_audit()).move_to(P(3.7, 1.75))
        e = F("Vérifions : 1, 2, 3, 4, 6, 12.", 50).move_to(P(0, 3.05))
        place = {"1": (0, 0), "2": (1, 0), "3": (0, 1), "4": (2, 0), "6": (1, 1), "12": (2, 1)}
        nombres = {}
        gestes = {0: lambda: [FadeIn(g), FadeIn(rappel)]}
        for k, a in enumerate(e.atomes):
            if a.original_text in place:
                i, j = place[a.original_text]
                n = T(a.original_text, 46, WHITE, audit=False).move_to(g.cases[i][j])
                nombres[a.original_text] = n
                gestes[k] = (lambda n=n, c=g.cases[i][j]: [FadeIn(n, scale=1.4), c.animate.set_stroke(VERT_OK, width=4)])
        self.poser_avec(e, "Vérifions : 1, 2, 3, 4, 6, 12.", gestes)
        six = self.lg("Il y en a bien 6.", 3.7, 0.45, 44, JAUNE_TITRE, maxw=5.4)
        self.dit(six, "Il y en a bien 6.", avec=[Circumscribe(g.fond, color=JAUNE_TITRE)])
        self.insister(six, 1.12, 0.2)
        self.dit(self.lg("On les a comptés", 3.7, -0.7, 40, maxw=5.4), "On les a comptés")
        sans = self.lg("sans les écrire.", 3.7, -1.35, 42, VERT_OK, maxw=5.4)
        self.dit(sans, "sans les écrire.")
        self.play(Create(self.cadre_ok(sans, 0.16)), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.3
        fig = VGroup(jeton(3, 0.42), jeton(3, 0.42), jeton(5, 0.42)).arrange(RIGHT, buff=0.3).move_to(P(-3.4, 0.2))
        cad = Text("45", font_size=44, color=WHITE)
        cad.sans_synchro = True
        cad._pas_audit = True
        cad.next_to(fig, UP, buff=0.4)

        def avant(sc):
            sc.eq_dans_q(0, "45 = 3 × 3 × 5.", "45 égale 3 fois 3 fois 5.", lettres="")
            sc.eq_dans_q(0, "Combien a-t-il de diviseurs ?", "Combien a-t-il de diviseurs ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(j, scale=0.5) for j in fig], lag_ratio=0.2), FadeIn(cad), run_time=0.5)

        def apres(sc):
            sc.reponse(("Réponse C : 6.", "Réponse C : 6."),
                       ("0, 1 ou 2 fois le 3 : 3 choix.", "Zéro, un ou deux 3 : 3 choix."),
                       ("0 ou 1 fois le 5 : 2 choix.", "Zéro ou un 5 : 2 choix."),
                       ("3 × 2 = 6 : 1, 3, 5, 9, 15, 45.", "3 fois 2 égale 6 : 1, 3, 5, 9, 15, 45."))

        self.question_pause("03q-question", "03r-reponse", ["45 = 3 × 3 × 5.", "Combien a-t-il de diviseurs ?"],
                            [E("3", 40, lettres=""), E("5", 40, lettres=""), E("6", 40, lettres="")], 2,
                            ["Réponse C : 6.", "0, 1 ou 2 fois le 3 : 3 choix.", "0 ou 1 fois le 5 : 2 choix.",
                             "3 × 2 = 6 : 1, 3, 5, 9, 15, 45."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : retour à Elsa, 36 ──────────────────────────────────────────────
    def ecran_elsa(self):
        self.ecran("04-elsa")
        p = elsa(0.6).move_to(P(-5.9, 2.35))
        self.dit(self.lg("Revenons à Elsa.", 0, 3.2, 44, CIEL), "Revenons à Elsa.", avec=[FadeIn(p, shift=UP * 0.3)])
        e = colorer(F("36 = 2 × 2 × 3 × 3", 54)).move_to(P(0.3, 2.25))
        self.dire_eq(e, "36 égale 2 fois 2 fois 3 fois 3.", echelle=1.2)
        g = Grille(2, 2, 3, 2, w=0.85, h=0.7, r=0.12, centre=P(4.35, -0.35))
        self.rang("0, 1 ou 2 fois le 2 : 3 choix.", "Zéro, un ou deux 2 : 3 choix.", -2.0, 0.95, 40,
                  avec=[FadeIn(g.fond), FadeIn(g.etiq_l, shift=RIGHT * 0.2)])
        self.rang("0, 1 ou 2 fois le 3 : 3 choix.", "Zéro, un ou deux 3 : 3 choix.", -2.0, 0.15, 40,
                  avec=[FadeIn(g.etiq_c, shift=DOWN * 0.2)])
        r = F("3 × 3 = 9", 64).move_to(P(-2.0, -1.0))
        r.atomes[-1].set_color(VERT_OK)
        self.dire_eq(r, "3 fois 3 égale 9.", echelle=1.2)
        self.allumer(g.toutes())
        fin = self.lg("Elsa a 9 tailles d'équipe possibles.", -0.4, -2.6, 42, JAUNE_TITRE, maxw=11)
        self.dit(fin, "Elsa a 9 tailles d'équipe possibles.")
        self.insister(fin, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : compter les facteurs au lieu des choix.", 0, 3.15, 40, PIEGE, maxw=12.4),
                 "Le piège : compter les facteurs au lieu des choix.")
        e = colorer(F("36 = 2 × 2 × 3 × 3", 46).sans_audit()).move_to(P(-3.4, 1.85))
        self.play(FadeIn(e), run_time=0.3)
        anneaux = VGroup(*[Circle(radius=0.36, color=PIEGE, stroke_width=4).move_to(a)
                           for a in e.atomes if a.original_text in ("2", "3")])
        quatre = self.lg("36 a 4 facteurs premiers,", 3.7, 2.15, 38, PIEGE, maxw=5.0)
        self.dit(quatre, "36 a quatre facteurs premiers,",
                 avec=[LaggedStart(*[Create(a) for a in anneaux], lag_ratio=0.2)])
        neuf = self.lg("mais 9 diviseurs.", 3.7, 1.45, 42, VERT_OK, maxw=5.0)
        self.dit(neuf, "mais 9 diviseurs.")
        self.insister(neuf, 1.12, 0.2)
        b2 = boites(2, 2, w=1.15, h=0.8).move_to(P(-3.0, -1.1))
        b3 = boites(3, 2, w=1.15, h=0.8).move_to(P(3.0, -1.1))
        nums = VGroup()
        for bx in (b2, b3):
            for k, b in enumerate(bx):
                nums.add(T(str(k), 30, "#94a3b8", audit=False).next_to(b, DOWN, buff=0.12))
        self.dit(self.lg("On ajoute 1 à chaque compte :", 0, 0.3, 40, CIEL, maxw=12), "On ajoute 1 à chaque compte :",
                 avec=[FadeIn(b2), FadeIn(b3), FadeIn(nums)])
        self.dit(self.lg("le choix « zéro fois » compte aussi.", 0, -2.75, 40, VERT_OK, maxw=12),
                 "le choix « zéro fois » compte aussi.",
                 avec=[b2[0][0].animate.set_stroke(VERT_OK, width=6).set_fill("#14532d", 1),
                       b3[0][0].animate.set_stroke(VERT_OK, width=6).set_fill("#14532d", 1)])
        self.play(Indicate(VGroup(b2[0], b3[0]), color=VERT_OK, scale_factor=1.12), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.3
        fig = VGroup()
        for k, n in enumerate((2, 3, 5)):
            j = jeton(n, 0.36)
            oui = RoundedRectangle(width=0.8, height=0.62, corner_radius=0.08, stroke_color=COUL[str(n)], stroke_width=3)
            dedans = jeton(n, 0.2).move_to(oui)
            non = oui.copy()
            tiret = Line(LEFT * 0.14, RIGHT * 0.14, color="#64748b", stroke_width=4).move_to(non)
            fig.add(VGroup(j, VGroup(oui, dedans), VGroup(non, tiret)).arrange(RIGHT, buff=0.35).move_to(P(-3.4, 1.3 - 1.1 * k)))

        def avant(sc):
            sc.eq_dans_q(0, "Un nombre s'écrit 2 × 3 × 5.", "Un nombre s'écrit 2 fois 3 fois 5.", lettres="")
            sc.eq_dans_q(0, "Combien a-t-il de diviseurs ?", "Combien a-t-il de diviseurs ?", lettres="")
            sc.play(LaggedStart(*[FadeIn(f, shift=RIGHT * 0.2) for f in fig], lag_ratio=0.2), run_time=0.5)

        def apres(sc):
            sc.reponse(("Réponse C : 8.", "Réponse C : 8."),
                       ("Pour chaque facteur, 2 choix :", "Pour chaque facteur, deux choix :"),
                       ("le prendre ou non. 2 × 2 × 2 = 8.", "le prendre ou non. 2 fois 2 fois 2 égale 8."))

        self.question_pause("05q-question", "05r-reponse", ["Un nombre s'écrit 2 × 3 × 5.", "Combien a-t-il de diviseurs ?"],
                            [E("3", 40, lettres=""), E("6", 40, lettres=""), E("8", 40, lettres="")], 2,
                            ["Réponse C : 8.", "Pour chaque facteur, 2 choix :", "le prendre ou non. 2 × 2 × 2 = 8."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au("À toi", Write(tit), rt=0.5)
        p = elsa(0.62).move_to(P(-5.75, 0.6))
        tas = VGroup(*[joueur(0.06, c=[C2, C3, VERT_OK, JAUNE_TITRE][k % 4]).move_to(f)
                       for k, f in enumerate(en_vrac(72, -4.85, -0.7, -1.5, 2.0, r=0.085, graine=21))])
        self.dit(self.lg("Pour le grand tournoi,", 3.3, 1.95, 38), "Pour le grand tournoi,",
                 avec=[FadeIn(p), FadeIn(trophee(0.8).move_to(P(-5.75, -1.85)))])
        self.dit(self.lg("72 joueurs.", 3.3, 1.35, 42), "72 joueurs.",
                 avec=[LaggedStart(*[FadeIn(j, scale=0.4) for j in tas], lag_ratio=0.015)])
        e = colorer(F("72 = 2 × 2 × 2 × 3 × 3", 44))
        e.scale_to_fit_width(min(e.width, 5.6)).move_to(P(3.3, 0.5))
        self.dire_eq(e, "72 égale 2 fois 2 fois 2 fois 3 fois 3.", echelle=1.15)
        q1 = self.lg("Combien de tailles d'équipe", 3.3, -0.45, 40, JAUNE_TITRE, maxw=5.6)
        self.dit(q1, "Combien de tailles d'équipe")
        q2 = self.lg("possibles ?", 3.3, -1.1, 46, JAUNE_TITRE, maxw=5.6)
        self.dit(q2, "possibles ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.3, -2.45))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        g = Grille(2, 3, 3, 2, w=0.72, h=0.5, r=0.11, centre=P(4.45, 0.55))
        self.rang("0, 1, 2 ou 3 fois le 2 : 4 choix.", "Zéro, un, deux ou trois 2 : 4 choix.", -2.25, 2.2, 38,
                  maxw=7.4, avec=[FadeIn(g.fond), FadeIn(g.etiq_l, shift=RIGHT * 0.2)])
        self.rang("0, 1 ou 2 fois le 3 : 3 choix.", "Zéro, un ou deux 3 : 3 choix.", -2.25, 1.4, 38,
                  maxw=7.4, avec=[FadeIn(g.etiq_c, shift=DOWN * 0.2)])
        r = F("4 × 3 = 12", 60).move_to(P(-2.25, 0.2))
        r.atomes[-1].set_color(VERT_OK)
        self.dire_eq(r, "4 fois 3 égale 12.", echelle=1.2)
        self.allumer(g.toutes(), rt=0.8)
        self.dit(self.lg("72 a 12 diviseurs :", 0, -1.3, 44, CIEL, maxw=10), "72 a 12 diviseurs :")
        fin = self.lg("12 tailles d'équipe.", 0, -2.35, 50, VERT_OK, maxw=10)
        self.dit(fin, "12 tailles d'équipe.")
        self.play(Create(self.cadre_ok(fin, 0.16)), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        """Les lignes pleine largeur (fs = 40, comme le pilote), la figure en une rangée dessous."""
        self.ecran("07-finale", 0.5)
        self.XL = -6.0
        lignes = self.finale_colonne([["On décompose", "en facteurs premiers."],
                                      ["Pour chaque facteur,", "on compte les choix :",
                                       "un de plus que le nombre", "de fois où il apparaît."],
                                      ["Puis on multiplie", "les choix."]], fs=40)
        self.XL = type(self).XL
        ref = Text(lignes[0][1][0].text, font_size=40).height   # finale_colonne a réduit : on revient à fs = 40
        if ref > lignes[0][1][0].height * 1.001:
            lignes.scale(ref / lignes[0][1][0].height, about_edge=UL)
        g = Grille(2, 2, 3, 2, w=0.6, h=0.42, r=0.09)
        for c in g.toutes():
            c.set_fill("#14532d", 1).set_stroke(VERT_OK, width=3)
        fig = VGroup(colorer(F("36 = 2 × 2 × 3 × 3", 36).sans_audit()), g, F("3 × 3 = 9", 42).sans_audit())
        fig.arrange(DOWN, buff=0.4)
        fig.scale_to_fit_width(3.7).move_to(P(4.5, 0.3))
        print(f"FINALE droite_lignes={lignes.get_right()[0]:.2f} gauche_fig={fig.get_left()[0]:.2f}", flush=True)
        print(f"FINALE echelle={lignes[0][1][0].height:.3f} bas_fig={fig.get_bottom()[1]:.2f}", flush=True)
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_petit()
        self.ecran_verif()
        self.ecran_question1()
        self.ecran_elsa()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
