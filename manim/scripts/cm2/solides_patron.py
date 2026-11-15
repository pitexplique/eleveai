# solides_patron.py
# EleveAI — Maths CM2 — série « Solides », épisode 04 : RECONNAÎTRE UN PATRON
# (micro solide_patron, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Un cran au-dessus du CM1 (11 patrons du cube, dé) : on reconnaît le solide d'un patron en comptant
# ses faces et leurs formes, puis en vérifiant que les bords qui se collent ont la même longueur.
# Décor et métier : Julia, MAQUETTISTE (maquettes de bâtiments en carton pour les architectes).
# Mapping micro → écrans : 02 (définition : un seul morceau, sans trou, sans face en double ; le pavé
# se plie), 03 (compter les faces et leurs formes : pavé, pyramide à base carrée, prisme — les trois se
# plient), 04 (les longueurs : deux bords collés = même longueur, sinon la maquette bâille),
# 06 (piège : 6 faces ne suffisent pas, deux faces l'une sur l'autre), questions 05 (6 rectangles en
# 3 paires : pavé droit, rép. C) et 07 (hexagone + 6 triangles : pyramide à base hexagonale, rép. B),
# défi 08 (la tour : 4 rectangles 5 × 12 et 2 carrés de 5 cm, la tour se plie debout).
# Voix : manim/voix/cm2-solides-patron.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_patron.py SolidesPatronCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_patron.py SolidesPatronCM2 -o eleveai-maths-cm2-solides-patron --media_dir manim/scripts/cm2/media-sol-04
# Sortie : manim/sorties/cm2/maths/solides/04-patron/eleveai-maths-cm2-solides-patron.mp4

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

PA = "#60a5fa"   # paire 6 × 4 (fond, couvercle)
PB = "#f472b6"   # paire 6 × 3 (devant, derrière)
PC = "#facc15"   # paire 4 × 3 (côtés)
TRI = "#fb923c"  # triangles
HEX = "#a78bfa"  # la base hexagonale
TOUR = "#93c5fd"
BORD_C = ORANGE_RETENUE


def patron_pyramide_n(n=6, a=0.6, h=1.0):
    """Pyramide à base régulière à n côtés (côté a, hauteur h) : la base, un triangle sur chaque côté."""
    base = regulier(n, a / (2 * np.sin(PI / n)))
    ap = a / (2 * np.tan(PI / n))
    s = np.sqrt(h ** 2 + ap ** 2)
    pieces = {"base": base}
    for i in range(n):
        p, q = np.array(base[i]), np.array(base[(i + 1) % n])
        m = (p + q) / 2
        apex = m + m / np.linalg.norm(m) * s
        pieces[f"t{i}"] = [tuple(p), tuple(apex), tuple(q)]
    par = {"base": None, **{f"t{i}": "base" for i in range(n)}}
    phi = np.degrees(np.arccos(-ap / s))
    return pieces, par, {f"t{i}": phi for i in range(n)}


# le faux patron du piège : une ligne de 4 et deux carrés côte à côte au-dessus (un bloc de 2 × 2) ;
# plié, f (relevé depuis a) arrive sur e (le fond de la boîte), et le devant reste ouvert
FAUX = ({"a": (0, 0), "fond": (1, 0), "c": (2, 0), "d": (3, 0), "e": (1, 1), "f": (0, 1)},
        {"fond": None, "a": "fond", "c": "fond", "d": "c", "e": "fond", "f": "a"})


def patron_tour(c=5.0, H=12.0):
    """La tour de Julia : 4 rectangles c × H en ligne, un carré sous le 2e (le sol, racine) et un
    au-dessus (le toit). Plié, la tour se tient DEBOUT sur son carré."""
    pieces = {f"r{i}": [(c * i, 0), (c * (i + 1), 0), (c * (i + 1), H), (c * i, H)] for i in range(4)}
    pieces["sol"] = [(c, -c), (2 * c, -c), (2 * c, 0), (c, 0)]
    pieces["toit"] = [(c, H), (2 * c, H), (2 * c, H + c), (c, H + c)]
    par = {"sol": None, "r1": "sol", "r0": "r1", "r2": "r1", "r3": "r2", "toit": "r1"}
    return pieces, par


class SolidesPatronCM2(PaysageSolidesCM2):
    nom_voix = "cm2-solides-patron"
    fichier_marques = "solides_patron_marques.json"
    ceinture = "verte"

    def _disposer_q(self, question, choix, phrase):
        """Comme au CM1 (14/11) : la colonne de la question part 0,4 plus à gauche et les cartes
        s'élargissent d'autant, la coche ne revient pas sur un choix long."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = 0.4
        for m in (tete, q, pause):
            m.shift(LEFT * d)
        for c in cartes:
            cadre, ligne = c[0], c[1]
            neuf = RoundedRectangle(width=cadre.width + d, height=cadre.height, corner_radius=0.14,
                                    stroke_color=cadre.get_stroke_color(), stroke_width=cadre.get_stroke_width(),
                                    fill_color=cadre.get_fill_color(), fill_opacity=cadre.get_fill_opacity())
            neuf.align_to(cadre, RIGHT).align_to(cadre, UP)
            cadre.become(neuf)
            ligne.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def choix2(self, lignes, fs=26):
        """Un choix long sur deux rangs (« un prisme / à base triangulaire »), posé d'un bloc."""
        g = VGroup(*[Text(s, font_size=fs, color=WHITE) for s in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        g._bloc = True
        return hors_audit(g)

    def plier_tout(self, pa, ordre, run_time=2.4, rt_tilt=0.7, pli=None):
        """ordre : les étapes (noms des pièces qui se plient ensemble) ; pli : les angles (90 sinon)."""
        pli = pli or {}
        self.play(pa.plier(tilt=0, run_time=rt_tilt))
        for etape in ordre:
            self.play(pa.plier({k: pli.get(k, 90) for k in etape}, run_time=run_time / len(ordre)))

    def bord(self, pa, nom, a, b, couleur=BORD_C, sw=10):
        """Le bord (a, b) de la pièce `nom` (coordonnées du patron), là où il est maintenant."""
        p, q = [pa._proj(pa._monde(nom, np.array([x, 0.0, z], dtype=float))) for x, z in (a, b)]
        return Line(p, q, color=couleur, stroke_width=sw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître un patron", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître un patron")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q0 = self.t("Quel solide va-t-il donner,", 40)
        gauche(q0, -6.2, 0.95)
        q1 = self.t("une fois plié ?", 40)
        gauche(q1, -6.2, 0.25)
        pc, par = patron_tente(0.9, 1.3)
        pa = PatronLibre(pc, par, e=0.75, centre=P(3.9, 0.6), couleur=TRI,
                         couleurs={"entree": "#fde68a", "fond": "#fde68a"})
        self.au_mot("Quel solide va-t-il donner")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(pa), run_time=0.45)
        self.au_mot("une fois plié")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.3)
        self.play(pa.plier(tilt=0, run_time=0.5))
        self.play(pa.plier(PLI_TENTE, run_time=1.2))
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        jp = julia(1.0).move_to(P(-5.0, 0.3))
        self.au_mot("Voici Julia")
        nom = self.t("Julia", 42, BLEU_CALCUL).next_to(jp, UP, buff=0.2)
        self.play(FadeIn(jp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est maquettiste")
        met = self.t("maquettiste", 30, BLEU_CALCUL).next_to(jp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        tour = pave(0.8, 1.9, 0.8, e=0.9, couleur=TOUR, couleur_trait="#1e3a8a")
        maison = prisme([(0, 0), (1.3, 0), (1.3, 0.8), (0.65, 1.35), (0, 0.8)], 1.3, couleur=CARTON,
                        couleur_trait="#78350f", e=0.9)
        pyr = pyramide(4, 1.3, 1.3, e=0.9, couleur="#fcd34d", couleur_trait="#78350f")
        bat = VGroup(tour, maison, pyr).arrange(RIGHT, buff=0.7, aligned_edge=DOWN).move_to(P(1.2, 1.55))
        self.au_mot("des maquettes de bâtiments en carton")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in bat], lag_ratio=0.25), run_time=0.8)
        self.au_mot("pour les architectes")
        arch = self.t("pour les architectes", 28, BLEU_CALCUL).next_to(bat, DOWN, buff=0.3)
        self.play(FadeIn(arch, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque bâtiment commence à plat")
        g = self.t("Chaque bâtiment commence à plat,", 32).move_to(P(1.0, -0.65))
        self.play(FadeIn(g, shift=UP * 0.1), run_time=0.35)
        self.au_mot("par un patron")
        g2 = self.t("par un patron.", 32, VERT_OK).next_to(g, DOWN, buff=0.15)
        self.play(FadeIn(g2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("quel patron donne quel solide")
        q = self.gros("Quel patron donne quel solide ?", couleur=JAUNE_TITRE, fs=32).move_to(P(0.6, -2.35))
        self.play(FadeIn(q, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.ecran("02-definition")
        pc, par, pli = patron_pave(1.3, 0.8, 0.55)
        pa = PatronLibre(pc, par, e=1.0, centre=P(-3.7, 0.4), couleur=CARTON)
        self.add(pa)
        x = -0.2
        self.au_mot("Un patron, c'est")
        tit = self.t("Un patron :", 46, JAUNE_TITRE)
        gauche(tit, x, 2.75)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("un dessin d'un seul morceau")
        l1 = self.t("un dessin d'un seul morceau", 30)
        gauche(l1, x, 1.85)
        bord = VGroup(*[pa.contour_carre(k, WHITE, 6) for k in pc])
        self.play(FadeIn(l1, shift=UP * 0.1), Create(bord), run_time=0.6)
        self.remove(bord)
        self.au_mot("découpé et plié")
        l2 = self.t("qui, découpé et plié,", 32)
        gauche(l2, x, 1.15)
        ch = pa.charnieres()
        self.play(FadeIn(l2, shift=UP * 0.1), Create(ch), run_time=0.45)
        self.au_mot("forme un solide")
        l3 = self.t("forme un solide,", 32, VERT_OK)
        gauche(l3, x, 0.45)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(ch), pa.plier(tilt=0, run_time=0.3), run_time=0.3)
        self.play(pa.plier({k: 90 for k in ("av", "ar", "g", "d")}, run_time=0.45))
        self.au_mot("sans trou")
        l4 = self.t("sans trou,", 32, VERT_OK)
        gauche(l4, x, -0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.2)
        self.au_mot("et sans face en double")
        l5 = self.t("et sans face en double.", 32, VERT_OK)
        gauche(l5, x, -1.05)
        self.play(FadeIn(l5, shift=UP * 0.1), pa.plier({"couv": 90}, run_time=0.4), run_time=0.4)
        self.play(Indicate(pa, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 03 : compter les faces, regarder leurs formes ───────────────────────
    def ecran_compter(self):
        self.ecran("03-compter")
        self.au_mot("on compte les faces et on regarde leurs formes")
        tit = self.t("On compte les faces et on regarde leurs formes", 34, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.45)
        # le pavé
        pc, par, pli = patron_pave(1.3, 0.8, 0.55)
        pv = PatronLibre(pc, par, e=0.8, centre=P(-4.7, 0.75), couleur=PA,
                         couleurs={"av": PB, "ar": PB, "g": PC, "d": PC})
        l1 = self.t("6 rectangles,", 26).move_to(P(-4.7, -1.15))
        l1b = self.t("par paires :", 26).next_to(l1, DOWN, buff=0.12)
        l1c = self.t("un pavé", 30, PA).next_to(l1b, DOWN, buff=0.12)
        self.au_mot("6 rectangles")
        self.play(FadeIn(pv), FadeIn(l1), run_time=0.35)
        self.au_mot("par paires")
        self.play(FadeIn(l1b), run_time=0.25)
        self.au_mot("un pavé")
        self.play(FadeIn(l1c, shift=UP * 0.1), pv.plier(tilt=0, run_time=0.3), run_time=0.3)
        self.play(pv.plier(pli, run_time=0.65))
        # la pyramide à base carrée
        pc, par, pli2 = patron_pyramide(0.9, 0.85)
        py = PatronLibre(pc, par, e=0.8, centre=P(-0.9, 0.75), couleur=TRI, couleurs={"base": PA})
        l2 = self.t("1 carré", 26).move_to(P(-0.9, -1.15))
        l2b = self.t("et 4 triangles autour :", 26).next_to(l2, DOWN, buff=0.12)
        l2c = self.t("une pyramide", 30, TRI).next_to(l2b, DOWN, buff=0.12)
        l2d = self.t("à base carrée", 30, TRI).next_to(l2c, DOWN, buff=0.1)
        self.au_mot("1 carré")
        self.play(FadeIn(py), FadeIn(l2), run_time=0.35)
        self.au_mot("et 4 triangles autour")
        self.play(FadeIn(l2b), run_time=0.25)
        self.au_mot("une pyramide")
        self.play(FadeIn(l2c, shift=UP * 0.1), py.plier(tilt=0, run_time=0.25), run_time=0.25)
        self.au_mot("à base carrée")
        self.play(FadeIn(l2d), py.plier(pli2, run_time=0.8), run_time=0.8)
        # le prisme (la tente)
        pc, par = patron_tente(0.8, 1.2)
        pr = PatronLibre(pc, par, e=0.8, centre=P(3.3, 0.75), couleur=LAT_C,
                         couleurs={"entree": BASE_C, "fond": BASE_C})
        l3 = self.t("2 triangles", 26).move_to(P(3.3, -1.15))
        l3b = self.t("et 3 rectangles :", 26).next_to(l3, DOWN, buff=0.12)
        l3c = self.t("un prisme", 30, LAT_C).next_to(l3b, DOWN, buff=0.12)
        self.au_mot("2 triangles")
        self.play(FadeIn(pr), FadeIn(l3), run_time=0.35)
        self.au_mot("et 3 rectangles")
        self.play(FadeIn(l3b), run_time=0.25)
        self.au_mot("un prisme")
        self.play(FadeIn(l3c, shift=UP * 0.1), pr.plier(tilt=0, run_time=0.4), run_time=0.4)
        self.play(pr.plier(PLI_TENTE, run_time=0.9))
        self.attendre_voix()

    # ── 04 : les longueurs ──────────────────────────────────────────────────
    def ecran_longueurs(self):
        self.ecran("04-longueurs")
        L, l, h = 1.4, 0.9, 0.6
        pc, par, pli = patron_pave(L, l, h)
        pa = PatronLibre(pc, par, e=0.95, centre=P(-3.8, 0.35), couleur=CARTON)
        self.add(pa)
        x = 0.4
        self.au_mot("Puis on vérifie les longueurs")
        tit = self.t("Puis on vérifie les longueurs.", 36, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.45)
        self.au_mot("Deux bords qui se collent")
        l1 = self.bloc(["Deux bords qui se collent", "ensemble doivent avoir"], 30, BORD_C)
        gauche(l1, x, 1.85)
        b1 = self.bord(pa, "g", (-h, l), (0, l))
        b2 = self.bord(pa, "ar", (0, l), (0, l + h))
        self.play(FadeIn(l1, shift=UP * 0.1), Create(b1), Create(b2), run_time=0.45)
        self.au_mot("la même longueur")
        l2 = self.t("la même longueur.", 30, BORD_C)
        gauche(l2, x, 1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(b1, color=WHITE), Indicate(b2, color=WHITE), run_time=0.4)
        self.play(FadeOut(b1), FadeOut(b2), pa.plier(tilt=0, run_time=0.3), run_time=0.3)
        self.play(pa.plier(pli, run_time=0.7))
        colle = self.bord(pa, "g", (-h, l), (0, l), sw=11)
        self.play(Create(colle), run_time=0.2)
        # le patron mal coupé : le couvercle trop court
        lc = l * 0.55
        pc2 = dict(pc)
        pc2["couv"] = [(0, l + h), (L, l + h), (L, l + h + lc), (0, l + h + lc)]
        mal = PatronLibre(pc2, par, e=0.95, centre=P(-3.8, 0.35), couleur=CARTON)
        self.au_mot("Sinon, la maquette bâille")
        l3 = self.t("Sinon, la maquette bâille :", 28, ROUGE_ERREUR)
        gauche(l3, x, 0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(pa), FadeOut(colle), FadeIn(mal), run_time=0.35)
        self.play(mal.plier(tilt=0, run_time=0.25))
        self.play(mal.plier(pli, run_time=0.6))
        trou = [mal._proj(np.array(p, dtype=float)) for p in ((0, h, 0), (L, h, 0), (L, h, l - lc), (0, h, l - lc))]
        tr = VGroup(Polygon(*trou, fill_color=ROUGE_ERREUR, fill_opacity=0.35, stroke_width=0),
                    DashedVMobject(Polygon(*trou, stroke_color=ROUGE_ERREUR, stroke_width=7), num_dashes=20))
        self.au_mot("il reste un trou")
        l4 = self.t("il reste un trou !", 32, ROUGE_ERREUR)
        gauche(l4, x, -0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(tr), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pc, par, pli = patron_pave(6, 4, 3)
        coul = {"fond": PA, "couv": PA, "av": PB, "ar": PB, "g": PC, "d": PC}
        pa = PatronLibre(pc, par, e=0.25, centre=P(-4.3, 1.35), couleur=PA, couleurs=coul)
        plats = {k: pa.piece(k) for k in pc}
        txt = {"fond": "6 × 4", "couv": "6 × 4", "av": "6 × 3", "ar": "6 × 3", "g": "4 × 3", "d": "4 × 3"}
        labs = {k: hors_audit(Text(v, font_size=20, color="#0f172a", weight=BOLD).move_to(pa.centre_carre(k)))
                for k, v in txt.items()}
        for k in ("g", "d"):
            labs[k].rotate(PI / 2)

        def avant_q(sc):
            for paire, ex in ((("fond", "couv"), "rectangles de 6 sur 4"), (("av", "ar"), "rectangles de 6 sur 3"),
                              (("g", "d"), "rectangles de 4 sur 3")):
                sc.au_mot(ex)
                sc.play(*[FadeIn(plats[k], scale=0.9) for k in paire], *[FadeIn(labs[k]) for k in paire],
                        run_time=0.3)

        def apres(sc):
            kw = dict(fs=26, y0=-1.4, pas=0.56)
            lg = sc.rep_bas(0, [("6 rectangles, en 3 paires :", VERT_OK)], **kw)
            sc.aux_extraits([lg[0]], ["6 rectangles, en 3 paires"])
            lg2 = sc.rep_bas(1, [("un pavé droit de", VERT_OK), ("6 cm", VERT_OK), ("sur 4", VERT_OK),
                                 ("sur 3.", VERT_OK)], buff=0.14, **kw)
            sc.au_mot("un pavé droit")
            sc.play(FadeIn(lg2[0]), *[FadeOut(m) for m in labs.values()], run_time=0.25)
            sc.remove(*plats.values())
            sc.add(pa)
            sc.aux_extraits(lg2[1:], ["6 centimètres", "4 sur 3", "3. Un"])
            sc.play(pa.plier(tilt=0, run_time=0.3))
            sc.play(pa.plier(pli, run_time=0.7))
            lg3 = sc.rep_bas(2, [("Un cube aurait 6 carrés pareils.", ORANGE_RETENUE)], **kw)
            sc.aux_extraits([lg3[0]], ["6 carrés"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Quel solide", "donne-t-il ?"],
                            [self.choix("un cube", fs=28), self.choix2(["un prisme à base", "triangulaire"]),
                             self.choix("un pavé droit", fs=28)], 2,
                            ["6 rectangles, en 3 paires :", "un pavé droit de 6 cm sur 4 sur 3.",
                             "Un cube aurait 6 carrés pareils."],
                            avant_q=avant_q, autres_r=apres)

    # ── 06 : le piège (6 faces ne suffisent pas) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Avoir 6 faces")
        l0 = self.t("Avoir 6 faces, ça ne suffit pas.", 34)
        gauche(l0, -6.2, 2.2)
        pa = Patron(cellules=FAUX[0], parents=FAUX[1], e=0.8, centre=P(-3.7, -0.1))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pa), run_time=0.4)
        x = 0.3
        self.au_mot("deux faces se retrouvent")
        l1 = self.bloc(["Deux faces l'une sur l'autre", "quand on plie :"], 28, ROUGE_ERREUR)
        gauche(l1, x, 1.05)
        self.play(FadeIn(l1, shift=UP * 0.1), pa.plier({"a": 90, "c": 90, "e": 90}, tilt=0, run_time=0.7), run_time=0.7)
        self.play(pa.plier({"d": 90, "f": 90}, run_time=0.5))
        dbl = VGroup(pa.contour_carre("e", ROUGE_ERREUR, 9), pa.contour_carre("f", ROUGE_ERREUR, 9))
        self.play(Create(dbl), run_time=0.25)
        self.au_mot("il en manque une ailleurs")
        l2 = self.t("il en manque une ailleurs.", 28, ROUGE_ERREUR)
        gauche(l2, x, 0.0)
        # la face de devant manque
        haut = [pa._proj(np.array(p, dtype=float)) for p in ((1, 0, 0), (2, 0, 0), (2, 1, 0), (1, 1, 0))]
        trou = DashedVMobject(Polygon(*haut, stroke_color=ROUGE_ERREUR, stroke_width=7), num_dashes=20)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(trou), run_time=0.45)
        self.au_mot("ce n'est pas un patron")
        l3 = self.t("Ce n'est pas un patron.", 32, ROUGE_ERREUR)
        gauche(l3, x, -0.75)
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.au_mot("Plie dans ta tête")
        g = self.gros("Plie dans ta tête, face après face.", couleur=VERT_OK, fs=30).move_to(P(-0.9, -2.5))
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pc, par, pli = patron_pyramide_n(6, 0.62, 1.0)
        pa = PatronLibre(pc, par, e=0.95, centre=P(-4.25, 1.25), couleur=TRI, couleurs={"base": HEX})
        plats = {k: pa.piece(k) for k in pc}

        def avant_q(sc):
            sc.au_mot("un hexagone au milieu")
            sc.play(FadeIn(plats["base"], scale=0.8), run_time=0.3)
            sc.au_mot("sur chacun de ses 6 côtés")
            sc.play(LaggedStart(*[FadeIn(plats[f"t{i}"], shift=UP * 0.05) for i in range(6)], lag_ratio=0.15),
                    run_time=0.7)

        def apres(sc):
            kw = dict(fs=26, y0=-1.3, pas=0.56)
            lg = sc.rep_bas(0, [("Une base, et des triangles", VERT_OK)], **kw)
            sc.aux_extraits([lg[0]], ["Une base, et des triangles"])
            lg1 = sc.rep_bas(1, [("qui se replient vers une pointe :", VERT_OK)], **kw)
            sc.au_mot("qui se replient")
            sc.remove(*plats.values())
            sc.add(pa)
            sc.play(pa.plier(tilt=0, run_time=0.35))
            sc.au_mot("vers une pointe")
            hors_audit(lg1)
            sc.play(FadeIn(lg1, shift=UP * 0.08), pa.plier(pli, run_time=0.85), run_time=0.85)
            lg2 = sc.rep_bas(2, [("une pyramide.", VERT_OK)], **kw)
            sc.aux_extraits([lg2[0]], ["une pyramide"])
            lg3 = sc.rep_bas(3, [("Sa base a", HEX), ("6 côtés :", HEX), ("hexagonale.", HEX)], buff=0.16, **kw)
            sc.aux_extraits(lg3, ["Sa base a", "6 côtés", "base hexagonale"])
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Quel solide", "donne-t-il ?"],
                            [self.choix2(["un prisme", "à base hexagonale"]), self.choix2(["une pyramide",
                                                                                          "à base hexagonale"]),
                             self.choix("un cylindre", fs=28)], 1,
                            ["Une base, et des triangles", "qui se replient vers une pointe :", "une pyramide.",
                             "Sa base a 6 côtés : hexagonale."],
                            avant_q=avant_q, autres_r=apres)

    # ── 08 : le défi (la tour) ──────────────────────────────────────────────
    def tour(self):
        pc, par = patron_tour()
        coul = {"sol": PC, "toit": PC}
        return PatronLibre(pc, par, e=0.19, centre=P(-2.8, -0.15), couleur=TOUR, couleurs=coul)

    def cotes_tour(self, pa):
        b5 = self.bord(pa, "r0", (0, 0), (5, 0), WHITE, 5)
        c5 = Text("5 cm", font_size=22, color=WHITE, weight=BOLD).next_to(b5, DOWN, buff=0.12)
        b12 = self.bord(pa, "r0", (0, 0), (0, 12), WHITE, 5)
        c12 = Text("12 cm", font_size=26, color=WHITE, weight=BOLD).next_to(b12, LEFT, buff=0.12)
        return c5, c12

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = self.tour()
        plats = {k: pa.piece(k) for k in pa.poly}
        x = 0.3
        self.au_mot("Julia dessine")
        l0 = self.bloc(["Julia dessine le patron", "d'une tour en pavé :"], 32)
        gauche(l0, x, 2.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        c5, c12 = self.cotes_tour(pa)
        l1 = self.ligne([("4 rectangles de", WHITE), ("5 cm", WHITE), ("sur 12,", WHITE)], 28, buff=0.14)
        gauche(l1, x, 0.95)
        self.au_mot("4 rectangles")
        self.play(LaggedStart(*[FadeIn(plats[f"r{i}"]) for i in range(4)], lag_ratio=0.15), FadeIn(l1[0]),
                  run_time=0.5)
        self.aux_extraits([VGroup(l1[1], c5), VGroup(l1[2], c12)], ["5 centimètres", "12, en"])
        self.au_mot("en ligne, et 2")
        l2 = self.t("en ligne, et 2 carrés.", 28)
        gauche(l2, x, 0.35)
        qm = VGroup(*[Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD).move_to(pa.centre_carre(k))
                      for k in ("sol", "toit")])
        hors_audit(qm)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(plats["sol"]), FadeIn(plats["toit"]), run_time=0.35)
        self.au_mot("Combien mesure")
        q = self.bloc(["Combien mesure", "le côté des carrés ?"], 36, JAUNE_TITRE)
        gauche(q, x, -0.85)
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(qm), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 28, ORANGE_RETENUE)
        gauche(pz, x, -2.0)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = self.tour()
        c5, c12 = self.cotes_tour(pa)
        hors_audit(VGroup(c5, c12))
        self.add(pa, c5, c12)
        x = 0.3
        self.au_mot("Les carrés ferment")
        l0 = self.bloc(["Les carrés ferment le haut", "et le bas de la tour."], 30, PC)
        gauche(l0, x, 2.1)
        cad = VGroup(pa.contour_carre("sol", PC, 8), pa.contour_carre("toit", PC, 8))
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cad), run_time=0.4)
        self.au_mot("Leurs bords se collent")
        l1 = self.bloc(["Leurs bords se collent aux", "petits côtés des rectangles,"], 28, BORD_C)
        gauche(l1, x, 0.85)
        petits = VGroup(*[self.bord(pa, f"r{i}", (5 * i, z), (5 * i + 5, z), BORD_C, 9) for i in range(4)
                          for z in (0, 12)])
        self.play(FadeIn(l1, shift=UP * 0.1), Create(petits), run_time=0.5)
        l2 = self.ligne([("qui mesurent", BORD_C), ("5 cm.", BORD_C)], 28, buff=0.14)
        gauche(l2, x, -0.05)
        self.aux_extraits(l2, ["qui mesurent", "5 centimètres. Les"])
        self.play(FadeOut(cad), FadeOut(petits), FadeOut(c5), FadeOut(c12), run_time=0.2)
        self.play(pa.plier(tilt=0, run_time=0.4))
        self.play(pa.plier({"r1": 90}, run_time=0.4))
        self.play(pa.plier({"r0": 90, "r2": 90}, run_time=0.4))
        self.play(pa.plier({"r3": 90, "toit": 90}, run_time=0.5))
        g = self.gros("Côté des carrés : 5 cm", couleur=VERT_OK, fs=30)
        gauche(g, x - 0.1, -1.05)
        self.aux_extraits([g], ["5 centimètres de côté"])
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pc, par = patron_tente(0.75, 1.1)
        pa = PatronLibre(pc, par, e=0.85, couleur=LAT_C, couleurs={"entree": BASE_C, "fond": BASE_C})
        lignes = self.finale_gauche(pa, textes=[
            ("On compte les faces,", "on regarde leurs formes."),
            ("Les bords qui se collent", "ont la même longueur."),
            ("Puis on plie dans sa tête.",)],
            fs=30, x_fig=-4.9, xl=-2.6)
        pa.recaler()
        self.add(pa)
        self.au_mot("on compte les faces")
        self.montrer_ligne(lignes[0])
        self.au_mot("les bords qui se collent")
        self.montrer_ligne(lignes[1])
        self.play(pa.plier(tilt=0, run_time=0.5))
        self.au_mot("Puis on plie dans sa tête")
        self.montrer_ligne(lignes[2])
        self.play(pa.plier(PLI_TENTE, run_time=1.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_compter()
        self.ecran_longueurs()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
