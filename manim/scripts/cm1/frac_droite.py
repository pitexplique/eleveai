# frac_droite.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 03 : PLACER UNE
# FRACTION SUR UNE DROITE GRADUÉE (micro du coach : fraction_droite, dans les
# DEUX classes), AVEC VOIX. Paysage 16:9. CEINTURES : CM1 VERTE (la notion
# complète : partager l'unité, avancer, lire un point, compter les PARTS pas
# les traits, le milieu, après 1, défi corrigé) ; CM2 JAUNE (rappel de CM1).
# Short jumeau : frac_droite_short.py (la fusée vers la Lune, blanche).
#
# Décor et métier : la PISCINE ; Salomé, MAÎTRE-NAGEUSE, entraîne Tom : la
# longueur du bassin va de 0 à 1, 4 parts (bouées) ; Tom à 3/4 ; le milieu
# 2/4 = 1/2 (PRÉPARE les fractions égales) ; après 1 : 6/4 ; défi : 5/8 (il a
# passé la moitié, 4/8). Aucune donnée du monde réel citée. Centres : sport.
# Vérifié (Python) : 2/4 = 1/2 ; 4/4 = 1 ; 6/4 > 1 ; 3/3 = 1 < 4/3 ; 5/8 > 4/8.
#
# Micro → écrans (banques cm1/…-gabarits-b.ts tpl_141-146, cm2/…-droite.ts) :
# placer n/d (02, tpl_144 / tpl_1), compter les intervalles pas les traits
# (03, tpl_142 / tpl_7), lire un point (QUESTION 1 : leurres 2/6 = les traits,
# 5/2 = l'inversion), le milieu (05, tpl_145 / tpl_8), au-delà de 1 (06,
# tpl_146 / tpl_3), avant / sur / après 1 (QUESTION 2, tpl_9), défi (08).
# Écrans : 00 garde · 01 Salomé et Tom · 02 la méthode · 03 le piège ·
# 04 QUESTION 1 · 05 le milieu · 06 après 1 · 07 QUESTION 2 · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM) ; canvas_fractions.py (Droite, non modifié).
# Voix : manim/voix/cm-frac-droite.json (débit −10) ; marques : frac_droite_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_droite.py FracDroiteCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_droite.py FracDroiteCM1 -o eleveai-maths-cm1-frac-droite --media_dir manim/scripts/cm1/media-frac-droite
# CM2 : garde seule (GARDE_SEULE=1, classe FracDroiteCM2) puis frac_cm_commun.py coller.
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/03-droite/eleveai-maths-{cm1,cm2}-frac-droite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

EAU, BOUEE = "#0ea5e9", "#ef4444"
XD, LD = -2.75, 6.2     # le centre et la longueur des droites


def maitre_nageuse(s=0.85):
    p = personne(peau="#e0ac69", tenue="#dc2626", cheveux="#78350f", longs=True, s=s)
    c = p.corps.get_top() + DOWN * 0.3 * s
    cordon = Line(c + LEFT * 0.25 * s, c + DOWN * 0.45 * s + RIGHT * 0.1 * s, color=WHITE, stroke_width=3)
    sifflet = RoundedRectangle(width=0.22 * s, height=0.14 * s, corner_radius=0.04, fill_color="#facc15",
                               fill_opacity=1, stroke_width=0).move_to(cordon.get_end())
    p.add(cordon, sifflet)
    return p


def nageur(s=0.5):
    tete = Circle(radius=0.25, fill_color="#c68642", fill_opacity=1, stroke_width=0)
    bonnet = AnnularSector(inner_radius=0, outer_radius=0.27, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(P(0, 0.1))
    bras = Arc(radius=0.45, start_angle=PI * 0.15, angle=PI * 0.6, color="#c68642", stroke_width=8).move_to(P(0.2, 0.25))
    return VGroup(bras, tete, bonnet).scale(s / 0.5)


def droite(n, b=1, centre=P(XD, 0.0), longueur=LD, ets=None):
    e = ets if ets is not None else {v: str(v) for v in range(b + 1)}
    d = Droite(0, b, n * b, etiquettes=e, longueur=longueur, centre=centre)
    pas_audit(d)
    return d


def bonds(dr, i0, i1, couleur=AMBRE):
    """Les bonds (flèches courbes) de la graduation i0 à i1 (indices de traits)."""
    out = VGroup()
    for i in range(i0, i1):
        a = dr.ticks[i].get_top() + UP * 0.05
        b = dr.ticks[i + 1].get_top() + UP * 0.05
        out.add(CurvedArrow(a, b, angle=-PI / 2.2, color=couleur, stroke_width=5, tip_length=0.16))
    return out


def numeros(dr, i0, i1, couleur=VERT_OK, fs=28, dy=0.5):
    """Un numéro au-dessus de chaque part (intervalle) de i0 à i1."""
    out = VGroup()
    for k, i in enumerate(range(i0, i1)):
        m = (dr.ticks[i].get_center() + dr.ticks[i + 1].get_center()) / 2
        out.add(Text(str(k + 1), font_size=fs, color=couleur, weight=BOLD).move_to(m + UP * dy))
    return pas_audit(out)


class FracDroiteBase(PaysageCM):
    nom_voix = "cm-frac-droite"
    fichier_marques = "frac_droite_marques.json"
    XL = 1.7

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_methode, self.ecran_piege,
                self.ecran_question1, self.ecran_milieu, self.ecran_apres, self.ecran_question2, self.ecran_defi,
                self.ecran_correction, self.ecran_finale]

    def sous_bond(self, txt, m, dr):
        """« 2 quarts » écrit sur deux lignes (« 2 » / « quarts ») sous la carte,
        à l'aplomb de sa part : jamais collé au voisin."""
        n, mot = txt.split(" ", 1)
        g = VGroup(self.inline(n, 28, AMBRE), self.inline(mot, 24, AMBRE)).arrange(DOWN, buff=0.06)
        return g.move_to(P(m[0], dr.carte.get_bottom()[1] - 0.45))

    def mots_bonds(self, dr, mots, i0=0, labels=None, dy=0.75):
        """Un bond par mot de la voix ; labels : le texte posé au-dessus de chaque bond."""
        bs = bonds(dr, i0, i0 + len(mots))
        tx = VGroup()
        for k, (b, mot) in enumerate(zip(bs, mots)):
            self.au_nb(mot) if any(c.isdigit() for c in mot) else self.au_mot(mot)
            an = [Create(b)]
            if labels:
                m = (dr.ticks[i0 + k].get_center() + dr.ticks[i0 + k + 1].get_center()) / 2
                t = self.sous_bond(labels[k], m, dr)
                tx.add(t)
                an.append(FadeIn(t, shift=UP * 0.1))
            self.play(*an, run_time=0.35)
        return bs, tx

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Placer une fraction sur une droite", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Placer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        dr = droite(4, centre=P(1.2, 0.0), longueur=6.0)
        self.au_mot("droite graduée")
        self.play(FadeIn(dr), run_time=0.5)
        f = EcritureFraction(3, 4, fs=100).move_to(P(-4.4, 0.3))
        self.au_nb("Où se trouve 3")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        q = Text("?", font_size=90, color=ORANGE_TROU).move_to(dr.p(0.5) + UP * 1.0)
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.play(q.animate.move_to(dr.p(0.25) + UP * 1.0), run_time=0.4)
        self.play(q.animate.move_to(dr.p(0.75) + UP * 1.0), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Salomé, maître-nageuse ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = maitre_nageuse(0.85).move_to(P(-5.3, -1.75))
        self.au_mot("Voici Salomé")
        nom = self.t("Salomé", 34, BLEU_CALCUL).next_to(pers, RIGHT, buff=0.3).shift(UP * 0.4)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        metier = self.t("maître-nageuse", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.15).align_to(nom, LEFT)
        self.au_mot("maître-nageuse")
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        x0, x1 = -5.9, 0.9
        bassin = RoundedRectangle(width=x1 - x0 + 0.5, height=1.7, corner_radius=0.15, fill_color=EAU,
                                  fill_opacity=0.85, stroke_color=WHITE, stroke_width=4).move_to(P((x0 + x1) / 2, 1.3))
        bords = VGroup(*[Line(P(x, 0.45), P(x, 2.15), color=WHITE, stroke_width=8) for x in (x0, x1)])
        tom = nageur(0.55).move_to(P(x0 + 0.85, 1.15))
        nt = self.t("Tom", 30, JAUNE_TITRE).next_to(tom, UP, buff=0.08)
        self.au_mot("Elle entraîne Tom")
        self.play(FadeIn(bassin), FadeIn(bords), FadeIn(tom), FadeIn(nt), run_time=0.5)
        z = self.inline("0", 40).next_to(bords[0], DOWN, buff=0.15)
        u = self.inline("1", 40).next_to(bords[1], DOWN, buff=0.15)
        self.au_nb("bord, 0")
        self.play(FadeIn(z, scale=1.4), Indicate(bords[0], color=AMBRE), run_time=0.4)
        self.au_nb("bord, 1")
        self.play(FadeIn(u, scale=1.4), Indicate(bords[1], color=AMBRE), run_time=0.4)
        bouees = VGroup(*[VGroup(*[Circle(radius=0.09, fill_color=BOUEE if j % 2 else WHITE, fill_opacity=1,
                                          stroke_width=0).move_to(P(x0 + (x1 - x0) * i / 4, 0.6 + j * 0.2))
                                   for j in range(8)]) for i in (1, 2, 3)])
        self.au_mot("Des bouées")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in bouees], lag_ratio=0.25), run_time=0.7)
        l1 = self.col(self.inline("4 parts égales", 40, AMBRE), 1.6)
        self.au_nb("en 4")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.35)
        l2 = self.col(self.inline("Tom : 3 quarts", 40, JAUNE_TITRE), 0.6)
        self.au_nb("aux 3")
        self.play(VGroup(tom, nt).animate.move_to(P(x0 + (x1 - x0) * 0.75, 1.45)), FadeIn(l2, shift=RIGHT * 0.2),
                  run_time=0.9)
        self.au_mot("Où est-il")
        q = self.col(self.t("Où est-il ?", 42, ORANGE_RETENUE), -0.4)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : la méthode (3/4) ───────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        dr1 = droite(1, centre=P(XD, 0.3))
        self.add(dr1)
        f = EcritureFraction(3, 4, fs=90).move_to(P(3.6, 1.75))
        self.au_mot("On part de 0")
        self.play(Indicate(dr1.etiquettes[0], color=AMBRE, scale_factor=1.6), run_time=0.5)
        self.au_nb("dénominateur, 4")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), run_time=0.35)
        dr, anim = dr1.graduer(4, run_time=0.7)
        l1 = self.col(self.inline("4 parts égales", 36, AMBRE), -0.15)
        self.au_nb("en 4")
        self.play(anim, FadeIn(l1, shift=RIGHT * 0.15))
        nums = numeros(dr, 0, 4, AMBRE)
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.2), run_time=0.6)
        self.au_nb("c'est 1")
        u = self.inline("1 part = 1 quart", 34).next_to(l1, DOWN, buff=0.25).align_to(l1, LEFT)
        self.play(FadeIn(u, shift=RIGHT * 0.15), Indicate(nums[0], color=WHITE, scale_factor=1.6), run_time=0.4)
        self.au_nb("numérateur, 3")
        self.play(FadeOut(nums), FadeIn(f.num, scale=1.4), run_time=0.35)
        l2 = self.col(self.inline("on avance de 3 parts", 34, JAUNE_TITRE), -1.45)
        self.au_nb("avance de 3")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.3)
        self.mots_bonds(dr, ["parts. 1", "quart, 2"], labels=["1 quart", "2 quarts"])
        pt = dr.point(0.75, (3, 4))
        b3 = bonds(dr, 2, 3)[0]
        m3 = (dr.ticks[2].get_center() + dr.ticks[3].get_center()) / 2
        t3 = self.sous_bond("3 quarts", m3, dr)
        self.au_nb("quarts, 3")
        self.play(Create(b3), FadeIn(t3, shift=UP * 0.1), GrowFromEdge(pt, DOWN), run_time=0.4)
        self.au_mot("Tom est là")
        self.insister(pt, 1.25, 0.25)
        self.attendre_voix()

    # ── 03 : le piège : les parts, pas les traits ───────────────────────────
    def ecran_piege(self):
        self.ecran("03-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        dr = droite(4, centre=P(XD, 0.3))
        self.add(dr)
        traits = VGroup(*[Text(str(i + 1), font_size=28, color=ROUGE_ERREUR, weight=BOLD)
                          .next_to(dr.ticks[i], UP, buff=0.2) for i in range(5)])
        pas_audit(traits)
        l1 = self.col(self.inline("5 traits", 42, ROUGE_ERREUR), 1.6)
        self.au_nb("on voit 5")
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in traits], lag_ratio=0.15), FadeIn(l1), run_time=0.7)
        nums = numeros(dr, 0, 4, VERT_OK, dy=0.45)
        l2 = self.col(self.inline("4 parts", 42, VERT_OK), 0.6)
        self.au_nb("que 4")
        self.play(FadeOut(traits), run_time=0.25)
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.15), FadeIn(l2), run_time=0.6)
        self.play(Create(croix(l1, sw=5)), run_time=0.3)
        r = self.col(self.bloc(["On compte les parts,", "pas les traits !"], 38, AMBRE), -1.2)
        self.au_mot("On compte les parts")
        self.poser_lignes(r, "up", 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (lire un point : 2/5) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = droite(5, centre=P(XD, 0.0))
        pt = dr.point(0.4, "?")

        def avant(sc):
            sc.play(FadeIn(dr), GrowFromEdge(pt, DOWN), run_time=0.5)

        nums = numeros(dr, 0, 5, AMBRE, dy=0.85)

        def apres(sc):
            sc.au_nb("il y a 5")
            sc.play(FadeOut(pt[2]), run_time=0.2)
            sc.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.15), run_time=0.6)
            sc.au_nb("à 2")
            sc.play(Create(bonds(dr, 0, 2, VERT_OK)), run_time=0.5)

        self.question_pause("04-question", "04b-reponse", ["Quelle fraction marque", "le point bleu ?"],
                            [self.inline("2/6"), self.inline("2/5"), self.inline("5/2")], 1,
                            ["2 cinquièmes !"], mot_q="Quelle fraction", avant_q=avant, autres_r=apres)

    # ── 05 : le milieu : 2/4 = 1/2 ──────────────────────────────────────────
    def ecran_milieu(self):
        self.ecran("05-milieu")
        d4 = droite(4, centre=P(XD, 1.2))
        d2 = droite(2, centre=P(XD, -1.6))
        self.au_mot("Salomé met")
        self.play(FadeIn(d4), run_time=0.4)
        bouee = VGroup(Circle(radius=0.22, stroke_color=BOUEE, stroke_width=10),
                       Circle(radius=0.22, stroke_color=WHITE, stroke_width=10).set_stroke(opacity=0.0))
        bouee.move_to(d4.p(0.5) + UP * 0.95)
        self.au_mot("bouée rouge")
        self.play(FadeIn(bouee, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("au milieu")
        self.titre("Le milieu")
        self.au_nb("Avec 4")
        nums = numeros(d4, 0, 2, AMBRE, dy=0.45)
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.2), run_time=0.5)
        p24 = d4.point(0.5, (2, 4))
        l1 = self.col(self.inline("2 quarts", 44, JAUNE_TITRE), 1.3)
        self.au_nb("c'est 2")
        self.play(FadeOut(bouee), FadeOut(nums), GrowFromEdge(p24, DOWN), FadeIn(l1, shift=RIGHT * 0.15),
                  run_time=0.45)
        p12 = d2.point(0.5, (1, 2), couleur=VERT_OK)
        l2 = self.col(self.inline("= 1 demi", 44, VERT_OK), 0.4)
        self.au_nb("aussi 1")
        self.play(FadeIn(d2), GrowFromEdge(p12, DOWN), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.5)
        trait = DashedLine(d4.p(0.5), d2.p(0.5), color=AMBRE, stroke_width=5)
        l3 = self.col(self.inline("la même place !", 38, AMBRE), -0.6)
        self.au_mot("la même place")
        self.play(Create(trait), FadeIn(l3, shift=RIGHT * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 06 : après 1 : 6/4 ──────────────────────────────────────────────────
    def ecran_apres(self):
        self.ecran("06-apres")
        dr = droite(4, b=2, centre=P(XD, 0.0))
        self.au_mot("Tom touche")
        self.play(FadeIn(dr), run_time=0.4)
        self.au_nb("De 1")
        self.titre("Après 1")
        seg = Line(dr.p(1), dr.p(2), color=AMBRE, stroke_width=10)
        self.au_nb("De 1 à 2")
        self.play(Create(seg), run_time=0.5)
        self.play(FadeOut(seg), run_time=0.3)
        l1 = self.inline("4 quarts", 40, JAUNE_TITRE)
        l1b = self.inline("= 1", 40, JAUNE_TITRE)
        self.col(VGroup(l1, l1b).arrange(RIGHT, buff=0.2), 1.5)
        self.au_nb("compter : 4")
        self.play(Create(bonds(dr, 0, 4)), FadeIn(l1, shift=RIGHT * 0.15), run_time=0.5)
        self.au_nb("c'est 1")
        self.play(FadeIn(l1b, scale=1.3), Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.6), run_time=0.4)
        for k, (mot, txt) in enumerate((("Puis 5", "5 quarts"), ("quarts, 6", "6 quarts"))):
            lg = self.col(self.inline(txt, 38, AMBRE), 0.7 - 0.75 * k)
            self.au_nb(mot)
            self.play(Create(bonds(dr, 4 + k, 5 + k)[0]), FadeIn(lg, shift=RIGHT * 0.15), run_time=0.35)
        p64 = dr.point(1.5, (6, 4))
        l2b = self.col(self.inline("Tom : après 1 !", 40, VERT_OK), -0.9)
        self.au_nb("Tom est à 6")
        self.play(GrowFromEdge(p64, DOWN), run_time=0.45)
        self.au_nb("après 1")
        self.play(FadeIn(l2b, scale=1.2), run_time=0.3)
        self.insister(p64, 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (4 tiers : avant, sur ou après 1 ?) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        dr = droite(3, b=2, centre=P(XD, 0.0))

        def avant(sc):
            sc.au_nb("a 3")
            sc.play(FadeIn(dr), run_time=0.4)

        def apres(sc):
            sc.au_nb("3 tiers, c'est 1")
            sc.play(Create(bonds(dr, 0, 3)), run_time=0.5)
            sc.au_nb("1. 4")
            sc.play(Create(bonds(dr, 3, 4, VERT_OK)), GrowFromEdge(dr.point(4 / 3, (4, 3), couleur=VERT_OK), DOWN),
                    run_time=0.5)
            sc.au_nb("plus : après 1")
            sc.rep(0)
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["Où se place", "4 tiers ?"],
                            [self.inline("avant 1"), self.inline("sur 1"), self.inline("après 1")], 2,
                            ["Une part de plus :", "après 1 !"], mots_choix=("A : avant 1", "B : sur 1", "C : après 1"), mot_q="Chaque unité",
                            avant_q=avant, autres_r=apres)

    # ── 08 : défi (5/8) ─────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        dr = droite(8, centre=P(XD, 0.3))
        l1 = self.col(self.inline("8 parts égales", 40, AMBRE), 1.7)
        self.au_nb("en 8")
        self.play(FadeIn(dr), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        pt = dr.point(5 / 8, "?")
        self.au_mot("point bleu")
        self.play(GrowFromEdge(pt, DOWN), run_time=0.45)
        q = self.col(self.bloc(["Quelle fraction", "a-t-il nagée ?"], 38, ORANGE_RETENUE), 0.3)
        self.au_mot("Quelle fraction")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        self.titre("Correction", fs=50)
        dr = droite(8, centre=P(XD, 0.3))
        pt = dr.point(5 / 8, "?")
        self.add(dr, pt)
        nums = numeros(dr, 0, 8, AMBRE, dy=0.85)
        f = EcritureFraction(5, 8, fs=90).move_to(P(3.0, 1.2))
        self.au_nb("on compte 8")
        self.play(FadeOut(pt[2]), LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.1), run_time=0.7)
        self.au_mot("des huitièmes")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), run_time=0.35)
        self.au_nb("au point : 5")
        self.play(FadeOut(nums), Create(bonds(dr, 0, 5, VERT_OK)), FadeIn(f.num, scale=1.4), run_time=0.6)
        lu = self.col(self.inline("5 huitièmes", 44, VERT_OK), -0.3)
        self.au_nb("nagé 5")
        p2 = dr.point(5 / 8, (5, 8), couleur=VERT_OK)
        self.play(FadeIn(lu, scale=1.2), FadeOut(pt), GrowFromEdge(p2, DOWN), run_time=0.4)
        self.play(Create(self.encadrer(lu, buff=0.12)), run_time=0.3)
        moit = DashedLine(dr.p(0.5) + DOWN * 0.3, dr.p(0.5) + UP * 1.2, color=JAUNE_TITRE, stroke_width=5)
        l2 = self.col(self.inline("moitié : 4 huitièmes", 36, JAUNE_TITRE), -1.3)
        self.au_nb("moitié : 4")
        self.play(Create(moit), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.45)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.0   # la colonne de texte s'élargit : la figure est petite, à gauche
        dr = droite(4, centre=ORIGIN, longueur=2.6)
        fig = VGroup(dr, dr.point(0.75, (3, 4)), bonds(dr, 0, 3))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Le dénominateur : en combien", "de parts égales on partage."),
                                                         ("Le numérateur : de combien", "de parts on avance depuis 0."),
                                                         ("On compte les parts,", "pas les traits."),
                                                         ("Après 1, on continue", "de compter.")], fs=36)
        self.au_mot("Le dénominateur")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le numérateur")
        self.montrer_ligne(lignes[1])
        self.au_mot("On compte les parts")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et après 1")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)


class FracDroiteCM1(FracDroiteBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracDroiteCM2(FracDroiteBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
