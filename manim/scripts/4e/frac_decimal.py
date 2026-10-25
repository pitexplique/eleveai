# frac_decimal.py
# EleveAI — Maths 4e — série « Fractions », épisode 03 : FRACTION → NOMBRE
# DÉCIMAL → POURCENTAGE (micro du coach : fraction_decimal), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e (quotient,
# division posée à 3 décimales, fraction sur 100, pourcentage, retour décimal →
# fraction irréductible, pièges, défi corrigé), repère de REGLES.md.
# Short jumeau : frac_decimal_short.py (le sondage d'une story).
# ⭐ SES 2e ET 3e erreurs sur les copies : fraction → décimal (3/8 ≠ 3,8) puis
# décimal → pourcentage (0,75 = 75 %, pas 0,75 %).
#
# Décor et métier : la MÉTÉO ; Sofia, PRÉVISIONNISTE MÉTÉO : la nébulosité se
# mesure en OCTAS, huitièmes du ciel (vérifié le 25/10/2026 : Institut royal
# météorologique de Belgique, meteo.be « Nébulosité » : 0 octa = ciel serein,
# 8 = couvert ; Office québécois de la langue française, fiche « octa »).
# 3/8 du ciel → 3 ÷ 8 = 0,375 → 37,5 %. Défi : 9 jours de brouillard sur 25
# → 9/25 = 36/100 = 0,36 = 36 %. Situations inventées. Centres : meteo-climat,
# sciences.
# Vérifié (Python) : 3/8 = 0,375 ; 5/8 = 0,625 ; 7/20 = 0,35 ; 0,24 = 6/25 =
# 12/50 ; 9/25 = 0,36 ; 0,375 × 100 = 37,5.
#
# Micro → écrans : la fraction est un quotient (02), division posée (03),
# pourcentage (04), 5/8 (05, question 1 = item genVersDecimalQcm, leurres
# « chiffres collés »), fraction sur 100 (06 = genVersDecimalCourt), piège
# 0,75 % (07, question 2), décimal → fraction irréductible (09, question 3 =
# genVersFraction), défi (11).
# Écrans : 00 garde · 01 Sofia · 02 une division · 03 la division posée ·
# 04 le pourcentage · 05 QUESTION 1 · 06 sur 100 · 07 le piège · 08 QUESTION 2 ·
# 09 dans l'autre sens · 10 QUESTION 3 · 11 défi · 11b correction · 12 ce que
# tu as appris · 13 fin.
#
# ⭐ Bases : 4e/frac_lotd_commun.py (PaysageLotD, audit) ; canvas_fractions.py
# (non modifié). Ajouté ici : previsionniste(), nuage(), ciel().
# Voix : manim/voix/4e-frac-decimal.json (débit −10) ; marques :
# 4e/frac_decimal_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_decimal.py FracDecimal4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_decimal.py FracDecimal4e -o eleveai-maths-4e-frac-decimal --media_dir manim/scripts/4e/media-frac-decimal
# Sortie : manim/sorties/4e/maths/fractions/03-decimal/eleveai-maths-4e-frac-decimal.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotd_commun import *  # noqa: E402,F403

CIEL, NUAGE = "#7dd3fc", "#94a3b8"


def previsionniste(s=1.0):
    """Sofia : veste bleue, une tablette qui affiche un nuage."""
    p = personne(peau=PEAUX[2], tenue="#1d4ed8", cheveux="#78350f", longs=True)
    tab = RoundedRectangle(width=0.75, height=0.55, corner_radius=0.06, fill_color="#0f172a", fill_opacity=1,
                           stroke_color="#94a3b8", stroke_width=3).move_to(P(0.55, -1.2))
    p.add(tab, nuage(0.12).move_to(tab))
    return p.scale(s)


def nuage(r=0.18, couleur=WHITE):
    return VGroup(*[Circle(radius=r * k, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x * r, y * r))
                    for k, x, y in ((1.0, -0.9, 0), (1.3, 0, 0.35), (1.0, 0.9, 0), (0.9, 0.2, -0.2))])


def ciel(k=0, rayon=1.5, centre=ORIGIN):
    """Le ciel en 8 octas (Disque du coach) : bleu ciel, les parts couvertes en
    gris avec un nuage blanc. .nuages[i] pour la part i."""
    d = Disque(8, k, rayon=rayon, couleur=NUAGE, vide=CIEL, centre=centre)
    d.nuages = VGroup()
    for i in range(8):
        a = PI / 2 - (i + 0.5) * TAU / 8
        d.nuages.add(nuage(rayon * 0.09).move_to(d.centre_disque() + rayon * 0.62 * np.array([np.cos(a), np.sin(a), 0])))
    return d


def couvrir(d, idx, lag=0.2):
    """Des nuages arrivent sur les parts idx (la part grise + le nuage)."""
    return LaggedStart(*[AnimationGroup(d.parts[i].animate.set_fill(NUAGE, 1), FadeIn(d.nuages[i], shift=RIGHT * 0.3))
                         for i in idx], lag_ratio=lag)


class FracDecimalBase(PaysageLotD):
    nom_voix = "4e-frac-decimal"
    fichier_marques = "frac_decimal_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fraction, décimal, pourcentage", self.identite, self.ceinture, y_ech=-2.7)
        f = EcritureFraction("?", "?", fs=80).move_to(P(-4.4, 0.1))
        v = self.t("0,…", 80, BLEU_CALCUL).move_to(P(-1.5, 0.1))
        pc = self.t("… %", 80, VERT_OK).move_to(P(2.1, 0.1))
        fl = VGroup(Arrow(P(-3.7, 0.1), P(-2.5, 0.1), color=AMBRE), Arrow(P(-0.5, 0.1), P(0.9, 0.1), color=AMBRE))
        self.au_mot("Fraction, nombre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment passer")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.play(GrowArrow(fl[0]), FadeIn(v, shift=RIGHT * 0.2), run_time=0.5)
        self.play(GrowArrow(fl[1]), FadeIn(pc, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Sofia, prévisionniste ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = previsionniste(1.05).move_to(P(-5.1, -0.4))
        self.au_mot("Voici Sofia")
        nom = self.t("Sofia", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("prévisionniste")
        metier = VGroup(self.t("prévisionniste", 30, BLEU_CALCUL), self.t("météo", 30, BLEU_CALCUL)).arrange(
            DOWN, buff=0.06).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        d = ciel(0, rayon=1.45, centre=P(-1.7, -0.2))
        self.au_nb("le ciel en 8")
        l1 = self.col(self.ligne([("8 parts :", WHITE), ("8 octas", AMBRE)], 40), 2.3)
        self.play(d.apparaitre(1.0), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("des octas")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 huitièmes du ciel")
        f = EcritureFraction(3, 8, fs=80)
        lg = VGroup(self.t("nuages :", 40), f).arrange(RIGHT, buff=0.35)
        self.col(lg, 0.9)
        sans_synchro(lg)
        self.play(couvrir(d, range(3)), FadeIn(lg, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("un nombre décimal")
        l3 = self.col(self.ligne([("en décimal :", WHITE), ("0,…", BLEU_CALCUL)], 40), -0.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("c'est combien")
        q = self.col(self.t("Combien ?", 44, ORANGE_RETENUE), -1.6)
        self.play(FadeIn(q, scale=0.8), Indicate(f, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 02 : une fraction = une division ────────────────────────────────────
    def ecran_quotient(self):
        self.ecran("02-quotient")
        d = ciel(3, rayon=1.3, centre=P(-4.6, 0.6))
        d.nuages[:3].set_opacity(1)
        self.add(d, d.nuages[:3])
        f = EcritureFraction(3, 8, fs=110).move_to(P(-1.2, 0.6))
        self.au_mot("Une fraction")
        u = self.col(self.t("une fraction = une division", 38, AMBRE), 2.6)
        self.play(FadeIn(u, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("3 huitièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        dv = self.ligne([("= 3 ÷", VERT_OK), ("8", VERT_OK)], 80).next_to(f, RIGHT, buff=0.4)
        dv.set_y(f.trait.get_y())
        sans_synchro(dv)
        self.au_mot("3 divisé par 8")
        self.play(FadeIn(dv[0], shift=RIGHT * 0.2), Indicate(f.trait, color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.au_nb("3 divisé par 8")
        self.play(FadeIn(dv[1], scale=1.3), run_time=0.3)
        self.au_nb("Jamais 3,8")
        faux = self.ligne([("≠", ROUGE_ERREUR), ("3,8", ROUGE_ERREUR)], 70).next_to(f, DOWN, buff=0.6).align_to(f, LEFT)
        self.play(FadeIn(faux, scale=1.3), run_time=0.4)
        self.play(Create(croix(faux[1], sw=6)), run_time=0.4)
        self.au_mot("entre les deux")
        r = self.ligne([("Entre les deux nombres :", WHITE), ("÷", VERT_OK), (", jamais une virgule !", ROUGE_ERREUR)],
                       30).move_to(P(-1.0, -2.6))
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("une division, pas")
        self.play(FadeIn(r[1], scale=1.5), run_time=0.3)
        self.au_mot("pas une virgule")
        self.play(FadeIn(r[2], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la division posée 3 ÷ 8 ────────────────────────────────────────
    def ecran_poser(self):
        self.ecran("03-poser")
        dv = sans_synchro(Division(3, 8, decimales=3, mode="pose", fs=62))
        self.cadrer(dv, droite=0.3, haut=2.85, bas=-3.3)
        divid, virg, diviseur, pot_v, pot_h = dv.cadre
        g0, g1, g2, g3 = dv.etapes[1:]
        self.au_mot("Posons")
        tit = self.titre("La division posée", fs=44)
        self.play(Create(pot_v), Create(pot_h), run_time=0.5)
        self.au_nb("En 3")
        self.play(FadeIn(divid[0], scale=1.3), run_time=0.3)
        self.au_nb("combien de fois 8")
        self.play(FadeIn(diviseur, scale=1.3), run_time=0.3)
        self.au_mot("0 fois")
        self.play(FadeIn(g0, scale=1.4), run_time=0.3)
        self.au_mot("une virgule")
        self.play(FadeIn(g1[0], scale=1.6), FadeIn(virg, scale=1.6), run_time=0.3)
        self.au_mot("un zéro")
        self.play(FadeIn(divid[1], scale=1.4), run_time=0.3)
        etapes = [(g1, "3 fois 8", "égale 24", "reste 6", "En 60", divid[2]),
                  (g2, "7 fois 8", "égale 56", "reste 4", "En 40", divid[3]),
                  (g3, "5 fois 8", "égale 40", "reste 0", None, None)]
        self.au_mot("En 30")
        self.play(Indicate(VGroup(divid[0], virg, divid[1]), color=AMBRE), run_time=0.5)
        for g, m1, m2, m3, m4, abaisse in etapes:
            k = 1 if g is g1 else 0
            self.au_mot(m1)
            self.play(FadeIn(g[k], scale=1.4), run_time=0.3)
            self.au_nb(m2)
            self.play(FadeIn(VGroup(g[k + 1], g[k + 2], g[k + 3])), run_time=0.3)
            self.au_nb(m3)
            self.play(FadeIn(g[k + 4][0], scale=1.4), run_time=0.3)
            if m4:
                self.au_mot(m4)
                self.play(FadeIn(abaisse, scale=1.4), FadeIn(g[k + 4][1], scale=1.4), run_time=0.3)
        self.au_mot("c'est fini")
        self.play(Circumscribe(g3[4], color=VERT_OK), run_time=0.5)
        self.au_mot("3 divisé par 8, égale")
        res = self.col(self.ligne([("3 ÷ 8 =", WHITE), ("0,375", VERT_OK)], 50), -0.5, xl=1.6)
        self.play(FadeIn(res[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("0,375.")
        self.play(FadeIn(res[1], scale=1.4), run_time=0.35)
        self.play(Create(self.encadrer(res)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le pourcentage (× 100) ─────────────────────────────────────────
    def ecran_pourcentage(self):
        self.ecran("04-pourcentage")
        d = ciel(3, rayon=1.3, centre=P(-3.6, 1.2))
        self.add(d, d.nuages[:3])
        pc = Pourcentage(37.5, mode="chargement", largeur=5.6, hauteur=0.6, fs=44, etiquette=False,
                         centre=P(-3.6, -1.5), couleur=NUAGE).vide()
        self.au_mot("en pourcentage")
        tit = self.titre("Et en pourcentage ?", fs=44)
        self.play(FadeIn(pc.piste), FadeIn(pc.plein), run_time=0.4)
        self.au_mot("On multiplie par 100")
        l1 = self.col(self.t("× 100", 50, AMBRE), 1.8)
        self.play(FadeIn(l1, scale=1.3), run_time=0.4)
        self.au_mot("0,375 fois 100")
        l2 = self.col(self.ligne([("0,375 × 100 =", WHITE), ("37,5", BLEU_CALCUL)], 46), 0.7)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("37,5 % du ciel")
        l3 = self.col(self.t("37,5 %", 90, VERT_OK), -0.6)
        self.play(FadeIn(l3, scale=1.4), pc.remplir(1.4), run_time=1.4)
        e = self.t("37,5 %", 36, WHITE).next_to(pc.piste, DOWN, buff=0.2)
        e.sans_synchro = True
        self.play(FadeIn(e), Create(self.encadrer(l3)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (5/8 = ?) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = ciel(0, rayon=1.2, centre=P(-3.4, 1.05))
        self.add(d)
        f = EcritureFraction(5, 8, fs=76).move_to(P(-3.4, -1.85))

        def avant(sc):
            sc.q_tete(couvrir(d, range(5), lag=0.1), FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep(0, "5 divisé", Indicate(f.trait, color=VERT_OK, scale_factor=1.4))
            sc.rep(1, "5,8 et", Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.03),
                   Indicate(sc.cartes_q[2], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("05-question", "05b-reponse", ["5 huitièmes du ciel couverts :", "quel nombre décimal ?"],
                            [self.inline("5,8"), self.inline("0,625"), self.inline("0,58")], 1,
                            ["5 ÷ 8 = 0,625", "5,8 et 0,58 : faux !"],
                            mot_q="5 huitièmes", avant_q=avant, autres_r=apres)

    # ── 06 : écrire la fraction sur 100 ─────────────────────────────────────
    def cent(self, k, centre=P(-3.4, -1.45), cote=0.27):
        g = Grille(10, 10, colories=[], cote=cote, sw=2, centre=centre)
        g.k_cible = k
        return g

    def ecran_sur_100(self):
        self.ecran("06-sur-100")
        f, g = EcritureFraction(7, 20, fs=64), EcritureFraction(35, 100, fs=64)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.3, 1.7))
        h, b = fleches(f, g, "× 5", fs=34, angle=TAU / 9)
        gr = self.cent(35, centre=P(-3.4, -1.75), cote=0.23)
        self.au_mot("plus rapide")
        tit = self.titre("Plus rapide : sur 100", fs=42)
        self.au_mot("7 vingtièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("20 fois 5")
        l1 = self.col(self.ligne([("20 × 5 =", WHITE), ("100", AMBRE)], 42), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_nb("bas par 5")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("35 centièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), gr.apparaitre(0.6), run_time=0.6)
        self.play(gr.colorier(range(35), lag=0.02), run_time=1.0)
        self.au_mot("Donc 0,35")
        l2 = self.col(self.ligne([("= 0,35", BLEU_CALCUL), ("= 35 %", VERT_OK)], 52), 0.4)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(self.encadrer(l2)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège 0,75 % ────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège du pourcentage !", 42, ROUGE_ERREUR).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        gr = self.cent(75, centre=P(-3.6, -0.3), cote=0.34)
        self.au_mot("0,75, c'est")
        l1 = self.col(self.ligne([("0,75 =", WHITE), ("75 centièmes", BLEU_CALCUL)], 40), 1.9)
        sans_synchro(l1)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), gr.apparaitre(0.6), run_time=0.6)
        self.au_mot("75 centièmes")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("75 cases")
        self.play(gr.colorier(range(75), lag=0.015), run_time=1.3)
        self.au_mot("donc 75 %")
        l2 = self.col(self.t("75 %", 70, VERT_OK), 0.85)
        self.play(FadeIn(l2, scale=1.3), run_time=0.4)
        self.au_mot("Ce n'est pas")
        l3 = self.col(self.t("0,75 %", 70, ROUGE_ERREUR), -0.5)
        self.play(FadeIn(l3, scale=1.3), run_time=0.4)
        self.play(Create(croix(l3, sw=7)), run_time=0.4)
        self.au_mot("même pas 1 case")
        case = Square(1.2, fill_color=VIDE, fill_opacity=1, stroke_color=BORD, stroke_width=4)
        bout = Rectangle(width=0.9, height=1.2, fill_color=ROUGE_COACH, fill_opacity=1, stroke_width=0)
        bout.align_to(case, LEFT).align_to(case, DOWN)
        zoom = VGroup(case, bout, case.copy().set_fill(opacity=0)).move_to(P(2.0, -2.2))
        t4 = self.bloc(["moins", "d'1 case !"], 32, ROUGE_ERREUR).next_to(zoom, RIGHT, buff=0.3)
        self.play(Indicate(gr.liste[0], color=ROUGE_ERREUR, scale_factor=2.0), FadeIn(zoom, scale=0.5),
                  FadeIn(t4), run_time=0.8)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (0,4 en pourcentage) ────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        gr = self.cent(40, centre=P(-3.4, 0.1), cote=0.4)
        self.add(gr)

        def apres(sc):
            sc.rep(0, "0,4 fois 100", gr.colorier(range(40), lag=0.015), run_time=1.0)
            sc.rep(1, "4 %, ce serait", Indicate(VGroup(*gr.liste[:4]), color=ROUGE_ERREUR, scale_factor=1.3))
            sc.fin_rep()

        self.question_pause("08-question", "08b-reponse", ["Comment s'écrit 0,4", "en pourcentage ?"],
                            [self.inline("0,4 %"), self.inline("4 %"), self.inline("40 %")], 2,
                            ["0,4 × 100 = 40 : 40 %", "4 % = 0,04"], mot_q="Comment", autres_r=apres)

    # ── 09 : dans l'autre sens (0,35 → 7/20) ────────────────────────────────
    def ecran_retour(self):
        self.ecran("09-retour")
        self.au_mot("Dans l'autre sens")
        tit = self.t("Dans l'autre sens", 44, JAUNE_TITRE).move_to(P(-3.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        dec = self.t("0,35", 90, BLEU_CALCUL).move_to(P(-5.0, 0.3))
        f, g = EcritureFraction(35, 100, fs=80), EcritureFraction(7, 20, fs=80)
        eg = egalite(f, g, buff=1.3).move_to(P(-1.6, 0.6))
        s0 = self.t("=", 80).next_to(dec, RIGHT, buff=0.3)
        s0.sans_synchro = True
        eg.next_to(s0, RIGHT, buff=0.3)
        eg.shift(UP * (dec.get_y() - f.trait.get_y()))
        h, b = fleches(f, g, "÷ 5", fs=38, angle=TAU / 7)
        self.au_mot("0,35, c'est")
        self.play(FadeIn(dec, scale=1.3), run_time=0.4)
        self.au_mot("35 centièmes")
        self.play(FadeIn(s0), FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("table de 5")
        l1 = self.col(self.t("35 et 100 : table de 5", 34, AMBRE), -1.9, xl=-1.0)
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.6)
        self.au_nb("on simplifie par 5")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("7 vingtièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("irréductible")
        irr = self.t("fraction irréductible", 38, VERT_OK).move_to(P(1.2, -2.7))
        self.play(FadeIn(irr, shift=UP * 0.15), Create(self.encadrer(g)), run_time=0.5)
        self.attendre_voix()

    # ── 10 : QUESTION 3 (0,24 en fraction irréductible) ─────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        dec = self.t("0,24", 110, BLEU_CALCUL).move_to(P(-3.4, 1.3))
        f, g = EcritureFraction(24, 100, fs=70), EcritureFraction(6, 25, fs=70)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.4, -1.3))
        h, b = fleches(f, g, "÷ 4", fs=34, angle=TAU / 7)

        def avant(sc):
            sc.q_tete(FadeIn(dec, scale=1.2))

        def apres(sc):
            sc.rep(0, "0,24, c'est")
            sc.au_mot("24 centièmes")
            sc.play(FadeIn(f, scale=1.2), run_time=0.4)
            sc.au_nb("bas par 4")
            sc.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
            sc.rep(1, "6 vingt", FadeIn(eg[1]), FadeIn(g, scale=1.3))
            sc.rep(2, "12 cinquantièmes", Indicate(sc.cartes_q[2], color=ORANGE_RETENUE, scale_factor=1.03))
            sc.rep(3, "24 dixièmes, c'est", Indicate(sc.cartes_q[0], color=ROUGE_ERREUR, scale_factor=1.03))
            sc.fin_rep()

        self.question_pause("10-question", "10b-reponse", ["Quelle fraction irréductible", "est égale à 0,24 ?"],
                            [self.inline("24/10"), self.inline("6/25"), self.inline("12/50")], 1,
                            ["0,24 = 24/100", "÷ 4 : 6/25", "12/50 : encore ÷ 2 !", "24/10 = 2,4"],
                            mot_q="Quelle", avant_q=avant, autres_r=apres)

    # ── 11 : défi (9 jours de brouillard sur 25) ────────────────────────────
    def calendrier(self, k=0):
        g = Grille(5, 5, k, cote=0.62, couleur=NUAGE, centre=P(-3.5, -0.2))
        return g

    def ecran_defi(self):
        self.ecran("11-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.titre("À toi de jouer !", fs=50)
        cal = self.calendrier()
        self.au_mot("Sur 25 jours")
        l1 = self.col(self.ligne([("25", BLEU_CALCUL), ("jours notés", WHITE)], 40), 2.0)
        self.play(cal.apparaitre(0.8), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("9 jours de brouillard")
        l2 = self.col(self.ligne([("9", NUAGE), ("jours de brouillard", WHITE)], 40), 1.2)
        self.play(cal.colorier(range(9), lag=0.08), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.9)
        for y, txt, mot in ((0.3, "1. en fraction ?", "en fraction"), (-0.45, "2. en nombre décimal ?", "puis en nombre"),
                            (-1.2, "3. en pourcentage ?", "puis en pourcentage")):
            self.au_mot(mot)
            l = self.col(self.t(txt, 36, ORANGE_RETENUE), y)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.pause_defi(y=-1.95)

    def ecran_correction(self):
        self.ecran("11b-correction", 0.65)
        tit = self.titre("Correction", fs=50)
        f, g = EcritureFraction(9, 25, fs=64), EcritureFraction(36, 100, fs=64)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.3, 1.7))
        h, b = fleches(f, g, "× 4", fs=34, angle=TAU / 9)
        gr = self.cent(36, centre=P(-3.4, -1.75), cote=0.23)
        self.au_mot("9 jours sur 25")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("25 fois 4")
        l1 = self.col(self.ligne([("25 × 4 =", WHITE), ("100", AMBRE)], 42), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_nb("bas par 4")
        self.play(Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_mot("36 centièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), gr.apparaitre(0.6), run_time=0.6)
        self.play(gr.colorier(range(36), lag=0.02), run_time=1.0)
        self.au_mot("Donc 0,36")
        l2 = self.col(self.t("= 0,36", 52, BLEU_CALCUL), 0.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("36 % des jours")
        l3 = self.col(self.t("= 36 %", 64, VERT_OK), -0.6)
        self.play(FadeIn(l3, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(l3)), run_time=0.4)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        b = Barre(8, 3, largeur=4.2, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.9))
        pc = Pourcentage(37.5, mode="chargement", largeur=4.2, hauteur=0.55, fs=34, couleur=NUAGE,
                         centre=P(-3.9, -1.4))
        fig = VGroup(b, pc)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Une fraction est", "une division."),
                                                         ("On peut l'écrire", "sur 100."),
                                                         ("Pourcentage :", "on multiplie par 100."),
                                                         ("Pas de virgule entre", "les deux nombres !")], fs=34)
        for lg in lignes:
            sans_synchro(lg)
        self.montrer2(lignes[0], "Une fraction", "une division")
        self.montrer2(lignes[1], "On peut aussi", "sur 100")
        self.montrer2(lignes[2], "Pour le pourcentage", "multiplie par 100")
        self.montrer2(lignes[3], "Et jamais", "entre les deux")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_quotient()
        self.ecran_poser()
        self.ecran_pourcentage()
        self.ecran_question1()
        self.ecran_sur_100()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_retour()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class FracDecimal4e(FracDecimalBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
