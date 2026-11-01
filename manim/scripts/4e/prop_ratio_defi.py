# prop_ratio_defi.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 32 : DÉFIS SUR LES RATIOS (micro du coach : prop_ratio_defi,
# notion prop_ratio), AVEC VOIX. Paysage 16:9, CEINTURE VERTE. PAYSAGE
# SEULEMENT (les shorts 4e-prop-ratio-short-* existent déjà).
# ⭐ Méthode travaillée : repérer ce que représente le nombre connu (UNE PART,
# L'ÉCART, ou LE TOTAL), en déduire la valeur d'une part, puis tout le reste,
# et vérifier. Ratio écrit « 5 : 3 », dit « 5 pour 3 ». Pas de produit en
# croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : les BARRES DE PARTS (une rangée par grandeur,
# une part = un bloc, la valeur d'une part écrite DEDANS). L'écart = les blocs
# en trop de la rangée la plus longue (cadre orange) ; le total = tous les
# blocs (accolade). Une grandeur garde SA couleur d'un bout à l'autre :
# victoires bleu ciel, défaites rose ; titulaire vert pomme, remplaçant
# lavande ; paniers à 2 points pêche, à 3 points turquoise, lancers francs mauve.
# ⭐ Fil rouge : erreur 1 AJOUTER AU LIEU DE MULTIPLIER / confondre écart,
# part et total (question 1 B : 8 parts = 5 + 3, le total pris pour l'écart ;
# C : 5 parts ; piège 07 : « Défaites = 6 » barré) ; erreur 3 INVERSER / se
# tromper de ligne (question 2 B : 10 min = la valeur d'une part, sans la
# multiplication ; C : ≈ 13 min = 40 ÷ 3, la mauvaise division).
#
# Décor et métier : BASKET, Nathan, ENTRAÎNEUR (son sifflet, sa planchette
# de tactique, le ballon, le panier, le chrono). Fait réel : un match de basket
# dure 40 minutes (4 quart-temps de 10 minutes), Règles officielles de basket
# FIBA 2024, art. 8 (consultées le 01/11/2026). Le reste (victoires, paniers)
# est inventé, plausible.
# Centres d'intérêt : sport (précision : basket).
#
# Écrans : 00 garde · 01 Nathan, trois défis · 02 défi 1 (5 : 3, 6 matchs
# d'écart, total ?) · 03 QUESTION 1 (l'écart en parts) · 04 défi 2 (40 min,
# 5 : 3 → 25 min et 15 min) · 05 QUESTION 2 (40 min, 3 : 1) · 06 défi 3
# (6 : 2 : 3, 4 paniers à 3 points) · 07 le piège (6 = l'écart, pas les
# défaites) · 08 à toi de jouer (7 : 2, 27 matchs) · 08b correction · 09 ce
# que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-ratio-defi.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-ratio-defi/ ; marques mot à mot :
# manim/scripts/4e/prop_ratio_defi_marques.json (scripts/marques_dump.ps1 puis
# le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : base PropRatioQuotientsBase et Parts / deux_rangees de
# prop_ratio_quotients.py (épisode 29, non modifié : montre, titre_haut,
# barrer_choix, la barre de parts) ; sans() de prop_agrandissement_rapport.py.
# Ajouté ICI : trois_rangees(), accolade_total(), nathan(), ballon(),
# panier(), chrono(), trophee().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_ratio_defi.py PropRatioDefi4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio_defi.py PropRatioDefi4e -o eleveai-maths-4e-prop-ratio-defi --media_dir manim/media-prop-4e-32
# Sortie : manim/sorties/4e/maths/proportionnalite/32-ratio-defi/eleveai-maths-4e-prop-ratio-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_q29 = _charger("prop_ratio_quotients_4e", _ICI / "prop_ratio_quotients.py")   # épisode 29 (4e)
PropRatioQuotientsBase, Parts, deux_rangees = _q29.PropRatioQuotientsBase, _q29.Parts, _q29.deux_rangees

VICT = "#7dd3fc"       # les victoires (bleu ciel)
DEFA = "#f9a8d4"       # les défaites (rose)
TITU = "#bef264"       # le titulaire (vert pomme)
REMP = "#c4b5fd"       # le remplaçant (lavande)
P2 = "#fdba74"         # les paniers à 2 points (pêche)
P3 = "#5eead4"         # les paniers à 3 points (turquoise)
LF = "#e9d5ff"         # les lancers francs (mauve clair)
BALLON = "#ea580c"


def trois_rangees(ns, cs, noms_s, x=-3.0, y=1.9, bw=0.8, h=0.6, ecart=0.85, fs_nom=28, fs=26):
    """La barre de parts à trois grandeurs, l'une sous l'autre, calées à gauche
    sur x ; le nom de chaque grandeur à gauche (décor). Renvoie (rangées, noms)."""
    rs, noms = VGroup(), VGroup()
    for i, (n, c, s) in enumerate(zip(ns, cs, noms_s)):
        r = Parts(n, c, bw, h, fs).move_to(P(0, y - i * ecart)).align_to(P(x, 0), LEFT)
        rs.add(r)
        noms.add(sans(Text(s, font_size=fs_nom, color=c, weight=BOLD)).next_to(r, LEFT, buff=0.25))
    return rs, noms


def minutes(r, v, fs=22):
    """Dans chaque bloc de la rangée r : « v » sur « min », CENTRÉS l'un sous
    l'autre (un Text à deux lignes s'aligne à gauche)."""
    out = VGroup()
    for b in r.blocs:
        g = VGroup(Text(str(v), font_size=fs, color=NUIT, weight=BOLD),
                   Text("min", font_size=fs - 2, color=NUIT, weight=BOLD)).arrange(DOWN, buff=0.06).move_to(b)
        if g.height > r.h - 0.08:
            g.scale_to_fit_height(r.h - 0.08)
        out.add(g)
    return out


def accolade_total(mobs, couleur=WHITE):
    """L'accolade à droite des rangées : tous les blocs = le total."""
    return Brace(VGroup(*mobs), RIGHT, buff=0.2, color=couleur)


def nathan(s=1.0):
    """Nathan, entraîneur de basket : maillot orange, sifflet au cou."""
    p = personne(peau="#8d5524", tenue="#c2410c", cheveux="#111827")
    c = p.tete.get_center()
    cordon = VGroup(Line(c + P(-0.25, -0.38), c + P(0, -0.95), color=WHITE, stroke_width=3),
                    Line(c + P(0.25, -0.38), c + P(0, -0.95), color=WHITE, stroke_width=3))
    sifflet = RoundedRectangle(width=0.3, height=0.16, corner_radius=0.06, fill_color="#e5e7eb", fill_opacity=1,
                               stroke_width=0).move_to(c + P(0.08, -1.0))
    num = sans(Text("8", font_size=30, color=WHITE, weight=BOLD)).move_to(p.corps.get_center() + DOWN * 0.15)
    p.add(cordon, sifflet, num)
    return p.scale(s)


def ballon(s=1.0):
    """Un ballon de basket : orange, ses coutures noires."""
    r = 0.5
    b = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#1f2937", stroke_width=3)
    cout = VGroup(Line(P(-r, 0), P(r, 0)), Line(P(0, -r), P(0, r)),
                  Arc(radius=r * 0.85, start_angle=-0.9, angle=1.8).move_to(P(-r * 0.55, 0)),
                  Arc(radius=r * 0.85, start_angle=PI - 0.9, angle=1.8).move_to(P(r * 0.55, 0)))
    cout.set_stroke("#1f2937", 3)
    return VGroup(b, cout).scale(s)


def panier(s=1.0):
    """Le panneau, le cercle orange et le filet."""
    panneau = Rectangle(width=1.6, height=1.05, fill_color=WHITE, fill_opacity=0.15, stroke_color=WHITE,
                        stroke_width=4)
    carre = Rectangle(width=0.6, height=0.42, stroke_color=WHITE, stroke_width=3).move_to(P(0, -0.2))
    cercle = Ellipse(width=0.8, height=0.18, stroke_color=BALLON, stroke_width=6).move_to(P(0, -0.55))
    filet = VGroup(*[Line(P(x, -0.55), P(x * 0.6, -1.15), color="#e5e7eb", stroke_width=2)
                     for x in (-0.38, -0.19, 0, 0.19, 0.38)])
    bas = Line(P(-0.24, -1.15), P(0.24, -1.15), color="#e5e7eb", stroke_width=2)
    return VGroup(panneau, carre, filet, bas, cercle).scale(s)


def chrono(s=1.0):
    """Un chronomètre (sans nombre) : cadran, bouton, aiguille."""
    cad = Circle(radius=0.5, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=5)
    bouton = Rectangle(width=0.16, height=0.14, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.58))
    aig = Line(P(0, 0), P(0.22, 0.28), color=AMBRE, stroke_width=5)
    traits = VGroup(*[Line(P(0.4 * np.cos(a), 0.4 * np.sin(a)), P(0.47 * np.cos(a), 0.47 * np.sin(a)),
                           color=WHITE, stroke_width=3) for a in np.linspace(0, TAU, 12, endpoint=False)])
    return VGroup(cad, traits, bouton, aig).scale(s)


def trophee(s=1.0):
    """Une coupe dorée (les victoires)."""
    coupe = Polygon(P(-0.4, 0.45), P(0.4, 0.45), P(0.25, -0.05), P(-0.25, -0.05), fill_color="#facc15",
                    fill_opacity=1, stroke_width=0)
    anses = VGroup(Arc(radius=0.18, start_angle=PI / 2, angle=PI).move_to(P(-0.45, 0.25)),
                   Arc(radius=0.18, start_angle=-PI / 2, angle=PI).move_to(P(0.45, 0.25))).set_stroke("#facc15", 5)
    pied = VGroup(Rectangle(width=0.1, height=0.25, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, -0.17)),
                  Rectangle(width=0.5, height=0.12, fill_color="#ca8a04", fill_opacity=1, stroke_width=0).move_to(P(0, -0.36)))
    return VGroup(anses, coupe, pied).scale(s)


ECART = ORANGE_RETENUE  # l'écart : les blocs en trop, cadrés en orange


class PropRatioDefiBase(PropRatioQuotientsBase):
    nom_voix = "4e-prop-ratio-defi"
    fichier_marques = "prop_ratio_defi_marques.json"

    def vd(self, n1=5, n2=3, x=-3.6, y=1.0, bw=1.0, ecart=0.9, fs_nom=32, fs=28):
        """La barre victoires (bleu ciel) / défaites (rose)."""
        return deux_rangees(n1, VICT, "Victoires", n2, DEFA, "Défaites", x=x, y=y, bw=bw, ecart=ecart,
                            fs_nom=fs_nom, fs=fs)

    @staticmethod
    def _au_mot_seul(anims):
        """Les textes posés ici attendent SEULEMENT leur mot (au_mot) : la synchro
        par jetons ne les retient pas jusqu'à une redite (« 2 », « matchs ») ;
        l'audit des nombres (AUDIT-AVANCE) les contrôle toujours."""
        for a in anims:
            m = getattr(a, "mobject", None)
            if m is not None:
                for f in m.get_family():
                    if isinstance(f, Text):
                        f.sans_synchro = True

    def montre(self, mot, *anims, rt=0.4):
        self._au_mot_seul(anims)
        super().montre(mot, *anims, rt=rt)

    def jouer(self, lg, mots, extra=None, rt=0.3):
        self._au_mot_seul([FadeIn(lg)] + [a for v in (extra or {}).values() for a in v])
        super().jouer(lg, mots, extra=extra, rt=rt)

    def cadre_ecart(self, r1, k=3):
        """Le cadre orange des blocs en trop (de k à la fin) : l'écart."""
        return SurroundingRectangle(VGroup(*r1.blocs[k:]), color=ECART, buff=0.07, stroke_width=6)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les ratios", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        r1, r2, noms = self.vd(x=-1.6, y=0.85, bw=0.8, ecart=0.8, fs_nom=30)
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in [*r1.blocs, *r2.blocs]], lag_ratio=0.08),
                  FadeIn(noms), run_time=0.8)
        self.au_mot("L'équipe")
        deco = ballon(0.9).move_to(P(-5.2, 0.45))
        pan = panier(0.9).move_to(P(5.0, 0.75))
        self.play(FadeIn(deco, scale=0.7), FadeIn(pan, shift=LEFT * 0.2), run_time=0.4)
        nom = self.t("L'équipe de Nathan", 34, AMBRE).next_to(VGroup(r1, r2), DOWN, buff=0.35)
        self.play(FadeIn(nom, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nathan, entraîneur ; trois défis ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = nathan(1.0).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Nathan")
        nom = self.t("Nathan", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = VGroup(self.t("entraîneur", 30, BLEU_CALCUL), self.t("de basket", 30, BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        met.next_to(pers, DOWN, buff=0.15)
        pan = panier(0.8).move_to(P(-2.4, 2.4))
        self.montre("basket", FadeIn(met, shift=DOWN * 0.1), FadeIn(pan, shift=DOWN * 0.2), rt=0.45)
        self.montre("Il aime", FadeIn(self.t("Il aime les chiffres :", 36, WHITE).move_to(P(1.4, 2.6)),
                                      shift=UP * 0.15), rt=0.4)
        cartes = []
        for (dessin, s, c, x, mot) in ((trophee(1.1), "Victoires", VICT, -1.4, "victoires"),
                                       (ballon(0.95), "Paniers", P2, 1.5, "paniers"),
                                       (chrono(0.95), "Minutes de jeu", TITU, 4.4, "minutes de jeu")):
            dessin.move_to(P(x, 1.1))
            lab = self.t(s, 30, c).next_to(dessin, DOWN, buff=0.25)
            cartes.append(VGroup(dessin, lab))
            self.montre(mot, FadeIn(dessin, scale=0.6), FadeIn(lab, shift=UP * 0.1), rt=0.4)
        defis = VGroup(*[sans(self.tampon(f"Défi {k}", AMBRE, 32)) for k in (1, 2, 3)]).arrange(RIGHT, buff=0.6)
        defis.move_to(P(1.5, -1.6))
        self.au_mot("Trois défis")
        self.play(LaggedStart(*[FadeIn(d, scale=1.3) for d in defis], lag_ratio=0.25), run_time=0.9)
        self.montre("cette saison", Circumscribe(defis, color=AMBRE, buff=0.15), rt=0.9)
        self.attendre_voix()

    # ── 02 : défi 1 : 5 : 3, 6 matchs d'écart → combien de matchs ? ─────────
    def ecran_defi1(self):
        self.ecran("02-defi1")
        self.titre_haut("Défi 1", "Défi 1", fs=46)
        rat = self.ligne([("Victoires : défaites =", WHITE), ("5 :", AMBRE), ("3", AMBRE)], 42).move_to(P(-0.4, 2.3))
        sans(rat[0])
        r1, r2, noms = self.vd()
        dit = self.ligne([("« 5 pour", AMBRE), ("3 »", AMBRE)], 32).move_to(P(3.4, 1.0))
        self.montre("Le ratio", FadeIn(rat[0], shift=RIGHT * 0.2), rt=0.4)
        self.montre("victoires pour", FadeIn(noms[0]), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in r1.blocs],
                                                                      lag_ratio=0.12), rt=0.5)
        self.montre("pour défaites", FadeIn(noms[1]), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in r2.blocs],
                                                                     lag_ratio=0.12), rt=0.4)
        self.montre("5 pour", FadeIn(rat[1], scale=1.3), FadeIn(dit[0], shift=LEFT * 0.15),
                    Indicate(r1.blocs, color=AMBRE, scale_factor=1.05), rt=0.25)
        self.montre("3. L'équipe", FadeIn(rat[2], scale=1.3), FadeIn(dit[1], shift=LEFT * 0.15),
                    Indicate(r2.blocs, color=AMBRE, scale_factor=1.05), rt=0.45)
        ec = self.cadre_ecart(r1)
        lab = self.t("6 matchs\nde plus", 28, ECART).next_to(r2, RIGHT, buff=0.3)
        self.montre("6 matchs", Create(ec), FadeIn(lab, scale=1.2), rt=0.5)
        self.montre("de plus", Indicate(lab, color=ECART, scale_factor=1.15), rt=0.6)
        tot = self.ligne([("Matchs joués :", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 40).move_to(P(-0.8, -1.3))
        acc = Brace(VGroup(r1, r2), DOWN, buff=0.15, color=WHITE)
        self.montre("Combien de matchs", GrowFromCenter(acc), FadeIn(tot, scale=1.2), rt=0.5)
        self.play(Circumscribe(tot, color=AMBRE, buff=0.12), run_time=0.8)
        deco = ballon(0.8).move_to(P(-5.4, -1.9))
        self.play(FadeIn(deco, scale=0.6), run_time=0.3)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (6 matchs d'écart = combien de parts ?) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        r1, r2, noms = self.vd(x=-4.4, y=1.6, bw=0.85, ecart=0.85, fs_nom=28, fs=26)
        rat = sans(self.ligne([("5 :", AMBRE), ("3", AMBRE)], 36)).next_to(VGroup(r1, r2), UP, buff=0.3).align_to(r1, LEFT)
        ec = self.cadre_ecart(r1)
        lab = sans(self.t("6 matchs", 26, ECART)).next_to(r2, RIGHT, buff=0.3)

        def avant(sc):
            sc.play(FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    FadeIn(rat), Create(ec), FadeIn(lab), run_time=0.45)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["5 −", "3 =", "2 parts", "= 6 matchs."])
            l1 = sc.ligne_rep(1, ["1 part =", "3 matchs."])
            l2 = sc.ligne_rep(2, ["15 +", "9 =", "24 matchs."])
            xg = -6.2
            cv = sc.ligne([("Victoires : 5 ×", VICT), ("3 =", VICT), ("15", VICT)], 30).move_to(P(0, -0.35)).align_to(P(xg, 0), LEFT)
            cd = sc.ligne([("Défaites : 3 ×", DEFA), ("3 =", DEFA), ("9", DEFA)], 30).move_to(P(0, -1.1)).align_to(P(xg, 0), LEFT)
            sc.montre("5 parts moins", FadeIn(l0[0], shift=UP * 0.15), Indicate(ec, color=ECART, scale_factor=1.05), rt=0.35)
            sc.montre("3 parts", FadeIn(l0[1], shift=UP * 0.15), rt=0.3)
            sc.montre("2 parts", FadeIn(l0[2], scale=1.3), rt=0.35)
            sc.montre("6 matchs", FadeIn(l0[3], shift=UP * 0.15), Indicate(lab, color=ECART, scale_factor=1.2), rt=0.35)
            sc.montre("1 part vaut", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("3 matchs. Vic", FadeIn(l1[1], scale=1.3), FadeIn(r1.textes("3"), scale=1.3),
                      FadeIn(r2.textes("3"), scale=1.3), rt=0.4)
            sc.montre("5 fois 3", FadeIn(cv[0], shift=RIGHT * 0.15), rt=0.25)
            sc.montre("3, égale 15", FadeIn(cv[1], shift=RIGHT * 0.15), rt=0.25)
            sc.montre("15. Défaites", FadeIn(cv[2], scale=1.3), rt=0.3)
            sc.montre("3 fois 3", FadeIn(cd[0], shift=RIGHT * 0.15), rt=0.25)
            sc.montre("3, égale 9", FadeIn(cd[1], shift=RIGHT * 0.15), rt=0.25)
            sc.montre("9. 15", FadeIn(cd[2], scale=1.3), rt=0.3)
            sc.montre("15 plus", FadeIn(l2[0], shift=UP * 0.15), rt=0.3)
            sc.montre("9, égale 24", FadeIn(l2[1], shift=UP * 0.15), rt=0.25)
            sc.montre("24 matchs", FadeIn(l2[2], scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse",
                            ["Les 6 matchs d'écart :", "combien de parts ?"],
                            [self.t("2 parts", 34), self.t("8 parts", 34), self.t("5 parts", 34)], 0,
                            ["5 − 3 = 2 parts = 6 matchs.", "1 part = 3 matchs.", "15 + 9 = 24 matchs."],
                            mot_q="Les 6 matchs", avant_q=avant, autres_r=apres)

    # ── 04 : défi 2 : 40 min partagées 5 : 3 ────────────────────────────────
    def tr(self, n1=5, n2=3, x=-3.4, y=1.15, bw=1.0, ecart=0.95, fs_nom=30, fs=22, h=0.8):
        """La barre titulaire (vert pomme) / remplaçant (lavande)."""
        return deux_rangees(n1, TITU, "Titulaire", n2, REMP, "Remplaçant", x=x, y=y, bw=bw, h=h, ecart=ecart,
                            fs_nom=fs_nom, fs=fs)

    def ecran_defi2(self):
        self.ecran("04-defi2")
        self.titre_haut("Défi 2 : le temps de jeu", "Défi 2", fs=44)
        ch = chrono(0.65).move_to(P(-5.6, 2.05))
        m40 = self.ligne([("1 match =", WHITE), ("40 min", TITU)], 36).next_to(ch, RIGHT, buff=0.3)
        sans(m40[0])
        fiba = self.t("(règles FIBA)", 26, GREY_B).next_to(m40, RIGHT, buff=0.25)
        self.montre("Un match", FadeIn(ch, scale=0.6), FadeIn(m40[0], shift=RIGHT * 0.15), rt=0.4)
        self.montre("40 minutes", FadeIn(m40[1], scale=1.3), rt=0.4)
        self.montre("FIBA", FadeIn(fiba, shift=LEFT * 0.15), rt=0.35)
        r1, r2, noms = self.tr()
        self.montre("deux joueurs", FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    rt=0.5)
        rat = self.ligne([("5 :", AMBRE), ("3", AMBRE), ("« 5 pour", AMBRE), ("3 »", AMBRE)], 34).move_to(P(4.3, 2.05))
        self.montre("5 pour 3", FadeIn(rat[0], scale=1.3), FadeIn(rat[2]), Indicate(r1.blocs, color=AMBRE, scale_factor=1.04), rt=0.25)
        self.montre("3. 5 plus", FadeIn(rat[1], scale=1.3), FadeIn(rat[3]), Indicate(r2.blocs, color=AMBRE, scale_factor=1.04), rt=0.4)
        xl, fs = -1.6, 38
        l1 = self.lc([("5 +", WHITE), ("3 =", WHITE), ("8 parts", VERT_OK)], -0.75, fs=fs, x=xl)
        self.jouer(l1, ["5 plus", "3, égale 8", "8 parts"], extra={2: [Indicate(VGroup(r1.blocs, r2.blocs), color=AMBRE, scale_factor=1.03)]})
        l2 = self.lc([("40 ÷", WHITE), ("8 =", WHITE), ("5 min", VERT_OK)], -1.55, fs=fs, x=xl)
        part = self.tampon("une part = 5 min", VERT_OK, 30).move_to(P(4.0, -1.55))
        self.jouer(l2, ["40 divisé", "8, égale 5", "5 minutes"],
                   extra={2: [FadeIn(minutes(r1, 5), scale=1.3), FadeIn(minutes(r2, 5), scale=1.3),
                              FadeIn(part, scale=1.3)]})
        self.montre("par part", Indicate(part, color=VERT_OK, scale_factor=1.08), rt=0.4)
        l3 = self.lc([("Titulaire :", TITU), ("5 ×", WHITE), ("5 =", WHITE), ("25 min", VERT_OK)], -2.35, fs=fs, x=xl)
        t25 = self.t("25 min", 34, TITU).next_to(r1, RIGHT, buff=0.3)
        self.jouer(l3, ["Le titulaire", "5 fois 5", "5, égale 25", "25 minutes"], extra={3: [FadeIn(t25, scale=1.3)]})
        l4 = self.lc([("Remplaçant :", REMP), ("3 ×", WHITE), ("5 =", WHITE), ("15 min", VERT_OK)], -3.15, fs=fs, x=xl)
        t15 = self.t("15 min", 34, REMP).next_to(r2, RIGHT, buff=0.3)
        self.jouer(l4, ["Le remplaçant", "3 fois 5", "5, égale 15", "15 minutes"], extra={3: [FadeIn(t15, scale=1.3)]})
        self.play(Circumscribe(VGroup(t25, t15), color=VERT_OK, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 05 : QUESTION 2 (40 min, ratio 3 : 1, titulaire ?) ──────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        r1, r2, noms = self.tr(3, 1, x=-3.7, y=1.6, bw=1.15, ecart=0.95, fs_nom=28, fs=22)
        ch = chrono(0.7).move_to(P(-3.0, -1.2))

        def avant(sc):
            sc.play(FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    FadeIn(ch, scale=0.7), run_time=0.45)

        def apres(sc):
            sc.play(FadeOut(ch), run_time=0.3)
            l0 = sc.ligne_rep(0, ["3 +", "1 =", "4 parts."])
            l1 = sc.ligne_rep(1, ["40 ÷", "4 =", "10 min."])
            l2 = sc.ligne_rep(2, ["Titulaire : 3 ×", "10 =", "30 min."])
            t30 = sc.t("30 min", 32, TITU).next_to(r1, DOWN, buff=1.25).align_to(r1, LEFT)
            sc.montre("3 plus", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("1, égale", FadeIn(l0[1], shift=UP * 0.15), rt=0.25)
            sc.montre("4 parts", FadeIn(l0[2], scale=1.3), Indicate(VGroup(r1.blocs, r2.blocs), color=AMBRE, scale_factor=1.03), rt=0.35)
            sc.montre("40 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("4, égale 10", FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("10 minutes", FadeIn(l1[2], scale=1.3), FadeIn(minutes(r1, 10), scale=1.3),
                      FadeIn(minutes(r2, 10), scale=1.3), rt=0.4)
            sc.montre("3 fois", FadeIn(l2[0], shift=UP * 0.15), Indicate(r1.blocs, color=AMBRE, scale_factor=1.04), rt=0.25)
            sc.montre("10, égale 30", FadeIn(l2[1], shift=UP * 0.15), rt=0.3)
            sc.montre("30 minutes", FadeIn(l2[2], scale=1.3), FadeIn(t30, scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["40 min, ratio 3 : 1.", "Titulaire : ? min"],
                            [self.t("30 min", 34), self.t("10 min", 34), self.t("≈ 13 min", 34)], 0,
                            ["3 + 1 = 4 parts.", "40 ÷ 4 = 10 min.", "Titulaire : 3 × 10 = 30 min."],
                            mot_q="40 minutes", avant_q=avant, autres_r=apres)

    # ── 06 : défi 3 : paniers 6 : 2 : 3, 4 paniers à 3 points ───────────────
    def ecran_defi3(self):
        self.ecran("06-defi3")
        self.titre_haut("Défi 3 : les paniers", "Défi 3", fs=44)
        rs, noms = trois_rangees((6, 2, 3), (P2, P3, LF), ("2 points", "3 points", "Lancers francs"))
        for i, mot in enumerate(("2 points, paniers", "3 points et", "lancers francs")):
            self.montre(mot, FadeIn(noms[i]), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in rs[i].blocs],
                                                         lag_ratio=0.1), rt=0.45)
        rat = self.ligne([("6 :", AMBRE), ("2 :", AMBRE), ("3", AMBRE)], 42).move_to(P(4.3, 1.1))
        dit = self.ligne([("« 6 pour", AMBRE), ("2 pour", AMBRE), ("3 »", AMBRE)], 30).next_to(rat, DOWN, buff=0.3)
        for k, mot in enumerate(("6 pour 2", "2 pour 3", "3. Le meneur")):
            self.montre(mot, FadeIn(rat[k], scale=1.3), FadeIn(dit[k], shift=LEFT * 0.1),
                        Indicate(rs[k].blocs, color=AMBRE, scale_factor=1.04), rt=0.25)
        bal = ballon(0.55).next_to(rs[1], RIGHT, buff=0.3)
        q4 = self.t("4 paniers", 32, P3).next_to(bal, RIGHT, buff=0.2)
        self.montre("Le meneur", FadeIn(bal, scale=0.6), rt=0.35)
        self.montre("4 paniers", FadeIn(q4, scale=1.3), rt=0.4)
        xl, fs = -1.4, 36
        l1 = self.lc([("4 ÷", WHITE), ("2 =", WHITE), ("2 paniers", VERT_OK)], -0.75, fs=fs, x=xl)
        self.jouer(l1, ["4 divisé", "2, égale 2", "2 : une"], extra={1: [Indicate(rs[1].blocs, color=AMBRE, scale_factor=1.05)],
                                                                 2: [FadeIn(rs[1].textes("2"), scale=1.3)]})
        part = self.tampon("une part = 2", VERT_OK, 30).move_to(P(4.3, -0.75))
        self.montre("2. Paniers", FadeIn(part, scale=1.3), FadeIn(rs[0].textes("2"), scale=1.3),
                    FadeIn(rs[2].textes("2"), scale=1.3), rt=0.45)
        l2 = self.lc([("2 points :", P2), ("6 ×", WHITE), ("2 =", WHITE), ("12 paniers", VERT_OK)], -1.65, fs=fs, x=xl)
        t12 = self.t("12", 32, P2).next_to(rs[0], RIGHT, buff=0.3)
        self.jouer(l2, ["2 points : 6", "6 fois 2", "2, égale 12", "12. Lancers"], extra={3: [FadeIn(t12, scale=1.3)]})
        l3 = self.lc([("Lancers francs :", LF), ("3 ×", WHITE), ("2 =", WHITE), ("6 lancers", VERT_OK)], -2.55, fs=fs, x=xl)
        t6 = self.t("6", 32, LF).next_to(rs[2], RIGHT, buff=0.3)
        self.jouer(l3, ["Lancers francs", "3 fois 2", "2, égale 6", "6."], extra={3: [FadeIn(t6, scale=1.3)]})
        self.play(Circumscribe(VGroup(l2[3], l3[3]), color=VERT_OK, buff=0.1), run_time=0.8)
        self.attendre_voix()

    # ── 07 : le piège : 6 = l'écart, pas les défaites ───────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        r1, r2, noms = self.vd(x=-3.6, y=2.0, ecart=0.9)
        d1 = sans(self.t("Défi 1", 30, AMBRE)).next_to(r1, RIGHT, buff=0.4)
        self.montre("1, 6", FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    FadeIn(d1), rt=0.45)
        faux = self.ligne([("Défaites =", DEFA), ("6 matchs", ROUGE_P)], 38).move_to(P(-2.4, -0.45))
        sans(faux[0])
        self.montre("6 n'est pas", FadeIn(faux[1], scale=1.2), rt=0.35)
        self.montre("nombre de défaites", FadeIn(faux[0], shift=RIGHT * 0.15),
                    Indicate(r2.blocs, color=ROUGE_P, scale_factor=1.04), rt=0.4)
        self.play(Create(croix(faux, sw=7)), run_time=0.4)
        ec = self.cadre_ecart(r1)
        bon = self.ligne([("→ c'est", VERT_OK), ("l'écart !", ECART)], 38).next_to(faux, RIGHT, buff=0.9)
        self.montre("c'est l'écart", Create(ec), FadeIn(bon, scale=1.2), rt=0.5)
        self.insister(bon, 1.12, 0.2)
        dem = self.t("Avant de calculer, on se demande :", 34, WHITE).move_to(P(-1.6, -1.4))
        self.montre("Avant de calculer", FadeIn(dem, shift=UP * 0.15), rt=0.4)
        tps = VGroup(self.tampon("une part ?", AMBRE, 32), self.tampon("l'écart ?", ECART, 32),
                     self.tampon("le total ?", BLEU_CALCUL, 32)).arrange(RIGHT, buff=0.6).move_to(P(-0.6, -2.5))
        lab = self.t("Ce nombre :", 32, WHITE).next_to(dem, RIGHT, buff=0.35)
        self.montre("ce nombre", FadeIn(lab, shift=RIGHT * 0.15), rt=0.35)
        tot = Brace(VGroup(r1, r2), DOWN, buff=0.1, color=BLEU_CALCUL)
        self.montre("une part", FadeIn(tps[0], scale=1.3), Circumscribe(r1.blocs[0], color=AMBRE, buff=0.05), rt=0.6)
        self.montre("l'écart, ou", FadeIn(tps[1], scale=1.3), Indicate(ec, color=ECART, scale_factor=1.05), rt=0.5)
        self.montre("le total", FadeIn(tps[2], scale=1.3), GrowFromCenter(tot), rt=0.5)
        self.attendre_voix()

    # ── 08 : à toi de jouer : 7 : 2, 27 matchs → victoires ? ────────────────
    def barre_defi(self):
        r1, r2, noms = self.vd(7, 2, x=-3.9, y=1.3, bw=0.75, ecart=0.85, fs=26)
        acc = accolade_total([r1, r2])
        m27 = self.t("27 matchs", 34, WHITE).next_to(acc, RIGHT, buff=0.2)
        qv = self.ligne([("Victoires :", VICT), ("? matchs", ORANGE_RETENUE)], 36).move_to(P(-0.6, -0.45))
        sans(qv[0])
        trous = r1.textes("?", couleur=TROU_TXT)
        return r1, r2, noms, acc, m27, qv, trous

    def rat_defi(self):
        rat = self.ligne([("Victoires : défaites =", WHITE), ("7 :", AMBRE), ("2", AMBRE)], 40).move_to(P(-1.6, 2.3))
        dit = self.ligne([("« 7 pour", AMBRE), ("2 »", AMBRE)], 32).next_to(rat, RIGHT, buff=0.4)
        sans(rat[0])
        return rat, dit

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        r1, r2, noms, acc, m27, qv, trous = self.barre_defi()
        rat, dit = self.rat_defi()
        self.montre("ratio victoires", FadeIn(rat[0], shift=RIGHT * 0.2), FadeIn(noms), rt=0.4)
        self.montre("7 pour", FadeIn(rat[1], scale=1.3), FadeIn(dit[0]), FadeIn(r1.blocs, shift=RIGHT * 0.2), rt=0.25)
        self.montre("2. Elle", FadeIn(rat[2], scale=1.3), FadeIn(dit[1]), FadeIn(r2.blocs, shift=RIGHT * 0.2), rt=0.4)
        self.montre("27 matchs", GrowFromCenter(acc), FadeIn(m27, scale=1.2), rt=0.45)
        self.montre("Combien de victoires", FadeIn(qv, scale=1.2), FadeIn(trous, scale=1.3), rt=0.4)
        self.play(Circumscribe(qv, color=AMBRE, buff=0.12), run_time=0.8)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        r1, r2, noms, acc, m27, qv, trous = self.barre_defi()
        rat, dit = self.rat_defi()
        self.add(sans(rat), sans(dit), noms, r1, r2, acc, sans(m27), sans(qv), trous)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.play(Write(tit), run_time=0.5)
        xl = -1.0
        l1 = self.lc([("7 +", WHITE), ("2 =", WHITE), ("9 parts", VERT_OK)], -1.3, fs=40, x=xl)
        self.jouer(l1, ["7 plus", "2, égale 9", "9 parts"], extra={2: [Indicate(VGroup(r1.blocs, r2.blocs), color=AMBRE, scale_factor=1.03)]})
        l2 = self.lc([("27 ÷", WHITE), ("9 =", WHITE), ("3 matchs", VERT_OK)], -2.15, fs=40, x=xl)
        self.jouer(l2, ["27 divisé", "9, égale 3", "3 matchs"],
                   extra={2: [FadeOut(trous), FadeIn(r1.textes("3"), scale=1.3), FadeIn(r2.textes("3"), scale=1.3)]})
        l3 = self.lc([("Victoires :", VICT), ("7 ×", WHITE), ("3 =", WHITE), ("21 matchs", VERT_OK)], -3.0, fs=40, x=xl)
        v21 = self.ligne([("Victoires :", VICT), ("21 matchs", VERT_OK)], 36).move_to(qv).align_to(qv, LEFT)
        sans(v21[0])
        self.jouer(l3, ["Victoires : 7", "7 fois 3", "3, égale 21", "21."], extra={3: [FadeOut(qv), FadeIn(v21, scale=1.2)]})
        self.insister(l3[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        r1, r2, noms = self.vd(x=-4.6, y=0.45, bw=0.6, ecart=0.8, fs_nom=28, fs=24)
        fig = VGroup(noms, r1, r2, sans(r1.textes("3")), sans(r2.textes("3")), self.cadre_ecart(r1))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On repère ce que représente", "le nombre connu :", "une part, l'écart", "ou le total."),
            ("On en déduit la valeur", "d'une part,", "puis tout le reste."),
            ("On vérifie à la fin.",)], fs=36)
        self.au_mot("on repère")
        self.montrer_ligne(lignes[0])
        self.au_mot("On en déduit")
        self.montrer_ligne(lignes[1], Circumscribe(r1.blocs[0], color=VERT_OK, buff=0.05))
        self.au_mot("on vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_defi1()
        self.ecran_question1()
        self.ecran_defi2()
        self.ecran_question2()
        self.ecran_defi3()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropRatioDefi4e(PropRatioDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
