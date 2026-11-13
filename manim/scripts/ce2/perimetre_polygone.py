# perimetre_polygone.py
# EleveAI — Maths CE2 — série « Périmètre », épisode 02 : LE PÉRIMÈTRE D'UN POLYGONE
# (micro ce2_perimetre_polygone, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Vidéo COMMUNE : sert aussi au CM1, au CM2… (`aussi`).
# Short jumeau : film Ti Margo (la guirlande de la cabane, le mur oublié : 13 → 16 m).
# Décor et métier : Sofia, JARDINIÈRE (centre : nature-ecologie).
# Écrans : 02 (compter les côtés), 03 (le tour, 6 nombres), 05 (quadrillage), 06 (piège : les carreaux
# ne sont pas le périmètre), questions 04 et 07, défi 08 (hexagone de 3 m).
# Voix : manim/voix/ce2-perimetre-polygone.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_polygone_marques.json (python manim/scripts/ce2/perimetre_marques.py polygone).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/perimetre_polygone.py PerimetrePolygoneCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_polygone.py PerimetrePolygoneCE2 -o eleveai-maths-ce2-perimetre-polygone --media_dir manim/scripts/ce2/media-per-02
# Sortie : manim/sorties/ce2/maths/perimetre/02-polygone/eleveai-maths-ce2-perimetre-polygone.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F403

# Le potager de Sofia, en L : côtés 6, 2, 3, 3, 3, 5 (dans l'ordre du tour, depuis le coin en bas à gauche)
POTAGER = [(0, 0), (6, 0), (6, 2), (3, 2), (3, 5), (0, 5)]
COTES_POTAGER = ["6 m", "2 m", "3 m", "3 m", "3 m", "5 m"]
# La figure du quadrillage : 4 × 2 carreaux + 1 carreau dessus à gauche = 9 carreaux, bord 14 cm
QUAD = [(0, 0), (4, 0), (4, 2), (1, 2), (1, 3), (0, 3)]
CASES = [(x, y) for y in range(2) for x in range(4)] + [(0, 2)]


def sofia(s=1.0):
    """Sofia, jardinière : salopette verte, chapeau de paille."""
    p = visage(personne(peau="#c68642", tenue="#4d7c0f", cheveux="#3f2a14", longs=True, s=s))
    p.add(chapeau(p, "#facc15"))
    return p


def potager(centre, e=0.6, textes=None, fs=30):
    f = FigureCotee(POTAGER, textes, e=e, centre=centre, fs=fs, remplir="#3f2a14", sw=5)
    if textes:  # les deux « 3 m » du coin rentrant se touchent : on les écarte
        f.lab[2].shift(RIGHT * 0.3)
        f.lab[3].shift(UP * 0.4)
    return f


def points_cotes(fig, couleur=JAUNE_TITRE, r=0.11):
    """Un point au milieu de chaque côté (« un point sur chacun »)."""
    s = fig.sommets()
    n = len(s)
    return VGroup(*[Dot((s[i] + s[(i + 1) % n]) / 2, radius=r, color=couleur) for i in range(n)])


class Quadrillage(VGroup):
    """Un quadrillage de carreaux de côté `c`, la figure QUAD posée dessus (coin bas-gauche en `o`)."""

    def __init__(self, o, c=0.7, nx=6, ny=5):
        super().__init__()
        o = np.array(o)
        self.o, self.c = o, c
        lignes = VGroup()
        for i in range(nx + 1):
            lignes.add(Line(o + P(i * c, 0) - P(c, c), o + P(i * c, ny * c) - P(c, c), color="#475569", stroke_width=2))
        for j in range(ny + 1):
            lignes.add(Line(o + P(0, j * c) - P(c, c), o + P(nx * c, j * c) - P(c, c), color="#475569", stroke_width=2))
        self.lignes = lignes
        self.cases = VGroup(*[Square(c, fill_color="#38bdf8", fill_opacity=0.55, stroke_color="#0ea5e9", stroke_width=2)
                              .move_to(o + P((x + 0.5) * c, (y + 0.5) * c)) for x, y in CASES])
        self.pts = [o + P(x * c, y * c) for x, y in QUAD]
        self.bord = Polygon(*self.pts, stroke_color=WHITE, stroke_width=5)
        self.add(lignes, self.bord)

    def segments(self, couleur=TOUR, sw=10):
        """Les 14 petits côtés de carreau du bord, dans l'ordre du tour."""
        segs = VGroup()
        n = len(self.pts)
        for i in range(n):
            a, b = self.pts[i], self.pts[(i + 1) % n]
            k = int(round(np.linalg.norm(b - a) / self.c))
            for j in range(k):
                segs.add(Line(a + (b - a) * j / k, a + (b - a) * (j + 1) / k, color=couleur, stroke_width=sw))
        return segs


class PerimetrePolygoneBase(PaysagePerimetreCE2):
    nom_voix = "ce2-perimetre-polygone"
    fichier_marques = "perimetre_polygone_marques.json"

    def somme_au_mot(self, prec, terme, res, mot, y, fs=36, xl=None, avec=(), n=1, res_mot=None):
        """« 8 + 3 = 11 » quand la voix dit « Plus 3, 11 » : le 8 (déjà dit) hors synchro,
        « + 3 » au mot, « = 11 » au résultat."""
        lg = self.ligne([(prec, BLEU_D), ("+ " + terme, BLEU_D), ("= " + res, BLEU_D)], fs, buff=0.16)
        hors_audit(lg[0])
        self.col(lg, y, xl=xl)
        self.au_mot(mot, n)
        self.wait(0.07)  # au-delà de l'arrondi d'image : le nombre est dit
        self.play(FadeIn(lg[0:2], shift=UP * 0.1), *avec, run_time=0.25)
        if res_mot:
            for x in lg[2].get_family():
                x.sans_synchro = True
            self.au_mot(res_mot)
            self.wait(0.07)
        self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.2)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre d'un polygone", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.5)
        q = self.bloc(["Comment ne jamais", "oublier un côté ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pg = potager(P(3.9, 0.4), e=0.36)
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(pg), run_time=0.3)
        self.au_mot("oublier un côté")
        self.play(Create(pg.contour(sw=9)), run_time=1.0)
        self.play(FadeIn(points_cotes(pg), lag_ratio=0.15), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sofia, jardinière ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        sp = sofia(1.0).move_to(P(-5.2, 0.1))
        self.au_mot("Voici Sofia")
        nom = self.t("Sofia", 42, BLEU_CALCUL).next_to(sp, UP, buff=0.2)
        self.play(FadeIn(sp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("jardinière")
        met = self.t("jardinière", 32, BLEU_CALCUL).next_to(sp, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        pg = potager(P(-0.9, 0.45), e=0.5)
        salades = VGroup(*[Circle(radius=0.16, fill_color="#4ade80", fill_opacity=1, stroke_color="#166534",
                                  stroke_width=2).move_to(pg.get_center() + P(dx, dy))
                           for dx, dy in ((-0.9, -0.6), (-0.3, -0.6), (0.3, -0.6), (0.9, -0.6), (-0.9, 0.4), (-0.9, 1.0))])
        self.au_mot("Son potager")
        tp = self.t("le potager", 28, GRAY_B).next_to(pg, DOWN, buff=0.2)
        self.play(FadeIn(pg), FadeIn(salades), FadeIn(tp), run_time=0.45)
        self.au_mot("six côtés")
        l6 = self.t("6 côtés", 34, JAUNE_TITRE).next_to(pg, UP, buff=0.25)
        hors_audit(l6)  # « six » dit en lettres
        self.play(FadeIn(l6, scale=1.2), Indicate(pg, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.45)
        self.au_mot("bordure en bois")
        bord = pg.contour(couleur=BOIS, sw=12)
        self.play(Create(bord), run_time=0.9)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres", "de bordure ?"], 40, JAUNE_TITRE)
        self.col(q, 0.4, xl=1.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 02 : compter les côtés ──────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        pg = potager(P(-3.3, 0.2), e=0.65)
        self.add(pg)
        self.au_mot("D'abord")
        l1 = self.t("D'abord, on compte les côtés.", 34)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("On met un point")
        l2 = self.t("Un point sur chacun :", 34, JAUNE_TITRE)
        self.col(l2, 1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        pts = points_cotes(pg, r=0.13)
        # les numéros posés comme des cotes (normale extérieure de chaque côté)
        nums = potager(P(-3.3, 0.2), e=0.65, textes=[str(i + 1) for i in range(6)], fs=34).lab
        nums.set_color(JAUNE_TITRE)
        for i in range(6):
            self.au_mot(f"{i + 1}," if i < 5 else "6.")
            self.play(FadeIn(pts[i], scale=2), FadeIn(nums[i], scale=1.4), Create(pg.cote(i, JAUNE_TITRE, 8)),
                      run_time=0.25)
        self.au_mot("Le potager a")
        g = self.gros("6 côtés", fs=40, couleur=JAUNE_TITRE)
        self.col(g, 0.3)
        self.play(FadeIn(g, scale=1.2), run_time=0.35)
        self.au_mot("on ajoutera")
        l3 = self.bloc(["On ajoutera", "6 nombres."], 36, VERT_OK)
        self.col(l3, -1.3)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : le tour, 6 nombres ─────────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        pg = potager(P(-3.5, 0.2), e=0.6, textes=COTES_POTAGER, fs=30)
        self.add(pg, *pg.lab)
        dep = depart(pg.sommets()[0])
        self.au_mot("On part d'un coin")
        l0 = self.t("On part d'un coin et on fait le tour.", 30)
        self.col(l0, 2.85, xl=0.2)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(dep, scale=2), run_time=0.35)
        self.au_mot("6 mètres")
        l1 = self.t("6", 36, BLEU_D)
        self.col(l1, 2.1, xl=0.2)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(pg.cote(0)), Indicate(pg.lab[0], color=TOUR), run_time=0.35)
        suite = (("6", "2", "8"), ("8", "3", "11"), ("11", "3", "14"), ("14", "3", "17"), ("17", "5", "22"))
        vus = {}
        for k, (a, b, r) in enumerate(suite):
            vus[b] = vus.get(b, 0) + 1  # « Plus 3 » dit trois fois : la n-ième
            self.somme_au_mot(a, b, r, "Plus " + b, 1.5 - 0.6 * k, xl=0.2, n=vus[b],
                              avec=[Create(pg.cote(k + 1)), Indicate(pg.lab[k + 1], color=TOUR)])
        self.au_mot("On est revenu")
        l2 = self.bloc(["Revenu au départ, avec", "6 nombres : c'est bon !"], 30, VERT_OK)
        self.col(l2, -1.95, xl=0.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Flash(dep, color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("6 nombres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Sofia achète")
        l5 = self.t("Sofia achète 22 m de bordure.", 32, VERT_OK)
        gauche(l5, -6.2, -3.05)  # sous la figure, en grand (à droite, la zone de Ti-Margo le rapetissait)
        self.play(FadeIn(l5, shift=UP * 0.1), Create(pg.contour(couleur=BOIS, sw=7)), run_time=0.5)
        self.insister(l5, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = FigureCotee([(0, 0), (6, 0), (-0.25, 4.99)], ["6 cm", "8 cm", "5 cm"], e=0.5, centre=P(-3.6, 1.15),
                        fs=30, remplir=DEDANS)

        def autres_q(sc):
            sc.play(FadeIn(t), run_time=0.35)
            for i in range(3):
                sc.add(t.lab[i])

        def apres(sc):
            lg = sc.rep_bas(0, ["6 + 8 = 14,", "14", "+ 5", "= 19."], fs=32, buff=0.3)
            hors_audit(lg[1])  # 14 : déjà dit, déjà écrit
            sc.au_mot("6 plus 8")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(t.cote(0)), Create(t.cote(1)), run_time=0.3)
            sc.au_mot("Plus 5")
            sc.play(FadeIn(lg[1:3], shift=UP * 0.1), Create(t.cote(2)), run_time=0.25)
            sc.play(FadeIn(lg[3], shift=UP * 0.1), run_time=0.2)
            lg2 = sc.rep_bas(1, ["3 côtés, 3 nombres."], fs=32)
            hors_audit(lg2)  # « trois » dit en lettres
            sc.au_mot("Trois côtés")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            lg3 = sc.rep_bas(2, ["Le périmètre : 19 cm."], fs=32)
            sc.au_mot("le périmètre est")
            sc.play(FadeIn(lg3[0], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Un triangle a trois côtés :", "6 cm, 8 cm et 5 cm.",
                                                           "Quel est son périmètre ?"],
                            [self.choix("14 centimètres"), self.choix("19 centimètres"), self.choix("13 centimètres")], 1,
                            ["6 + 8 = 14, 14 + 5 = 19.", "3 côtés, 3 nombres.", "Le périmètre : 19 cm."],
                            mot_q="Un triangle", autres_q=autres_q, autres_r=apres)

    # ── 05 : sur un quadrillage ─────────────────────────────────────────────
    def ecran_quadrillage(self):
        self.ecran("05-quadrillage")
        qd = Quadrillage(P(-5.5, -1.4), c=0.75)
        self.au_mot("Et sur un quadrillage")
        tit = self.t("Et sur un quadrillage ?", 40, JAUNE_TITRE)
        self.col(tit, 2.85, xl=-6.2)
        self.play(FadeIn(qd.lignes), Create(qd.bord), FadeIn(tit, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Chaque côté de carreau")
        l1 = self.bloc(["Chaque côté de carreau", "mesure 1 cm."], 32)
        self.col(l1, 1.75, xl=0.6)
        seg = qd.segments()
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("mesure")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 centimètre")
        un = self.t("1 cm", 26, TOUR).next_to(seg[0], DOWN, buff=0.12)
        self.play(Create(seg[0]), FadeIn(un, scale=1.3), run_time=0.35)
        self.au_mot("On suit le bord")
        l2 = self.bloc(["On suit le bord avec le doigt,", "et on compte :"], 32, TOUR)
        self.col(l2, 0.35, xl=0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeOut(un), FadeOut(seg[0]), run_time=0.3)
        self.au_mot("on compte")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        c = qd.get_center()
        nums = VGroup()
        for i, sg in enumerate(seg):
            m = sg.get_center()
            d = (m - c) / (np.linalg.norm(m - c) or 1)
            nums.add(self.t(str(i + 1), 22, JAUNE_TITRE).move_to(m + d * 0.3))
        for i, mot in enumerate(("1,", "2,", "3,")):
            self.au_mot(mot)
            self.play(Create(seg[i]), FadeIn(nums[i], scale=1.4), run_time=0.22)
        self.au_mot("et ainsi de suite")
        self.play(LaggedStart(*[Create(seg[i]) for i in range(3, 13)], lag_ratio=0.3), run_time=1.1)
        self.au_mot("jusqu'à 14")
        self.play(Create(seg[13]), FadeIn(nums[13], scale=1.6), run_time=0.3)
        self.au_mot("14 centimètres")
        self.wait(0.07)
        g = self.gros("Périmètre : 14 cm", fs=36)
        self.col(g, -1.25, xl=0.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 06 : le piège (les carreaux, c'est le dedans) ───────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        qd = Quadrillage(P(-5.5, -1.4), c=0.75)
        self.add(qd)
        self.au_mot("Cette figure a 9")
        l1 = self.t("Cette figure a 9 carreaux.", 32)
        self.col(l1, 1.9, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(k, scale=0.6) for k in qd.cases], lag_ratio=0.15),
                  run_time=0.7)
        self.au_mot("Mais 9")
        l2 = self.bloc(["Mais 9, ce n'est pas", "son périmètre !"], 32, ROUGE_ERREUR)
        self.col(l2, 0.85, xl=0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("son périmètre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Les carreaux")
        l3 = self.t("Les carreaux, c'est le dedans.", 32, "#7dd3fc")
        self.col(l3, -0.2, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(qd.cases, color="#7dd3fc", scale_factor=1.05), run_time=0.45)
        self.au_mot("Le périmètre, c'est le bord")
        l4 = self.t("Le périmètre, c'est le bord :", 32, TOUR)
        self.col(l4, -1.0, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(Polygon(*qd.pts, stroke_color=TOUR, stroke_width=10)), run_time=0.6)
        self.au_mot("14 centimètres")
        g = self.gros("14 cm", fs=40)
        self.col(g, -2.0, xl=0.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.35)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    PENTA = [(7, 0), (7.11, 4.0), (1.73, 6.65), (-0.74, 4.95), (0, 0)]  # côtés 4, 6, 3, 5, 7

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = FigureCotee(self.PENTA, ["4 cm", "6 cm", "3 cm", "5 cm", "7 cm"], e=0.36, centre=P(-3.7, 1.2), fs=26,
                        remplir=DEDANS)

        def autres_q(sc):
            sc.play(FadeIn(f), run_time=0.35)
            for i in range(5):
                sc.add(f.lab[i])

        def apres(sc):
            lg = sc.rep_bas(0, ["4 + 6 + 3 + 5 + 7 = 25."], fs=32)
            sc.au_mot("4 plus 6")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(f.contour(sw=7)), run_time=0.4)
            lg2 = sc.rep_bas(1, ["Sans le 7 : 18."], fs=32)
            sc.au_mot("Sans le 7")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Indicate(f.lab[4], color=ROUGE_ERREUR, scale_factor=1.5),
                    run_time=0.4)
            lg3 = sc.rep_bas(2, ["Léa a oublié le dernier côté."], fs=32)
            sc.au_mot("Léa a oublié")
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), run_time=0.3)
            sc.rep_fini()

        self.XL = -0.9  # la colonne s'élargit : les choix gardent leur taille
        self.question_pause("07-question", "07b-reponse",
                            ["Une figure a 5 côtés.", "Léa trouve 18 cm.", "Quelle est son erreur ?"],
                            [self.choix("Elle a compté" + chr(10) + "un côté deux fois.", 26),
                             self.choix("Elle a multiplié.", 26), self.choix("Elle a oublié un côté.", 26)], 2,
                            ["4 + 6 + 3 + 5 + 7 = 25.", "Sans le 7 : 18.", "Léa a oublié le dernier côté."],
                            mot_q="Une figure", autres_q=autres_q, autres_r=apres)
        del self.XL

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def hexagone(self):
        pts = [(3 * np.cos(PI / 3 * k), 3 * np.sin(PI / 3 * k)) for k in range(6)]
        return FigureCotee(pts, ["3 m"] * 6, e=0.48, centre=P(-3.4, 0.0), fs=28, remplir="#7c2d12")

    def fleurs(self, hx):
        c = hx.get_center()
        g = VGroup()
        for dx, dy, coul in ((-0.5, 0.3, "#f472b6"), (0.4, 0.45, "#facc15"), (0.0, -0.4, "#a78bfa"), (0.6, -0.3, "#fb7185"),
                             (-0.6, -0.35, "#fde047")):
            g.add(VGroup(*[Circle(radius=0.09, fill_color=coul, fill_opacity=1, stroke_width=0)
                           .move_to(c + P(dx + 0.12 * np.cos(a), dy + 0.12 * np.sin(a))) for a in np.arange(0, 2 * PI, PI / 2.5)],
                         Circle(radius=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(c + P(dx, dy))))
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        hx = self.hexagone()
        fl = self.fleurs(hx)
        self.au_mot("Sofia plante")
        l0 = self.bloc(["Sofia plante des fleurs dans", "un parterre à 6 côtés égaux."], 32)
        self.col(l0, 2.1)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(hx), FadeIn(fl), run_time=0.4)
        self.au_mot("un parterre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 mètres")
        l1 = self.t("Chaque côté mesure 3 m.", 32)
        self.col(l1, 1.05)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in hx.lab], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres de", "bordure pour en faire", "le tour ?"], 34, JAUNE_TITRE)
        self.col(q, -0.15)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(fl), run_time=0.5)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        hx = self.hexagone()
        self.add(hx, *hx.lab)
        self.au_mot("6 côtés de 3")
        l0 = self.t("6 côtés de 3 m.", 34)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = hors_audit(self.t("3 + 3 = 6", 36, BLEU_D))  # « 3 plus 3 » n'a pas de marques : posé au « 6. »
        self.col(l1, 1.5)
        self.au_mot("6.")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(hx.cote(0)), Create(hx.cote(1)), run_time=0.3)
        suite = (("6", "9"), ("9", "12"), ("12", "15"), ("15", "18"))
        for k, (a, r) in enumerate(suite):
            self.somme_au_mot(a, "3", r, "3, " + r + ".", 0.92 - 0.58 * k, avec=[Create(hx.cote(k + 2))],
                              res_mot=r + ".")  # « + 3 » au 3 dit (pas au « Plus »), « = r » à son nombre
        self.au_mot("18 mètres de bordure")
        g = self.gros("18 m de bordure", fs=40)
        for x in g.get_family():
            x.sans_synchro = True  # posé AU NOMBRE (« bordure » suit)
        self.col(g, -1.95)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pg = potager(ORIGIN, e=0.36)
        tour = pg.contour(sw=8)
        pts = points_cotes(pg, r=0.1)
        fig = VGroup(pg, tour, pts)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour le périmètre d'un polygone,", "on compte d'abord ses côtés."),
            ("On les ajoute tous,", "en faisant le tour."),
            ("Un point sur chaque côté :", "on n'en oublie aucun.")], fs=32, x_fig=-4.5)
        self.remove(tour, pts)
        self.add(pg)
        self.au_mot("Pour le périmètre")
        self.montrer_ligne(lignes[0], FadeIn(pts, lag_ratio=0.2))
        self.au_mot("On les ajoute")
        self.montrer_ligne(lignes[1], Create(tour))
        self.au_mot("Un point sur")
        self.montrer_ligne(lignes[2], Indicate(pts, color=JAUNE_TITRE, scale_factor=1.6))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_quadrillage()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetrePolygoneCE2(PerimetrePolygoneBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
