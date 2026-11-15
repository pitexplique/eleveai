# volume_unite.py
# EleveAI — Maths 6e — série « Volume et solides », épisode V1 : L'UNITÉ DE VOLUME
# (micro volume_unite ; la micro volume_lire est branchée ici par `aussi` : écran 04), notion volume_solide.
# Paysage 16:9, CEINTURE JAUNE, avec voix (manim/voix/6e-volume-unite.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (la boîte à trésors de 20 cm³ : réponse C).
# Métier : Mathis, MAÎTRE-NAGEUR (piscine de 300 m³) ; centres : natation, sport.
# Mapping micro → écrans : volume_unite → 02 (cube unité 1 cm³), 03 (cm, cm², cm³), 06 (m³), 07 (piège cm²) ;
# volume_lire → 04 (18 cm³ = 18 cubes de 1 cm³) ; questions 05 (24 cm³ → 24 cubes, rép. B) et 08 (piscine
# → m³, rép. A) ; défi 09 (Léo 8 cm, Maya 8 cm², Sami 8 cm³ : Sami, 8 cubes).
# Audit : bash <notes>/outils/dry.sh volume_unite VolumeUnite6e
# HD : python -m manim render -qh --disable_caching manim/scripts/6e/volume_unite.py VolumeUnite6e -o eleveai-maths-6e-volume-unite
# Sortie : manim/sorties/6e/maths/volume/01-unite/eleveai-maths-6e-volume-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

EAU = "#0ea5e9"


def cube_cote(e=1.6, centre=ORIGIN, couleur=VOL_C):
    """Un cube unité opaque (Empilement d'un cube), arêtes visibles."""
    return Empilement([(0, 0, 0)], e=e, centre=centre, couleur=couleur, sw=3, trait=WHITE)


class VolumeUniteBase(PaysageVolume6e):
    nom_voix = "6e-volume-unite"
    fichier_marques = "volume_unite_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'unité de volume", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'unité de volume")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Avec quoi mesure-t-on")
        q = self.bloc(["Avec quoi mesure-t-on", "la place que prend un objet ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        cu = cube_cote(1.3, P(4.2, 0.6))
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(cu, scale=0.6), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        mp = mathis(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Mathis")
        nom = self.t("Mathis", 40, BLEU_CALCUL).next_to(mp, UP, buff=0.2)
        self.play(FadeIn(mp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est maître-nageur")
        met = self.t("maître-nageur", 28, BLEU_CALCUL).next_to(mp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        bord = Rectangle(width=7.2, height=2.6, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(P(1.6, 0.9))
        eau = Rectangle(width=6.8, height=2.2, fill_color=EAU, fill_opacity=0.9, stroke_width=0).move_to(P(1.6, 0.9))
        vagues = VGroup(*[ParametricFunction(lambda t, y=y: P(t, y + 0.06 * np.sin(4 * t)), t_range=[-1.6, 4.8],
                                             color="#e0f2fe", stroke_width=3) for y in (1.5, 0.9, 0.3)])
        self.au_mot("Chaque matin")
        self.play(FadeIn(bord), FadeIn(eau), Create(vagues), run_time=0.6)
        fl = VGroup(RoundedRectangle(width=0.5, height=0.8, corner_radius=0.08, fill_color="#a855f7", fill_opacity=1,
                                     stroke_width=0),
                    Rectangle(width=0.22, height=0.18, fill_color=WHITE, fill_opacity=1, stroke_width=0).shift(UP * 0.48))
        fl.move_to(P(4.4, 2.9))
        self.au_mot("il verse un produit")
        self.play(FadeIn(fl, shift=DOWN * 0.2), run_time=0.35)
        self.play(fl.animate.rotate(-0.8).shift(DOWN * 0.3), run_time=0.4)
        self.au_mot("La dose dépend")
        l1 = self.t("La dose dépend de la place que prend l'eau :", 30)
        gauche(l1, -3.6, -1.15)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("son volume")
        l2 = self.t("son volume.", 40, VOL_C)
        gauche(l2, -3.6, -1.85)
        self.play(FadeIn(l2, scale=1.2), Indicate(eau, color="#7dd3fc", scale_factor=1.03), run_time=0.5)
        self.au_mot("comment le mesure-t-on")
        q = self.t("Comment le mesure-t-on ?", 38, JAUNE_TITRE)
        gauche(q, -3.6, -2.7)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le cube unité ──────────────────────────────────────────────────
    def ecran_cube_unite(self):
        self.ecran("02-cube-unite")
        self.au_mot("On mesure un volume")
        tit = self.t("On mesure un volume avec des petits cubes.", 36, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        petits = Empilement(pave_cubes(3, 2, 2), e=0.5, centre=P(4.6, 1.5))
        self.play(Write(tit), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in petits], lag_ratio=0.05),
                  run_time=0.8)
        cu = cube_cote(2.0, P(-3.6, -0.3))
        self.au_mot("Voici un cube de 1 centimètre")
        self.play(FadeIn(cu, scale=0.5), run_time=0.4)
        e = cu.e
        a, b = cu.pp((0, 0, 0)), cu.pp((1, 0, 0))
        c1 = fleche_cote(a + DOWN * 0.25, b + DOWN * 0.25, "1 cm", 28, LONG_C, DOWN, 0.12)
        g1, h1 = cu.pp((0, 0, 0)), cu.pp((0, 1, 0))
        c2 = fleche_cote(g1 + LEFT * 0.25, h1 + LEFT * 0.25, "1 cm", 28, LONG_C, LEFT, 0.12)
        p1, p2 = cu.pp((1, 0, 0)), cu.pp((1, 0, 1))
        c3 = fleche_cote(p1 + P(0.22, -0.12), p2 + P(0.22, -0.12), "1 cm", 28, LONG_C, RIGHT, 0.12)
        noms = VGroup(self.t("longueur", 26, LONG_C), self.t("largeur", 26, LONG_C), self.t("hauteur", 26, LONG_C))
        noms[0].next_to(c1, DOWN, buff=0.08)
        noms[1].next_to(c3, RIGHT, buff=0.12).shift(DOWN * 0.35)
        noms[2].next_to(c2[1], DOWN, buff=0.12)
        for c in (c1, c2, c3):
            hors_audit(c)
        self.au_mot("sa longueur")
        self.play(GrowFromCenter(c1), FadeIn(noms[0]), run_time=0.35)
        self.au_mot("sa largeur")
        self.play(GrowFromCenter(c3), FadeIn(noms[1]), run_time=0.35)
        self.au_mot("et sa hauteur")
        self.play(GrowFromCenter(c2), FadeIn(noms[2]), run_time=0.35)
        self.au_mot("Son volume, c'est")
        l1 = self.t("Son volume :", 34)
        gauche(l1, 0.9, 0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        v = self.gros("1 centimètre cube", couleur=VOL_C, fs=34)
        gauche(v, 0.9, -0.3)
        self.au_mot("1 centimètre cube")
        self.play(FadeIn(v, scale=1.2), run_time=0.35)
        self.au_mot("On l'écrit cm")
        ec = self.ligne([("On l'écrit", WHITE), ("1 cm³", VOL_C)], 38, buff=0.25)
        gauche(ec, 0.9, -1.3)
        hors_audit(ec)
        self.play(FadeIn(ec, shift=UP * 0.1), run_time=0.35)
        self.au_mot("avec un petit 3")
        pt = self.t("le petit 3", 28, JAUNE_TITRE).next_to(ec[1], DOWN, buff=0.6).align_to(ec[1], RIGHT)
        pt.shift(RIGHT * 0.5)
        f = Arrow(pt.get_top(), ec[1].get_corner(UR), buff=0.08, color=JAUNE_TITRE, stroke_width=5)
        self.play(GrowArrow(f), FadeIn(pt), run_time=0.35)
        self.insister(ec[1], 1.25, 0.3)
        self.attendre_voix()

    # ── 03 : cm, cm², cm³ ───────────────────────────────────────────────────
    def ecran_trois_unites(self):
        self.ecran("03-trois-unites")
        self.au_mot("Attention aux trois écritures")
        tit = self.t("Attention aux trois écritures !", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.4)
        xs = (-4.4, -0.6, 3.2)
        trait = Line(P(xs[0] - 1.0, 0.6), P(xs[0] + 1.0, 0.6), color=LONG_C, stroke_width=10)
        carre = Square(side_length=1.6, fill_color=AIRE_C, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3) \
            .move_to(P(xs[1], 0.6))
        cu = cube_cote(1.35, P(xs[2], 0.6))
        cols = [(trait, "1 cm", "une longueur", "un trait", LONG_C, "Le centimètre mesure"),
                (carre, "1 cm²", "une aire", "un carré à plat", AIRE_C, "Le centimètre carré"),
                (cu, "1 cm³", "un volume", "un cube", VOL_C, "Le centimètre cube mesure")]
        unites = []
        for k, (fig, u, quoi, forme, coul, mot) in enumerate(cols):
            ut = self.t(u, 44, coul).move_to(P(xs[k], 2.0))
            q = self.t(quoi, 30).move_to(P(xs[k], -0.95))
            f = self.t(forme, 26, "#cbd5e1").move_to(P(xs[k], -1.5))
            for m in (ut,):
                hors_audit(m)
            self.au_mot(mot)
            self.play(FadeIn(ut, shift=DOWN * 0.1), FadeIn(fig, scale=0.7), run_time=0.4)
            self.au_mot(quoi)
            self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
            self.au_mot(forme)
            self.play(FadeIn(f), run_time=0.25)
            unites.append(ut)
        self.au_mot("Le petit 2 dit")
        l2 = self.ligne([("Le petit 2 dit « carré »,", AIRE_C), ("le petit 3 dit « cube ».", VOL_C)], 32, buff=0.35)
        l2.move_to(P(-0.6, -2.5))
        hors_audit(l2[0])
        hors_audit(l2[1])
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(unites[1], color=AIRE_C), run_time=0.4)
        self.au_mot("le petit 3 dit")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(unites[2], color=VOL_C), run_time=0.4)
        self.attendre_voix()

    # ── 04 : lire un volume (micro volume_lire) ─────────────────────────────
    def ecran_lire(self):
        self.ecran("04-lire")
        self.au_mot("Lire un volume")
        tit = self.t("Lire un volume", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        v = self.ligne([("18", BLEU_CALCUL), ("cm³", VOL_C)], 72, buff=0.25)
        gauche(v, -6.0, 1.7)
        hors_audit(v[1])
        emp = Empilement(pave_cubes(6, 3, 1), e=0.62, centre=P(3.4, 0.9))
        self.au_mot("Dans 18 centimètres cubes")
        self.play(FadeIn(v, scale=1.2), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.05),
                  run_time=0.6)
        self.add(emp)
        self.au_mot("le nombre 18 compte les cubes")
        l1 = self.ligne([("18", BLEU_CALCUL), ("compte les cubes.", WHITE)], 32, buff=0.2)
        gauche(l1, -6.0, 0.4)
        hors_audit(l1)
        nums = VGroup(*[Text(str(k + 1), font_size=22, color=BLACK, weight=BOLD).move_to(
            emp.centre_cube(q)) for k, q in enumerate(sorted(emp.cubes, key=lambda q: (-q[1], q[0])))])
        hors_audit(nums)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(v[0], color=BLEU_CALCUL),
                  LaggedStart(*[FadeIn(n, scale=1.3) for n in nums], lag_ratio=0.05), run_time=0.9)
        self.au_mot("L'unité dit leur taille")
        l2 = self.ligne([("cm³", VOL_C), ("dit leur taille :", WHITE)], 32, buff=0.2)
        gauche(l2, -6.0, -0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(v[1], color=VOL_C), run_time=0.4)
        self.au_mot("de 1 centimètre de côté")
        l3 = self.t("des cubes de 1 cm de côté.", 32)
        hors_audit(l3)
        gauche(l3, -6.0, -1.15)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        g = self.ligne([("18 cm³", VERT_OK), ("= 18 cubes", VERT_OK), ("de 1 cm³", VERT_OK)], 38, buff=0.2)
        g.move_to(P(-0.4, -2.35))
        hors_audit(g[2])  # le « 1 » est déjà dit (« de 1 centimètre de côté ») : l'audit compare au 1er
        self.aux_extraits(g, ["18 centimètres cubes, ce sont", "18 petits cubes", "1 centimètre cube"])
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def apres(sc):
            sc.rep_lignes(["24 cm³, ce sont 24 cubes de 1 cm³.",
                           ("Le petit 3 ne se multiplie pas :", ORANGE_RETENUE),
                           ("il dit « cube ».", ORANGE_RETENUE)],
                          ["24 centimètres cubes, ce sont", "Le petit 3 n'est pas", "il dit « cube »"],
                          y0=-1.4, pas=0.6)

        self.question_pause("05-question", "05b-reponse",
                            ["Un solide a un volume", "de 24 cm³.", "Combien de cubes de 1 cm³", "contient-il ?"],
                            [self.choix("8 cubes"), self.choix("24 cubes"), self.choix("72 cubes")], 1,
                            ["24 cm³, ce sont 24 cubes de 1 cm³.", "Le petit 3 ne se multiplie pas :",
                             "il dit « cube »."],
                            mot_q="Un solide a un volume", autres_r=apres)

    # ── 06 : le mètre cube ──────────────────────────────────────────────────
    def ecran_metre_cube(self):
        self.ecran("06-metre-cube")
        self.au_mot("Pour un grand objet")
        tit = self.t("Pour un grand objet : un grand cube.", 38, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        sol = Line(P(-6.4, -1.9), P(0.6, -1.9), color="#64748b", stroke_width=4)
        gc = Empilement([(0, 0, 0)], e=2.6, centre=ORIGIN, couleur="#a16207", sw=3, trait=WHITE)
        gc.shift(P(-5.6, -1.9) - gc.pp((0, 0, 0)))
        self.play(Write(tit), Create(sol), FadeIn(gc, scale=0.6), run_time=0.5)
        self.au_mot("1 mètre de côté")
        a, b = gc.pp((0, 0, 0)), gc.pp((1, 0, 0))
        c1 = fleche_cote(a + DOWN * 0.25, b + DOWN * 0.25, "1 m", 30, LONG_C, DOWN, 0.1)
        self.play(GrowFromCenter(c1), run_time=0.3)
        self.au_mot("C'est 1 mètre cube")
        u = self.t("1 m³", 48, "#fbbf24").move_to(gc.centre_cube((0, 0, 0)))
        self.play(FadeIn(u, scale=1.3), run_time=0.35)
        enf = personne(peau="#c68642", tenue="#2563eb", s=1.0)
        enf = visage(enf)
        enf.scale_to_fit_height(2.6 * 1.55).move_to(P(-0.6, 0)).align_to(P(0, -1.9), DOWN)
        self.au_mot("t'arriverait à peu près à la poitrine")
        po = DashedLine(gc.pp((1, 1, 0)), P(-0.2, gc.pp((1, 1, 0))[1]), color=JAUNE_TITRE, stroke_width=4)
        self.play(FadeIn(enf, shift=LEFT * 0.3), Create(po), run_time=0.5)
        mp = mathis(0.75).move_to(P(2.6, -0.4))
        self.au_mot("La piscine de Mathis")
        bas = Rectangle(width=3.0, height=1.3, fill_color=EAU, fill_opacity=0.9, stroke_color="#e5e7eb",
                        stroke_width=6).move_to(P(4.6, -1.2))
        self.play(FadeIn(mp), FadeIn(bas), run_time=0.4)
        l = self.ligne([("300 m³", "#fbbf24")], 44)
        l.move_to(bas.get_center())
        self.au_mot("fait 300 mètres cubes")
        self.play(FadeIn(l, scale=1.2), run_time=0.35)
        l2 = self.t("300 grands cubes d'eau", 30, EAU).move_to(P(3.9, 1.2))
        self.au_mot("300 grands cubes d'eau")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Un volume s'écrit avec le petit 3")
        l1 = self.ligne([("Un volume s'écrit avec le petit 3 :", WHITE), ("cm³", VOL_C)], 34, buff=0.25)
        gauche(l1, -6.2, 1.8)
        hors_audit(l1[0])
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        carre = Square(side_length=1.5, fill_color=AIRE_C, fill_opacity=0.85, stroke_color=WHITE, stroke_width=3) \
            .move_to(P(-4.6, -0.6))
        a = self.t("24 cm²", 48, AIRE_C).move_to(P(-1.6, -0.2))
        self.au_mot("24 centimètres carrés")
        self.play(FadeIn(a, scale=1.1), FadeIn(carre), run_time=0.4)
        self.au_mot("c'est une aire")
        n = self.t("c'est une aire,", 32, AIRE_C).next_to(a, DOWN, buff=0.25)
        self.play(FadeIn(n, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas un volume")
        x = Cross(VGroup(a, n), stroke_color=ROUGE_ERREUR, stroke_width=8)
        pv = self.t("pas un volume !", 32, ROUGE_ERREUR).next_to(n, DOWN, buff=0.25)
        self.play(FadeIn(pv), Create(x), run_time=0.4)
        self.au_mot("On regarde toujours l'unité")
        g = self.bloc(["On regarde", "toujours l'unité."], 38, VERT_OK)
        gauche(g, 1.8, -0.5)
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def apres(sc):
            sc.rep_lignes(["Un volume a le petit 3.", "Pour un grand objet : le m³.",
                           ("Le cm³, c'est pour un petit objet,", ORANGE_RETENUE), ("comme un dé.", ORANGE_RETENUE)],
                          ["Un volume a le petit 3", "pour un objet aussi grand", "Le centimètre cube, c'est",
                           "comme un dé"], y0=-1.3, pas=0.58)

        self.question_pause("08-question", "08b-reponse",
                            ["Quelle unité choisir", "pour le volume", "de la piscine ?"],
                            [self.choix("le m³"), self.choix("le m²"), self.choix("le cm³")], 0,
                            ["Un volume a le petit 3.", "Pour un grand objet : le m³.",
                             "Le cm³, c'est pour un petit objet,", "comme un dé."],
                            mot_q="Quelle unité choisir", autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def eleves(self):
        g = VGroup()
        for k, (nom, ecrit, peau, tenue, longs) in enumerate((
                ("Léo", "8 cm", "#e0ac69", "#dc2626", False),
                ("Maya", "8 cm²", "#8d5524", "#db2777", True),
                ("Sami", "8 cm³", "#c68642", "#2563eb", False))):
            p = visage(personne(peau=peau, tenue=tenue, cheveux="#111827", longs=longs, s=0.7))
            n = self.t(nom, 30, BLEU_CALCUL).next_to(p, UP, buff=0.12)
            bu = RoundedRectangle(width=2.0, height=0.8, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                                  stroke_width=0)
            t = Text(ecrit, font_size=34, color=BLACK, weight=BOLD).move_to(bu)
            bulle = VGroup(bu, t).next_to(p, DOWN, buff=0.2)
            g.add(VGroup(VGroup(p, n), bulle))
        g.arrange(RIGHT, buff=0.45)
        return g

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Trois élèves écrivent le volume d'un dé")
        l0 = self.t("Trois élèves écrivent le volume d'un dé :", 32)
        gauche(l0, -6.2, 2.3)
        de = cube_cote(0.9, P(5.0, 2.0), couleur="#f8fafc")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(de, scale=0.5), run_time=0.4)
        el = self.eleves().move_to(P(-3.0, 0.2))
        for f in el.get_family():
            f.sans_synchro = True
        for k, (nom, mot) in enumerate((("Léo écrit", "8 centimètres"), ("Maya", "8 centimètres carrés"),
                                        ("Sami", "8 centimètres cubes"))):
            self.au_mot(nom)
            self.play(FadeIn(el[k][0], shift=UP * 0.15), run_time=0.25)
            self.au_mot(mot)
            self.wait(0.07)
            self.play(FadeIn(el[k][1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Qui a raison")
        q1 = self.t("Qui a raison ?", 32, JAUNE_TITRE)
        gauche(q1, 1.0, 0.8)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        q2 = self.bloc(["Combien de petits cubes", "de 1 cm³ font ce volume ?"], 28, JAUNE_TITRE)
        gauche(q2, 1.0, -0.2)
        self.aux_extraits(q2, ["Et combien de petits cubes", "1 centimètre cube font"])
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-0.6, -2.7))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        el = self.eleves().move_to(P(-3.0, 1.0))
        for f in el.get_family():
            f.sans_synchro = True
        self.add(el)
        self.au_mot("Léo a écrit une longueur")
        n0 = self.t("une longueur", 26, LONG_C).next_to(el[0], DOWN, buff=0.15)
        self.play(FadeIn(n0), el[0][1].animate.set_opacity(0.35), run_time=0.35)
        self.au_mot("Maya une aire")
        n1 = self.t("une aire", 26, AIRE_C).next_to(el[1], DOWN, buff=0.15)
        self.play(FadeIn(n1), el[1][1].animate.set_opacity(0.35), run_time=0.35)
        self.au_mot("Sami a raison")
        ok = SurroundingRectangle(el[2][1], color=VERT_OK, buff=0.1, stroke_width=6)
        n2 = self.t("Sami a raison !", 28, VERT_OK).next_to(el[2], DOWN, buff=0.15)
        self.play(Create(ok), FadeIn(n2), run_time=0.4)
        self.au_mot("un volume s'écrit avec le petit 3")
        l1 = self.t("Un volume s'écrit avec le petit 3.", 30)
        gauche(l1, -6.2, -1.55)
        hors_audit(l1)
        emp = Empilement(pave_cubes(2, 2, 2), e=0.75, centre=P(4.6, -0.6))
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in emp], lag_ratio=0.08),
                  run_time=0.5)
        self.add(emp)
        g = self.ligne([("8 cm³", VERT_OK), ("= 8 petits cubes", VERT_OK), ("de 1 cm³", VERT_OK)], 34, buff=0.2)
        gauche(g, -6.2, -2.4)
        hors_audit(g[0])
        hors_audit(g[1])  # le 1er « 8 » dit est celui de « le petit 3, 8 centimètres cubes »
        self.aux_extraits(g, ["8 centimètres cubes, ce sont", "8 petits cubes", "1 centimètre cube"])
        self.insister(g, 1.06, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        emp = Empilement(pave_cubes(3, 2, 1), e=0.75)
        lignes = self.finale_gauche(emp, textes=[
            ("Le volume, c'est la place", "que prend un objet."),
            ("On le mesure en cubes : le cm³ pour", "un petit objet, le m³ pour un grand."),
            ("Dans 18 cm³, le nombre 18", "compte les cubes.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(emp)
        self.au_mot("Le volume, c'est la place")
        self.montrer_ligne(lignes[0])
        self.au_mot("On le mesure en cubes")
        self.montrer_ligne(lignes[1])
        self.au_mot("Dans 18 centimètres cubes")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cube_unite()
        self.ecran_trois_unites()
        self.ecran_lire()
        self.ecran_question1()
        self.ecran_metre_cube()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class VolumeUnite6e(VolumeUniteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"
