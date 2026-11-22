# espace_plan_equation.py
# EleveAI — Maths Tle spé — paysage « Équation cartésienne d'un plan » (16:9),
# ceinture VERTE. Micro du coach : espace_plan_equation (notion geometrie_espace).
# Épisode 4 sur 12. Centre : sciences (liste fermée lib/videos/centres-interet.ts,
# tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, une seule équation, trois inconnues, jamais une droite ;
#   · 01-situation  : Jean-Bernard, charpentier ; un pan de toiture en une ligne ;
#   · 02-idee       : la forme a x + b y + c z + d = 0, et A(0 ; 0 ; 1) dans P ;
#   · 03-theoreme   : si et seulement si — « pas presque zéro : zéro » ;
#   · 04/04b        : question-pause n° 1 (lequel des trois points est dans P → C) ;
#   · 05-appliquer  : coefficients 3 ; −1 ; 2 et un point connu → on trouve d ;
#   · 06-piege      : dans l'espace, UNE équation donne un PLAN, jamais une droite ;
#   · 07/07b        : question-pause n° 2 (y = 1 dans l'espace → un plan, réponse B) ;
#   · 08-rediger    : les trois lignes de la copie ;
#   · 09/09b        : le défi — A(2 ; 0 ; 0) et B(0 ; −1 ; 1) dans 2x − 3y + z − 4 = 0 ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py (dont `eq_plan` et `eq_zero`,
#   écrits pour cet épisode : ils sortent de l'audit le SEUL « 0 » du second membre, que
#   la voix dit en lettres, sans sortir les coefficients avec lui). Les figures sont dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'outil se fait LÀ-BAS.
# ⛔ Les pièges de la série : manim/REPRISE-espace-terminale.md — en particulier la
#   section « Ce que l'épisode 3 a appris ». Et les 43 de manim/REPRISE-entiers-cm1-6e.md.
# ⚠️ Bonne réponse : 04 → C, 07 → B (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# Voix : manim/voix/terminale-espace-plan-equation.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql \
#   --disable_caching manim/scripts/terminale/espace_plan_equation.py \
#   EspacePlanEquationTerminale --media_dir manim/scripts/terminale/media-espace-plan \
#   --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

from espace3d import (C_DROITE, C_FANTOME, C_NORMALE, C_PIEGE, C_PLAN,  # noqa: E402
                      C_REGARD, C_VECTEUR, C_VECTEUR2)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import P, EcransEspace, equation_plan, pastille_pause  # noqa: E402

PEAU, CHEVEUX = "#c68642", "#4a3728"
BOIS = "#b45309"

# ── les plans dits par la voix, revérifiés ICI, à l'exécution ──────────────
P02, A02 = (2, 1, -1, 1), (0, 0, 1)          # 02 : 2x + y − z + 1 = 0
P04 = (1, 1, -1, -1)                          # 04 : x + y − z − 1 = 0
C04 = ((1, 2, 3), (2, 0, 0), (1, 1, 1))       # les trois propositions, dans l'ordre A B C
P05, B05 = (3, -1, 2, -2), (1, 1, 0)          # 05 : coefficients 3 ; −1 ; 2, par B
P09, A09, B09 = (2, -3, 1, -4), (2, 0, 0), (0, -1, 1)   # 09 : le défi


def vaut(plan, m):
    """a x + b y + c z + d, évalué au point m : ZÉRO si et seulement si m est dans le plan."""
    return plan[0] * m[0] + plan[1] * m[1] + plan[2] * m[2] + plan[3]


assert vaut(P02, A02) == 0                                   # 02 : A est dans P
assert [vaut(P04, m) for m in C04] == [-1, 1, 0]             # 04 : seul C annule
assert vaut(P05, B05) == 0                                   # 05 : d = −2 vérifié sur B
assert P05[3] == -(P05[0] * B05[0] + P05[1] * B05[1] + P05[2] * B05[2])
assert vaut(P09, A09) == 0 and vaut(P09, B09) == 0           # 09b : les DEUX sont dans P
# ⭐ 09b, le seul vrai danger du calcul : −3 × (−1) = +3, et non −3.
assert P09[1] * B09[1] == 3
# 06 et 07 : une équation à trois inconnues est un plan, même quand deux coefficients
# sont nuls — c'est exactement ce que l'épisode veut faire comprendre.
assert equation_plan(0, 0, 1, 0) == "z = 0"
assert equation_plan(0, 1, 0, -1) == "y − 1 = 0"


def jean_bernard(s=1.0):
    """Le charpentier : casquette rouge à visière, chemise à carreaux, équerre.

    ⛔⛔ TROIS DÉFAUTS VUS SEULEMENT AU GROS PLAN, sur la première version :
    1. la visière partait de x = −0,10, c'est-à-dire DANS le visage (la tête est un
       disque de rayon 0,32 centré en 0) : elle barrait la figure comme un bandeau.
       Elle part maintenant du BORD de la tête et file vers l'extérieur ;
    2. la barbe, en #8a6a4a sur une peau en #c68642, se lisait comme un second menton —
       c'est le piège n° 17 de la série des entiers (un accessoire de la couleur de ce
       qu'il touche disparaît dedans). Elle est SUPPRIMÉE : les deux autres personnages
       de la série n'ont pas de traits de visage non plus ;
    3. les carreaux (3 lignes × 2 colonnes, trait 3, en clair) faisaient une FENÊTRE.
       Deux traits fins et sourds suffisent à dire « chemise à carreaux »."""
    tete = Circle(radius=0.32, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    calotte = Arc(radius=0.36, start_angle=0.12, angle=PI - 0.24, stroke_color="#b91c1c",
                  stroke_width=15)
    calotte.move_to(tete.get_top() + DOWN * 0.05)
    # ⚠️ La visière commence à x = −0,31 : le bord gauche de la tête, pas son milieu.
    visiere = Polygon(P(-0.31, 1.30), P(-0.78, 1.23), P(-0.77, 1.14), P(-0.31, 1.18),
                      fill_color="#b91c1c", fill_opacity=1, stroke_width=0)
    corps = RoundedRectangle(width=1.05, height=1.24, corner_radius=0.3, fill_color="#0f766e",
                             fill_opacity=1, stroke_width=0).move_to(P(0, 0.08))
    carreaux = VGroup(Line(P(-0.5, 0.26), P(0.5, 0.26), stroke_width=2.5, color="#2dd4bf"),
                      Line(P(-0.5, -0.16), P(0.5, -0.16), stroke_width=2.5, color="#2dd4bf"),
                      Line(P(0.02, 0.62), P(0.02, -0.48), stroke_width=2.5, color="#2dd4bf"))
    equerre = VGroup(Line(P(0.52, -0.42), P(0.52, 0.32), stroke_width=7, color=GREY_B),
                     Line(P(0.52, -0.42), P(1.12, -0.42), stroke_width=7, color=GREY_B))
    return VGroup(corps, carreaux, equerre, tete, calotte, visiere).scale(s)


def pan_toiture(s=1.0):
    """Un pan de toiture vu en volume : deux versants et une poutre faîtière."""
    g = VGroup(
        Polygon(P(-1.0, -0.35), P(0.0, 0.45), P(0.95, 0.20), P(-0.05, -0.60),
                fill_color=BOIS, fill_opacity=0.85, stroke_color="#fde68a", stroke_width=3),
        Polygon(P(0.0, 0.45), P(1.0, -0.35), P(1.95, -0.60), P(0.95, 0.20),
                fill_color="#92400e", fill_opacity=0.85, stroke_color="#fde68a", stroke_width=3),
        Line(P(0.0, 0.45), P(0.95, 0.20), stroke_width=5, color="#fde68a"))
    return g.scale(s)


class EspacePlanEquationBase(EcransEspace):
    fichier_marques = "espace_plan_equation_marques.json"
    nom_voix = "terminale-espace-plan-equation"

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Équation cartésienne d'un plan", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Équation cartésienne")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 40
        promesses = (("une seule équation", C_REGARD, "Une seule équation"),
                     ("trois inconnues", C_VECTEUR2, "trois inconnues"),
                     ("jamais une droite", C_PIEGE, "jamais une droite"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        lignes.move_to(P(0, 0.85))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⚠️ centré et à 34 : 8,0 de large, donc x ∈ [−4,0 ; 4,0], à l'écart de Ti-Margo
        # dont la boîte commence à x = 4,87 quand il est à scale 0,8.
        fin = self.t("mais un plan tout entier", 34, VERT_OK).move_to(P(0, -1.6))
        self.au_mot("mais un plan tout entier")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : Jean-Bernard et le pan de toiture ─────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        jb = jean_bernard(0.95).move_to(P(-5.6, 0.85))
        self.au_mot("Voici Jean-Bernard")
        nom = self.t("Jean-Bernard", 32, JAUNE_TITRE).next_to(jb, DOWN, buff=0.22)
        # ⛔ MESURÉ AU DRY RUN : « Jean-Bernard » centré sous un personnage posé à
        # x = −5,6 part à −7,1, au-delà de la marge de 3 % (−6,68) — c'est le défaut
        # n° 7 de l'épisode 1, et le garde-fou ne servait à rien posé APRÈS le play.
        if nom.get_left()[0] < -6.5:
            nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
        self.play(FadeIn(jb, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("charpentier")
        metier = self.t("charpentier", 24, GREY_A).next_to(nom, DOWN, buff=0.12)
        if metier.get_left()[0] < -6.5:
            metier.shift(RIGHT * (-6.5 - metier.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        self.au_mot("Quand il pose un pan de toiture")
        toit = pan_toiture(1.05).move_to(P(-2.9, 0.75))
        self.play(FadeIn(toit, shift=UP * 0.15), run_time=0.7)
        self.au_mot("sur une surface parfaitement plate")
        plat = self.col(VGroup(self.t("une surface", 30, C_REGARD),
                               self.t("parfaitement plate", 30, C_REGARD))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.45)
        self.play(FadeIn(plat, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("ni horizontale ni verticale")
        ni = self.col(self.t("ni horizontale ni verticale", 26, GREY_A), 1.55)
        self.play(FadeIn(ni, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("des milliers de points")
        mille = self.col(VGroup(self.croix(r=0.13), self.t("des milliers de points", 28, C_PIEGE))
                         .arrange(RIGHT, buff=0.22), 0.65)
        self.play(FadeIn(mille, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("donne une équation")
        une = self.col(VGroup(self.coche(VERT_OK, 0.15), self.t("une équation", 32, VERT_OK))
                       .arrange(RIGHT, buff=0.22), -0.15)
        self.play(FadeIn(une, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Une seule ligne")
        ligne = self.col(VGroup(self.t("une seule ligne,", 28, WHITE),
                                self.t("et le plan entier est décrit", 28, WHITE))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.35)
        self.play(FadeIn(ligne[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("et le plan entier est décrit")
        self.play(FadeIn(ligne[1], shift=RIGHT * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : la forme d'une équation de plan ───────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Tout plan de l'espace")
        titre = self.t("Une équation, un plan", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)

        # ⭐ La figure à GAUCHE : le plan P et le point A. Ici le dessin ne donne aucune
        # réponse — la voix fait le calcul, et le plan est la donnée de l'écran.
        r, ax = self.repere(o=(-4.9, -1.9), u=0.55, portee=4)
        self.play(Create(ax), run_time=0.4)

        self.au_mot("a une équation de la forme")
        forme = self.col(self.eq_zero("a x + b y + c z + d", 34, C_REGARD), 2.50)
        self.play(FadeIn(forme, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("où a, b et c ne sont pas tous nuls")
        nuls = self.col(self.t("a, b, c pas tous nuls", 26, GREY_A), 1.90)
        self.play(FadeIn(nuls, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("toute équation de cette forme")
        recip = self.col(VGroup(self.t("et réciproquement :", 26, GREY_A),
                                self.t("toute équation de cette forme", 26, GREY_A),
                                self.t("décrit un plan", 26, GREY_A))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 1.05)
        self.play(FadeIn(recip, shift=RIGHT * 0.1), run_time=0.5)

        self.au_mot("Prenons le plan P")
        plan = r.plan(P02[:3], d=P02[3], centre=A02, demi=1.8, couleur=C_PLAN, op=0.24)
        self.play(FadeIn(plan[0]), run_time=0.7)
        self.au_fin("2 x plus y moins z plus 1 égale zéro")
        eqP = self.col(VGroup(self.t("P :", 32, C_PLAN), self.eq_plan(*P02, fs=32, color=C_PLAN))
                       .arrange(RIGHT, buff=0.2), 0.05)
        self.play(FadeIn(eqP, scale=1.1), run_time=0.5)

        self.au_mot("Le point A de coordonnées")
        pa = self.sans_audit(r.point(*A02, "A", couleur=C_REGARD, decal=UL))
        self.play(FadeIn(pa, scale=1.3), run_time=0.45)
        self.au_fin("0, 0, 1")
        lA = self.ligne(self.t("A", 32, C_REGARD), self.trip(A02, 32), y=-0.70)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("2 fois 0, plus 0, moins 1, plus 1")
        calc = self.col(self.eq_zero("2 × 0 + 0 − 1 + 1", 30, WHITE), -1.40)
        self.play(FadeIn(calc.membre, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Cela fait zéro")
        self.play(FadeIn(calc.zero, scale=1.3), run_time=0.4)
        self.au_mot("Donc oui, A est dans le plan P")
        dedans = self.col(self.t("A est dans P", 32, VERT_OK), -2.15)
        self.play(FadeIn(dedans, scale=1.12), Flash(pa[0], color=VERT_OK, line_length=0.22),
                  run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 03 : si et seulement si ────────────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("La règle est sans nuance")
        titre = self.t("Si et seulement si", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        fs = 32
        # ⭐ Une seule phrase, donc un seul endroit : « un point appartient au plan si et
        # seulement si ses coordonnées annulent l'équation » reste à GAUCHE, d'un bloc.
        self.au_mot("un point appartient au plan")
        regle = VGroup(self.t("un point appartient au plan", fs, WHITE),
                       self.t("si et seulement si", fs, C_REGARD),
                       self.t("ses coordonnées annulent", fs, WHITE),
                       self.t("l'équation", fs, WHITE))
        regle.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.gauche(regle, 1.35, xmax=0.4)
        self.play(FadeIn(regle[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("si et seulement si")
        self.play(FadeIn(regle[1], shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("si ses coordonnées annulent l'équation")
        self.play(FadeIn(regle[2:], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Pas presque zéro")
        presque = self.gauche(self.t("pas presque zéro :  zéro", 36, C_PIEGE), -1.25, xmax=0.4)
        cad = SurroundingRectangle(presque, color=C_PIEGE, buff=0.16, stroke_width=3)
        self.play(FadeIn(presque, shift=UP * 0.1), Create(cad), run_time=0.7)

        self.au_mot("Et si on connaît les coefficients")
        b1 = self.col(VGroup(self.t("si on connaît", 30, GREY_A),
                             self.t("a, b, c", 32, C_VECTEUR2))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 1.95)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("a, b, c et un point du plan")
        b2 = self.col(self.t("et un point du plan", 30, WHITE), 0.95)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("on trouve le terme constant d")
        b3 = self.col(VGroup(self.t("on trouve", 30, WHITE),
                             self.t("le terme constant d", 30, VERT_OK),
                             self.t("en remplaçant", 30, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -0.35)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 (bonne réponse : C) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ On dessine le PLAN (la donnée), jamais les trois points : les poser
        # montrerait lequel est dessus.
        intro = self.gauche(self.t("Le plan P a pour équation", 30, WHITE), 2.45, xmax=0.4)
        eqP = self.gauche(VGroup(self.t("P :", 34, C_PLAN),
                                 self.eq_plan(*P04, fs=34, color=C_PLAN)).arrange(RIGHT, buff=0.2),
                          1.70, xmax=0.4)
        r, ax = self.repere(o=(-5.0, -2.6), u=0.5, portee=4)
        plan = r.plan(P04[:3], d=P04[3], centre=(1, 1, 1), demi=1.7, couleur=C_PLAN, op=0.22)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Lequel de ces trois", "points est dans P ?"],
            [self.trip(C04[0], 32), self.trip(C04[1], 32), self.trip(C04[2], 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Le plan P a pour équation")
        self.play(FadeIn(intro, shift=RIGHT * 0.1), Create(ax), run_time=0.5)
        self.au_fin("x plus y moins z moins 1 égale zéro")
        self.play(FadeIn(eqP, shift=RIGHT * 0.1), FadeIn(plan[0]), run_time=0.6)
        self.au_mot("Lequel de ces trois points")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        self.mem_q1 = (r, ax, plan, cartes, pause, rebours)

    def ecran_reponse1(self):
        r, ax, plan, cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        fs = 28
        # ⛔⛔ VU AU GROS PLAN : posées sous l'équation, les trois lignes de calcul
        # TRAVERSAIENT le repère et le plan — c'est le défaut n° 6 de l'épisode 1, que
        # la planche ne montre pas (elle prend la dernière image, où tout se recouvre).
        # ⭐ Ici la figure a fini son travail : elle a montré ce qu'est P sur l'écran de
        # question. L'écran de réponse est algébrique, on lui rend la place.
        self.play(FadeOut(ax), FadeOut(plan), run_time=0.3)
        # ⛔ xmax = 1,6 : rien n'entre dans la colonne des cartes, qui commence à 2,2.
        self.au_fin("1 plus 1 moins 1 moins 1 fait zéro")
        l1 = self.gauche(VGroup(self.trip(C04[2], fs, VERT_OK), self.t(":", fs, GREY_A),
                                self.eq_zero("1 + 1 − 1 − 1", fs, VERT_OK))
                         .arrange(RIGHT, buff=0.3), 0.70, xmax=1.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("1 plus 2 moins 3 moins 1 fait moins 1")
        l2 = self.gauche(VGroup(self.trip(C04[0], fs, C_PIEGE), self.t(":", fs, GREY_A),
                                self.t("1 + 2 − 3 − 1 = −1", fs, C_PIEGE))
                         .arrange(RIGHT, buff=0.3), -0.05, xmax=1.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("2 plus 0 moins 0 moins 1 fait 1")
        l3 = self.gauche(VGroup(self.trip(C04[1], fs, C_PIEGE), self.t(":", fs, GREY_A),
                                self.t("2 + 0 − 0 − 1 = 1", fs, C_PIEGE))
                         .arrange(RIGHT, buff=0.3), -0.80, xmax=1.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Un résultat proche de zéro")
        chute = self.gauche(self.t("un résultat proche de zéro reste un refus", 30, C_REGARD),
                            -1.75, xmax=1.6)
        self.play(FadeIn(chute, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 05 : trouver le terme constant ─────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons")
        titre = self.t("Trouver l'équation", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-5.0, -2.2), u=0.52, portee=4)
        self.play(Create(ax), run_time=0.4)
        fs = 30
        # ⭐ La DONNÉE à gauche, le CALCUL à droite : une phrase ne traverse jamais les
        # deux colonnes (piège n° 28 des entiers).
        self.au_fin("sont 3, moins 1, 2")
        don1 = self.gauche(VGroup(self.t("les coefficients", fs, WHITE),
                                  self.trip(P05[:3], fs + 2, C_VECTEUR2)).arrange(RIGHT, buff=0.25),
                           1.35, xmax=0.4)
        self.play(FadeIn(don1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("1, 1, 0")
        pb = self.sans_audit(r.point(*B05, "B", couleur=C_REGARD, decal=DR))
        don2 = self.gauche(VGroup(self.t("passe par", fs, WHITE), self.t("B", fs + 2, C_REGARD),
                                  self.trip(B05, fs + 2, WHITE)).arrange(RIGHT, buff=0.25),
                           0.60, xmax=0.4)
        self.play(FadeIn(don2, shift=RIGHT * 0.12), FadeIn(pb, scale=1.3), run_time=0.55)

        self.au_fin("On écrit 3 x moins y plus 2 z plus d égale zéro")
        e1 = self.col(self.eq_plan(*P05[:3], d=None, fs=32, color=WHITE), 2.45)
        self.play(FadeIn(e1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("3 fois 1, moins 1, plus 2 fois 0, plus d")
        e2 = self.col(self.eq_zero("3 × 1 − 1 + 2 × 0 + d", 30, WHITE), 1.60)
        self.play(FadeIn(e2, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("Cela donne 2 plus d égale zéro")
        e3 = self.col(self.eq_zero("2 + d", 32, WHITE), 0.80)
        self.play(FadeIn(e3, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("donc d vaut moins 2")
        e4 = self.col(self.t(f"donc d = {self.nombre(P05[3])}", 34, VERT_OK), 0.10)
        self.play(FadeIn(e4, scale=1.12), run_time=0.5)
        self.au_fin("3 x moins y plus 2 z moins 2 égale zéro")
        # ⛔ MESURÉ AU DRY RUN : col() borne le TEXTE à x = 6,6, et le cadre qui
        # l'entoure ajoute son buff par-dessus — 6,74, au-delà de la marge (6,68).
        # On pose donc le GROUPE texte + cadre, jamais le texte seul.
        e5 = self.eq_plan(*P05, fs=32, color=VERT_OK)
        cad = SurroundingRectangle(e5, color=VERT_OK, buff=0.14, stroke_width=3)
        self.col(VGroup(e5, cad), -0.80)
        plan = r.plan(P05[:3], d=P05[3], centre=B05, demi=1.6, couleur=C_PLAN, op=0.22)
        self.play(FadeIn(e5, scale=1.1), Create(cad), FadeIn(plan[0]), run_time=0.8)
        self.au_fin("3 moins 1 plus 0 moins 2 fait zéro")
        verif = self.col(VGroup(self.t("avec B :", 26, GREY_A),
                                self.eq_zero("3 − 1 + 0 − 2", 26, WHITE))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.85)
        self.play(FadeIn(verif, shift=RIGHT * 0.1), run_time=0.55)
        self.au_mot("Parfait")
        ok = self.col(VGroup(self.coche(VERT_OK, 0.16), self.t("parfait", 30, VERT_OK))
                      .arrange(RIGHT, buff=0.2), -2.75)
        self.play(FadeIn(ok, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — une équation donne un PLAN ─────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Une équation, c'est un PLAN", 44, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.8)

        fs = 26
        self.au_fin("à deux inconnues comme y égale 2 x plus 1")
        d1 = self.col(VGroup(self.t("dans le plan,", fs, GREY_A),
                             self.t("y = 2x + 1 donne une droite", fs, GREY_A))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.50)
        self.play(FadeIn(d1, shift=RIGHT * 0.1), run_time=0.55)
        self.au_mot("une équation à trois inconnues")
        d2 = self.col(VGroup(self.t("dans l'espace,", fs, C_REGARD),
                             self.t("trois inconnues donnent un plan", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 1.60)
        self.play(FadeIn(d2, shift=RIGHT * 0.1), run_time=0.55)
        self.au_mot("jamais une droite")
        jam = self.col(self.t("jamais une droite", 32, C_PIEGE), 0.85)
        self.play(FadeIn(jam, scale=1.12), run_time=0.5)

        r, ax = self.repere(o=(-5.4, -1.5), u=0.52, portee=4)
        self.play(Create(ax), run_time=0.4)
        self.au_mot("L'équation z égale zéro")
        sol = r.plan((0, 0, 1), d=0, centre=(2, 2, 0), demi=2.0, couleur=C_PLAN, op=0.26)
        # ⚠️ Posée au coin le plus à DROITE du plan, l'étiquette s'appuyait sur son bord.
        # Décalée en diagonale, elle s'en détache sans s'approcher de l'axe des x.
        z0 = self.sans_audit(self.t("z = 0", 28, C_PLAN)
                             .move_to(r.pt(*max(sol.coins, key=lambda k: float(r.pt(*k)[0])))
                                      + UR * 0.38))
        self.play(FadeIn(sol[0]), FadeIn(z0), run_time=0.7)
        self.au_fin("le sol tout entier")
        lsol = self.gauche(VGroup(self.t("le sol tout entier,", fs, WHITE),
                                  self.t("le plan (x O y)", fs, C_PLAN))
                           .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.45, xmax=0.4)
        self.play(FadeIn(lsol, shift=RIGHT * 0.1), run_time=0.55)
        self.au_mot("L'équation x égale 2 décrit un plan")
        mur = r.plan((1, 0, 0), d=-2, centre=(2, 2, 1.4), demi=1.5, couleur=C_VECTEUR2, op=0.24)
        x2 = self.t("x = 2", 28, C_VECTEUR2).move_to(
            r.pt(*max(mur.coins, key=lambda k: float(r.pt(*k)[1]))) + UR * 0.34)
        self.play(FadeIn(mur[0]), FadeIn(x2), run_time=0.7)
        self.au_mot("un plan parallèle au plan y O z")
        lmur = self.gauche(self.t("parallèle au plan (y O z)", fs, C_VECTEUR2), -3.15, xmax=0.4)
        self.play(FadeIn(lmur, shift=RIGHT * 0.1), run_time=0.5)

        self.au_mot("Et pour décrire une droite")
        dr1 = self.col(self.t("pour une droite ?", 28, JAUNE_TITRE), -0.25)
        self.play(FadeIn(dr1, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("il faut une représentation paramétrique")
        dr2 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                              self.t("une paramétrique", fs, VERT_OK)).arrange(RIGHT, buff=0.2), -0.95)
        self.play(FadeIn(dr2, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("ou bien deux équations de plans")
        dr3 = self.col(VGroup(self.coche(VERT_OK, 0.14),
                              self.t("ou deux équations", fs, VERT_OK)).arrange(RIGHT, buff=0.2), -1.55)
        self.play(FadeIn(dr3, shift=RIGHT * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : B) ───────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ On n'affiche AUCUN plan : la figure donnerait la réponse (« un plan »).
        # Seule l'équation, qui est la donnée, est à gauche.
        # ⛔ Même cause qu'à l'écran 05, du côté gauche : gauche() aligne le TEXTE sur
        # x = −6,5 et le cadre déborde à −6,72. On pose le groupe.
        eq = self.t("y = 1", 54, C_REGARD)
        cad = SurroundingRectangle(eq, color=C_REGARD, buff=0.22, stroke_width=3)
        self.gauche(VGroup(eq, cad), 1.30, xmax=0.4)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Dans l'espace,", "l'ensemble des points", "qui vérifient y = 1, c'est :"],
            [self.t("une droite", 32), self.t("un plan", 32), self.t("un point", 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Dans l'espace")
        self.play(FadeIn(q[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("l'ensemble des points")
        self.play(FadeIn(q[1], shift=RIGHT * 0.1), run_time=0.4)
        # ⚠️ Le « 1 » de « y égale 1 » est prononcé à 5,00 s, pas à 3,50 s : au_fin sur
        # « y égale 1 » attend le nombre lui-même (1,50 s d'avance au premier dry run).
        self.au_fin("y égale 1")
        self.play(FadeIn(q[2], shift=RIGHT * 0.1), FadeIn(eq, scale=1.15), Create(cad),
                  run_time=0.6)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "B")
        self.mem_q2 = (eq, cad, cartes, pause, rebours)

    def ecran_reponse2(self):
        eq, cad, cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 28
        self.au_mot("Réécrivons l'équation")
        sous = self.gauche(self.t("sous sa forme complète :", fs, GREY_A), 0.40, xmax=1.6)
        self.play(FadeIn(sous, shift=RIGHT * 0.1), run_time=0.45)
        self.au_fin("zéro fois x, plus 1 fois y, plus zéro fois z, moins 1")
        # ⚠️ sans_audit ASSUMÉ et documenté : la voix DICTE cette ligne nombre par nombre
        # (« zéro fois x, plus 1 fois y, plus zéro fois z, moins 1, égale zéro ») et dit
        # « zéro » en LETTRES là où les maths écrivent 0. Rien n'est perdu : la ligne
        # entière paraît à l'instant où la voix a fini de la dicter.
        complet = self.sans_audit(
            self.gauche(self.eq_zero("0 × x + 1 × y + 0 × z − 1", 30, WHITE), -0.35, xmax=1.6))
        self.play(FadeIn(complet, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("C'est bien une équation de plan")
        bien = self.gauche(VGroup(self.coche(VERT_OK, 0.15),
                                  self.t("c'est bien une équation de plan", fs, VERT_OK))
                           .arrange(RIGHT, buff=0.22), -1.10, xmax=1.6)
        self.play(FadeIn(bien, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("avec les coefficients zéro, 1 et zéro")
        # ⚠️ Même raison : « les coefficients ZÉRO, 1 et ZÉRO », dits en lettres.
        coef = self.gauche(VGroup(self.t("coefficients", fs, GREY_A),
                                  self.sans_audit(self.trip((0, 1, 0), fs + 2, C_VECTEUR2)),
                                  self.t(": pas tous nuls", fs, GREY_A)).arrange(RIGHT, buff=0.22),
                           -1.85, xmax=1.6)
        self.play(FadeIn(coef, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("Ce plan est parallèle au plan x O z")
        para = self.gauche(self.t("parallèle au plan (x O z)", 30, C_PLAN), -2.60, xmax=1.6)
        self.play(FadeIn(para, shift=RIGHT * 0.1), run_time=0.5)
        # ⚠️ Court et étroit : sous y = −1,95, col() rétrécit tout ce qui dépasse x = 5,3
        # pour protéger Ti-Margo. « x et z sont libres » tient en 3,0.
        # ⛔ VU AU GROS PLAN : posé à −1,55, ce bloc s'écrivait SUR la carte C. Les trois
        # cartes de cet écran (une ligne chacune, question de trois lignes) descendent à
        # y = −1,33 : il faut passer DESSOUS.
        self.au_mot("x et z sont totalement libres")
        libre = self.col(VGroup(self.t("x et z", 30, C_REGARD),
                                self.t("sont libres", 30, C_REGARD))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.00)
        self.play(FadeIn(libre, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("qui font une surface, pas une ligne")
        deux = self.col(VGroup(self.t("deux libertés,", 26, VERT_OK),
                               self.t("une surface", 26, VERT_OK))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -2.85)
        self.play(FadeIn(deux, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 08 : les trois lignes de la copie ──────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, trois lignes")
        titre = self.t("Au bac : trois lignes", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⚠️ hauteur 4,0 et centre −0,45 : le cadre descend à −2,45, au-dessus de la
        # phrase posée dessous, qui s'arrête elle-même à −3,35 (marge : −3,573).
        copie = RoundedRectangle(width=10.0, height=4.0, corner_radius=0.18, stroke_color=GREY_B,
                                 stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.5, -0.45))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        fs = 28
        un = VGroup(self.pastille(1), VGroup(
            self.t("le plan P a une équation de la forme", fs),
            self.eq_zero("a x + b y + c z + d", fs, C_REGARD)).arrange(DOWN, aligned_edge=LEFT,
                                                                      buff=0.1))
        deux = VGroup(self.pastille(2), VGroup(
            self.t("on remplace par les coordonnées", fs),
            self.t("d'un point connu, pour trouver d", fs, VERT_OK)).arrange(DOWN,
                                                                             aligned_edge=LEFT,
                                                                             buff=0.1))
        trois = VGroup(self.pastille(3), VGroup(
            self.t("on vérifie avec un deuxième point", fs),
            self.t("de l'énoncé, et on écrit la vérification", fs, C_REGARD)).arrange(
                DOWN, aligned_edge=LEFT, buff=0.1))
        for g in (un, deux, trois):
            g.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        lignes = VGroup(un, deux, trois).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        if lignes.width > 8.9:
            lignes.scale_to_fit_width(8.9)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        self.au_mot("Un : le plan P")
        self.play(FadeIn(un[0], scale=1.3), FadeIn(un[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_fin("a x plus b y plus c z plus d égale zéro")
        self.play(FadeIn(un[1][1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Deux : on remplace")
        self.play(FadeIn(deux[0], scale=1.3), FadeIn(deux[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("pour trouver d")
        self.play(FadeIn(deux[1][1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Trois : on vérifie")
        self.play(FadeIn(trois[0], scale=1.3), FadeIn(trois[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("et on écrit cette vérification")
        self.play(FadeIn(trois[1][1], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Elle attrape presque toutes les erreurs de signe")
        rap = self.t("elle attrape presque toutes les erreurs de signe", 30, C_REGARD)
        rap.next_to(copie, DOWN, buff=0.3)
        cad = SurroundingRectangle(rap, color=C_REGARD, buff=0.12, stroke_width=3)
        self.play(FadeIn(rap, shift=UP * 0.1), Create(cad), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # ⚠️ Repère remonté (mesuré au gros plan) : à y = −1,5 le morceau de plan
        # descendait sur les deux lignes que la correction écrit en bas à gauche.
        r, ax = self.repere(o=(-4.6, -0.9), u=0.62, portee=3)
        self.play(Create(ax), run_time=0.4)
        # ⛔ Le plan est la DONNÉE, les deux points sont la QUESTION : on ne les place
        # pas, sinon le dessin répond à la place de l'élève. Ils arrivent en 09b.
        # ⚠️ Centré sur le MILIEU de [A B], et non sur un point pris au hasard : A et B
        # sont alors à 1,22 du centre, bien à l'intérieur du morceau — vu au gros plan,
        # centré en (1 ; 0 ; 2) B tombait pile sur le bord, et son étiquette avec.
        plan = r.plan(P09[:3], d=P09[3],
                      centre=tuple((A09[i] + B09[i]) / 2 for i in range(3)),
                      demi=1.5, couleur=C_PLAN, op=0.22)
        self.au_fin("2 x moins 3 y plus z moins 4 égale zéro")
        eqP = self.col(VGroup(self.t("P :", 32, C_PLAN),
                              self.eq_plan(*P09, fs=32, color=C_PLAN)).arrange(RIGHT, buff=0.2), 2.40)
        self.play(FadeIn(plan[0]), FadeIn(eqP, shift=RIGHT * 0.1), run_time=0.8)
        self.au_fin("2, 0, 0")
        lA = self.ligne(self.t("A", 34, C_REGARD), self.trip(A09, 34), y=1.55)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("0, moins 1, 1")
        lB = self.ligne(self.t("B", 34, C_VECTEUR2), self.trip(B09, 34), y=0.90)
        # ⭐ 0,35 s seulement entre la fin du triplet de B (13,74 s) et « sont-ils dans
        # P » (14,09 s) : on enchaîne sans au_mot, remède du piège n° 6 des entiers.
        self.play(FadeIn(lB, shift=RIGHT * 0.12), run_time=0.3)
        cons = self.col(self.t("sont-ils dans P ?", 32, ORANGE_RETENUE), 0.10)
        self.play(FadeIn(cons, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Mets pause, et cherche")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -0.85)
        rebours = self.rebours_sous(pause)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cons, pause, rebours)

    def ecran_correction(self):
        r, cons, pause, rebours = self.mem_defi
        # ⛔ Piège de l'épisode 3 : l'écran de correction HÉRITE de l'écran de défi.
        # Ce qui s'efface : la consigne et la pause. Ce qui RESTE : l'équation de P et
        # les coordonnées de A et de B, qui sont les données de l'exercice.
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        fs = 28
        self.au_mot("Pour A")
        pa = self.sans_audit(r.point(*A09, "A", couleur=C_REGARD, decal=DR, r=0.095))
        self.play(FadeIn(pa, scale=1.4), run_time=0.4)
        self.au_fin("2 fois 2, moins 3 fois 0, plus 0, moins 4")
        a1 = self.col(VGroup(self.t("A :", fs, C_REGARD),
                             self.t("2 × 2 − 3 × 0 + 0 − 4", fs, WHITE)).arrange(RIGHT, buff=0.22),
                      0.30)
        self.play(FadeIn(a1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("Donc 4 moins 4, égale zéro")
        a2 = self.col(VGroup(self.eq_zero("4 − 4", fs + 2, VERT_OK),
                             self.t(":  A est dans P", fs, VERT_OK)).arrange(RIGHT, buff=0.22),
                      -0.40)
        self.play(FadeIn(a2, scale=1.1), Flash(pa[0], color=VERT_OK, line_length=0.22),
                  run_time=0.6)

        self.au_mot("Pour B")
        pb = self.sans_audit(r.point(*B09, "B", couleur=C_VECTEUR2, decal=DL, r=0.095))
        self.play(FadeIn(pb, scale=1.4), run_time=0.4)
        self.au_fin("moins 3 fois moins 1")
        # ⭐⭐ LE SEUL VRAI DANGER DU CALCUL, et la voix le dit : « moins par moins fait
        # plus ». L'écran le montre en grand, à gauche, à part du reste.
        signe = self.gauche(self.t("− 3 × (− 1)  =  + 3", 36, C_REGARD), -2.40, xmax=1.6)
        self.play(FadeIn(signe, scale=1.12), run_time=0.6)
        self.au_mot("moins par moins fait plus")
        regle = self.gauche(self.t("moins par moins fait plus", 30, C_PIEGE), -3.10, xmax=1.6)
        cad = SurroundingRectangle(regle, color=C_PIEGE, buff=0.13, stroke_width=3)
        self.play(FadeIn(regle, shift=UP * 0.1), Create(cad), run_time=0.6)
        self.au_fin("Zéro plus 3 plus 1 moins 4 fait zéro")
        b1 = self.col(VGroup(self.t("B :", fs, C_VECTEUR2),
                             self.eq_zero("0 + 3 + 1 − 4", fs, VERT_OK)).arrange(RIGHT, buff=0.22),
                      -1.10)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("B est dans P aussi")
        # ⚠️ −1,75 et pas plus bas : sous y = −1,95, col() rétrécit à 3,1 de large tout
        # ce qui dépasse x = 5,3, pour protéger Ti-Margo — et la CONCLUSION de l'écran
        # deviendrait son plus petit texte (le défaut n° 4 de l'épisode 3).
        b2 = self.col(self.t("B est dans P aussi", 30, VERT_OK), -1.75)
        self.play(FadeIn(b2, scale=1.1), Flash(pb[0], color=VERT_OK, line_length=0.22),
                  run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        fs = 34
        faits = (
            (("un plan :", C_PLAN), ("a x + b y + c z + d = 0", WHITE),
             "Un plan, c'est une équation de la forme"),
            (("un point y est", WHITE), ("si ses coordonnées annulent", VERT_OK),
             "Un point y appartient si ses coordonnées"),
            (("on trouve d", C_VECTEUR2), ("en remplaçant par un point connu", WHITE),
             "On trouve d en remplaçant"),
            (("une seule équation :", C_REGARD), ("un plan, pas une droite", WHITE),
             "une seule équation donne un plan"),
        )
        blocs = []
        for (g, cg), (d, cd), _ in faits:
            blocs.append(VGroup(self.t(g, fs, cg), self.t(d, fs, cd)).arrange(RIGHT, buff=0.22))
        # ⚠️ L'équation de la première ligne porte un « 0 » que la voix dit en lettres :
        # hors audit, comme partout ailleurs dans l'épisode (voir eq_zero dans le socle).
        self.sans_audit(blocs[0][1])
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        # ⚠️ 10,6 de large, centré en x = −0,75 : le bloc s'arrête à 4,55, à l'écart de
        # Ti-Margo à scale 0,65 (boîte à partir de x = 5,30).
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.75, 0.15))
        for i, (_, _, extrait) in enumerate(faits):
            self.au_mot(extrait)
            self.play(Create(lignes[i][0]), FadeIn(blocs[i][0], shift=RIGHT * 0.2), run_time=0.45)
            self.play(FadeIn(blocs[i][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_reponse1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_reponse2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class EspacePlanEquationTerminale(EspacePlanEquationBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
