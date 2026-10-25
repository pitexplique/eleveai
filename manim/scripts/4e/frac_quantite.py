# frac_quantite.py
# EleveAI — Maths 4e — série « Fractions », épisode 10 : PRENDRE UNE FRACTION
# D'UNE QUANTITÉ (micro du coach : fraction_quantite, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (méthode, « de » = multiplier, les deux ordres, le piège, le problème inverse,
# la chaîne simplifier → décimal → pourcentage, défi en 2 étapes corrigé).
# Short jumeau : frac_quantite_short.py (l'énigme du gâteau CARRÉ en 5, jaune).
#
# Décor et métier : le CINÉMA ; Karim, PROGRAMMATEUR dans un cinéma : salle de
# 240 places, 3/8 réservées → 240 ÷ 8 × 3 = 90 ; petite salle : 45 = 3/4 → 60 ;
# défi : 5/6 de 240 = 200, puis 3/4 de 200 = 150 enfants.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : cinema-series.
# Vérifié (Python) : 240/8 = 30, 3 × 30 = 90, 240 × 3 = 720, 720/8 = 90 ;
# 2/5 de 35 = 14 ; 240/3 × 8 = 640 ; 45/3 × 4 = 60 ; 40/2 × 3 = 60 ;
# 90/240 = 9/24 = 3/8 = 0,375 = 37,5 % ; 5/6 de 240 = 200 ; 3/4 de 200 = 150.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : fixed_1/2/3 et tpl_2
# « a/b de N : on divise par le dénominateur, on multiplie par le numérateur »
# (02, avec le disque de 4e_fraction_quantite_canvas_circle_tpl_1), « prendre
# une fraction, c'est multiplier » (03), open_1 « diviser d'abord » (03, 04),
# leurres (diviser par le numérateur : 05), tpl_5 genQuantiteInverse (06, 07),
# tpl_3/tpl_4 genQuantiteMixte en contexte (09, en deux étapes).
# Écrans : 00 garde · 01 Karim et la salle · 02 le disque (÷ 8, × 3) · 03 « de »
# = fois, les deux ordres · 04 QUESTION 1 · 05 le piège (640 !) · 06 dans
# l'autre sens · 07 QUESTION 2 · 08 la chaîne 90/240 → 3/8 → 0,375 → 37,5 % ·
# 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# ⭐ Bases : 4e/frac_lotf_commun.py (PaysageF : lignes au mot du lot B de 6e +
# audit de synchro) ; figures canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-quantite.json (débit −10), WAV dans
# public/sons/4e-frac-quantite/ ; marques : 4e/frac_quantite_marques.json
# (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_quantite.py FracQuantite4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_quantite.py FracQuantite4e -o eleveai-maths-4e-frac-quantite --media_dir manim/scripts/4e/media-frac-quantite
# Sortie : manim/sorties/4e/maths/fractions/10-quantite/eleveai-maths-4e-frac-quantite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import re  # noqa: E402

from frac_lotf_commun import *  # noqa: E402,F403

ROUGE_SIEGE = "#b91c1c"
ECRAN_C = "#e0f2fe"


def programmateur(s=1.0):
    """Karim : veste bordeaux, badge du cinéma, une bobine de film sous le bras."""
    p = personnage(peau="#8d5524", haut="#7f1d1d", cheveux="#111827", s=s)
    badge = RoundedRectangle(width=0.32, height=0.2, corner_radius=0.04, fill_color="#fde047", fill_opacity=1,
                             stroke_width=0).move_to(P(0.3, -0.85))
    bob = VGroup(Circle(radius=0.34, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3),
                 *[Dot(P(0.17 * np.cos(a), 0.17 * np.sin(a)), radius=0.06, color="#94a3b8")
                   for a in np.linspace(0, TAU, 5)[:-1]]).move_to(P(-0.72, -1.2))
    return VGroup(p, VGroup(badge, bob).scale(s, about_point=ORIGIN))


def salle(rangs=4, sieges=8, larg=4.4):
    """L'écran du cinéma et les rangées de fauteuils (un décor : aucun nombre)."""
    ecran = RoundedRectangle(width=larg, height=0.9, corner_radius=0.08, fill_color=ECRAN_C, fill_opacity=1,
                             stroke_color="#7dd3fc", stroke_width=4)
    fau = VGroup()
    for r in range(rangs):
        for k in range(sieges):
            fau.add(RoundedRectangle(width=0.36, height=0.3, corner_radius=0.07, fill_color=ROUGE_SIEGE,
                                     fill_opacity=1, stroke_width=0)
                    .move_to(P(-larg / 2 + larg * (k + 0.5) / sieges, -0.9 - 0.45 * r)))
    g = VGroup(ecran, fau)
    g.ecran, g.fauteuils = ecran, fau
    return g


def etiquettes_parts(d, idx, txt="30", fs=30, c=NUIT):
    """Un nombre au milieu de chaque part `idx` du disque d."""
    a0 = TAU / d.n
    r = d.cercle.width / 2 * 0.62
    c0 = d.cercle.get_center()
    out = VGroup()
    for i in idx:
        a = PI / 2 - (i + 0.5) * a0
        t = Text(txt, font_size=fs, color=c, weight=BOLD).move_to(c0 + r * np.array([np.cos(a), np.sin(a), 0]))
        t.sans_synchro = True
        out.add(t)
    return out


class FracQuantiteBase(PaysageF):
    nom_voix = "4e-frac-quantite"
    fichier_marques = "frac_quantite_marques.json"

    def L(self, specs, y, fs=40, x=None, buff=0.18):
        """Une ligne de morceaux posée dans la colonne de droite (ou centrée en x), jouée au mot."""
        g = self.ligne_mots(specs, fs=fs, buff=buff)
        self.col(g, y)
        if x is not None:
            g.set_x(x)
        self.jouer_mots(g)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Prendre une fraction d'une quantité", self.identite, self.ceinture, y_ech=-2.7)
        d = Disque(8, 3, rayon=1.15, centre=P(-1.6, 0.0))
        self.au_mot("Prendre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(d.apparaitre(0.9))
        self.au_mot("Combien")
        q = self.t("Combien ?", 64, AMBRE).next_to(d, RIGHT, buff=0.7)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.25, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Karim et la grande salle ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = programmateur(1.1).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Karim")
        nom = self.col(self.t("Karim", 44, BLEU_CALCUL), 2.9)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("programmateur")
        met = self.col(self.t("programmateur dans un cinéma", 32, BLEU_CALCUL), 2.25)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        sl = salle().move_to(P(-1.9, 0.9))
        self.au_mot("Sa grande salle")
        self.play(FadeIn(sl.ecran, shift=DOWN * 0.2), LaggedStart(*[FadeIn(f, scale=0.5) for f in sl.fauteuils],
                                                                  lag_ratio=0.02), run_time=1.0)
        self.L([("Salle :", WHITE, None), ("240 places", WHITE, "240 places")], 1.2, fs=38)
        res = [r * 8 + k for r in range(4) for k in range(3)]
        lg = self.ligne_mots([("Réservées :", WHITE, "Pour l'avant"),
                              (EcritureFraction(3, 8, fs=46, couleur=BLEU_PART), WHITE, "3 huitièmes",
                               lambda: [sl.fauteuils[i].animate.set_fill(BLEU_PART) for i in res])], fs=38)
        self.col(lg, 0.15)
        self.jouer_mots(lg)
        self.au_mot("Combien de places")
        q = self.col(self.ligne([("Combien de", WHITE), ("places", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 36), -1.1)
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.insister(q, 1.08, 0.25)
        self.attendre_voix()

    # ── 02 : le disque : ÷ 8, puis × 3 ──────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        self.au_mot("un disque")
        d = Disque(8, 0, rayon=1.75, centre=P(-3.4, 0.1))
        self.play(d.apparaitre(1.0))
        self.au_mot("8 parts")
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.05) for p in d.parts], lag_ratio=0.08),
                  run_time=0.8)
        self.L([("240 ÷", WHITE, "240 divisé"), ("8", WHITE, "8, égale"), ("= 30", BLEU_CALCUL, "30 :")], 2.4)
        tous = etiquettes_parts(d, range(8))
        self.au_mot("30 places")
        l2 = self.ligne_mots([("chaque part : 30 places", BLEU_CALCUL, None)], fs=34)
        self.col(l2, 1.55)
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in tous], lag_ratio=0.08), FadeIn(l2, shift=RIGHT * 0.15),
                  run_time=0.7)
        self.au_mot("On en prend 3")
        self.play(d.colorier([0, 1, 2]), AnimationGroup(*[tous[i].animate.set_color(NUIT) for i in range(3)]), run_time=0.7)
        self.L([("3 ×", WHITE, "3 fois"), ("30", WHITE, "30, égale"), ("= 90", VERT_OK, "90. Donc")], 0.6)
        lg = self.ligne_mots([(EcritureFraction(3, 8, fs=54), WHITE, "3 huitièmes"), ("de", WHITE, None),
                              ("240", WHITE, ("240", 2)), ("= 90 places", VERT_OK, "90 places")], fs=36)
        self.col(lg, -0.85)
        self.jouer_mots(lg)
        self.play(Create(self.encadrer(lg)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : « de » = fois ; les deux ordres ────────────────────────────────
    def ecran_fois(self):
        self.ecran("03-fois")
        self.au_mot("Prendre une fraction")
        tit = self.titre("« de », c'est « × »", fs=46, y=2.95)
        lg = self.ligne_mots([(EcritureFraction(3, 8, fs=56), WHITE, "3 huitièmes"), ("de", AMBRE, None),
                              ("240", WHITE, ("240", 1)), ("=", WHITE, None),
                              ("240", WHITE, ("240", 2)), ("×", AMBRE, None),
                              (EcritureFraction(3, 8, fs=56), WHITE, ("3 huitièmes", 2))], fs=46)
        lg.move_to(P(0, 1.6))
        self.jouer_mots(lg)
        self.play(Indicate(VGroup(lg[1], lg[5]), color=AMBRE, scale_factor=1.4), run_time=0.6)
        # ordre 1 : diviser d'abord (à gauche) ; ordre 2 : multiplier d'abord (à droite)
        c1 = self.bloc(["Diviser d'abord"], 32, BLEU_CALCUL).move_to(P(-3.4, 0.35))
        c2 = self.bloc(["Multiplier d'abord"], 32, ORANGE_RETENUE).move_to(P(3.0, 0.35))
        for m in (*c1, *c2):
            m.sans_synchro = True
        self.au_mot("Diviser d'abord")
        self.play(FadeIn(c1, shift=DOWN * 0.15), run_time=0.4)
        a1 = self.ligne_mots([("240 ÷", WHITE, ("240 divisé", 1)), ("8", WHITE, ("8, égale 30", 1)),
                              ("= 30", BLEU_CALCUL, "30, puis")], fs=38).move_to(P(-3.4, -0.45))
        self.jouer_mots(a1)
        a2 = self.ligne_mots([("30 ×", WHITE, "30 fois"), ("3", WHITE, "3, égale 90"), ("= 90", VERT_OK, ("90. Ou", 1))],
                             fs=38).move_to(P(-3.4, -1.25))
        self.jouer_mots(a2)
        self.au_mot("multiplier d'abord")
        self.play(FadeIn(c2, shift=DOWN * 0.15), run_time=0.4)
        b1 = self.ligne_mots([("240 ×", WHITE, "240 fois 3,"), ("3", WHITE, "3, égale 720"), ("= 720", ORANGE_RETENUE, "720,")],
                             fs=38).move_to(P(3.0, -0.45))
        self.jouer_mots(b1)
        b2 = self.ligne_mots([("720 ÷", WHITE, "720 divisé"), ("8", WHITE, "8, égale 90"), ("= 90", VERT_OK, "90. Même")],
                             fs=38).move_to(P(3.0, -1.25))
        self.jouer_mots(b2)
        self.au_mot("Même résultat")
        self.play(Indicate(a2, color=VERT_OK), Indicate(b2[2], color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.au_mot("diviser d'abord garde")
        cad = self.encadrer(VGroup(c1, a1, a2), BLEU_CALCUL)
        pt = self.t("des petits nombres", 34, BLEU_CALCUL).move_to(P(-3.4, -2.3))
        self.play(Create(cad), FadeIn(pt, shift=UP * 0.15), Indicate(b1[2], color=ORANGE_RETENUE), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2/5 de 35) ─────────────────────────────────────────
    def loupe(self, r=1.2):
        return VGroup(Circle(radius=r, stroke_color=AMBRE, stroke_width=10),
                      Line(P(r * 0.72, -r * 0.72), P(r * 1.6, -r * 1.6), stroke_color=AMBRE, stroke_width=16))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        lp = self.loupe().move_to(P(-3.4, 0.4))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        b = Barre(5, 0, largeur=5.2, hauteur=0.8, centre=P(-3.3, 0.2))
        sept = VGroup(*[self.mor("7", 34, NUIT).move_to(b.parts[i]) for i in range(5)])
        etat = {}

        def barre():
            etat["acc"] = VGroup(Brace(b.parts, UP, color=AMBRE), self.mor("35", 36, AMBRE))
            etat["acc"][1].next_to(etat["acc"][0], UP, buff=0.1)
            return [FadeOut(lp), FadeOut(qm), FadeIn(b), FadeIn(etat["acc"])]

        self.question_b("04-question", "04b-reponse", ["Combien font", "2/5 de 35 ?"],
                        [bloc_fixe(self.inline("7")), bloc_fixe(self.inline("14")), bloc_fixe(self.inline("17,5"))], 1,
                        [[("35 ÷", WHITE, "35 divisé", barre), ("5", WHITE, "5, égale 7"), ("= 7", BLEU_CALCUL, ("7. Puis", 1),
                                                                                   lambda: [FadeIn(sept, scale=1.3, run_time=0.4)])],
                         [("7 ×", WHITE, "7 fois"), ("2", WHITE, "2, égale 14"), ("= 14", VERT_OK, "14.", lambda: [b.colorier([0, 1]), AnimationGroup(*[sept[i].animate.set_color(NUIT) for i in (0, 1)])])],
                         [("7, ce n'est que", ROUGE_ERREUR, ("7, ce", 1)), ("1/5 !", ROUGE_ERREUR, "1 cinquième")]],
                        mot_q="Combien")

    # ── 05 : le piège : diviser par le numérateur ───────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.titre("Attention au piège !", ROUGE_ERREUR, fs=44, y=2.95)
        sl = salle(rangs=3, sieges=8, larg=4.2).move_to(P(-3.3, 1.2))
        self.play(FadeIn(sl), run_time=0.5)
        self.au_mot("divise par 3")
        f = self.ligne_mots([("÷ 3", ROUGE_ERREUR, "3, puis"), ("puis", WHITE, None), ("× 8", ROUGE_ERREUR, "8. 240")], fs=40)
        self.col(f, 2.0)
        self.jouer_mots(f)
        l1 = self.L([("240 ÷", WHITE, "240 divisé"), ("3", WHITE, "3, égale 80"), ("= 80", ROUGE_ERREUR, "80. Et")], 1.0)
        l2 = self.L([("80 ×", WHITE, "80 fois"), ("8", WHITE, "8, égale 640"), ("= 640", ROUGE_ERREUR, "640. 640")], 0.05)
        self.au_mot("plus que la salle")
        big = self.t("640", 80, ROUGE_ERREUR).move_to(P(-3.3, -1.0))
        pas_audit(big)  # le 640 déjà dit, redit en grand
        cr = croix(big, sw=10)
        self.play(FadeIn(big, scale=0.5), Indicate(sl, color=ROUGE_ERREUR, scale_factor=1.03), run_time=0.6)
        self.play(Create(cr), run_time=0.4)
        lg = self.ligne_mots([(EcritureFraction(3, 8, fs=48), WHITE, "3 huitièmes"), ("< 1", AMBRE, "1 :")], fs=44)
        self.col(lg, -1.05)
        self.jouer_mots(lg)
        l3 = self.L([("résultat <", AMBRE, "plus petit"), ("240", AMBRE, "240. On")], -2.0, fs=38)
        self.au_mot("On divise par le dénominateur")
        r = self.bloc(["On divise par", "le dénominateur !"], 36, VERT_OK).move_to(P(-3.3, -2.45))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.play(Create(self.encadrer(r)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : dans l'autre sens : 3/4 des places = 45 ────────────────────────
    def ecran_inverse(self):
        self.ecran("06-inverse")
        self.au_mot("dans l'autre sens")
        tit = self.titre("Dans l'autre sens", fs=44, y=2.95)
        d = Disque(4, 0, rayon=1.6, centre=P(-3.4, 0.0))
        self.au_mot("petite salle")
        self.play(d.apparaitre(0.9))
        self.L([("45 spectateurs", WHITE, "45 spectateurs"), ("=", WHITE, None),
                (EcritureFraction(3, 4, fs=48), WHITE, "3 quarts")], 1.85, fs=38)
        self.au_mot("3 quarts des places")
        self.play(d.colorier([0, 1, 2]), run_time=0.7)
        self.au_mot("Combien de places en tout")
        q = self.col(self.t("Combien en tout ?", 38, ORANGE_RETENUE), 0.9)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("45. 45")
        acc = VGroup(*[d.parts[i] for i in range(3)])
        q45 = pas_audit(self.mor("45", 40, AMBRE).move_to(P(-0.9, 1.4)))
        self.play(Indicate(acc, color=AMBRE, scale_factor=1.04), FadeIn(q45, scale=1.3), run_time=0.3)
        self.L([("45 ÷", WHITE, ("45 divisé", 1)), ("3", WHITE, "3, égale 15"), ("= 15", BLEU_CALCUL, "15 :")], -0.1)
        quinze = etiquettes_parts(d, range(3), "15", 34)
        self.au_mot("15 places")
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in quinze], lag_ratio=0.15), run_time=0.5)
        self.au_mot("Il y a 4 parts")
        q4 = pas_audit(etiquettes_parts(d, [3], "15", 34))
        self.play(Indicate(d.parts[3], color=AMBRE), run_time=0.5)
        self.L([("15 ×", WHITE, "15 fois", lambda: [FadeIn(q4, scale=1.4, run_time=0.3), Indicate(d.parts[3], color=AMBRE, run_time=0.3)]), ("4", WHITE, "4, égale 60"), ("= 60", VERT_OK, "60. La")], -1.1)
        self.au_mot("60 places")
        fin = self.col(self.t("60 places en tout", 40, VERT_OK), -2.2)
        self.play(FadeIn(fin, scale=1.2), Circumscribe(d.cercle, color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (2/3 = 40 places) ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = Disque(3, 2, rayon=1.5, centre=P(-3.4, 0.3))
        q40 = pas_audit(self.mor("40", 40, AMBRE).move_to(P(-1.0, 1.8)))
        self.add(d)
        vingt = pas_audit(etiquettes_parts(d, range(3), "20", 34))

        def geste_20():
            return [FadeIn(vingt[0], scale=1.4, run_time=0.3), FadeIn(vingt[1], scale=1.4, run_time=0.3)]

        self.question_b("07-question", "07b-reponse", ["2/3 d'une salle = 40 places.", "Combien en tout ?"],
                        [bloc_fixe(self.inline("80")), bloc_fixe(self.inline("20")), bloc_fixe(self.inline("60"))], 2,
                        [[("40 ÷", WHITE, "40 divisé", lambda: [FadeIn(q40, scale=1.3, run_time=0.3)]), ("2", WHITE, "2, égale 20"), ("= 20", BLEU_CALCUL, "20 :", geste_20), (": 1/3", BLEU_CALCUL, "1 tiers")],
                         [("20 ×", WHITE, "20 fois"), ("3", WHITE, "3, égale 60"),
                          ("= 60", VERT_OK, "60.", lambda: [FadeIn(vingt[2], scale=1.4, run_time=0.3), Indicate(d.parts[2], run_time=0.3)])]],
                        mot_q="2 tiers")

    # ── 08 : la chaîne : 90/240 → 3/8 → 0,375 → 37,5 % ──────────────────────
    def ecran_chaine(self):
        self.ecran("08-chaine")
        self.au_mot("Sur son tableau")
        lu = self.ligne_mots([("Réservées :", WHITE, None), ("90", BLEU_CALCUL, ("90 places", 1)),
                              ("/ 240", BLEU_CALCUL, "240. Il")], fs=40)
        lu.move_to(P(-3.0, 2.8))
        tab = RoundedRectangle(width=lu.width + 0.7, height=0.95, corner_radius=0.18, fill_color="#0b1220",
                               fill_opacity=1, stroke_color=BLEU_CALCUL, stroke_width=5).move_to(lu)
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.4)
        self.jouer_mots(lu)
        f1 = EcritureFraction(90, 240, fs=60)
        f2 = EcritureFraction(9, 24, fs=60)
        f3 = EcritureFraction(3, 8, fs=60, couleur=VERT_OK)
        VGroup(f1, f2, f3).arrange(RIGHT, buff=2.2).move_to(P(-1.3, 0.35))
        pas_audit(f1)  # « 90 sur 240 », lu juste avant
        self.au_mot("Il simplifie")
        self.play(FadeIn(f1, scale=1.2), run_time=0.4)
        h1, b1 = fleches(f1, f2, "÷ 10", fs=34)
        h2, b2 = fleches(f2, f3, "÷ 3", fs=34)
        self.au_mot("en haut et en bas")
        self.play(Indicate(f1, color=AMBRE, scale_factor=1.15), run_time=0.5)
        self.au_nb("par 10")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("9 sur 24")
        self.play(FadeIn(f2, scale=1.2), run_time=0.4)
        self.au_nb("par 3")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_mot("3 huitièmes. Ensuite")
        self.play(FadeIn(f3, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(f3)), run_time=0.3)
        l2 = self.ligne_mots([("3 ÷", WHITE, ("3 divisé", 1)), ("8", WHITE, "8, égale"),
                              ("= 0,375", BLEU_CALCUL, ("0,375.", 1))], fs=44)
        l2.move_to(P(-2.6, -2.05))
        self.jouer_mots(l2)
        l3 = self.ligne_mots([("= 37,5 %", VERT_OK, "37,5 %")], fs=50)
        l3.next_to(l2, RIGHT, buff=0.35)
        self.jouer_mots(l3)
        self.insister(l3, 1.2, 0.25)
        l5 = self.ligne_mots([("simplifier", AMBRE, "Simplifier,"), ("→ décimal", AMBRE, "décimal, pourcentage"),
                              ("→ pourcentage", AMBRE, None)], fs=34)
        l5.move_to(P(-1.2, -2.95))
        self.jouer_mots(l5)
        self.play(Create(self.encadrer(l5, AMBRE)), run_time=0.4)
        self.attendre_voix()

    def au_nb(self, extrait, n=1):
        """Attend le DERNIER nombre de `extrait` (« par 10 » → l'instant du 10)."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
        k = [m.start() for m in re.finditer(r"\d+(?:,\d+)?", extrait)]
        self._attendre_pos(i + (k[-1] if k else 0))

    # ── 09 : défi (5/6 de 240, puis 3/4 des spectateurs) ────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, y=3.0, centre=True)
        sl = salle(rangs=4, sieges=8, larg=4.2).move_to(P(-3.4, 0.2))
        self.au_mot("Samedi")
        self.play(FadeIn(sl), run_time=0.5)
        self.L([("Salle :", WHITE, None), ("240 places", WHITE, "240 places")], 1.8, fs=38)
        lv = self.ligne_mots([("vendues :", WHITE, None), (EcritureFraction(5, 6, fs=48), WHITE, "5 sixièmes")],
                             fs=38)
        self.col(lv, 0.75)
        self.jouer_mots(lv)
        le = self.ligne_mots([("enfants :", WHITE, None), (EcritureFraction(3, 4, fs=48), WHITE, "3 quarts"),
                              ("des spectateurs", WHITE, None)], fs=38)
        self.col(le, -0.45)
        self.jouer_mots(le)
        self.au_mot("Combien d'enfants")
        q = self.col(self.ligne([("Combien", WHITE), ("d'enfants", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 44), -1.55)
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.pause_defi(y=-2.45)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        b6 = Barre(6, 0, largeur=5.4, hauteur=0.7, centre=P(-3.3, 1.5))
        b4 = Barre(4, 0, largeur=4.5, hauteur=0.7, centre=P(-3.75, -0.9))
        self.au_mot("les places vendues")
        self.play(b6.apparaitre(0.7), run_time=0.7)
        self.L([("240 ÷", WHITE, "240 divisé"), ("6", WHITE, "6, égale 40"), ("= 40", BLEU_CALCUL, "40. Et")], 1.95, fs=38)
        q40 = VGroup(*[self.mor("40", 28, NUIT).move_to(b6.parts[i]) for i in range(6)])
        self.play(FadeIn(q40, lag_ratio=0.1), run_time=0.4)
        l2 = self.ligne_mots([("40 ×", WHITE, "40 fois"), ("5", WHITE, "5, égale 200"),
                              ("= 200", VERT_OK, ("200 spectateurs", 1), lambda: [b6.colorier(range(5)), AnimationGroup(*[q40[i].animate.set_color(NUIT) for i in range(5)])])], fs=38)
        self.col(l2, 1.05)
        self.jouer_mots(l2)
        self.au_mot("Puis les enfants")
        lien = Arrow(b6.carte.get_bottom() + LEFT * 0.4, b4.carte.get_top() + LEFT * 0.4, color=AMBRE, buff=0.05)
        self.play(GrowArrow(lien), b4.apparaitre(0.7), run_time=0.7)
        self.L([("200 ÷", WHITE, "200 divisé"), ("4", WHITE, "4, égale 50"), ("= 50", BLEU_CALCUL, "50. Et")], -0.35, fs=38)
        q50 = VGroup(*[self.mor("50", 28, NUIT).move_to(b4.parts[i]) for i in range(4)])
        self.play(FadeIn(q50, lag_ratio=0.1), run_time=0.4)
        l4 = self.ligne_mots([("50 ×", WHITE, "50 fois"), ("3", WHITE, "3, égale 150"),
                              ("= 150", VERT_OK, ("150. Il", 1), lambda: [b4.colorier(range(3)), AnimationGroup(*[q50[i].animate.set_color(NUIT) for i in range(3)])])], fs=38)
        self.col(l4, -1.25)
        self.jouer_mots(l4)
        self.au_mot("150 enfants")
        fin = self.t("150 enfants !", 46, VERT_OK).move_to(P(-3.3, -2.45))
        self.play(FadeIn(fin, scale=1.2), run_time=0.5)
        self.play(Create(self.encadrer(fin)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        d = Disque(8, 3, rayon=1.4, centre=P(-3.6, -0.3))
        fig = VGroup(d, pas_audit(etiquettes_parts(d, range(8), "30", 26)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Prendre une fraction d'un nombre,", "c'est multiplier."),
                                                         ("On divise par le dénominateur,",
                                                          "puis on multiplie par le numérateur."),
                                                         ("Si on connaît la part,", "on remonte au tout.")], fs=34)
        for lg, (m1, m2) in zip(lignes, [("Prendre une fraction", "c'est multiplier"), ("On divise", "puis on multiplie"),
                                         ("Si on connaît", "on remonte")]):
            self.au_mot(m1)
            self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(m2)
            self.play(FadeIn(lg[1][1], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_fois()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_inverse()
        self.ecran_question2()
        self.ecran_chaine()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class FracQuantite4e(FracQuantiteBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
