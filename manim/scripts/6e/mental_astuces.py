# mental_astuces.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 05 : LES ASTUCES DU CALCUL MENTAL
# (micro entier_strategie_mentale, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/mental-astuces.js).
# Décor et métier : Jade, CHEFFE CUISINIÈRE (centre : cuisine).
# Micro → écrans : regarder les nombres (01), le double (02), le quart = la moitié de la moitié
# (03, question 04), regrouper pour faire 100 (05), arrondir puis corriger (06), le piège de
# l'oubli (07, question 08), défi (09), appris (10).
# Voix : manim/voix/6e-mental-astuces.json (Julie, débit −6) ; marques : mental_astuces_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_astuces.py MentalAstuces6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_astuces.py MentalAstuces6e -o eleveai-maths-6e-mental-astuces --media_dir manim/scripts/6e/media-men-05
# Sortie : manim/sorties/6e/maths/calcul-mental/05-astuces/eleveai-maths-6e-mental-astuces.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

FARINE_C = "#e9d8a6"
FRAISE = "#ef4444"
PATE_T = "#d6a76c"
ETIQ = "#fde68a"
MOINS_ = "−"


# ── Les dessins de l'épisode ──────────────────────────────────────────────────
def toque_chef(p):
    """Une toque blanche sur la tête du personnage p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + UP * r * 0.95)
    bouffe = VGroup(*[Circle(radius=r * 0.48, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(c + UP * r * 1.55 + RIGHT * x * r) for x in (-0.5, 0, 0.5)])
    return VGroup(bouffe, bande)


def jade(s=1.0):
    """Jade, cheffe cuisinière : veste blanche à boutons, foulard et tablier rouges, toque."""
    p = visage(personne(peau="#e0ac69", tenue="#f8fafc", cheveux="#1f2937", longs=True, s=s))
    c = p.corps
    tablier = RoundedRectangle(width=0.95 * s, height=0.95 * s, corner_radius=0.08 * s, fill_color="#dc2626",
                               fill_opacity=1, stroke_width=0).move_to(c.get_bottom() + UP * 0.5 * s)
    foulard = Polygon(*[c.get_top() + P(x * s, y * s) for x, y in ((-0.3, 0.02), (0.3, 0.02), (0, -0.32))],
                      fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    boutons = VGroup(*[Dot(radius=0.04 * s, color="#94a3b8").move_to(c.get_center() + P(x * s, y * s))
                       for x in (-0.14, 0.14) for y in (0.45, 0.22)])
    p.add(tablier, foulard, boutons, toque_chef(p))
    return p


def casserole(s=1.0):
    """Une casserole qui fume ; .vapeur : les trois volutes."""
    cuve = RoundedRectangle(width=1.7 * s, height=0.95 * s, corner_radius=0.12 * s, fill_color="#94a3b8",
                            fill_opacity=1, stroke_color="#475569", stroke_width=4)
    bord = Line(cuve.get_corner(UL) + LEFT * 0.08 * s, cuve.get_corner(UR) + RIGHT * 0.08 * s, color="#cbd5e1",
                stroke_width=9 * s)
    manche = Line(cuve.get_right() + UP * 0.25 * s, cuve.get_right() + P(1.0 * s, 0.4 * s), color="#1f2937",
                  stroke_width=12 * s)
    vapeur = VGroup(*[FunctionGraph(lambda y: 0.09 * np.sin(6 * y), x_range=[0, 0.9 * s], color="#e5e7eb",
                                    stroke_width=5).rotate(PI / 2).move_to(cuve.get_top() + P(x * s, 0.6 * s))
                      for x in (-0.45, 0, 0.45)]).set_stroke(opacity=0.7)
    g = VGroup(cuve, bord, manche, vapeur)
    g.vapeur = vapeur
    return g


def loupe(s=1.0):
    verre = Circle(radius=0.38 * s, stroke_color="#e5e7eb", stroke_width=7, fill_color="#93c5fd", fill_opacity=0.18)
    manche = Line(verre.get_center() + P(0.27 * s, -0.27 * s), verre.get_center() + P(0.75 * s, -0.75 * s),
                  color="#b45309", stroke_width=14 * s)
    return VGroup(manche, verre)


def assiette(r=0.32):
    return VGroup(Ellipse(width=2 * r, height=r * 1.1, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                          stroke_width=2),
                  Ellipse(width=1.2 * r, height=r * 0.62, stroke_color="#cbd5e1", stroke_width=2))


def barre(txt, w, h=0.75, couleur=FARINE_C, fs=34, coul_txt="#1f2937"):
    """Une barre (le modèle en barres) et son nombre au milieu ; .texte."""
    r = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color="#78350f", stroke_width=3)
    t = Text(txt, font_size=fs, color=coul_txt, weight=BOLD).move_to(r)
    g = VGroup(r, t)
    g.texte = t
    return g


def fraise(r=0.14):
    corps = Circle(radius=r, fill_color=FRAISE, fill_opacity=1, stroke_width=0)
    feuille = Polygon(P(-r * 0.7, r * 0.8), P(r * 0.7, r * 0.8), P(0, r * 0.25), fill_color="#22c55e",
                      fill_opacity=1, stroke_width=0)
    return VGroup(corps, feuille)


def tartelette(w=1.6):
    pate = Ellipse(width=w, height=w * 0.42, fill_color=PATE_T, fill_opacity=1, stroke_color="#7c4a1e", stroke_width=3)
    creme = Ellipse(width=w * 0.8, height=w * 0.28, fill_color="#fef3c7", fill_opacity=1, stroke_width=0)
    return VGroup(pate, creme)


def etiquette(txt, s=1.0, couleur=ETIQ):
    """L'étiquette de prix (forme de flèche, trou à gauche) ; .texte : le prix."""
    w, h = 2.1 * s, 0.85 * s
    corps = Polygon(P(-w / 2 + 0.32 * s, h / 2), P(w / 2, h / 2), P(w / 2, -h / 2), P(-w / 2 + 0.32 * s, -h / 2),
                    P(-w / 2, 0), fill_color=couleur, fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    trou = Circle(radius=0.07 * s, fill_color="#0b1220", fill_opacity=1, stroke_width=0).move_to(P(-w / 2 + 0.3 * s, 0))
    t = Text(txt, font_size=int(40 * s), color="#1f2937", weight=BOLD).move_to(P(0.24 * s, 0))
    g = VGroup(corps, trou, t)
    g.texte = t
    return g


def panier(s=1.0):
    corps = Polygon(P(-0.75 * s, 0.3 * s), P(0.75 * s, 0.3 * s), P(0.55 * s, -0.5 * s), P(-0.55 * s, -0.5 * s),
                    fill_color="#b45309", fill_opacity=1, stroke_color="#78350f", stroke_width=3)
    tresse = VGroup(*[Line(P(x * s, 0.3 * s), P(x * 0.75 * s, -0.5 * s), color="#78350f", stroke_width=3)
                      for x in (-0.4, 0, 0.4)])
    anse = Arc(radius=0.6 * s, start_angle=0.15, angle=PI - 0.3, color="#78350f", stroke_width=7).move_to(P(0, 0.62 * s))
    legumes = VGroup(Circle(radius=0.2 * s, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(-0.3 * s, 0.38 * s)),
                     Circle(radius=0.17 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(P(0.05 * s, 0.42 * s)),
                     Circle(radius=0.19 * s, fill_color="#f59e0b", fill_opacity=1, stroke_width=0).move_to(P(0.36 * s, 0.38 * s)))
    return VGroup(anse, legumes, corps, tresse)


class BondsPlaces(Bonds):
    """La droite des bonds à pas inégaux (pas à l'échelle) : places = {valeur: 0 → 1}."""

    def __init__(self, places, x0=-6.0, x1=0.0, y=0.0, fs=36, h=0.6):
        super().__init__(0, 1, x0=x0, x1=x1, y=y, fs=fs, h=h)
        self.places = places

    def x(self, v):
        return self.x0 + self.places[v] * (self.x1 - self.x0)


class MentalAstucesBase(PaysageMental):
    nom_voix = "6e-mental-astuces"
    fichier_marques = "mental_astuces_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """La ligne de morceaux, chaque morceau calé sur la MÊME ligne de base (un « g »
        ou un « J » ne fait plus descendre ses voisins)."""
        lg = super().ligne(morceaux, fs, buff=buff)
        desc = set("gjpqyçJQ,;()")

        def base(t):
            if not isinstance(t, Text):
                return None
            cs = [c for c in t.original_text if not c.isspace()]
            if len(cs) != len(t.submobjects):
                return None
            bs = [m.get_bottom()[1] for c, m in zip(cs, t.submobjects) if c.isalnum() and c not in desc]
            return min(bs) if bs else None

        bases = [base(t) for t in lg]
        ref = next((b for b in bases if b is not None), None)
        if ref is not None:
            for t, b in zip(lg, bases):
                if b is not None:
                    t.shift(UP * (ref - b))
        # « 28 : 14 » : l'espace française avant les deux-points d'un morceau qui commence par « : »
        dx = 0.0
        for t in lg:
            if isinstance(t, Text) and t.original_text.startswith(":"):
                dx += 0.1 * fs / 38
            t.shift(RIGHT * dx)
        return lg

    def au_temps(self, t):
        """Attend l'instant t (s) de la voix en cours : pour un mot sans marque propre
        (« et 75 », « plus 250 »), calé sur l'énergie réelle du WAV."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def pas(self, morceaux, y, couleurs=None, gestes=None, fs=38, xl=-5.6):
        """Une ligne posée morceau par morceau, chacun à son mot (etapes sans droite)."""
        return self.etapes(None, morceaux, y, fs=fs, xl=xl, gestes=gestes, couleurs=couleurs)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les astuces du calcul mental", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les astuces")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment calculer", "en 2 secondes ?"], 40).move_to(P(-3.0, 0.45))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("99 plus")
        calc = self.ligne([("99 +", JAUNE_TITRE), ("47 = ?", JAUNE_TITRE)], 72, buff=0.42).move_to(P(3.3, 0.45))
        self.play(FadeIn(calc[0], scale=1.3), run_time=0.3)
        self.au_mot("47 en")
        self.play(FadeIn(calc[1], scale=1.3), run_time=0.3)
        self.au_mot("en 2 secondes")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, cheffe cuisinière ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        jd = jade(1.05).move_to(P(-4.6, 0.0))
        self.au_mot("Voici Jade")
        nom = self.t("Jade", 42, BLEU_CALCUL).next_to(jd, UP, buff=0.2)
        self.play(FadeIn(jd, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("cheffe cuisinière")
        met = self.t("cheffe cuisinière", 30, BLEU_CALCUL).next_to(jd, DOWN, buff=0.18)
        cas = casserole(1.1).move_to(P(1.6, 0.35))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(cas, shift=UP * 0.3), run_time=0.4)
        self.play(Wiggle(cas.vapeur), run_time=0.6)
        l1 = self.ligne_mots([("Avant de calculer,", WHITE), ("elle regarde les nombres.", WHITE)],
                             ["Avant de", "elle regarde"], 2.75, fs=36, xl=-2.4)
        lp = loupe(1.0).move_to(l1[1].get_left() + DOWN * 0.15)
        self.play(FadeIn(lp, scale=0.7), run_time=0.25)
        self.play(lp.animate.move_to(l1[1].get_right() + LEFT * 0.9 + DOWN * 0.15), run_time=0.8)
        self.play(FadeOut(lp), run_time=0.2)
        self.ligne_mots([("Un nombre rond", ROND), ("est-il tout près ?", JAUNE_TITRE)],
                        ["Un nombre rond", "est-il"], -1.7, fs=40, xl=-2.4)
        self.play(Wiggle(cas.vapeur), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le double ──────────────────────────────────────────────────────
    def ecran_double(self):
        self.ecran("02-double")
        ass1 = VGroup(*[assiette() for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(4.2, 2.95))
        ass2 = ass1.copy().move_to(P(4.2, 2.35))
        self.pas([("Ce soir,", "Ce soir"), ("deux fois plus d'invités.", "deux fois plus")], 2.75, fs=38,
                 couleurs=[WHITE, AMBRE_D],
                 gestes={0: [LaggedStart(*[FadeIn(a, scale=0.6) for a in ass1], lag_ratio=0.2)],
                         1: [LaggedStart(*[FadeIn(a, scale=0.6) for a in ass2], lag_ratio=0.2)]})
        self.au_mot("Jade double")
        l1 = self.ligne([("Jade double la recette :", JAUNE_TITRE), ("250 g", AMBRE_D), ("de farine.", WHITE)], 38, buff=0.2)
        self.col(l1, 1.7, xl=-5.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("250 grammes de")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
        self.au_mot("de farine")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        b1 = barre("250 g", 3.6).move_to(P(-3.6, 0.35))
        b2 = barre("250 g", 3.6).next_to(b1, RIGHT, buff=0)
        acc = Brace(VGroup(b1, b2), DOWN, color=VERT_OK)
        tot = self.t("500 g", 42, VERT_OK).next_to(acc, DOWN, buff=0.1)
        lg = self.ligne([("Le double de 250,", JAUNE_TITRE), ("c'est 250", WHITE), ("+", WHITE), ("250", WHITE),
                         (": 500 grammes.", VERT_OK)], 38, buff=0.18)
        self.col(lg, -1.85, xl=-5.6)
        self.au_mot("Le double")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 250")
        self.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(b1, shift=RIGHT * 0.3), run_time=0.3)
        # « plus 250 » n'a pas de marque propre : « plus » à 11,70 s, « 250 » à 11,94 s (WAV)
        hors_audit(VGroup(lg[2], lg[3], b2))
        self.au_temps(11.70)
        self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.2)
        self.au_temps(11.94)
        self.play(FadeIn(lg[3], shift=UP * 0.1), FadeIn(b2, shift=LEFT * 0.3), run_time=0.3)
        self.au_mot("500 grammes")
        self.play(FadeIn(lg[4], shift=UP * 0.1), GrowFromCenter(acc), FadeIn(tot, scale=1.3), run_time=0.35)
        self.insister(tot, 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : le quart = la moitié de la moitié ──────────────────────────────
    def ecran_quart(self):
        self.ecran("03-quart")
        ys = [1.25, 0.85, 0.45, 0.05]
        rangs = VGroup(*[VGroup(*[fraise() for _ in range(7)]).arrange(RIGHT, buff=0.14).move_to(P(-4.3, y))
                         for y in ys])
        cibles = [1.45, 0.55, -0.35, -1.25]
        tarts = VGroup(*[tartelette(1.6).move_to(P(-1.0, y)) for y in cibles])
        lg = self.ligne([("Pour 4 tartelettes,", WHITE), ("Jade a 28", AMBRE_D), ("fraises.", AMBRE_D)], 38, buff=0.18)
        self.col(lg, 3.0, xl=-5.6)
        self.au_mot("Pour 4")
        self.play(FadeIn(lg[0], shift=UP * 0.1), LaggedStart(*[FadeIn(t, scale=0.6) for t in tarts], lag_ratio=0.15),
                  run_time=0.4)
        self.au_mot("Jade a 28")
        self.play(FadeIn(lg[1], shift=UP * 0.1), LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in rangs], lag_ratio=0.1),
                  run_time=0.4)
        fr = hors_audit(lg[2])
        self.au_temps(2.58)  # « fraises » : pas de marque propre, 2,58 s dans le WAV
        self.play(FadeIn(fr, shift=UP * 0.1), run_time=0.3)
        self.ligne_mots([("Le quart,", JAUNE_TITRE), ("c'est la moitié", WHITE), ("de la moitié.", WHITE)],
                        ["Le quart", "c'est la moitié", "de la moitié"], 2.25, fs=40, xl=-5.6)
        # 1re moitié : 2 rangs en haut, 2 en bas (14 et 14)
        sep1 = [rangs[0].animate.shift(UP * 0.2), rangs[1].animate.shift(UP * 0.2),
                rangs[2].animate.shift(DOWN * 0.3), rangs[3].animate.shift(DOWN * 0.3)]
        self.pas([("La moitié de 28", "La moitié de 28"), (": 14.", "14. La")], 0.95, fs=38, xl=0.7,
                 gestes={0: sep1})
        sep2 = [rangs[0].animate.shift(UP * 0.0), rangs[1].animate.shift(DOWN * 0.3),
                rangs[2].animate.shift(UP * 0.0), rangs[3].animate.shift(DOWN * 0.3)]
        self.pas([("La moitié de 14", "La moitié de 14"), (": 7.", "7. 7")], 0.15, fs=38, xl=0.7,
                 gestes={0: sep2})
        self.au_mot("7 fraises par")
        g = self.tampon("7 fraises par tartelette", VERT_OK, 32)
        g.scale_to_fit_width(min(g.width, 5.2)).move_to(P(3.6, -1.0))  # grossi de 10 % : reste loin du bord
        self.play(*[r.animate.scale(0.5).move_to(t.get_center() + UP * 0.08) for r, t in zip(rangs, tarts)],
                  FadeIn(g, scale=1.2), run_time=0.7)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b36 = barre("36", 5.0, couleur="#fca5a5").move_to(P(-3.4, 1.0))
        moities = VGroup(barre("18", 2.45, couleur="#fda4af"), barre("18", 2.45, couleur="#fda4af")).arrange(RIGHT, buff=0.1)
        moities.move_to(P(-3.4, 0.0))
        quarts = VGroup(*[barre("9", 1.175, couleur="#86efac") for _ in range(4)]).arrange(RIGHT, buff=0.1)
        quarts.move_to(P(-3.4, -1.0))

        def autres_q(sc):
            sc.play(FadeIn(b36[0], shift=DOWN * 0.2), run_time=0.3)  # le nombre viendra à « 36 »

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["La moitié de 36", ": 18."])
            sc.au_mot("La moitié de 36")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), FadeIn(b36.texte, scale=1.3), run_time=0.3)
            sc.au_mot("18. La")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), FadeIn(moities, shift=DOWN * 0.3), run_time=0.35)
            lg1 = sc.ligne_rep(1, ["La moitié de 18", ": 9."])
            sc.au_mot("La moitié de 18")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), Indicate(moities, color=WHITE, scale_factor=1.05), run_time=0.3)
            sc.au_mot(": 9")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), FadeIn(quarts, shift=DOWN * 0.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Quel est le quart de 36 ?"],
                            [self.t("18", 36), self.t("9", 36), self.t("32", 36)], 1,
                            ["La moitié de 36 : 18.", "La moitié de 18 : 9."], mot_q="Quel",
                            autres_q=autres_q, autres_r=apres)

    # ── 05 : regrouper pour faire 100 ───────────────────────────────────────
    def ecran_regrouper(self):
        self.ecran("05-regrouper")
        pn = panier(1.0).move_to(P(4.6, 2.75))
        self.au_mot("Jade fait")
        l0 = self.t("Jade fait ses courses :", 38)
        self.col(l0, 2.9, xl=-5.6)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pn, shift=DOWN * 0.3), run_time=0.35)
        e25, e37, e75 = etiquette("25 €"), etiquette("37 €"), etiquette("75 €")
        for e, x in ((e25, -4.6), (e37, -1.6), (e75, 1.4)):
            e.move_to(P(x, 1.55))
        for e, mot in ((e25, "25 euros"), (e37, "37 euros"), (e75, "75 euros")):
            self.au_mot(mot)
            self.play(FadeIn(e, shift=DOWN * 0.3), run_time=0.3)
        cadre = SurroundingRectangle(VGroup(e25, e75.copy().move_to(P(-2.45, 1.55))), color=ROND, buff=0.15,
                                     corner_radius=0.12, stroke_width=5)
        c100 = self.t("100", 40, ROND).next_to(cadre, DOWN, buff=0.15)
        lg = self.ligne([("Elle regroupe", WHITE), ("25", AMBRE_D), ("et", WHITE), ("75 :", AMBRE_D),
                         ("ça fait 100.", ROND)], 38, buff=0.18)
        self.col(lg, -0.55, xl=-5.6)
        self.au_mot("Elle regroupe")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("25 et")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(e25, color=WHITE, scale_factor=1.15), run_time=0.3)
        # « et 75 » n'a pas de marque propre : « et » à 7.14 s, « 75 » à 7.38 s (énergie du WAV)
        hors_audit(VGroup(lg[2], lg[3]))
        self.au_temps(7.14)
        self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.2)
        self.au_temps(7.38)
        self.play(FadeIn(lg[3], shift=UP * 0.1), e75.animate.move_to(P(-2.45, 1.55)), e37.animate.move_to(P(1.2, 1.55)),
                  run_time=0.35)
        self.au_mot("ça fait 100")
        self.play(FadeIn(lg[4], shift=UP * 0.1), Create(cadre), FadeIn(c100, scale=1.3), run_time=0.35)
        tot = self.gros("137 €", fs=48).move_to(P(4.2, 0.65))
        self.pas([("Puis 100 +", "Puis 100"), ("37", "plus 37"), (": 137 euros.", "137 euros")], -1.35, fs=38,
                 couleurs=[ROND, AMBRE_D, VERT_OK],
                 gestes={1: [Indicate(e37, color=WHITE, scale_factor=1.15)], 2: [FadeIn(tot, scale=1.3)]})
        self.insister(tot, 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : arrondir, puis corriger ────────────────────────────────────────
    def ecran_arrondir(self):
        self.ecran("06-arrondir")
        tit = self.t("Arrondir, puis corriger", 44, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au_mot("Et 99")
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.25)
        self.pas([("Et 99 +", "Et 99"), ("47 ?", "plus 47")], 2.25, fs=40, couleurs=[WHITE, AMBRE_D])
        bd = BondsPlaces({99: 0.0, 100: 0.17, 146: 0.87, 147: 1.0}, x0=-5.2, x1=3.4, y=0.95, fs=36)
        self.play(Create(bd.trait), run_time=0.3)
        t99, t100 = bd.tic(99), bd.tic(100, ROND)
        cer = bd.rond(t100)
        self.pas([("99 est", "99 est"), ("collé", "collé"), ("à 100.", "à 100")], -0.45, fs=36,
                 couleurs=[WHITE, WHITE, ROND],
                 gestes={0: [Create(t99[0]), FadeIn(t99[1])], 2: [Create(t100[0]), FadeIn(t100[1]), Create(cer)]})
        b1, t147 = bd.bond(100, 147, "+ 47", ROSE_D), bd.tic(147, ORANGE_RETENUE)
        self.pas([("100 +", "100 plus"), ("47,", "47, ça"), ("ça fait 147.", "ça fait 147")], -1.15, fs=36,
                 couleurs=[ROND, AMBRE_D, ORANGE_RETENUE],
                 gestes={1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)], 2: [Create(t147[0]), FadeIn(t147[1])]})
        self.pas([("Mais 99, c'est", "Mais 99"), ("1 de moins", "1 de moins"), ("que 100.", "que 100")], -1.85, fs=36,
                 couleurs=[WHITE, ORANGE_RETENUE, ROND],
                 gestes={0: [Indicate(t99.nombre, color=WHITE, scale_factor=1.4)],
                         2: [Indicate(t100.nombre, color=ROND, scale_factor=1.4)]})
        b2, t146 = bd.bond(147, 146, MOINS_ + " 1", VERT_OK, haut=0.5), bd.tic(146, VERT_OK)
        t146[1].shift(LEFT * 0.12)
        t147[1].shift(RIGHT * 0.12)
        self.pas([("On enlève 1", "On enlève 1"), (": 146.", "146.")], -2.55, fs=36,
                 couleurs=[VERT_OK, VERT_OK],
                 gestes={0: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)], 1: [Create(t146[0]), FadeIn(t146[1], scale=1.3)]})
        self.insister(t146[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : le piège : oublier de corriger ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège : oublier de corriger", 44, ROUGE_ERREUR).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.45)
        rappel = hors_audit(self.t("99 + 47", 56, WHITE))  # le calcul de l'écran d'avant, déjà dit
        faux = self.t("= 147", 56, ROUGE_ERREUR)
        f = VGroup(rappel, faux).arrange(RIGHT, buff=0.3).move_to(P(-2.0, 1.5))
        self.play(FadeIn(rappel, shift=UP * 0.1), run_time=0.3)
        self.au_mot("147, c'est")
        self.play(FadeIn(faux, scale=1.2), run_time=0.3)
        self.au_mot("faux")
        tf = self.tampon("Faux !", ROUGE_ERREUR, 44).next_to(f, RIGHT, buff=0.5)
        self.play(Create(self.barrer(faux)), FadeIn(tf, scale=1.3), run_time=0.4)
        un = self.t("+ 1", 52, ORANGE_RETENUE).move_to(P(3.2, -0.6))
        self.pas([("On a ajouté", "On a ajouté"), ("1 de trop :", "1 de trop")], -0.6, fs=42,
                 couleurs=[WHITE, ORANGE_RETENUE], gestes={1: [FadeIn(un, scale=1.4)]})
        self.au_mot("on l'enlève")
        l2 = self.t("on l'enlève !", 42, VERT_OK)
        self.col(l2, -1.5, xl=-5.6)
        self.play(FadeIn(l2, shift=UP * 0.1), un.animate.shift(RIGHT * 1.2 + DOWN * 0.4).set_opacity(0), run_time=0.5)
        self.insister(l2, 1.15, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = BondsPlaces({199: 0.0, 200: 0.24, 255: 0.76, 256: 1.0}, x0=-5.9, x1=-1.1, y=0.4, fs=30)

        def autres_q(sc):
            t = bd.tic(199)
            hors_audit(t)  # 199 : dit dans la question
            sc.play(Create(bd.trait), Create(t[0]), FadeIn(t[1]), run_time=0.3)

        def apres(sc):
            t200, b1, t256 = bd.tic(200, ROND), bd.bond(200, 256, "+ 56", ROSE_D, fs=28), bd.tic(256, ORANGE_RETENUE)
            lg0 = sc.ligne_rep(0, ["200", "+ 56,", "ça fait 256."])
            sc.au_mot("200 plus")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Create(t200[0]), FadeIn(t200[1]), run_time=0.3)
            sc.au_mot("56, ça")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(b1.fleche), FadeIn(b1.etiquette), run_time=0.3)
            sc.au_mot("ça fait 256")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), Create(t256[0]), FadeIn(t256[1]), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["On a ajouté 1 de trop :"])
            lg2 = sc.ligne_rep(2, ["255."])
            b2, t255 = bd.bond(256, 255, MOINS_ + " 1", VERT_OK, fs=26, haut=0.45), bd.tic(255, VERT_OK)
            t255[1].shift(LEFT * 0.15 + DOWN * 0.35)
            sc.au_mot("On a ajouté 1")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), Create(b2.fleche), FadeIn(b2.etiquette), run_time=0.3)
            sc.au_mot("255")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Create(t255[0]), FadeIn(t255[1]), run_time=0.25)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien font 199 + 56 ?"],
                            [self.t("255", 36), self.t("257", 36), self.t("256", 36)], 0,
                            ["200 + 56, ça fait 256.", "On a ajouté 1 de trop :", "255."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Jade achète")
        l0 = self.t("Jade achète trois paniers :", 40)
        self.col(l0, 2.2, xl=-5.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        xs = (-4.3, -0.6, 3.1)
        for x, prix, mot in zip(xs, ("48 €", "99 €", "52 €"), ("48 euros", "99 euros", "52 euros")):
            pn = panier(1.05).move_to(P(x - 0.6, 0.65))
            e = etiquette(prix, 0.85).move_to(P(x + 1.15, 0.45))
            self.au_mot(mot)
            self.play(FadeIn(pn, shift=DOWN * 0.3), FadeIn(e, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("Combien paie")
        q = self.t("Combien paie-t-elle ?", 44, JAUNE_TITRE)
        self.col(q, -0.85, xl=-5.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        e48, e99, e52 = etiquette("48 €"), etiquette("99 €"), etiquette("52 €")
        for e, x in ((e48, -4.6), (e99, -1.6), (e52, 1.4)):
            e.move_to(P(x, 1.75))
        hors_audit(VGroup(e48, e99, e52))  # les prix du défi, déjà dits
        self.play(LaggedStart(*[FadeIn(e, shift=DOWN * 0.2) for e in (e48, e99, e52)], lag_ratio=0.2), run_time=0.5)
        cadre = SurroundingRectangle(VGroup(e48, e52.copy().move_to(P(-2.45, 1.75))), color=ROND, buff=0.15,
                                     corner_radius=0.12, stroke_width=5)
        c100 = self.t("100", 40, ROND).next_to(cadre, DOWN, buff=0.15)
        lg = self.ligne([("On regroupe", WHITE), ("48", AMBRE_D), ("et", WHITE), ("52 :", AMBRE_D),
                         ("ça fait 100.", ROND)], 38, buff=0.18)
        self.col(lg, -0.35, xl=-5.6)
        self.au_mot("On regroupe")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("48 et")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(e48, color=WHITE, scale_factor=1.15), run_time=0.3)
        # « et 52 » n'a pas de marque propre : « et » à 3.02 s, « 52 » à 3.34 s (énergie du WAV)
        hors_audit(VGroup(lg[2], lg[3]))
        self.au_temps(3.02)
        self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.2)
        self.au_temps(3.34)
        self.play(FadeIn(lg[3], shift=UP * 0.1), e52.animate.move_to(P(-2.45, 1.75)), e99.animate.move_to(P(1.2, 1.75)),
                  run_time=0.35)
        self.au_mot("ça fait 100")
        self.play(FadeIn(lg[4], shift=UP * 0.1), Create(cadre), FadeIn(c100, scale=1.3), run_time=0.35)
        tot = self.gros("199 €", fs=52).move_to(P(4.3, 0.75))
        self.pas([("Puis 100 +", "Puis 100"), ("99", "plus 99"), (": 199 euros.", "199 euros")], -1.15, fs=38,
                 couleurs=[ROND, AMBRE_D, VERT_OK],
                 gestes={1: [Indicate(e99, color=WHITE, scale_factor=1.15)], 2: [FadeIn(tot, scale=1.3)]})
        self.insister(tot, 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        e25, e75 = etiquette("25 €", 0.8), etiquette("75 €", 0.8)
        paire = VGroup(e25, e75).arrange(RIGHT, buff=0.12)
        cadre = SurroundingRectangle(paire, color=ROND, buff=0.12, corner_radius=0.1, stroke_width=5)
        c100 = Text("100", font_size=36, color=ROND, weight=BOLD).next_to(cadre, DOWN, buff=0.12)
        b1, b2 = barre("250 g", 1.6, 0.6, fs=26), barre("250 g", 1.6, 0.6, fs=26)
        bb = VGroup(b1, b2).arrange(RIGHT, buff=0)
        fig = VGroup(VGroup(paire, cadre, c100), bb).arrange(DOWN, buff=0.5)
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Le double, c'est ajouter", "le nombre à lui-même."),
            ("Le quart, c'est", "la moitié de la moitié."),
            ("On regroupe", "pour faire 100."),
            ("On arrondit,", "puis on corrige.")], fs=32)
        self.au_mot("Le double")
        self.montrer_ligne(lignes[0], Indicate(bb, color=WHITE, scale_factor=1.1))
        self.au_mot("Le quart")
        self.montrer_ligne(lignes[1])
        self.au_mot("On regroupe")
        self.montrer_ligne(lignes[2], Indicate(cadre, color=ROND, scale_factor=1.1))
        self.au_mot("On arrondit")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_double()
        self.ecran_quart()
        self.ecran_question1()
        self.ecran_regrouper()
        self.ecran_arrondir()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")



class MentalAstuces6e(MentalAstucesBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
