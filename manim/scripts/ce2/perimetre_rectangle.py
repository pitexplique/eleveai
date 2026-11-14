# perimetre_rectangle.py
# EleveAI — Maths CE2 — série « Périmètre », épisode 04 : LE PÉRIMÈTRE DU RECTANGLE ET DU CARRÉ
# (micro ce2_perimetre_rectangle, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Vidéo COMMUNE : sert aussi au CM1, au CM2… (`aussi`).
# Short jumeau : film Ti Margo (la bordure du potager de Mamie : 10 × 2 = 20, mais le tour fait 24).
# Décor et métier : Kenza, COUTURIÈRE (galon autour d'un coussin ; centre : art-design).
# Exemples du coach (ce2/maths/perimetre.bank.ts, RECT) : deux longueurs et deux largeurs, doubler,
# le piège « 8 × 3 = 24 » (le périmètre s'additionne), le carré (côté × 4), le galon qui reste.
# Mapping micro → écrans : 02 (deux longueurs, deux largeurs), 03 (le tour, côté après côté),
# 04 (doubler puis ajouter), 06 (piège : multiplier), 07 (le carré : côté × 4), questions 05 et 08,
# défi 09 (150 − 130 = 20).
# Voix : manim/voix/ce2-perimetre-rectangle.json (validée le 14/11, Julie, débit −6) ;
# marques : perimetre_rectangle_marques.json (python manim/scripts/ce2/perimetre_marques.py rectangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/perimetre_rectangle.py PerimetreRectangleCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_rectangle.py PerimetreRectangleCE2 -o eleveai-maths-ce2-perimetre-rectangle --media_dir manim/scripts/ce2/media-per-04
# Sortie : manim/sorties/ce2/maths/perimetre/04-rectangle/eleveai-maths-ce2-perimetre-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F403

LONG = "#60a5fa"    # les longueurs
LARG = "#c084fc"    # les largeurs
TISSU = "#9d174d"


def kenza(s=1.0):
    """Kenza, couturière : blouse rose, mètre ruban jaune autour du cou."""
    p = visage(personne(peau="#c68642", tenue="#db2777", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    cou = c + DOWN * r * 1.25
    for sx in (-1, 1):
        p.add(Line(cou + RIGHT * sx * r * 0.45, cou + RIGHT * sx * r * 0.55 + DOWN * r * 1.5,
                   color="#facc15", stroke_width=7 * s))
    return p


def coussin(centre, e=0.07, textes=None, fs=30, L=40, l=30):
    f = FigureCotee(rect_pts(L, l), textes, e=e, centre=centre, fs=fs, remplir=TISSU, opacite=0.85, sw=4)
    w, h = L * e, l * e
    # les boutons du capitonnage
    f.add(VGroup(*[Dot(np.array(centre) + P(x * w / 4, y * h / 4), radius=0.05 * e / 0.07, color="#fbcfe8")
                   for x in (-1, 0, 1) for y in (-1, 1)]))
    return f


class PerimetreRectangleBase(PaysagePerimetreCE2):
    nom_voix = "ce2-perimetre-rectangle"
    fichier_marques = "perimetre_rectangle_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre du rectangle et du carré", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Comment calculer leur tour", "sans se tromper ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        r = FigureCotee(rect_pts(4, 2.4), None, e=0.45, centre=P(3.3, 0.4), remplir=DEDANS)
        c = FigureCotee(rect_pts(2.4, 2.4), None, e=0.45, centre=P(5.5, 0.4), remplir=DEDANS)
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(r), FadeIn(c), run_time=0.4)
        self.play(Create(r.contour(sw=8)), Create(c.contour(sw=8)), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Kenza, couturière ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        kp = kenza(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Kenza")
        nom = self.t("Kenza", 42, BLEU_CALCUL).next_to(kp, UP, buff=0.2)
        self.play(FadeIn(kp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("couturière")
        met = self.t("couturière", 30, BLEU_CALCUL).next_to(kp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        co = coussin(P(0.6, 0.55), e=0.075, textes=["40 cm", "30 cm", None, None], fs=32)
        self.au_mot("Elle coud")
        self.play(FadeIn(co, scale=0.9), run_time=0.45)
        lg = self.ligne([("un galon", TOUR), ("= un joli ruban", TOUR)], 28, buff=0.15).next_to(co, UP, buff=0.3)
        self.au_mot("un galon")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un joli ruban")
        self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("tout autour")
        self.play(Create(co.contour(sw=10)), run_time=1.2)
        self.au_mot("40 centimètres")
        self.play(FadeIn(co.lab[0], scale=1.3), Indicate(co.cote(0, LONG, 9), color=LONG), run_time=0.35)
        self.au_mot("30 centimètres")
        self.play(FadeIn(co.lab[1], scale=1.3), Indicate(co.cote(1, LARG, 9), color=LARG), run_time=0.35)
        self.au_mot("Combien")
        q = self.t("Combien de cm de galon lui faut-il ?", 36, JAUNE_TITRE).move_to(P(0.3, -2.45))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : deux longueurs, deux largeurs ──────────────────────────────────
    def ecran_cotes(self):
        self.ecran("02-cotes")
        co = coussin(P(-3.0, 0.3), e=0.085, textes=["40 cm", "30 cm", "40 cm", "30 cm"], fs=32)
        self.au_mot("Un rectangle a 4")
        l0 = self.t("Un rectangle a 4 côtés :", 34)
        self.col(l0, 2.6, xl=0.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(co), run_time=0.4)
        self.au_mot("deux longueurs")
        l1 = self.t("deux longueurs pareilles,", 34, LONG)
        self.col(l1, 1.6, xl=0.4)
        lb, lh = co.cote(0, LONG, 11), co.cote(2, LONG, 11)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(lb), Create(lh), run_time=0.5)
        self.au_mot("deux largeurs")
        l2 = self.t("deux largeurs pareilles.", 34, LARG)
        self.col(l2, 0.8, xl=0.4)
        ld, lgc = co.cote(1, LARG, 11), co.cote(3, LARG, 11)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(ld), Create(lgc), run_time=0.5)
        self.au_mot("40 centimètres en haut")
        self.play(FadeIn(co.lab[2], scale=1.3), FadeIn(co.lab[0], scale=1.3), Indicate(lh, color=LONG),
                  Indicate(lb, color=LONG), run_time=0.4)
        self.au_mot("30 centimètres à gauche")
        self.play(FadeIn(co.lab[3], scale=1.3), FadeIn(co.lab[1], scale=1.3), Indicate(lgc, color=LARG),
                  Indicate(ld, color=LARG), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le tour, côté après côté ───────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        co = coussin(P(-3.0, 0.75), e=0.085, textes=["40 cm", "30 cm", "40 cm", "30 cm"], fs=32)
        self.add(co, *co.lab)
        s = co.sommets()
        aig = depart(s[0])
        self.au_mot("On fait le tour")
        l0 = self.t("On fait le tour.", 34)
        gauche(l0, 0.9, 2.7)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(aig, scale=1.4), run_time=0.35)
        lg = self.ligne([("40 + 30 = 70", BLEU_D)], 38)
        gauche(lg, 0.9, 1.75)
        self.au_mot("40 plus 30")
        self.tour_cote(co, 0, 0.9, aig)
        self.tour_cote(co, 1, 0.35, aig)
        self.au_fil(lg)
        for k, (a, b, c, i) in enumerate((("70", "40", "110", 2), ("110", "30", "140", 3))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 38, buff=0.26)
            hors_audit(l[0])
            gauche(l, 0.9, 1.0 - 0.75 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.tour_cote(co, i, 0.35, aig)
            self.au_fil(l, 2)
        self.au_mot("140 centimètres")
        g = self.gros("Galon : 140 cm", couleur=TOUR, fs=40)
        hors_audit(g)  # posé au 2e « 140 » dit (« coud 140 centimètres »), l'audit le compare au 1er
        gauche(g, 0.9, -1.2)
        self.play(FadeIn(g, scale=1.2), Indicate(co.contour(sw=10), color=TOUR), run_time=0.45)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : doubler, puis ajouter ──────────────────────────────────────────
    def ecran_doubler(self):
        self.ecran("04-doubler")
        co = coussin(P(-3.8, 0.6), e=0.06, textes=["40 cm", "30 cm", "40 cm", "30 cm"], fs=26)
        self.add(co, *co.lab)
        self.au_mot("Autre façon")
        l0 = self.t("Autre façon :", 36, JAUNE_TITRE)
        gauche(l0, -0.7, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.somme_lg(["Les deux longueurs :", "40", "+ 40", "= 80."], 1.8, "les deux longueurs", fs=30, x=-0.7,
                      couleur=LONG, couleur0=LONG, avec=[Create(co.cote(0, LONG, 11)), Create(co.cote(2, LONG, 11))],
                      mots=["40 plus 40", "40, 80", "80. Les"])
        self.somme_lg(["Les deux largeurs :", "30", "+ 30", "= 60."], 1.0, "Les deux largeurs", fs=30, x=-0.7,
                      couleur=LARG, couleur0=LARG, avec=[Create(co.cote(1, LARG, 11)), Create(co.cote(3, LARG, 11))],
                      mots=["30 plus 30", "30, 60", "60. 80"])
        lg = self.ligne([("80", BLEU_D), ("+ 60", BLEU_D), ("= 140", BLEU_D)], 38, buff=0.26)
        gauche(lg, -0.7, 0.1)
        self.aux_extraits(lg, ["80 plus 60", "60, 140", "140. Le"])
        self.au_mot("Le même résultat")
        g = self.gros("Le même résultat !", fs=38)
        gauche(g, -0.7, -1.1)
        self.play(FadeIn(g, scale=1.2), Create(co.contour(sw=10)), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tap = FigureCotee(rect_pts(5, 2), ["5 m", "2 m", None, None], e=0.55, centre=P(-4.1, 1.35), fs=26,
                          remplir="#7c2d12")
        rayures = VGroup(*[Line(P(-4.1 - 1.3, 1.35 + y), P(-4.1 + 1.3, 1.35 + y), color="#fbbf24", stroke_width=4)
                           for y in (-0.25, 0.25)])

        def autres_q(sc):
            sc.play(FadeIn(tap), FadeIn(rayures), run_time=0.35)
            sc.add(tap.lab[0], tap.lab[1])

        def apres(sc):
            lg = sc.rep_bas(0, ["Longueurs :", "5", "+ 5", "= 10."], fs=32, y0=-1.75, pas=0.58, buff=0.26)
            sc.au_mot("Les deux longueurs")
            sc.play(FadeIn(lg[0], shift=UP * 0.08), Create(tap.cote(0, LONG, 8)), Create(tap.cote(2, LONG, 8)),
                    run_time=0.3)
            sc.aux_extraits(lg[1:], ["5 plus 5", "5, 10", "10. Les"])
            lg2 = sc.rep_bas(1, ["Largeurs :", "2", "+ 2", "= 4."], fs=32, y0=-1.75, pas=0.58, buff=0.26)
            sc.au_mot("Les deux largeurs")
            sc.play(FadeIn(lg2[0], shift=UP * 0.08), Create(tap.cote(1, LARG, 8)), Create(tap.cote(3, LARG, 8)),
                    run_time=0.3)
            sc.aux_extraits(lg2[1:], ["2 plus 2", "2, 4", "4. 10"])
            lg3 = sc.rep_bas(2, ["10", "+ 4", "= 14 :", "le périmètre est de 14 m."], fs=32, y0=-1.75, pas=0.58, buff=0.26)
            sc.aux_extraits(lg3[:3], ["10 plus 4", "4, 14", "14. Le"])
            sc.au_mot("Le périmètre est")
            sc.play(FadeIn(lg3[3], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un tapis rectangulaire mesure", "5 m de long et 2 m de large.",
                             "Quel est son périmètre ?"],
                            [self.choix("7 mètres"), self.choix("10 mètres"), self.choix("14 mètres")], 2,
                            ["Longueurs : 5 + 5 = 10.", "Largeurs : 2 + 2 = 4.",
                             "10 + 4 = 14 : le périmètre est de 14 m."], mot_q="Un tapis",
                            autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (multiplier) ──────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        r = FigureCotee(rect_pts(8, 3), ["8 cm", "3 cm", None, None], e=0.36, centre=P(-4.8, 1.35), fs=30,
                        remplir=DEDANS)
        self.au_mot("Pour un rectangle")
        self.play(FadeIn(r), run_time=0.35)
        self.au_mot("8 centimètres")
        self.play(FadeIn(r.lab[0], scale=1.3), run_time=0.3)
        self.au_mot("3 centimètres")
        self.play(FadeIn(r.lab[1], scale=1.3), run_time=0.3)
        tom = self.somme_lg(["Tom calcule :", "8 × 3", "= 24."], 2.1, "Tom calcule", fs=32, x=-1.5,
                            couleur=ROUGE_ERREUR, mots=["8 fois 3", "24. Faux"])
        self.au_mot("Faux")
        barre = Line(tom[1].get_left() + LEFT * 0.1, tom[2].get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=7)
        faux = self.t("Faux !", 34, ROUGE_ERREUR).next_to(tom, RIGHT, buff=0.25)
        self.play(Create(barre), FadeIn(faux, scale=1.3), run_time=0.35)
        self.au_mot("Multiplier")
        l1 = self.bloc(["Multiplier, ce n'est pas", "faire le tour."], 32, JAUNE_TITRE)
        l1.align_to(P(-1.5, 0), LEFT).move_to(P(l1.get_center()[0], 1.05))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        aig = depart(r.sommets()[0])
        lg = self.ligne([("8 + 3 = 11", BLEU_D)], 36)
        gauche(lg, -6.2, -0.45)
        self.au_mot("8 plus 3")
        self.play(FadeIn(aig, scale=1.4), run_time=0.2)
        self.tour_cote(r, 0, 0.3, aig)
        self.tour_cote(r, 1, 0.3, aig)
        self.au_fil(lg)
        for k, (a, b, c, i) in enumerate((("11", "8", "19", 2), ("19", "3", "22", 3))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 36, buff=0.26)
            hors_audit(l[0])
            gauche(l, -6.2, -1.15 - 0.7 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.tour_cote(r, i, 0.3, aig)
            self.au_fil(l, 2)
        self.au_mot("Le périmètre est")
        g = self.gros("Périmètre : 22 cm", fs=38)
        gauche(g, -1.5, -1.15)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : le carré ───────────────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("07-carre")
        self.au_mot("Et le carré")
        tit = self.t("Et le carré ?", 44, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        mou = FigureCotee(rect_pts(20, 20), ["20 cm", None, None, None], e=0.115, centre=P(-4.4, 0.7), fs=30,
                          remplir="#0e7490", opacite=0.8)
        brod = Square(side_length=20 * 0.115 - 0.35, color="#a5f3fc", stroke_width=2).move_to(P(-4.4, 0.7))
        cd = codes(mou, JAUNE_TITRE)
        self.play(Write(tit), FadeIn(mou), FadeIn(brod), run_time=0.4)
        self.au_mot("Ses 4 côtés")
        l1 = self.t("Ses 4 côtés sont égaux.", 34)
        gauche(l1, -1.6, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cd), run_time=0.4)
        self.au_mot("mouchoir")
        l2 = self.t("un mouchoir carré", 30, "#a5f3fc").next_to(mou, DOWN, buff=0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 centimètres")
        self.play(FadeIn(mou.lab[0], scale=1.3), run_time=0.3)
        aig = depart(mou.sommets()[0])
        lg = self.ligne([("20", BLEU_D), ("+ 20", BLEU_D), ("= 40", BLEU_D)], 36, buff=0.26)
        gauche(lg, -1.6, 1.35)
        self.play(FadeIn(aig, scale=1.4), run_time=0.2)
        self.aux_extraits(lg, ["20 plus 20", "20, 40", "40. Plus"])
        self.tour_cote(mou, 0, 0.3, aig)
        self.tour_cote(mou, 1, 0.3, aig)
        for k, (a, ex_b, ex_c, i) in enumerate((("40", "20, 60", "60. Plus", 2), ("60", "20, 80", "80. Plus", 3))):
            l = self.ligne([(a, BLEU_D), ("+ 20", BLEU_D), ("= " + ex_c[:2], BLEU_D)], 36, buff=0.26)
            hors_audit(l[0])
            gauche(l, -1.6, 0.65 - 0.7 * k)
            self.add(l[0])
            self.aux_extraits(l[1:], [ex_b, ex_c])
            self.tour_cote(mou, i, 0.3, aig)
        self.au_mot("Plus vite")
        pv = self.t("Plus vite :", 34, JAUNE_TITRE)
        gauche(pv, -1.6, -0.95)
        self.play(FadeIn(pv, shift=UP * 0.1), run_time=0.25)
        q = self.t("4 côtés de 20,", 34)
        q.next_to(pv, RIGHT, buff=0.2)
        self.aux_extraits([q], ["4 côtés de 20,"])
        lx = self.ligne([("20", VERT_OK), ("× 4", VERT_OK), ("= 80 cm.", VERT_OK)], 40, buff=0.26)
        gauche(lx, -1.6, -1.85)
        self.aux_extraits(lx, ["20 fois 4", "4, 80", "80 centimètres."])
        self.play(Create(mou.contour(sw=10)), Indicate(lx, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        car = FigureCotee(rect_pts(6, 6), ["6 cm", None, None, None], e=0.3, centre=P(-4.6, 1.35), fs=26,
                          remplir=DEDANS)
        cd = codes(car, JAUNE_TITRE, 0.18)

        def autres_q(sc):
            sc.play(FadeIn(car), Create(cd), run_time=0.35)
            sc.add(car.lab[0])

        def apres(sc):
            lg = sc.rep_bas(0, ["4 côtés de 6 cm :"], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("4 côtés de 6")
            sc.play(FadeIn(lg[0], shift=UP * 0.08), Create(car.contour(sw=8)), run_time=0.35)
            lg2 = sc.rep_bas(1, ["6", "× 4", "= 24."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.aux_extraits(lg2, ["6 fois 4", "4, 24", "24. Le"])
            lg3 = sc.rep_bas(2, ["Le périmètre est de 24 cm."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("Le périmètre est")
            sc.play(FadeIn(lg3[0], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Un carré a des côtés de 6 cm.", "Quel est son périmètre ?"],
                            [self.choix("12 centimètres"), self.choix("24 centimètres"), self.choix("36 centimètres")],
                            1, ["4 côtés de 6 cm :", "6 × 4 = 24.", "Le périmètre est de 24 cm."], mot_q="Un carré",
                            autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def rouleau(self, centre):
        """Le rouleau de galon : une bobine et le ruban qui pend."""
        b = VGroup(Circle(radius=0.55, fill_color=TOUR, fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                   Circle(radius=0.18, fill_color="#111827", fill_opacity=1, stroke_width=0))
        b.move_to(centre)
        rub = Line(b.get_right() + DOWN * 0.1, b.get_right() + P(0.9, -0.9), color=TOUR, stroke_width=10)
        return VGroup(rub, b)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ro = self.rouleau(P(-5.0, 1.0))
        self.au_mot("Kenza a")
        l0 = self.t("Kenza a 150 cm de galon.", 34)
        gauche(l0, -6.2, 2.1)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ro, scale=0.8), run_time=0.35)
        co = coussin(P(0.4, 0.9), e=0.06, textes=["40 cm", "25 cm", None, None], fs=28, L=40, l=25)
        self.au_mot("Elle borde")
        l1 = self.t("Elle borde un coussin de 40 cm sur 25 cm.", 34)
        gauche(l1, -6.2, -1.05)
        self.play(FadeIn(co), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.add(co.lab[0], co.lab[1])
        self.au_mot("Combien")
        q = self.t("Combien de galon lui reste-t-il ?", 36, JAUNE_TITRE)
        gauche(q, -6.2, -1.8)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        # « Mets pause » sous la question, à gauche : à droite (colonne XL), il collait Ti-Margo.
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -6.2, -2.55)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        co = coussin(P(-4.7, 0.9), e=0.06, textes=["40 cm", "25 cm", None, None], fs=26, L=40, l=25)
        self.add(co, *co.lab)
        self.au_mot("D'abord")
        l0 = self.t("D'abord, le tour du coussin :", 34)
        gauche(l0, -1.1, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        aig = depart(co.sommets()[0])
        lg = self.ligne([("40 + 25 = 65", BLEU_D)], 36)
        gauche(lg, -1.1, 1.45)
        self.au_mot("40 plus 25")
        self.play(FadeIn(aig, scale=1.4), run_time=0.15)
        self.tour_cote(co, 0, 0.3, aig)
        self.tour_cote(co, 1, 0.3, aig)
        self.au_fil(lg)
        for k, (a, b, c, i) in enumerate((("65", "40", "105", 2), ("105", "25", "130", 3))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 36, buff=0.26)
            hors_audit(l[0])
            gauche(l, -1.1, 0.75 - 0.7 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.tour_cote(co, i, 0.3, aig)
            self.au_fil(l, 2)
        lp = self.ligne([("Puis", WHITE), ("150", BLEU_D), ("− 130", BLEU_D), ("= 20.", BLEU_D)], 36, buff=0.26)
        gauche(lp, -1.1, -0.75)
        self.au_mot("Puis")
        self.play(FadeIn(lp[0], shift=UP * 0.08), run_time=0.2)
        self.aux_extraits(lp[1:], ["150 moins", "130, 20", "20. Il"])
        self.au_mot("Il reste")
        g = self.gros("Il reste 20 cm de galon.", fs=36)
        gauche(g, -6.2, -1.85)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        rec = FigureCotee(rect_pts(5, 3), None, e=0.4, centre=P(-0.4, 0.7), remplir=TISSU, opacite=0.85)
        car = FigureCotee(rect_pts(3, 3), None, e=0.4, centre=P(-0.9, -1.1), remplir="#0e7490", opacite=0.8)
        t1 = rec.contour(sw=7)
        t2 = car.contour(sw=7)
        cd = codes(car, JAUNE_TITRE, 0.18)
        fig = VGroup(rec, car, t1, t2, cd)
        lignes = self.finale_gauche(fig, textes=[
            ("Un rectangle a deux longueurs et deux", "largeurs : on ajoute les quatre."),
            ("Un carré a quatre côtés égaux :", "le côté × 4."),
            ("Attention : longueur × largeur,", "ce n'est pas le tour.")], fs=30, x_fig=-4.9, xl=-2.7)
        self.remove(t1, t2, cd)
        self.add(rec, car)
        self.au_mot("Un rectangle")
        self.montrer_ligne(lignes[0], Create(t1))
        self.au_mot("Un carré")
        self.montrer_ligne(lignes[1], Create(cd))
        self.au_mot("Attention")
        self.montrer_ligne(lignes[2], Indicate(t1, color=ROUGE_ERREUR, scale_factor=1.05))
        self.add(t2)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cotes()
        self.ecran_calcul()
        self.ecran_doubler()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_carre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PerimetreRectangleCE2(PerimetreRectangleBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
