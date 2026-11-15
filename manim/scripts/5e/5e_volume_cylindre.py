# 5e_volume_cylindre.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V5 : LE VOLUME DU CYLINDRE
# (micro volume_cylindre, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 5e-volume-cylindre-short (la canette, 3,14 × 3 × 3 × 10 = 282,6 cm³).
# Décor et métier : Hakim, INGÉNIEUR DE L'EAU (réservoirs d'eau potable ; centres sciences, corps-sante) — matrice.
# Mapping micro → écrans : 02 (un disque empilé tranche après tranche ; comme le prisme : aire de la base × hauteur),
# 03 (le disque : π × rayon × rayon ; 3,14 × 3 × 3 = 28,26 cm² ; × 5 = 141,3 cm³), 04 (méthode :
# π × rayon × rayon × hauteur), 06 (piège : le rayon, pas le diamètre ; rayon × rayon, pas rayon × 2),
# questions 05 (A : 20 × 6 = 120 cm³) et 07 (B : 3,14 × 2 × 2 = 12,56 ; × 10 = 125,6 cm³),
# défi 08 (3,14 × 2 × 2 = 12,56 m² ; × 3 = 37,68 m³ ; × 1 000 = 37 680 litres).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-cylindre.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_cylindre_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-cylindre).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_cylindre.py VolumeCylindre5e
# Sortie finale : manim/sorties/5e/maths/volume/05-volume-cylindre/eleveai-maths-5e-volume-cylindre.mp4
# Couleurs (consigne du 15/11) : la hauteur en VERT (HAUTEUR_C, celle de la série), le rayon en BLEU (BASE_C), tracé
# sur un liseré sombre pour rester lisible sur le disque bleu clair ; le diamètre du piège en ROUGE (PENCHE_C), barré.
# Les milliers (« 1 000 », « 37 680 ») : l'audit lit « 1000 » à l'écran et « 1 000 » dans la voix → hors audit,
# posés à la main au mot exact.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

RAYON_C = BASE_C                           # le rayon (sur la base, le disque) : bleu, comme la base
HAUT_C = HAUTEUR_C                         # la hauteur : verte, comme dans toute la série
DIAM_C = PENCHE_C                          # le diamètre (le piège) : rouge, barré
SOUS_C = "#0c4a6e"                         # le liseré sombre sous le rayon (bleu sur disque bleu clair)
DESSUS_P = "#e0f2fe"                       # le disque du haut, très pâle quand le rayon bleu y est tracé
EAU_C, EAU_D = "#0ea5e9", "#bae6fd"        # l'eau dans le réservoir
TR_A, TR_B = "#38bdf8", "#0284c7"          # les tranches empilées (deux bleus)


def rayon_haut(c, couleur=RAYON_C, sw=9):
    """Le rayon tracé sur le disque du HAUT du cylindre c : du centre vers la droite."""
    o = c.o + UP * c.h * c.u
    sous = Line(o, o + RIGHT * c.r * c.u, color=SOUS_C, stroke_width=sw + 6)
    ray = Line(o, o + RIGHT * c.r * c.u, color=couleur, stroke_width=sw)
    pt = Dot(o, radius=0.07, color=couleur, stroke_color=SOUS_C, stroke_width=3)
    return VGroup(sous, ray, pt)


def hauteur_de(c, couleur=HAUT_C, sw=7, ecart=0.16):
    """La hauteur du cylindre c : un trait ambre à droite, avec deux petits taquets."""
    x = c.o[0] + c.r * c.u + ecart
    b, h = P(x, c.o[1]), P(x, c.o[1] + c.h * c.u)
    return VGroup(Line(b, h, color=couleur, stroke_width=sw),
                  Line(b + LEFT * 0.1, b + RIGHT * 0.1, color=couleur, stroke_width=sw),
                  Line(h + LEFT * 0.1, h + RIGHT * 0.1, color=couleur, stroke_width=sw))


def etiquette_rayon(c, s, fs=28, couleur=RAYON_C):
    """La mesure du rayon, AU-DESSUS du disque du haut (hors du trait), hors audit."""
    o = c.o + UP * c.h * c.u
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    hors_audit(t)
    return t.move_to(o + RIGHT * c.r * c.u / 2 + UP * (c.r * c.u * 0.32 + 0.3))


def etiquette_hauteur(c, s, fs=28, couleur=HAUT_C):
    """La mesure de la hauteur, à droite du trait de hauteur, hors audit."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    hors_audit(t)
    return t.next_to(P(c.o[0] + c.r * c.u + 0.3, c.o[1] + c.h * c.u / 2), RIGHT, buff=0.08)


def tranches(r, h, n, u, o):
    """Le cylindre en n tranches (des disques épais), de bas en haut, deux bleus alternés."""
    g = VGroup()
    for k in range(n):
        s = cylindre(r, h / n, u, o + UP * k * (h / n) * u, corps=TR_A if k % 2 == 0 else TR_B, dessus="#bae6fd")
        if k:
            s.bas[1].set_stroke(opacity=0)  # le pointillé arrière : seulement sous la première tranche
        g.add(s)
    return g


class VolumeCylindre5e(Paysage5e):
    nom_voix = "5e-volume-cylindre"
    fichier_marques = "5e_volume_cylindre_marques.json"
    ceinture = "bleue"

    def col(self, mob, y, xl=None):
        """col() du commun, mais dit tout haut quand une ligne est trop large (il la rétrécit en silence)."""
        w0 = mob.width
        r = super().col(mob, y, xl)
        if mob.width < w0 - 1e-3:
            print(f"RETRECI {getattr(self, '_cle_voix', '?')} {w0:.2f} → {mob.width:.2f}", flush=True)
        return r

    def t_hors(self, s, fs, couleur):
        """Un texte hors audit (un millier écrit « 1 000 »), à poser soi-même au mot."""
        t = self.t(s, fs, couleur)
        return hors_audit(t)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume du cylindre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume du cylindre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien d'eau dans", "un réservoir rond ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = cylindre(1.0, 1.6, 0.95, P(3.6, -0.55))
        self.au_mot("Combien d'eau")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(c, scale=0.8), run_time=0.5)
        self.au_mot("un réservoir rond")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(c.haut, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hakim, ingénieur de l'eau ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ha = hakim(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Hakim")
        nom = self.t("Hakim", 40, BLEU_CALCUL).next_to(ha, UP, buff=0.25)
        self.play(FadeIn(ha, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("ingénieur de l'eau")
        met = self.bloc(["ingénieur", "de l'eau"], 28, BLEU_CALCUL).next_to(ha, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        l1 = self.bloc(["Il construit des réservoirs", "pour l'eau potable", "d'une ville."], 34)
        self.col(l1, 1.6, -0.8)
        self.au_mot("Il construit des réservoirs")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("pour l'eau potable")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("d'une ville")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        c = cylindre(1.6, 3.4, 0.55, P(-2.65, -1.2))
        l2 = self.bloc(["Ses réservoirs sont ronds :", "ce sont des cylindres."], 36, JAUNE_TITRE)
        self.col(l2, -0.55, -0.8)
        self.au_mot("Ses réservoirs sont ronds")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(c, shift=UP * 0.2), run_time=0.5)
        self.au_mot("ce sont des cylindres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 02 : un disque empilé, tranche après tranche ───────────────────────
    def ecran_empiler(self):
        self.ecran("02-empiler")
        r, h, n, u, o = 2.0, 4.8, 6, 0.62, P(-3.9, -2.0)
        g = tranches(r, h, n, u, o)
        l1 = self.t("Un disque qu'on empile,", 36, WHITE)
        self.col(l1, 2.6, -1.3)
        self.au_mot("c'est un disque")
        self.play(FadeIn(g[0], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("qu'on empile")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.t("tranche après tranche,", 36, WHITE)
        self.col(l2, 1.9, -1.3)
        self.au_mot("tranche après tranche")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s, shift=DOWN * 0.35) for s in g[1:4]], lag_ratio=0.35), run_time=0.8)
        l3 = self.t("jusqu'en haut.", 36, WHITE)
        self.col(l3, 1.2, -1.3)
        self.au_mot("jusqu'en haut")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s, shift=DOWN * 0.35) for s in g[4:]], lag_ratio=0.4), run_time=0.6)
        l4 = self.t("Comme le prisme :", 36, JAUNE_TITRE)
        self.col(l4, 0.2, -1.3)
        self.au_mot("Comme le prisme")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        lv = self.ligne([("volume", BLEU_D), ("= aire de la base", BASE_C)], 36, buff=0.2)
        self.col(lv, -0.6, -1.3)
        self.au_mot("volume")
        self.play(FadeIn(lv[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("aire de la base")
        self.play(FadeIn(lv[1], shift=UP * 0.1), Indicate(g[0], color=BASE_C, scale_factor=1.06), run_time=0.45)
        c = cylindre(r, h, u, o)
        hh = hauteur_de(c)
        lh = self.t("× la hauteur.", 36, HAUT_C)
        self.col(lh, -1.4, -1.3)
        self.au_mot("fois la hauteur")
        self.play(FadeIn(lh, shift=UP * 0.1), Create(hh), run_time=0.45)
        self.attendre_voix()

    # ── 03 : le disque (3,14 × 3 × 3 = 28,26 ; × 5 = 141,3) ─────────────────
    def ecran_disque(self):
        self.ecran("03-disque")
        c = cylindre(3, 5, 0.5, P(-3.9, -1.9), dessus=DESSUS_P)
        self.add(c)
        l1 = self.t("La base est un disque.", 34, BASE_C)
        self.col(l1, 2.75, -0.8)
        self.au_mot("La base est un disque")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(c.haut, color=BASE_C, scale_factor=1.05), run_time=0.45)
        l2 = self.ligne([("Son aire :", WHITE), ("π × rayon × rayon", RAYON_C)], 34, buff=0.2)
        self.col(l2, 2.05, -0.8)
        ray = rayon_haut(c)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pi fois le rayon fois le rayon")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ray), run_time=0.45)
        l3 = self.t("Un rayon de 3 cm :", 34, RAYON_C)
        self.col(l3, 1.2, -0.8)
        e3 = etiquette_rayon(c, "3 cm")
        self.au_mot("Un rayon de 3 centimètres")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(e3, scale=1.2), run_time=0.4)
        l4 = self.ligne([("3,14 × 3 × 3", BLEU_D), ("= 28,26 cm²", VERT_OK)], 38, buff=0.22)
        self.col(l4, 0.45, -0.8)
        self.au_mot("3,14")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        e28 = sur_fond(m2("28,26 cm²", 26, WHITE)).move_to(c.o + DOWN * (c.r * c.u * 0.32 + 0.38))
        self.au_mot("28,26 centimètres carrés")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(e28, scale=1.2), run_time=0.35)
        l5 = self.t("Avec 5 cm de haut :", 34, HAUT_C)
        self.col(l5, -0.4, -0.8)
        hh = hauteur_de(c)
        e5 = etiquette_hauteur(c, "5 cm")
        self.au_mot("Avec 5 centimètres de haut")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(hh), FadeIn(e5), run_time=0.45)
        l6 = self.ligne([("28,26 × 5", BLEU_D), ("= 141,3 cm³", VERT_OK)], 38, buff=0.22)
        self.col(l6, -1.15, -0.8)
        self.au_mot("28,26 fois 5")
        self.play(FadeIn(l6[0], shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.4)
        self.au_mot("141,3")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.35)
        self.insister(l6[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        c = cylindre(1.6, 3.6, 0.6, P(-4.7, -1.9), dessus=DESSUS_P)
        ray = rayon_haut(c)
        hh = hauteur_de(c)
        self.add(c)
        l1 = self.t("Volume du cylindre", 40, WHITE)
        gauche(l1, -2.3, 1.7)
        self.au_mot("volume du cylindre")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        l2 = self.ligne([("= π", WHITE), ("× rayon", RAYON_C), ("× rayon", RAYON_C)], 44, buff=0.25)
        gauche(l2, -2.3, 0.75)
        self.au_mot("égale pi")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois rayon")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ray), run_time=0.3)
        self.au_mot("fois rayon", 2)
        self.play(FadeIn(l2[2], shift=UP * 0.1), Indicate(ray, color=RAYON_C, scale_factor=1.15), run_time=0.3)
        l3 = self.t("× hauteur", 44, HAUT_C)
        gauche(l3, -2.3, -0.2)
        self.au_mot("fois hauteur")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(hh), run_time=0.35)
        cadre = SurroundingRectangle(VGroup(l1, l2, l3), color=VERT_OK, buff=0.25, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = cylindre(2, 3, 0.5, P(-3.6, 0.15))
        hh = hauteur_de(c)
        e6 = etiquette_hauteur(c, "6 cm")
        e20 = sur_fond(m2("20 cm²", 26, WHITE)).move_to(c.o + UP * c.h * c.u)

        def autres_q(sc):
            sc.play(FadeIn(c), Create(hh), FadeIn(e6), FadeIn(e20), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Cylindre : base 20 cm²,", "hauteur 6 cm.", "Quel est son volume ?"],
                             [self.choix("120 cm³"), self.choix("26 cm³"), self.choix("60 cm³")], 0,
                             ["Aire de la base", "× hauteur :", "20 × 6 = 120 cm³."],
                             -0.6, couper={2: ("20 × 6", "= 120 cm³.")},
                             mot_q="Un cylindre", avant_q=autres_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        ctr, R = P(-4.1, 0.3), 1.55
        disque = Circle(radius=R, fill_color="#bae6fd", fill_opacity=1, stroke_color=SOUS_C, stroke_width=5)
        disque.move_to(ctr)
        self.add(disque)
        ray = VGroup(Line(ctr, ctr + R * P(0.6, 0.8), color=SOUS_C, stroke_width=14),
                     Line(ctr, ctr + R * P(0.6, 0.8), color=RAYON_C, stroke_width=8),
                     Dot(ctr, radius=0.08, color=RAYON_C, stroke_color=SOUS_C, stroke_width=3))
        lr = sur_fond(self.t("rayon", 28, RAYON_C))
        hors_audit(lr)
        lr.move_to(ctr + R * P(0.6, 0.8) + P(0.75, 0.2))
        diam = Line(ctr + LEFT * R, ctr + RIGHT * R, color=DIAM_C, stroke_width=8)
        ld = self.t("diamètre", 28, DIAM_C)
        hors_audit(ld)
        ld.next_to(disque, DOWN, buff=0.25)
        barre_d = Line(ld.get_corner(DL), ld.get_corner(UR), color=DIAM_C, stroke_width=6)
        l1 = self.bloc(["On prend le rayon,", "pas le diamètre."], 38)
        l1[0].set_color(RAYON_C)
        l1[1].set_color(DIAM_C)
        self.col(l1, 1.8, -1.2)
        self.au_mot("On prend le rayon")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(ray), FadeIn(lr), run_time=0.4)
        self.au_mot("pas le diamètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(diam), FadeIn(ld), run_time=0.4)
        self.play(Create(barre_d), diam.animate.set_stroke(opacity=0.35), run_time=0.35)
        l2 = self.bloc(["Et c'est rayon × rayon,", "pas rayon × 2."], 38)
        l2[0].set_color(RAYON_C)
        l2[1].set_color(DIAM_C)
        self.col(l2, -0.4, -1.2)
        self.au_mot("Et c'est rayon fois rayon")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas rayon fois 2")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        barre = Line(l2[1].get_corner(DL) + RIGHT * 0.9, l2[1].get_corner(UR), color=DIAM_C, stroke_width=6)
        self.play(Create(barre), run_time=0.3)
        self.insister(l2[0], 1.06, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = cylindre(2, 10, 0.3, P(-3.9, -0.15), dessus=DESSUS_P)
        ray = rayon_haut(c, sw=8)
        e2 = etiquette_rayon(c, "2 cm", 26)
        hh = hauteur_de(c)
        e10 = etiquette_hauteur(c, "10 cm", 26)

        def autres_q(sc):
            sc.play(FadeIn(c), Create(ray), FadeIn(e2), Create(hh), FadeIn(e10), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Cylindre : rayon 2 cm,", "hauteur 10 cm. Volume ?", "On prend π = 3,14."],
                             [self.choix("502,4 cm³"), self.choix("125,6 cm³"), self.choix("62,8 cm³")], 1,
                             ["Le disque :", "3,14 × 2 × 2 = 12,56.", "× 10 : 125,6 cm³.",
                              "502,4 : le diamètre", "pris à la place du rayon."],
                             -0.45, couper={1: ("3,14 × 2 × 2", "= 12,56."), 2: ("× 10", ": 125,6 cm³."),
                                            3: ("502,4 :", "le diamètre")},
                             mot_q="Un cylindre", avant_q=autres_q)

    # ── 08 : le défi (le réservoir de Hakim) ────────────────────────────────
    def pause_defi(self, y=-2.4, marge=2.0, x=-2.4):
        """« Mets pause, et cherche ! » sous les lignes du défi, à gauche (x = −2,4) : à XL, il touchait Ti Margo
        (copie de 5e_volume_pave.py) ; sous le réservoir, qui s'arrête à x = −2,9 et y = −1,95."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), x, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def reservoir(self):
        return cylindre(2, 3, 0.62, P(-4.1, -1.55), dessus=DESSUS_P)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        c = self.reservoir()
        ray, hh = rayon_haut(c), hauteur_de(c)
        x = -0.6
        l0 = self.t("Un réservoir de Hakim :", 34, WHITE)
        self.col(l0, 2.2, x)
        self.au_mot("Un réservoir de Hakim")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(c, shift=UP * 0.2), run_time=0.4)
        l1 = self.t("un rayon de 2 m,", 34, RAYON_C)
        self.col(l1, 1.5, x)
        e2 = etiquette_rayon(c, "2 m")
        self.au_mot("un rayon de 2 mètres")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(ray), FadeIn(e2), run_time=0.4)
        l2 = self.t("une hauteur de 3 m.", 34, HAUT_C)
        self.col(l2, 0.8, x)
        e3 = etiquette_hauteur(c, "3 m")
        self.au_mot("une hauteur de 3 mètres")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(hh), FadeIn(e3), run_time=0.4)
        l3 = self.t("Quel est son volume ?", 36, JAUNE_TITRE)
        self.col(l3, 0.05, x)
        self.au_mot("Quel est son volume")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        l4 = self.t("Combien de litres d'eau ?", 36, JAUNE_TITRE)
        self.col(l4, -0.7, x)
        self.au_mot("combien de litres d'eau")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        l5 = self.ligne([("1 m³,", EAU_D), ("c'est", WHITE)], 34, buff=0.2)
        l5b = self.t_hors("1 000 litres.", 34, EAU_D)
        l5.add(l5b)
        l5b.next_to(l5[1], RIGHT, buff=0.2)
        aligner_base([l5[0], l5[1], l5b])
        self.col(l5, -1.45, x)
        self.au_mot("1 mètre cube")
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000")
        self.play(FadeIn(l5b, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        c = self.reservoir()
        ray, hh = rayon_haut(c), hauteur_de(c)
        e2, e3 = etiquette_rayon(c, "2 m"), etiquette_hauteur(c, "3 m")
        self.add(c, ray, hh, e2, e3)
        x = -0.6
        l0 = self.t("Le disque :", 34, BASE_C)
        self.col(l0, 2.2, x)
        self.au_mot("Le disque")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(c.haut, color=BASE_C, scale_factor=1.05), run_time=0.35)
        l1 = self.ligne([("3,14 × 2 × 2", BLEU_D), ("= 12,56 m²", VERT_OK)], 36, buff=0.22)
        self.col(l1, 1.5, x)
        self.au_mot("3,14")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("12,56")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("× 3 :", BLEU_D), ("37,68 m³", VERT_OK)], 36, buff=0.22)
        self.col(l2, 0.8, x)
        self.au_mot("Fois 3")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(hh, color=HAUT_C, scale_factor=1.05), run_time=0.35)
        self.au_mot("37,68")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("En litres :", 34, EAU_D)
        self.col(l3, 0.05, x)
        self.au_mot("En litres")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l4a = self.t("37,68", 36, BLEU_D)
        l4b = self.t_hors("× 1 000", 36, BLEU_D)
        l4 = VGroup(l4a, l4b).arrange(RIGHT, buff=0.2)
        aligner_base([l4a, l4b])
        self.col(l4, -0.65, x)
        self.au_mot("37,68", 2)
        self.play(FadeIn(l4a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 1 000")
        self.play(FadeIn(l4b, shift=UP * 0.1), run_time=0.3)
        res = self.gros("37 680 litres", fs=44)
        hors_audit(res)
        self.col(res, -1.6, x)
        eau = cylindre(2, 0.05, 0.62, c.o, corps=EAU_C, dessus=EAU_D, op=0.9)
        eau_p = cylindre(2, 3, 0.62, c.o, corps=EAU_C, dessus=EAU_D, op=0.9)
        self.au_mot("37 680")
        self.add(eau)
        self.play(FadeIn(res, scale=1.2), Transform(eau, eau_p), run_time=0.8)
        self.add(ray, hh, e2, e3)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = cylindre(1.5, 3.2, 0.6, ORIGIN, dessus=DESSUS_P)
        fig = VGroup(c, rayon_haut(c), hauteur_de(c))
        lignes = self.finale_gauche(fig, textes=[
            ("Un cylindre se calcule", "comme un prisme :"),
            ("aire de la base", "× hauteur."),
            ("Sa base est un disque :", "π × rayon × rayon.")], fs=32)
        self.add(fig)
        self.au_mot("Un cylindre se calcule")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("aire de la base")
        self.montrer_ligne(lignes[1])
        self.au_mot("Sa base est un disque")
        self.montrer_ligne(lignes[2], Indicate(c.haut, color=BASE_C, scale_factor=1.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_empiler()
        self.ecran_disque()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
