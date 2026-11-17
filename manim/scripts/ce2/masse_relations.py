# masse_relations.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 02 : les relations entre les unités
# (micro ce2_masse_relations, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (jaune) : film Ti Margo (le sac de riz « 1 kg 200 g » lu « 1 200 kg »).
# Décor et métier : Emma, TORRÉFACTRICE de café (grains, paquets de 250 g et de 500 g, le camion de grains).
# Mapping micro → écrans : 02 (1 kg = 1 000 g : 4 paquets de 250 g sur la balance), 03 (un demi-kilogramme = 500 g),
# 04 question (½ kg = ? g), 05 (1 kg 200 g = 1 200 g), 06 (1 t = 1 000 kg : 2 t = 2 000 kg),
# 07 question (2 kg 50 g = 2 050 g, pas 250 g), 08 défi (3 kg en paquets de 500 g), 08b correction, 09 ce que tu as appris.
# Voix : manim/voix/ce2-masse-relations.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:relations
# Mots sans marque, repérés dans le WAV (début du son, 17/11) : 02 « 250, » 6,98 s ; 05 « 1 000 plus » 6,46 s ;
# 07b « 2 000 plus » 3,96 s ; 09 « 1 tonne » 5,20 s.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_relations.py MasseRelationsCE2
# Sortie : manim/sorties/ce2/maths/masse/02-relations/eleveai-maths-ce2-masse-relations.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-relations"]
Q1, Q2 = EP["questions"]
CAFE = "#a16207"
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
KRAFT = "#b45309"


def court(s):
    return s[0].upper() + s[1:]


def emma_torref(s=1.0):
    """Emma, torréfactrice : tablier marron café, foulard rouge dans les cheveux."""
    p = visage(personne(peau="#e0ac69", tenue="#f5f5f4", cheveux="#78350f", longs=True, s=s))
    p.add(tablier(p, "#78350f"))
    c, r = p.tete.get_center(), p.tete.width / 2
    foulard = Ellipse(width=r * 2.25, height=r * 0.6, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    foulard.move_to(c + UP * r * 0.8)
    p.add(foulard)
    return p


def grain(s=1.0, couleur="#7c2d12"):
    """Un grain de café : un ovale brun fendu au milieu."""
    o = Ellipse(width=0.32 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1, stroke_color="#451a03",
                stroke_width=1.5)
    fente = ArcBetweenPoints(o.get_left() + RIGHT * 0.05 * s, o.get_right() + LEFT * 0.05 * s, angle=0.6,
                             color="#fde68a", stroke_width=1.5)
    return VGroup(o, fente)


def tas_grains(s=1.0, n=3):
    """Un petit tas de grains de café (n rangées en pyramide)."""
    g = VGroup()
    for r in range(n):
        for k in range(n - r):
            g.add(grain(s).rotate(0.4 * ((k + r) % 3 - 1)).move_to(P((k - (n - r - 1) / 2) * 0.3 * s, r * 0.18 * s)))
    return g


def paquet_cafe(texte="250 g", s=1.0):
    """Un paquet de café kraft, rabat plié en haut, grain dessiné, étiquette (« 250 g »)."""
    corps = Rectangle(width=0.8 * s, height=1.05 * s, fill_color=KRAFT, fill_opacity=1, stroke_color="#78350f",
                      stroke_width=2)
    rabat = Polygon(corps.get_corner(UL), corps.get_corner(UR), corps.get_corner(UR) + P(-0.08 * s, 0.18 * s),
                    corps.get_corner(UL) + P(0.08 * s, 0.18 * s), fill_color="#92400e", fill_opacity=1,
                    stroke_color="#78350f", stroke_width=2)
    gr = grain(1.1 * s, "#451a03").move_to(corps.get_center() + UP * 0.22 * s)
    g = VGroup(corps, rabat, gr)
    if texte:
        et = hors_audit(Text(texte, font_size=int(22 * s), color=WHITE, weight=BOLD)).move_to(corps.get_center() + DOWN * 0.22 * s)
        if et.width > corps.width * 0.9:
            et.scale_to_fit_width(corps.width * 0.9)
        g.add(et)
    return g


def sac_cafe(texte=None, s=1.0):
    """Un gros sac de toile de grains de café (des grains qui dépassent)."""
    g = sac(texte, s, "#d6b98c")
    for k, dx in enumerate((-0.12, 0.0, 0.12)):
        g.add(grain(0.55 * s).move_to(g[0].get_top() + P(dx * s, 0.05 * s + 0.02 * k)))
    return g


def camion_m(s=1.0, texte=None):
    """Un camion de livraison : caisse brune (étiquette), cabine orange, deux roues."""
    caisse = RoundedRectangle(width=2.6 * s, height=1.3 * s, corner_radius=0.08 * s, fill_color="#78350f", fill_opacity=1,
                              stroke_color="#451a03", stroke_width=3)
    cabine = RoundedRectangle(width=0.95 * s, height=0.95 * s, corner_radius=0.12 * s, fill_color="#f97316",
                              fill_opacity=1, stroke_width=0)
    cabine.next_to(caisse, RIGHT, buff=0.05 * s).align_to(caisse, DOWN)
    vitre = Rectangle(width=0.42 * s, height=0.34 * s, fill_color="#bfdbfe", fill_opacity=1, stroke_width=0)
    vitre.move_to(cabine.get_corner(UR) + P(-0.27 * s, -0.25 * s))
    roues = VGroup(*[Circle(radius=0.24 * s, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, caisse.get_bottom()[1] - 0.08 * s))
                     for x in (caisse.get_left()[0] + 0.55 * s, cabine.get_center()[0])])
    g = VGroup(caisse, cabine, vitre, roues)
    if texte:
        g.add(hors_audit(Text(texte, font_size=int(40 * s), color=WHITE, weight=BOLD)).move_to(caisse))
    return g


def ardoise2(lignes, s=1.0):
    """Une ardoise d'élève (cadre bois) : ce qu'il a écrit, sur plusieurs lignes ([1] = les lignes)."""
    t = VGroup(*[hors_audit(Text(l, font_size=int(32 * s), color=WHITE)) for l in lignes]).arrange(DOWN, buff=0.15 * s)
    fond = RoundedRectangle(width=t.width + 0.6 * s, height=t.height + 0.5 * s, corner_radius=0.08 * s, fill_color="#1f3b2c",
                            fill_opacity=1, stroke_color=BOIS, stroke_width=8)
    return VGroup(fond, t.move_to(fond))


class MasseRelationsCE2Base(MasseEstimerCPBase):
    nom_voix = "ce2-masse-relations"
    fichier_marques = "masse_relations_marques.json"
    ceinture = "jaune"

    def morceaux(self, l, mots, run_time=0.3):
        """Montre les morceaux d'une ligne(), chacun à SON mot (un nombre à l'instant où la voix le dit)."""
        for m, mot in zip(l, mots):
            if mot is not None:
                self.au_t(mot) if isinstance(mot, (int, float)) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les relations entre les unités", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les relations")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        l0 = base_commune(self.ligne([("1 kg 200 g,", JAUNE_TITRE)], 40))
        l1 = base_commune(self.ligne([("c'est combien", WHITE), ("de grammes ?", C_G)], 40, buff=0.22))
        q = VGroup(l0, l1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        f = sac_cafe(None, 1.5).move_to(P(4.0, 0.5))
        self.au_mot("1 kilogramme 200")
        self.play(FadeIn(l0, shift=UP * 0.2), FadeIn(f, shift=DOWN * 0.2), run_time=0.45)
        self.morceaux(l1, ["c'est combien", "de grammes"])
        self.attendre_voix(marge=0.6)

    # ── 01 : Emma, torréfactrice ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = emma_torref(0.95).move_to(P(-5.0, 0.0))
        nom = self.t("Emma", 42, CAFE).next_to(pe, UP, buff=0.3)
        self.au_mot("Voici Emma")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("torréfactrice", 26, CAFE).next_to(pe, DOWN, buff=0.15)
        l0 = VGroup(self.t("Elle grille les", 34, GRAY_B), self.t("grains de café.", 34, GRAY_B))
        self.col(l0[0], 2.4, -2.9)
        self.col(l0[1], 1.8, -2.9)
        self.au_mot("Elle est torréfactrice")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        tas = tas_grains(1.6, 4).move_to(P(-1.4, -1.0))
        self.au_mot("elle grille")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("grains de café")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(tas, shift=DOWN * 0.2), run_time=0.35)
        pq = VGroup(*[paquet_cafe(None, 1.2) for _ in range(3)]).arrange(RIGHT, buff=0.3).move_to(P(2.6, -0.9))
        l1 = self.t("Puis elle les met en paquets.", 34, JAUNE_TITRE)
        self.col(l1, -2.6, -2.9)
        self.au_mot("Puis elle")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("en paquets")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pq], lag_ratio=0.3), run_time=0.7)
        self.attendre_voix()

    # ── 02 : 1 kg = 1 000 g (4 paquets de 250 g) ───────────────────────────
    def ecran_mille(self):
        self.ecran("02-mille")
        l0 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 54, buff=0.25))
        l0.move_to(P(0, 2.9))
        self.morceaux(l0, ["1 kilogramme", "1 000 grammes"])
        bal = balance_electronique("0 g", 2.0).move_to(P(-2.4, -1.9))
        l1 = base_commune(self.ligne([("4 paquets", GRAY_B), ("de 250 g", GRAY_B)], 34, buff=0.18))
        gauche(l1, -6.0, 1.6)
        self.au_mot("Emma remplit")
        self.play(FadeIn(bal, shift=UP * 0.2), run_time=0.35)
        self.morceaux(l1, ["4 paquets", "de 250"])
        pq = [paquet_cafe("250 g", 1.15) for _ in range(4)]
        y0 = bal.plateau.get_top()[1]
        for k, p in enumerate(pq):
            p.move_to(P(-4.55 + k * 1.45, 0)).align_to(P(0, y0 + 0.02), DOWN)
        tot = ["250 g", "500 g", "750 g", "1 000 g"]
        mots = [6.98, "500,", "750,", "1 000 :"]
        cumul = VGroup()
        for k in range(4):
            self.au_t(mots[k]) if isinstance(mots[k], float) else self.au_mot(mots[k])
            n = self.t(tot[k].replace(" g", ""), 32, JAUNE_TITRE)
            n.next_to(pq[k], UP, buff=0.2)
            for f in n.get_family():
                f.sans_synchro = True
                if k == 0:  # le « 250 » redit (énumération) : montré à son instant WAV, l'audit l'apparie au 1er
                    f._pas_audit = True
            cumul.add(n)
            self.play(FadeIn(pq[k], shift=DOWN * 0.5), Transform(bal.affichage, afficher(bal, tot[k], 2.0)),
                      FadeIn(n, scale=1.1), run_time=0.35)
        res = base_commune(self.ligne([("1 000 g", C_G), ("= 1 kg", C_KG)], 46, buff=0.22))
        res.move_to(P(3.6, -0.6))
        self.au_t(11.30)  # « 1 kilogramme de café » : sans marque, début lu dans le WAV
        self.play(FadeIn(res, shift=UP * 0.1), run_time=0.35)
        self.insister(res, 1.12, 0.3)
        self.attendre_voix()

    # ── 03 : un demi-kilogramme = 500 g ─────────────────────────────────────
    def ecran_demi(self):
        self.ecran("03-demi")
        tit = self.t("Un demi-kilogramme", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Un demi")
        self.play(Write(tit), run_time=0.5)
        L, H, y = 8.0, 0.9, 1.0
        barre = Rectangle(width=L, height=H, fill_color=KRAFT, fill_opacity=0.35, stroke_color=WHITE, stroke_width=3)
        barre.move_to(P(-0.6, y))
        et = self.t("1 000 g", 36, C_G).move_to(barre)
        self.au_mot("la moitié")
        self.play(FadeIn(barre), run_time=0.3)
        self.au_mot("1 000 grammes")
        self.play(FadeIn(et, scale=1.1), run_time=0.3)
        g = Rectangle(width=L / 2, height=H, fill_color=CAFE, fill_opacity=0.9, stroke_color=WHITE, stroke_width=3)
        g.align_to(barre, LEFT).align_to(barre, DOWN)
        d = g.copy().align_to(barre, RIGHT).set_fill(KRAFT, 0.35)
        cinq = VGroup(self.t("500 g", 36, WHITE).move_to(g), self.t("500 g", 36, GRAY_B).move_to(d))
        for f in cinq[1].get_family():
            f._pas_audit = True
        res = base_commune(self.ligne([("½ kg", C_KG), ("= 500 g", C_G)], 54, buff=0.25))
        res.move_to(P(-0.6, -1.3))
        self.au_mot("500 grammes")
        self.play(FadeOut(et), FadeIn(g), FadeIn(d), FadeIn(cinq), FadeIn(res, shift=UP * 0.1), run_time=0.4)
        self.insister(res, 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un demi-kilogramme = ? g) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pq = VGroup(paquet_cafe("½ kg", 1.5)).move_to(P(-4.6, 2.0))

        def avant_q(sc):
            sc.play(FadeIn(pq, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(pq, color=VERT_OK, scale_factor=1.15), run_time=0.3)

        self._ph_mots = {(0, 0): "La moitié", (1, 0): "500. Un", (2, 0): "Un demi-kilogramme", (2, 1): "c'est 500 grammes"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Un demi-kilogramme,", "c'est combien", "de grammes ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["La moitié de 1 000,", "c'est 500.", "½ kg = 500 g"],
                             0.0, couper={2: ("½ kg =", "500 g")},
                             mot_q="Un demi", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 05 : 1 kg 200 g = 1 200 g ───────────────────────────────────────────
    def ecran_kg_et_g(self):
        self.ecran("05-kg-et-g")
        s_ = sac_cafe("1 kg 200 g", 2.1).move_to(P(-4.4, 0.9))
        self.au_mot("Un sac")
        self.play(FadeIn(s_, shift=DOWN * 0.3), run_time=0.4)
        l0 = base_commune(self.ligne([("1 kg", C_KG), ("200 g", C_G)], 52, buff=0.3))
        gauche(l0, -1.6, 2.4)
        self.morceaux(l0, ["1 kilogramme 200", "200 grammes."])
        l1 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 46, buff=0.25))
        gauche(l1, -1.6, 0.9)
        self.morceaux(l1, ["1 kilogramme,", "1 000 grammes"])
        l2 = base_commune(self.ligne([("1 000 + 200", WHITE), ("= 1 200 g", JAUNE_TITRE)], 46, buff=0.25))
        gauche(l2, -1.6, -0.7)
        for f in l2[0].get_family():
            f.sans_synchro = True
        self.morceaux(l2, [6.46, "1 200 grammes"])
        bilan = base_commune(self.ligne([("1 kg 200 g", C_KG), ("= 1 200 g", JAUNE_TITRE)], 42, buff=0.25))
        gauche(bilan, -1.6, -2.1)
        for f in bilan.get_family():
            f.sans_synchro = True
        self.play(FadeIn(bilan, shift=UP * 0.1), run_time=0.35)
        self.insister(bilan, 1.1, 0.3)
        self.attendre_voix()

    # ── 06 : la tonne (1 t = 1 000 kg ; 2 t = 2 000 kg) ─────────────────────
    def ecran_tonne(self):
        self.ecran("06-tonne")
        tit = self.t("Même idée pour la tonne", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Même idée")
        self.play(Write(tit), run_time=0.5)
        l0 = base_commune(self.ligne([("1 t", C_T), ("= 1 000 kg", C_KG)], 54, buff=0.25))
        l0.move_to(P(0, 1.7))
        self.morceaux(l0, ["1 tonne,", "1 000 kilogrammes"])
        cam = camion_m(1.25, "2 t").move_to(P(-3.3, -0.9))
        self.au_mot("Le camion")
        self.play(FadeIn(cam, shift=LEFT * 0.8), run_time=0.5)
        l1 = base_commune(self.ligne([("2 t", C_T), ("= 2 000 kg", C_KG)], 54, buff=0.25))
        gauche(l1, 0.6, -0.9)
        self.morceaux(l1, ["2 tonnes", "2 000 kilogrammes"])
        self.insister(l1, 1.12, 0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (2 kg 50 g, c'est 250 g ?) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ar = ardoise2(["2 kg 50 g", "= 250 g"]).move_to(P(-5.25, 2.0))
        fig = VGroup(ar)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            croix = Cross(ar[1][1], stroke_color=LOURD, stroke_width=6)
            sc.play(Create(croix), run_time=0.3)

        self.fs_choix, self.decal_q, self.elargir_q = 22, 2.6, 2.1  # choix longs (« Non, c'est 2 050 grammes »)
        self._ph_mots = {(0, 0): "2 kilogrammes,", (0, 1): "c'est 2 000", (1, 0): 3.96, (2, 0): "2 050 grammes"}
        self.question_gauche("07-question", "07b-reponse",
                             ["Un élève écrit :", "2 kg 50 g = 250 g.", "A-t-il raison ?"],
                             [self.choix(court(c_), fs=22) for c_ in Q2["choix"]], Q2["reponse"],
                             ["2 kg = 2 000 g,", "2 000 + 50 =", "2 050 g."],
                             -0.4, couper={0: ("2 kg =", "2 000 g,")},
                             mot_q="Un élève", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    # ── 08 : le défi (3 kg en paquets de 500 g) ────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        s_ = sac_cafe("3 kg", 1.8).move_to(P(-4.6, 0.7))
        l0 = self.t("Emma a 3 kg de café.", 38, WHITE)
        gauche(l0, -2.6, 1.8)
        self.au_mot("Emma a")
        self.play(FadeIn(s_, shift=DOWN * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        pq = paquet_cafe("500 g", 1.4).move_to(P(4.9, 1.6))
        l1 = self.t("Paquets de 500 g.", 38, WHITE)
        gauche(l1, -2.6, 0.9)
        self.au_mot("Elle fait")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pq, shift=DOWN * 0.2), run_time=0.35)
        l2 = self.t("Combien de paquets ?", 40, JAUNE_TITRE)
        gauche(l2, -2.6, -0.4)
        self.au_mot("Combien de paquets")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -2.3)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        l0 = base_commune(self.ligne([("3 kg", C_KG), ("= 3 000 g", C_G)], 46, buff=0.25))
        gauche(l0, -6.0, 2.1)
        self.morceaux(l0, ["3 kilogrammes,", "3 000 grammes"])
        xs = (-3.6, 0.0, 3.6)
        groupes = []
        for x in xs:
            g = VGroup(paquet_cafe("500 g", 1.4), paquet_cafe("500 g", 1.4)).arrange(RIGHT, buff=0.18)
            g.move_to(P(x, 0.35))
            acc = Brace(g, DOWN, color=GRAY_B)
            kg = self.t("1 kg", 34, C_KG).next_to(acc, DOWN, buff=0.12)
            for f in kg.get_family():
                f._pas_audit = True
            groupes.append((g, acc, kg))
        l1 = self.t("2 paquets = 1 kg", 36, WHITE)
        gauche(l1, 1.0, 2.1)
        self.au_mot("Il faut 2")
        self.play(FadeIn(groupes[0][0], shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("pour 1 kilogramme")
        self.play(FadeIn(l1, shift=UP * 0.1), GrowFromCenter(groupes[0][1]), FadeIn(groupes[0][2]), run_time=0.35)
        self.au_mot("Pour 3 kilogrammes")
        self.play(*[FadeIn(m, shift=DOWN * 0.3) for g in groupes[1:] for m in g], run_time=0.5)
        res = self.t("6 paquets !", 50, JAUNE_TITRE).move_to(P(0, -2.25))
        self.au_mot("6 paquets")
        self.play(FadeIn(res, scale=1.2), run_time=0.35)
        self.insister(res, 1.15, 0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fig = VGroup(paquet_cafe("1 kg", 1.5), camion_m(0.8, "1 t")).arrange(RIGHT, buff=0.5, aligned_edge=DOWN)
        fig.move_to(P(-4.1, 0.1))
        self.add(fig)
        l0 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 48, buff=0.25))
        l1 = base_commune(self.ligne([("1 t", C_T), ("= 1 000 kg", C_KG)], 48, buff=0.25))
        gauche(l0, -1.3, 0.9)
        gauche(l1, -1.3, -0.6)
        self.morceaux(l0, ["1 kilogramme,", "1 000 grammes"])
        self.morceaux(l1, [5.20, "1 000 kilogrammes"])
        self.insister(VGroup(l0, l1), 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_mille()
        self.ecran_demi()
        self.ecran_question1()
        self.ecran_kg_et_g()
        self.ecran_tonne()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class MasseRelationsCE2(MasseRelationsCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
