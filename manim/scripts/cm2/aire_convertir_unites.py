# aire_convertir_unites.py
# EleveAI — Maths CM2 — série « Aire », épisode 03 : CONVERTIR DES AIRES (cm², dm², m² : × 100)
# (micro aire_convertir_unites, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (l'album d'autocollants : 1 dm² = 100 cm², réponse C).
# Décor et métier : Kenzo, VITRIER (une vitre de 3 dm², sa machine compte en cm² ; centres : construction, sciences).
# Mapping micro → écrans : 02 (1 dm² = un carré de 10 cm qui se remplit de 10 rangées de 10 cm²),
# 03 (3 dm² = 3 × 100 = 300 cm²), 04 (1 m² = 100 dm² = 10 000 cm², × 100 à chaque unité),
# 06 (piège : × 100 et pas × 10, la longueur ET la largeur), questions 05 (5 dm² → C 500 cm²)
# et 07 (2 m² → B 200 dm²), défi 08 (6 vitres de 50 cm² dans une plaque de 3 dm² : tout juste).
# Voix : manim/voix/cm2-aire-convertir-unites.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_convertir_unites_marques.json (python manim/scripts/cm2/aire_marques_cm2.py convertir-unites).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_convertir_unites.py AireConvertirUnitesCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_convertir_unites.py AireConvertirUnitesCM2 -o eleveai-maths-cm2-aire-convertir-unites --media_dir manim/scripts/cm2/media-aire-03
# Sortie : manim/sorties/cm2/maths/aire/03-convertir-unites/eleveai-maths-cm2-aire-convertir-unites.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

CM_C, CM_B = CARREAU, CARREAU_B            # le petit carré de 1 cm² (bleu ciel)
DM_C, DM_B = "#fbbf24", "#78350f"          # le carré de 1 dm² (ambre)
VERRE_C, VERRE_B = "#bae6fd", "#0369a1"    # le verre des vitres
CADRE_C = "#92400e"                        # le cadre en bois de la fenêtre
SOMBRE = "#0f172a"


def cote(mob, s, sens=LEFT, fs=28, couleur=JAUNE_TITRE, buff=0.18):
    """Une étiquette de côté (hors audit : la longueur est déjà dite) ; à gauche, elle est tournée."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    if sens is LEFT or sens is RIGHT:
        t.rotate(PI / 2)
    return hors_audit(t.next_to(mob, sens, buff=buff))


def quadrille(cote_, n=10, couleur=DM_C, bord=DM_B, sw=4, fin=1.3, op=1.0):
    """Un carré (1 dm² ou 1 m²) avec son quadrillage de n × n : [0] le carré, [1] les traits."""
    sq = Square(cote_, fill_color=couleur, fill_opacity=op, stroke_color=bord, stroke_width=sw)
    c = cote_ / n
    traits = VGroup()
    for k in range(1, n):
        traits.add(Line(sq.get_corner(UL) + RIGHT * k * c, sq.get_corner(DL) + RIGHT * k * c,
                        stroke_color=bord, stroke_width=fin))
        traits.add(Line(sq.get_corner(UL) + DOWN * k * c, sq.get_corner(UR) + DOWN * k * c,
                        stroke_color=bord, stroke_width=fin))
    return VGroup(sq, traits)


def vitre(l, h, sw=4):
    """Une vitre : le verre bleu pâle et deux reflets blancs."""
    v = Rectangle(width=l, height=h, fill_color=VERRE_C, fill_opacity=1, stroke_color=VERRE_B, stroke_width=sw)
    m = min(l, h)
    r1 = Line(v.get_corner(UL) + P(0.18 * m, -0.45 * m), v.get_corner(UL) + P(0.45 * m, -0.18 * m),
              stroke_color=WHITE, stroke_width=5)
    r2 = Line(v.get_corner(UL) + P(0.18 * m, -0.75 * m), v.get_corner(UL) + P(0.75 * m, -0.18 * m),
              stroke_color=WHITE, stroke_width=4)
    return VGroup(v, r1, r2)


def machine(ecran_txt="? cm²", s=1.0):
    """La machine à découper de Kenzo : un boîtier, un écran, un pavé de touches.
    [0] boîtier, [1] écran, [2] texte de l'écran, [3] touches."""
    boite = RoundedRectangle(width=2.6 * s, height=2.0 * s, corner_radius=0.18 * s, fill_color="#475569",
                             fill_opacity=1, stroke_color="#1e293b", stroke_width=4)
    ecr = RoundedRectangle(width=2.1 * s, height=0.7 * s, corner_radius=0.08 * s, fill_color="#052e16",
                           fill_opacity=1, stroke_color="#1e293b", stroke_width=3)
    ecr.move_to(boite.get_top() + DOWN * 0.55 * s)
    txt = Text(ecran_txt, font_size=int(32 * s), color="#4ade80", weight=BOLD).move_to(ecr)
    touches = VGroup(*[RoundedRectangle(width=0.36 * s, height=0.26 * s, corner_radius=0.05 * s,
                                        fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
                       for _ in range(8)]).arrange_in_grid(2, 4, buff=0.14 * s)
    touches.move_to(boite.get_bottom() + UP * 0.5 * s)
    return VGroup(boite, ecr, txt, touches)


def ecran_machine(m, s, fs=32, couleur="#4ade80"):
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    if t.width > m[1].width - 0.2:
        t.scale_to_fit_width(m[1].width - 0.2)
    return t.move_to(m[1])


class AireConvertirUnitesBase(PaysageAireCM2G):
    nom_voix = "cm2-aire-convertir-unites"
    fichier_marques = "aire_convertir_unites_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des aires", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Pourquoi 1 dm²", "vaut 100 cm²,", "et pas 10 ?"], 40)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = quadrille(3.0, couleur=CM_C, bord=CM_B).move_to(P(3.4, 0.3))
        self.au_mot("Pourquoi")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(g, scale=0.8), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Kenzo, vitrier ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ke = kenzo(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Kenzo")
        nom = self.t("Kenzo", 42, BLEU_CALCUL).next_to(ke, UP, buff=0.2)
        self.play(FadeIn(ke, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("vitrier")
        met = self.t("vitrier", 32, BLEU_CALCUL).next_to(ke, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        v = vitre(2.6, 2.0).move_to(P(-1.6, 0.75))
        self.au_mot("il découpe")
        coupe = DashedLine(v[0].get_corner(UL) + RIGHT * 1.7, v[0].get_corner(DL) + RIGHT * 1.7,
                           color=ROUGE_ERREUR, stroke_width=5, dash_length=0.12)
        self.play(FadeIn(v, scale=0.8), run_time=0.4)
        self.play(Create(coupe), run_time=0.5)
        self.au_mot("Un client")
        self.play(FadeOut(coupe), run_time=0.25)
        self.au_mot("vitre de 3")
        eti = self.t("3 dm²", 40, SOMBRE).move_to(v[0].get_center() + P(0.3, -0.4))
        self.play(FadeIn(eti, scale=1.3), Indicate(v, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        m = machine().move_to(P(3.2, 0.75))
        self.au_mot("la machine")
        self.play(FadeIn(m[0]), FadeIn(m[1]), FadeIn(m[3]), run_time=0.4)
        self.au_mot("en centimètres carrés")
        self.play(FadeIn(m[2], scale=1.2), Indicate(m[1], color=JAUNE_TITRE, scale_factor=1.08), run_time=0.45)
        self.au_mot("Quel nombre")
        q = self.t("Quel nombre doit-il taper ?", 38, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(m[2]), run_time=0.5)
        self.attendre_voix()

    # ── 02 : 1 dm² = un carré de 10 cm qui se remplit de 100 cm² ─────────────
    def ecran_dix_sur_dix(self):
        self.ecran("02-dix-sur-dix")
        c = 0.38
        cadre = Square(10 * c, fill_color=DM_C, fill_opacity=0.18, stroke_color=DM_C, stroke_width=6) \
            .move_to(P(-4.0, -0.15))
        g = rect_cases(10, 10, c, CM_C, CM_B).move_to(cadre)
        self.au_mot("Un décimètre carré")
        l1 = VGroup(self.t("Un dm², c'est un carré", 34),
                    self.ligne([("de 10 cm", WHITE), ("de côté.", WHITE)], 34, buff=0.18))             .arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(l1, 2.55)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cadre), run_time=0.5)
        ch, cg = cote(cadre, "10 cm", UP), cote(cadre, "10 cm", LEFT)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ch), FadeIn(cg), run_time=0.4)
        comptes = VGroup(*[hors_audit(Text(str(10 * (j + 1)), font_size=22, color=GRAY_B, weight=BOLD))
                           .next_to(rangee(g, j, 10), RIGHT, buff=0.15) for j in range(10)])
        self.au_mot("Dedans")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(rangee(g, j, 10), shift=RIGHT * 0.2), FadeIn(comptes[j]))
                                for j in range(10)], lag_ratio=0.35), run_time=1.6)
        l2 = self.t("10 rangées de 10", 38, CM_C)
        self.col(l2, 1.45)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("petits carrés")
        l3 = self.t("petits carrés de 1 cm", 32, GRAY_B)
        self.col(l3, 0.85)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(g[0], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.5)
        self.au_mot("10 fois 10")
        l4 = self.ligne([("10 × 10", BLEU_D), ("= 100", VERT_OK)], 46, buff=0.3)
        self.col(l4, -0.05)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(comptes[9], color=VERT_OK, scale_factor=1.6),
                  run_time=0.35)
        self.au_mot("1 décimètre carré égale")
        res = self.gros2([("1 dm²", VERT_OK), ("= 100 cm²", VERT_OK)], fs=44)
        self.col(res, -1.2)
        self.play(FadeIn(res, scale=1.2), Indicate(cadre, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 3 dm² = 3 × 100 = 300 cm² ──────────────────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        carres = VGroup(*[quadrille(1.3, couleur=CM_C, bord=CM_B, fin=1.0) for _ in range(3)]) \
            .arrange(RIGHT, buff=0.4).move_to(P(-3.7, 1.25))
        eti = m2("3 dm²", 32, VERRE_C).next_to(carres, UP, buff=0.2)
        cents = VGroup(*[hors_audit(Text("100 cm²", font_size=22, color=WHITE, weight=BOLD)).next_to(q, DOWN, buff=0.15)
                         for q in carres])
        m = machine(s=0.9).move_to(P(-3.7, -1.55))
        self.add(m[0], m[1], m[3])
        self.au_mot("Donc 3")
        l1 = self.t("Donc 3 dm², c'est :", 36)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(carres, scale=0.9), FadeIn(eti), run_time=0.5)
        self.au_mot("3 fois 100")
        l2 = self.ligne([("3 × 100", BLEU_D), ("= 300 cm²", VERT_OK)], 46, buff=0.3)
        self.col(l2, 1.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, shift=UP * 0.1) for x in cents],
                                                              lag_ratio=0.3), run_time=0.5)
        self.au_mot(": 300")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(carres, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.au_mot("Kenzo tape")
        res = self.gros("Kenzo tape 300.", fs=42)
        self.col(res, -0.2)
        ecr = hors_audit(ecran_machine(m, "300 cm²", 30))
        self.play(FadeIn(res, scale=1.2), FadeIn(ecr, scale=1.3), run_time=0.45)
        self.play(Indicate(m[1], color=VERT_OK, scale_factor=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 04 : 1 m² = 100 dm² = 10 000 cm² ────────────────────────────────────
    def ecran_m2(self):
        self.ecran("04-m2")
        c = 0.36
        cadre = Square(10 * c, fill_color=VERT_F, fill_opacity=0.15, stroke_color=VERT_F, stroke_width=6) \
            .move_to(P(-3.9, -0.2))
        g = rect_cases(10, 10, c, DM_C, DM_B).move_to(cadre)
        self.au_mot("Et le mètre carré")
        l1 = self.t("Et le m² ?", 40, JAUNE_TITRE)
        self.col(l1, 3.0)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cadre), run_time=0.45)
        self.au_mot("C'est un carré")
        l2 = self.bloc(["Un carré de 10 dm", "de côté."], 34)
        self.col(l2, 2.15)
        ch, cg = cote(cadre, "10 dm", UP, couleur=VERT_F), cote(cadre, "10 dm", LEFT, couleur=VERT_F)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ch), FadeIn(cg), run_time=0.45)
        self.au_mot("10 rangées de 10")
        l3 = self.t("10 rangées de 10", 36, DM_C)
        self.col(l3, 1.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(rangee(g, j, 10), shift=RIGHT * 0.2) for j in range(10)], lag_ratio=0.3),
                  run_time=1.2)
        self.au_mot("1 mètre carré égale 100")
        l4 = self.gros("1 m² = 100 dm²", fs=40)
        self.col(l4, 0.3)
        self.play(FadeIn(l4, scale=1.2), Indicate(cadre, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.au_mot("Et en centimètres")
        l5 = self.ligne([("100 × 100", BLEU_D), ("= 10 000 cm²", VERT_OK)], 38, buff=0.25)
        for f in l5[1].get_family():
            f._pas_audit = True  # « 10 000 » : l'audit le lit 10000, la voix « 10 000 »
        self.col(l5, -0.6)
        self.play(FadeIn(l5[0], shift=UP * 0.1), Indicate(g[0], color=CM_C, scale_factor=2.0), run_time=0.45)
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on multiplie par 100")
        chaine = self.chaine(42)
        self.col(chaine, -1.45)
        self.play(FadeIn(chaine, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(chaine.fois, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    def gros2(self, morceaux, fs=44):
        """Comme gros(), mais en morceaux posés chacun à son mot : [0] le cadre, [1] la ligne."""
        lg = VGroup(*[Text(s, font_size=fs, color=c, weight=BOLD) for s, c in morceaux]).arrange(RIGHT, buff=0.2)
        return VGroup(SurroundingRectangle(lg, color=morceaux[0][1], buff=0.2, corner_radius=0.12, stroke_width=5), lg)

    def chaine(self, fs=36):
        """m² → dm² → cm², « × 100 » au-dessus de chaque flèche ; .fois = les deux « × 100 »."""
        u = [self.t(s, fs, col) for s, col in (("m²", VERT_F), ("dm²", DM_C), ("cm²", CM_C))]
        f1, f2 = Arrow(LEFT * 0.7, RIGHT * 0.7, buff=0, color=WHITE), Arrow(LEFT * 0.7, RIGHT * 0.7, buff=0, color=WHITE)
        rang = VGroup(u[0], f1, u[1], f2, u[2]).arrange(RIGHT, buff=0.2)
        x1 = hors_audit(Text("× 100", font_size=30, color=JAUNE_TITRE, weight=BOLD)).next_to(f1, UP, buff=0.08)
        x2 = hors_audit(Text("× 100", font_size=30, color=JAUNE_TITRE, weight=BOLD)).next_to(f2, UP, buff=0.08)
        g = VGroup(rang, x1, x2)
        g.fois = VGroup(x1, x2)
        return g

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        carres = VGroup(*[quadrille(0.82, couleur=CM_C, bord=CM_B, fin=0.8) for _ in range(5)]) \
            .arrange(RIGHT, buff=0.14).move_to(P(-3.6, 1.6))
        eti = m2("5 dm²", 32, CM_C).next_to(carres, DOWN, buff=0.2)

        def autres_q(sc):
            sc.play(FadeIn(carres, scale=0.9), FadeIn(eti), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["5 dm²,", "c'est combien de cm² ?"],
                             [self.choix("50 cm²"), self.choix("5 cm²"), self.choix("500 cm²")], 2,
                             ["1 dm², c'est 100 cm².", "5 × 100 = 500 cm²."],
                             0.3, autres_q=autres_q)

    # ── 06 : le piège (× 100, pas × 10) ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        c = 0.3
        # la longueur : une règle de 1 dm, 10 graduations
        regle = Rectangle(width=10 * c, height=0.4, fill_color="#fde68a", fill_opacity=1, stroke_color="#78350f",
                          stroke_width=3).move_to(P(-4.1, 1.95))
        grad = VGroup(*[Line(regle.get_corner(UL) + RIGHT * k * c, regle.get_corner(UL) + RIGHT * k * c + DOWN * 0.2,
                             stroke_color="#78350f", stroke_width=2) for k in range(1, 10)])
        lr = cote(regle, "1 dm", DOWN, fs=24, couleur=ORANGE_RETENUE, buff=0.12)
        # l'aire : un carré de 10 sur 10
        g = rect_cases(10, 10, c, CM_C, CM_B).move_to(P(-4.1, -0.95))
        self.au_mot("Pour les longueurs")
        l1 = VGroup(self.t("Longueurs :", 34, ORANGE_RETENUE),
                    self.ligne([("1 dm", WHITE), ("= 10 cm", WHITE)], 34)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(l1, 2.25)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(regle), FadeIn(grad), run_time=0.4)
        self.play(FadeIn(l1[1][0], shift=UP * 0.1), FadeIn(lr), run_time=0.3)
        self.au_mot("égale 10")
        self.play(FadeIn(l1[1][1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mais une aire")
        l2 = self.bloc(["Mais une aire,", "ce sont des carrés :"], 34, CM_C)
        self.col(l2, 1.0)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(g, scale=0.9), run_time=0.4)
        self.au_mot("10 sur la longueur")
        l3 = self.ligne([("10", WHITE), ("sur la longueur,", WHITE)], 32, buff=0.15)
        l3[0].align_to(l3[1][0], DOWN)  # même ligne de base (« g » descend)
        self.col(l3, 0.15)
        bas = rangee(g, 9, 10)
        cb = cote(g, "10", DOWN, fs=28, couleur=JAUNE_TITRE, buff=0.12)
        self.play(FadeIn(l3, shift=UP * 0.1), bas.animate.set_fill(JAUNE_TITRE), FadeIn(cb), run_time=0.4)
        self.au_mot("10 sur la largeur")
        l4 = self.ligne([("et 10", WHITE), ("sur la largeur.", WHITE)], 32, buff=0.15)
        l4[0].align_to(l4[1][0], DOWN)
        self.col(l4, -0.45)
        gauche_col = VGroup(*[g[j * 10] for j in range(10)])
        cg = hors_audit(Text("10", font_size=28, color=JAUNE_TITRE, weight=BOLD)).next_to(g, LEFT, buff=0.15)
        self.play(FadeIn(l4, shift=UP * 0.1), gauche_col.animate.set_fill(JAUNE_TITRE), FadeIn(cg), run_time=0.4)
        self.au_mot("10 fois 10")
        l5 = self.ligne([("10 × 10", BLEU_D), ("= 100", VERT_OK), ("pas 10 !", ROUGE_ERREUR)], 38, buff=0.3)
        self.col(l5, -1.2)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l5[1], shift=UP * 0.1), bas.animate.set_fill(CM_C), gauche_col.animate.set_fill(CM_C),
                  Indicate(g, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.au_mot("pas 10")
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Écrire 30")
        l6 = self.ligne([("30 cm²", ROUGE_ERREUR), ("pour la vitre :", WHITE)], 32, buff=0.2)
        self.col(l6, -2.0)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.35)
        self.au_mot("c'est faux")
        faux = self.t("c'est faux !", 32, ROUGE_ERREUR)
        self.col(faux, -2.6)
        barre = Line(l6[0].get_left() + LEFT * 0.05, l6[0].get_right() + RIGHT * 0.05, color=WHITE,
                     stroke_width=4)
        self.play(FadeIn(faux, shift=UP * 0.1), Create(barre), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def fenetre(self, s=1.6):
        """Une fenêtre de 2 m² : deux carrés de 1 m² quadrillés en dm², dans un cadre de bois."""
        vitres = VGroup(*[quadrille(s, couleur=VERRE_C, bord=VERRE_B, fin=1.0) for _ in range(2)]) \
            .arrange(RIGHT, buff=0.12)
        cadre = Rectangle(width=vitres.width + 0.24, height=vitres.height + 0.24, stroke_color=CADRE_C,
                          stroke_width=12).move_to(vitres)
        montant = Line(vitres[0].get_corner(UR) + RIGHT * 0.06, vitres[0].get_corner(DR) + RIGHT * 0.06,
                       stroke_color=CADRE_C, stroke_width=10)
        return VGroup(vitres, cadre, montant)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = self.fenetre(1.6).move_to(P(-3.6, 1.3))
        eti = m2("2 m²", 32, VERRE_C).next_to(f, DOWN, buff=0.2)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(eti), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une fenêtre fait 2 m².", "Combien de dm² ?"],
                             [self.choix("20 dm²"), self.choix("200 dm²"), self.choix("2 000 dm²")], 1,
                             ["1 m² = 100 dm².", "2 × 100 = 200 dm²."],
                             -0.25, autres_q=autres_q)

    # ── 08 : le défi (6 vitres de 50 cm², une plaque de 3 dm²) ───────────────
    U = 0.14  # 1 cm à l'écran : tout est à l'échelle

    def petites_vitres(self):
        u = self.U
        vs = VGroup(*[vitre(5 * u, 10 * u, sw=3) for _ in range(6)]).arrange(RIGHT, buff=0.15).move_to(P(-3.6, 1.5))
        etis = VGroup(*[hors_audit(VGroup(Text("50", font_size=22, color=SOMBRE, weight=BOLD),
                                          Text("cm²", font_size=18, color=SOMBRE, weight=BOLD))
                                   .arrange(DOWN, buff=0.05).move_to(v[0])) for v in vs])
        return vs, etis

    def plaque(self):
        u = self.U
        p = Rectangle(width=30 * u, height=10 * u, fill_color=VERRE_C, fill_opacity=0.8, stroke_color=VERRE_B,
                      stroke_width=5).move_to(P(-3.6, -1.0))
        sep = VGroup(*[DashedLine(p.get_corner(UL) + RIGHT * k * 10 * u, p.get_corner(DL) + RIGHT * k * 10 * u,
                                  color=VERRE_B, stroke_width=3, dash_length=0.1) for k in (1, 2)])
        eti = m2("3 dm²", 30, VERRE_C).next_to(p, DOWN, buff=0.2)
        return p, sep, eti

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        vs, etis = self.petites_vitres()
        self.au_mot("Un client veut 6")
        l0 = self.t("6 petites vitres", 34)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(v, scale=0.8) for v in vs], lag_ratio=0.15),
                  run_time=0.6)
        self.au_mot("de 50")
        l1 = self.ligne([("de 50 cm²", WHITE), ("chacune", WHITE)], 34, buff=0.18)
        self.col(l1, 1.55, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(etis), run_time=0.4)
        p, sep, eti = self.plaque()
        self.au_mot("Kenzo a une plaque")
        l2 = self.bloc(["Une plaque de verre", "de 3 dm²"], 34, VERRE_C)
        self.col(l2, 0.45, 0.35)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(p), FadeIn(sep), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(eti), run_time=0.35)
        self.au_mot("Est-ce assez")
        q = self.t("Est-ce assez ?", 40, JAUNE_TITRE)
        self.col(q, -0.6, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(p), run_time=0.5)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        vs, etis = self.petites_vitres()
        p, sep, eti = self.plaque()
        self.add(vs, etis, p, sep, eti)
        self.au_mot("Les 6 vitres")
        l0 = self.t("Les 6 vitres :", 32)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(vs, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("50 fois 6")
        l1 = self.ligne([("50 × 6", BLEU_D), ("= 300 cm²", VERT_OK)], 40, buff=0.3)
        self.col(l1, 1.75, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6, 300")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La plaque")
        l2 = self.t("La plaque : 3 dm²", 32, VERRE_C)
        self.col(l2, 0.95, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(p, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        self.au_mot("3 fois 100")
        l3 = self.ligne([("3 × 100", BLEU_D), ("= 300 cm²", VERT_OK)], 40, buff=0.3)
        self.col(l3, 0.35, 0.35)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("100, 300")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("C'est tout juste")
        res = self.gros("Tout juste assez !", fs=38)
        self.col(res, -0.75, 0.35)
        u = self.U
        cibles = [p.get_corner(UL) + P((k + 0.5) * 5 * u, -5 * u) for k in range(6)]
        self.play(FadeIn(res, scale=1.2), FadeOut(sep),
                  *[VGroup(v, e).animate.move_to(cib) for v, e, cib in zip(vs, etis, cibles)], run_time=0.9)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(quadrille(3.0, couleur=CM_C, bord=CM_B))
        lignes = self.finale_gauche(fig, textes=[
            ("1 dm² = 100 cm²",),
            ("1 m² = 100 dm²",),
            ("Pour les aires, on multiplie", "par 100 à chaque unité,", "pas par 10.")], fs=34)
        eti = m2("1 dm²", 30, DM_C).next_to(fig, DOWN, buff=0.2)
        self.add(fig, eti)
        self.au_mot("1 décimètre carré égale")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 mètre carré égale")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour les aires")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix_sur_dix()
        self.ecran_convertir()
        self.ecran_m2()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireConvertirUnitesCM2(AireConvertirUnitesBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "bleue"
