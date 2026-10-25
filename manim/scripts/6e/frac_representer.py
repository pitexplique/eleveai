# frac_representer.py
# EleveAI — Maths 6e — série « Fractions », épisode 02 : REPRÉSENTER UNE
# FRACTION (micro du coach : fraction_representer), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE : la paysage complète du niveau (méthode, toutes les formes,
# parts égales, petites parts groupées, défi corrigé), repère de REGLES.md.
# Short jumeau : frac_representer_short.py (l'énigme du gâteau rond en 6 au
# compas, celle de Frédéric).
#
# Décor et métier : l'ART DE RUE ; Maëlys, ARTISTE qui peint des FRESQUES sur
# les murs de la ville : 3/4 d'un mur en bleu ; 2/3 d'un mur de 12 carreaux
# (→ 8) ; défi : 3/5 d'une fresque de 15 carreaux (→ 9). Aucune donnée du monde
# réel citée. Centres d'intérêt : art-design.
#
# Micro → écrans : dénominateur = en combien de parts égales on partage,
# numérateur = combien on en prend (02), barre, disque, grille, cases
# « n'importe lesquelles » (03, canvas bar/circle/grid du coach), « en combien
# de parts ? » (04, question 1, item fraction_representer_qcm_tpl_1 : leurres
# 4 et 10), PARTS ÉGALES (05, item fraction_representer_piege_parts_inegales),
# petites parts groupées 2/3 de 12 (06, item fraction_representer_tpl_parts_
# plus_fines), 1/2 de 10 (07, question 2), défi 3/5 de 15 (08), rappel de la
# chaîne : 3/5 = 9/15 → l'épisode 03 (09).
# Écrans : 00 garde · 01 Maëlys · 02 la méthode (3/4) · 03 toutes les formes ·
# 04 QUESTION 1 · 05 parts égales · 06 petites parts · 07 QUESTION 2 · 08 défi ·
# 08b correction · 09 fractions égales (la suite) · 10 ce que tu as appris ·
# 11 fin.
#
# ⭐ Ajouté DANS CE SCRIPT (canvas_fractions.py et frac_commun.py non modifiés) :
# artiste() (Maëlys), mur_inegal() (un mur en 4 parts INÉGALES), et les aides
# rep()/q_tete()/montrer2() reprises de frac_lire_ecrire.py.
# Voix : manim/voix/6e-frac-representer.json (débit −10), WAV dans
# public/sons/6e-frac-representer/ ; marques : frac_representer_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_representer.py FracRepresenter6e -o eleveai-maths-6e-frac-representer --media_dir manim/scripts/6e/media-frac-representer
# Sortie : manim/sorties/6e/maths/fractions/02-representer/eleveai-maths-6e-frac-representer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403
from frac_lire_ecrire import FracLireEcrireBase  # noqa: E402  (rep, q_tete, montrer2)

MUR = "#e7d3b0"      # un mur clair, crème
JAUNE_P = "#facc15"  # la peinture jaune du défi


def artiste(s=1.0):
    """Maëlys, artiste de fresques : cheveux bouclés, salopette tachée, bombe."""
    tete = Circle(radius=0.4, fill_color="#8d5524", fill_opacity=1, stroke_width=0)
    boucles = VGroup(*[Circle(radius=0.17, fill_color="#1f1302", fill_opacity=1, stroke_width=0)
                       .move_to(P(0.42 * np.cos(a), 0.42 * np.sin(a) + 0.05)) for a in np.linspace(0.1, PI - 0.1, 7)])
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#7c3aed",
                    fill_opacity=1, stroke_width=0)
    taches = VGroup(*[Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, r, c in ((-0.3, -1.2, 0.09, "#38bdf8"), (0.25, -0.9, 0.07, "#facc15"),
                                         (0.1, -1.5, 0.08, "#f472b6"))])
    bombe = VGroup(RoundedRectangle(width=0.22, height=0.5, corner_radius=0.06, fill_color="#38bdf8", fill_opacity=1,
                                    stroke_width=0),
                   Rectangle(width=0.1, height=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(P(0, 0.3))).rotate(-0.4).move_to(P(0.85, -0.7))
    return VGroup(corps, taches, bombe, boucles, tete).scale(s)


def mur_inegal(largeurs=(0.7, 1.1, 1.5, 1.9), h=0.9, centre=ORIGIN):
    """Un mur coupé en parts INÉGALES (le piège du coach : unequalParts).
    .parts[i] ; .contour ; .carte. Rien n'est ajouté à la scène."""
    x = -sum(largeurs) / 2
    parts = VGroup()
    for w in largeurs:
        parts.add(Rectangle(width=w, height=h, fill_color=VIDE, fill_opacity=1, stroke_color=BORD, stroke_width=3)
                  .move_to(P(x + w / 2, 0)))
        x += w
    carte = RoundedRectangle(width=sum(largeurs) + 0.6, height=h + 0.6, corner_radius=0.22, fill_color=CARTE,
                             fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
    g = VGroup(carte, parts).move_to(centre)
    g.parts, g.carte = parts, carte
    return g


class FracRepresenterBase(FracLireEcrireBase):
    nom_voix = "6e-frac-representer"
    fichier_marques = "frac_representer_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Représenter une fraction", self.identite, self.ceinture)
        b = Barre(4, 3, largeur=3.6, hauteur=0.6, centre=P(-2.6, 0.5))
        d = Disque(3, 2, rayon=0.8, centre=P(0.9, 0.0))
        q = self.t("?", 100, AMBRE).move_to(P(3.2, 0.0))
        self.au_mot("Représenter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment dessiner")
        self.play(b.apparaitre(0.9), d.apparaitre(0.9))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Maëlys, artiste ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = artiste(1.15).move_to(P(-5.2, -0.4))
        self.au_mot("Voici Maëlys")
        nom = self.t("Maëlys", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("artiste")
        metier = self.t("artiste", 36, BLEU_CALCUL).next_to(pers, DOWN, buff=0.25)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        mur = Barre(1, 0, largeur=3.4, hauteur=2.0, vide=MUR, centre=P(-2.0, 0.0))
        briques = VGroup(*[Line(P(-3.7, y), P(-0.3, y), color="#c4a77d", stroke_width=2) for y in (-0.5, 0.0, 0.5)])
        self.au_mot("des fresques")
        self.play(mur.apparaitre(0.8), FadeIn(briques), run_time=0.8)
        self.au_mot("en bleu 3 quarts")
        l1 = self.col(self.ligne([("en bleu :", BLEU_PART), ("3 quarts", WHITE), ("du mur", WHITE)], 42), 1.2)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Où met-elle")
        q = self.col(self.t("Où peindre ?", 44, ORANGE_RETENUE), 0.0)
        self.play(FadeIn(q, scale=0.8), Indicate(mur, color=AMBRE, scale_factor=1.03), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la méthode (3/4 du mur) ────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        mur = Barre(1, 0, largeur=5.0, hauteur=1.4, vide=MUR, centre=P(-3.45, 0.2))
        self.add(mur)
        f = EcritureFraction(3, 4, fs=110).move_to(P(1.3, 0.2))
        dn = self.bloc(["le dénominateur :", "en combien de parts"], 30).next_to(f.den, RIGHT, buff=0.35)
        dn[0].set_color(AMBRE)
        nm = self.bloc(["le numérateur :", "combien on en prend"], 30).next_to(f.num, RIGHT, buff=0.35)
        nm[0].set_color(AMBRE)
        nm.align_to(dn, LEFT)
        self.au_mot("Le dénominateur")
        self.play(FadeIn(f.trait), FadeIn(dn[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4, dit")
        self.play(FadeIn(f.den, scale=1.4), run_time=0.4)
        self.au_mot("en combien")
        self.play(FadeIn(dn[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("On coupe le mur en 4")
        m4, anim = mur.repartager(4, run_time=1.0)
        self.play(anim)
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.06) for p in m4.parts], lag_ratio=0.2),
                  run_time=0.8)
        self.au_mot("Le numérateur")
        self.play(FadeIn(nm[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("3, dit")
        self.play(FadeIn(f.num, scale=1.4), run_time=0.4)
        self.au_mot("combien on en prend")
        self.play(FadeIn(nm[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("On peint 3 parts")
        self.play(m4.colorier(range(3), lag=0.3), run_time=1.2)
        self.au_mot("Voilà 3 quarts")
        v = self.ligne([("3 quarts", JAUNE_TITRE), ("du mur !", WHITE)], 44).move_to(P(-3.45, -1.75))
        self.play(FadeIn(v, scale=1.2), Create(m4.accolade(dessus=True)), run_time=0.6)
        self.attendre_voix()

    # ── 03 : toutes les formes ──────────────────────────────────────────────
    def ecran_formes(self):
        self.ecran("03-formes")
        self.au_mot("toutes les formes")
        tit = self.col(self.t("Toutes les formes", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        d = Disque(3, 0, rayon=1.0, centre=P(-3.6, 1.45))
        g = Grille(2, 4, 0, cote=0.72, centre=P(-3.6, -1.5))
        f1 = EcritureFraction(2, 3, fs=72).move_to(P(1.6, 1.45))
        t1 = self.t("2 tiers", 40, JAUNE_TITRE).next_to(f1, RIGHT, buff=0.5)
        self.au_mot("2 tiers")
        self.play(FadeIn(f1, scale=1.3), FadeIn(t1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("on coupe en 3")
        self.play(d.apparaitre(0.9))
        self.au_mot("on colorie 2")
        self.play(d.colorier(range(2), lag=0.3), run_time=0.8)
        f2 = EcritureFraction(5, 8, fs=72).move_to(P(1.6, -0.9))
        t2 = self.t("5 huitièmes", 40, JAUNE_TITRE).next_to(f2, RIGHT, buff=0.5)
        self.au_mot("5 huitièmes")
        self.play(FadeIn(f2, scale=1.3), FadeIn(t2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("grille de 8")
        self.play(g.apparaitre(0.9))
        self.au_mot("on colorie 5")
        cases = [0, 2, 3, 5, 6]
        self.play(g.colorier(cases, lag=0.2), run_time=1.0)
        self.au_mot("N'importe lesquelles")
        n = self.col(self.t("n'importe lesquelles !", 36, AMBRE), -2.35)
        self.play(FadeIn(n, shift=UP * 0.15), *[Indicate(g.liste[i], color=AMBRE, scale_factor=1.15) for i in cases],
                  run_time=0.7)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4/6 : en combien de parts ?) ──────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(4, 6, fs=110).move_to(P(-3.4, 1.2))
        d = Disque(6, 0, rayon=1.0, centre=P(-3.4, -1.55))

        def avant(sc):
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "6, donne", d.apparaitre(0.8), Indicate(f.den, color=VERT_OK, scale_factor=1.4), run_time=0.8)
            sc.rep(1, "Puis on", d.colorier(range(4), lag=0.15), run_time=0.8)
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Pour représenter 4 sixièmes,", "combien de parts égales ?"],
                            ["4", "6", "10"], 1, ["6 parts égales,", "puis on en colorie 4."], mot_q="Pour",
                            avant_q=avant, autres_r=apres)

    # ── 05 : les parts doivent être égales ──────────────────────────────────
    def ecran_egales(self):
        self.ecran("05-egales")
        self.au_mot("les parts doivent")
        tit = self.t("Les parts doivent être égales !", 44, ROUGE_ERREUR).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.6)
        m = mur_inegal(centre=P(-3.0, 1.2))
        self.au_mot("coupé en 4")
        self.play(FadeIn(m.carte), LaggedStart(*[FadeIn(p, scale=0.9) for p in m.parts], lag_ratio=0.25), run_time=0.9)
        self.au_mot("pas la même taille")
        self.play(LaggedStart(*[Indicate(p, color=ORANGE_RETENUE, scale_factor=1.1) for p in m.parts], lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("La part bleue")
        self.play(m.parts[3].animate.set_fill(BLEU_PART, 1), run_time=0.5)
        self.au_mot("1 quart du mur")
        f = EcritureFraction(1, 4, fs=64, couleur=ROUGE_ERREUR).next_to(m, RIGHT, buff=0.6)
        bon = Barre(4, 1, largeur=m.parts.width, hauteur=0.9, centre=P(-3.0, -1.1))
        un = self.t("1 quart", 36, VERT_OK).next_to(bon, RIGHT, buff=0.6)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.play(Create(croix(f, sw=6).set_stroke(opacity=0.85)), FadeIn(bon), FadeIn(un, shift=RIGHT * 0.2),
                  run_time=0.6)
        tir = DashedLine(P(bon.x_trait(3), m.parts.get_top()[1] + 0.15), P(bon.x_trait(3), bon.contour.get_bottom()[1] - 0.15),
                         color=AMBRE, stroke_width=5, dash_length=0.12)
        self.play(Create(tir), run_time=0.5)
        self.au_mot("des parts inégales")
        r = self.t("Parts inégales : pas de fraction !", 38, ROUGE_ERREUR).move_to(P(0, -2.6))
        self.play(FadeIn(r, scale=1.1), run_time=0.45)
        self.play(Create(self.encadrer(r, couleur=ROUGE_ERREUR)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : petites parts (2/3 de 12 carreaux) ─────────────────────────────
    def ecran_fines(self):
        self.ecran("06-fines")
        self.au_mot("Plus difficile")
        tit = self.col(self.t("Plus difficile", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        b = Barre(12, 0, largeur=5.6, hauteur=0.8, vide=MUR, centre=P(-3.3, 0.9))
        self.au_mot("2 tiers")
        l0 = self.col(self.ligne([("2 tiers", JAUNE_TITRE), ("d'un mur", WHITE)], 40), 2.05)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("12 carreaux")
        self.play(b.apparaitre(1.0))
        self.au_mot("12 divisé par 3")
        l1 = self.col(self.t("12 ÷ 3 = 4", 42), 1.05)
        gr = b.groupes(4)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.play(LaggedStart(*[Create(r) for r in gr], lag_ratio=0.3), run_time=0.9)
        self.au_mot("1 tiers, c'est 4")
        l2 = self.col(self.ligne([("1 tiers", BLEU_CALCUL), ("= 4 carreaux", WHITE)], 40), 0.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(gr[0], color=WHITE), run_time=0.6)
        self.au_mot("2 fois 4")
        l3 = self.col(self.ligne([("2 × 4 = 8", VERT_OK), ("carreaux", WHITE)], 42), -0.9)
        b.colories = list(range(8))  # l'accolade couvre les 8 parts à peindre (posée avec la ligne « 2 × 4 = 8 »)
        acc = b.accolade("8 carreaux sur 12", dessus=False, fs=32)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), FadeIn(acc, shift=UP * 0.15), run_time=0.4)
        self.play(b.colorier(range(8), lag=0.08), run_time=1.0)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (1/2 de 10 carreaux) ────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Barre(10, 0, largeur=5.4, hauteur=0.75, vide=MUR, centre=P(-3.3, 0.3))
        self.add(b)

        def apres(sc):
            gr = b.groupes(5)
            sc.rep(0, "10 divisé", LaggedStart(*[Create(r) for r in gr], lag_ratio=0.4), run_time=0.8)
            sc.rep(1, "la moitié", b.colorier(range(5), lag=0.1), run_time=0.8)
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Un mur a 10 carreaux.", "Combien en peindre", "pour 1 demi ?"],
                            ["2", "5", "1"], 1, ["10 ÷ 2 = 5 :", "la moitié des carreaux."], mot_q="Un mur",
                            autres_r=apres)

    # ── 08 : défi (3/5 d'une fresque de 15 carreaux) ────────────────────────
    def fresque(self):
        return Grille(5, 3, 0, cote=0.62, vide=MUR, centre=P(-3.4, 0.15))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        g = self.fresque()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("15 carreaux")
        l1 = self.col(self.ligne([("15", BLEU_CALCUL), ("carreaux égaux", WHITE)], 40), 2.0)
        self.play(g.apparaitre(1.0), FadeIn(l1, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("3 cinquièmes")
        l2 = self.col(self.ligne([("3 cinquièmes", JAUNE_P), ("en jaune", WHITE)], 40), 1.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Combien de carreaux")
        l3 = self.col(self.t("Combien de carreaux ?", 40, ORANGE_RETENUE), 0.1)
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        g = self.fresque()
        self.add(g)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("15 divisé par 5")
        l1 = self.col(self.t("15 ÷ 5 = 3", 42), 2.0)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        lignes = g.entourer_lignes()
        self.play(LaggedStart(*[Create(r) for r in lignes], lag_ratio=0.2), run_time=0.9)
        self.au_mot("1 cinquième, c'est 3")
        l2 = self.col(self.ligne([("1 cinquième", BLEU_CALCUL), ("= 3 carreaux", WHITE)], 40), 1.05)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(lignes[0], color=WHITE), run_time=0.6)
        self.au_mot("3 fois 3")
        l3 = self.col(self.ligne([("3 × 3 = 9", VERT_OK), ("carreaux", WHITE)], 42), 0.1)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(g.colorier(range(9), couleur=JAUNE_P, lag=0.08), run_time=1.0)
        self.au_mot("Maëlys peint 9")
        l4 = self.col(self.ligne([("9", JAUNE_P), ("carreaux sur", WHITE), ("15", WHITE)], 42), -0.9)
        self.play(FadeIn(l4, scale=1.1), run_time=0.45)
        self.play(Create(self.encadrer(l4)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : 3/5 = 9/15 (la suite : fractions égales) ───────────────────────
    def ecran_chaine(self):
        self.ecran("09-chaine")
        b5 = Barre(5, 3, largeur=5.4, hauteur=0.7, couleur=JAUNE_P, vide=MUR, centre=P(-3.3, 1.3))
        b15 = Barre(15, 9, largeur=5.4, hauteur=0.7, couleur=JAUNE_P, vide=MUR, centre=P(-3.3, -0.5))
        f1, f2 = EcritureFraction(3, 5, fs=80), EcritureFraction(9, 15, fs=80)
        eg = egalite(f1, f2, buff=0.6).move_to(P(3.3, 0.4))
        self.au_mot("3 cinquièmes")
        self.play(b5.apparaitre(0.6), FadeIn(f1, scale=1.3), run_time=0.6)
        self.au_mot("9 quinzièmes")
        self.play(b15.apparaitre(0.6), FadeIn(f2, scale=1.3), run_time=0.6)
        self.au_mot("la même surface")
        tir = b5.fin_coloriee(vers=-(b5.contour.get_bottom()[1] - b15.contour.get_bottom()[1]) - 0.2)
        self.play(Create(tir), run_time=0.7)
        self.au_mot("deux fractions égales")
        self.play(FadeIn(eg[1], scale=1.5), run_time=0.4)
        self.play(Create(self.encadrer(eg)), run_time=0.4)
        self.au_mot("la prochaine vidéo")
        s = self.t("la suite : la prochaine vidéo !", 34, AMBRE).move_to(P(0, -2.4))
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = Barre(4, 3, largeur=4.2, hauteur=0.65, vide=MUR, etiquette="frac", fs=34, centre=P(-3.6, 0.9))
        g = Grille(5, 3, 9, cote=0.4, couleur=JAUNE_P, vide=MUR, centre=P(-3.6, -1.6))
        fig = VGroup(b, g)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Le dénominateur :", "en combien de parts égales."),
                                                         ("Le numérateur :", "combien on en colorie."),
                                                         ("Les parts doivent", "être égales."),
                                                         ("Avec de petites parts,", "on fait des groupes.")], fs=36)
        self.montrer2(lignes[0], "Le dénominateur", "en combien")
        self.montrer2(lignes[1], "Le numérateur", "combien de parts on")
        self.montrer2(lignes[2], "Les parts doivent", "être égales")
        self.montrer2(lignes[3], "Avec de petites", "on fait des")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_formes()
        self.ecran_question1()
        self.ecran_egales()
        self.ecran_fines()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class FracRepresenter6e(FracRepresenterBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
