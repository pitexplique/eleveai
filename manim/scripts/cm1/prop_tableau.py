# prop_tableau.py
# EleveAI — Maths CM1 ET CM2 — série « Proportionnalité » CM, lot CM-A,
# épisode 04 : COMPLÉTER UN TABLEAU DE PROPORTIONNALITÉ (micro du coach :
# prop_tableau), épisode COMMUN, AVEC VOIX. Paysage 16:9 : CM1 CEINTURE VERTE
# (la paysage complète du niveau), CM2 CEINTURE JAUNE (le même cours en rappel,
# comme les fractions CM). Short jumeau : prop_tableau_short.py (blanche).
# ⭐ Méthodes travaillées : 1. la flèche LATÉRALE « × 20 » (on multiplie la
# ligne du haut par le même nombre) ; 2. les COLONNES (« 2 fois plus » : flèche
# du haut « × 2 » ; « 2 fois moins » : « ÷ 2 »). ⛔ Pas de produit en croix ;
# « × » et « ÷ » écrits, la voix dit « fois » et « divisé par ».
# ⭐ Leurres : 1. ajouter au lieu de multiplier (question 1 : 24 = 20 + 4 ;
# question 2 : « + 28 » ; piège : 61 = 60 + 1) ; 3. le mauvais nombre
# (question 1 : 60 = 3 wagons ; question 2 : « × 3 », le nombre des colonnes).
#
# Décor et métier : TRANSPORTS, Léna, CONDUCTRICE d'un petit train touristique
# (1 wagon = 20 places). Nombres inventés (ordre de grandeur réel d'un petit
# train routier : 15 à 25 places par wagon), pas de donnée à sourcer.
# Centres d'intérêt : transports.
#
# Micro → écrans : situation (01), le tableau (02), × 20 (03, 04), QUESTION 1
# (05), les colonnes (06), le piège (07), QUESTION 2 (08), défi (09) et
# correction (09b), ce que tu as appris (10), fin (11).
#
# Voix : manim/voix/cm-prop-tableau.json (validée par Frédéric le 01/11, débit
# −10, ne cite aucune classe), WAV dans public/sons/cm-prop-tableau/ ; marques
# mot à mot : manim/scripts/cm1/prop_tableau_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (TableauProp), non
# modifiés. Ajouté ICI : lena(), train(), wagon(), ligne_rep() bornée
# (prop_tableau 6e), pas_audit(), garde() sans audit de l'identité (« CM1 »).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_tableau.py PropTableauCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_tableau.py PropTableauCM1 -o eleveai-maths-cm1-prop-tableau --media_dir manim/scripts/cm1/media-prop-tableau
# Garde CM2 seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/prop_tableau.py PropTableauCM2 -o garde-cm2-prop-tableau --media_dir manim/scripts/cm1/media-prop-tableau
# python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/cm1/maths/proportionnalite/04-tableau/eleveai-maths-cm1-prop-tableau.mp4
#           manim/sorties/cm2/maths/proportionnalite/04-tableau/eleveai-maths-cm2-prop-tableau.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

ROUGE_TRAIN = "#dc2626"
BLEU_WAGON = "#2563eb"
JAUNE_WAGON = "#facc15"
RAIL = "#94a3b8"


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def lena(s=1.0):
    """Léna, conductrice : veste bleu marine, casquette à visière."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#78350f", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.0, angle=PI, start_angle=0, fill_color="#1e3a8a",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.85)
    visiere = Ellipse(width=r * 1.5, height=r * 0.3, fill_color="#111827", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.45 + RIGHT * r * 0.45)
    insigne = Circle(radius=r * 0.13, fill_color=JAUNE_WAGON, fill_opacity=1, stroke_width=0).move_to(
        c + UP * r * 0.95)
    p.add(calotte, visiere, insigne)
    return p


def roue(r=0.11):
    return VGroup(Circle(radius=r, fill_color="#1f2937", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2),
                  Dot(radius=r * 0.3, color="#cbd5e1"))


def wagon(s=1.0, couleur=BLEU_WAGON):
    """Un wagon ouvert à toit rayé, deux fenêtres, deux roues (largeur 1,0 × s)."""
    caisse = RoundedRectangle(width=1.0, height=0.42, corner_radius=0.07, fill_color=couleur, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.31))
    toit = RoundedRectangle(width=1.08, height=0.12, corner_radius=0.05, fill_color=JAUNE_WAGON, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.86))
    poteaux = VGroup(*[Rectangle(width=0.05, height=0.32, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                       .move_to(P(x, 0.66)) for x in (-0.45, 0, 0.45)])
    roues = VGroup(roue().move_to(P(-0.3, 0.06)), roue().move_to(P(0.3, 0.06)))
    return VGroup(poteaux, caisse, toit, roues).scale(s)


def locomotive(s=1.0):
    """La locomotive rouge du petit train (cabine, cheminée, phare)."""
    corps = RoundedRectangle(width=1.1, height=0.5, corner_radius=0.1, fill_color=ROUGE_TRAIN, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.33))
    cabine = RoundedRectangle(width=0.5, height=0.55, corner_radius=0.06, fill_color=ROUGE_TRAIN, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2).move_to(P(-0.27, 0.82))
    vitre = RoundedRectangle(width=0.3, height=0.24, corner_radius=0.04, fill_color="#bae6fd", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.27, 0.86))
    chem = Rectangle(width=0.14, height=0.3, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(
        P(0.3, 0.72))
    phare = Circle(radius=0.07, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0.55, 0.38))
    roues = VGroup(roue(0.13).move_to(P(-0.3, 0.08)), roue(0.13).move_to(P(0.3, 0.08)))
    return VGroup(cabine, vitre, chem, corps, phare, roues).scale(s)


def train(n, s=1.0, couleurs=None):
    """La locomotive (à droite, elle tire) et n wagons derrière elle, sur un
    rail. .loco · .wagons[k] (k = 0 : le plus près de la locomotive) · .rail."""
    couleurs = couleurs or [BLEU_WAGON, "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#db2777"]
    loco = locomotive(s)
    wg = VGroup(*[wagon(s, couleurs[k % len(couleurs)]) for k in range(n)])
    for k, w in enumerate(wg):
        w.move_to(loco.get_center() + LEFT * s * (1.2 + 1.12 * k), coor_mask=np.array([1, 0, 0]))
        w.align_to(loco, DOWN)
    tout = VGroup(loco, wg)
    rail = Line(tout.get_corner(DL) + LEFT * 0.15, tout.get_corner(DR) + RIGHT * 0.15, color=RAIL, stroke_width=4)
    g = VGroup(rail, wg, loco)
    g.loco, g.wagons, g.rail = loco, wg, rail
    return g


class PropTableauBaseCM(PaysageProp):
    nom_voix = "cm-prop-tableau"
    fichier_marques = "prop_tableau_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
    LIBS = ["Wagons", "Places"]
    VALS = [[1, 2, 3, 5], [20, 40, 60, 100]]
    X0 = -1.0   # le centre des tableaux
    Y0 = 1.1

    def garde(self, *a, **k):
        """L'identité (« CM1 » porte un 1) et l'échelle sont du décor : ni
        synchro, ni audit (comme frac_cm_commun.PaysageCM)."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à
        droite (BORD_X), comme prop_tableau.py (6e)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """CM : la phrase de réponse en 34 (au lieu de 30), sous les cartes."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.col(self.bloc(phrase, 34, VERT_OK), cartes.get_bottom()[1] - 0.3)
        ph2.align_to(P(0, cartes.get_bottom()[1] - 0.2), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def table(self, vals=None, connues=(), trous=(), centre=None, larg=1.45, lib=2.3, fs=42, libs=None):
        """Le tableau des wagons : les cases `connues` portent leur valeur
        (posées d'un bloc : données déjà dites), les `trous` leur « ? ».
        Renvoie (tb, ce qui est déjà à l'écran : à self.add)."""
        tb = TableauProp(libs or self.LIBS, vals or self.VALS, montrer=False, largeur_case=larg, largeur_libelle=lib,
                         hauteur=0.9, fs=fs, centre=centre if centre is not None else P(self.X0, self.Y0))
        deja = VGroup(tb.fond)
        for rc in connues:
            deja.add(tb.valeur(*rc))
        for rc in trous:
            deja.add(tb.trou(*rc))
        return tb, deja

    def ligne_c(self, morceaux, y, fs=46, x=None):
        """Une ligne de calcul centrée sous le tableau (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    @staticmethod
    def muet(fl):
        """Étiquette de flèche dite en mots : ni attente de la synchro, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def calc_tb(self, tb, r, c, v, morceaux, mots, y, fs=46, allume=None):
        """Une ligne « 2 × 20 = 40 places » morceau par morceau, chaque morceau
        à SON mot (mots[k]) ; le dernier remplit la case (r, c) avec v."""
        lg = self.ligne_c(morceaux, y, fs)
        for k, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(mot)
            anims = [FadeIn(m, shift=RIGHT * 0.2) if k < len(lg) - 1 else FadeIn(m, scale=1.3)]
            if k == 0 and allume is not None:
                anims.append(tb.allumer(*allume))
            if k == len(lg) - 1:
                anims.append(tb.remplir(r, c, v))
            self.play(*anims, run_time=0.3 if k < len(lg) - 1 else 0.4)
        self.play(tb.allumer(r, c), run_time=0.25)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compléter un tableau de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Compléter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(self.LIBS, [["?"] * 4] * 2, montrer=False, largeur_case=1.2, largeur_libelle=2.2,
                         hauteur=0.8, fs=36, centre=P(0.9, 0.35))
        tr = train(2, 0.62).move_to(P(-4.75, 0.3))
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tr, shift=RIGHT * 0.4), run_time=0.6)
        self.au_mot("Comment")
        trous = [tb.trou(r, c) for r in range(2) for c in range(4)]
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in trous], lag_ratio=0.08), run_time=0.7)
        self.au_mot("cases vides")
        self.play(LaggedStart(*[Indicate(t, color=AMBRE, scale_factor=1.15) for t in trous], lag_ratio=0.08),
                  run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, conductrice du petit train ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = lena(1.0).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("conduit")
        met = self.t("conductrice", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        tr = train(1, 1.15).move_to(P(-1.2, 2.2))
        self.au_mot("petit train")
        self.play(FadeIn(tr, shift=RIGHT * 1.0), run_time=0.8)
        l0 = self.ligne([("Chaque wagon :", WHITE), ("20 places", VERT_OK)], 44).move_to(P(0, 0.85)).align_to(P(-3.6, 0), LEFT)
        self.au_mot("Chaque wagon")
        self.play(FadeIn(l0[0], shift=RIGHT * 0.2), Indicate(tr.wagons[0], color=AMBRE, scale_factor=1.1),
                  run_time=0.45)
        self.au_mot("20 places")
        self.play(FadeIn(l0[1], scale=1.3), run_time=0.4)
        self.insister(l0[1], 1.15, 0.25, about=l0[1].get_left())
        for k, mot in enumerate(["2 wagons", "3 wagons", "5 wagons"]):
            lg = self.ligne([(mot, WHITE), ("→ ? places", ORANGE_RETENUE)], 40).move_to(P(0, -0.25 - 0.85 * k))
            lg.align_to(P(-2.9, 0), LEFT)
            lg[1].sans_synchro = True  # « places » redit : la question de la ligne, pas un nombre
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1]), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb, _ = self.table()
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En haut")
        hauts = [pas_audit(tb.valeur(0, c)) for c in (1, 2, 3)]  # 2, 3, 5 wagons : dits à l'écran 01
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("nombre de wagons")
        self.play(*[FadeIn(h, scale=1.3) for h in hauts], FadeIn(tb.trou(0, 0), scale=1.3), run_time=0.5)
        self.au_mot("En bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("nombre de places")
        self.play(*[FadeIn(tb.trou(1, c), scale=1.3) for c in range(4)], run_time=0.5)
        self.au_mot("1 wagon")
        self.play(tb.remplir(0, 0, 1), run_time=0.4)
        self.play(tb.allumer(0, 0), run_time=0.25)
        self.au_mot("20 places")
        self.play(tb.remplir(1, 0, 20), run_time=0.4)
        self.play(tb.allumer(1, 0), run_time=0.25)
        self.play(Indicate(tb.colonne(0), color=AMBRE, scale_factor=1.08), run_time=0.6)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        self.attendre_voix()

    # ── 03 : × 20, d'en haut à en bas ───────────────────────────────────────
    def ecran_fois(self):
        self.ecran("03-fois")
        tb, deja = self.table(connues=[(0, 0), (0, 1), (0, 2), (0, 3), (1, 0)], trous=[(1, 1), (1, 2), (1, 3)])
        self.add(deja)
        fl = tb.fleche_lat("× 20")
        self.au_mot("Pour passer")
        self.play(Indicate(tb.colonne(0), color=AMBRE, scale_factor=1.08), run_time=0.6)
        self.au_mot("multiplie")
        self.play(Create(fl.fleche), run_time=0.5)
        self.au_mot("par 20")
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.35)
        self.insister(fl.etiquette, 1.3, 0.2)
        self.calc_tb(tb, 1, 1, 40, [("2 ×", WHITE), ("20", FLECHE_K), ("=", WHITE), ("40 places", VERT_OK)],
                     ["2 fois", "20, égale 40", None, "40 places"], -1.0, allume=(0, 1))
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.25)
        self.calc_tb(tb, 1, 2, 60, [("3 ×", WHITE), ("20", FLECHE_K), ("=", WHITE), ("60 places", VERT_OK)],
                     ["3 fois", "20, égale 60", None, "60 places"], -1.95, allume=(0, 2))
        self.attendre_voix()

    # ── 04 : et 5 wagons ? ──────────────────────────────────────────────────
    def ecran_cinq(self):
        self.ecran("04-cinq")
        tb, deja = self.table(connues=[(0, 0), (0, 1), (0, 2), (0, 3), (1, 0), (1, 1), (1, 2)], trous=[(1, 3)])
        self.add(deja, tb.fleche_lat("× 20"))
        self.au_mot("Et 5")
        self.play(tb.allumer(0, 3), run_time=0.4)
        self.calc_tb(tb, 1, 3, 100, [("5 ×", WHITE), ("20", FLECHE_K), ("=", WHITE), ("100 places", VERT_OK)],
                     ["5 fois", "20, égale 100", None, "100 places"], -1.0)
        self.play(tb.eteindre(0, 3), run_time=0.25)
        self.au_mot("Le tableau est")
        fin = self.t("Le tableau est complet !", 44, VERT_OK).move_to(P(self.X0, -2.0))
        self.play(FadeIn(fin, shift=UP * 0.15),
                  LaggedStart(*[Indicate(tb.colonne(c), color=VERT_OK, scale_factor=1.08) for c in range(4)],
                              lag_ratio=0.25), run_time=1.0)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (4 wagons ?) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = TableauProp(self.LIBS, [[1, 4], [20, 80]], montrer=False, largeur_case=1.25, largeur_libelle=1.9,
                         hauteur=0.9, fs=40, centre=P(-3.9, 0.9))
        tr = train(4, 0.55).move_to(P(-3.9, -1.3))
        self.add(tb.fond, tb.valeur(0, 0), tb.valeur(1, 0), tb.trou(0, 1), tb.trou(1, 1), tr)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["On multiplie", "par 20 :"])
            l1 = sc.ligne_rep(1, ["4 ×", "20 =", "80 places."])
            l2 = sc.ligne_rep(2, ["24 =", "20 +", "4 :", "ajouté !"])
            l2.set_color(ROUGE_ERREUR)
            fl = tb.fleche_lat("× 20", fs=40)
            sc.au_mot("On multiplie")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl.fleche), run_time=0.35)
            sc.au_mot("par 20")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("4 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), tb.remplir(0, 1, 4), run_time=0.3)
            sc.au_mot("20, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("80 places")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 80), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.25)
            sc.au_mot("24, c'est")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("20 plus")
            sc.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("4 : on")
            sc.play(FadeIn(l2[2], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("ajouté")
            sc.play(FadeIn(l2[3], shift=UP * 0.15), run_time=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien de places", "pour 4 wagons ?"],
                            [self.t("24 places", 36), self.t("80 places", 36), self.t("60 places", 36)], 1,
                            ["On multiplie par 20 :", "4 × 20 = 80 places.", "24 = 20 + 4 : ajouté !"],
                            mot_q="Combien", autres_r=apres)

    # ── 06 : autre chemin, les colonnes ─────────────────────────────────────
    def ecran_colonnes(self):
        self.ecran("06-colonnes")
        tb, deja = self.table(vals=[[1, 2, 4], [20, 40, 80]], connues=[(0, 0), (0, 1), (1, 0), (1, 1)],
                              trous=[(1, 2)], centre=P(self.X0, 0.55), larg=1.7)
        self.add(deja)
        self.au_mot("Autre chemin")
        tit = self.t("Autre chemin : les colonnes", 46, FLECHE_COL).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        self.au_mot("colonnes")
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=FLECHE_COL, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.3), run_time=0.9)
        self.au_mot("4 wagons")
        self.play(FadeIn(tb.valeur(0, 2), scale=1.4), run_time=0.35)
        self.play(tb.allumer(0, 2), run_time=0.25)
        h = tb.fleche_col(1, 2, "× 2", ligne=0)
        self.au_mot("2 fois plus que")
        self.play(tb.allumer(0, 1), Create(h.fleche), FadeIn(h.etiquette, scale=1.4), run_time=0.45)
        self.insister(h.etiquette, 1.3, 0.2)
        b = tb.fleche_col(1, 2, "× 2", ligne=1)
        self.au_mot("Donc 2 fois plus")
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 2), tb.allumer(1, 1), Create(b.fleche),
                  FadeIn(b.etiquette, scale=1.4), run_time=0.45)
        self.calc_tb(tb, 1, 2, 80, [("40 ×", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("80", VERT_OK)],
                     ["40 fois", "2, égale", None, "80. Même"], -2.05)
        self.au_mot("Même réponse")
        meme = self.t("Même réponse !", 44, VERT_OK).move_to(P(self.X0 - 0.3, -2.95))
        ok = self.coche(VERT_OK, 0.3).next_to(meme, RIGHT, buff=0.3)
        self.play(FadeIn(meme, scale=1.2), Create(ok), run_time=0.45)
        self.attendre_voix()

    # ── 07 : le piège : un wagon de plus n'est pas une place de plus ────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 48, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        lg = self.ligne([("Un wagon de plus", VERT_OK), ("≠", WHITE), ("une place de plus", ROUGE_ERREUR)], 40)
        lg.move_to(P(-0.6, 2.25))
        self.au_mot("Un wagon")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("pas une place")
        self.play(FadeIn(lg[1]), FadeIn(lg[2], scale=1.2), run_time=0.4)
        tb, _ = self.table(vals=[[3, 4], [60, 80]], centre=P(-1.6, -0.15), larg=1.7)
        self.au_mot("3 wagons")
        self.play(FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.4)
        self.au_mot("60 places")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        h = self.muet(tb.fleche_col(0, 1, "+ 1", ligne=0, couleur=ORANGE_RETENUE))
        self.au_mot("4 wagons")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), Create(h.fleche),
                  FadeIn(h.etiquette, scale=1.3), run_time=0.45)
        b = tb.fleche_col(0, 1, "+ 20", ligne=1, couleur=VERT_OK)
        self.au_mot("20 places de plus")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.45)
        self.insister(b.etiquette, 1.25, 0.2)
        fin = self.ligne_c([("80", VERT_OK), ("et pas", WHITE), ("61", ROUGE_ERREUR)], -2.95, fs=48, x=-1.6)
        self.au_mot("80, et")
        self.play(tb.remplir(1, 1, 80), FadeIn(fin[0], scale=1.3), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.25)
        self.au_mot("et pas")
        self.play(FadeIn(fin[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("61")
        barre = Line(fin[2].get_corner(DL) + P(-0.08, 0), fin[2].get_corner(UR) + P(0.08, 0), color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(FadeIn(fin[2], scale=1.3), run_time=0.3)
        self.play(Create(barre), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (2 → 30, 6 → 90 : par quel nombre ?) ────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = TableauProp(self.LIBS, [[2, 6], [30, 90]], montrer=False, largeur_case=1.25, largeur_libelle=1.9,
                         hauteur=0.9, fs=40, centre=P(-3.9, 0.9))
        tr = train(2, 0.6).move_to(P(-3.9, -1.3))

        def avant(sc):
            sc.au_mot("Un autre train")
            sc.play(FadeIn(tb.fond), FadeIn(tr, shift=RIGHT * 0.4), run_time=0.4)
            for (r, c), mot in (((0, 0), "2 wagons"), ((1, 0), "30 places"), ((0, 1), "6 wagons"),
                                ((1, 1), "90 places")):
                sc.au_mot(mot)
                sc.play(FadeIn(tb.valeur(r, c), scale=1.4), run_time=0.3)

        def apres(sc):
            l0a = sc.ligne_rep(0, ["2 ×", "15 =", "30."])
            l0b = sc.ligne_rep(1, ["6 ×", "15 =", "90."])
            l0 = VGroup(*l0a, *l0b)
            l1a = sc.ligne_rep(2, ["Fois 3 :", "d'une colonne"])
            l1b = sc.ligne_rep(3, ["à l'autre."])
            l1 = VGroup(l1a[0], VGroup(l1a[1], l1b[0]))
            fl = tb.fleche_lat("× 15", fs=40)
            h = tb.fleche_col(0, 1, "× 3", ligne=0)
            sc.au_mot("2 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl.fleche), tb.allumer(0, 0), run_time=0.3)
            sc.au_mot("15, égale 30")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("30. 6")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("6 fois")
            sc.play(FadeIn(l0[3], shift=UP * 0.15), tb.eteindre(0, 0), tb.eteindre(1, 0), tb.allumer(0, 1),
                    run_time=0.3)
            sc.au_mot("15, égale 90")
            sc.play(FadeIn(l0[4], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("90. On")
            sc.play(FadeIn(l0[5], shift=UP * 0.15), tb.allumer(1, 1), run_time=0.3)
            sc.au_mot("toujours")
            sc.play(Indicate(fl, color=AMBRE, scale_factor=1.15), tb.eteindre(0, 1), tb.eteindre(1, 1),
                    run_time=0.6)
            sc.au_mot("Fois 3")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("colonne à")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), Indicate(tb.colonne(0), color=FLECHE_COL),
                    Indicate(tb.colonne(1), color=FLECHE_COL), run_time=0.5)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Par quel nombre passe-t-on", "d'en haut à en bas ?"],
                            [self.t("× 15", 38), self.t("+ 28", 38), self.t("× 3", 38)], 0,
                            ["2 × 15 = 30.", "6 × 15 = 90.", "Fois 3 : d'une colonne", "à l'autre."],
                            avant_q=avant, autres_r=apres)

    # ── 09 : défi : 2 wagons = 50 places ────────────────────────────────────
    VALS_D = [[1, 2, 4, 6], [25, 50, 100, 150]]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb, _ = self.table(vals=self.VALS_D, centre=P(self.X0, 1.2))
        tr = train(2, 0.75).move_to(P(-3.6, -1.0))
        self.au_mot("Dans un autre")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tr, shift=RIGHT * 0.5), run_time=0.6)
        self.au_mot("2 wagons")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.35)
        self.au_mot("50 places")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.35)
        for c, mot in ((2, "4 wagons"), (3, "6 wagons"), (0, "1 wagon")):
            self.au_mot(mot)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(tb.trou(1, c), scale=1.3), run_time=0.35)
        self.pause_defi(y=-1.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb, deja = self.table(vals=self.VALS_D, connues=[(0, 0), (0, 1), (0, 2), (0, 3), (1, 1)],
                              trous=[(1, 0), (1, 2), (1, 3)], centre=P(self.X0, 0.7))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.25))
        self.add(deja)
        self.play(Write(tit), run_time=0.5)
        etapes = [(2, "4 wagons", "× 2", "2 fois plus", 100, [("50 ×", WHITE), ("2", FLECHE_COL), ("=", WHITE),
                                                              ("100 places", VERT_OK)],
                   ["50 fois", "2, égale", None, "100 places"]),
                  (3, "6 wagons", "× 3", "3 fois plus", 150, [("50 ×", WHITE), ("3", FLECHE_COL), ("=", WHITE),
                                                              ("150 places", VERT_OK)],
                   ["50 fois 3", "3, égale", None, "150 places"]),
                  (0, "1 wagon", "÷ 2", "2 fois moins", 25, [("50 ÷", WHITE), ("2", FLECHE_COL), ("=", WHITE),
                                                             ("25 places", VERT_OK)],
                   ["50 divisé", "2, égale 25", None, "25 places"])]
        h = None
        for k, (c, mot_c, lab, mot_f, v, morceaux, mots) in enumerate(etapes):
            self.au_mot(mot_c)
            sortie = [FadeOut(h)] if h is not None else []
            self.play(*sortie, *[tb.eteindre(r, cc) for r in range(2) for cc in range(4)], tb.allumer(0, c),
                      run_time=0.35)
            h = tb.fleche_col(1, c, lab, ligne=0)
            self.au_mot(mot_f)
            self.play(tb.allumer(0, 1), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.4)
            self.play(tb.eteindre(0, 1), tb.eteindre(0, c), tb.allumer(1, 1), run_time=0.25)
            self.calc_tb(tb, 1, c, v, morceaux, mots, -0.85 - 0.8 * k, fs=40)
        self.play(*[tb.eteindre(r, cc) for r in range(2) for cc in range(4)], run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        """« Ce que tu as appris » : titre EN HAUT ET CENTRÉ, le tableau complet
        (× 20 et × 2) en grand dessous, les trois points sous le tableau (la
        colonne de droite de finale_colonne le rendait trop petit)."""
        self.ecran("10-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        tb, deja = self.table(connues=[(r, c) for r in range(2) for c in range(4)], centre=ORIGIN)
        fig = VGroup(deja, tb.fleche_lat("× 20"), tb.fleche_col(0, 1, "× 2", ligne=0))
        fig.scale(0.8).move_to(P(-0.4, 1.3))
        if fig.get_top()[1] > tit.get_bottom()[1] - 0.15:
            fig.shift(DOWN * (fig.get_top()[1] - tit.get_bottom()[1] + 0.15))
        self.add(fig)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux, couleur in ((["On multiplie le haut par le même nombre."], WHITE),
                                  (["On peut aussi faire fois plus", "ou fois moins entre les colonnes."], WHITE),
                                  (["On n'ajoute jamais le même nombre."], ROUGE_ERREUR)):
            bloc = VGroup(*[self.t(x, 38, couleur) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        lignes.align_to(P(-5.6, 0), LEFT).align_to(P(0, fig.get_bottom()[1] - 0.35), UP)
        self.au_mot("Pour compléter")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=AMBRE))
        self.au_mot("On peut aussi")
        self.montrer_ligne(lignes[1], Indicate(fig[2], color=FLECHE_COL))
        self.au_mot("Et on")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_tableau, self.ecran_fois, self.ecran_cinq,
                  self.ecran_question1, self.ecran_colonnes, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde CM2 seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("11-abonne")


class PropTableauCM1(PropTableauBaseCM):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PropTableauCM2(PropTableauBaseCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
