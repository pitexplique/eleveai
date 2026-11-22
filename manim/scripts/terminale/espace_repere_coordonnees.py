# espace_repere_coordonnees.py
# EleveAI — Maths Tle spé — paysage « Coordonnées dans l'espace » (16:9), ceinture VERTE.
# Micro du coach : espace_repere_coordonnees (notion geometrie_espace). Épisode 2 sur 12.
# Centre : transports (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, les trois promesses de l'épisode ;
#   · 01-situation  : Lila, magasinière au Port ; l'adresse d'un colis en trois nombres ;
#   · 02-idee       : le repère (A ; AB, AD, AE) du cube ; les sommets en 0 et 1 ;
#   · 03-theoreme   : le milieu, c'est la moyenne — trois fois ;
#   · 04/04b        : question-pause n° 1 (milieu de [AB] → réponse C) ;
#   · 05-appliquer  : les diagonales [AG] et [CE] se coupent au centre du cube ;
#   · 06-piege      : le pavé droit — les coordonnées tiennent, les longueurs non ;
#   · 07/07b        : question-pause n° 2 (coordonnées de G → réponse A) ;
#   · 08-rediger    : la ligne qui annonce le repère, et les coordonnées écrites ;
#   · 09/09b        : le défi I milieu de [EF], J milieu de [GH], le vecteur I J ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'outil se fait LÀ-BAS, pas ici.
# ⛔ Les pièges de la série : manim/REPRISE-espace-terminale.md. Les neuf défauts de
#   l'épisode 1 y sont, avec le moment où chacun se voit.
# ⚠️ Bonne réponse : 04 → C, 07 → A (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# Voix : manim/voix/terminale-espace-repere-coordonnees.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql \
#   --disable_caching manim/scripts/terminale/espace_repere_coordonnees.py \
#   EspaceRepereCoordonneesTerminale --media_dir manim/scripts/terminale/media-espace-repere \
#   --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la
# charte. Sans le second, « from charte import * » plante — et verifier-avant-
# rendu.py ne le voit pas, il lit le source sans l'importer.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

from espace3d import C_FANTOME, C_PIEGE, C_POINT, C_REGARD, C_VECTEUR, C_VECTEUR2  # noqa: E402
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import P, EcransEspace, pastille_pause  # noqa: E402

PEAU, CHEVEUX = "#6b4423", "#140d08"

# ── les valeurs dites par la voix, revérifiées ICI, à l'exécution ───────────
CUBE = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
        "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}


def mil(p, q):
    return tuple((a + b) / 2 for a, b in zip(p, q))


assert mil((1, 3, 5), (3, 1, 1)) == (2, 2, 3)                       # la bonne réponse de 04
assert tuple(a + b for a, b in zip((1, 3, 5), (3, 1, 1))) == (4, 4, 6)   # le leurre A
assert tuple((b - a) / 2 for a, b in zip((1, 3, 5), (3, 1, 1))) == (1, -1, -2)  # le leurre B
assert mil(CUBE["A"], CUBE["G"]) == mil(CUBE["C"], CUBE["E"]) == (0.5, 0.5, 0.5)
assert mil(CUBE["A"], CUBE["G"]) == mil(CUBE["B"], CUBE["H"]) == mil(CUBE["D"], CUBE["F"])
I_EF, J_GH = mil(CUBE["E"], CUBE["F"]), mil(CUBE["G"], CUBE["H"])
assert I_EF == (0.5, 0, 1) and J_GH == (0.5, 1, 1)
IJ = tuple(b - a for a, b in zip(I_EF, J_GH))
AD_ = tuple(b - a for a, b in zip(CUBE["A"], CUBE["D"]))
assert IJ == AD_ == (0, 1, 0)                                        # (IJ) parallèle à (AD)


def lila(s=1.0):
    """La magasinière : tête, cheveux courts, gilet bleu, douchette code-barres."""
    tete = Circle(radius=0.32, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.35, start_angle=0.1, angle=PI - 0.2, stroke_color=CHEVEUX, stroke_width=13)
    cheveux.move_to(tete.get_top() + DOWN * 0.04)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color="#1d4ed8",
                             fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    bande = VGroup(*[Line(P(-0.5, y), P(0.5, y), stroke_width=5, color="#fcd34d") for y in (0.2, -0.05)])
    douchette = VGroup(RoundedRectangle(width=0.22, height=0.34, corner_radius=0.06, fill_color=GREY_D,
                                        fill_opacity=1, stroke_width=0),
                       Line(P(0, 0.17), P(0, 0.42), stroke_width=4, color=ROUGE_ERREUR))
    douchette.move_to(P(0.62, -0.1))
    return VGroup(corps, bande, tete, cheveux, douchette).scale(s)


class EspaceRepereCoordonneesBase(EcransEspace):
    fichier_marques = "espace_repere_coordonnees_marques.json"
    nom_voix = "terminale-espace-repere-coordonnees"

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Coordonnées dans l'espace", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Coordonnées dans l'espace")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        fs = 40
        b1 = VGroup(self.t("trois nombres", fs, C_REGARD), self.t("pour un point", fs))
        b2 = VGroup(self.t("une moyenne", fs, VERT_OK), self.t("pour un milieu", fs))
        b3 = VGroup(self.t("un repère bien choisi", fs, C_VECTEUR), self.t("pour tout calculer", fs))
        for b in (b1, b2, b3):
            b.arrange(RIGHT, buff=0.22)
        lignes = VGroup(b1, b2, b3).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        # ⚠️ au-dessus de l'échelle des ceintures, qui occupe y ∈ [−3,45 ; −2,6] :
        # sur E1, cette zone-là a coûté trois rendus (voir la note de reprise).
        lignes.move_to(P(0, 0.35))
        for b, extrait in zip(lignes, ("Trois nombres pour un point", "une moyenne pour un milieu",
                                       "et un repère bien choisi")):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lila et l'adresse d'un colis ──────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        l = lila(1.0).move_to(P(-5.45, 0.5))
        self.au_mot("Voici Lila")
        nom = self.t("Lila", 36, JAUNE_TITRE).next_to(l, DOWN, buff=0.2)
        self.play(FadeIn(l, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("magasinière")
        metier = VGroup(self.t("magasinière", 24, GREY_A), self.t("au Port", 24, GREY_A))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        for g in (nom, metier):
            if g.get_left()[0] < -6.5:
                g.shift(RIGHT * (-6.5 - g.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        r, ax = self.repere(o=(-3.5, -1.7), u=0.56, portee=5)
        self.au_mot("une adresse à trois nombres")
        self.play(Create(ax), run_time=0.5)
        colis = r.point(4, 2, 3, None, couleur=C_REGARD, escalier=True)
        self.sans_audit(colis)
        boite = Square(side_length=0.3, fill_color=C_REGARD, fill_opacity=0.9,
                       stroke_color="#b45309", stroke_width=3).move_to(r.pt(4, 2, 3))
        self.play(FadeIn(colis[1:]), FadeIn(boite, scale=1.6), run_time=0.6)

        fs = 30
        et = VGroup(*[self.t(m, fs, WHITE) for m in ("l'allée", "la profondeur", "l'étage")])
        et.arrange(DOWN, aligned_edge=LEFT, buff=0.34)
        self.col(et, 1.5)
        for ligne, extrait in zip(et, ("l'allée", "la profondeur", "l'étage")):
            self.au_mot(extrait)
            self.play(FadeIn(ligne, shift=RIGHT * 0.15), run_time=0.35)
        # ⭐ Ici, contrairement à l'épisode 1, la voix DIT les trois nombres :
        # « Quatre, deux, trois ». Ils peuvent donc paraître à l'écran.
        self.au_pos(self._texte_voix.find("Quatre, deux, trois"))
        # ⚠️ sans_audit ASSUMÉ et documenté : la voix dit « Quatre, deux, trois » EN
        # LETTRES, l'écran écrit 4 ; 2 ; 3 en chiffres. C'est la bonne écriture pour
        # des coordonnées, et l'élève entend bien les trois nombres au bon moment.
        # ⛔ Ce n'est PAS le cas de l'épisode 1, où la voix ne disait aucun nombre.
        adr = self.sans_audit(self.trip((4, 2, 3), 42, C_REGARD))
        self.col(adr, -0.3)
        self.play(FadeIn(adr, scale=1.2), run_time=0.5)
        self.au_mot("et le colis est trouvé")
        trouve = self.col(self.t("et le colis est trouvé", 30, VERT_OK), -1.1)
        self.play(FadeIn(trouve, shift=UP * 0.1), Flash(boite, color=VERT_OK, line_length=0.25),
                  run_time=0.6)
        self.au_mot("une origine, trois directions")
        pareil = VGroup(self.t("une origine,", 32, C_VECTEUR), self.t("trois directions,", 32, C_VECTEUR),
                        self.t("trois nombres", 32, C_VECTEUR))
        pareil.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(pareil, -2.3)
        self.play(FadeIn(pareil, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 02 : le repère du cube ─────────────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Un repère de l'espace")
        titre = self.t("Le repère du cube", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        ordre = self.col(self.t("toujours dans l'ordre x, y, z", 32, GREY_A), 2.5)
        self.sans_audit(ordre)
        self.au_mot("dans le même ordre")
        self.play(FadeIn(ordre, shift=RIGHT * 0.1), run_time=0.4)

        r, ax = self.repere(o=(-5.0, -2.1), u=1.45, portee=2)
        self.au_mot("qu'on choisit souvent")
        self.play(Create(ax), run_time=0.5)
        cube = self.sans_audit(r.cube(cote=1, fs=26))
        self.au_mot("Dans le cube")
        self.play(Create(cube), run_time=1.0)
        self.au_mot("on prend A comme origine")
        base = VGroup(*[r.vecteur(CUBE["A"], CUBE[s], None, couleur=c, sw=7)
                        for s, c in (("B", C_VECTEUR), ("D", C_VECTEUR2), ("E", VERT_OK))])
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.8)

        fs = 32
        lignes = VGroup()
        for s in ("A", "B", "D", "E", "G"):
            lignes.add(VGroup(self.t(s, fs, C_REGARD), self.trip(CUBE[s], fs, WHITE))
                       .arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        self.col(lignes, -0.1)
        for ligne, s, dit in (("A", "A", "0, 0, 0"), ("B", "B", "1, 0, 0"), ("D", "D", "0, 1, 0"),
                              ("E", "E", "0, 0, 1"), ("G", "G", "1, 1, 1")):
            i = "ABDEG".index(s)
            self.au_pos(self._texte_voix.find(dit))
            self.play(FadeIn(lignes[i], shift=RIGHT * 0.12), run_time=0.35)
        self.au_mot("Que des zéros et des uns")
        zu = self.col(self.t("que des zéros et des uns", 32, VERT_OK), -2.5)
        self.play(FadeIn(zu, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : le milieu, c'est la moyenne ───────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Le milieu, c'est la moyenne")
        titre = self.t("Le milieu, c'est la moyenne", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-4.8, -1.6), u=0.62, portee=4)
        self.play(Create(ax), run_time=0.4)
        a, b = (1, 0, 0), (3, 2, 3)
        pa = self.sans_audit(r.point(*a, "A", couleur=C_POINT, decal=DL))
        pb = self.sans_audit(r.point(*b, "B", couleur=C_POINT, decal=UR))
        seg = Line(r.pt(*a), r.pt(*b)).set_stroke(C_FANTOME, 4)
        self.au_mot("Pour le milieu du segment")
        self.play(FadeIn(pa, scale=1.3), FadeIn(pb, scale=1.3), Create(seg), run_time=0.7)
        m = mil(a, b)
        pm = Dot(r.pt(*m), radius=0.1, color=VERT_OK)
        self.au_mot("on additionne les coordonnées")
        self.play(FadeIn(pm, scale=2), run_time=0.4)

        fs = 34
        L1 = self.ligne(self.t("on additionne", fs, WHITE), self.t("A et B", fs, C_POINT), y=1.6)
        L2 = self.ligne(self.t("on divise par", fs, WHITE), self.t("deux", fs, VERT_OK), y=0.8)
        L3 = VGroup(self.t("trois fois :", fs, C_REGARD), self.t("x, puis y, puis z", fs))
        L3.arrange(RIGHT, buff=0.2)
        self.col(L3, -0.1)
        self.play(FadeIn(L1, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("et on divise par deux")
        self.play(FadeIn(L2, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("Trois fois")
        self.sans_audit(L3)
        self.play(FadeIn(L3, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("Rien de plus que dans le plan")
        rien = VGroup(self.t("rien de plus que dans le plan,", 30, GREY_A),
                      self.t("une coordonnée en plus", 30, C_REGARD))
        rien.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(rien, -1.4)
        self.play(FadeIn(rien, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 (bonne réponse : C) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        r, ax = self.repere(o=(-4.3, -1.8), u=0.5, portee=6)
        # ⛔ On place A et B, PAS le milieu : il donnerait la réponse.
        pa = self.sans_audit(r.point(1, 3, 5, "A", couleur=C_POINT, decal=UL))
        pb = self.sans_audit(r.point(3, 1, 1, "B", couleur=C_POINT, decal=DR))
        seg = Line(r.pt(1, 3, 5), r.pt(3, 1, 1)).set_stroke(C_FANTOME, 3)
        self.au_mot("Question !")
        lA = VGroup(self.t("A a pour coordonnées", 32), self.t("1 ; 3 ; 5,", 32)).arrange(RIGHT, buff=0.18)
        lB = VGroup(self.t("B a pour coordonnées", 32), self.t("3 ; 1 ; 1.", 32)).arrange(RIGHT, buff=0.18)
        tete, q, cartes, pause, rebours = self.q_tete(
            [lA, lB, "Quelles sont les coordonnées", "du milieu du segment A B ?"],
            [self.trip((4, 4, 6), 32), self.trip((1, -1, -2), 32), self.trip((2, 2, 3), 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.play(Create(ax), run_time=0.4)
        self.au_mot("A a pour coordonnées")
        self.play(FadeIn(lA[0], shift=RIGHT * 0.1), FadeIn(pa, scale=1.3), run_time=0.4)
        self.au_pos(self._texte_voix.find("1, 3, 5"))
        self.play(FadeIn(lA[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("et B a pour coordonnées")
        self.play(FadeIn(lB[0], shift=RIGHT * 0.1), FadeIn(pb, scale=1.3), Create(seg), run_time=0.4)
        self.au_pos(self._texte_voix.find("3, 1, 1"))
        self.play(FadeIn(lB[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Quelles sont les coordonnées")
        self.play(FadeIn(q[2:], shift=RIGHT * 0.1), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "C")
        self.mem_q1 = (r, seg, cartes, pause, rebours)

    def ecran_reponse1(self):
        r, seg, cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        fs = 30
        calc = VGroup(self.t("1 + 3 = 4,  4 ÷ 2 = 2", fs, VERT_OK),
                      self.t("3 + 1 = 4,  4 ÷ 2 = 2", fs, VERT_OK),
                      self.t("5 + 1 = 6,  6 ÷ 2 = 3", fs, VERT_OK))
        calc.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        # ⛔ VU AU GROS PLAN : à −2,35 la première ligne passait SUR l'axe des x du
        # repère (y = −1,8). À −2,7, le bloc tient entre l'axe et la marge (−3,573).
        self.gauche(calc, -2.7, xmax=0.4, x0=-6.5)
        for i, extrait in enumerate(("1 plus 3 fait 4", "3 plus 1 fait 4", "5 plus 1 fait 6")):
            self.au_mot(extrait)
            self.play(FadeIn(calc[i], shift=RIGHT * 0.12), run_time=0.35)
        self.au_mot("divisé par deux", n=3)
        m = mil((1, 3, 5), (3, 1, 1))
        pm = Dot(r.pt(*m), radius=0.11, color=VERT_OK)
        self.play(FadeIn(pm, scale=2.2), seg.animate.set_stroke(VERT_OK, 4), run_time=0.5)
        self.au_mot("La réponse A")
        p1 = self.col(self.t("A : la somme, division oubliée", 28, C_PIEGE), -2.2)
        self.play(FadeIn(p1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Et la réponse B")
        p2 = self.col(self.t("B : un vecteur, pas un point", 28, C_PIEGE), -2.75)
        self.play(FadeIn(p2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 05 : les diagonales du cube ────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons dans le cube")
        titre = self.t("Les diagonales du cube", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-5.0, -2.1), u=1.45, portee=2)
        cube = self.sans_audit(r.cube(cote=1, fs=26))
        self.play(Create(cube), run_time=0.8)
        fs = 32
        ag = Line(r.pt(*CUBE["A"]), r.pt(*CUBE["G"])).set_stroke(C_VECTEUR, 6)
        ce = Line(r.pt(*CUBE["C"]), r.pt(*CUBE["E"])).set_stroke(C_VECTEUR2, 6)
        self.au_mot("Le milieu de la grande diagonale")
        self.play(Create(ag), run_time=0.6)
        L1 = self.ligne(self.t("milieu de [A G]", fs, C_VECTEUR), y=2.0)
        self.play(FadeIn(L1, shift=RIGHT * 0.12), run_time=0.35)
        self.au_pos(self._texte_voix.find("0,5 ; 0,5 ; 0,5"))
        centre = mil(CUBE["A"], CUBE["G"])
        R1 = self.ligne(self.trip(centre, fs + 2, VERT_OK), y=1.35)
        pc = Dot(r.pt(*centre), radius=0.1, color=VERT_OK)
        self.play(FadeIn(R1, scale=1.15), FadeIn(pc, scale=2.2), run_time=0.5)
        self.au_mot("Calculons maintenant")
        self.play(Create(ce), run_time=0.6)
        L2 = self.ligne(self.t("milieu de [C E]", fs, C_VECTEUR2), y=0.4)
        self.play(FadeIn(L2, shift=RIGHT * 0.12), run_time=0.35)
        self.au_pos(self._texte_voix.find("0,5 ; 0,5 ; 0,5", self._texte_voix.find("0,5 ; 0,5 ; 0,5") + 1))
        R2 = self.ligne(self.trip(mil(CUBE["C"], CUBE["E"]), fs + 2, VERT_OK), y=-0.25)
        self.play(FadeIn(R2, scale=1.15), run_time=0.45)
        self.au_mot("même point")
        meme = self.col(self.t("le même point !", 36, VERT_OK), -1.2)
        self.play(FadeIn(meme, scale=1.2), Flash(pc, color=VERT_OK, line_length=0.3), run_time=0.7)
        self.au_mot("quatre grandes diagonales")
        bh = Line(r.pt(*CUBE["B"]), r.pt(*CUBE["H"])).set_stroke(C_FANTOME, 4)
        df = Line(r.pt(*CUBE["D"]), r.pt(*CUBE["F"])).set_stroke(C_FANTOME, 4)
        quatre = VGroup(self.t("les quatre diagonales", 30, C_REGARD),
                        self.t("se coupent au centre", 30, C_REGARD))
        quatre.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(quatre, -2.3)
        self.play(Create(bh), Create(df), FadeIn(quatre, shift=UP * 0.1), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège du pavé droit ────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Les longueurs, non", 46, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.7)
        fs = 30
        self.au_mot("Les coordonnées fonctionnent")
        L1 = self.col(self.t("les coordonnées : toujours", fs, VERT_OK), 2.2)
        self.play(FadeIn(L1, shift=RIGHT * 0.1), run_time=0.4)

        # le pavé : 4 de large, 1 de profondeur, 2 de haut — et les MÊMES coordonnées
        r, ax = self.repere(o=(-5.3, -2.0), u=0.62, portee=3)
        self.au_mot("Prends un pavé droit")
        pave = VGroup()
        s = {"A": (0, 0, 0), "B": (4, 0, 0), "C": (4, 1, 0), "D": (0, 1, 0),
             "E": (0, 0, 2), "F": (4, 0, 2), "G": (4, 1, 2), "H": (0, 1, 2)}
        for a, b in (("A", "B"), ("B", "C"), ("E", "F"), ("F", "G"), ("G", "H"),
                     ("A", "E"), ("B", "F"), ("C", "G")):
            pave.add(Line(r.pt(*s[a]), r.pt(*s[b])).set_stroke(C_POINT, 4))
        for a, b in (("A", "D"), ("D", "C"), ("D", "H")):
            pave.add(DashedLine(r.pt(*s[a]), r.pt(*s[b]), dash_length=0.1).set_stroke(C_POINT, 2.5))
        self.play(Create(pave), run_time=0.9)
        ab = Line(r.pt(*s["A"]), r.pt(*s["B"])).set_stroke(C_REGARD, 7)
        ad = Line(r.pt(*s["A"]), r.pt(*s["D"])).set_stroke(C_VECTEUR2, 7)
        l_ab = self.sans_audit(self.t("4 cm", 26, C_REGARD).move_to(r.pt(2, 0, 0) + DOWN * 0.42))
        l_ad = self.sans_audit(self.t("1 cm", 26, C_VECTEUR2).move_to(r.pt(0, 1, 0) + LEFT * 0.78))
        self.au_mot("dont l'arête A B mesure 4 centimètres")
        self.play(Create(ab), FadeIn(l_ab), run_time=0.5)
        self.au_mot("et l'arête A D mesure 1 centimètre")
        self.play(Create(ad), FadeIn(l_ad), run_time=0.5)
        self.au_mot("le point B a toujours pour coordonnées")
        L2 = self.ligne(self.t("B", fs + 4, C_REGARD), self.trip((1, 0, 0), fs + 4, WHITE), y=1.0)
        self.play(FadeIn(L2, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("le point D a pour")
        L3 = self.ligne(self.t("D", fs + 4, C_VECTEUR2), self.trip((0, 1, 0), fs + 4, WHITE), y=0.3)
        self.play(FadeIn(L3, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("quatre fois plus loin")
        loin = self.col(self.t("et pourtant B est 4 fois plus loin", 30, C_PIEGE), -0.6)
        self.play(FadeIn(loin, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Milieux et colinéarité")
        bilan = VGroup(VGroup(self.coche(VERT_OK, 0.16), self.t("milieux, colinéarité", 30, VERT_OK)),
                       VGroup(self.croix(), self.t("distances, angles", 30, C_PIEGE)))
        for b in bilan:
            b.arrange(RIGHT, buff=0.2)
        bilan.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.col(bilan, -1.8)
        self.play(FadeIn(bilan[0], shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Distances et angles")
        self.play(FadeIn(bilan[1], shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("seulement si le repère est orthonormé")
        ortho = self.col(self.t("seulement si le repère", 28, GREY_A), -2.75)
        ortho2 = self.col(self.t("est orthonormé", 28, GREY_A), -3.1)
        self.play(FadeIn(ortho), FadeIn(ortho2), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : A) ───────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        r, ax = self.repere(o=(-5.0, -2.1), u=1.45, portee=2)
        cube = self.sans_audit(r.cube(cote=1, fs=26))
        self.au_mot("Question !")
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Dans le cube A B C D E F G H", "muni du repère A, A B, A D, A E,",
             "quelles sont les coordonnées", "du sommet G ?"],
            [self.trip((1, 1, 1), 32), self.trip((1, 1, 0), 32), self.trip((0, 1, 1), 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Dans le cube")
        self.play(Create(cube), FadeIn(q[0], shift=RIGHT * 0.1), run_time=0.9)
        self.au_mot("muni du repère")
        base = VGroup(*[r.vecteur(CUBE["A"], CUBE[s], None, couleur=c, sw=6)
                        for s, c in (("B", C_VECTEUR), ("D", C_VECTEUR2), ("E", VERT_OK))])
        self.play(*[GrowArrow(v[0]) for v in base], FadeIn(q[1], shift=RIGHT * 0.1), run_time=0.7)
        self.au_mot("quelles sont les coordonnées")
        self.play(FadeIn(q[2:], shift=RIGHT * 0.1), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "A")
        self.mem_q2 = (r, cube, cartes, pause, rebours)

    def ecran_reponse2(self):
        r, cube, cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("on fait un pas dans chacune")
        chemin = VGroup(
            Line(r.pt(*CUBE["A"]), r.pt(*CUBE["B"])).set_stroke(VERT_OK, 8),
            Line(r.pt(*CUBE["B"]), r.pt(*CUBE["C"])).set_stroke(VERT_OK, 8),
            Line(r.pt(*CUBE["C"]), r.pt(*CUBE["G"])).set_stroke(VERT_OK, 8))
        for m in chemin:
            self.play(Create(m), run_time=0.35)
        fs = 30
        self.au_mot("Le triplet 1, 1, 0")
        c1 = self.gauche(VGroup(self.trip((1, 1, 0), fs, C_PIEGE),
                                self.t("c'est le sommet C", fs, C_PIEGE)).arrange(RIGHT, buff=0.25),
                         -2.5, xmax=-0.2)
        pc = Dot(r.pt(*CUBE["C"]), radius=0.11, color=C_PIEGE)
        self.play(FadeIn(c1, shift=RIGHT * 0.12), FadeIn(pc, scale=2), run_time=0.5)
        self.au_mot("Et 0, 1, 1")
        c2 = self.gauche(VGroup(self.trip((0, 1, 1), fs, C_PIEGE),
                                self.t("c'est le sommet H", fs, C_PIEGE)).arrange(RIGHT, buff=0.25),
                         -3.05, xmax=-0.2)
        ph = Dot(r.pt(*CUBE["H"]), radius=0.11, color=C_PIEGE)
        self.play(FadeIn(c2, shift=RIGHT * 0.12), FadeIn(ph, scale=2), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 08 : rédiger ───────────────────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, on commence toujours par là")
        titre = self.t("La première ligne de la copie", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⚠️ hauteur 3,9 et centre −0,35 : à 4,2 et −0,6, le cadre de la phrase posée
        # SOUS la copie descendait à y = −3,6, au-delà de la marge de 3 % (−3,573).
        copie = RoundedRectangle(width=9.8, height=3.9, corner_radius=0.18, stroke_color=GREY_B,
                                 stroke_width=3, fill_color="#0b1220", fill_opacity=1).move_to(P(-0.5, -0.35))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2, color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        fs = 32
        un = VGroup(self.pastille(1), VGroup(
            self.t("on se place dans le repère A, A B, A D, A E,", fs),
            self.t("qui est orthonormé", fs, C_VECTEUR)).arrange(DOWN, aligned_edge=LEFT, buff=0.1))
        un.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        deux = VGroup(self.pastille(2), VGroup(
            self.t("les coordonnées de tous les points utiles :", fs),
            self.t("les sommets d'abord, les milieux ensuite", fs, VERT_OK)).arrange(
                DOWN, aligned_edge=LEFT, buff=0.1))
        deux.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        lignes = VGroup(un, deux).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 8.7:
            lignes.scale_to_fit_width(8.7)
        lignes.move_to(copie.get_center() + UP * 0.3).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        self.au_mot("Une ligne pour annoncer le repère")
        self.play(FadeIn(un[0], scale=1.3), FadeIn(un[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("qui est orthonormé")
        self.play(FadeIn(un[1][1], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Puis on écrit les coordonnées")
        self.play(FadeIn(deux[0], scale=1.3), FadeIn(deux[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("les sommets d'abord")
        self.play(FadeIn(deux[1][1], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Cette ligne-là rapporte des points")
        rap = self.t("cette ligne-là rapporte des points", 32, C_REGARD)
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
        r, ax = self.repere(o=(-5.0, -2.1), u=1.45, portee=2)
        cube = self.sans_audit(r.cube(cote=1, fs=26))
        self.play(Create(cube), run_time=0.8)
        fs = 32
        self.au_mot("I est le milieu du segment E F")
        pi = Dot(r.pt(*I_EF), radius=0.1, color=C_REGARD)
        ti = self.sans_audit(self.t("I", 28, C_REGARD, ).move_to(r.pt(*I_EF) + UP * 0.3))
        ef = Line(r.pt(*CUBE["E"]), r.pt(*CUBE["F"])).set_stroke(C_REGARD, 6)
        self.play(Create(ef), FadeIn(pi, scale=2), FadeIn(ti), run_time=0.7)
        self.au_mot("et J est le milieu du segment G H")
        pj = Dot(r.pt(*J_GH), radius=0.1, color=C_VECTEUR2)
        tj = self.sans_audit(self.t("J", 28, C_VECTEUR2).move_to(r.pt(*J_GH) + UP * 0.3))
        gh = Line(r.pt(*CUBE["G"]), r.pt(*CUBE["H"])).set_stroke(C_VECTEUR2, 6)
        self.play(Create(gh), FadeIn(pj, scale=2), FadeIn(tj), run_time=0.7)
        self.au_mot("Donne les coordonnées de I et de J")
        cons = VGroup(self.t("les coordonnées de I et de J,", fs, WHITE),
                      self.t("puis celles du vecteur I J", fs, ORANGE_RETENUE))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(cons, 0.9)
        self.play(FadeIn(cons, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Mets pause, et cherche")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -0.6)
        rebours = self.rebours_sous(pause)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cube, cons, pause, rebours, pi, pj)

    def ecran_correction(self):
        r, cube, cons, pause, rebours, pi, pj = self.mem_defi
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        self.au_mot("Correction")
        fs = 32
        L1 = self.ligne(self.t("I", fs, C_REGARD), self.trip(I_EF, fs, VERT_OK), y=2.0)
        L2 = self.ligne(self.t("J", fs, C_VECTEUR2), self.trip(J_GH, fs, VERT_OK), y=1.2)
        self.au_pos(self._texte_voix.find("0,5 ; 0 ; 1"))
        self.play(FadeIn(L1, shift=RIGHT * 0.12), Flash(pi, color=VERT_OK, line_length=0.2), run_time=0.5)
        self.au_pos(self._texte_voix.find("0,5 ; 1 ; 1"))
        self.play(FadeIn(L2, shift=RIGHT * 0.12), Flash(pj, color=VERT_OK, line_length=0.2), run_time=0.5)
        self.au_mot("Le vecteur I J, c'est arrivée moins départ")
        vij = Arrow(r.pt(*I_EF), r.pt(*J_GH), buff=0, stroke_width=7, color=VERT_OK,
                    max_tip_length_to_length_ratio=0.18)
        self.play(GrowArrow(vij), run_time=0.6)
        self.au_pos(self._texte_voix.find("0, 1, 0"))
        L3 = self.ligne(self.t("I J", fs + 2, VERT_OK), self.trip(IJ, fs + 2, VERT_OK), y=0.3)
        self.play(FadeIn(L3, scale=1.15), run_time=0.5)
        self.au_mot("est exactement celui")
        vad = Arrow(r.pt(*CUBE["A"]), r.pt(*CUBE["D"]), buff=0, stroke_width=7, color=C_VECTEUR2,
                    max_tip_length_to_length_ratio=0.18)
        L4 = self.ligne(self.t("A D", fs + 2, C_VECTEUR2), self.trip(AD_, fs + 2, C_VECTEUR2), y=-0.5)
        self.play(GrowArrow(vad), FadeIn(L4, scale=1.1), run_time=0.7)
        self.au_mot("sont donc parallèles")
        concl = VGroup(self.t("(I J) et (A D)", 34, VERT_OK), self.t("sont parallèles", 34, VERT_OK))
        concl.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(concl, -1.6)
        self.play(FadeIn(concl, shift=UP * 0.1), run_time=0.6)
        self.au_mot("sans regarder le dessin")
        sans = self.col(self.t("démontré, pas vu", 30, C_REGARD), -2.6)
        self.play(FadeIn(sans, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        fs = 42
        b1 = VGroup(self.t("trois coordonnées,", fs), self.t("dans l'ordre x, y, z", fs, C_REGARD))
        b2 = VGroup(self.t("le milieu :", fs, VERT_OK), self.t("la moyenne des coordonnées", fs))
        b3 = VGroup(self.t("le repère du cube :", fs, C_VECTEUR), self.t("des zéros et des uns", fs))
        for b in (b1, b2, b3):
            b.arrange(RIGHT, buff=0.25)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in (b1, b2, b3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.4, 0.1))
        self.sans_audit(b1[1])
        self.au_mot("Trois coordonnées")
        self.play(Create(lignes[0][0]), FadeIn(b1[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("dans l'ordre x, y, z")
        self.play(FadeIn(b1[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le milieu, c'est la moyenne")
        self.play(Create(lignes[1][0]), FadeIn(b2[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("la moyenne des coordonnées")
        self.play(FadeIn(b2[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et choisir le repère du cube")
        self.play(Create(lignes[2][0]), FadeIn(b3[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("des zéros et des uns")
        self.play(FadeIn(b3[1], shift=RIGHT * 0.2), run_time=0.4)
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


class EspaceRepereCoordonneesTerminale(EspaceRepereCoordonneesBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
