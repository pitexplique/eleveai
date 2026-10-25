# frac_quantite.py
# EleveAI — Maths 5e — série « Fractions », épisode 09 : LA FRACTION D'UNE
# QUANTITÉ (micro du coach : fraction_quantite, « calculer la fraction d'un
# nombre, d'une quantité ou d'une fraction », notion fraction_calcul), AVEC
# VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 5e
# (diviser par le dénominateur puis multiplier, piège, fraction d'une fraction
# = produit, SIMPLIFIER, chaîne décimal → pourcentage, défi à plusieurs étapes).
# Short jumeau : frac_quantite_short.py (le chat qui dort 2/3 du temps, jaune).
#
# Décor et métier : l'AVIATION ; Lina, PILOTE DE LIGNE : vol de 600 km, 2/3
# parcourus = 400 km ; réservoir plein aux 3/4, elle en utilise les 2/3 :
# 2/3 × 3/4 = 6/12 = 1/2 = 0,5 = 50 % ; défi : réservoir de 1 200 L → 900 L →
# 600 L utilisés, reste 300 L = 1/4 = 0,25 = 25 %. Chiffres inventés (aucune
# donnée du monde réel citée). Centres : transports.
# Vérifié (Python, fractions.Fraction) : 2/3 de 600 = 400 ; 2/5 de 150 = 60 ;
# 600 ÷ 2 × 3 = 900 ; 2/3 × 3/4 = 1/2 ; 1/2 × 3/4 = 3/8 ; 3/4 de 1 200 = 900 ;
# 2/3 de 900 = 600 ; 300/1 200 = 1/4.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genQuantite et
# explications « on divise par le dénominateur, puis on multiplie par le
# numérateur ») : fraction d'un nombre (02, question 1), le piège (04),
# fraction d'une fraction = produit (05, 06, question 2), « reste » (défi).
# Écrans : 00 garde · 01 Lina et le vol · 02 la méthode · 03 QUESTION 1 ·
# 04 le piège · 05 fraction d'une fraction · 06 simplifier, 0,5 = 50 % ·
# 07 QUESTION 2 · 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# ⭐ Bases : 5e/frac_loth_commun.py (PaysageH : audit, L() pose chaque morceau à
# son mot) ; figures canvas_fractions.py (non modifié).
# Voix : manim/voix/5e-frac-quantite.json (débit −10), WAV dans
# public/sons/5e-frac-quantite/ ; marques : 5e/frac_quantite_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_quantite.py FracQuantite5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_quantite.py FracQuantite5e -o eleveai-maths-5e-frac-quantite --media_dir manim/scripts/5e/media-frac-quantite
# Sortie : manim/sorties/5e/maths/fractions/09-quantite/eleveai-maths-5e-frac-quantite.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

CIEL = BLEU_PART
KERO = "#38bdf8"       # le carburant dans le réservoir
UTIL = ORANGE_PART     # le carburant utilisé
XB, LB = -3.3, 5.6


def pilote(s=1.0):
    """Lina : uniforme bleu marine, casquette à visière."""
    p = personne(peau="#c68642", tenue="#1e3a8a", cheveux="#111827", longs=True, s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    cas = RoundedRectangle(width=r * 2.3, height=r * 0.7, corner_radius=r * 0.2, fill_color="#1e293b",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.95)
    vis = Rectangle(width=r * 1.4, height=r * 0.18, fill_color="#0f172a", fill_opacity=1,
                    stroke_width=0).move_to(c + UP * r * 0.55 + RIGHT * r * 0.4)
    insigne = Circle(radius=r * 0.15, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(cas)
    galons = VGroup(*[Line(p.corps.get_center() + P(-0.3, 0.3 - 0.12 * k), p.corps.get_center() + P(0.3, 0.3 - 0.12 * k),
                           color="#facc15", stroke_width=4) for k in range(2)])
    p.add(cas, vis, insigne, galons)
    return p


def avion(s=1.0, couleur=WHITE):
    """Un avion de ligne vu de dessus, nez vers la droite."""
    corps = RoundedRectangle(width=1.6, height=0.26, corner_radius=0.13, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    ailes = Polygon(P(-0.15, 0), P(0.25, 0), P(-0.25, 0.75), P(-0.45, 0.75), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    ailes2 = ailes.copy().flip(RIGHT).move_to(P(-0.1, -0.37))
    ailes.move_to(P(-0.1, 0.37))
    queue = Polygon(P(-0.8, 0), P(-0.6, 0), P(-0.75, 0.3), P(-0.85, 0.3), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    queue2 = queue.copy().flip(RIGHT).shift(DOWN * 0.3)
    return VGroup(ailes, ailes2, queue, queue2, corps).scale(s)


class FracQuantiteBase(PaysageH):
    nom_voix = "5e-frac-quantite"
    fichier_marques = "frac_quantite_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """25/10 : la phrase de RÉPONSE était réduite (≈ 26) pour tenir dans la
        colonne : refaite en corps 34 (lisible projetée en classe), lignes
        courtes, sous les cartes, à gauche de Ti-Margo, dans les marges."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        g, haut = cartes.get_left()[0], cartes.get_bottom()[1] - 0.25
        neuf = VGroup(*[self.t(s, 34, VERT_OK) for s in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        if neuf.width > 5.3 - g:  # Ti-Margo commence à x ≈ 5,7 : de l'air
            neuf.scale_to_fit_width(5.3 - g)
        if neuf.height > haut + 3.45:  # bas ≥ −3,45 (marge des 3 %)
            neuf.scale_to_fit_height(haut + 3.45)
        neuf.align_to(P(g, 0), LEFT).align_to(P(0, haut), UP)
        self.ph_q = neuf
        self._q_bloc = q
        return tete, q, cartes, pause, rebours, neuf

    def rep_mots(self, i, morceaux, avec=()):
        """25/10 : la ligne i de la réponse posée MORCEAU PAR MORCEAU, chacun à
        son mot (0 s d'avance) : morceaux = [(texte écrit, extrait de la voix)] ;
        `avec` : jouées avec le premier morceau."""
        lg, k = self.ph_q[i], 0
        for j, (txt, mot) in enumerate(morceaux):
            n = len(txt.replace(" ", ""))
            part, k = VGroup(*lg[k:k + n]), k + n
            self.au_nb(mot) if re.search(r"\d", mot) else self.au_mot(mot)
            self.play(FadeIn(part, shift=UP * 0.15), *(list(avec) if j == 0 else []), run_time=0.3)
        assert k == len(lg), f"morceaux de « {lg.original_text} » mal comptés"
        self._deja = getattr(self, "_deja", set()) | {i}

    def _poser_ligne0(self, mots):
        """avant_q (25/10) : « 1 demi » attendait « demi » et montrait le 1 avec
        0,42 s de retard. La 1re ligne de la question entre en deux morceaux
        (son 1er caractère, puis le reste), chacun AU MOT, puis elle sort du bloc
        pour que poser_lignes ne la rejoue pas."""
        q = self._q_bloc
        l0 = q[0]
        morceaux = [VGroup(l0[0]), VGroup(*l0[1:])]
        for m, mot in zip(morceaux, mots):
            self.au_nb(mot) if re.search(r"\d", mot) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.2), run_time=0.25)
        q.remove(l0)

    def barre(self, n, k=0, y=0.0, couleur=CIEL, largeur=LB, **kw):
        return Barre(n, k, largeur=largeur, hauteur=0.7, couleur=couleur, marge=0.2, centre=P(XB, y), **kw)

    def valeurs(self, b, v, fs=30):
        """Le nombre v écrit dans chaque part de la barre b."""
        out = VGroup()
        for p_ in b.parts:
            t = Text(str(v), font_size=fs, color=NUIT, weight=BOLD).move_to(p_)
            t.sans_synchro = True
            t.set_z_index(5)
            out.add(t)
        return out

    def reservoir(self, cols=4, rangs=3, plein=3, utilise=0, L=3.6, H=2.8, centre=P(-3.3, -0.2)):
        """Le réservoir vu comme un rectangle : `plein` colonnes de carburant,
        dont les `utilise` premières rangées sont utilisées (orange)."""
        pv = Pave(cols, rangs, 0, 0, L=L, H=H, centre=centre)
        pv.kero = pv.bande(0, plein, 0, rangs, KERO)
        pv.util = pv.bande(0, plein, 0, utilise, UTIL) if utilise else VMobject()
        pv.add(pv.kero, pv.util)
        pv.vert.set_z_index(2)
        pv.hori.set_z_index(2)
        pv.contour.set_z_index(3)
        return pv

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La fraction d'une quantité", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("La fraction")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((2, 3), "de", "600 km", "=", "?", fs=72).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.montre(["Les 2 tiers", "de 600"], [ex[0], ex[1:3]])
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lina et le vol ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        self.personnage(pilote(1.0), "Lina", ["pilote", "de ligne"], x=-5.4, y=-0.5)
        route = DashedLine(P(-3.9, 1.9), P(-0.2, 1.9), color=GREY_B, stroke_width=4)
        dep, arr = Dot(route.get_start(), radius=0.1, color=WHITE), Dot(route.get_end(), radius=0.1, color=WHITE)
        av = avion(0.55).move_to(route.get_start() + UP * 0.45)
        l1 = self.L([("Vol :", WHITE, "Son vol"), ("600 km", AMBRE, "fait 600")], 2.2, 42,
                    avec={0: [Create(route), FadeIn(dep), FadeIn(arr), FadeIn(av)]})
        self.L([("Au bout d'une heure :", WHITE, "Au bout d'une heure")], 1.2, 40)
        l2 = self.L([(EcritureFraction(2, 3, fs=56, couleur=CIEL), None, "les 2 tiers"),
                     ("du trajet", WHITE, None)], 0.2, 42,
                    avec={0: [av.animate.move_to(P(-3.9 + 3.7 * 2 / 3, 1.9) + UP * 0.45)]}, run_time=0.6)
        self.au_mot("Combien de kilomètres")
        q = self.col(self.t("Parcouru : ? km", 42, ORANGE_RETENUE), -1.0)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la méthode (600 ÷ 3 × 2 = 400) ────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        b = self.barre(3, 0, 0.4)
        br = Brace(b.contour, UP, color=AMBRE)
        t600 = pas_audit(self.inline("600 km", 34, AMBRE).next_to(br, UP, buff=0.1))
        self.au_mot("partager en 3")
        self.play(b.apparaitre(0.6), FadeIn(br), FadeIn(t600), run_time=0.6)
        self.au_mot("en prendre 2")
        self.play(Indicate(VGroup(b.parts[0], b.parts[1]), color=AMBRE), run_time=0.5)
        vals = self.valeurs(b, 200, 34)
        self.L([("600", WHITE, "600 divisé"), ("÷ 3", WHITE, "par 3"), ("= 200", BLEU_CALCUL, "égale 200")], 2.1, 42, buff=0.25,
               avec={2: [FadeIn(vals, scale=1.3)]})
        self.au_mot("une part fait")
        self.play(Indicate(vals[0], color=AMBRE, scale_factor=1.4), run_time=0.5)
        lg = self.L([("200", WHITE, "200 fois"), ("× 2", WHITE, "fois 2"), ("= 400 km", VERT_OK, "égale 400")], 0.6, 42, buff=0.25,
                    avec={1: [b.colorier([0, 1], lag=0.15, run_time=0.5)]})
        self.play(Create(self.encadrer(lg[2], buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (2/5 de 150) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(5, 0, 0.3)
        br = Brace(b.contour, UP, color=AMBRE)
        t150 = pas_audit(self.inline("150 passagers", 32, AMBRE).next_to(br, UP, buff=0.1))
        self.add(b)
        vals = pas_audit(self.valeurs(b, 30, 32))

        def avant(sc):
            sc.play(FadeIn(br), FadeIn(t150), run_time=0.3)

        def apres(sc):
            sc.rep_mots(0, [("150 ÷", "B. 150"), ("5", "par 5"), ("= 30 :", "égale 30")])
            sc.play(FadeIn(vals, scale=1.3), run_time=0.3)
            sc.rep_mots(1, [("c'est 1/5", "c'est 1")])
            sc.rep_mots(2, [("30 ×", "cinquième. 30"), ("2", "fois 2"), ("= 60", "égale 60")],
                        avec=[b.colorier([0, 1], lag=0.15, run_time=0.5)])
            sc.rep_fin()

        self.question_pause("03-question", "03b-reponse", ["Les 2 cinquièmes", "de 150 passagers ?"],
                            [self.inline("30"), self.inline("60"), self.inline("375")], 1,
                            ["150 ÷ 5 = 30 :", "c'est 1/5", "30 × 2 = 60"], mot_q="les 2 cinquièmes",
                            autres_q=avant, autres_r=apres)

    # ── 04 : le piège (on divise par le dénominateur) ───────────────────────
    def ecran_piege(self):
        self.ecran("04-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        self.L([("On divise par le nombre", AMBRE, "On divise par le nombre")], 2.15, 36)
        self.L([("du bas : le dénominateur", AMBRE, "le dénominateur")], 1.6, 36)
        g = -6.1
        b600 = Rectangle(width=4.0, height=0.6, fill_color=CIEL, fill_opacity=1, stroke_color=BORD, stroke_width=3)
        b600.move_to(P(g + 2.0, 0.9))
        b900 = Rectangle(width=6.0, height=0.6, fill_color=ROUGE_COACH, fill_opacity=1, stroke_color=BORD,
                         stroke_width=3).move_to(P(g + 3.0, -0.5))
        l600 = pas_audit(self.inline("trajet : 600 km", 30, CIEL).next_to(b600, UP, buff=0.12).align_to(b600, LEFT))
        self.play(FadeIn(b600), FadeIn(l600), run_time=0.4)
        faux = self.L([("600", ROUGE_ERREUR, "600 divisé"), ("÷ 2", ROUGE_ERREUR, "par 2"), ("× 3", ROUGE_ERREUR, "fois 3"),
                       ("= 900", ROUGE_ERREUR, "fait 900")], 0.5, 44,
                      avec={3: [GrowFromEdge(b900, LEFT)]})
        l900 = pas_audit(self.inline("900 km", 30, ROUGE_ERREUR).next_to(b900, DOWN, buff=0.12).align_to(b900, RIGHT))
        self.play(FadeIn(l900), run_time=0.3)
        self.au_mot("Plus que le trajet")
        lim = DashedLine(P(g + 4.0, 1.5), P(g + 4.0, -1.2), color=AMBRE, stroke_width=5)
        self.play(Create(lim), run_time=0.5)
        self.au_mot("impossible")
        self.play(Create(croix(faux[3], sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        self.au_mot("c'est moins que")
        m = self.col(self.t("Moins que le tout !", 38, VERT_OK), -1.1)
        m.sans_synchro = True
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : la fraction d'une fraction (2/3 de 3/4 = 6/12) ─────────────────
    def ecran_fraction(self):
        self.ecran("05-fraction")
        self.au_mot("la fraction d'une fraction")
        self.titre("La fraction d'une fraction")
        rs = self.reservoir(plein=0)
        nom = pas_audit(self.inline("le réservoir", 32, KERO).next_to(rs, UP, buff=0.15))
        kero = rs.bande(0, 3, 0, 3, KERO)
        util = rs.bande(0, 3, 0, 2, UTIL)
        for m in (kero, util):
            m.set_z_index(1)
        self.play(FadeIn(rs), FadeIn(nom), run_time=0.4)
        self.L([("plein aux", WHITE, "plein aux"), (EcritureFraction(3, 4, fs=50, couleur=KERO), None, "3 quarts")],
               1.95, 40, avec={1: [FadeIn(kero)]})
        self.L([("elle en utilise", WHITE, "Lina utilise"),
                (EcritureFraction(2, 3, fs=50, couleur=UTIL), None, "les 2 tiers")], 0.95, 40, avec={1: [FadeIn(util)]})
        e = expression((2, 3, UTIL), "×", (3, 4, KERO), fs=50)
        self.col(e, -0.15)
        self.au_nb("c'est 2")
        self.play(FadeIn(e[0], scale=1.2), run_time=0.3)
        self.au_nb("fois 3")
        self.play(FadeIn(e[1:], scale=1.2), run_time=0.3)
        nums = rs.numeros([(r, c) for r in range(2) for c in range(3)], fs=30)
        self.L([("En haut :", WHITE, "En haut"), ("2", WHITE, "haut, 2"), ("× 3", WHITE, "2 fois 3"),
                ("= 6", UTIL, "égale 6")], -1.3, 38, buff=0.2,
               avec={3: [LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.1)]})
        self.L([("En bas :", WHITE, "En bas"), ("3", WHITE, "bas, 3"), ("× 4", WHITE, "3 fois 4"),
                ("= 12", KERO, "égale 12")], -2.05, 38, buff=0.2,
               avec={3: [Indicate(VGroup(rs.vert, rs.hori), color=AMBRE)]})
        self.au_mot("6 douzièmes")
        r = pas_audit(self.inline("= 6/12", 44, VERT_OK).next_to(e, RIGHT, buff=0.3))
        self.play(FadeIn(r, scale=1.3), run_time=0.35)
        self.attendre_voix()
        return rs, kero, util

    # ── 06 : simplifier, puis 0,5 = 50 % ────────────────────────────────────
    def ecran_simplifier(self, rs, kero, util):
        self.ecran("06-simplifier")
        self.add(rs, kero, util)
        f, g = EcritureFraction(6, 12, fs=60), EcritureFraction(1, 2, fs=60, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        pas_audit(f)  # le résultat de l'écran d'avant (« 6 douzièmes » y est dit)
        self.col(eg, 1.6)
        self.au_mot("On simplifie")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        haut, bas = fleches(f, g, "÷ 6", fs=30, angle=TAU / 10)
        self.au_nb("On divise par 6")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.au_mot("1 demi")
        moitie = DashedLine(rs.fond.get_top(), rs.fond.get_bottom(), color=AMBRE, stroke_width=6).set_z_index(4)
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("la moitié du réservoir")
        self.play(Create(moitie), Indicate(util, color=AMBRE, scale_factor=1.03), run_time=0.6)
        self.L([("1", WHITE, "c'est 1 divisé"), ("÷ 2", WHITE, "par 2"), ("= 0,5", BLEU_CALCUL, "0,5")], -0.55, 48)
        pc = Pourcentage(50, mode="chargement", largeur=4.6, hauteur=0.55, couleur=UTIL, etiquette=False)
        pc.vide()
        self.col(pc, -1.55)
        p50 = self.t("50 %", 48, UTIL).next_to(pc, DOWN, buff=0.2).align_to(pc, RIGHT)
        pc.plein.set_opacity(1)
        self.au_mot("Soit")
        self.play(FadeIn(pc.piste), run_time=0.2)
        self.add(pc.plein)
        self.play(pc.remplir(0.4), run_time=0.4)
        self.au_nb("Soit 50")
        self.play(FadeIn(p50, scale=1.3), run_time=0.35)
        self.insister(p50, 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (1/2 de 3/4) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rs = self.reservoir(cols=4, rangs=2, plein=0, L=3.6, H=2.4, centre=P(-3.3, 0.1))
        kero = rs.bande(0, 3, 0, 2, KERO).set_z_index(1)
        util = rs.bande(0, 3, 0, 1, UTIL).set_z_index(1)
        self.add(rs)

        def apres(sc):
            sc.rep_mots(0, [("« de » =", "De, c'est"), ("« × »", "fois.")])
            sc.rep_mots(1, [("en haut :", "En haut"), ("1 ×", "haut, 1"), ("3", "fois 3"), ("= 3", "égale 3")],
                        avec=[FadeIn(kero), FadeIn(util)])
            sc.rep_mots(2, [("en bas :", "En bas"), ("2 ×", "bas, 2"), ("4", "fois 4"), ("= 8", "égale 8")],
                        avec=[Indicate(VGroup(rs.vert, rs.hori), color=AMBRE)])
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["1 demi", "de 3 quarts ?"],
                            [self.inline("4/6"), self.inline("3/8"), self.inline("1/4")], 1,
                            ["« de » = « × »", "en haut : 1 × 3 = 3", "en bas : 2 × 4 = 8"], mot_q="Combien fait",
                            avant_q=lambda sc: sc._poser_ligne0(["fait 1", "demi"]), autres_r=apres)

    # ── 08 : défi (1 200 L, 3/4, 2/3) ───────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, centre=True)
        rs = self.reservoir(plein=0, centre=P(-3.6, -0.3))
        self.play(FadeIn(rs), run_time=0.4)
        self.L([("Plein :", WHITE, "Plein"), ("1 200 L", AMBRE, "contient 1 200")], 2.05, 40)
        self.L([("rempli aux", WHITE, "Il est plein"),
                (EcritureFraction(3, 4, fs=46, couleur=KERO), None, "aux 3 quarts")], 1.15, 36,
               avec={1: [FadeIn(rs.bande(0, 3, 0, 3, KERO).set_z_index(1))]})
        self.L([("elle en utilise les", WHITE, "Lina en utilise"),
                (EcritureFraction(2, 3, fs=46, couleur=UTIL), None, "les 2 tiers")], 0.1, 36)
        self.au_mot("Combien de litres")
        q1 = self.col(self.t("Litres utilisés ?", 36, ORANGE_RETENUE), -0.85)
        q1.sans_synchro = True
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("quel pourcentage")
        q2 = self.col(self.t("% du réservoir qui reste ?", 36, ORANGE_RETENUE), -1.5)
        q2.sans_synchro = True
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction")
        self.titre("Correction", fs=50, centre=True)
        rs = self.reservoir(plein=0, L=3.4, H=2.7, centre=P(-4.1, -0.3))
        kero = rs.bande(0, 3, 0, 3, KERO).set_z_index(1)
        util = rs.bande(0, 3, 0, 2, UTIL).set_z_index(1)
        reste = rs.bande(0, 3, 2, 3, VERT_PART).set_z_index(1)
        self.au_mot("Les 3 quarts")
        self.play(FadeIn(rs), run_time=0.4)
        xl = -1.2
        self.L([("1 200", WHITE, "1 200 divisé"), ("÷ 4", WHITE, "par 4"), ("= 300", BLEU_CALCUL, "égale 300"),
                ("× 3", WHITE, "fois 3"), ("= 900 L", KERO, "égale 900")], 2.05, 40, xl=xl, buff=0.22,
               avec={4: [FadeIn(kero)]})
        self.L([("900", WHITE, "900 divisé"), ("÷ 3", WHITE, "par 3"), ("= 300", BLEU_CALCUL, ("égale 300", 2)),
                ("× 2", WHITE, "fois 2"), ("= 600 L", UTIL, "égale 600")], 1.1, 40, xl=xl, buff=0.22,
               avec={4: [FadeIn(util)]})
        self.L([("reste :", WHITE, "Il reste"), ("900", WHITE, "900 moins"), ("− 600", WHITE, "moins 600"),
                ("= 300 L", VERT_OK, "600 : 300")], 0.15, 40, xl=xl, buff=0.22, avec={3: [FadeIn(reste)]})
        f1, f2 = EcritureFraction(300, 1200, fs=46), EcritureFraction(1, 4, fs=46, couleur=VERT_OK)
        l4 = self.L([(f1, None, "300 sur")], -1.1, 40, xl=xl)
        self.au_mot("on simplifie par 300")
        self.play(Indicate(f1, color=AMBRE), run_time=0.4)
        self.L([("=", WHITE, ("1 quart", 1)), (f2, None, None), ("= 0,25", BLEU_CALCUL, "c'est 0,25"),
                ("= 25 %", VERT_OK, "il reste 25")], -1.1, 40, xl=l4.get_right()[0] + 0.2, buff=0.15)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale")
        b = Barre(3, 2, largeur=4.2, hauteur=0.6, couleur=CIEL, marge=0.2)
        lab = expression((2, 3), "de", "600 = 400", fs=40).next_to(b, DOWN, buff=0.3)
        fig = VGroup(b, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On divise par le dénominateur,", "puis on multiplie par le numérateur."),
                                                         ("Avec une fraction plus petite que 1,", "on trouve moins que le tout."),
                                                         ("Une fraction d'une fraction,", "c'est une multiplication.")], fs=34)
        self.au_mot("Pour prendre")
        self.montrer_ligne(lignes[0])
        self.au_mot("Avec une fraction")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et une fraction")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        rs, kero, util = self.ecran_fraction()
        self.ecran_simplifier(rs, kero, util)
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class FracQuantite5e(FracQuantiteBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
