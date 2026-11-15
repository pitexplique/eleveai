# vision_vues.py
# EleveAI — Maths 6e — série « Volume et solides », épisode S1 : LES QUATRE VUES
# (micro vision_vues), notion vision_espace.
# Paysage 16:9, CEINTURE JAUNE, avec voix (manim/voix/6e-vision-vues.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (le drone au-dessus de 2 tours de 5 : 2 carreaux, réponse A).
# Métier : Samuel, ARCHITECTE (maquette en cubes : pavé 4 × 3 × 2 ; escalier) ; centres : art-design, construction.
# Mapping micro → écrans : vision_vues → 02 (vue de face du pavé 4 × 3 × 2 : 4 × 2 = 8 carreaux),
# 03 (vues de droite et de gauche : 3 × 2 = 6, le miroir), 04 (vue de dessus : 4 × 3 = 12 ; une colonne = un carreau),
# 06 (piège : colonnes ≠ cubes, cube caché au milieu) ; questions 05 (escalier 3-2-1, vue de dessus : 3 carreaux,
# rép. A) et 07 (escalier vu de face : un escalier de 6 carreaux, rép. B) ; défi 08 (colonnes 1, 3, 2, 1 :
# face 7 carreaux, dessus 4 carreaux).
# Les vues se DESSINENT : les faces vues du solide s'envolent et s'aplatissent en carreaux.
# Audit : bash <notes>/outils/dry.sh vision_vues VisionVues6e
# HD : bash <notes>/outils/hd.sh vision_vues VisionVues6e eleveai-maths-6e-vision-vues manim/sorties/6e/maths/vision-espace/01-vues
# Sortie : manim/sorties/6e/maths/vision-espace/01-vues/eleveai-maths-6e-vision-vues.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

PAPIER = "#f8fafc"
PLAN = "#1e3a8a"
FRONT_C = "#f97316"   # la colonne de devant (pour voir le miroir)
VUE_C = "#38bdf8"     # les carreaux d'une vue

# Les solides du lot (x = longueur, y = hauteur, z = profondeur ; voir Empilement)
PAVE = pave_cubes(4, 2, 3)                      # 4 de long, 2 de haut, 3 de large
ESCALIER = [(0, 0, 0), (0, 1, 0), (0, 2, 0), (1, 0, 0), (1, 1, 0), (2, 0, 0)]  # 3, 2, 1
HAUTEURS_DEFI = (1, 3, 2, 1)
DEFI = [(x, y, 0) for x, h in enumerate(HAUTEURS_DEFI) for y in range(h)]


def muet(m):
    """Une étiquette dont le mot est déjà dit : ni synchro, ni audit."""
    for f in m.get_family():
        f.sans_synchro = True
    return hors_audit(m)


def fleche_vue(debut, fin, couleur=JAUNE_TITRE):
    """Le regard : une flèche épaisse qui vise le solide."""
    return Arrow(debut, fin, buff=0, color=couleur, stroke_width=7, max_tip_length_to_length_ratio=0.35)


def sommet_colonnes(positions):
    """Le cube du haut de chaque colonne (x, z)."""
    haut = {}
    for (x, y, z) in positions:
        if (x, z) not in haut or y > haut[(x, z)]:
            haut[(x, z)] = y
    return {(x, z): (x, y, z) for (x, z), y in haut.items()}


def maison_face(s=1.0):
    mur = Rectangle(width=1.4 * s, height=0.75 * s, stroke_color=PLAN, stroke_width=3)
    toit = Polygon(mur.get_corner(UL), mur.get_corner(UR), mur.get_corner(UR) + P(-0.3 * s, 0.4 * s),
                   mur.get_corner(UL) + P(0.3 * s, 0.4 * s), stroke_color=PLAN, stroke_width=3)
    porte = Rectangle(width=0.25 * s, height=0.42 * s, stroke_color=PLAN, stroke_width=3) \
        .align_to(mur, DOWN).shift(LEFT * 0.25 * s)
    fen = Square(0.22 * s, stroke_color=PLAN, stroke_width=3).move_to(mur.get_center() + P(0.4 * s, 0.05 * s))
    return VGroup(mur, toit, porte, fen)


def maison_cote(s=1.0):
    mur = Rectangle(width=0.85 * s, height=0.75 * s, stroke_color=PLAN, stroke_width=3)
    toit = Polygon(mur.get_corner(UL), mur.get_corner(UR), mur.get_top() + UP * 0.4 * s,
                   stroke_color=PLAN, stroke_width=3)
    fen = Square(0.22 * s, stroke_color=PLAN, stroke_width=3).move_to(mur.get_center())
    return VGroup(mur, toit, fen)


def maison_dessus(s=1.0):
    r = Rectangle(width=1.4 * s, height=0.85 * s, stroke_color=PLAN, stroke_width=3)
    fa = Line(r.get_left() + RIGHT * 0.3 * s, r.get_right() + LEFT * 0.3 * s, color=PLAN, stroke_width=3)
    d = VGroup(*[Line(r.get_corner(c), fa.get_start() if c in (UL, DL) else fa.get_end(), color=PLAN, stroke_width=3)
                 for c in (UL, DL, UR, DR)])
    return VGroup(r, fa, d)


def carte_plan(dessin, centre):
    c = RoundedRectangle(width=2.3, height=1.55, corner_radius=0.12, fill_color=PAPIER, fill_opacity=1,
                         stroke_color="#93c5fd", stroke_width=3).move_to(centre)
    dessin.move_to(c.get_center())
    return VGroup(c, dessin)


class VisionVuesBase(PaysageVolume6e):
    nom_voix = "6e-vision-vues"
    fichier_marques = "vision_vues_marques.json"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def aplatir(self, faces, carreaux, run_time=0.8, couleur=VUE_C, avec=()):
        """Les faces vues du solide s'allument puis s'envolent : elles deviennent les carreaux de la vue."""
        lueurs = VGroup(*[f.copy().set_fill(couleur, 0.95).set_stroke(WHITE, 3) for f in faces])
        self.play(FadeIn(lueurs), *avec, run_time=0.25)
        self.play(*[ReplacementTransform(l, c) for l, c in zip(lueurs, carreaux)], run_time=run_time)

    def vue_de_face(self, emp, positions, c=0.6, centre=ORIGIN):
        """La vue de face : un carreau par cube de devant (z = 0) ; renvoie (grille, faces dans l'ordre)."""
        devant = sorted([q for q in positions if q[2] == 0])
        g = vue_grille([(x, y) for (x, y, _) in devant], c=c, centre=centre)
        return g, [emp.cubes[q][0] for q in devant], [g.carreaux[(x, y)] for (x, y, _) in devant]

    def vue_de_dessus(self, emp, positions, c=0.6, centre=ORIGIN):
        haut = sommet_colonnes(positions)
        cles = sorted(haut)
        g = vue_grille(cles, c=c, centre=centre)
        return g, [emp.cubes[haut[k]][1] for k in cles], [g.carreaux[k] for k in cles]

    # ── 00 : la page de garde ───────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les quatre vues", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les quatre vues")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["À quoi ressemble un assemblage", "de cubes, vu de dessus, de face,",
                       "de gauche ou de droite ?"], 32, JAUNE_TITRE)
        gauche(q, -6.2, 0.5)
        emp = Empilement(ESCALIER + [(0, 0, 1), (1, 0, 1), (0, 1, 1)], e=0.5, centre=P(4.0, 0.15))
        bas, haut = emp.get_bottom()[1], emp.get_top()[1]
        gx, dx = emp.get_left()[0], emp.get_right()[0]
        cy = emp.get_center()[1]
        xh = emp.dessus((0, 2, 0))[0]
        f_dessus = fleche_vue(P(xh, haut + 0.7), P(xh, haut + 0.1))
        f_face = fleche_vue(P(emp.pp((1.5, 0, 0))[0], bas - 0.75), P(emp.pp((1.5, 0, 0))[0], bas - 0.12))
        f_gauche = fleche_vue(P(gx - 0.8, cy - 0.2), P(gx - 0.12, cy - 0.2))
        f_droite = fleche_vue(P(dx + 0.8, cy - 0.2), P(dx + 0.12, cy - 0.2))
        self.au_mot("À quoi ressemble")
        self.play(FadeIn(q[0], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.06), run_time=0.6)
        self.add(emp)
        self.au_mot("de cubes")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("vu de dessus")
        self.play(GrowArrow(f_dessus), run_time=0.3)
        self.au_mot("de face")
        self.play(GrowArrow(f_face), run_time=0.3)
        self.au_mot("de gauche")
        self.play(FadeIn(q[2], shift=UP * 0.1), GrowArrow(f_gauche), run_time=0.3)
        self.au_mot("ou de droite")
        self.play(GrowArrow(f_droite), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        sp = samuel(1.0).move_to(P(-5.3, 0.6))
        self.au_mot("Voici Samuel")
        nom = self.t("Samuel", 40, BLEU_CALCUL).next_to(sp, UP, buff=0.2)
        self.play(FadeIn(sp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est architecte")
        met = self.t("architecte", 28, BLEU_CALCUL).next_to(sp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        cartes = [carte_plan(maison_dessus(), P(-2.35, 1.75)), carte_plan(maison_face(), P(0.6, 1.75)),
                  carte_plan(maison_cote(), P(3.55, 1.75))]
        noms = ["vue de dessus", "vue de face", "vue de côté"]
        mots = ["vue de dessus", "vue de face", "vues de côté"]
        self.au_mot("il la dessine sous plusieurs angles")
        self.play(FadeIn(cartes[0][0], scale=0.8), FadeIn(cartes[1][0], scale=0.8), FadeIn(cartes[2][0], scale=0.8),
                  run_time=0.4)
        for c, n, m in zip(cartes, noms, mots):
            lg = self.t(n, 26, JAUNE_TITRE).next_to(c, DOWN, buff=0.15)
            self.au_mot(m)
            self.play(Create(c[1]), FadeIn(lg, shift=UP * 0.08), run_time=0.45)
        self.au_mot("Chaque vue est un dessin plat")
        l1 = self.ligne([("Chaque vue est", WHITE), ("un dessin plat.", VUE_C)], 34, buff=0.22)
        gauche(l1, -3.6, -0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), *[Indicate(c[0], color="#bae6fd", scale_factor=1.04) for c in cartes],
                  run_time=0.5)
        self.au_mot("il présente sa maquette en cubes")
        l2 = self.t("Sa maquette en cubes :", 34, VOL_C)
        gauche(l2, -3.6, -1.75)
        emp = Empilement(PAVE, e=0.42, centre=P(2.4, -1.95))
        self.play(FadeIn(l2, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.25) for c in emp], lag_ratio=0.03), run_time=0.9)
        self.add(emp)
        self.attendre_voix()

    # ── 02 : la vue de face du pavé ─────────────────────────────────────────
    def ecran_face(self):
        self.ecran("02-face")
        self.au_mot("Une vue est plate")
        tit = self.t("Une vue est plate.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        emp = Empilement(PAVE, e=0.7, centre=P(-3.1, 0.55))
        self.play(Write(tit), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.02),
                  run_time=0.7)
        self.add(emp)
        o, l4 = emp.pp((0, 0, 0)), emp.pp((4, 0, 0))
        h2, lg3 = emp.pp((0, 2, 0)), emp.pp((4, 0, 3))
        f_long = DoubleArrow(o + DOWN * 0.25, l4 + DOWN * 0.25, buff=0, color=LONG_C, stroke_width=4, tip_length=0.15)
        f_haut = DoubleArrow(o + LEFT * 0.25, h2 + LEFT * 0.25, buff=0, color=LONG_C, stroke_width=4, tip_length=0.15)
        f_larg = DoubleArrow(l4 + P(0.25, -0.12), lg3 + P(0.25, -0.12), buff=0, color=ROUGE_ERREUR, stroke_width=4,
                             tip_length=0.15)
        t_long = self.t("longueur", 26, LONG_C).next_to(f_long, DOWN, buff=0.1)
        t_haut = self.t("hauteur", 26, LONG_C).next_to(f_haut, LEFT, buff=0.1)
        t_larg = self.t("largeur", 26, ROUGE_ERREUR).next_to(f_larg.get_end(), RIGHT, buff=0.12)
        self.au_mot("on voit la longueur")
        self.play(GrowFromCenter(f_long), FadeIn(t_long), run_time=0.35)
        self.au_mot("et la hauteur")
        self.play(GrowFromCenter(f_haut), FadeIn(t_haut), run_time=0.35)
        self.au_mot("La largeur part vers l'arrière")
        self.play(GrowFromCenter(f_larg), FadeIn(t_larg), run_time=0.35)
        self.au_mot("elle disparaît")
        disp = self.t("elle disparaît !", 26, ROUGE_ERREUR).next_to(t_larg, DOWN, buff=0.1).align_to(t_larg, LEFT)
        self.play(FadeIn(disp, shift=UP * 0.08), f_larg.animate.set_opacity(0.35), run_time=0.35)
        # les nombres du pavé, chacun à son mot
        n4 = self.t("4", 30, LONG_C).next_to(t_long, RIGHT, buff=0.15)
        n3 = self.t("3", 30, ROUGE_ERREUR).next_to(t_larg, RIGHT, buff=0.15)
        n2 = self.t("2", 30, LONG_C).next_to(t_haut, DOWN, buff=0.1)
        self.au_mot("4 cubes de long")
        self.play(FadeIn(n4, scale=1.3), run_time=0.25)
        self.au_mot("3 de large")
        self.play(FadeIn(n3, scale=1.3), run_time=0.25)
        self.au_mot("2 de haut")
        self.play(FadeIn(n2, scale=1.3), run_time=0.25)
        g, faces, carreaux = self.vue_de_face(emp, PAVE, c=0.6, centre=P(3.5, 1.05))
        nv = self.t("Vue de face", 30, VUE_C).next_to(g, UP, buff=0.25)
        self.au_mot("vu de face")
        self.aplatir(faces, carreaux, run_time=0.55, avec=[FadeIn(nv, shift=DOWN * 0.08)])
        self.add(g)
        calc = self.ligne([("4 × 2", WHITE), ("= 8 carreaux", VERT_OK)], 40, buff=0.2)
        calc.next_to(g, DOWN, buff=0.45)
        hors_audit(calc[0])  # le 4 et le 2 sont déjà dits (« 4 cubes de long », « 2 de haut »)
        self.aux_extraits(calc, ["4 fois 2", "8 carreaux"])
        self.insister(calc[1], 1.15, 0.3)
        self.attendre_voix()

    # ── 03 : les vues de côté ───────────────────────────────────────────────
    def ecran_cotes(self):
        self.ecran("03-cotes")
        devant = {(3, y, 0): FRONT_C for y in range(2)}
        emp = Empilement(PAVE, e=0.7, centre=P(-3.4, 0.9), couleurs=devant)
        self.add(emp)
        cy = emp.get_center()[1]
        f_dr = fleche_vue(P(emp.get_right()[0] + 0.85, cy), P(emp.get_right()[0] + 0.12, cy))
        self.au_mot("De droite")
        tit = self.t("De droite", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), GrowArrow(f_dr), run_time=0.4)
        cles = sorted([(x, y, z) for (x, y, z) in PAVE if x == 3])
        g = vue_grille([(2 - z, y) for (_, y, z) in cles], c=0.6, centre=P(2.0, 1.25))
        for (_, y, z) in cles:
            if z == 0:
                g.carreaux[(2, y)].set_fill(FRONT_C, 0.9)
        faces = [emp.cubes[q][2] for q in cles]
        carr = [g.carreaux[(2 - z, y)] for (_, y, z) in cles]
        self.au_mot("on voit la largeur et la hauteur")
        lueurs = VGroup(*[f.copy().set_fill(VUE_C if q[2] else FRONT_C, 0.95).set_stroke(WHITE, 3)
                          for f, q in zip(faces, cles)])
        self.play(FadeIn(lueurs), run_time=0.3)
        self.play(*[ReplacementTransform(l, c) for l, c in zip(lueurs, carr)], run_time=0.75)
        self.add(g)
        nd = muet(self.t("Vue de droite", 28, VUE_C).next_to(g, UP, buff=0.2))
        self.play(FadeIn(nd), run_time=0.2)
        l1 = self.ligne([("3 × 2", WHITE), ("= 6 carreaux", VERT_OK)], 34, buff=0.2)
        l1.next_to(g, DOWN, buff=0.35)
        self.aux_extraits(l1, ["3 fois 2", "6 carreaux"])
        # De gauche : le même dessin, retourné
        cible = g.copy().flip(UP).move_to(P(5.0, 1.25))
        ng = self.t("Vue de gauche", 28, VUE_C).next_to(cible, UP, buff=0.2)
        self.au_mot("De gauche")
        l2 = self.t("De gauche : le même dessin,", 34)
        gauche(l2, -6.2, -2.05)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ng), run_time=0.35)
        self.au_mot("retourné comme dans un miroir")
        l3 = self.t("retourné comme dans un miroir.", 34, ORANGE_RETENUE)
        gauche(l3, -6.2, -2.75)
        miroir = DashedLine(P(3.5, 0.5), P(3.5, 2.0), color=WHITE, stroke_width=3, dash_length=0.1)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(miroir), TransformFromCopy(g, cible), run_time=0.9)
        self.insister(VGroup(*[cible.carreaux[(2, y)] for y in range(2)]), 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : la vue de dessus ───────────────────────────────────────────────
    def ecran_dessus(self):
        self.ecran("04-dessus")
        emp = Empilement(PAVE, e=0.62, centre=P(-3.5, 1.0))
        self.add(emp)
        self.au_mot("De dessus")
        tit = self.t("De dessus", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        cx = emp.dessus((1, 1, 1))[0] + 0.3
        f_de = fleche_vue(P(cx, emp.get_top()[1] + 0.9), P(cx, emp.get_top()[1] + 0.1))
        self.play(Write(tit), GrowArrow(f_de), run_time=0.4)
        g, faces, carr = self.vue_de_dessus(emp, PAVE, c=0.55, centre=P(2.6, 1.4))
        self.au_mot("on voit la longueur et la largeur")
        self.aplatir(faces, carr, run_time=0.75)
        self.add(g)
        nd = muet(self.t("Vue de dessus", 28, VUE_C).next_to(g, UP, buff=0.2))
        self.play(FadeIn(nd), run_time=0.2)
        l1 = self.ligne([("4 × 3", WHITE), ("= 12 carreaux", VERT_OK)], 34, buff=0.2)
        l1.next_to(g, DOWN, buff=0.35)
        self.aux_extraits(l1, ["4 fois 3", "12 carreaux"])
        o, h2 = emp.pp((0, 0, 0)), emp.pp((0, 2, 0))
        f_h = DoubleArrow(o + LEFT * 0.22, h2 + LEFT * 0.22, buff=0, color=ROUGE_ERREUR, stroke_width=4, tip_length=0.14)
        self.au_mot("La hauteur ne se voit pas")
        l2 = self.t("La hauteur ne se voit pas.", 34, ROUGE_ERREUR)
        gauche(l2, -6.2, -1.05)
        self.play(FadeIn(l2, shift=UP * 0.1), GrowFromCenter(f_h), run_time=0.35)
        self.play(f_h.animate.set_opacity(0.3), run_time=0.25)
        # une colonne de cubes, vue d'en haut : un seul carreau
        col = Empilement([(0, 0, 0), (0, 1, 0), (0, 2, 0)], e=0.5, centre=P(1.4, -2.15))
        fc = fleche_vue(P(col.dessus((0, 2, 0))[0], col.get_top()[1] + 0.75),
                        P(col.dessus((0, 2, 0))[0], col.get_top()[1] + 0.08))
        un = Square(0.5, fill_color=VUE_C, fill_opacity=0.9, stroke_color=WHITE, stroke_width=3).move_to(P(3.6, -2.15))
        fl = Arrow(P(2.05, -2.15), P(3.15, -2.15), buff=0, color=WHITE, stroke_width=5)
        self.au_mot("Une colonne de cubes")
        l3 = self.t("Une colonne de cubes,", 34)
        gauche(l3, -6.2, -1.95)
        self.play(FadeIn(l3, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in col], lag_ratio=0.2),
                  run_time=0.5)
        self.add(col)
        self.au_mot("vue d'en haut")
        self.play(GrowArrow(fc), run_time=0.3)
        self.au_mot("ne donne qu'un seul carreau")
        l4 = self.t("vue d'en haut : un seul carreau.", 34, VERT_OK)
        gauche(l4, -6.2, -2.65)
        lueur = col.cubes[(0, 2, 0)][1].copy().set_fill(VUE_C, 0.95).set_stroke(WHITE, 3)
        self.play(FadeIn(l4, shift=UP * 0.1), GrowArrow(fl), FadeIn(lueur), run_time=0.35)
        self.play(ReplacementTransform(lueur, un), run_time=0.5)
        self.insister(un, 1.25, 0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def escalier(self, centre=P(-4.4, 1.25)):
        return Empilement(ESCALIER, e=0.7, centre=centre)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        emp = self.escalier()
        g, faces, carr = self.vue_de_dessus(emp, ESCALIER, c=0.6, centre=P(-1.45, 1.25))

        def avant(sc):
            sc.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.08), run_time=0.6)
            sc.add(emp)

        def apres(sc):
            l0 = sc.rep_bas(0, ["Vue d'en haut : un carreau par colonne."], y0=-1.75, pas=0.6)
            sc.au_mot("Vue d'en haut")
            sc.play(FadeIn(l0, shift=UP * 0.08), run_time=0.3)
            sc.au_mot("chaque colonne donne un carreau")
            sc.aplatir(faces, carr, run_time=0.6)
            sc.add(g)
            l1 = sc.rep_bas(1, ["3 colonnes : 3 carreaux."], y0=-1.75, pas=0.6)
            sc.au_mot("3 colonnes")
            sc.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            l2 = sc.rep_bas(2, [("6, c'est le nombre de cubes.", ORANGE_RETENUE)], y0=-1.75, pas=0.6)
            sc.au_mot("6, c'est le nombre")
            sc.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un escalier de 3 colonnes :", "3 cubes, 2 cubes, 1 cube.", "Combien de carreaux",
                             "dans sa vue de dessus ?"],
                            [self.choix("3 carreaux"), self.choix("6 carreaux"), self.choix("1 carreau")], 0,
                            ["Vue d'en haut : un carreau par colonne.", "3 colonnes : 3 carreaux.",
                             "6, c'est le nombre de cubes."],
                            mot_q="Un escalier de 3 colonnes", autres_r=apres, avant_q=avant)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        # deux colonnes, l'une de 1 cube, l'autre de 3 : même carreau vu d'en haut
        petit = Empilement([(0, 0, 0)], e=0.55, centre=ORIGIN)
        grand = Empilement([(0, 0, 0), (0, 1, 0), (0, 2, 0)], e=0.55, centre=ORIGIN)
        petit.shift(P(-5.4, -0.6) - petit.pp((0, 0, 0)))
        grand.shift(P(-3.9, -0.6) - grand.pp((0, 0, 0)))
        self.au_mot("La vue de dessus compte les colonnes")
        l1 = self.bloc(["La vue de dessus compte", "les colonnes, pas les cubes."], 32)
        gauche(l1, -6.2, 2.15)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(petit, shift=DOWN * 0.2), FadeIn(grand, shift=DOWN * 0.2),
                  run_time=0.5)
        cs = []
        for emp in (petit, grand):
            h = max(q[1] for q in emp.cubes)
            lu = emp.cubes[(0, h, 0)][1].copy().set_fill(VUE_C, 0.95).set_stroke(WHITE, 3)
            sq = Square(0.55, fill_color=VUE_C, fill_opacity=0.9, stroke_color=WHITE, stroke_width=3) \
                .move_to(P(emp.cubes[(0, h, 0)][1].get_center()[0], -1.55))  # (shift ne recale pas pp)
            cs.append((lu, sq))
        self.au_mot("pas les cubes")
        self.play(*[FadeIn(lu) for lu, _ in cs], run_time=0.25)
        self.play(*[ReplacementTransform(lu, sq) for lu, sq in cs], run_time=0.6)
        eg = self.t("=", 44, VERT_OK).move_to((cs[0][1].get_center() + cs[1][1].get_center()) / 2)
        self.play(FadeIn(eg, scale=1.3), run_time=0.25)
        # le cube caché au milieu
        cub = Empilement(pave_cubes(3, 3, 3), e=0.55, centre=P(1.8, 0.35))
        self.au_mot("Et un cube caché au milieu")
        l2 = self.bloc(["Un cube caché au milieu", "n'apparaît sur aucune vue."], 32)
        gauche(l2, 0.0, 2.15)
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in cub],
                                                             lag_ratio=0.02), run_time=0.7)
        self.add(cub)
        coeur = cub.un_cube((1, 1, 1), JAUNE_TITRE, sw=3, trait=WHITE)
        self.play(*[m.animate.set_fill(opacity=0.12).set_stroke(opacity=0.35) for c in cub for m in c],
                  FadeIn(coeur), run_time=0.6)
        vue = vue_grille([(x, y) for x in range(3) for y in range(3)], c=0.4, centre=P(4.6, 0.35))
        self.au_mot("n'apparaît sur aucune vue")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(vue, scale=0.8), Indicate(coeur, color=JAUNE_TITRE),
                  run_time=0.5)
        self.au_mot("Les vues ne disent pas tout")
        l3 = self.t("Les vues ne disent pas tout.", 40, VERT_OK)
        gauche(l3, -6.2, -2.7)
        self.play(FadeIn(l3, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        emp = self.escalier()
        g, faces, carr = self.vue_de_face(emp, ESCALIER, c=0.6, centre=P(-1.45, 1.25))
        nums = VGroup()
        for x, h in enumerate((3, 2, 1)):
            nums.add(self.t(str(h), 30, JAUNE_TITRE).next_to(g.carreaux[(x, h - 1)], UP, buff=0.1))

        def avant(sc):
            sc.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.08), run_time=0.6)
            sc.add(emp)

        def apres(sc):
            l1 = sc.rep_bas(0, ["De face : la hauteur de chaque colonne."], y0=-1.75, pas=0.6)
            sc.au_mot("De face, on voit la hauteur")
            sc.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            sc.aplatir(faces, carr, run_time=0.6)
            sc.add(g)
            sc.aux_extraits(nums, ["3, puis 2", "2, puis 1", "1. Un escalier"])
            l2 = sc.rep_bas(1, ["Un escalier de 6 carreaux."], y0=-1.75, pas=0.6)
            sc.au_mot("Un escalier de 6 carreaux")
            sc.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Le même escalier,", "vu de face.", "Que voit-on ?"],
                            [self.choix("une ligne de 3 carreaux"), self.choix("un escalier de 6 carreaux"),
                             self.choix("un carré de 9 carreaux")], 1,
                            ["De face : la hauteur de chaque colonne.", "Un escalier de 6 carreaux."],
                            mot_q="Le même escalier", autres_r=apres, avant_q=avant)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def maquette_defi(self, centre=P(-4.3, 1.0)):
        return Empilement(DEFI, e=0.62, centre=centre)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        emp = self.maquette_defi()
        self.au_mot("La maquette de Samuel")
        l0 = self.t("La maquette de Samuel :", 32, BLEU_CALCUL)
        gauche(l0, -1.4, 2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.1),
                  run_time=0.6)
        self.add(emp)
        l1 = self.t("une rangée de 4 colonnes,", 32)
        gauche(l1, -1.4, 1.5)
        self.au_mot("une rangée de 4 colonnes")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("hautes de", WHITE), ("1,", JAUNE_TITRE), ("3,", JAUNE_TITRE), ("2", JAUNE_TITRE),
                         ("et 1 cubes.", JAUNE_TITRE)], 32, buff=0.15)
        gauche(l2, -1.4, 0.85)
        nums = VGroup()
        for x, h in enumerate(HAUTEURS_DEFI):
            nums.add(self.t(str(h), 28, JAUNE_TITRE).next_to(emp.cubes[(x, h - 1, 0)][1], UP, buff=0.08))
        hors_audit(l2[4])
        hors_audit(nums[3])  # le 2e « 1 » : la voix a déjà dit « 1 » (« hautes de 1 »)
        self.au_mot("hautes de 1")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        for k, ex in enumerate(["1, 3", "3, 2", "2 et 1", "1 cubes"]):
            for f in VGroup(l2[k + 1], nums[k]).get_family():
                f.sans_synchro = True
            self.au_mot(ex)
            self.wait(0.07)
            self.play(FadeIn(l2[k + 1], shift=UP * 0.08), FadeIn(nums[k], scale=1.3), run_time=0.2)
        cad = []
        for k, (n, x) in enumerate((("Vue de face", -5.0), ("Vue de dessus", -2.3))):
            r = DashedVMobject(RoundedRectangle(width=2.3, height=1.4, corner_radius=0.12, stroke_color=VUE_C,
                                                stroke_width=4), num_dashes=30).move_to(P(x, -1.45))
            q = self.t("?", 44, VUE_C).move_to(r)
            t = self.t(n, 26, VUE_C).next_to(r, UP, buff=0.1)
            cad.append(VGroup(r, q, t))
        self.au_mot("Dessine sa vue de face")
        l3 = self.bloc(["Dessine sa vue de face", "et sa vue de dessus."], 32)
        gauche(l3, -0.2, -0.15)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(cad[0]), run_time=0.35)
        self.au_mot("et sa vue de dessus")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(cad[1]), run_time=0.35)
        self.au_mot("Combien de carreaux dans chacune")
        q = self.bloc(["Combien de carreaux", "dans chacune ?"], 32, JAUNE_TITRE)
        gauche(q, -0.2, -1.55)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-1.2, -2.85))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        emp = self.maquette_defi(P(-4.4, 1.2))
        self.add(emp)
        g, faces, carr = self.vue_de_face(emp, DEFI, c=0.5, centre=P(0.4, 1.25))
        nf = self.t("Vue de face", 28, VUE_C).next_to(g, UP, buff=0.2)
        self.au_mot("De face, on voit les hauteurs")
        self.play(FadeIn(nf), run_time=0.25)
        self.aplatir(faces, carr, run_time=0.7)
        self.add(g)
        calc = self.ligne([("1", WHITE), ("+ 3", WHITE), ("+ 2", WHITE), ("+ 1", WHITE), ("= 7 carreaux", VERT_OK)],
                          34, buff=0.15)
        calc.next_to(g, DOWN, buff=0.4)
        hors_audit(calc[3])  # le 2e « 1 »
        self.aux_extraits(calc, ["1 plus 3", "3 plus 2", "2 plus 1", "1, 7", "7 carreaux"])
        self.insister(calc[4], 1.12, 0.3)
        g2, faces2, carr2 = self.vue_de_dessus(emp, DEFI, c=0.5, centre=P(4.0, 1.25))
        nd = self.t("Vue de dessus", 28, VUE_C).next_to(g2, UP, buff=0.2)
        self.au_mot("De dessus, une rangée de 4 colonnes")
        self.play(FadeIn(nd), run_time=0.25)
        self.aplatir(faces2, carr2, run_time=0.7)
        self.add(g2)
        l2 = self.t("4 carreaux", 36, VERT_OK).next_to(g2, DOWN, buff=0.4)
        hors_audit(l2)  # le 4 est déjà dit (« une rangée de 4 colonnes ») : posé à son extrait
        self.aux_extraits([l2], ["4 carreaux"])
        bil = self.ligne([("7 cubes,", BLEU_CALCUL), ("mais seulement 4 carreaux vus d'en haut.", WHITE)], 32, buff=0.2)
        gauche(bil, -6.2, -1.85)
        hors_audit(bil)
        self.aux_extraits(bil, ["7 cubes, mais", "seulement 4 carreaux"])
        self.insister(bil, 1.05, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        emp = Empilement(PAVE, e=0.5)
        lignes = self.finale_gauche(emp, textes=[
            ("Un assemblage se regarde de quatre côtés :", "dessus, face, gauche et droite."),
            ("Chaque vue est plate : elle garde", "deux dimensions sur trois."),
            ("La vue de dessus compte", "les colonnes, pas les cubes.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(emp)
        self.au_mot("Un assemblage se regarde")
        self.montrer_ligne(lignes[0])
        self.au_mot("Chaque vue est plate")
        self.montrer_ligne(lignes[1])
        self.au_mot("La vue de dessus compte")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_face()
        self.ecran_cotes()
        self.ecran_dessus()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class VisionVues6e(VisionVuesBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"
