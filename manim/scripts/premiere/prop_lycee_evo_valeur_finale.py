# prop_lycee_evo_valeur_finale.py
# EleveAI — Maths 1re et STMG (automatismes, épreuve anticipée SANS calculatrice)
# série « Évolutions en pourcentage », épisode COMMUN 09 : CALCULER UNE VALEUR
# D'ARRIVÉE (micro du coach : auto_evo_valeur_finale).
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_evo_valeur_finale_short.py).
# Deux sous-classes : PropLyceeEvoValeurFinalePremiere (« Maths 1re — EleveAI ») et
# PropLyceeEvoValeurFinaleStmg (« Maths STMG — EleveAI », garde seule, GARDE_SEULE=1,
# puis collage avec frac_cm_commun.py coller).
# ⭐ Méthode en deux temps : ① le taux → le coefficient ; ② arrivée = départ ×
# coefficient. Sans calculatrice : on DÉCOUPE (10 %, puis 5 % = la moitié).
# ⭐ Le dessin : la barre de 100 % (le départ), le bout ajouté (la hausse) ou le
# morceau retiré (la baisse) ; les flèches départ → arrivée « × 1,15 », « × 0,92 ».
# ⭐ Fil rouge (erreurs) : oublier d'ajouter le départ (piège 07 : 1 800, ce n'est
# que la hausse) ; question 1 B = + 15 € au lieu de 15 %, C = la hausse seule ;
# question 2 A = la baisse seule, C = − 2 habitants au lieu de 2 %.
# Décor et métiers : RÉSEAUX SOCIAUX (une créatrice de vidéos, 12 000 abonnés,
# + 15 %) et SCIENCES (une ingénieure, facture d'énergie 45 000 €, − 8 %).
# Chiffres inventés (vie courante), pas de source.
# Écrans : 00 garde · 01 situation · 02 question du jour · 03 la méthode (+ 15 %) ·
# 04 la baisse (− 8 %) · 05 de tête (10 % puis 5 %) · 06 QUESTION 1 (A) · 07 le piège ·
# 08 QUESTION 2 (B) · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
# Voix : manim/voix/lycee-evo-valeur-finale.json (« go » de Frédéric le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-valeur-finale/ ; marques : prop_lycee_evo_valeur_finale_marques.json.
# Outils (non modifiés) : la base PropPourcentageCoefficientBase de l'épisode 4e 35,
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_valeur_finale.py PropLyceeEvoValeurFinalePremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_valeur_finale.py PropLyceeEvoValeurFinalePremiere -o eleveai-maths-premiere-evo-valeur-finale --media_dir manim/scripts/premiere/media-prop-lycee-evo-valeur-finale
# Garde STMG seule : GARDE_SEULE=1 … PropLyceeEvoValeurFinaleStmg -o garde-stmg-evo-valeur-finale

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
BarreCent, boite_prix = _p35.BarreCent, _p35.boite_prix
gras, sans = _p35.gras, _p35.sans

BLEU_C = "#38bdf8"     # les 100 % de départ (bleu)
BOUT = "#fb923c"       # (orange : les taux)
RETIRE = "#ef4444"     # le morceau retiré par la baisse (rouge)
VIDE = "#1e293b"       # la place laissée vide
FAUX = "#ef4444"
PAPIER = "#f8fafc"
ENCRE = "#0f172a"


def barre_pleine(largeur=6.0, h=0.75, centre=ORIGIN):
    """La barre de 100 %, toute bleue (10 morceaux de 10 %)."""
    b = BarreCent("", largeur=largeur, h=h, centre=centre)
    for m in b.morceaux:
        m.set_fill(BLEU_C, 1)
    return b


def bout(b, k, couleur=BOUT):
    """Le bout ajouté au bout de la barre : k morceaux de 10 % (2 % → k = 0,2)."""
    return Rectangle(width=b.lm * k, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).next_to(b.bp.piste, RIGHT, buff=0.04)


def video(s=1.0):
    """Le bouton « vidéo » d'une chaîne : un rectangle rouge, un triangle blanc."""
    r = RoundedRectangle(width=1.4, height=1.0, corner_radius=0.25, fill_color="#dc2626", fill_opacity=1,
                         stroke_width=0)
    t = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.25).rotate(-PI / 2).move_to(r)
    return VGroup(r, t).scale(s)


def usine(s=1.0):
    """Une usine : des toits en dents de scie et une cheminée."""
    corps = Polygon(P(-0.9, -0.5), P(-0.9, 0.2), P(-0.5, 0.5), P(-0.5, 0.2), P(-0.1, 0.5), P(-0.1, 0.2),
                    P(0.3, 0.5), P(0.3, -0.5), fill_color="#64748b", fill_opacity=1, stroke_width=0)
    chem = Rectangle(width=0.25, height=1.2, fill_color="#475569", fill_opacity=1, stroke_width=0).move_to(P(0.6, 0.1))
    fum = VGroup(*[Circle(radius=0.1 + 0.04 * i, fill_color=GREY_B, fill_opacity=0.6, stroke_width=0)
                   .move_to(P(0.7 + 0.15 * i, 0.85 + 0.18 * i)) for i in range(3)])
    fen = VGroup(*[Square(0.18, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(-0.65 + 0.4 * i, -0.15))
                   for i in range(3)])
    return VGroup(corps, chem, fum, fen).scale(s)


def ville(s=1.0):
    """Une ville : trois immeubles de hauteurs différentes."""
    g = VGroup()
    for x, h, c in ((-0.6, 1.0, "#64748b"), (0.0, 1.5, "#475569"), (0.6, 0.8, "#94a3b8")):
        im = Rectangle(width=0.5, height=h, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, h / 2 - 0.5))
        fe = VGroup(*[Square(0.1, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
                      .move_to(P(x - 0.1 + 0.2 * (i % 2), h - 0.7 - 0.3 * (i // 2))) for i in range(2 * int(h / 0.4))])
        g.add(im, fe)
    return g.scale(s)


def velo(s=1.0):
    """Un vélo : deux roues, le cadre, la selle, le guidon."""
    r1 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=5).move_to(P(-0.6, -0.2))
    r2 = Circle(radius=0.38, stroke_color=WHITE, stroke_width=5).move_to(P(0.6, -0.2))
    cadre = VMobject(color=VERT_OK, stroke_width=6).set_points_as_corners(
        [P(-0.6, -0.2), P(-0.1, -0.2), P(0.25, 0.35), P(-0.25, 0.35), P(-0.6, -0.2)])
    av = Line(P(0.25, 0.35), P(0.6, -0.2), color=VERT_OK, stroke_width=6)
    selle = Line(P(-0.38, 0.5), P(-0.12, 0.5), color=WHITE, stroke_width=7)
    guid = Line(P(0.2, 0.55), P(0.42, 0.55), color=WHITE, stroke_width=7)
    return VGroup(r1, r2, cadre, av, selle, guid).scale(s)


def billet(s=1.0):
    """Une fiche de salaire : un billet vert et une pièce."""
    b = RoundedRectangle(width=1.4, height=0.75, corner_radius=0.08, fill_color="#15803d", fill_opacity=1,
                         stroke_color="#bbf7d0", stroke_width=3)
    rond = Circle(radius=0.2, stroke_color="#bbf7d0", stroke_width=3).move_to(b)
    piece = Circle(radius=0.22, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0.7, -0.35))
    return VGroup(b, rond, piece).scale(s)


def facture(s=1.0):
    """Une facture : une feuille et des lignes, un total en bas."""
    f = RoundedRectangle(width=1.0, height=1.3, corner_radius=0.06, fill_color=PAPIER, fill_opacity=1, stroke_width=0)
    lignes = VGroup(*[Line(P(-0.35, 0.4 - 0.2 * i), P(0.35, 0.4 - 0.2 * i), color="#94a3b8", stroke_width=4)
                      for i in range(4)])
    tot = Line(P(0.0, -0.45), P(0.38, -0.45), color="#dc2626", stroke_width=7)
    return VGroup(f, lignes, tot).scale(s)


def retire(b, k, couleur=RETIRE):
    """La baisse : les k derniers morceaux de 10 % (k peut être décimal).
    Renvoie (trou, morceau) : le trou sombre qui reste dans la barre et le
    morceau rouge, posé à sa place, qu'on fait partir."""
    w = b.lm * k
    x1 = b.morceaux[-1].get_right()[0]
    trou = Rectangle(width=w, height=b.hh, fill_color=VIDE, fill_opacity=1, stroke_width=0)
    trou.move_to(P(x1 - w / 2, b.morceaux[0].get_y()))
    m = Rectangle(width=w, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    return trou, m.move_to(trou)


def reste(b, k):
    """Ce qui reste de la barre après une baisse de k morceaux (pour l'accolade)."""
    w = b.lm * (10 - k)
    x0 = b.morceaux[0].get_left()[0]
    return Rectangle(width=w, height=b.hh, stroke_width=0, fill_opacity=0).move_to(P(x0 + w / 2, b.morceaux[0].get_y()))


class PropLyceeEvoValeurFinaleBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-evo-valeur-finale"
    fichier_marques = "prop_lycee_evo_valeur_finale_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XB = -2.9
    XC = 1.3

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """HD du 23/11 : à buff 0,08 (cadre du 4e), le « = » et le « % » touchaient le trait."""
        return SurroundingRectangle(m, color=couleur, buff=0.14, corner_radius=0.1, stroke_width=4)

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.2):
        """La ligne de la colonne de droite (celle de la base), morceaux un peu plus
        espacés (au brouillon, « 5 %= » se touchaient)."""
        lg = self.col(self.ligne(morceaux, fs, buff=0.32), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def dire(self, nom, dossier=None):
        """Le début de chaque clé de voix, pour les chapitres (lu dans le log)."""
        print(f"CLE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier) if dossier is not None else super().dire(nom)

    # la phrase de réponse des questions-pauses en 34, à GAUCHE sous la figure
    # (comme l'épisode 02 « formes » : à droite, elle butait sur Ti-Margo)
    Y_PH = -1.0

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.3:
            ph2.scale_to_fit_width(6.3)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.24)
        if lg.width > 6.3:
            lg.scale_to_fit_width(6.3)
        return lg.move_to(ref).align_to(ref, LEFT)

    def partir(self, trou, m, mot=None, dx=0.5, dy=0.85, avec=()):
        """Au mot : le morceau retiré s'allume en rouge, puis s'en va (et pâlit) ; le trou reste."""
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(FadeIn(trou), FadeIn(m), *avec, run_time=0.25)  # m après trou : dessiné au-dessus
        self.play(m.animate.shift(RIGHT * dx + UP * dy).set_opacity(0.55), run_time=0.45)

    @staticmethod
    def deja_retire(b, k, dx=0.35, dy=0.6):
        """Une barre DÉJÀ baissée (sans animation) : le trou, et le morceau rouge à côté."""
        trou, m = retire(b, k)
        m.shift(RIGHT * dx + UP * dy).set_opacity(0.55)
        return VGroup(trou, m)


    def chaine(self, a, b, s, y, xa, xb, ca=WHITE, cb=VERT_OK, fs=40):
        """Départ → arrivée : deux boîtes et la flèche du coefficient (rien n'est joué)."""
        pa = boite_prix(a, ca, fs).move_to(P(xa, y))
        pb = boite_prix(b, cb, fs).move_to(P(xb, y))
        arr, lab = self.fleche_coef(pa, pb, s, AMBRE)
        return pa, pb, arr, lab

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une valeur d'arrivée", self.identite, self.ceinture, y_ech=-2.45)
        sans(titre)
        sans(ident)
        sans(ech)
        self.au_mot("Appliquer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pa, pb, arr, lab = self.chaine("départ", "arrivée", "× ?", 0.2, -3.6, 1.6, fs=44)
        sans(pa)
        sans(lab)
        self.play(FadeIn(pa, shift=RIGHT * 0.2), GrowArrow(arr), FadeIn(lab), run_time=0.6)
        self.montre("valeur d'arrivée", FadeIn(pb, scale=1.3), rt=0.45)
        self.play(Circumscribe(lab, color=AMBRE, buff=0.1), Indicate(pb, color=VERT_OK), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation : une créatrice de vidéos, une ingénieure ──────────
    def ecran_situation(self):
        self.ecran("01-situation")
        xg, xd = -3.7, 2.2
        v = video(1.0).move_to(P(xg, 2.25))
        c1 = self.t("créatrice de vidéos", 32, WHITE).move_to(P(xg, 1.35))
        self.montre("créatrice", FadeIn(v, scale=0.8), FadeIn(c1, shift=UP * 0.1), rt=0.45)
        n1 = boite_prix("12 000 abonnés", WHITE, 38).move_to(P(xg, 0.4))
        self.montre("12 000", FadeIn(n1, scale=1.2), rt=0.4)
        p1 = self.tampon("+ 15 %", BOUT, 40).move_to(P(xg, -0.65))
        self.montre("15 %", FadeIn(p1, scale=1.3), rt=0.4)
        self.insister(p1, 1.15, 0.2)
        u = usine(1.0).move_to(P(xd, 2.55))  # au-dessus de « ingénieure »
        self.montre("usine", FadeIn(u, scale=0.8), rt=0.4)
        c2 = self.t("ingénieure", 32, WHITE).move_to(P(xd, 1.35))
        self.montre("ingénieure", FadeIn(c2, shift=UP * 0.1), rt=0.35)
        n2 = boite_prix("45 000 €", WHITE, 38).move_to(P(xd, 0.4))
        f = facture(0.55).next_to(n2, LEFT, buff=0.25)
        self.montre("facture", FadeIn(f, scale=0.8), rt=0.35)
        self.montre("45 000", FadeIn(n2, scale=1.2), rt=0.4)
        p2 = self.tampon("− 8 %", RETIRE, 40).move_to(P(xd, -0.65))
        self.montre("8 %", FadeIn(p2, scale=1.3), rt=0.4)
        self.insister(p2, 1.15, 0.2)
        q = self.t("Combien à l'arrivée ?", 44, ORANGE_RETENUE).move_to(P(-0.8, -2.0))
        self.montre("combien à", FadeIn(q, scale=1.2), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), run_time=0.7)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        pa, pb, arr, lab = self.chaine("12 000", "? abonnés", "+ 15 %", 1.1, -3.9, 1.7, fs=44)
        qa, qb, arr2, lab2 = self.chaine("45 000 €", "? €", "− 8 %", -0.9, -3.9, 1.7, fs=44)
        for m in (pa, lab, qa, lab2):
            sans(m)
        lab.set_color(BOUT)
        lab2.set_color(RETIRE)
        self.play(FadeIn(pa), FadeIn(qa), run_time=0.4)
        self.montre("Combien d'abonnés", GrowArrow(arr), FadeIn(lab), FadeIn(pb, scale=1.3), rt=0.5)
        self.montre("quelle facture", GrowArrow(arr2), FadeIn(lab2), FadeIn(qb, scale=1.3), rt=0.5)
        self.play(Indicate(pb, color=VERT_OK), Indicate(qb, color=VERT_OK), run_time=0.8)
        self.attendre_voix()

    # ── 03 : la méthode en deux temps (+ 15 % → × 1,15 ; 12 000 × 1,15) ─────
    def ecran_methode(self):
        self.ecran("03-methode")
        self.titre_haut("La méthode en deux temps", "La méthode")
        L1 = self.lc([("Un :", AMBRE), ("traduire le taux en coefficient", WHITE)], 2.1, fs=38, xl=-6.0)
        self.jouer(L1, ["Un :", "traduire"])
        b = barre_pleine(3.4, 0.55, centre=P(-4.4, 1.15))
        bt = bout(b, 1.5)
        L2 = self.lc([("+ 15 %", BOUT), ("→ × 1,15", AMBRE)], 1.15, fs=44, xl=-1.6)
        self.jouer(L2, ["15 %", "1,15"], {0: [FadeIn(b), FadeIn(bt, shift=LEFT * 0.2)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        L3 = self.lc([("Deux :", AMBRE), ("multiplier la valeur de départ", WHITE)], 0.1, fs=38, xl=-6.0)
        self.jouer(L3, ["Deux", "multiplier"])
        pa, pb, arr, lab = self.chaine("12 000", "13 800 abonnés", "× 1,15", -1.35, -5.0, 1.4)
        self.montre("12 000 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("1,15", 2), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("13 800", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), run_time=0.3)
        self.insister(pb, 1.1, 0.2)
        self.attendre_voix()

    # ── 04 : la facture : − 8 % → × 0,92 ; 45 000 × 0,92 = 41 400 € ─────────
    def ecran_baisse(self):
        self.ecran("04-baisse")
        f = facture(0.9).move_to(P(-5.4, 2.2))
        t = self.t("La facture", 40, WHITE).next_to(f, RIGHT, buff=0.35)
        self.montre("facture", FadeIn(f, shift=DOWN * 0.15), FadeIn(t), rt=0.4)
        b = barre_pleine(4.2, 0.6, centre=P(-4.0, 0.6))
        trou, m = retire(b, 0.8)
        self.play(FadeIn(b), run_time=0.3)
        L1 = self.lc([("− 8 %", RETIRE), ("→ × 0,92", AMBRE)], 1.3, fs=48, xl=0.6)
        self.au_mot("moins 8")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.partir(trou, m, None, 0.3, 0.6)
        self.jouer(VGroup(L1[1]), ["0,92"])
        self.play(Create(self.cadre(L1[1])), run_time=0.3)
        pa, pb, arr, lab = self.chaine("45 000 €", "41 400 €", "× 0,92", -1.35, -4.9, 0.6)
        self.montre("45 000 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("0,92", 2), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("41 400", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), run_time=0.3)
        self.insister(pb, 1.1, 0.2)
        self.attendre_voix()

    # ── 05 : sans calculatrice : on découpe (10 %, puis 5 % = la moitié) ────
    def ecran_tete(self):
        self.ecran("05-tete")
        self.titre_haut("Sans calculatrice ?", "Sans calculatrice", couleur=ORANGE_RETENUE)
        b = barre_pleine(5.0, 0.7, centre=P(-3.4, 1.0))
        self.montre("On découpe", FadeIn(b, shift=UP * 0.2), rt=0.35)
        a12, t12 = self.accolade(b.bp.piste, "12 000", WHITE, UP, fs=30)
        xl = 0.9
        L1 = self.lc([("10 % →", BOUT), ("1 200", WHITE)], 2.05, fs=42, xl=xl)
        self.jouer(VGroup(L1[0]), ["10 % de"], {0: [b.morceaux[0].animate.set_fill(BOUT, 1)]})
        self.montre("12 000", GrowFromCenter(a12), FadeIn(t12), rt=0.3)
        self.jouer(VGroup(L1[1]), ["1 200"])
        demi = Rectangle(width=b.lm / 2, height=b.hh, fill_color=AMBRE, fill_opacity=1, stroke_width=0)
        demi.align_to(b.morceaux[1], LEFT).set_y(b.morceaux[1].get_y())
        L2 = self.lc([("5 %,", AMBRE), ("la moitié :", AMBRE), ("600", WHITE)], 1.2, fs=42, xl=xl)
        self.jouer(L2, ["5 %", "la moitié", "600"], {0: [FadeIn(demi)]})
        bt1 = Rectangle(width=b.lm, height=b.hh, fill_color=BOUT, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=1.5).next_to(b.bp.piste, RIGHT, buff=0.04)
        bt2 = Rectangle(width=b.lm / 2, height=b.hh, fill_color=AMBRE, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=1.5).next_to(bt1, RIGHT, buff=0)
        a18, t18 = self.accolade(VGroup(bt1, bt2), "1 800", VERT_OK, UP, fs=30)
        t18.shift(RIGHT * 0.25)
        L3 = self.lc([("15 % →", VERT_OK), ("1 800", VERT_OK)], 0.35, fs=42, xl=xl)
        self.au_mot("15 %")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.15), TransformFromCopy(b.morceaux[0], bt1),
                  TransformFromCopy(demi, bt2), run_time=0.6)
        self.au_mot("1 800")
        self.play(FadeIn(L3[1], scale=1.3), GrowFromCenter(a18), FadeIn(t18, scale=1.3), run_time=0.4)
        a138, t138 = self.accolade(VGroup(b.bp.piste, bt1, bt2), "13 800", VERT_OK, DOWN, fs=34)
        L4 = self.lc([("12 000 + 1 800", WHITE), ("= 13 800", VERT_OK)], -1.45, fs=48, xl=-5.6)
        self.jouer(L4, ["12 000 plus", "13 800"], {1: [GrowFromCenter(a138), FadeIn(t138, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.insister(L4[1], 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (200 €, + 15 % → 230 € : A) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = barre_pleine(4.2, 0.65, centre=P(-3.9, 1.9))

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            bt = bout(b, 1.5)
            a, t = sc.accolade(VGroup(b.bp.piste, bt), "230 €", VERT_OK, DOWN, fs=30)
            l0 = sc.ligne_rep(0, ["200 × 1,15", "= 230 €."])
            l1 = sc.ligne_rep(1, ["B :", "+ 15 € au lieu de 15 % ;"])
            l2 = sc.ligne_rep(2, ["C :", "la hausse seule."])
            sc.montre("200 fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(bt, shift=LEFT * 0.2), rt=0.4)
            sc.montre("égale 230", FadeIn(l0[1], scale=1.3), GrowFromCenter(a), FadeIn(t, scale=1.3), rt=0.4)
            sc.montre("B ajoute", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("15 €", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et C", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("que la hausse", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["200 € augmentent de 15 %.", "On obtient :"],
                            [self.t("230 €", 36), self.t("215 €", 36), self.t("30 €", 36)], 0,
                            ["200 × 1,15 = 230 €.", "B : + 15 € au lieu de 15 % ;", "C : la hausse seule."],
                            mot_q="200 €", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : le taux porte sur le départ ; 1 800 = la hausse seule ─
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        b = barre_pleine(4.6, 0.7, centre=P(-3.7, 0.7))
        ad, td = self.accolade(b.bp.piste, "départ", AMBRE, DOWN, fs=32)
        xl = 0.6
        L1 = self.lc([("Le taux se calcule", WHITE)], 2.05, fs=40, xl=xl)
        self.jouer(L1, ["Le taux"], {0: [FadeIn(b, shift=UP * 0.2)]})
        L1b = self.lc([("sur la valeur de départ", AMBRE)], 1.4, fs=40, xl=xl)
        self.jouer(L1b, ["sur la valeur"], {0: [GrowFromCenter(ad), FadeIn(td, scale=1.2)]})
        bt = bout(b, 1.5)
        ah, th = self.accolade(bt, "1 800", BOUT, UP, fs=30)
        L2 = self.lc([("1 800 :", BOUT), ("la hausse seulement", ROUGE_ERREUR)], 0.35, fs=40, xl=xl)
        self.jouer(L2, ["Et 1 800", "que la hausse"], {0: [FadeIn(bt, shift=LEFT * 0.2), GrowFromCenter(ah),
                                                          FadeIn(th, scale=1.3)]})
        a12, t12 = self.accolade(b.bp.piste, "12 000", WHITE, UP, fs=30)
        L3 = self.lc([("on ajoute", WHITE), ("les 12 000 !", VERT_OK)], -0.6, fs=44, xl=xl)
        self.jouer(L3, ["ajouter", "les 12 000"], {1: [GrowFromCenter(a12), FadeIn(t12, scale=1.3)]})
        self.play(Circumscribe(VGroup(b, bt), color=VERT_OK, buff=0.08), run_time=0.7)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (50 000 habitants, − 2 % → 49 000 : B) ──────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        vi = ville(1.1).move_to(P(-4.8, 2.05))

        def avant(sc):
            sc.play(FadeIn(vi, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            b = barre_pleine(4.2, 0.6, centre=P(-3.9, 0.25))
            trou, m = retire(b, 0.2)
            a, t = sc.accolade(reste(b, 0.2), "49 000", VERT_OK, DOWN, fs=30)
            l0 = sc.ligne_rep(0, ["50 000 × 0,98", "= 49 000."])
            l1 = sc.ligne_rep(1, ["A :", "la baisse seule ;"])
            l2 = sc.ligne_rep(2, ["C :", "− 2 habitants."])
            sc.montre("50 000 fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(b), rt=0.35)
            sc.partir(trou, m, None, 0.25, 0.55)
            sc.montre("égale 49", FadeIn(l0[1], scale=1.3), GrowFromCenter(a), FadeIn(t, scale=1.3), rt=0.4)
            sc.montre("A ne donne", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("que la baisse", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et C", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("2 habitants", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Une ville de 50 000", "habitants perd 2 %.", "Combien en reste-t-il ?"],
                            [self.t("1 000", 34), self.t("49 000", 34), self.t("49 998", 34)], 1,
                            ["50 000 × 0,98 = 49 000.", "A : la baisse seule ;", "C : − 2 habitants."],
                            mot_q="Une ville", avant_q=avant, autres_r=apres)

    # ── 09 : défi : un vélo à 350 € (− 20 %) ; un salaire de 1 800 € (+ 5 %) ─
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        ve = velo(1.1).move_to(P(-5.2, 1.4))
        bi = billet(0.95).move_to(P(-5.2, -0.3))
        xl = -3.7
        L1 = self.lc([("Un vélo à", WHITE), ("350 €", JAUNE_TITRE), ("− 20 %", RETIRE)], 1.4, fs=44, xl=xl)
        self.jouer(L1, ["Un vélo", "350", "20 %"], {0: [FadeIn(ve, shift=RIGHT * 0.2)]})
        L2 = self.lc([("Un salaire de", WHITE), ("1 800 €", JAUNE_TITRE), ("+ 5 %", BOUT)], -0.3, fs=44, xl=xl)
        self.jouer(L2, ["Un salaire", "1 800", "5 %"], {0: [FadeIn(bi, shift=RIGHT * 0.2)]})
        L3 = self.lc([("Les deux valeurs d'arrivée ?", ORANGE_RETENUE)], -1.3, fs=40, xl=xl, droite=5.0)
        self.jouer(L3, ["Calcule"])
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        ve = velo(0.8).move_to(P(-5.7, 1.3))
        bi = billet(0.7).move_to(P(-5.7, -0.7))
        self.add(tit, ve, bi)  # posés d'un coup : la voix commence tout de suite
        for y, a, b_, s, mots in ((1.3, "350 €", "280 €", "× 0,8", ["350 fois", "0,8", "280"]),
                                  (-0.7, "1 800 €", "1 890 €", "× 1,05", ["1 800 fois", "1,05", "1 890"])):
            pa, pb, arr, lab = self.chaine(a, b_, s, y, -3.6, 1.4)
            self.montre(mots[0], FadeIn(pa, shift=RIGHT * 0.2), rt=0.35)
            self.montre(mots[1], GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.4)
            self.montre(mots[2], FadeIn(pb, scale=1.3), rt=0.4)
            self.play(Create(self.cadre(pb)), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        d = sans(boite_prix("départ", WHITE, 36)).move_to(P(-4.6, 1.2))
        a = sans(boite_prix("arrivée", VERT_OK, 36)).move_to(P(-4.6, -1.1))
        fl = Arrow(d.get_bottom(), a.get_top(), buff=0.12, color=AMBRE, stroke_width=7,
                   max_tip_length_to_length_ratio=0.2)
        lab = sans(gras("× coefficient", 30, AMBRE)).next_to(fl, RIGHT, buff=0.15)
        fig = VGroup(d, a, fl, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour appliquer un taux :", "on le traduit en coefficient,"),
            ("puis on multiplie", "la valeur de départ."),
            ("arrivée = départ × coefficient",)], fs=38)
        self.au_mot("Pour appliquer")
        self.montrer_ligne(lignes[0], Indicate(lab, color=WHITE))
        self.au_mot("puis on multiplie")
        self.montrer_ligne(lignes[1], Indicate(d, color=WHITE))
        self.au_mot("Valeur d'arrivée")
        self.montrer_ligne(lignes[2], Circumscribe(a, color=VERT_OK, buff=0.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_methode,
                  self.ecran_baisse, self.ecran_tete, self.ecran_question1, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class PropLyceeEvoValeurFinalePremiere(PropLyceeEvoValeurFinaleBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeEvoValeurFinaleStmg(PropLyceeEvoValeurFinaleBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
