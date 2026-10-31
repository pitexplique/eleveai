# prop_tableau.py
# EleveAI — Maths 6e — série « Proportionnalité », épisode 02 : COMPLÉTER UN
# TABLEAU DE PROPORTIONNALITÉ (micro du coach : prop_table, notion
# prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau : situation, méthode, piège, 2 questions-pauses, défi
# corrigé). Short jumeau : prop_tableau_short.py (blanche).
# ⭐ Méthode travaillée : la LINÉARITÉ dans le tableau — flèche de colonne
# « × 2 » (le double), « ÷ 2 » (la moitié), « + » entre deux colonnes qui
# s'additionnent. Le coefficient (× 5) est laissé à l'épisode 03.
# ⛔ Pas de produit en croix (6e).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER au lieu de
# multiplier (question 1 : 15 = 12 + 3 ; question 2 : 22 = 21 + 1 ; écran 07 :
# « + 2 » barré, 12 au lieu de 20) ; 3. mauvais calcul de coefficient
# (question 1 : 18 = 6 × 3 ; question 2 : 25 = 21 + 4).
#
# Décor et métier : JEU VIDÉO, Noah, GAME DESIGNER : la boutique de son jeu
# (potions, coffres, épées, boucliers ; prix en pièces d'or). Prix inventés
# (monnaie du jeu) : aucun chiffre du monde réel, pas de source à citer.
# Centres d'intérêt : jeux-video.
#
# Micro → écrans : remplir les cases d'un tableau (02) ; le double (03) ;
# additionner deux colonnes (04) ; QUESTION 1 (05, le double) ; la moitié
# (06) ; le piège « + 2 » (07) ; QUESTION 2 (08, additionner) ; défi (09) et
# correction (09b) ; ce que tu as appris (10) ; fin (11).
# Écrans : 00 garde · 01 Noah et la boutique · 02 le tableau · 03 le double ·
# 04 l'addition de colonnes · 05 QUESTION 1 · 06 la moitié · 07 le piège ·
# 08 QUESTION 2 · 09 défi des boucliers · 09b correction · 10 ce que tu as
# appris · 11 fin.
#
# Voix : manim/voix/6e-prop-tableau.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-tableau/ ; marques mot à mot :
# manim/scripts/6e/prop_tableau_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (pilote, non modifiés).
# Ajouté ICI (absent du module) : plus_bas() — le « + » entre deux colonnes
# SOUS le tableau (tb.plus ne le pose qu'au-dessus).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_tableau.py PropTableau6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_tableau.py PropTableau6e -o eleveai-maths-6e-prop-tableau --media_dir manim/scripts/6e/media-prop-tableau
# Sortie : manim/sorties/6e/maths/proportionnalite/02-tableau/eleveai-maths-6e-prop-tableau.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

OR = "#facc15"
VIOLET_JEU = "#7c3aed"


def piece(r=0.16):
    """Une pièce d'or du jeu."""
    return VGroup(Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color="#a16207", stroke_width=3),
                  Circle(radius=r * 0.6, stroke_color="#a16207", stroke_width=2))


def potion(couleur="#ec4899", s=1.0):
    """Une fiole de potion : panse ronde, col, bouchon."""
    panse = Circle(radius=0.26, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    col = Rectangle(width=0.14, height=0.2, fill_color="#e0f2fe", fill_opacity=0.9, stroke_color=WHITE,
                    stroke_width=2).next_to(panse, UP, buff=-0.03)
    bouchon = RoundedRectangle(width=0.18, height=0.1, corner_radius=0.03, fill_color="#92400e", fill_opacity=1,
                               stroke_width=0).next_to(col, UP, buff=0)
    reflet = Circle(radius=0.06, fill_color=WHITE, fill_opacity=0.8, stroke_width=0).move_to(
        panse.get_center() + P(-0.09, 0.08))
    return VGroup(panse, col, bouchon, reflet).scale(s)


def coffre(s=1.0):
    """Un coffre au trésor : bois, couvercle bombé, ferrures dorées."""
    caisse = Rectangle(width=0.9, height=0.45, fill_color="#92400e", fill_opacity=1, stroke_color="#451a03",
                       stroke_width=3)
    dome = Polygon(*[P(0.45 * np.cos(a), 0.22 * np.sin(a)) for a in np.linspace(0, PI, 20)],
                   fill_color="#b45309", fill_opacity=1, stroke_color="#451a03", stroke_width=3)
    dome.next_to(caisse, UP, buff=0)
    bandes = VGroup(*[Rectangle(width=0.08, height=0.67, fill_color=OR, fill_opacity=1, stroke_width=0)
                      .move_to(caisse.get_center() + P(x, 0.1)) for x in (-0.3, 0.3)])
    serrure = Square(0.13, fill_color=OR, fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(
        caisse.get_top())
    return VGroup(caisse, dome, bandes, serrure).scale(s)


def epee(s=1.0, angle=-PI / 4):
    """Une épée : lame argentée, garde dorée, poignée."""
    lame = Polygon(P(-0.06, 0), P(0.06, 0), P(0.06, 1.0), P(0, 1.15), P(-0.06, 1.0), fill_color="#e2e8f0",
                   fill_opacity=1, stroke_color="#64748b", stroke_width=2)
    garde = RoundedRectangle(width=0.42, height=0.08, corner_radius=0.03, fill_color=OR, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.02))
    poignee = Rectangle(width=0.08, height=0.28, fill_color="#7c2d12", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.2))
    pommeau = Circle(radius=0.06, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, -0.37))
    return VGroup(lame, garde, poignee, pommeau).scale(s).rotate(angle)


def bouclier(s=1.0, couleur="#2563eb"):
    """Un bouclier : écu bleu, bord doré, une étoile."""
    pts = [P(-0.4, 0.42), P(0.4, 0.42), P(0.4, 0.05), P(0, -0.5), P(-0.4, 0.05)]
    ecu = Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=OR, stroke_width=5)
    etoile = Star(5, outer_radius=0.17, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    return VGroup(ecu, etoile).scale(s)


def noah(s=1.0):
    """Noah, game designer : sweat violet, casque audio."""
    p = personne(peau="#8d5524", tenue=VIOLET_JEU, cheveux="#111827", s=s)
    p.add(casque_audio(p))
    return p


def manette(s=1.0):
    """Une manette de jeu."""
    corps = RoundedRectangle(width=1.3, height=0.62, corner_radius=0.28, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    croix_ = VGroup(Rectangle(width=0.3, height=0.09), Rectangle(width=0.09, height=0.3)).set_fill(
        "#e2e8f0", 1).set_stroke(width=0).move_to(P(-0.35, 0))
    boutons = VGroup(*[Circle(radius=0.06, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                       for c, x, y in (("#ef4444", 0.42, 0), ("#22c55e", 0.3, 0.12), ("#3b82f6", 0.3, -0.12),
                                       ("#facc15", 0.18, 0))])
    return VGroup(corps, croix_, boutons).scale(s)


def boutique(l=4.4, h=2.9):
    """La fenêtre « BOUTIQUE » du jeu : cadre violet, titre doré, étagère."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.18, fill_color="#1e1b4b", fill_opacity=1,
                             stroke_color="#a78bfa", stroke_width=4)
    bande = RoundedRectangle(width=l * 0.7, height=0.5, corner_radius=0.12, fill_color=VIOLET_JEU,
                             fill_opacity=1, stroke_color=OR, stroke_width=3).move_to(cadre.get_top() + DOWN * 0.42)
    mot = Text("BOUTIQUE", font_size=30, color=OR, weight=BOLD).move_to(bande)
    etagere = Line(cadre.get_left() + P(0.3, -0.75), cadre.get_right() + P(-0.3, -0.75), color="#a78bfa",
                   stroke_width=4)
    g = VGroup(cadre, bande, mot, etagere)
    g.cadre, g.mot, g.etagere = cadre, mot, etagere
    return g


def plus_bas(tb, c0, c1, couleur=FLECHE_COL, fs=None):
    """Le « + » de la linéarité entre les colonnes c0 et c1, SOUS la carte
    (tb.plus du module ne le pose qu'au-dessus)."""
    t = Text("+", font_size=fs or int(tb.fs * 1.3), color=couleur, weight=BOLD)
    return t.move_to(P((tb.x(c0) + tb.x(c1)) / 2, tb.carte.get_bottom()[1] - 0.35))


class PropTableauBase(PaysageProp):
    nom_voix = "6e-prop-tableau"
    fichier_marques = "prop_tableau_marques.json"
    LIBS = ["Potions", "Prix (pièces)"]
    VALS = [[1, 2, 4, 6], [5, 10, 20, 30]]
    X0 = -0.6   # le centre des figures (la colonne de droite reste aux textes courts)

    def table_potions(self, connues, centre=None, vals=None, libs=None):
        """Le tableau de la boutique : les cases `connues` portent leur valeur,
        les autres leur « ? ». Renvoie (tb, ce qui est déjà à l'écran)."""
        tb = TableauProp(libs or self.LIBS, vals or self.VALS, montrer=False, largeur_case=1.5,
                         largeur_libelle=3.0, fs=38, centre=centre if centre is not None else P(self.X0, 1.15))
        deja = VGroup(tb.fond)
        for r in range(tb.nl):
            for c in range(tb.nc):
                deja.add(tb.valeur(r, c) if (r, c) in connues else tb.trou(r, c))
        return tb, deja

    def ligne_c(self, morceaux, y, fs=42, x=None):
        """Une ligne de calcul centrée sous le tableau (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, bornée à droite (BORD_X) : une ligne de réponse
        juste au-dessus de Ti-Margo n'était pas recadrée (BORD en dry run)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]  # la phrase a pu être réduite par col() : même taille que la ligne qu'on remplace
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    @staticmethod
    def muet(fl):
        """Étiquette de flèche dite en mots (« le double », « la moitié ») : ni
        attente de la synchro, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Compléter un tableau de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Compléter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(["Potions", "Prix (pièces)"], [["?"] * 4] * 2, montrer=False, largeur_case=1.2,
                         largeur_libelle=2.6, hauteur=0.75, fs=34, centre=P(0.3, 0.35))
        deco = VGroup(potion(s=1.3), piece(0.3)).arrange(DOWN, buff=0.35).move_to(P(-4.9, 0.35))
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(deco, scale=0.7), run_time=0.6)
        self.au_mot("cases vides")
        trous = [tb.trou(r, c) for r in range(2) for c in range(4)]
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in trous], lag_ratio=0.1), run_time=0.8)
        self.au_mot("recalculer")
        self.play(LaggedStart(*[Indicate(t, color=AMBRE, scale_factor=1.15) for t in trous], lag_ratio=0.08),
                  run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Noah, game designer, et la boutique du jeu ─────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = noah(1.0).move_to(P(-5.55, -1.0))
        self.au_mot("Voici Noah")
        nom = self.t("Noah", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("game designer")
        met = self.t("game designer", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("jeux vidéo")
        man = manette(1.0).move_to(P(-5.55, 2.6))
        self.play(FadeIn(man, scale=0.6), run_time=0.4)
        self.au_mot("boutique")
        bq = boutique().move_to(P(-1.75, 0.75))
        self.play(FadeIn(VGroup(*[m for m in bq if m is not bq.mot]), scale=0.9), Write(bq.mot), run_time=0.6)
        self.au_mot("2 potions")
        pots = VGroup(potion("#ec4899"), potion("#ec4899")).arrange(RIGHT, buff=0.2)
        pots.next_to(bq.etagere, UP, buff=0.02).shift(LEFT * 0.9)
        l2 = self.ligne([("2 potions", WHITE), ("=", WHITE), ("10 pièces", OR)], 34).move_to(P(3.7, 2.2))
        l2.align_to(P(1.1, 0), LEFT)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pots], lag_ratio=0.3), FadeIn(l2[0]),
                  run_time=0.5)
        self.au_mot("10 pièces")
        prix = VGroup(piece(0.15), self.t("10", 34, OR)).arrange(RIGHT, buff=0.1)
        prix.next_to(bq.etagere, DOWN, buff=0.2).set_x(pots.get_x())
        self.play(FadeIn(l2[1]), FadeIn(l2[2], scale=1.3), FadeIn(prix, scale=1.3), run_time=0.4)
        self.insister(l2[2], 1.12, 0.2)
        lignes = []
        for k, (mot, txt) in enumerate([("4 potions", "4 potions"), ("6 potions", "6 potions"),
                                        ("1 potion", "1 potion")]):
            lg = self.ligne([(txt, WHITE), ("→ ? pièces", ORANGE_RETENUE)], 36).move_to(P(3.7, 0.9 - 0.95 * k))
            lg.align_to(l2, LEFT)
            lg[1].sans_synchro = True  # « pièces » redit : la question de la ligne, pas un nombre
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1]), run_time=0.4)
            lignes.append(lg)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb, _ = self.table_potions(set())
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2),
                  *[FadeIn(tb.trou(0, c), scale=1.3) for c in (0, 2, 3)], run_time=0.6)
        self.au_mot("En bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2),
                  *[FadeIn(tb.trou(1, c), scale=1.3) for c in (0, 2, 3)], run_time=0.6)
        self.au_mot("2 potions")
        self.play(tb.allumer(0, 1), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.4)
        self.au_mot("10 pièces")
        self.play(tb.allumer(1, 1), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.4)
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.3)
        self.play(Indicate(tb.colonne(1), color=AMBRE, scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 03 : le double ──────────────────────────────────────────────────────
    def ecran_double(self):
        self.ecran("03-double")
        tb, deja = self.table_potions({(0, 1), (1, 1)})
        self.add(deja)
        self.au_mot("4 potions")
        self.play(tb.remplir(0, 2), run_time=0.4)
        h = tb.fleche_col(1, 2, "× 2", ligne=0)
        self.au_mot("double")
        self.play(tb.allumer(0, 1), tb.allumer(0, 2), Create(h.fleche), run_time=0.5)
        self.au_mot("2 potions")
        self.play(FadeIn(h.etiquette, scale=1.4), run_time=0.3)
        self.insister(h.etiquette, 1.3, 0.2)
        b = self.muet(tb.fleche_col(1, 2, "× 2", ligne=1))
        self.au_mot("Le prix double")
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 2), tb.allumer(1, 1), Create(b.fleche),
                  FadeIn(b.etiquette, scale=1.4), run_time=0.5)
        lg = self.ligne_c([("10 ×", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("20 pièces", VERT_OK)], -1.55)
        self.poser_lignes(VGroup(*lg[:3]), "fade", 0.3)
        self.au_mot("20 pièces")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 2), run_time=0.4)
        self.play(tb.allumer(1, 2), run_time=0.3)
        self.insister(lg[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : additionner deux colonnes ──────────────────────────────────────
    def ecran_addition(self):
        self.ecran("04-addition")
        tb, deja = self.table_potions({(0, 1), (1, 1), (0, 2), (1, 2)})
        self.add(deja)
        self.au_mot("Et 6")
        self.play(tb.remplir(0, 3), run_time=0.4)
        self.au_mot("6, c'est")
        l1 = self.ligne_c([("6 =", WHITE), ("2 +", WHITE), ("4", WHITE)], -1.45)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), tb.allumer(0, 3), run_time=0.3)
        hp = tb.plus(1, 2)
        self.au_mot("2 plus")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), tb.allumer(0, 1), FadeIn(hp, scale=1.5), run_time=0.3)
        self.au_mot("4. On")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), tb.allumer(0, 2), run_time=0.3)
        bp = plus_bas(tb, 1, 2)
        self.au_mot("additionne")
        self.play(*[tb.eteindre(0, c) for c in (1, 2, 3)], tb.allumer(1, 1), tb.allumer(1, 2),
                  FadeIn(bp, scale=1.5), run_time=0.4)
        l2 = self.ligne_c([("10 +", WHITE), ("20 =", WHITE), ("30 pièces", VERT_OK)], -2.35)
        self.poser_lignes(VGroup(*l2[:2]), "fade", 0.3)
        self.au_mot("30 pièces")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 3), run_time=0.4)
        self.play(tb.allumer(1, 3), run_time=0.3)
        self.au_mot("on peut additionner")
        phr = self.t("On peut additionner deux colonnes.", 36, FLECHE_COL).move_to(P(self.X0, -3.15))
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.4)
        self.au_mot("colonnes")
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=FLECHE_COL, scale_factor=1.08) for c in (1, 2, 3)],
                              lag_ratio=0.35), run_time=1.1)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (3 coffres = 12 pièces ; 6 coffres ?) ───────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        trois = VGroup(*[coffre(1.0) for _ in range(3)]).arrange(RIGHT, buff=0.3)
        deco = VGroup(noah(0.9).move_to(P(-5.6, -1.0)), trois.move_to(P(-2.6, 0.4)))
        self.add(deco)
        tb = TableauProp(["Coffres", "Prix (pièces)"], [[3, 6], [12, "?"]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.8, fs=38, centre=P(-3.3, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["6 coffres :"])
            l0b = sc.ligne_rep(1, ["le double de", "3 coffres."])
            l0 = VGroup(l0[0], *l0b)
            l1 = sc.ligne_rep(2, ["12 ×", "2 =", "24 pièces."])
            h = self.muet(tb.fleche_col(0, 1, "× 2", ligne=0))
            b = self.muet(tb.fleche_col(0, 1, "× 2", ligne=1))
            sc.au_mot("6 coffres")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("double")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("3 coffres")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("Le prix double")
            sc.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), FadeIn(tb.trou(1, 1)), run_time=0.35)
            sc.au_mot("12 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("2, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("24 pièces")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 24), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["3 coffres coûtent", "12 pièces.", "Combien coûtent 6 coffres ?"],
                            [self.t("15 pièces", 34), self.t("24 pièces", 34), self.t("18 pièces", 34)], 1,
                            ["6 coffres :", "le double de 3 coffres.", "12 × 2 = 24 pièces."], mot_q="3 coffres",
                            autres_r=apres)

    # ── 06 : la moitié ──────────────────────────────────────────────────────
    def ecran_moitie(self):
        self.ecran("06-moitie")
        tb, deja = self.table_potions({(r, c) for r in range(2) for c in (1, 2, 3)})
        self.add(deja)
        self.au_mot("Et 1")
        self.play(tb.remplir(0, 0), run_time=0.4)
        h = tb.fleche_col(1, 0, "÷ 2", ligne=0)
        self.au_mot("moitié")
        self.play(tb.allumer(0, 0), tb.allumer(0, 1), Create(h.fleche), run_time=0.5)
        self.au_mot("2. On")
        self.play(FadeIn(h.etiquette, scale=1.4), run_time=0.3)
        self.insister(h.etiquette, 1.3, 0.2)
        b = tb.fleche_col(1, 0, "÷ 2", ligne=1)
        self.au_mot("divise")
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), tb.allumer(1, 1), Create(b.fleche), run_time=0.5)
        self.au_mot("2 : 10")
        self.play(FadeIn(b.etiquette, scale=1.4), run_time=0.3)
        lg = self.ligne_c([("10 ÷", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("5 pièces", VERT_OK)], -1.55)
        self.poser_lignes(VGroup(*lg[:3]), "fade", 0.3)
        self.au_mot("5 pièces")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 0), run_time=0.4)
        self.play(tb.allumer(1, 0), run_time=0.3)
        self.insister(lg[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 07 : le piège « + 2 » ───────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        regle = self.t("On n'ajoute pas le même nombre aux deux lignes.", 34).move_to(P(-0.4, 2.3))
        self.au_mot("On n'ajoute")
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.5)
        tb = TableauProp(["Potions", "Prix (pièces)"], [[2, 4], [10, 20]], montrer=False, largeur_case=1.7,
                         largeur_libelle=3.0, hauteur=0.95, fs=42, centre=P(-1.0, -0.1))
        self.play(FadeIn(tb.fond), FadeIn(tb.trou(0, 1)), FadeIn(tb.trou(1, 1)), run_time=0.4)
        h = tb.fleche_col(0, 1, "+ 2", ligne=0, couleur=ORANGE_RETENUE)
        dix = tb.valeur(1, 0)
        dix._pas_audit = dix.sans_synchro = True  # la donnée du tableau de Noah, dite aux écrans 01 et 02
        self.au_mot("2 potions")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(dix, scale=1.4), run_time=0.3)
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.4)
        b = tb.fleche_col(0, 1, "+ 2", ligne=1, couleur=ROUGE_P)
        self.au_mot("2 pièces")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("de plus", 2)
        self.play(Create(croix(b, sw=7)), run_time=0.4)
        self.au_mot("4 potions")
        self.play(tb.remplir(0, 1), run_time=0.4)
        lg = self.ligne_c([("20 pièces", VERT_OK), ("et pas", WHITE), ("12", ROUGE_ERREUR)], -2.8, fs=44)
        self.au_mot("20 pièces")
        self.play(tb.remplir(1, 1), FadeIn(lg[0], scale=1.3), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.au_mot("et pas")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("12")
        barre = Line(lg[2].get_corner(DL) + P(-0.08, 0), lg[2].get_corner(UR) + P(0.08, 0), color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(FadeIn(lg[2], scale=1.3), run_time=0.3)
        self.play(Create(barre), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (1 épée = 7 ; 3 épées = 21 ; 4 épées ?) ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        epees = VGroup(epee(0.9), VGroup(*[epee(0.9) for _ in range(3)]).arrange(RIGHT, buff=0.25)).arrange(
            RIGHT, buff=1.0)
        deco = VGroup(noah(0.9).move_to(P(-5.6, -1.0)), epees.move_to(P(-2.4, 0.5)))
        self.add(deco)
        tb = TableauProp(["Épées", "Prix (pièces)"], [[1, 3, 4], [7, 21, "?"]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.5, fs=38, centre=P(-2.95, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 2)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["4 =", "1 +", "3."])
            l1 = sc.ligne_rep(1, ["7 +", "21 =", "28 pièces."])
            hp, bp = tb.plus(0, 1), plus_bas(tb, 0, 1)
            sc.au_mot("4, c'est")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 2), scale=1.4), tb.allumer(0, 2),
                    run_time=0.3)
            sc.au_mot("1 plus")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(hp, scale=1.5),
                    run_time=0.3)
            sc.au_mot("3. On")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("additionne")
            sc.play(tb.eteindre(0, 2), FadeIn(bp, scale=1.5), run_time=0.3)
            sc.au_mot("7 plus")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("21, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.3)
            sc.au_mot("28 pièces")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 2, 28), run_time=0.4)
            sc.play(tb.allumer(1, 2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["1 épée coûte 7 pièces.", "3 épées coûtent 21 pièces.", "Combien coûtent 4 épées ?"],
                            [self.t("28 pièces", 34), self.t("25 pièces", 34), self.t("22 pièces", 34)], 0,
                            ["4 = 1 + 3.", "7 + 21 = 28 pièces."], mot_q="1 épée", autres_r=apres)

    # ── 09 : défi : les boucliers ───────────────────────────────────────────
    LIBS_B = ["Boucliers", "Prix (pièces)"]
    VALS_B = [[2, 4, 8, 10], [6, 12, 24, 30]]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb, _ = self.table_potions(set(), vals=self.VALS_B, libs=self.LIBS_B)
        self.au_mot("4 boucliers")
        quatre = VGroup(*[bouclier(0.8) for _ in range(4)]).arrange(RIGHT, buff=0.2).move_to(P(self.X0, -0.75))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(0, 1), scale=1.4),
                  LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in quatre], lag_ratio=0.2), run_time=0.7)
        self.au_mot("12 pièces")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.35)
        for c, mot in ((2, "8 boucliers"), (0, "2 boucliers"), (3, "10 boucliers")):
            self.au_mot(mot)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(tb.trou(1, c), scale=1.3), run_time=0.35)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb, deja = self.table_potions({(0, 0), (0, 1), (0, 2), (0, 3), (1, 1)}, centre=P(self.X0, 0.75),
                                      vals=self.VALS_B, libs=self.LIBS_B)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.add(deja)
        self.play(Write(tit), run_time=0.5)
        # 8 = le double de 4
        h1 = self.muet(tb.fleche_col(1, 2, "× 2", ligne=0))
        b1 = tb.fleche_col(1, 2, "× 2", ligne=1)
        self.au_mot("8, c'est")
        self.play(tb.allumer(0, 2), run_time=0.3)
        self.au_mot("double")
        self.play(tb.allumer(0, 1), Create(h1.fleche), FadeIn(h1.etiquette, scale=1.3), run_time=0.4)
        l1 = self.ligne_c([("12 ×", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("24 pièces", VERT_OK)], -1.65, fs=36)
        l1.align_to(P(-4.6, 0), LEFT)
        self.au_mot("12 fois")
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 2), Create(b1.fleche), FadeIn(l1[0], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("2, égale")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), FadeIn(l1[2]), FadeIn(b1.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("24 pièces")
        self.play(FadeIn(l1[3], scale=1.3), tb.remplir(1, 2), run_time=0.4)
        # 2 = la moitié de 4
        h2 = self.muet(tb.fleche_col(1, 0, "÷ 2", ligne=0))
        b2 = tb.fleche_col(1, 0, "÷ 2", ligne=1)
        self.au_mot("2, c'est")
        self.play(tb.allumer(0, 0), run_time=0.3)
        self.au_mot("moitié")
        self.play(tb.allumer(0, 1), Create(h2.fleche), FadeIn(h2.etiquette, scale=1.3), run_time=0.4)
        l2 = self.ligne_c([("12 ÷", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("6 pièces", VERT_OK)], -2.4, fs=36)
        l2.align_to(l1, LEFT)
        self.au_mot("12 divisé")
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), Create(b2.fleche), FadeIn(l2[0], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("2, égale 6")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(l2[2]), FadeIn(b2.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("6 pièces")
        self.play(FadeIn(l2[3], scale=1.3), tb.remplir(1, 0), run_time=0.4)
        # 10 = 8 + 2
        l3 = self.ligne_c([("10 =", WHITE), ("8 +", WHITE), ("2 :", WHITE), ("24 +", WHITE), ("6 =", WHITE),
                           ("30 pièces", VERT_OK)], -3.15, fs=36)
        l3.align_to(l1, LEFT)
        self.au_mot("10, c'est")
        self.play(FadeOut(VGroup(h1, b1, h2, b2)), tb.allumer(0, 3), FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("8 plus")
        self.play(tb.allumer(0, 2), FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2 : 24")
        self.play(tb.allumer(0, 0), FadeIn(l3[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("24 plus")
        self.play(*[tb.eteindre(0, c) for c in (0, 2, 3)], tb.allumer(1, 2), FadeIn(l3[3], shift=RIGHT * 0.2),
                  run_time=0.3)
        self.au_mot("6, égale")
        self.play(tb.allumer(1, 0), FadeIn(l3[4], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("30 pièces")
        self.play(FadeIn(l3[5], scale=1.3), tb.remplir(1, 3), run_time=0.4)
        self.play(tb.eteindre(1, 0), tb.eteindre(1, 2), tb.allumer(1, 3), run_time=0.3)
        self.insister(l3[5], 1.15, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb, deja = self.table_potions({(r, c) for r in range(2) for c in range(4)}, centre=ORIGIN)
        fig = VGroup(deja, tb.fleche_col(1, 2, "× 2", ligne=0), tb.fleche_col(1, 0, "÷ 2", ligne=1),
                     plus_bas(tb, 2, 3))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une colonne double :", "le prix double aussi."),
            ("On peut prendre la moitié,", "ou additionner deux colonnes."),
            ("On n'ajoute jamais le même", "nombre aux deux lignes.")], fs=36)
        self.au_mot("quand une colonne")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=FLECHE_COL))
        self.au_mot("On peut prendre")
        self.montrer_ligne(lignes[1], Indicate(fig[2], color=FLECHE_COL))
        self.au_mot("Mais on")
        self.montrer_ligne(lignes[2])
        lignes[2][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_double()
        self.ecran_addition()
        self.ecran_question1()
        self.ecran_moitie()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropTableau6e(PropTableauBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
