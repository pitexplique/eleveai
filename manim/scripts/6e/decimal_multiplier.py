# decimal_multiplier.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 08 : MULTIPLIER UN DÉCIMAL PAR UN ENTIER
# (micro decimal_multiplier, notion decimal_calcul), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-multiplier.js).
# Décor et métier : Lucas, JARDINIER PAYSAGISTE (centre : nature-ecologie).
# Écrans : garde (00), situation (01), le sens (02), la méthode (03), vérifier (04),
# QUESTION 1 (05), × 10 (06), le raccourci (07), QUESTION 2 (08), défi (09) et correction (09b),
# appris (10), fin (11).
# Voix : manim/voix/6e-decimal-multiplier.json (Julie, débit −6) ; marques : decimal_multiplier_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_multiplier.py DecimalMultiplier6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_multiplier.py DecimalMultiplier6e -o eleveai-maths-6e-decimal-multiplier --media_dir manim/scripts/6e/media-dec-08
# Sortie : manim/sorties/6e/maths/decimaux/08-multiplier/eleveai-maths-6e-decimal-multiplier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_F = "#4ade80"


def rangee(s, xd, y, w=0.64, fs=60, couleur=WHITE, c_virg=ROUGE_ERREUR):
    """Une ligne d'opération posée : les chiffres de s en colonnes de largeur w, le
    dernier sur la colonne xd ; la virgule ENTRE deux colonnes, en bas ; « × » à gauche.
    .ch : les chiffres (de gauche à droite), .virgule (ou None), .signe (ou None). Hors audit."""
    g = VGroup()
    chiffres = [c for c in s if c.isdigit()]
    n, k = len(chiffres), 0
    g.ch, g.virgule, g.signe = [], None, None
    for c in s:
        if c.isdigit():
            t = Text(c, font_size=fs, color=couleur, weight=BOLD).move_to(P(xd - (n - 1 - k) * w, y))
            g.ch.append(t)
            g.add(t)
            k += 1
        elif c == ",":
            v = Text(",", font_size=fs, color=c_virg, weight=BOLD)
            v.move_to(P(xd - (n - k) * w + w / 2, y - fs / 60 * 0.3))
            g.virgule = v
            g.add(v)
    if s.strip().startswith("×"):
        g.signe = Text("×", font_size=fs, color=couleur).move_to(P(xd - (n - 0.2) * w - 0.35, y))
        g.add(g.signe)
    return hors_audit(g)


def fleur(s=1.0, couleur="#f472b6"):
    tige = Line(P(0, -0.45 * s), P(0, 0), color="#16a34a", stroke_width=6 * s)
    feuille = Ellipse(width=0.22 * s, height=0.1 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
    feuille.move_to(P(0.09 * s, -0.28 * s)).rotate(0.5)
    petales = VGroup(*[Circle(radius=0.1 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                       .move_to(P(0.12 * s * np.cos(a), 0.12 * s * np.sin(a))) for a in np.linspace(0, TAU, 6)[:-1]])
    coeur = Circle(radius=0.07 * s, fill_color="#fde047", fill_opacity=1, stroke_width=0)
    return VGroup(tige, feuille, petales, coeur)


def rangee_fleurs(larg=3.6, n=7, s=0.8, couleur="#f472b6"):
    terre = RoundedRectangle(width=larg, height=0.18, corner_radius=0.06, fill_color="#78350f", fill_opacity=1,
                             stroke_width=0)
    fl = VGroup(*[fleur(s, couleur) for _ in range(n)]).arrange(RIGHT, buff=(larg - n * 0.3 * s) / n)
    fl.next_to(terre, UP, buff=0.0)
    return VGroup(terre, fl)


def sac(s=1.0):
    corps = RoundedRectangle(width=0.5 * s, height=0.62 * s, corner_radius=0.08 * s, fill_color="#a16207",
                             fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    haut = Polygon(P(-0.25 * s, 0.31 * s), P(0.25 * s, 0.31 * s), P(0.18 * s, 0.42 * s), P(-0.18 * s, 0.42 * s),
                   fill_color="#854d0e", fill_opacity=1, stroke_width=0)
    etiq = RoundedRectangle(width=0.32 * s, height=0.2 * s, corner_radius=0.03 * s, fill_color="#22c55e",
                            fill_opacity=1, stroke_width=0)
    return VGroup(corps, haut, etiq)


def rosier(s=1.0):
    pot = Polygon(P(-0.22 * s, 0), P(0.22 * s, 0), P(0.16 * s, -0.36 * s), P(-0.16 * s, -0.36 * s),
                  fill_color="#c2410c", fill_opacity=1, stroke_width=0)
    buisson = VGroup(*[Circle(radius=0.17 * s, fill_color="#15803d", fill_opacity=1, stroke_width=0)
                       .move_to(P(x * s, y * s)) for x, y in ((-0.14, 0.14), (0.14, 0.14), (0, 0.3))])
    roses = VGroup(*[Circle(radius=0.075 * s, fill_color="#e11d48", fill_opacity=1, stroke_width=0)
                     .move_to(P(x * s, y * s)) for x, y in ((-0.16, 0.2), (0.12, 0.12), (0.03, 0.38))])
    return VGroup(pot, buisson, roses)


def lucas(s=1.0):
    """Lucas, jardinier paysagiste : salopette verte, chapeau de paille."""
    p = visage(personne(peau="#c68642", tenue="#15803d", cheveux="#1f2937", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.45, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.72)
    calotte = RoundedRectangle(width=r * 1.5, height=r * 0.7, corner_radius=r * 0.25, fill_color="#facc15",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 1.02)
    ruban = Rectangle(width=r * 1.5, height=r * 0.16, fill_color="#15803d", fill_opacity=1, stroke_width=0)
    ruban.move_to(c + UP * r * 0.8)
    p.add(bord, calotte, ruban)
    return p


class DecimalMultiplierBase(PaysageDecimal):
    nom_voix = "6e-decimal-multiplier"
    fichier_marques = "decimal_multiplier_marques.json"

    def ligne_n(self, morceaux, mots, y, fs=34, xl=None, buff=0.18):
        """Une ligne de morceaux, chacun posé à son mot : mots[i] = « mot » ou (« mot », n)."""
        lg = self.ligne(morceaux, fs, buff=buff)
        self.col(lg, y, xl=xl)
        for m, mot in zip(lg, mots):
            if mot:
                self.au_mot(*(mot if isinstance(mot, tuple) else (mot,)))
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.28)
        return lg

    def scinder(self, lignes, k, i, morceaux):
        """Dans la finale : la ligne i du bloc k, recoupée en morceaux (texte, couleur) posés à la
        même place (un nombre et le premier mot dits à des instants éloignés)."""
        old = lignes[k][1][i]
        lg = self.ligne(morceaux, 36, buff=0.16)
        lg.scale(old.width / lg.width).align_to(old, LEFT).align_to(old, DOWN)
        lignes[k][1].submobjects[i] = lg
        return lg

    def barre_op(self, xg, xd, y):
        return Line(P(xg, y), P(xd, y), color=WHITE, stroke_width=5)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier un décimal par un entier", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Où mettre", "la virgule ?"], 44).move_to(P(-3.4, 0.3))
        cases = VGroup(*[RoundedRectangle(width=0.85, height=1.0, corner_radius=0.1, stroke_color=BLEU_D, stroke_width=4,
                                          fill_color=CASE, fill_opacity=0.6) for _ in range(3)]).arrange(RIGHT, buff=0.3)
        cases.move_to(P(2.8, 0.4))
        trous = [(cases[i].get_right() + cases[i + 1].get_left()) / 2 + DOWN * 0.42 for i in range(2)]
        v = Dot(trous[0], radius=0.13, color=ROUGE_ERREUR)
        self.au_mot("Où mettre")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(cases), FadeIn(v, scale=2), run_time=0.35)
        self.play(v.animate.move_to(trous[1]), run_time=0.45)
        self.play(v.animate.move_to(trous[0]), run_time=0.45)
        self.play(Indicate(v, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucas, jardinier paysagiste ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lu = lucas(1.05).move_to(P(-5.3, 0.0))
        self.au_mot("Voici Lucas")
        nom = self.t("Lucas", 44, BLEU_CALCUL).next_to(lu, UP, buff=0.2)
        self.play(FadeIn(lu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("jardinier")
        met = self.bloc(["jardinier", "paysagiste"], 28, BLEU_CALCUL).next_to(lu, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        rangs = VGroup(*[rangee_fleurs(3.4, 7, 0.85, c) for c in ("#f472b6", "#fbbf24", "#a78bfa")])
        rangs.arrange(DOWN, buff=0.55).move_to(P(-1.9, 0.35))
        self.au_mot("Il plante")
        l1 = self.ligne([("Il plante", WHITE), ("3 rangées de fleurs.", VERT_F)], 36)
        self.col(l1, 2.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 rangées")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(r, shift=UP * 0.2) for r in rangs], lag_ratio=0.35),
                  run_time=0.8)
        self.au_mot("Chaque rangée")
        l2 = self.ligne([("Chaque rangée :", WHITE), ("2,4 m", AMBRE_D)], 38)
        self.col(l2, 1.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,4 mètres")
        acc = BraceBetweenPoints(rangs[2][0].get_corner(DL), rangs[2][0].get_corner(DR), DOWN, color=AMBRE_D)
        et = self.t("2,4 m", 30, AMBRE_D).next_to(acc, DOWN, buff=0.1)
        self.play(FadeIn(l2[1], scale=1.2), GrowFromCenter(acc), FadeIn(et), run_time=0.4)
        self.au_mot("Quelle longueur")
        q = self.t("Quelle longueur en tout ?", 40, JAUNE_TITRE)
        self.col(q, -0.1)
        self.play(FadeIn(q, shift=UP * 0.15), LaggedStart(*[Indicate(r[0], color=AMBRE_D) for r in rangs], lag_ratio=0.3),
                  run_time=0.8)
        self.attendre_voix()

    # ── 02 : le sens : 3 fois 2,4 ───────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("02-sens")
        self.au_mot("3 fois 2,4")
        self.ligne_n([("3 × 2,4", WHITE), ("= 2,4", WHITE), ("+ 2,4", WHITE), ("+ 2,4", WHITE)],
                     ["3 fois 2,4", ("2,4", 2), ("2,4", 3), ("2,4", 4)], 2.7, fs=40, buff=0.16)
        tb = TableauNum(("Unités", "Dixièmes"), larg=2.3, h=1.3).move_to(P(-3.4, 0.4))
        self.play(FadeIn(tb), run_time=0.3)
        self.au_mot("3 fois 2 unités")
        l1 = self.ligne([("3 × 2 unités", BLEU_D), ("= 6 unités", BLEU_D)], 29)
        self.col(l1, 1.6)
        six = tb.chiffre(0, 6, BLEU_D)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(tb.colonne(0), color=BLEU_D, scale_factor=1.1), run_time=0.35)
        self.au_mot("6 unités")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(six, scale=1.6), run_time=0.3)
        self.au_mot("3 fois 4 dixièmes")
        l2 = self.ligne([("3 × 4 dixièmes", AMBRE_D), ("= 12 dixièmes", AMBRE_D)], 29)
        self.col(l2, 0.75)
        douze = tb.chiffre(1, 12, AMBRE_D)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(tb.colonne(1), color=AMBRE_D, scale_factor=1.1), run_time=0.35)
        self.au_mot("12 dixièmes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(douze, scale=1.6), run_time=0.3)
        self.au_mot("soit 1 unité")
        l3 = self.ligne([("soit 1 unité", BLEU_D), ("et 2 dixièmes.", AMBRE_D)], 29)
        self.col(l3, -0.1)
        un = hors_audit(Text("1", font_size=tb.fs, color=BLEU_D, weight=BOLD)).move_to(douze[0])
        deux = tb.chiffre(1, 2, AMBRE_D)
        sept = tb.chiffre(0, 7, BLEU_D)
        haut = tb.entetes.get_top()[1] + 0.15
        fl = CurvedArrow(P(tb.cases[1].get_center()[0], haut), P(tb.cases[0].get_center()[0], haut),
                         color=BLEU_D, angle=0.9)
        plus = hors_audit(self.t("+ 1 unité", 28, BLEU_D)).next_to(fl, UP, buff=0.08)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(fl), FadeIn(plus), run_time=0.4)
        self.add(un)
        self.remove(douze)
        self.play(un.animate.move_to(six), FadeIn(deux, scale=1.4), run_time=0.5)
        self.au_mot("et 2 dixièmes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeOut(un), FadeOut(six), FadeIn(sept, scale=1.6), run_time=0.35)
        self.au_mot("En tout")
        et = self.t("En tout :", 36)
        self.col(et, -1.0)
        self.play(FadeIn(et), run_time=0.25)
        self.au_mot("7,2 mètres")
        g = self.gros("7,2 m", fs=60)
        self.col(g, -2.05, xl=1.4)
        self.play(FadeIn(g, scale=1.3), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.45)
        self.attendre_voix()

    # ── 03 : la méthode rapide ──────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        xd = -2.6
        h = rangee("2,4", xd, 1.6)
        b = rangee("× 3", xd, 0.6)
        trait = self.barre_op(xd - 2.0, xd + 0.4, 0.05)
        r = rangee("7,2", xd, -0.55, couleur=VERT_OK)
        self.au_mot("La méthode rapide")
        tit = self.t("La méthode rapide :", 40, JAUNE_TITRE)
        self.col(tit, 2.8)
        self.play(Write(tit), FadeIn(VGroup(*h.ch, h.virgule)), FadeIn(b), Create(trait), run_time=0.45)
        self.au_mot("on oublie la virgule")
        l1 = self.t("on oublie la virgule.", 36)
        self.col(l1, 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), h.virgule.animate.set_opacity(0.15), run_time=0.4)
        self.au_mot("24 fois 3")
        self.ligne_n([("24 × 3", WHITE), ("= 72", VERT_OK)], ["24 fois 3", "72"], 1.15, fs=42)
        self.play(FadeIn(r.ch[0], scale=1.5), FadeIn(r.ch[1], scale=1.5), run_time=0.3)
        self.au_mot("2,4 a un chiffre")
        l3 = self.ligne([("2,4", AMBRE_D), ("a un chiffre", WHITE)], 36)
        self.col(l3, 0.45)
        l3b = self.t("après la virgule.", 36)
        self.col(l3b, -0.15)
        sous = Line(h.ch[1].get_corner(DL) + DOWN * 0.08, h.ch[1].get_corner(DR) + DOWN * 0.08, color=AMBRE_D, stroke_width=7)
        self.play(FadeIn(l3[0], shift=UP * 0.1), h.virgule.animate.set_opacity(1), h.ch[1].animate.set_color(AMBRE_D),
                  run_time=0.3)
        self.au_mot("un chiffre")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(sous), run_time=0.3)
        self.au_mot("après la virgule")
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le résultat aussi")
        l4 = self.t("Le résultat aussi :", 36)
        self.col(l4, -0.95)
        sous2 = Line(r.ch[1].get_corner(DL) + DOWN * 0.08, r.ch[1].get_corner(DR) + DOWN * 0.08, color=AMBRE_D,
                     stroke_width=7)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(sous2), run_time=0.35)
        self.au_mot("7,2")
        g = self.gros("7,2", fs=64)
        self.col(g, -2.05, xl=1.4)
        self.play(FadeIn(g, scale=1.3), FadeIn(r.virgule, scale=2.5), run_time=0.4)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : vérifier avec un ordre de grandeur ─────────────────────────────
    def ecran_verifier(self):
        self.ecran("04-verifier")
        self.au_mot("On vérifie")
        tit = self.bloc(["On vérifie avec", "un ordre de grandeur."], 38, JAUNE_TITRE)
        self.col(tit, 2.55)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        ax = NumberLine(x_range=[0, 10, 1], length=6.2, include_numbers=False, color=WHITE, stroke_width=4,
                        tick_size=0.12).move_to(P(-3.25, 0.2))
        nums = hors_audit(VGroup(*[Text(str(k), font_size=26, color="#cbd5e1")
                                   .next_to(ax.n2p(k), DOWN, buff=0.22) for k in range(11)]))
        self.play(Create(ax), FadeIn(nums), run_time=0.5)
        self.au_mot("2,4 est entre")
        self.ligne_n([("2,4", AMBRE_D), ("est entre 2", WHITE), ("et 3.", WHITE)], ["2,4 est", "entre 2", "et 3"], 1.25, fs=36)
        zone1 = Rectangle(width=ax.n2p(3)[0] - ax.n2p(2)[0], height=0.3, fill_color=AMBRE_D, fill_opacity=0.55,
                          stroke_width=0).move_to((ax.n2p(2) + ax.n2p(3)) / 2)
        p24 = Dot(ax.n2p(2.4), radius=0.1, color=AMBRE_D)
        self.play(FadeIn(zone1), FadeIn(p24, scale=2), run_time=0.35)
        self.au_mot("Donc le résultat")
        l2 = self.t("Donc le résultat est", 36)
        self.col(l2, 0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.ligne_n([("entre 6", VERT_F), ("et 9.", VERT_F)], ["entre 6", "et 9"], -0.1, fs=36)
        zone2 = Rectangle(width=ax.n2p(9)[0] - ax.n2p(6)[0], height=0.42, fill_color=VERT_F, fill_opacity=0.4,
                          stroke_width=0).move_to((ax.n2p(6) + ax.n2p(9)) / 2)
        self.play(FadeIn(zone2), run_time=0.35)
        self.au_mot("7,2 convient")
        l3 = self.ligne([("7,2", VERT_OK), ("convient.", VERT_OK)], 40)
        self.col(l3, -0.9)
        p72 = Dot(ax.n2p(7.2), radius=0.13, color=VERT_OK)
        et72 = self.t("7,2", 32, VERT_OK).next_to(p72, UP, buff=0.35)
        ok = self.coche(VERT_OK, 0.3).next_to(l3, RIGHT, buff=0.25)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(p72, scale=2), FadeIn(et72), Create(ok), run_time=0.4)
        self.au_mot("72, non")
        f = self.t("72, non !", 44, ROUGE_ERREUR)
        self.col(f, -1.75)
        x = croix(f[:2], sw=7)
        fl = Arrow(ax.n2p(8.6) + DOWN * 0.95, ax.n2p(10) + DOWN * 0.95 + RIGHT * 0.25, color=ROUGE_ERREUR, buff=0,
                   stroke_width=6)
        loin = hors_audit(self.t("bien plus loin…", 26, ROUGE_ERREUR)).next_to(fl, LEFT, buff=0.15)
        self.play(FadeIn(f, scale=1.2), GrowArrow(fl), FadeIn(loin), run_time=0.35)
        self.play(Create(x), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        # 4 fois 1,5 : quatre bandes d'une unité et demie
        bandes = VGroup()
        for i in range(4):
            u = Square(1.0, stroke_color=WHITE, stroke_width=3, fill_color=BLEU_D, fill_opacity=0.85)
            d = Rectangle(width=0.5, height=1.0, stroke_color=WHITE, stroke_width=3, fill_color=AMBRE_D, fill_opacity=0.9)
            bandes.add(VGroup(u, d).arrange(RIGHT, buff=0))
        bandes.arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(P(-3.6, 0.2))

        def avant(sc):
            sc.play(FadeIn(bandes, shift=RIGHT * 0.2), run_time=0.25)

        def apres(sc):
            lg = sc.ligne_rep(0, ["15 × 4", "= 60."])
            sc.au_mot("15 fois 4")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("60")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("Un chiffre")
            sc.rep(1, 2, avec=[*[Indicate(b[1], color=AMBRE_D, scale_factor=1.15) for b in bandes]])
            lg2 = sc.ligne_rep(3, ["6,0,", "c'est-à-dire 6."])
            sc.au_mot("6,0")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("c'est-à-dire")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), bandes[1][1].animate.next_to(bandes[0][1], RIGHT, buff=0),
                    bandes[3][1].animate.next_to(bandes[2][1], RIGHT, buff=0), run_time=0.5)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien font", "1,5 × 4 ?"],
                            [self.t("6", 36), self.t("4,20", 36), self.t("60", 36)], 0,
                            ["15 × 4 = 60.", "Un chiffre après", "la virgule :", "6,0, c'est-à-dire 6."], mot_q="Combien",
                            avant_q=avant, autres_r=apres)

    # ── 06 : fois 10 ────────────────────────────────────────────────────────
    def ecran_fois10(self):
        self.ecran("06-fois10")
        sacs = VGroup(*[sac(0.9) for _ in range(10)]).arrange(RIGHT, buff=0.12).move_to(P(-3.3, 2.75))
        self.au_mot("Lucas achète")
        self.ligne_n([("10 sacs de terreau", WHITE), ("de 3,47 kg.", AMBRE_D)], ["10 sacs", "3,47"], 2.75, fs=34)
        self.play(LaggedStart(*[FadeIn(s, shift=DOWN * 0.2) for s in sacs], lag_ratio=0.08), run_time=0.6)
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
        t1 = TableauNum(rangs, larg=1.5, h=0.85, fs_ent=24, virgule_apres=1).move_to(P(-3.4, 1.05))
        t2 = TableauNum(rangs, larg=1.5, h=0.85, fs_ent=24, virgule_apres=1).move_to(P(-3.4, -1.45))
        c1 = [t1.chiffre(1, 3, BLEU_D), t1.chiffre(2, 4, AMBRE_D), t1.chiffre(3, 7, ROSE_D)]
        self.play(FadeIn(t1), *[FadeIn(c, scale=1.5) for c in c1], run_time=0.4)
        self.au_mot("Multiplier par 10")
        self.ligne_n([("× 10 :", WHITE), ("chaque chiffre", WHITE)], ["par 10", "chaque chiffre"], 2.0, fs=34)
        self.au_mot("dix fois plus grand")
        l1 = self.t("est dix fois plus grand.", 34)
        self.col(l1, 1.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque chiffre monte")
        l2 = self.t("Il monte d'un rang :", 34, JAUNE_TITRE)
        self.col(l2, 0.7)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(t2), run_time=0.35)
        lignes = [("3 unités", "→ 3 dizaines", BLEU_D, "#34d399", "3 unités", "3 dizaines"),
                  ("4 dixièmes", "→ 4 unités", AMBRE_D, BLEU_D, "4 dixièmes", "4 unités"),
                  ("7 centièmes", "→ 7 dixièmes", ROSE_D, AMBRE_D, "7 centièmes", "7 dixièmes")]
        for i, (a, b, ca, cb, ma, mb) in enumerate(lignes):
            lg = self.ligne([(a, ca), (b, cb)], 32, buff=0.16)
            self.col(lg, 0.1 - 0.62 * i)
            self.au_mot(ma)
            d = c1[i]
            nouv = t2.chiffre(i, (3, 4, 7)[i], cb)
            fl = Arrow(t1.cases[i + 1].get_bottom(), t2.cases[i].get_top() + UP * 0.45, color=cb, buff=0.08,
                       stroke_width=5, max_tip_length_to_length_ratio=0.15)
            self.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(d, color=ca, scale_factor=1.5), run_time=0.3)
            self.au_mot(mb)
            self.play(FadeIn(lg[1], shift=UP * 0.1), GrowArrow(fl), FadeIn(nouv, scale=1.5), run_time=0.35)
        self.au_mot("Résultat")
        g = self.gros("34,7 kg", fs=52)
        self.col(g, -2.05, xl=1.4)
        self.au_mot("34,7")
        self.play(FadeIn(g, scale=1.3), Indicate(t2.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.45)
        self.attendre_voix()

    # ── 07 : le raccourci ───────────────────────────────────────────────────
    def ecran_raccourci(self):
        self.ecran("07-raccourci")
        self.au_mot("Le raccourci")
        tit = self.t("Le raccourci :", 42, JAUNE_TITRE)
        self.col(tit, 2.8)
        self.play(Write(tit), run_time=0.35)
        cases = VGroup(*[RoundedRectangle(width=1.05, height=1.2, corner_radius=0.1, stroke_color=c, stroke_width=4,
                                          fill_color=CASE, fill_opacity=0.6) for c in (BLEU_D, AMBRE_D, ROSE_D)])
        cases.arrange(RIGHT, buff=0.35).move_to(P(-3.3, 1.3))
        ch = hors_audit(VGroup(*[Text(str(v), font_size=70, color=c, weight=BOLD).move_to(k)
                                 for v, c, k in zip((3, 4, 7), (BLEU_D, AMBRE_D, ROSE_D), cases)]))
        trous = [(cases[i].get_right() + cases[i + 1].get_left()) / 2 + DOWN * 0.5 for i in range(2)]
        trous.append(cases[2].get_right() + RIGHT * 0.18 + DOWN * 0.5)
        v = Dot(trous[0], radius=0.13, color=ROUGE_ERREUR)
        self.play(FadeIn(cases), FadeIn(ch), FadeIn(v, scale=2), run_time=0.35)
        self.au_mot("la virgule se décale")
        l1 = self.bloc(["la virgule se décale", "d'un rang vers la droite."], 34)
        self.col(l1, 1.8)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(v, color=ROUGE_ERREUR, scale_factor=2), run_time=0.4)
        self.au_mot("d'un rang")
        fl1 = CurvedArrow(trous[0] + DOWN * 0.25, trous[1] + DOWN * 0.25, color=ROUGE_ERREUR, angle=0.9)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(fl1), v.animate.move_to(trous[1]), run_time=0.45)
        l2 = self.ligne([("× 100 :", AMBRE_D), ("deux rangs.", AMBRE_D)], 36)
        self.col(l2, 0.85)
        self.au_mot("Fois 100")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeOut(fl1), v.animate.move_to(trous[0]), run_time=0.3)
        self.au_mot("deux rangs")
        fl2 = CurvedArrow(trous[0] + DOWN * 0.25, trous[2] + DOWN * 0.25, color=ROUGE_ERREUR, angle=0.7)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(fl2), v.animate.move_to(trous[2]), run_time=0.5)
        self.au_mot("3,47 fois 100")
        self.ligne_n([("3,47 × 100", WHITE), ("= 347", VERT_OK)], ["3,47 fois 100", "347"], 0.05, fs=40)
        self.play(FadeOut(v), FadeOut(fl2), run_time=0.3)
        self.au_mot("Attention")
        l4 = self.bloc(["Attention : on n'ajoute", "pas un zéro !"], 34, ROUGE_ERREUR)
        self.col(l4, -0.9)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas un zéro")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3,470")
        f = self.t("3,470", 50, ROUGE_ERREUR).move_to(P(-4.3, -1.35))
        faux = self.t("ce serait faux !", 32, ROUGE_ERREUR).next_to(f, RIGHT, buff=0.35)
        self.play(FadeIn(f, scale=1.3), run_time=0.3)
        self.au_mot("ce serait faux")
        self.play(Create(croix(f, sw=7)), FadeIn(faux), run_time=0.35)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rangs = ("Dizaines", "Unités", "Dixièmes")
        tb = TableauNum(rangs, larg=1.8, h=1.0, virgule_apres=1).move_to(P(-3.5, 1.2))
        t2 = TableauNum(rangs, larg=1.8, h=1.0, virgule_apres=1).move_to(P(-3.5, -1.35))
        zero, huit = tb.chiffre(1, 0, BLEU_D), tb.chiffre(2, 8, AMBRE_D)

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.25)

        def autres_q(sc):
            sc.play(FadeIn(zero, scale=1.5), FadeIn(huit, scale=1.5), run_time=0.3)

        def apres(sc):
            fl = Arrow(tb.cases[2].get_bottom(), t2.cases[0].get_top() + UP * 0.45, color=AMBRE_D, buff=0.08,
                       stroke_width=6, max_tip_length_to_length_ratio=0.12)
            sc.au_mot("Chaque chiffre")
            sc.rep(0, 1, avec=[FadeIn(t2)])
            sc.au_mot("8 dixièmes")
            sc.rep(2, avec=[GrowArrow(fl), FadeIn(t2.chiffre(0, 8, AMBRE_D), scale=1.6)])
            lg = sc.ligne_rep(3, ["8 dizaines.", "80."])
            sc.au_mot("8 dizaines")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("80")
            sc.play(FadeIn(lg[1], scale=1.3), FadeIn(t2.chiffre(1, 0, BLEU_D), scale=1.6), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien font", "0,8 × 100 ?"],
                            [self.t("0,800", 36), self.t("8", 36), self.t("80", 36)], 2,
                            ["Chaque chiffre monte", "de deux rangs :", "8 dixièmes deviennent", "8 dizaines. 80."],
                            mot_q="Combien", avant_q=avant, autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        roses = VGroup(*[rosier(1.2) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.45, 0.55)).move_to(P(-3.6, 0.5))
        self.au_mot("Lucas achète")
        l1 = self.ligne([("Lucas achète", WHITE), ("6 rosiers", VERT_F), ("à 4,25 €.", AMBRE_D)], 36)
        self.col(l1, 2.0, xl=0.6)
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_mot("6 rosiers")
        self.play(FadeIn(l1[1], scale=1.1), LaggedStart(*[FadeIn(r, shift=UP * 0.2) for r in roses], lag_ratio=0.12),
                  run_time=0.6)
        self.au_mot("4,25")
        self.play(FadeIn(l1[2], scale=1.1), run_time=0.3)
        self.au_mot("Combien paie")
        l2 = self.t("1. Combien paie-t-il ?", 36, ORANGE_RETENUE)
        hors_audit(l2)
        self.col(l2, 1.1, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Vérifie")
        l3 = self.bloc(["2. Vérifie avec un", "ordre de grandeur."], 36, ORANGE_RETENUE)
        hors_audit(l3)
        self.col(l3, -0.1, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        xd = -2.5
        h = rangee("4,25", xd, 1.75, w=0.66)
        b = rangee("× 6", xd, 0.75, w=0.66)
        trait = self.barre_op(xd - 2.8, xd + 0.4, 0.2)
        r = rangee("25,50", xd, -0.4, w=0.66, couleur=VERT_OK)
        self.play(FadeIn(h), FadeIn(b), Create(trait), h.virgule.animate.set_opacity(0.15), run_time=0.4)
        self.au_mot("425 fois 6")
        l1 = self.ligne([("425 × 6", WHITE), ("=", WHITE)], 40)
        self.col(l1, 2.25)
        res = hors_audit(self.t("2 550", 40, VERT_OK)).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 550")
        self.play(FadeIn(res, scale=1.3), *[FadeIn(c, scale=1.4) for c in r.ch], run_time=0.35)
        self.au_mot("Deux chiffres")
        l2 = self.bloc(["Deux chiffres", "après la virgule :"], 34)
        self.col(l2, 1.3)
        sous = VGroup(*[Line(c.get_corner(DL) + DOWN * 0.08, c.get_corner(DR) + DOWN * 0.08, color=AMBRE_D,
                             stroke_width=7) for c in h.ch[2:]])
        self.play(FadeIn(l2[0], shift=UP * 0.1), h.virgule.animate.set_opacity(1), Create(sous), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(r.virgule, scale=2.5), run_time=0.3)
        self.au_mot("25,50")
        g = self.gros("25,50 €", fs=50)
        self.col(g, 0.15, xl=1.3)
        self.play(FadeIn(g, scale=1.3), run_time=0.35)
        self.au_mot("Ordre de grandeur")
        l3 = self.t("Ordre de grandeur :", 34, JAUNE_TITRE)
        self.col(l3, -0.85)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.ligne_n([("4 × 6", WHITE), ("= 24", VERT_F)], ["4 fois 6", "24"], -1.5, fs=40)
        self.au_mot("C'est proche")
        l5 = self.t("C'est proche : bravo !", 36, VERT_OK)
        self.col(l5, -2.25)
        self.play(FadeIn(l5, shift=UP * 0.1), Indicate(g, color=VERT_OK), run_time=0.45)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        xd = 0
        h = rangee("2,4", xd, 1.0, fs=56)
        b = rangee("× 3", xd, 0.0, fs=56)
        trait = self.barre_op(xd - 1.9, xd + 0.4, -0.5)
        r = rangee("7,2", xd, -1.05, fs=56, couleur=VERT_OK)
        fig = VGroup(h, b, trait, r)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On multiplie sans la virgule,", "puis on remet autant de", "chiffres après la virgule."),
            ("× 10 : chaque chiffre", "monte d'un rang."),
            ("On vérifie avec", "un ordre de grandeur.")], fs=36)
        self.scinder(lignes, 1, 0, [("× 10 :", WHITE), ("chaque chiffre", WHITE)])
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[0], Indicate(r.virgule, color=ROUGE_ERREUR, scale_factor=2))
        self.au_mot("Fois 10")
        self.montrer_ligne(lignes[1])
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2], Indicate(r, color=VERT_OK, scale_factor=1.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sens()
        self.ecran_methode()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_fois10()
        self.ecran_raccourci()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalMultiplier6e(DecimalMultiplierBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
