# prop_lycee_evo_valeur_initiale.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS
# calculatrice) — série « Évolutions en pourcentage », épisode COMMUN 10 :
# RETROUVER LA VALEUR DE DÉPART (micro du coach : auto_evo_valeur_initiale),
# AVEC VOIX. Paysage, CEINTURE ORANGE (short jumeau :
# prop_lycee_evo_valeur_initiale_short.py).
# Deux sous-classes : PropLyceeEvoValeurInitialePremiere (« Maths 1re —
# EleveAI ») et PropLyceeEvoValeurInitialeStmg (« Maths STMG — EleveAI ») ;
# seule l'identité change, sur la garde : on rend la 1re en entier, la garde
# STMG seule (GARDE_SEULE=1), puis on colle (frac_cm_commun.py coller).
# ⭐ Méthode : départ × coefficient = arrivée ; donc départ = arrivée ÷ coefficient.
# ⭐ Dessins : chaîne de boîtes « ? —× 1,2→ 60 € » et sa flèche RETOUR « ÷ 1,2 » ;
# barre de 100 % (hausse = bout vert ajouté, baisse = morceaux rouges retirés).
# ⭐ Fil rouge (erreur typique) : retirer le pourcentage à l'arrivée
# (60 − 20 % = 48 €, faux : 48 × 1,2 = 57,60 €).
# Questions : 06 (+ 25 % → 100 €) bonne C = 80 € ; 08 (− 50 % → 20 €) bonne B = 40 €.
# Décor : ticket de caisse (TVA), comptable, biologiste, vendeur.
# Centres : argent-budget, technologie-ia. Source : TVA au taux normal de 20 %
# (service-public.fr).
# ⭐ Ce fichier porte aussi la BASE commune des épisodes 10, 11, 12
# (EvoLyceeBase : boîtes, flèches, ticket, source, questions, fin commune),
# chargée par prop_lycee_evo_calculer_taux.py et prop_lycee_evo_successives.py.
#
# Voix : manim/voix/lycee-evo-valeur-initiale.json (« go » de Frédéric le 23/11,
# débit −10) ; WAV : public/sons/lycee-evo-valeur-initiale/ ; marques :
# prop_lycee_evo_valeur_initiale_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_valeur_initiale.py PropLyceeEvoValeurInitialePremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_valeur_initiale.py PropLyceeEvoValeurInitialePremiere -o eleveai-maths-premiere-evo-valeur-initiale --media_dir manim/scripts/premiere/media-prop-lycee-evo-valeur-initiale
# Garde STMG seule : GARDE_SEULE=1 … PropLyceeEvoValeurInitialeStmg -o garde-stmg-evo-valeur-initiale

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, gras, sans = _p35.BarreCent, _p35.gras, _p35.sans

DEP = "#38bdf8"        # le départ (bleu clair)
ARR = "#22c55e"        # l'arrivée (vert)
HAUSSE = "#22c55e"     # le bout ajouté
BAISSE = "#ef4444"     # la part retirée
PAPIER = "#f8fafc"
ENCRE = "#0f172a"


def pas_audit(m):
    """Décor ou donnée redite : ni synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def boite(txt, couleur=DEP, fs=40, l=2.1, h=0.95, centre=ORIGIN):
    """Une boîte arrondie (départ, arrivée) ; .cadre, .nb (None si vide)."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.16, fill_color=couleur, fill_opacity=0.18,
                             stroke_color=couleur, stroke_width=4).move_to(centre)
    g = VGroup(cadre)
    g.cadre, g.nb = cadre, None
    if txt:
        t = gras(txt, fs, WHITE)
        if t.width > l - 0.25:
            t.scale_to_fit_width(l - 0.25)
        g.nb = t.move_to(cadre)
        g.add(t)
    return g


def nombre_dans(b, txt, fs=40, couleur=WHITE):
    """Le nombre qui vient remplir la boîte b (renvoyé, non ajouté)."""
    t = gras(txt, fs, couleur)
    if t.width > b.cadre.width - 0.25:
        t.scale_to_fit_width(b.cadre.width - 0.25)
    return t.move_to(b.cadre)


def fleche(a, b, s=None, couleur=AMBRE, fs=34):
    """La flèche de la boîte a à la boîte b, l'opération écrite DESSUS."""
    fl = Arrow(a.cadre.get_right(), b.cadre.get_left(), buff=0.12, color=couleur, stroke_width=6,
               max_tip_length_to_length_ratio=0.18)
    lab = gras(s, fs, couleur).next_to(fl, UP, buff=0.1) if s else None
    return fl, lab


def retour(a, b, s, couleur=VERT_OK, fs=34):
    """La flèche RETOUR, sous les boîtes : de l'arrivée b au départ a."""
    d, f = b.cadre.get_bottom() + DOWN * 0.08, a.cadre.get_bottom() + DOWN * 0.08
    fl = CurvedArrow(d, f, angle=-PI * 0.42, color=couleur, stroke_width=6, tip_length=0.22)
    lab = gras(s, fs, couleur).next_to(fl, DOWN, buff=0.08)
    return fl, lab


def ticket(s=1.0):
    """Un ticket de caisse blanc, bord bas en dents de scie (sans texte)."""
    l, h, n = 2.6, 2.4, 9
    pts = [P(-l / 2, h / 2), P(l / 2, h / 2), P(l / 2, -h / 2)]
    for i in range(n):
        x1 = l / 2 - (i + 0.5) * l / n
        x2 = l / 2 - (i + 1) * l / n
        pts += [P(x1, -h / 2 - 0.12), P(x2, -h / 2)]
    p = Polygon(*pts, fill_color=PAPIER, fill_opacity=1, stroke_width=0)
    lignes = VGroup(*[Line(P(-0.95, y), P(0.95, y), color="#cbd5e1", stroke_width=2) for y in (-0.55, -0.8)])
    return VGroup(p, lignes).scale(s)


def vignette(tenue, peau, cheveux, longs, s=0.42):
    return personne(peau=peau, tenue=tenue, cheveux=cheveux, longs=longs).scale(s)


class EvoLyceeBase(PropPourcentageCoefficientBase):
    """La base des épisodes 10, 11, 12 (outils de prop_lycee_formes.py recopiés)."""
    identite = "Maths 1re — EleveAI"
    Y_PH = -1.35

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """HD du 23/11 : à buff 0,08 (cadre du 4e), le « = » et le « % » touchaient le trait."""
        return SurroundingRectangle(m, color=couleur, buff=0.14, corner_radius=0.1, stroke_width=4)

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        pas_audit(s)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.6:
            ph2.scale_to_fit_width(6.6)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.2):
        """La ligne de la colonne de droite, morceaux un peu plus espacés (comme
        les épisodes 07-09 : au brouillon, « De nouveau50 € » et « 50× » se touchaient)."""
        lg = self.col(self.ligne(morceaux, fs, buff=0.32), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.22)
        if lg.width > 6.6:
            lg.scale_to_fit_width(6.6)
        return lg.move_to(ref).align_to(ref, LEFT)

    def poser(self, lg, mots, rt=0.35):
        """Joue la ligne lg morceau par morceau, chacun à son mot."""
        self.jouer(lg, mots, run_time=rt)
        return lg

    def garde_evo(self, titre_txt, mot, dessin):
        """La page de garde : titre, identité, ceinture ; dessin(sc) pose la figure."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde(titre_txt, self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot(mot)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        dessin(self)
        self.attendre_voix(marge=0.6)

    def finir(self, ecrans):
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG (ou 2de) seule
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class PropLyceeEvoValeurInitialeBase(EvoLyceeBase):
    nom_voix = "lycee-evo-valeur-initiale"
    fichier_marques = "prop_lycee_evo_valeur_initiale_marques.json"
    ceinture = "orange"

    # ── 00 : page de garde : « ? × 1,2 = 60 » et la flèche retour ──────────
    def page_de_garde(self):
        def dessin(sc):
            a = boite("?", DEP, 46, centre=P(-2.6, 0.35))
            b = pas_audit(boite("60 €", ARR, 40, centre=P(2.2, 0.35)))
            fl, lab = fleche(a, b, "× 1,2")
            pas_audit(lab)
            sc.au_mot("Après une hausse")
            sc.play(FadeIn(a, shift=RIGHT * 0.2), GrowArrow(fl), FadeIn(lab), FadeIn(b, shift=LEFT * 0.2),
                    run_time=0.7)
            rf, _ = retour(a, b, "")
            sc.au_mot("revenir en arrière")
            sc.play(Create(rf), run_time=0.6)
            sc.play(Circumscribe(a, color=VERT_OK, buff=0.1), run_time=0.7)
        self.garde_evo("Retrouver la valeur de départ", "Retrouver", dessin)

    # ── 01 : le ticket : casque 60 € TTC, TVA 20 % ; trois métiers ─────────
    def ecran_situation(self):
        self.ecran("01-situation")
        tk = ticket(1.15).move_to(P(-4.3, 0.75))
        self.montre("un ticket", FadeIn(tk, shift=UP * 0.3), rt=0.5)
        t1 = gras("Casque", 32, ENCRE).move_to(tk.get_center() + P(0, 0.85))
        t2 = gras("60 € TTC", 40, ENCRE).move_to(tk.get_center() + P(0, 0.15))
        t3 = gras("TVA 20 %", 30, BAISSE).move_to(tk.get_center() + P(0, -0.45))
        self.montre("un casque", FadeIn(t1, shift=DOWN * 0.1), rt=0.35)
        self.montre("60 €", FadeIn(t2, scale=1.3), rt=0.4)
        self.montre("20 %", FadeIn(t3, shift=RIGHT * 0.1), rt=0.4)
        self.insister(t3, 1.2, 0.2)
        q = self.lc([("Le prix", WHITE), ("hors taxe ?", AMBRE)], 2.5, fs=40, xl=0.6)
        gens = [vignette("#1e3a8a", "#8d5524", "#111827", False), vignette("#0f766e", "#f1c27d", "#7c2d12", True),
                vignette("#b45309", "#c68642", "#1f2937", False)]
        L2 = self.lc([("une population après une croissance,", GREY_B)], -1.0, fs=28, xl=0.4)
        L3 = self.lc([("un prix d'avant les soldes", GREY_B)], -1.6, fs=28, xl=0.4)
        noms = ["comptable", "biologiste", "vendeur"]
        mots = ["Le comptable", "une biologiste", "un vendeur"]
        for i, (g, n, mot) in enumerate(zip(gens, noms, mots)):
            g.scale(1.35).move_to(P(1.05 + 2.2 * i, 0.5))
            e = self.t(n, 24, DEP).next_to(g, DOWN, buff=0.15)
            self.montre(mot, FadeIn(g, shift=UP * 0.2), FadeIn(e), rt=0.4)
            if i == 0:
                self.jouer(q, ["retrouver le prix", "hors taxe"])
            elif i == 1:
                self.montre("une population", FadeIn(L2, shift=RIGHT * 0.15), rt=0.35)
            else:
                self.montre("avant les soldes", FadeIn(L3, shift=RIGHT * 0.15), rt=0.35)
        src = self.source(["Source : service-public.fr : la TVA au taux normal est de 20 %."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour : 60 − 20 % = 48 € ? ───────────────────────
    def ecran_question_jour(self):
        self.ecran("02-question-du-jour")
        b = self.barre(y=0.6, largeur=4.4, x=-3.7)
        for m in b.morceaux:
            m.set_fill(DEP, 1)
        bt = self.bout_hausse(b, 2)
        aht, tht = self.accolade(b.bp.piste, "HT = ?", DEP, DOWN)
        self.montre("Quel était", FadeIn(b, shift=UP * 0.2), FadeIn(bt, shift=LEFT * 0.2), rt=0.5)
        L1 = self.lc([("HT = ?", DEP)], 1.7, fs=48, xl=1.0)
        self.montre("hors taxe", FadeIn(L1, scale=1.2), GrowFromCenter(aht), FadeIn(tht), rt=0.45)
        a60, t60 = self.accolade(VGroup(b.bp.piste, bt), "60 €", ARR, UP)
        L2 = self.lc([("60 −", WHITE), ("20 %", BAISSE), ("= 48 € ?", AMBRE)], 0.4, fs=48, xl=1.0)
        self.jouer(L2, ["60 moins", "20 %", "48 €"], {0: [GrowFromCenter(a60), FadeIn(t60)]})
        self.play(Circumscribe(L2[2], color=AMBRE, buff=0.1), run_time=0.7)
        self.attendre_voix()

    # ── 03 : le schéma : HT —× 1,2→ 60 ; retour ÷ 1,2 ──────────────────────
    def chaine(self, y=0.9):
        a = boite("?", DEP, 46, centre=P(-3.2, y))
        b = boite("60 €", ARR, 40, centre=P(2.0, y))
        fl, lab = fleche(a, b, "× 1,2")
        rf, rl = retour(a, b, "÷ 1,2")
        return a, b, fl, lab, rf, rl

    def ecran_schema(self):
        self.ecran("03-schema")
        self.titre_haut("Le schéma", "Faisons")
        a, b, fl, lab, rf, rl = self.chaine()
        na = sans(self.t("prix HT", 26, GREY_B)).next_to(a, UP, buff=0.15)
        nb = sans(self.t("prix TTC", 26, GREY_B)).next_to(b, UP, buff=0.15)
        self.montre("Prix hors taxe", FadeIn(a, shift=RIGHT * 0.2), FadeIn(na), rt=0.4)
        self.montre("fois 1,2", GrowArrow(fl), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("égale 60", FadeIn(b, shift=LEFT * 0.2), FadeIn(nb), rt=0.4)
        self.montre("revenir en arrière", Create(rf), rt=0.6)
        inv = self.t("l'opération inverse", 40, VERT_OK).move_to(P(-0.6, -2.0))
        self.montre("l'opération inverse", FadeIn(inv, shift=UP * 0.15), rt=0.4)
        self.montre("divise par 1,2", FadeIn(rl, scale=1.3), rt=0.4)
        self.insister(rl, 1.25, 0.2)
        self.attendre_voix()

    # ── 04 : le calcul : 60 ÷ 1,2 = 50 € ; vérification 50 × 1,2 = 60 ──────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        a, b, fl, lab, rf, rl = self.chaine(y=1.9)
        L1 = self.lc([("60 ÷", WHITE), ("1,2", WHITE), ("=", WHITE), ("50 €", VERT_OK)], -0.75, fs=48, xl=-4.2)
        L1[3].shift(RIGHT * 0.12)  # HD 23/11 : ligne réduite, le cadre collait au « = »
        self.montre("60 divisé", FadeIn(VGroup(a, b, fl, rf)), FadeIn(L1[0], shift=RIGHT * 0.15), rt=0.4)
        self.montre("1,2, égale", FadeIn(lab, scale=1.3), FadeIn(rl, scale=1.3), FadeIn(L1[1]), FadeIn(L1[2]), rt=0.35)
        n50 = nombre_dans(a, "50 €", 40, VERT_OK)
        self.montre("50 €", FadeIn(L1[3], scale=1.3), FadeOut(a.nb), FadeIn(n50, scale=1.3), rt=0.4)
        L2 = self.lc([("Vérification :", GREY_B), ("50 × 1,2", WHITE), ("= 60", VERT_OK)], -1.75, fs=40, xl=-4.2)
        self.jouer(L2, ["Vérification", "50 fois", "égale 60"])
        ok = self.coche(VERT_OK, 0.26).next_to(L2, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.montre("était 50", Create(self.cadre(L1[3])), a.cadre.animate.set_stroke(VERT_OK, 6), rt=0.4)
        self.insister(n50, 1.25, 0.2)
        self.attendre_voix()

    # ── 05 : le piège : 60 − 20 % = 48 € (faux) ; 48 × 1,2 = 57,60 € ──────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        L1 = self.lc([("60 −", WHITE), ("20 %", BAISSE), ("= 48 €", AMBRE)], 2.15, fs=46, xl=-3.0)
        self.jouer(L1, ["60 moins", "20 %", "48 €"])
        self.montre("c'est faux", Create(self.barrer(L1)), rt=0.4)
        b = self.barre(y=0.3, largeur=4.2, x=-3.8)
        for m in b.morceaux:
            m.set_fill(DEP, 1)
        bt = self.bout_hausse(b, 2)
        t20 = gras("20 %", 30, HAUSSE).next_to(bt, UP, buff=0.15)
        aht, tht = self.accolade(b.bp.piste, "du prix HT", DEP, DOWN)
        L2 = self.lc([("20 % du HT,", VERT_OK)], 1.0, fs=40, xl=0.9)
        L2b = self.lc([("pas de 60 €", ROUGE_ERREUR)], 0.3, fs=40, xl=0.9)
        self.montre("Les 20 %", FadeIn(b, shift=UP * 0.2), FadeIn(bt, shift=LEFT * 0.2), FadeIn(t20, scale=1.3),
                    FadeIn(L2, shift=RIGHT * 0.15), rt=0.45)
        self.montre("prix hors taxe", GrowFromCenter(aht), FadeIn(tht), Indicate(b.bp.piste, color=DEP), rt=0.5)
        self.montre("pas sur 60", FadeIn(L2b, shift=RIGHT * 0.15), rt=0.4)
        L3 = self.lc([("48 × 1,2", WHITE), ("= 57,60 €", AMBRE)], -0.85, fs=44, xl=0.9)
        self.jouer(L3, ["48 fois", "57,60"])
        L4 = self.lc([("≠ 60 €", ROUGE_ERREUR)], -1.7, fs=44, xl=2.6)
        self.montre("pas 60.", FadeIn(L4, scale=1.3), rt=0.4)
        self.insister(L4, 1.2, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (+ 25 % → 100 € ; départ ? → C = 80 €) ───────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(y=1.75, largeur=4.0, x=-3.9)
        for m in b.morceaux:
            m.set_fill(DEP, 1)
        bt = self.bout_hausse(b, 2.5)

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), FadeIn(bt, shift=LEFT * 0.2), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["100 ÷ 1,25", "= 80 €"])
            l1 = sc.ligne_rep(1, ["80 × 1,25", "= 100"])
            l2 = sc.ligne_rep(2, ["A : − 25 % de 100 ;", "B : une hausse."])
            a80, t80 = sc.accolade(b.bp.piste, "80 €", VERT_OK, DOWN)
            sc.montre("100 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("égale 80", FadeIn(l0[1], scale=1.3), GrowFromCenter(a80), FadeIn(t80, scale=1.3), rt=0.4)
            sc.montre("80 fois", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            ok = sc.coche(VERT_OK, 0.22).next_to(l1, RIGHT, buff=0.25)
            sc.montre("égale 100", FadeIn(l1[1], scale=1.3), Create(ok), rt=0.4)
            sc.montre("A enlève", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("B fait", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Après une hausse de 25 %,", "un prix vaut 100 €.", "Prix de départ ?"],
                            [self.t("75 €", 36), self.t("125 €", 36), self.t("80 €", 36)], 2,
                            ["100 ÷ 1,25 = 80 €", "80 × 1,25 = 100", "A : − 25 % de 100 ; B : une hausse."],
                            mot_q="Après", avant_q=avant, autres_r=apres)

    # ── 07 : après une baisse : ? × 0,6 = 30 € ; 30 ÷ 0,6 = 50 € ───────────
    def ecran_baisse(self):
        self.ecran("07-baisse")
        self.titre_haut("Après une baisse", "Après une baisse", couleur=BAISSE)
        b = self.barre(y=1.55, largeur=5.0, x=-3.4)
        for m in b.morceaux:
            m.set_fill(DEP, 1)
        pull = sans(self.t("un pull soldé", 30, GREY_B)).next_to(b, UP, buff=0.2)
        self.montre("Un pull", FadeIn(b, shift=UP * 0.2), FadeIn(pull), rt=0.45)
        t40 = gras("− 40 %", 32, BAISSE).next_to(VGroup(*b.morceaux[6:]), DOWN, buff=0.2)
        self.montre("moins 40", *b.colorer(range(6, 10), BAISSE), FadeIn(t40, scale=1.3), rt=0.45)
        a = boite("?", DEP, 46, centre=P(-4.4, -0.75))
        c = boite("30 €", ARR, 40, centre=P(-0.4, -0.75))
        fl, lab = fleche(a, c, "× 0,6")
        self.montre("coûte 30", FadeIn(c, shift=LEFT * 0.2), rt=0.4)
        self.montre("Prix de départ", FadeIn(a, shift=RIGHT * 0.2), rt=0.4)
        self.montre("fois 0,6", GrowArrow(fl), FadeIn(lab, scale=1.3),
                    Indicate(VGroup(*b.morceaux[:6]), color=DEP, scale_factor=1.05), rt=0.5)
        rf, rl = retour(a, c, "÷ 0,6")
        L = self.lc([("30 ÷", WHITE), ("0,6", WHITE), ("=", WHITE), ("50 €", VERT_OK)], -0.75, fs=46, xl=1.5)
        L[3].shift(RIGHT * 0.12)  # HD 23/11 : ligne réduite, le cadre collait au « = »
        self.montre("Donc 30", Create(rf), FadeIn(L[0], shift=RIGHT * 0.15), rt=0.45)
        self.au_mot("0,6, égale", 2)
        self.play(FadeIn(rl, scale=1.3), FadeIn(L[1]), FadeIn(L[2]), run_time=0.35)
        n50 = nombre_dans(a, "50 €", 40, VERT_OK)
        self.montre("égale 50", FadeIn(L[3], scale=1.3), FadeOut(a.nb), FadeIn(n50, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(L[3])), run_time=0.3)
        self.insister(n50, 1.25, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (− 50 % → 20 € ; départ ? → B = 40 €) ───────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(y=1.75, largeur=4.4, x=-3.8)
        for m in b.morceaux:
            m.set_fill(DEP, 1)

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), *b.colorer(range(5, 10), BAISSE), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["20 ÷ 0,5", "= 40 €"])
            l1 = sc.ligne_rep(1, ["A : + 50 % de 20 ;"])
            l2 = sc.ligne_rep(2, ["C : refait la baisse."])
            a40, t40 = sc.accolade(b.bp.piste, "40 €", VERT_OK, DOWN)
            sc.montre("20 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.4)
            sc.montre("égale 40", FadeIn(l0[1], scale=1.3), GrowFromCenter(a40), FadeIn(t40, scale=1.3), rt=0.4)
            sc.montre("A ajoute", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("C refait", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Après une baisse de 50 %,", "un jeu vaut 20 €.", "Son prix avant ?"],
                            [self.t("30 €", 36), self.t("40 €", 36), self.t("10 €", 36)], 1,
                            ["20 ÷ 0,5 = 40 €", "A : + 50 % de 20 ;", "C : refait la baisse."],
                            mot_q="Après", avant_q=avant, autres_r=apres)

    # ── 09 : défi : 84 € TTC (TVA 20 %) ; 2 100 € après + 5 % ──────────────
    def chaines_defi(self):
        a1 = boite("?", DEP, 46, l=1.8, centre=P(-5.4, 1.75))
        b1 = boite("84 €", ARR, 40, l=1.8, centre=P(-1.2, 1.75))
        f1, l1 = fleche(a1, b1, "TVA 20 %", fs=26)
        a2 = boite("?", DEP, 46, l=1.8, centre=P(-5.4, -0.95))
        b2 = boite("2 100 €", ARR, 38, l=2.2, centre=P(-1.0, -0.95))
        f2, l2 = fleche(a2, b2, "+ 5 %", fs=30)
        n1 = sans(self.t("HT", 26, GREY_B)).next_to(a1, UP, buff=0.12)
        n2 = sans(self.t("salaire", 26, GREY_B)).next_to(b2, UP, buff=0.12)
        return a1, b1, f1, l1, a2, b2, f2, l2, n1, n2

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        a1, b1, f1, l1, a2, b2, f2, l2, n1, n2 = self.chaines_defi()
        self.montre("84 €", FadeIn(b1, shift=LEFT * 0.2), rt=0.4)
        self.montre("TVA de 20", GrowArrow(f1), FadeIn(l1, scale=1.2), rt=0.45)
        self.montre("hors taxe", FadeIn(a1, shift=RIGHT * 0.2), FadeIn(n1), rt=0.4)
        self.montre("un salaire", FadeIn(n2), rt=0.35)
        self.montre("5 %", GrowArrow(f2), FadeIn(l2, scale=1.2), rt=0.45)
        self.montre("vaut 2 100", FadeIn(b2, shift=LEFT * 0.2), rt=0.4)
        self.montre("combien valait", FadeIn(a2, shift=RIGHT * 0.2), rt=0.4)
        self.play(Indicate(a1, color=AMBRE), Indicate(a2, color=AMBRE), run_time=0.6)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        a1, b1, f1, l1, a2, b2, f2, l2, n1, n2 = self.chaines_defi()
        self.add(sans(VGroup(a1, b1, f1, l1, a2, b2, f2, l2, n1, n2)))
        pas_audit(VGroup(b1, l1, b2, l2))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        r1, q1 = retour(a1, b1, "÷ 1,2", fs=30)
        r2, q2 = retour(a2, b2, "÷ 1,05", fs=30)
        L1 = self.lc([("84 ÷ 1,2", WHITE), ("=", WHITE), ("70 €", VERT_OK)], 1.75, fs=40, xl=1.1)
        L2 = self.lc([("2 100 ÷ 1,05", WHITE), ("=", WHITE), ("2 000 €", VERT_OK)], -0.95, fs=40, xl=1.1)
        L1[2].shift(RIGHT * 0.12)  # HD 23/11 : ligne réduite, le cadre collait au voisin
        L2[2].shift(RIGHT * 0.12)
        self.montre("84 divisé", Write(tit), Create(r1), FadeIn(L1[0], shift=RIGHT * 0.15), rt=0.5)
        self.montre("1,2, égale", FadeIn(q1, scale=1.3), FadeIn(L1[1]), rt=0.3)
        n70 = nombre_dans(a1, "70 €", 40, VERT_OK)
        self.montre("70 €", FadeIn(L1[2], scale=1.3), FadeOut(a1.nb), FadeIn(n70, scale=1.3), rt=0.4)
        self.montre("2 100 divisé", Create(r2), FadeIn(L2[0], shift=RIGHT * 0.15), rt=0.5)
        self.montre("1,05, égale", FadeIn(q2, scale=1.3), FadeIn(L2[1]), rt=0.3)
        n2000 = nombre_dans(a2, "2 000 €", 38, VERT_OK)
        self.montre("2 000", FadeIn(L2[2], scale=1.3), FadeOut(a2.nb), FadeIn(n2000, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(L1[2])), Create(self.cadre(L2[2])), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        a = boite("départ", DEP, 30, l=1.8, centre=P(-5.3, 0.3))
        b = boite("arrivée", ARR, 30, l=1.8, centre=P(-1.7, 0.3))
        fl, lab = fleche(a, b, "× c", fs=36)
        rf, rl = retour(a, b, "÷ c", fs=36)
        fig = pas_audit(VGroup(a, b, fl, lab, rf, rl))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Départ × coefficient", "= arrivée."),
            ("Départ = arrivée", "÷ coefficient."),
            ("On ne retire jamais", "le pourcentage à l'arrivée.")], fs=36)
        self.au_mot("Valeur de départ")
        self.montrer_ligne(lignes[0], Indicate(fl, color=AMBRE))
        self.au_mot("Pour retrouver")
        self.montrer_ligne(lignes[1], Indicate(rf, color=VERT_OK))
        self.au_mot("On ne retire")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.finir([self.page_de_garde, self.ecran_situation, self.ecran_question_jour, self.ecran_schema,
                    self.ecran_calcul, self.ecran_piege, self.ecran_question1, self.ecran_baisse,
                    self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale])


class PropLyceeEvoValeurInitialePremiere(PropLyceeEvoValeurInitialeBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class PropLyceeEvoValeurInitialeStmg(PropLyceeEvoValeurInitialeBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
