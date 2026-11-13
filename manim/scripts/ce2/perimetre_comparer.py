# perimetre_comparer.py
# EleveAI — Maths CE2 — série « Périmètre », épisode 03 : COMPARER DES PÉRIMÈTRES
# (micro ce2_perimetre_comparer, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Vidéo COMMUNE : sert aussi au CM1, au CM2… (`aussi`).
# Short jumeau : film Ti Margo (la course autour des tables : 20 pas = 20 pas).
# Décor et métier : Malik, ORGANISATEUR de courses (centre : sport).
# Écrans : 02-03 (calculer les deux tours, 120 m < 130 m), 05 (piège : carré 5 et rectangle 9 × 1, même
# tour), 06 (le compas : déplier le tour sur une ligne), questions 04 et 07, défi 08 (110 < 120 < 140).
# Voix : manim/voix/ce2-perimetre-comparer.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_comparer_marques.json (python manim/scripts/ce2/perimetre_marques.py comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/perimetre_comparer.py PerimetreComparerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_comparer.py PerimetreComparerCE2 -o eleveai-maths-ce2-perimetre-comparer --media_dir manim/scripts/ce2/media-per-03
# Sortie : manim/sorties/ce2/maths/perimetre/03-comparer/eleveai-maths-ce2-perimetre-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F403

ROUGE_T = "#dc2626"
BLEU_T = "#2563eb"
TRI_BLEU = [(15, 47.7), (0, 0), (30, 0)]  # côtés 50, 30, 50 (dans l'ordre dit)


def malik(s=1.0):
    """Malik, organisateur de courses : maillot rouge, casquette bleue, sifflet."""
    p = visage(personne(peau="#8d5524", tenue="#b91c1c", cheveux="#111827", s=s))
    p.add(casquette(p, "#2563eb"))
    sif = Circle(radius=0.07 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
    sif.move_to(p.tete.get_bottom() + P(0, -0.25 * s))
    p.add(sif)
    return p


def terrain_rouge(centre, e=0.06, textes=None, fs=28):
    return FigureCotee(rect_pts(40, 20), textes, e=e, centre=centre, fs=fs, remplir=ROUGE_T, opacite=0.55, sw=5)


def terrain_bleu(centre, e=0.06, textes=None, fs=28):
    return FigureCotee(TRI_BLEU, textes, e=e, centre=centre, fs=fs, remplir=BLEU_T, opacite=0.55, sw=5)


def compas(pointe, ecart, h=1.1, couleur="#cbd5e1"):
    """Un compas ouvert : la pointe en `pointe`, la mine à `ecart` à droite."""
    pointe = np.array(pointe)
    tete = pointe + P(ecart / 2, h)
    g = VGroup(Line(tete, pointe, color=couleur, stroke_width=5),
               Line(tete, pointe + P(ecart, 0), color=couleur, stroke_width=5),
               Dot(tete, radius=0.09, color=couleur),
               Line(tete, tete + P(0, 0.3), color=couleur, stroke_width=6))
    return g


class PerimetreComparerBase(PaysagePerimetreCE2):
    nom_voix = "ce2-perimetre-comparer"
    fichier_marques = "perimetre_comparer_marques.json"

    def somme(self, morceaux, y, mot, fs=34, x=None, xl=None, couleur=BLEU_D, avec=(), mots=None):
        """Une somme écrite au fil de la voix : le titre (« Carré : ») au mot, puis chaque
        nombre à son tour (au_fil)."""
        lg = self.ligne([(m, couleur if k else WHITE) for k, m in enumerate(morceaux)], fs, buff=0.16)
        if x is not None:
            gauche(lg, x, y)
        else:
            self.col(lg, y, xl=xl)
        self.au_mot(mot)
        self.play(FadeIn(lg[0], shift=UP * 0.08), *avec, run_time=0.25)
        if mots is None:
            self.au_fil(lg, 1)
        else:  # chaque morceau à son extrait (nombres répétés : la synchro par jetons s'y perd)
            for m, ex in zip(lg[1:], mots):
                for f in m.get_family():
                    f.sans_synchro = True  # le moment est choisi ici, l'audit vérifie toujours
                ex, n, delai = (ex if isinstance(ex, tuple) else (ex,)) + (1, 0.0)[len(ex) - 1 if isinstance(ex, tuple) else 0:]
                self.au_mot(ex, n)
                self.wait(0.07 + delai)  # au-delà de l'arrondi d'image de l'aperçu
                self.play(FadeIn(m, shift=UP * 0.08), run_time=0.18)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des périmètres", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Quel tour est", "le plus long ?"], 42)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        r = terrain_rouge(P(2.4, 0.45), e=0.045)
        b = terrain_bleu(P(5.0, 0.45), e=0.045)
        self.au_mot("Quel tour")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(r), FadeIn(b), run_time=0.4)
        self.play(Create(r.contour(sw=8)), Create(b.contour(sw=8)), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, organisateur de courses ─────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        mp = malik(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Malik")
        nom = self.t("Malik", 42, BLEU_CALCUL).next_to(mp, UP, buff=0.2)
        self.play(FadeIn(mp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("organise des courses")
        met = self.bloc(["organisateur", "de courses"], 28, BLEU_CALCUL).next_to(mp, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        r = terrain_rouge(P(-1.9, 0.6), e=0.065)
        b = terrain_bleu(P(2.2, 0.6), e=0.065)
        tr = self.t("terrain rouge", 28, "#fca5a5").next_to(r, DOWN, buff=0.25)
        tb = self.t("terrain bleu", 28, "#93c5fd").next_to(b, DOWN, buff=0.25)
        self.au_mot("le tour du terrain rouge")
        self.play(FadeIn(r), FadeIn(tr), Create(r.contour(sw=8)), run_time=0.6)
        self.au_mot("le tour du terrain bleu")
        self.play(FadeIn(b), FadeIn(tb), Create(b.contour(sw=8)), run_time=0.6)
        self.au_mot("Lequel")
        q = self.t("Lequel est le plus long ?", 40, JAUNE_TITRE).move_to(P(0.2, -2.2))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : le tour rouge ──────────────────────────────────────────────────
    def ecran_rouge(self):
        self.ecran("02-rouge")
        r = terrain_rouge(P(-3.0, 0.6), e=0.085, textes=["40 m", "20 m", "40 m", "20 m"], fs=32)
        self.au_mot("Pour comparer")
        l0 = self.bloc(["Pour comparer, on calcule", "les deux périmètres."], 32)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Le terrain rouge")
        l1 = self.t("Le terrain rouge est un rectangle.", 30, "#fca5a5")
        self.col(l1, 1.75, xl=0.1)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(r), run_time=0.4)
        for i, (mot, n) in enumerate((("40 mètres", 1), ("20 mètres", 1), ("40 mètres", 2), ("20 mètres", 2))):
            self.au_mot(mot, n)
            self.play(FadeIn(r.lab[i], scale=1.3), Create(r.cote(i)), run_time=0.3)
        lg = self.ligne([("40 + 20 = 60", BLEU_D)], 36)
        self.col(lg, 0.95)
        self.au_mot("40 plus 20")
        self.au_fil(lg)
        for k, (a, b, c) in enumerate((("60", "40", "100"), ("100", "20", "120"))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 36, buff=0.16)
            hors_audit(l[0])
            self.col(l, 0.25 - 0.75 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.au_fil(l, 2)
        self.au_mot("Le tour rouge fait")
        g = self.gros("Tour rouge : 120 m", couleur="#fca5a5", fs=36)
        self.col(g, -1.75)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le tour bleu, et on compare ────────────────────────────────────
    def ecran_bleu(self):
        self.ecran("03-bleu")
        b = terrain_bleu(P(-3.9, 0.55), e=0.075, textes=["50 m", "30 m", "50 m"], fs=32)
        self.au_mot("Le terrain bleu")
        l1 = self.t("Le terrain bleu a 3 côtés.", 32, "#93c5fd")
        hors_audit(l1)  # « trois » dit en lettres
        self.col(l1, 2.8)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(b), run_time=0.4)
        for i, (mot, n) in enumerate((("50 mètres", 1), ("30 mètres", 1), ("50 mètres", 2))):
            self.au_mot(mot, n)
            self.play(FadeIn(b.lab[i], scale=1.3), Create(b.cote(i)), run_time=0.3)
        lg = self.ligne([("50 + 30 = 80", BLEU_D)], 36)
        self.col(lg, 2.0)
        self.au_mot("plus 30")
        self.au_fil(lg)
        l2 = self.ligne([("80", BLEU_D), ("+ 50", BLEU_D), ("= 130", BLEU_D)], 36, buff=0.16)
        hors_audit(l2[0])
        self.col(l2, 1.3)
        self.au_mot("Plus 50")
        self.play(FadeIn(l2[0:2], shift=UP * 0.08), run_time=0.22)
        self.au_fil(l2, 2)
        self.au_mot("Le tour bleu fait")
        g = self.gros("Tour bleu : 130 m", couleur="#93c5fd", fs=36)
        self.col(g, 0.45)
        self.play(FadeIn(g, scale=1.2), run_time=0.2)
        self.au_mot("130, c'est")
        c1 = self.ligne([("130, c'est plus que", WHITE), ("120 :", "#fca5a5")], 32, buff=0.16)
        hors_audit(c1[0])  # 130 : déjà dit et écrit juste au-dessus
        self.col(c1, -0.35, xl=0.2)
        self.play(FadeIn(c1[0], shift=UP * 0.08), run_time=0.25)
        self.au_fil(c1, 1)
        self.au_mot("le tour bleu est le plus long")
        c2 = self.bloc(["Le tour bleu est le plus long,", "même avec 3 côtés seulement !"], 32, VERT_OK)
        self.col(c2, -1.15, xl=0.2)
        self.play(FadeIn(c2[0], shift=UP * 0.1), Indicate(b, color=BLEU_T, scale_factor=1.06), run_time=0.4)
        self.au_mot("même avec")
        self.play(FadeIn(c2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        h = 5 * np.sqrt(3) / 2
        tri = FigureCotee([(0, 0), (5, 0), (2.5, h)], ["5 cm", "5 cm", "5 cm"], e=0.36, centre=P(-5.0, 1.3), fs=24,
                          remplir=DEDANS)
        car = FigureCotee(rect_pts(4, 4), ["4 cm", None, None, None], e=0.36, centre=P(-2.4, 1.3), fs=24,
                          remplir=DEDANS)

        def autres_q(sc):
            sc.play(FadeIn(tri), FadeIn(car), run_time=0.35)
            sc.add(*tri.lab, car.lab[0])

        def apres(sc):
            lg = sc.rep_bas(0, ["Triangle :", "5", "+ 5", "+ 5", "= 15."], fs=32, y0=-1.95, pas=0.55)
            sc.au_mot("Triangle")
            sc.play(FadeIn(lg[0], shift=UP * 0.08), Create(tri.contour(sw=7)), run_time=0.3)
            sc.au_fil(lg, 1)
            lg2 = sc.rep_bas(1, ["Carré :", "4", "+ 4", "+ 4", "+ 4", "= 16."], fs=32, y0=-1.95, pas=0.55)
            sc.au_mot("Carré")
            sc.play(FadeIn(lg2[0], shift=UP * 0.08), Create(car.contour(sw=7)), run_time=0.3)
            sc.au_fil(lg2, 1)
            lg3 = sc.rep_bas(2, ["16, c'est plus que 15 : c'est le carré."], fs=32, y0=-1.95, pas=0.55)
            sc.au_mot("16, c'est")
            sc.play(FadeIn(lg3[0], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.XL = -0.3  # la colonne s'élargit : l'énoncé garde sa taille
        self.question_pause("04-question", "04b-reponse",
                            ["Un triangle a trois côtés de 5 cm.", "Un carré a quatre côtés de 4 cm.",
                             "Lequel a le plus grand périmètre ?"],
                            [self.choix("Le carré."), self.choix("Le triangle."), self.choix("Ils sont pareils.")], 0,
                            ["Triangle : 5 + 5 + 5 = 15.", "Carré : 4 + 4 + 4 + 4 = 16.",
                             "16, c'est plus que 15 : c'est le carré."],
                            mot_q="Un triangle", autres_q=autres_q, autres_r=apres)
        del self.XL

    # ── 05 : le piège (même tour) ───────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        car = FigureCotee(rect_pts(5, 5), ["5 m", None, None, None], e=0.4, centre=P(-5.0, 1.3), fs=30, remplir="#7c2d12")
        rec = FigureCotee(rect_pts(9, 1), ["9 m", "1 m", None, None], e=0.4, centre=P(-0.9, 0.9), fs=30,
                          remplir="#7c2d12")
        self.au_mot("Voici un carré")
        self.play(FadeIn(car), run_time=0.35)
        self.au_mot("5 mètres")
        self.play(FadeIn(car.lab[0], scale=1.3), run_time=0.3)
        self.au_mot("un rectangle")
        self.play(FadeIn(rec), run_time=0.35)
        self.au_mot("9 mètres")
        self.play(FadeIn(rec.lab[0], scale=1.3), run_time=0.3)
        self.au_mot("1 mètre")
        self.play(FadeIn(rec.lab[1], scale=1.3), run_time=0.3)
        self.somme(["Carré :", "5", "+ 5", "+ 5", "+ 5", "= 20."], -0.75, "Carré", x=-6.2,
                   avec=[Create(car.contour(sw=7))])
        self.somme(["Rectangle :", "9", "+ 1", "+ 9", "+ 1", "= 20."], -1.45, "Rectangle", x=-6.2,
                   avec=[Create(rec.contour(sw=7))],
                   mots=["9 plus 1 plus 9", "1 plus 9", "9 plus 1,", "1, 20", "20. Le"])
        self.au_mot("Le même périmètre")
        g = self.gros("Le même périmètre !", fs=36)
        gauche(g, -6.2, -2.4)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.au_mot("On ne juge pas")
        l = self.ligne([("On ne juge pas à l'œil :", JAUNE_TITRE), ("on calcule.", JAUNE_TITRE)], 32, buff=0.2)
        gauche(l, -6.2, -3.2)
        self.play(FadeIn(l[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on calcule")
        self.play(FadeIn(l[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 06 : sans règle, le compas ──────────────────────────────────────────
    def ecran_compas(self):
        self.ecran("06-compas")
        tri = FigureCotee([(0, 0), (4, 0), (4, 3)], None, e=0.5, centre=P(-4.9, 1.75), sw=5, remplir=DEDANS)
        car = FigureCotee(rect_pts(2.4, 2.4), None, e=0.5, centre=P(-2.0, 1.75), sw=5, remplir=DEDANS)
        self.add(tri, car)
        y1, y2, x0 = -0.35, -1.85, -6.2
        self.au_mot("Et sans règle")
        tit = self.t("Et sans règle ?", 40, JAUNE_TITRE)
        self.col(tit, 2.85, xl=0.6)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.35)
        self.au_mot("On déplie le tour")
        l1 = self.t("On déplie le tour sur une ligne.", 30)
        self.col(l1, 2.0, xl=0.6)
        base = Line(P(x0 - 0.1, y1), P(0.3, y1), color=GRAY_B, stroke_width=2)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(base), run_time=0.4)
        longs = [2.0, 1.5, 2.5]  # 4, 3, 5 à l'échelle 0,5
        x = x0
        segs = VGroup()
        c0 = tri.cote(0, TOUR, 9)
        s0 = Line(P(x, y1), P(x + longs[0], y1), color=TOUR, stroke_width=9)
        self.play(ReplacementTransform(c0, s0), run_time=0.5)
        segs.add(s0)
        x += longs[0]
        self.au_mot("Avec le compas")
        l2 = self.bloc(["Avec le compas, on reporte", "les côtés l'un après l'autre."], 30)
        self.col(l2, 1.1, xl=0.6)
        cp = compas(P(x, y1), longs[1])
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(cp), run_time=0.4)
        self.au_mot("on reporte")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        for i in (1, 2):
            L = longs[i]
            self.play(cp.animate.become(compas(P(x, y1), L)), Indicate(tri.cote(i, TOUR, 7), color=TOUR), run_time=0.25)
            arc = Arc(radius=L, start_angle=-0.18, angle=0.36, arc_center=P(x, y1), color=TOUR, stroke_width=4)
            s = Line(P(x, y1), P(x + L, y1), color=TOUR, stroke_width=9)
            self.play(Create(arc), Create(s), run_time=0.35)
            segs.add(s, arc)
            x += L
        self.play(FadeOut(cp), run_time=0.2)
        self.au_mot("Le segment obtenu")
        acc = Brace(VGroup(*[s for s in segs if isinstance(s, Line)]), DOWN, color=VERT_OK, buff=0.12)
        self.play(GrowFromCenter(acc), run_time=0.35)
        self.au_mot("c'est le périmètre")
        tp = self.t("le périmètre", 28, VERT_OK).next_to(acc, DOWN, buff=0.08)
        self.play(FadeIn(tp, scale=1.2), Create(tri.contour(sw=7)), run_time=0.4)
        self.au_mot("On fait pareil")
        l3 = self.bloc(["On fait pareil avec", "l'autre figure :", "le segment le plus long,", "c'est le plus long tour."], 32)
        self.col(l3, -0.75, xl=0.4)
        l3 = VGroup(VGroup(l3[0], l3[1]), l3[2], l3[3])  # la phrase coupée en deux lignes, montrée d'un coup
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        base2 = Line(P(x0 - 0.1, y2), P(0.3, y2), color=GRAY_B, stroke_width=2)
        self.add(base2)
        xx = x0
        for i in range(4):
            s = Line(P(xx, y2), P(xx + 1.2, y2), color="#60a5fa", stroke_width=9)
            self.play(ReplacementTransform(car.cote(i, "#60a5fa", 9), s), run_time=0.22)
            xx += 1.2
        self.au_mot("le segment le plus long")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(VGroup(*segs), color=TOUR, scale_factor=1.05), run_time=0.4)
        self.au_mot("c'est le plus long")
        self.play(FadeIn(l3[2], shift=UP * 0.1), Indicate(tri, color=TOUR, scale_factor=1.08), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        jaune = Line(P(-6.2, 1.9), P(-4.6, 1.9), color="#facc15", stroke_width=10)
        vert = Line(P(-6.2, 0.95), P(-3.3, 0.95), color="#4ade80", stroke_width=10)
        tj = self.t("tour jaune", 24, "#facc15").next_to(jaune, UP, buff=0.12).align_to(jaune, LEFT)
        tv = self.t("tour vert", 24, "#4ade80").next_to(vert, UP, buff=0.12).align_to(vert, LEFT)
        hors_audit(tj)  # des étiquettes : « deux tours » est dit avant
        hors_audit(tv)

        def autres_q(sc):
            sc.play(Create(jaune), Create(vert), FadeIn(tj), FadeIn(tv), run_time=0.4)

        def apres(sc):
            lg = sc.rep_bas(0, ["Le segment, c'est le tour déplié."], fs=32, y0=-2.32, pas=0.47)
            sc.au_mot("Le segment, c'est")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            lg2 = sc.rep_bas(1, ["Le segment le plus long donne"], fs=32, y0=-2.32, pas=0.47)
            sc.au_mot("Le segment le plus long")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Indicate(vert, color="#4ade80", scale_factor=1.06), run_time=0.35)
            lg3 = sc.rep_bas(2, ["le tour le plus long, sans rien mesurer."], fs=32, y0=-2.32, pas=0.47)
            sc.au_mot("le tour le plus long")
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), run_time=0.3)
            sc.rep_fini()

        self.XL = -0.9  # la colonne s'élargit : l'énoncé garde sa taille
        self.question_pause("07-question", "07b-reponse",
                            ["Malik déplie deux tours sur une ligne.", "Le segment vert est plus long.",
                             "Quel tour est le plus long ?"],
                            [self.choix("Le jaune.", 26), self.choix("Le vert.", 26), self.choix("On ne peut pas savoir" + chr(10) + "sans règle.", 26)],
                            1, ["Le segment, c'est le tour déplié.", "Le segment le plus long donne",
                                "le tour le plus long, sans rien mesurer."],
                            mot_q="Malik", autres_q=autres_q, autres_r=apres)
        del self.XL

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def trois(self):
        car = FigureCotee(rect_pts(30, 30), ["30 m", None, None, None], e=0.04, centre=P(-4.6, 0.2), fs=26,
                          remplir="#7c2d12", opacite=0.9)
        rec = FigureCotee(rect_pts(50, 20), ["50 m", "20 m", None, None], e=0.04, centre=P(-1.4, 0.2), fs=26,
                          remplir="#7c2d12", opacite=0.9)
        hh = np.sqrt(40 ** 2 - 15 ** 2)
        tri = FigureCotee([(0, 0), (30, 0), (15, hh)], ["30 m", "40 m", "40 m"], e=0.04, centre=P(2.2, 0.35), fs=26,
                          remplir="#7c2d12", opacite=0.9)
        return car, rec, tri

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Malik a")
        l0 = self.t("Malik a 3 parcours.", 34)
        hors_audit(l0)  # « trois » dit en lettres
        gauche(l0, -6.2, 2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        car, rec, tri = self.trois()
        for f in (car, rec, tri):
            f.shift(UP * 0.35)
            for x in f.lab:
                x.shift(UP * 0.35)
        self.au_mot("Un carré")
        self.play(FadeIn(car), run_time=0.3)
        self.au_mot("30 mètres")
        self.play(FadeIn(car.lab[0], scale=1.3), run_time=0.25)
        self.au_mot("Un rectangle")
        self.play(FadeIn(rec), run_time=0.3)
        self.au_mot("50 mètres")
        self.play(FadeIn(rec.lab[0], scale=1.3), run_time=0.25)
        self.au_mot("20 mètres")
        self.play(FadeIn(rec.lab[1], scale=1.3), run_time=0.25)
        self.au_mot("Un triangle")
        self.play(FadeIn(tri), run_time=0.3)
        self.au_mot("40,")
        self.play(FadeIn(tri.lab[1], scale=1.3), run_time=0.2)
        self.play(FadeIn(tri.lab[2], scale=1.3), run_time=0.2)
        self.play(FadeIn(tri.lab[0], scale=1.3), run_time=0.2)
        self.au_mot("Range-les")
        q = self.t("Range-les du plus court au plus long.", 34, JAUNE_TITRE)
        gauche(q, -6.2, -1.0)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.45)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        car, rec, tri = self.trois()
        for f in (car, rec, tri):
            f.shift(UP * 1.2)
            for x in f.lab:
                x.shift(UP * 1.2)
            self.add(f, *f.lab)
        tot = []
        for k, (fig, morceaux, mot) in enumerate((
                (car, ["Carré :", "30", "+ 30", "+ 30", "+ 30", "= 120."], "Carré"),
                (rec, ["Rectangle :", "50", "+ 20", "+ 50", "+ 20", "= 140."], "Rectangle"),
                (tri, ["Triangle :", "40", "+ 40", "+ 30", "= 110."], "Triangle"))):
            mots = (["30 plus", "30 plus 30 plus 30,", "30 plus 30,", ("30, 120", 1, 0.1), "120"]
                    if k == 0 else ["40 plus 40", "40 plus 30", "30, 110", "110"] if k == 2 else None)  # le 4e « 30 » n a pas de marque : juste après le 3e
            lg = self.somme(morceaux, -0.35 - 0.66 * k, mot, fs=32, x=-6.2, avec=[Create(fig.contour(sw=6))],
                            mots=mots)
            tot.append(lg[-1])
        self.au_mot("Du plus court")
        l = self.t("Du plus court au plus long :", 32, VERT_OK)
        gauche(l, -6.2, -2.4)
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.3)
        ordre = self.ligne([("le triangle,", WHITE), ("le carré,", WHITE), ("puis le rectangle.", WHITE)], 32, buff=0.2)
        gauche(ordre, -6.2, -3.1)
        for m, fig, mot in ((ordre[0], tri, "le triangle"), (ordre[1], car, "le carré"), (ordre[2], rec, "puis le rectangle")):
            self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.08), Indicate(fig, color=TOUR, scale_factor=1.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        car = FigureCotee(rect_pts(5, 5), None, e=0.3, centre=P(-0.9, 0.5), remplir="#7c2d12")
        rec = FigureCotee(rect_pts(9, 1), None, e=0.3, centre=P(0, -1.0), remplir="#7c2d12")
        t1 = car.contour(sw=7)
        t2 = rec.contour(sw=7)
        fig = VGroup(car, rec, t1, t2)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer des périmètres, on les", "calcule tous, puis on compare les nombres."),
            ("Sans règle, on déplie", "les tours au compas."),
            ("Une figure peut avoir l'air plus petite", "et avoir le même tour.")], fs=30, x_fig=-4.7, xl=-2.6)
        self.remove(t1, t2)
        self.add(car, rec)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Create(t1))
        self.au_mot("Sans règle")
        self.montrer_ligne(lignes[1], Create(t2))
        self.au_mot("Une figure peut")
        self.montrer_ligne(lignes[2], Indicate(VGroup(t1, t2), color=TOUR, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rouge()
        self.ecran_bleu()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_compas()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreComparerCE2(PerimetreComparerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
