# 5e_volume_comprendre.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V2 : COMPRENDRE LE VOLUME
# (micro volume_comprendre, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : 5e-volume-comprendre-short (la valise de Ti Margo : 3 × 2 = 6 boîtes par couche, 2 couches = 12).
# Décor et métier : Tiago, LOGISTICIEN (matrice 5e volume_solide ; centres transports, argent-budget).
# Mapping micro → écrans : 02 (des cubes de 1 dm rangés dans une caisse : une couche de 4 sur 3 = 12, deux couches
# = 24), 03 (chaque cube = 1 dm³ ; 24 cubes = 24 dm³), 04 (méthode : une aire se compte en carrés, à plat ; un volume
# en cubes ; cm³, dm³, m³), 06 (piège : le petit 2 = aire, à plat ; le petit 3 = volume, trois dimensions),
# questions 05 (A : 12 cubes de 1 cm³ = 12 cm³) et 07 (C : 2 × 3 = 6 par couche, 4 couches = 24 cm³),
# défi 08 (conteneur 6 × 2 × 2 m : 12 caisses par couche, 24 caisses ; 24 × 50 = 1 200 kg).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-comprendre.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_comprendre_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-comprendre).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_comprendre.py VolumeComprendre5e
# Sortie finale : manim/sorties/5e/maths/volume/02-volume-comprendre/eleveai-maths-5e-volume-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

CUBE = dict(face=PAVE_FACE, dessus=PAVE_DESSUS, cote=PAVE_COTE, bord=PAVE_BORD)            # le cube-unité (bleu)
BOIS = dict(face="#d6a76c", dessus="#ead1a4", cote="#b0844d", bord="#5c3612")              # la caisse en bois
TOLE = dict(face="#ea580c", dessus="#fb923c", cote="#c2410c", bord="#7c2d12")              # le conteneur
BOIS_C, TOLE_C = "#e0b47c", "#fb923c"
CARRE_C, CARRE_B = "#4ade80", "#14532d"                                                    # le carré (aire, à plat)


def cube_en(x, y, z, u, o, couleurs=CUBE, sw=3):
    """Le cube-unité posé à la case (x, y, z) d'un solide de coin avant-bas-gauche o. Son z_index range les cubes
    dans l'ordre du peintre (du fond vers l'avant, du bas vers le haut, de gauche à droite), quel que soit l'ordre
    où on les fait paraître."""
    c = pave(1, 1, 1, u, point3(o, u, x, y, z), sw=sw, **couleurs)
    c.set_z_index(1 + (9 - y) * 100 + z * 10 + x)
    return c


def couche(l, p, z, u, o, couleurs=CUBE, sw=3):
    """Une couche de l × p cubes à la hauteur z, rangée par rangées : couche[j] = la rangée de profondeur j."""
    return VGroup(*[VGroup(*[cube_en(x, j, z, u, o, couleurs, sw) for x in range(l)]) for j in range(p)])


def caisse(l, p, h, u, o, couleurs=BOIS, sw=5, arete=None):
    """Une caisse ouverte (vide) de l × p × h : les parois en transparence derrière les cubes, les arêtes devant.
    Renvoie (fond, aretes)."""
    fond = pave(l, p, h, u, o, sw=0, op=0.22, **{k: v for k, v in couleurs.items() if k != "bord"})
    fond.set_z_index(0)
    aretes = pave(l, p, h, u, o, sw=sw, op=0, bord=arete or couleurs["bord"])
    aretes.set_z_index(950)
    return fond, aretes


def conteneur(l, p, h, u, o):
    """Le conteneur fermé (tôle orange, nervures verticales sur la face avant)."""
    v = pave(l, p, h, u, o, sw=5, **TOLE)
    nerv = VGroup(*[Line(v.pt(x, 0, 0.08), v.pt(x, 0, h - 0.08)) for x in [k * 0.5 for k in range(1, 2 * l)]])
    nerv.set_stroke(TOLE["bord"], 2)
    v.add(nerv)
    return v


def au_dessus(m):
    m.set_z_index(1000)
    return m


class VolumeComprendre5e(Paysage5e):
    nom_voix = "5e-volume-comprendre"
    fichier_marques = "5e_volume_comprendre_marques.json"
    ceinture = "jaune"

    # la caisse de Tiago (écrans 02 et 03) : 4 × 3 × 2 cubes de 1 dm
    U = 0.72
    O = P(-6.0, -2.0)

    def cl(self, mob, y, xl=None):
        """col() du commun, mais une ligne rétrécie est SIGNALÉE (BORD) au lieu d'être réduite en silence."""
        w = mob.width
        r = self.col(mob, y, xl)
        if mob.width < w - 1e-3:
            print(f"BORD col rétrécie : {w:.2f} → {mob.width:.2f} (y = {y})")
        return r

    def gch(self, m, x, y):
        gauche(m, x, y)
        if m.get_right()[0] > 6.7:
            print(f"BORD gauche() dépasse : bord droit {m.get_right()[0]:.2f} (y = {y})")
        return m

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de place", "prend un objet ?"], 40)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        f = pave(3, 2, 2, 0.55, P(2.6, -0.45), grille=True)
        self.au_mot("Combien de place")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(f, scale=0.8), run_time=0.5)
        self.au_mot("prend un objet")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(f, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tiago, logisticien ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ti = tiago(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Tiago")
        nom = self.t("Tiago", 40, BLEU_CALCUL).next_to(ti, UP, buff=0.25)
        self.play(FadeIn(ti, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("logisticien")
        met = self.t("logisticien", 30, BLEU_CALCUL).next_to(ti, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        l1 = self.ligne([("Il remplit des camions", WHITE), ("et des conteneurs.", TOLE_C)], 32, buff=0.22)
        l1.move_to(P(0.6, 2.85))
        self.au_mot("des camions")
        self.play(FadeIn(l1[0], shift=DOWN * 0.1), run_time=0.4)
        cont = conteneur(6, 2, 2, 0.48, P(-3.35, -0.75))
        self.au_mot("des conteneurs")
        self.play(FadeIn(l1[1], shift=DOWN * 0.1), FadeIn(cont, shift=UP * 0.2), run_time=0.5)
        l2 = self.bloc(["Son problème", "de chaque jour :"], 36, WHITE)
        self.cl(l2, 1.05, 0.6)
        self.au_mot("Son problème de chaque jour")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.bloc(["combien de caisses", "vont rentrer ?"], 40, JAUNE_TITRE)
        self.cl(l3, -0.6, 0.6)
        qm = self.t("?", 60, JAUNE_TITRE)
        hors_audit(qm)
        sur_fond(qm).move_to(cont.pt(3, 0, 1))
        self.au_mot("combien de caisses")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("vont rentrer")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(qm, scale=1.4), run_time=0.45)
        self.attendre_voix()

    # ── 02 : des cubes de 1 dm dans la caisse (4 sur 3 = 12 ; 2 couches = 24) ─
    def cube_temoin(self):
        """Le cube-unité posé à part, en haut à droite de la caisse, avec ses côtés de 1 dm."""
        c = pave(1, 1, 1, 0.9, P(-2.75, 1.3))
        c1 = cote(Line(c.pt(0, 0, 0), c.pt(1, 0, 0)), "1 dm", DOWN, fs=28, couleur=BLEU_CALCUL, audit=False)
        return c, c1

    def ecran_cubes(self):
        self.ecran("02-cubes")
        u, o = self.U, self.O
        fond, aretes = caisse(4, 3, 2, u, o)
        c, c1 = self.cube_temoin()
        x = 0.3
        l0 = self.ligne([("Des cubes de", WHITE), ("1 dm", BLEU_CALCUL), ("de côté", BLEU_CALCUL)], 32, buff=0.2)
        self.cl(l0, 2.6, x)
        self.au_mot("des cubes")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(c, scale=0.8), run_time=0.4)
        self.au_mot("cubes de")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(c1), run_time=0.35)
        self.au_mot("de côté")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.t("dans une caisse.", 32, BOIS_C)
        self.cl(l1, 2.0, x)
        self.au_mot("dans une caisse")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(fond), Create(aretes), run_time=0.6)
        bas = couche(4, 3, 0, u, o)
        haut = couche(4, 3, 1, u, o)
        l2 = self.t("Une couche :", 38, JAUNE_TITRE)
        self.cl(l2, 0.95, x)
        self.au_mot("Une couche")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("4 cubes", BLEU_D), ("sur 3,", BLEU_D), ("12 cubes.", VERT_OK)], 36, buff=0.22)
        self.cl(l3, 0.25, x)
        self.au_mot("4 cubes")
        self.play(FadeIn(l3[0], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(k, shift=DOWN * 0.3) for k in bas[0]], lag_ratio=0.2), run_time=0.6)
        self.au_mot("sur 3")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(FadeIn(bas[1], shift=DOWN * 0.3), FadeIn(bas[2], shift=DOWN * 0.3), lag_ratio=0.4),
                  run_time=0.6)
        self.au_mot("12 cubes")
        self.play(FadeIn(l3[2], shift=UP * 0.1), Indicate(bas, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.45)
        l4 = self.t("Deux couches :", 38, JAUNE_TITRE)
        self.cl(l4, -0.65, x)
        self.au_mot("Deux couches")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(haut, shift=DOWN * 0.5), run_time=0.6)
        res = self.gros("24 cubes", fs=44)
        self.cl(res, -1.6, x)
        self.au_mot("24 cubes")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : 1 cube = 1 dm³ ; 24 cubes = 24 dm³ ─────────────────────────────
    def ecran_volume(self):
        self.ecran("03-volume")
        u, o = self.U, self.O
        fond, aretes = caisse(4, 3, 2, u, o)
        cubes = VGroup(couche(4, 3, 0, u, o), couche(4, 3, 1, u, o))
        c, c1 = self.cube_temoin()
        self.add(fond, cubes, aretes, c, c1)
        x = 0.3
        l1 = self.ligne([("Chaque cube, c'est", WHITE), ("1 dm³.", BLEU_CALCUL)], 34, buff=0.22)
        self.cl(l1, 2.35, x)
        self.au_mot("Chaque cube")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(c, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.5)
        self.au_mot("1 décimètre cube")
        e1 = m2("1 dm³", 30, BLEU_CALCUL).next_to(c, LEFT, buff=0.25)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e1, scale=1.2), run_time=0.4)
        l2 = self.pile([("La caisse contient", WHITE), ("24 cubes :", BLEU_D)], 38, buff=0.2)
        self.cl(l2, 1.15, x)
        self.au_mot("La caisse contient")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("24 cubes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(cubes, color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.5)
        l3 = self.t("son volume est", 38, WHITE)
        self.cl(l3, -0.05, x)
        self.au_mot("son volume est")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        res = self.gros("24 dm³", fs=48)
        self.cl(res, -1.1, x)
        self.au_mot("24 décimètres cubes")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode (aire = carrés, à plat ; volume = cubes ; cm³, dm³, m³) ─
    def ecran_methode(self):
        self.ecran("04-methode")
        g = rect_cases(4, 3, 0.42).move_to(P(-4.7, 2.0))
        l1 = self.bloc(["Une aire couvre une surface plate :", "elle se compte en carrés."], 34, CARREAU)
        self.gch(l1, -2.6, 2.0)
        self.au_mot("Une aire couvre une surface plate")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(g, scale=0.9), run_time=0.45)
        self.au_mot("elle se compte en carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(g, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        f = pave(3, 2, 2, 0.6, P(-5.55, -0.95), grille=True)
        l2 = self.bloc(["Un volume remplit un espace :", "il se compte en cubes."], 34, BLEU_D)
        self.gch(l2, -2.6, -0.25)
        self.au_mot("Un volume remplit un espace")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(f, scale=0.9), run_time=0.45)
        self.au_mot("il se compte en cubes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(f, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        l3 = self.ligne([("Il s'écrit en", WHITE), ("cm³,", VERT_OK), ("dm³,", VERT_OK), ("m³.", VERT_OK)], 42,
                        buff=0.3)
        self.gch(l3, -5.9, -2.35)
        self.au_mot("Il s'écrit en centimètres cubes")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(l3[1], scale=1.2), run_time=0.4)
        self.au_mot("en décimètres cubes")
        self.play(FadeIn(l3[2], scale=1.2), run_time=0.3)
        self.au_mot("en mètres cubes")
        self.play(FadeIn(l3[3], scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.55, P(-4.75, 0.45)
        places = [(x, y, 0) for y in range(2) for x in range(3)] + [(x, y, 1) for y in range(2) for x in range(2)] + \
                 [(0, y, 2) for y in range(2)]
        sol = VGroup(*[cube_en(x, y, z, u, o) for x, y, z in places])

        def avant(sc):
            sc.play(FadeIn(sol, shift=UP * 0.2), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un solide est fait", "de 12 cubes de 1 cm³.", "Quel est son volume ?"],
                             [self.choix("12 cm³"), self.choix("12 cm²"), self.choix("36 cm³")], 0,
                             ["12 cubes de 1 cm³ :", "12 cm³.", "Les cm²,", "c'est pour une aire."],
                             -0.35, couper={0: ("12 cubes", "de 1 cm³ :")},
                             mot_q="Un solide", avant_q=avant)

    # ── 06 : le piège (le petit 2, le petit 3) ──────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        # le petit 2 : une aire, à plat
        x = -1.9
        u2 = self.t("cm²", 64, CARRE_C)
        hors_audit(u2)
        gauche(u2, -6.1, 1.45)
        sq = Square(1.2, fill_color=CARRE_C, fill_opacity=1, stroke_color=CARRE_B, stroke_width=4)
        sq.move_to(P(-3.65, 1.45))
        l1 = self.ligne([("Le petit 2,", JAUNE_TITRE), ("c'est une aire,", CARRE_C)], 36, buff=0.22)
        self.gch(l1, x, 1.75)
        l1b = self.t("à plat.", 36, CARRE_C)
        self.gch(l1b, x, 1.1)
        self.au_mot("Le petit 2")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(u2), run_time=0.35)
        self.play(Indicate(u2[-1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.45)
        self.au_mot("c'est une aire")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(sq, scale=0.9), run_time=0.4)
        self.au_mot("à plat")
        self.play(FadeIn(l1b, shift=UP * 0.1), Indicate(sq, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.4)
        # le petit 3 : un volume, trois dimensions (chacune est une arête colorée du cube)
        u3 = self.t("cm³", 64, BLEU_CALCUL)
        hors_audit(u3)
        gauche(u3, -6.1, -1.3)
        cu = pave(1, 1, 1, 1.1, P(-4.2, -2.05), face="#94a3b8", dessus="#cbd5e1", cote="#64748b", bord="#1e293b")
        a_lo = Line(cu.pt(0, 0, 0), cu.pt(1, 0, 0), color=BLEU_CALCUL, stroke_width=12)
        a_la = Line(cu.pt(1, 0, 0), cu.pt(1, 1, 0), color=VERT_OK, stroke_width=12)
        a_ha = Line(cu.pt(0, 0, 0), cu.pt(0, 0, 1), color=JAUNE_TITRE, stroke_width=12)
        l2 = self.ligne([("Le petit 3,", JAUNE_TITRE), ("c'est un volume,", BLEU_CALCUL)], 36, buff=0.22)
        self.gch(l2, x, -0.75)
        l2b = self.t("en trois dimensions :", 36, BLEU_CALCUL)
        self.gch(l2b, x, -1.4)
        l2c = self.ligne([("longueur,", BLEU_CALCUL), ("largeur,", VERT_OK), ("hauteur.", JAUNE_TITRE)], 36,
                         buff=0.25)
        self.gch(l2c, x, -2.1)
        self.au_mot("Le petit 3")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(u3), run_time=0.35)
        self.play(Indicate(u3[-1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.45)
        self.au_mot("c'est un volume")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(cu, scale=0.9), run_time=0.4)
        self.au_mot("en trois dimensions")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.35)
        self.au_mot("longueur")
        self.play(FadeIn(l2c[0], shift=UP * 0.1), Create(a_lo), run_time=0.3)
        self.au_mot("largeur")
        self.play(FadeIn(l2c[1], shift=UP * 0.1), Create(a_la), run_time=0.3)
        self.au_mot("hauteur")
        self.play(FadeIn(l2c[2], shift=UP * 0.1), Create(a_ha), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = pave(3, 2, 4, 0.42, P(-4.3, 0.45), grille=True)
        c3 = cote(Line(f.pt(0, 0, 0), f.pt(3, 0, 0)), "3 cm", DOWN, fs=26, couleur=BLEU_CALCUL, audit=False,
                  buff=0.12)
        c4 = cote(Line(f.pt(0, 0, 0), f.pt(0, 0, 4)), "4 cm", LEFT, fs=26, couleur=BLEU_CALCUL, audit=False)
        c2 = cote(Line(f.pt(3, 0, 0), f.pt(3, 2, 0)), "2 cm", RIGHT, fs=26, couleur=BLEU_CALCUL, audit=False,
                  buff=0.12)

        def avant(sc):
            sc.play(FadeIn(f), FadeIn(c3), FadeIn(c4), FadeIn(c2), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un pavé mesure", "2 cm, 3 cm et 4 cm.", "Quel est son volume ?"],
                             [self.choix("12 cm³"), self.choix("9 cm³"), self.choix("24 cm³")], 2,
                             ["Une couche : 2 × 3", "= 6 cubes.", "4 couches : 24 cm³.", "9, c'est l'addition :", "faux."],
                             -0.35, couper={0: ("Une couche :", "2 × 3"), 2: ("4 couches :", "24 cm³."),
                                            3: ("9,", "c'est l'addition :")},
                             mot_q="Un pavé", avant_q=avant)

    # ── 08 : le défi (le conteneur) ─────────────────────────────────────────
    UC = 0.5
    OC = P(-5.55, -1.45)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u, o = self.UC, self.OC
        cont = conteneur(6, 2, 2, u, o)
        x = -0.6
        l1 = self.ligne([("Un conteneur :", TOLE_C), ("6 m", WHITE), ("de long,", WHITE)], 34, buff=0.2)
        self.cl(l1, 2.2, x)
        self.au_mot("Un conteneur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(cont, shift=UP * 0.2), run_time=0.45)
        c6 = cote(Line(cont.pt(0, 0, 0), cont.pt(6, 0, 0)), "6 m", DOWN, fs=28, couleur=BLEU_CALCUL, audit=False,
                  buff=0.12)
        self.au_mot("conteneur mesure")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c6), run_time=0.3)
        self.au_mot("6 mètres de long")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        l2 = self.ligne([("2 m", WHITE), ("de large,", WHITE), ("2 m", WHITE), ("de haut.", WHITE)], 34, buff=0.2)
        self.cl(l2, 1.5, x)
        c2p = cote(Line(cont.pt(6, 0, 0), cont.pt(6, 2, 0)), "2 m", RIGHT, fs=28, couleur=BLEU_CALCUL, audit=False,
                   buff=0.12)
        c2h = cote(Line(cont.pt(0, 0, 0), cont.pt(0, 0, 2)), "2 m", LEFT, fs=28, couleur=BLEU_CALCUL, audit=False)
        self.au_mot("de long")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(c2p), run_time=0.3)
        self.au_mot("de large")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("de large et")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(c2h), run_time=0.3)
        self.au_mot("de haut")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("Des caisses de", BOIS_C), ("1 m", BOIS_C), ("de côté.", BOIS_C)], 34, buff=0.2)
        self.cl(l3, 0.8, x)
        cs = pave(1, 1, 1, 0.75, P(-4.6, 1.05), sw=4, **BOIS)
        c1 = cote(Line(cs.pt(0, 0, 0), cs.pt(0, 0, 1)), "1 m", LEFT, fs=28, couleur=BOIS_C, audit=False)
        self.au_mot("des caisses cubiques")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(cs, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("cubiques de")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c1), run_time=0.3)
        self.au_mot("1 mètre de côté")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        l4 = self.ligne([("Chaque caisse pèse", BOIS_C), ("50 kg.", BOIS_C)], 34, buff=0.2)
        self.cl(l4, 0.1, x)
        e50 = self.t("50 kg", 30, WHITE)
        hors_audit(e50)
        e50.next_to(cs, RIGHT, buff=0.3)
        self.au_mot("Chaque caisse pèse")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("50 kilos")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(e50, scale=1.2), run_time=0.35)
        l5 = self.t("Combien de caisses rentrent ?", 32, JAUNE_TITRE)
        self.cl(l5, -0.65, x)
        self.au_mot("Combien de caisses rentrent")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        l6 = self.t("Combien pèse le chargement ?", 32, JAUNE_TITRE)
        self.cl(l6, -1.3, x)
        self.au_mot("Et combien pèse le chargement")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u, o = self.UC, self.OC
        fond, aretes = caisse(6, 2, 2, u, o, TOLE, sw=6, arete=TOLE_C)
        c6 = cote(Line(o, point3(o, u, 6, 0, 0)), "6 m", DOWN, fs=28, couleur=BLEU_CALCUL, audit=False, buff=0.12)
        c2p = cote(Line(point3(o, u, 6, 0, 0), point3(o, u, 6, 2, 0)), "2 m", RIGHT, fs=28, couleur=BLEU_CALCUL,
                   audit=False, buff=0.12)
        c2h = cote(Line(o, point3(o, u, 0, 0, 2)), "2 m", LEFT, fs=28, couleur=BLEU_CALCUL, audit=False)
        self.add(fond, aretes, c6, c2p, c2h)
        bas = couche(6, 2, 0, u, o, BOIS)
        haut = couche(6, 2, 1, u, o, BOIS)
        x = -0.6
        l1 = self.ligne([("Une couche :", JAUNE_TITRE), ("6 × 2", BLEU_D), ("= 12.", VERT_OK)], 36,
                        buff=0.2)
        self.cl(l1, 2.2, x)
        self.au_mot("Une couche")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 fois 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(FadeIn(bas[0], shift=DOWN * 0.3),
                                                             FadeIn(bas[1], shift=DOWN * 0.3), lag_ratio=0.4),
                  run_time=0.55)
        self.au_mot("2, 12 caisses")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(bas, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        l2 = self.ligne([("2 couches :", JAUNE_TITRE), ("24 caisses.", VERT_OK)], 36, buff=0.2)
        self.cl(l2, 1.4, x)
        self.au_mot("2 couches")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(haut, shift=DOWN * 0.4), run_time=0.5)
        self.au_mot("24 caisses")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Le chargement :", BOIS_C), ("24 × 50", BLEU_D)], 36, buff=0.2)
        self.cl(l3, 0.5, x)
        self.au_mot("Le chargement")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("24 fois 50")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = hors_audit(self.gros("1 200 kg", fs=48))  # « 1 200 » : l'audit le cherche en « 1200 » (ABSENT)
        self.cl(res, -0.6, x)
        self.au_mot("1 200 kilos")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = pave(3, 2, 2, 0.6, ORIGIN, grille=True)
        lignes = self.finale_gauche(fig, textes=[
            ("Le volume, c'est la place", "qu'occupe un objet."),
            ("On le compte", "en cubes-unité."),
            ("Il s'écrit en cm³,", "dm³ ou m³.")], fs=32)
        self.add(fig)
        self.au_mot("Le volume")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("On le compte")
        self.montrer_ligne(lignes[1])
        self.au_mot("Il s'écrit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cubes()
        self.ecran_volume()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
