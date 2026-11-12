# calcul_pose_division.py
# EleveAI — Maths 6e — série « Calcul posé », épisode 04 : LA DIVISION POSÉE
# (micro entier_division_posee, notion entier_calcul_pose), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-pose-division.js).
# Décor et métier : Maëlle, LOGISTICIENNE (matrice métiers ; centres : transports, jeux-defis).
# Méthode : combien de fois le diviseur rentre (les tables), le reste plus petit que le diviseur,
# la potence (on abaisse le chiffre suivant), le sens du reste (une camionnette de plus), la vérification.
# Écrans : garde (00), situation 58 colis (01), les tables (02), le reste (03), QUESTION 1 (04, réponse A),
# la potence 157 ÷ 6 (05) et ses étapes (06), le sens du reste (07), vérifier (08), QUESTION 2 (09, réponse C),
# défi 245 ÷ 8 (10) et correction (10b), appris (11), fin (12).
# Voix : manim/voix/6e-calcul-pose-division.json ; marques : calcul_pose_division_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/calcul_pose_division.py CalculPoseDivision6e
# python -m manim render -qh --disable_caching manim/scripts/6e/calcul_pose_division.py CalculPoseDivision6e -o eleveai-maths-6e-calcul-pose-division --media_dir manim/scripts/6e/media-cp-04
# Sortie : manim/sorties/6e/maths/calcul-pose/04-division/eleveai-maths-6e-calcul-pose-division.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from calcul_pose_commun import *  # noqa: E402,F403
from decimal_diviser_par_entier import Potence as _Potence  # noqa: E402
from calcul_pose_multiplication import PoseX, FOIS  # noqa: E402

DIV = "÷"
GRIS = "#94a3b8"


class Potence(_Potence):
    """La potence de decimal_diviser_par_entier, avec un trait du quotient de longueur lq."""

    def __init__(self, ncol, diviseur, lq=2.0, **k):
        self._memo = {}
        super().__init__(ncol, diviseur, **k)
        self.remove(self.barre_h)
        self.barre_h = Line(P(self.xb, self.y0 - 0.45), P(self.xb + lq, self.y0 - 0.45), color=WHITE, stroke_width=5)
        self.add(self.barre_h)

    def chiffre(self, ligne, col, s, c=WHITE):
        cle = ("c", ligne, col, str(s))
        if cle not in self._memo:
            self._memo[cle] = super().chiffre(ligne, col, s, c)
        return self._memo[cle]

    def q(self, k, s, c=VERT_OK):
        cle = ("q", k, str(s))
        if cle not in self._memo:
            self._memo[cle] = super().q(k, s, c)
        return self._memo[cle]

    def nombre(self, ligne, col0, s, c=WHITE):
        """Un nombre de plusieurs chiffres, son premier chiffre dans la colonne col0."""
        return VGroup(*[self.chiffre(ligne, col0 + k, ch, c) for k, ch in enumerate(s)])

    def cadre(self):
        return VGroup(self.barre_v, self.barre_h, self.div)


def maelle(s=1.0):
    """Maëlle, logisticienne : gilet jaune à bandes, cheveux longs."""
    p = visage(personne(peau="#f1c27d", tenue="#0f766e", cheveux="#92400e", longs=True, s=s))
    c, w, h = p.corps.get_center(), p.corps.width, p.corps.height
    gilet = VGroup(*[Rectangle(width=w * 0.2, height=h * 0.86, fill_color="#facc15", fill_opacity=1, stroke_width=0)
                     .move_to(c + P(x * w, 0)) for x in (-0.24, 0.24)])
    bande = Rectangle(width=w * 0.78, height=h * 0.08, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0) \
        .move_to(c + P(0, -h * 0.12))
    p.add(gilet, bande)
    return p


def colis(x, y, a=0.34, c="#b45309"):
    b = Square(a, fill_color=c, fill_opacity=1, stroke_color="#78350f", stroke_width=2).move_to(P(x, y))
    ruban = Line(b.get_top(), b.get_bottom(), color="#fde68a", stroke_width=2)
    return VGroup(b, ruban)


def camionnette(s=1.0, caisse="#e2e8f0"):
    cs = RoundedRectangle(width=2.2 * s, height=1.2 * s, corner_radius=0.1 * s, fill_color=caisse, fill_opacity=1,
                          stroke_color="#94a3b8", stroke_width=3)
    cab = RoundedRectangle(width=0.9 * s, height=0.85 * s, corner_radius=0.15 * s, fill_color="#3b82f6",
                           fill_opacity=1, stroke_width=0).next_to(cs, RIGHT, buff=0.02 * s).align_to(cs, DOWN)
    vitre = RoundedRectangle(width=0.4 * s, height=0.32 * s, corner_radius=0.06 * s, fill_color="#bae6fd",
                             fill_opacity=1, stroke_width=0).move_to(cab.get_center() + P(0.15 * s, 0.17 * s))
    roues = VGroup(*[Circle(radius=0.2 * s, fill_color="#1f2937", fill_opacity=1, stroke_color="#94a3b8",
                            stroke_width=2).move_to(P(x * s, -0.62 * s)) for x in (-0.6, 1.1)])
    g = VGroup(cs, cab, vitre, roues)
    g.caisse = cs
    return g


def mini_camion(x, y, c=VERT_OK):
    cs = Rectangle(width=0.36, height=0.22, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))
    cab = Rectangle(width=0.14, height=0.15, fill_color="#3b82f6", fill_opacity=1, stroke_width=0) \
        .next_to(cs, RIGHT, buff=0.01).align_to(cs, DOWN)
    roues = VGroup(*[Dot(P(x + dx, y - 0.13), radius=0.045, color="#e2e8f0") for dx in (-0.1, 0.16)])
    return VGroup(cs, cab, roues)


def voiture(x, y, n=4, c=BLEU_D, s=1.0):
    """Une petite voiture vue de côté, n élèves (points) dedans."""
    corps = RoundedRectangle(width=0.9 * s, height=0.32 * s, corner_radius=0.1 * s, fill_color=c, fill_opacity=1,
                             stroke_width=0).move_to(P(x, y))
    toit = RoundedRectangle(width=0.5 * s, height=0.24 * s, corner_radius=0.08 * s, fill_color=c, fill_opacity=1,
                            stroke_width=0).move_to(P(x, y + 0.24 * s))
    roues = VGroup(*[Dot(P(x + dx * s, y - 0.17 * s), radius=0.08 * s, color="#1f2937") for dx in (-0.26, 0.26)])
    eleves = VGroup(*[Dot(P(x + (-0.3 + 0.2 * k) * s, y + 0.02 * s), radius=0.065 * s, color="#fde68a")
                      for k in range(n)])
    return VGroup(corps, toit, roues, eleves)


class CalculPoseDivisionBase(PaysageCalculPose):
    nom_voix = "6e-calcul-pose-division"
    fichier_marques = "calcul_pose_division_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    def ecrire(self, morceaux, mot, x0, y, fs=32, autres=(), buff=0.18, n=1):
        """Une ligne, bord gauche en x0, posée au mot ; UN play par morceau (chaque morceau attend son
        mot) ; (texte, couleur, mot) : ce morceau attend aussi le mot donné (un nombre seul)."""
        mots = [m[2] if len(m) > 2 else None for m in morceaux]
        lg = self.ligne([m[:2] for m in morceaux], fs, buff=buff)
        gauche(lg, x0, y)
        if mot:
            self.au_mot(mot, n)
        for k, m in enumerate(lg):
            if mots[k]:
                self.au_mot(*(mots[k] if isinstance(mots[k], tuple) else (mots[k],)))
            self.play(FadeIn(m, shift=UP * 0.1), *(autres if k == 0 else []), run_time=0.25)
        return lg

    def montrer(self, lg, mots, avec=None):
        """Les morceaux d'une ligne déjà placée (rep_bas), chacun à son mot, avec ses animations."""
        avec = avec or {}
        for k, m in enumerate(lg):
            if mots[k]:
                self.au_mot(mots[k])
            self.play(FadeIn(m, shift=UP * 0.1), *avec.get(k, []), run_time=0.25)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La division posée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La division")
        po = Potence(2, 7, lq=1.2, x0=1.7, y0=1.1, w=0.6, dy=0.7, fs=48, nlig=3)
        chif = VGroup(po.nombre(0, 0, "58"), po.q(0, 8), po.moins(1, 0), po.nombre(1, 0, "56", GRIS), po.trait(1, 0, 1))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), Create(po.barre_v), Create(po.barre_h),
                  FadeIn(po.div), FadeIn(chif), run_time=0.7)
        q = self.t("Que veut dire le reste ?", 42)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        reste = po.chiffre(2, 1, "2", ORANGE_RETENUE)
        rond = Circle(radius=0.38, color=ORANGE_RETENUE, stroke_width=5).move_to(reste)
        pt = self.t("?", 52, ORANGE_RETENUE).next_to(rond, RIGHT, buff=0.2)
        self.au_mot("Que veut dire")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(reste, scale=1.6), Create(rond), FadeIn(pt, scale=2), run_time=0.4)
        self.play(Wiggle(pt), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maëlle et ses 58 colis ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ml = maelle(1.05).move_to(P(-5.3, -0.2))
        self.au_mot("Voici Maëlle")
        nom = self.t("Maëlle", 42, BLEU_CALCUL).next_to(ml, UP, buff=0.25)
        self.play(FadeIn(ml, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("logisticienne")
        met = self.t("logisticienne", 30, BLEU_CALCUL).next_to(ml, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.ecrire([("Elle organise les livraisons.", WHITE)], "elle organise", -3.6, 3.0)
        tas = VGroup(*[colis(-3.4 + 0.44 * (i % 10), 1.75 - 0.44 * (i // 10)) for i in range(58)])
        l1 = self.t("58 colis", 34, AMBRE_D).next_to(tas, DOWN, buff=0.25)
        self.au_mot("58 colis")
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in tas], lag_ratio=0.02), FadeIn(l1, shift=UP * 0.1),
                  run_time=0.9)
        cam = camionnette(0.95).move_to(P(4.1, 0.7))
        dans = VGroup(*[colis(0, 0, 0.26) for _ in range(7)]).arrange_in_grid(2, 4, buff=0.06).move_to(cam.caisse)
        self.au_mot("Une camionnette")
        l2 = self.t("Une camionnette :", 32).next_to(cam, UP, buff=0.3)
        self.play(FadeIn(cam, shift=LEFT * 0.4), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.t("7 colis.", 32, AMBRE_D).next_to(cam, DOWN, buff=0.25)
        for f in l3.get_family():
            f.sans_synchro = True  # posé au « 7 » (« colis » n'est pas redit)
        self.au_mot("7. Combien")
        self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in dans], lag_ratio=0.1), FadeIn(l3, scale=1.2),
                  run_time=0.5)
        self.au_mot("Combien")
        q = self.t("Combien de camionnettes pleines ?", 42, JAUNE_TITRE).move_to(P(0.6, -2.7))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les tables ─────────────────────────────────────────────────────
    def ecran_tables(self):
        self.ecran("02-tables")
        xg = lambda i: (0.9 + 0.5 * (i % 10), 1.8 - 0.5 * (i // 10))  # noqa: E731
        xc = lambda i: (0.9 + 0.62 * (i // 7), 1.9 - 0.46 * (i % 7))  # noqa: E731
        tas = VGroup(*[colis(*xg(i)) for i in range(58)])
        self.add(tas)
        x0 = -6.2
        self.ecrire([("On cherche combien de fois", WHITE)], "On cherche", x0, 2.6)
        self.ecrire([("7", AMBRE_D), ("rentre dans", WHITE), ("58.", WHITE, "58. 7")], "7 rentre", x0, 1.95)
        self.au_mot("7 fois 8")
        anims = []
        for i, b in enumerate(tas):
            k = i // 7
            coul = (AMBRE_D if k % 2 == 0 else BLEU_D) if i < 56 else GRIS
            anims.append(b.animate.move_to(P(*xc(i))).set_fill(coul))
        self.play(*anims, run_time=1.0)
        nums = VGroup(*[hors_audit(self.t(str(k + 1), 24, GRIS)).move_to(P(0.9 + 0.62 * k, -1.45)) for k in range(8)])
        l1 = self.ecrire([("7 " + FOIS + " 8 =", WHITE), ("56.", VERT_OK, "56. 7")], None, x0, 0.9,
                         autres=[LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.1)])
        ch = self.coche(taille=0.4).next_to(l1, RIGHT, buff=0.3)
        self.play(Create(ch), run_time=0.3)
        neuf = DashedVMobject(Rectangle(width=0.5, height=3.2, stroke_color=ROUGE_ERREUR, stroke_width=4),
                              num_dashes=30).move_to(P(0.9 + 0.62 * 8, 1.9 - 0.46 * 3))
        self.ecrire([("7 " + FOIS + " 9 =", WHITE), ("63 :", ROUGE_ERREUR, "63 :"), ("c'est trop.", ROUGE_ERREUR)],
                    "7 fois 9", x0, 0.2, autres=[Create(neuf)])
        g = self.ecrire([("Donc", WHITE), ("8 camionnettes pleines.", VERT_OK)], "Donc 8", x0, -0.9)
        self.play(Indicate(VGroup(*tas[:56]), color=VERT_OK, scale_factor=1.05), run_time=0.6)
        del g
        self.attendre_voix()

    # ── 03 : le reste ───────────────────────────────────────────────────────
    def ecran_reste(self):
        self.ecran("03-reste")
        x0 = -6.2
        self.ecrire([("Il reste", WHITE), ("58 " + MOINS, WHITE), ("56 :", WHITE, "56 :"), ("2 colis.", ORANGE_RETENUE)],
                    "Il reste 58", x0, 2.8)
        deux = VGroup(colis(5.0, 2.8), colis(5.5, 2.8))
        self.play(FadeIn(deux, scale=1.5), run_time=0.3)
        self.au_mot("On écrit")
        t0 = self.t("On écrit :", 38, JAUNE_TITRE)
        gauche(t0, x0, 1.6)
        self.play(FadeIn(t0, shift=UP * 0.1), run_time=0.25)
        eq = self.ligne([("58", WHITE), ("=", WHITE), ("7 " + FOIS, BLEU_D), ("8", VERT_OK), ("+ 2", ORANGE_RETENUE)],
                        80, buff=0.45)  # 0,3 : « ×8+ » collés
        eq.move_to(P(0, 0.3))
        for k, mot in enumerate(("58 égale", None, "7 fois 8", "8, plus", "plus 2")):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(eq[k], scale=1.2), run_time=0.25)
        fq = Arrow(eq[3].get_bottom() + DOWN * 0.1, eq[3].get_bottom() + DOWN * 1.0, color=VERT_OK, buff=0,
                   stroke_width=5)
        lq = self.t("le quotient", 36, VERT_OK).next_to(fq, DOWN, buff=0.12)
        self.au_mot("8, c'est")
        self.play(GrowArrow(fq), Indicate(eq[3], color=VERT_OK, scale_factor=1.4), run_time=0.35)
        self.play(FadeIn(lq, shift=UP * 0.1), run_time=0.25)
        fr = Arrow(eq[4].get_bottom() + DOWN * 0.1, eq[4].get_bottom() + DOWN * 1.0, color=ORANGE_RETENUE, buff=0,
                   stroke_width=5)
        lr = self.t("le reste", 36, ORANGE_RETENUE).next_to(fr, DOWN, buff=0.12)
        self.au_mot("2, c'est")
        self.play(GrowArrow(fr), Indicate(eq[4], color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.35)
        self.play(FadeIn(lr, shift=UP * 0.1), run_time=0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Potence(2, 5, lq=1.2, x0=-5.9, y0=2.0, w=0.72, dy=0.8, fs=56, nlig=3)
        d47 = po.nombre(0, 0, "47")

        def autres_q(sc):
            sc.play(Create(po.barre_v), Create(po.barre_h), FadeIn(po.div), FadeIn(d47), run_time=0.35)

        def apres(sc):
            b = lambda i, m: sc.rep_bas(i, m, pas=0.54, buff=0.2)  # noqa: E731
            sc.montrer(b(0, ["5 " + FOIS + " 9 =", "45."]), ["5 fois 9", "45. 47"],
                       {0: [FadeIn(po.q(0, 9), scale=1.4)], 1: [FadeIn(po.moins(1, 0)),
                                                                FadeIn(po.nombre(1, 0, "45", GRIS)),
                                                                Create(po.trait(1, 0, 1))]})
            sc.montrer(b(1, ["47 " + MOINS + " 45 =", "2."]), ["47 moins", "2. Le"],
                       {1: [FadeIn(po.chiffre(2, 1, "2", ORANGE_RETENUE), scale=1.5)]})
            sc.montrer(b(2, ["Le reste est", ("2.", ORANGE_RETENUE)]), ["Le reste est", "2. Il"])
            sc.montrer(b(3, ["Il est plus petit que", "5 :", "c'est bon."]), ["Il est plus", "5 : c'est", None])
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Dans 47 " + DIV + " 5,", "quel est le reste ?"],
                            [self.t("2", 36), self.t("7", 36), self.t("9", 36)], 0,
                            ["5 × 9 = 45.", "47 − 45 = 2.", "Le reste est 2.", "Il est plus petit que 5 : c'est bon."],
                            mot_q="Dans 47", autres_q=autres_q, autres_r=apres)

    # ── 05 : la potence, puis 06 : les étapes ───────────────────────────────
    def ecran_potence(self):
        self.ecran("05-potence")
        po = Potence(3, 6, lq=1.9, x0=-6.2, y0=2.3, w=0.8, dy=0.8, fs=62, nlig=5)
        x0 = -0.7
        col = VGroup()
        col.add(self.ecrire([("Pour un grand nombre,", JAUNE_TITRE)], "Pour un grand", x0, 3.0))
        col.add(self.ecrire([("on pose la division", WHITE)], "on pose", x0, 2.4))
        nomp = self.t("la potence", 30, BLEU_CALCUL).next_to(po.barre_v, DOWN, buff=0.15)
        col.add(self.ecrire([("dans une potence.", BLEU_CALCUL)], "dans une potence", x0, 1.8,
                            autres=[Create(po.barre_v), Create(po.barre_h)]))
        self.play(FadeIn(nomp, shift=UP * 0.1), run_time=0.3)
        col.add(self.ecrire([("Maëlle doit envoyer", WHITE), ("157 colis,", AMBRE_D)], "Maëlle doit", x0, 0.8))
        col.add(self.ecrire([("avec des camionnettes de", WHITE), ("6.", BLEU_D, "6. On")], "avec des", x0, 0.2))
        d157 = VGroup(po.chiffre(0, 0, "1", ROSE_D), po.chiffre(0, 1, "5", AMBRE_D), po.chiffre(0, 2, "7", BLEU_D))
        col.add(self.ecrire([("On écrit", WHITE), ("157", AMBRE_D, "157 à gauche"), ("à gauche,", AMBRE_D)], "On écrit",
                            x0, -0.8))
        self.play(FadeIn(d157, shift=DOWN * 0.2), run_time=0.3)
        col.add(self.ecrire([("et", WHITE), ("6", BLEU_D, "6 à droite"), ("à droite.", BLEU_D)], "et 6", x0, -1.4))
        self.play(FadeIn(po.div, scale=1.4), FadeOut(nomp), run_time=0.3)
        self.attendre_voix()
        self.play(FadeOut(col), run_time=0.3)
        # 06 : les étapes
        self.dire("06-etapes")
        x0, fs = -0.9, 30
        cerc = Circle(radius=0.38, color=ROUGE_ERREUR, stroke_width=5).move_to(d157[0])
        self.ecrire([("1 centaine,", ROSE_D), ("c'est trop petit pour 6.", ROUGE_ERREUR)], "1 centaine", x0, 3.0, fs=fs,
                    autres=[Create(cerc)])
        acc = Brace(VGroup(d157[0], d157[1]), DOWN, buff=0.05, color=AMBRE_D)
        self.ecrire([("Alors on prend", WHITE), ("15 dizaines.", AMBRE_D)], "Alors on prend", x0, 2.4, fs=fs,
                    autres=[FadeOut(cerc)])
        self.play(GrowFromCenter(acc), run_time=0.3)
        self.ecrire([("6 " + FOIS + " 2 = 12 :", WHITE), ("j'écris", VERT_OK), ("2", VERT_OK, "2 au quotient"),
                     ("au quotient.", VERT_OK)], "6 fois 2", x0, 1.8, fs=fs,
                    autres=[FadeOut(acc)])
        self.play(FadeIn(po.q(0, 2), scale=1.5), FadeIn(po.moins(1, 0)), FadeIn(po.nombre(1, 0, "12", GRIS)),
                  Create(po.trait(1, 0, 1)), run_time=0.35)
        self.ecrire([("15 " + MOINS + " 12 =", WHITE), ("3.", ORANGE_RETENUE, "3. J'abaisse")], "15 moins", x0, 1.2,
                    fs=fs, autres=[])
        self.play(FadeIn(po.chiffre(2, 1, "3", ORANGE_RETENUE), scale=1.5), run_time=0.3)
        self.ecrire([("J'abaisse le 7 :", BLEU_D), ("37.", WHITE, "37. 6")], "J'abaisse", x0, 0.6, fs=fs,
                    autres=[GrowArrow(po.abaisse(2, 2)), FadeIn(po.chiffre(2, 2, "7", BLEU_D), shift=DOWN * 0.6)])
        self.ecrire([("6 " + FOIS + " 6 = 36 :", WHITE), ("j'écris", VERT_OK), ("6.", VERT_OK, "6. 37")], "6 fois 6", x0,
                    0.0, fs=fs)
        self.play(FadeIn(po.q(1, 6), scale=1.5), FadeIn(po.moins(3, 1)), FadeIn(po.nombre(3, 1, "36", GRIS)),
                  Create(po.trait(3, 1, 2)), run_time=0.35)
        self.ecrire([("37 " + MOINS + " 36 =", WHITE), ("1.", ORANGE_RETENUE, "1. Le")], "37 moins", x0, -0.6, fs=fs)
        un = po.chiffre(4, 2, "1", ORANGE_RETENUE)
        self.play(FadeIn(un, scale=1.5), run_time=0.3)
        self.ecrire([("Le quotient est", WHITE), ("26,", VERT_OK, "26, et")], "Le quotient", x0, -1.6, fs=36)
        self.ecrire([("et le reste est", WHITE), ("1.", ORANGE_RETENUE, ("1.", 2))], "et le reste", x0, -2.3, fs=36,
                    autres=[Indicate(VGroup(po.q(0, 2), po.q(1, 6)), color=VERT_OK)])
        self.play(Circumscribe(un, color=ORANGE_RETENUE, shape=Circle, buff=0.15), run_time=0.6)
        self.attendre_voix()

    # ── 07 : le sens du reste ───────────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("07-sens")
        pos = lambda k: (-5.9 + 0.62 * (k % 9), 2.2 - 0.62 * (k // 9))  # noqa: E731
        cams = VGroup(*[mini_camion(*pos(k)) for k in range(26)])
        x0 = -0.3
        self.ecrire([("26", VERT_OK), ("camionnettes pleines,", VERT_OK)], "26 camionnettes", x0, 2.4,
                    autres=[LaggedStart(*[FadeIn(c_, scale=0.5) for c_ in cams], lag_ratio=0.03)])
        un = colis(5.0, 1.0, 0.4, ORANGE_RETENUE)
        self.ecrire([("et il reste", WHITE), ("1 colis.", ORANGE_RETENUE)], "et il reste", x0, 1.7,
                    autres=[FadeIn(un, scale=1.6)])
        self.ecrire([("Ce colis doit partir aussi !", ORANGE_RETENUE)], "Ce colis", x0, 0.2,
                    autres=[Wiggle(un)])
        c27 = mini_camion(*pos(26), c=ORANGE_RETENUE)
        self.au_mot("Maëlle a besoin")
        l1 = self.t("Maëlle a besoin de", 40)
        g = self.gros("27 camionnettes", fs=48)
        for f in g.get_family():
            f.sans_synchro = True  # posé au mot « 27 », pas à « camionnettes »
        lg = VGroup(l1, g).arrange(RIGHT, buff=0.3).move_to(P(0, -2.3))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.2)
        self.au_mot("27 camionnettes")
        self.play(FadeIn(g, scale=1.3), FadeIn(c27, scale=2), un.animate.scale(0.5).move_to(c27[0]), run_time=0.25)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : vérifier ───────────────────────────────────────────────────────
    def ecran_verif(self):
        self.ecran("08-verif")
        self.au_mot("On vérifie")
        tit = self.t("On vérifie :", 46, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.35)
        po = PoseX(["26", "6"], origine=P(-2.9, 1.8), pas=0.9, fs=66, hl=1.0)
        x0 = 0.2
        self.ecrire([("6 " + FOIS, WHITE), ("26 =", WHITE, "26, 156"), ("156.", AMBRE_D, "156. Plus")], "6 fois 26", x0,
                    1.4, fs=44, buff=0.3, autres=[FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre)])
        self.play(LaggedStart(*[FadeIn(po.prod(0, r, v, AMBRE_D), scale=1.5) for r, v in ((2, 1), (1, 5), (0, 6))],
                              lag_ratio=0.2), run_time=0.4)
        self.ecrire([("+ 1", ORANGE_RETENUE), ("= 157.", VERT_OK, "157. C'est")], "Plus 1", x0, 0.3, fs=44,
                    autres=[FadeIn(po.prod(1, 0, 1, ORANGE_RETENUE), scale=1.5), FadeIn(po.plus2()),
                            Create(po.barre2())])
        tot = VGroup(*[po.total(r, v) for r, v in ((2, 1), (1, 5), (0, 7))])
        self.play(LaggedStart(*[FadeIn(m, scale=1.5) for m in tot], lag_ratio=0.2), run_time=0.4)
        self.au_mot("C'est juste")
        ok = self.t("C'est juste !", 46, VERT_OK)
        gauche(ok, x0, -1.0)
        ch = self.coche(taille=0.5).next_to(ok, RIGHT, buff=0.3)
        self.play(FadeIn(ok, scale=1.2), Create(ch), run_time=0.45)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pos = lambda k: (-5.8 + 1.05 * (k % 4), 2.4 - 0.72 * (k // 4))  # noqa: E731
        autos = VGroup(*[voiture(*pos(k)) for k in range(12)])
        v13 = voiture(*pos(12), n=2, c=ORANGE_RETENUE)

        def autres_q(sc):
            sc.play(FadeIn(autos[0], scale=1.3), run_time=0.3)

        def apres(sc):
            b = lambda i, m: sc.rep_bas(i, m, pas=0.54, buff=0.2)  # noqa: E731
            sc.montrer(b(0, ["50 =", "4 " + FOIS, "12", ("+ 2.", ORANGE_RETENUE)]), ["50 égale", "4 fois", "12, plus", "plus 2"],
                       {2: [LaggedStart(*[FadeIn(a, scale=0.5) for a in autos[1:]], lag_ratio=0.05)]})
            sc.montrer(b(1, ["Il reste", ("2 élèves :", ORANGE_RETENUE)]), ["Il reste", "2 élèves"])
            sc.montrer(b(2, ["il faut une voiture de plus."]), ["il faut"], {0: [FadeIn(v13, scale=1.5)]})
            sc.montrer(b(3, ["13 voitures."]), ["13 voitures"])
            sc.rep_fini()

        self.question_pause("09-question", "09b-reponse",
                            ["50 élèves partent en sortie.", "Une voiture prend 4 élèves.", "Combien de voitures faut-il ?"],
                            [self.t("12", 36), self.t("2", 36), self.t("13", 36)], 2,
                            ["50 = 4 × 12 + 2.", "Il reste 2 élèves :", "il faut une voiture de plus.", "13 voitures."],
                            mot_q="50 élèves", autres_q=autres_q, autres_r=apres)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ml = maelle(0.8).move_to(P(-5.4, 0.3))

        def bouteille(x, y):
            corps = RoundedRectangle(width=0.2, height=0.5, corner_radius=0.07, fill_color="#7dd3fc", fill_opacity=0.9,
                                     stroke_color="#e0f2fe", stroke_width=2).move_to(P(x, y))
            bouchon = Rectangle(width=0.1, height=0.08, fill_color="#2563eb", fill_opacity=1, stroke_width=0) \
                .next_to(corps, UP, buff=0)
            return VGroup(corps, bouchon)

        btl = VGroup(*[bouteille(-3.9 + 0.3 * (k % 12), 1.9 - 0.7 * (k // 12)) for k in range(36)])
        carton = Rectangle(width=1.6, height=1.0, fill_color="#c2410c", fill_opacity=0.9, stroke_color="#7c2d12",
                           stroke_width=3).move_to(P(4.4, -0.2))  # à droite : les questions passent dessous
        huit = VGroup(*[bouteille(-2.65 + 0.3 * k, -0.62 - 0.0) for k in range(4)] +
                      [bouteille(-2.65 + 0.3 * k, -1.18) for k in range(4)]).scale(0.85).move_to(carton)
        self.au_mot("Maëlle range")
        self.play(FadeIn(ml, shift=UP * 0.2), LaggedStart(*[FadeIn(b_, shift=DOWN * 0.1) for b_ in btl], lag_ratio=0.02),
                  run_time=0.8)
        x0 = 0.9
        self.ecrire([("245 bouteilles d'eau", BLEU_D)], "245 bouteilles", x0, 1.9, fs=36)
        self.ecrire([("dans des cartons de", WHITE), ("8.", AMBRE_D, "8. Combien")], "dans des cartons", x0, 1.2, fs=36,
                    autres=[FadeIn(carton), FadeIn(huit)])
        self.ecrire([("Combien de cartons pleins ?", JAUNE_TITRE)], "Combien de cartons", -3.9, -1.35, fs=36)
        self.ecrire([("Combien de bouteilles restent ?", JAUNE_TITRE)], "Combien de bouteilles", -3.9, -2.0, fs=36)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        po = Potence(3, 8, lq=1.9, x0=-6.2, y0=2.2, w=0.8, dy=0.8, fs=62, nlig=3.6)
        d245 = VGroup(po.chiffre(0, 0, "2", ROSE_D), po.chiffre(0, 1, "4", AMBRE_D), po.chiffre(0, 2, "5", BLEU_D))
        self.play(Create(po.barre_v), Create(po.barre_h), FadeIn(po.div), FadeIn(d245), run_time=0.35)
        x0, fs = -0.9, 30
        acc = Brace(VGroup(d245[0], d245[1]), DOWN, buff=0.05, color=AMBRE_D)
        self.ecrire([("On prend", WHITE), ("24 dizaines :", AMBRE_D)], "On prend", x0, 2.45, fs=fs,
                    autres=[GrowFromCenter(acc)])
        self.ecrire([("8 " + FOIS + " 3 =", WHITE), ("24.", WHITE, "24. 24")], "8 fois 3", x0, 1.85, fs=fs,
                    autres=[FadeOut(acc), FadeIn(po.q(0, 3), scale=1.5)])
        self.play(FadeIn(po.moins(1, 0)), FadeIn(po.nombre(1, 0, "24", GRIS)), Create(po.trait(1, 0, 1)), run_time=0.3)
        self.ecrire([("24 " + MOINS + " 24 =", WHITE), ("0.", ORANGE_RETENUE, "0. J'abaisse")], "24 moins", x0, 1.25,
                    fs=fs)
        self.play(FadeIn(po.chiffre(2, 1, "0", ORANGE_RETENUE), scale=1.5), run_time=0.3)
        self.ecrire([("J'abaisse le 5.", BLEU_D)], "J'abaisse", x0, 0.65, fs=fs,
                    autres=[GrowArrow(po.abaisse(2, 2)), FadeIn(po.chiffre(2, 2, "5", BLEU_D), shift=DOWN * 0.6)])
        self.ecrire([("5, c'est trop petit pour 8 :", ROUGE_ERREUR)], "5, c'est", x0, 0.05, fs=fs)
        self.ecrire([("j'écris 0 au quotient.", VERT_OK)], "j'écris 0", x0, -0.55, fs=fs,
                    autres=[FadeIn(po.q(1, 0), scale=1.5)])
        self.ecrire([("30 cartons pleins,", VERT_OK)], "30 cartons", x0, -1.35, fs=36)
        self.ecrire([("et il reste", WHITE), ("5 bouteilles.", ORANGE_RETENUE)], "et il reste", x0, -2.0, fs=36,
                    autres=[Circumscribe(po.chiffre(2, 2, "5"), color=ORANGE_RETENUE, shape=Circle, buff=0.12)])
        self.ecrire([("On vérifie :", JAUNE_TITRE), ("8 " + FOIS + " 30 =", WHITE), ("240,", WHITE, "240, plus"),
                     ("+ 5 =", ORANGE_RETENUE), ("245.", VERT_OK, "245.")], "On vérifie", -6.2, -2.85, fs=32)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        po = Potence(3, 6, lq=1.1, x0=-6.0, y0=1.6, w=0.52, dy=0.58, fs=42, nlig=5)
        fig = VGroup(po.barre_v, po.barre_h, po.div, po.nombre(0, 0, "157"), po.q(0, 2), po.q(1, 6),
                     po.moins(1, 0), po.nombre(1, 0, "12", GRIS), po.trait(1, 0, 1), po.nombre(2, 1, "37"),
                     po.moins(3, 1), po.nombre(3, 1, "36", GRIS), po.trait(3, 1, 2))
        reste = po.chiffre(4, 2, "1", ORANGE_RETENUE)
        fig.add(reste)
        lignes = self.finale_gauche(fig, textes=[
            ("On cherche combien de fois le", "diviseur rentre, avec les tables."),
            ("Le reste est toujours plus", "petit que le diviseur."),
            ("On vérifie : diviseur " + FOIS + " quotient,", "plus le reste.")], fs=34, x_fig=-4.5, xl=-2.2)
        self.add(fig)
        self.au_mot("On cherche")
        self.montrer_ligne(lignes[0], Indicate(VGroup(po.q(0, 2), po.q(1, 6)), color=VERT_OK, scale_factor=1.3))
        self.au_mot("Le reste")
        self.montrer_ligne(lignes[1], Indicate(reste, color=ORANGE_RETENUE, scale_factor=1.8))
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2], Indicate(po.div, color=BLEU_CALCUL, scale_factor=1.5))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tables()
        self.ecran_reste()
        self.ecran_question1()
        self.ecran_potence()
        self.ecran_sens()
        self.ecran_verif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class CalculPoseDivision6e(CalculPoseDivisionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
