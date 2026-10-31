# prop_echelle_reelle_short.py
# EleveAI — Maths 6e ET 4e — short jumeau de l'épisode COMMUN 08 « Du plan
# vers la réalité » (micro echelle_distance_reelle, notion prop_echelle).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT l'échelle.
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les deux noms.
# Il AMUSE : « Une carte au trésor. Sauras-tu trouver le coffre ? »
#   · EN HAUT, l'image qui bouge : la carte au trésor (1 cm ↔ 20 pas) ; le
#     pirate marche du grand palmier jusqu'à la croix, ses traces de pas
#     apparaissent cm par cm ;
#   · EN BAS, au même instant, le tableau carte (cm) → pas se remplit et le
#     calcul s'écrit (6 × 20 = 120) : le pirate arrive sur la croix pile quand
#     la voix dit « 120 », le coffre sort ;
#   · 1 question-pause (3 s) : palmier → rocher 4 cm ? (80 pas) ; leurres :
#     24 (ajouter : 4 + 20), 5 (inverser : 20 ÷ 4) ;
#   · fin : le bateau est à 15 cm du trésor, combien de pas ? (300) en
#     commentaire.
# Centres d'intérêt : jeux-defis, histoire-geographie. Échelle inventée :
# aucun chiffre du monde réel, rien à sourcer.
# Ajouté ICI (absent du module) : pirate(), palmier(), rocher() (non utilisé), bateau(),
# croix_tresor(), pas_pirate(), carte_tresor() ; la flèche « × 20 » dont
# l'étiquette passe AU-DESSUS du tableau (cadre étroit, leçon du lot 1).
#
# Voix : manim/voix/commun-prop-echelle-reelle-short.json (validée, débit −10) ;
# WAV : public/sons/commun-prop-echelle-reelle-short/ ; marques :
# manim/scripts/6e/prop_echelle_reelle_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_echelle_reelle_short.py PropEchelleReelleShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_echelle_reelle_short.py PropEchelleReelleShort -o eleveai-maths-6e-prop-echelle-reelle-short --media_dir manim/scripts/6e/media-prop-echelle-reelle
# Sorties : manim/sorties/6e/maths/proportionnalite/08-echelle-reelle/eleveai-maths-6e-prop-echelle-reelle-short.mp4
#           manim/sorties/4e/maths/proportionnalite/08-echelle-reelle/eleveai-maths-4e-prop-echelle-reelle-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from prop_tableau import coffre  # noqa: E402

U = 0.55          # 1 cm de la carte, à l'écran
Y_SOL = 0.78      # le sentier du pirate, dans la bande du haut
X_PALM = -1.5
BRUN = "#92400e"
OR_T = "#facc15"


def carte_tresor(l=4.1, h=2.1, mer=False):
    """Le parchemin de la carte au trésor (bords brûlés), une bande de mer
    à gauche si mer=True."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.18, fill_color="#fde68a", fill_opacity=1,
                            stroke_color="#b45309", stroke_width=5)
    g = VGroup(fond)
    if mer:
        g.add(RoundedRectangle(width=l * 0.32, height=h - 0.1, corner_radius=0.14, fill_color="#7dd3fc",
                               fill_opacity=1, stroke_width=0).align_to(fond, LEFT).shift(RIGHT * 0.05))
    for x, y in ((0.4, -0.35), (-0.05, 0.38), (0.1, -0.38)):
        g.add(Circle(radius=0.05, fill_color="#d97706", fill_opacity=0.6, stroke_width=0).move_to(P(l * x, h * y)))
    return g


def palmier(s=1.0):
    tronc = VGroup(*[RoundedRectangle(width=0.14 - 0.012 * k, height=0.17, corner_radius=0.05, fill_color="#a16207",
                                      fill_opacity=1, stroke_color="#713f12", stroke_width=1.5)
                     .move_to(P(0.02 * k, 0.085 + 0.15 * k)) for k in range(6)])
    haut = P(0.12, 0.95)
    palmes = VGroup(*[Ellipse(width=0.62, height=0.15, fill_color="#16a34a", fill_opacity=1, stroke_color="#14532d",
                              stroke_width=1.5).move_to(haut + P(0.27 * np.cos(a), 0.12 * np.sin(a) - 0.04))
                      .rotate(a if np.cos(a) > 0 else a - PI, about_point=haut)
                      for a in (0.4, 1.3, 2.0, 2.8, -0.3)])
    noix = VGroup(*[Circle(radius=0.045, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(haut + P(x, -0.08))
                    for x in (-0.05, 0.05)])
    return VGroup(tronc, palmes, noix).scale(s)


def rocher(s=1.0):
    return Polygon(P(-0.3, 0), P(0.3, 0), P(0.22, 0.24), P(0.02, 0.36), P(-0.2, 0.26), fill_color="#78716c",
                   fill_opacity=1, stroke_color="#44403c", stroke_width=2).scale(s)


def bateau(s=1.0):
    coque = Polygon(P(-0.45, 0.12), P(0.45, 0.12), P(0.3, -0.12), P(-0.3, -0.12), fill_color=BRUN, fill_opacity=1,
                    stroke_color="#451a03", stroke_width=2)
    mat = Line(P(0, 0.12), P(0, 0.8), color="#451a03", stroke_width=3)
    voile = Polygon(P(0.03, 0.75), P(0.03, 0.22), P(0.36, 0.25), fill_color=WHITE, fill_opacity=1, stroke_width=1)
    drapeau = Polygon(P(0, 0.8), P(0, 0.68), P(-0.16, 0.74), fill_color=BLACK, fill_opacity=1, stroke_width=0)
    return VGroup(coque, mat, voile, drapeau).scale(s)


def croix_tresor(r=0.15):
    return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke("#dc2626", 7)


def pirate(s=1.0):
    """Le pirate : bandana rouge, bandeau sur l'œil."""
    p = personne(peau="#c68642", tenue="#1e3a8a", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bandana = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color="#dc2626",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.5)
    noeud = Triangle(fill_color="#dc2626", fill_opacity=1, stroke_width=0).scale(r * 0.35).rotate(-PI / 2).move_to(
        c + P(-r * 1.15, r * 0.25))
    oeil = Circle(radius=r * 0.2, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.35, 0))
    sangle = Line(c + P(-r, r * 0.45), c + P(r * 0.95, -r * 0.1), color=BLACK, stroke_width=2)
    p.add(bandana, noeud, sangle, oeil)
    return p


def pas_pirate(x, y=Y_SOL - 0.12):
    """Une paire de traces de pas, à l'abscisse x."""
    return VGroup(*[Ellipse(width=0.09, height=0.05, fill_color="#78350f", fill_opacity=0.85, stroke_width=0)
                    .move_to(P(x + dx, y + dy)) for dx, dy in ((-0.05, 0.03), (0.06, -0.03))])


class PropEchelleReelleShort(ShortProp):
    nom_voix = "commun-prop-echelle-reelle-short"
    fichier_marques = "prop_echelle_reelle_short_marques.json"
    ceinture = "blanche"

    def tableau(self):
        return TableauProp(["Carte (cm)", "Pas"], [[1, 6], [20, 120]], montrer=False, largeur_case=0.8,
                           largeur_libelle=1.3, hauteur=0.66, fs=28, marge=0.14, centre=P(-0.35, -1.05))

    def fleche_20(self, tb):
        """La flèche « × 20 » à droite, son étiquette AU-DESSUS (cadre étroit)."""
        fl = tb.fleche_lat("× 20", fs=28)
        e = fl.etiquette
        e.move_to(P(min(fl.fleche.get_center()[0], 1.95 - e.width / 2), tb.carte.get_top()[1] + 0.08 + e.height / 2))
        return fl

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["4 ×", "20 =", "80 pas."])
        for m, mot in zip(lg, ["4 fois", "20, égale", "80 pas"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La carte au trésor", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        carte = carte_tresor().move_to(P(0, 1.2))
        palm = palmier(0.8).move_to(P(X_PALM, Y_SOL), aligned_edge=DOWN)
        x_t = X_PALM + 6 * U
        tb = self.tableau()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Une carte")
        self.play(Write(titre), FadeIn(carte, scale=0.8), run_time=0.6)
        self.play(FadeIn(palm, shift=UP * 0.15), run_time=0.4)
        ch = coffre(1.5).move_to(P(0, -1.1))
        q = Text("?", font_size=80, color=ORANGE_RETENUE, weight=BOLD).next_to(ch, RIGHT, buff=0.3)
        self.au_mot("coffre")
        self.play(FadeIn(ch, scale=0.6), FadeIn(q, scale=1.5), run_time=0.4)
        self.play(Wiggle(ch), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'échelle de la carte ──
        self.dire("01-echelle")
        car = VGroup(Text("1 cm", font_size=26, color="#1d4ed8", weight=BOLD),
                                       Text("→", font_size=26, color=NUIT),
                                       Text("20 pas", font_size=26, color="#15803d", weight=BOLD)).arrange(RIGHT, buff=0.12)
        cadre = SurroundingRectangle(car, color=BRUN, buff=0.1, corner_radius=0.08, stroke_width=3,
                                     fill_color="#fef3c7", fill_opacity=1)
        VGroup(cadre, car).move_to(P(0.55, 1.88))
        self.au_mot("Sur la carte")
        self.play(FadeOut(VGroup(ch, q)), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.45)
        self.au_mot("1 cm")
        self.play(FadeIn(cadre), FadeIn(car[0], scale=1.3), FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0),
                  run_time=0.4)
        self.au_mot("20 pas")
        self.play(FadeIn(car[1]), FadeIn(car[2], scale=1.3), FadeIn(tb.valeur(1, 0), scale=1.4), tb.eteindre(0, 0),
                  tb.allumer(1, 0), run_time=0.4)
        self.play(tb.eteindre(1, 0), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : le trésor à 6 cm du palmier ──
        self.dire("02-tresor")
        xt = croix_tresor().move_to(P(x_t, Y_SOL))
        pir = pirate(0.33).move_to(P(X_PALM + 0.35, Y_SOL), aligned_edge=DOWN)
        self.au_mot("Le trésor")
        self.play(Create(xt), FadeIn(pir, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Flash(xt, color="#dc2626", line_length=0.15), run_time=0.4)
        chemin = DashedLine(P(X_PALM + 0.1, Y_SOL - 0.18), P(x_t, Y_SOL - 0.18), color="#1d4ed8", stroke_width=5,
                            dash_length=0.1)
        traits = VGroup(*[Line(P(X_PALM + 0.1 + k * U * (6 * U - 0.1) / (6 * U), Y_SOL - 0.11),
                               P(X_PALM + 0.1 + k * U * (6 * U - 0.1) / (6 * U), Y_SOL - 0.25),
                               color="#1d4ed8", stroke_width=3) for k in range(7)])
        l6 = Text("6 cm", font_size=26, color="#1d4ed8", weight=BOLD).move_to(P((X_PALM + x_t) / 2, Y_SOL - 0.42))
        self.au_mot("6 cm")
        self.play(Create(chemin), Create(traits), FadeIn(l6, scale=1.3), FadeIn(tb.valeur(0, 1), scale=1.4),
                  FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1), run_time=0.5)
        self.au_mot("grand palmier")
        self.play(Indicate(palm, color="#4ade80", scale_factor=1.12), tb.eteindre(0, 1), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 03 : 6 × 20 = 120 : le pirate marche, le tableau se remplit ──
        self.dire("03-calcul")
        fl = self.fleche_20(tb)
        lg = self.ligne([("6 ×", WHITE), ("20 =", AMBRE), ("120", VERT_OK)], 36).move_to(P(-0.2, -2.2))
        xs = [X_PALM + 0.1 + k * (6 * U - 0.1) / 6 for k in range(7)]

        def marcher(k0, k1):
            return Succession(*[AnimationGroup(pir.animate.move_to(P(xs[k] + 0.0, Y_SOL), aligned_edge=DOWN),
                                               FadeIn(pas_pirate(xs[k] - 0.15), scale=0.5))
                                for k in range(k0 + 1, k1 + 1)])

        self.au_mot("6 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.15), Create(fl.fleche), marcher(0, 3), run_time=0.55)
        self.au_mot("20, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.15), FadeIn(fl.etiquette, scale=1.3), marcher(3, 6), run_time=0.7)
        ch2 = coffre(0.55).move_to(P(x_t, Y_SOL + 0.32))
        self.au_mot("120.")
        self.play(FadeIn(lg[2], scale=1.3), tb.remplir(1, 1, 120), tb.allumer(1, 1), FadeOut(xt),
                  pir.animate.shift(LEFT * 0.35), FadeIn(ch2, shift=UP * 0.3), run_time=0.45)
        self.play(Flash(ch2, color=OR_T, line_length=0.2, num_lines=10), run_time=0.5)
        fin = self.ligne([("Il faut faire", WHITE), ("120 pas !", VERT_OK)], 28).move_to(P(0, -2.8))
        self.au_mot("Il faut")
        self.play(FadeIn(fin[0], shift=UP * 0.12), tb.eteindre(1, 1), run_time=0.35)
        self.au_mot("120 pas")
        self.play(FadeIn(fin[1], scale=1.3), run_time=0.35)
        self.play(Circumscribe(fin[1], color=VERT_OK, buff=0.06), run_time=0.6)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        # (une petite carte palmier → rocher en bas chevauchait « Mets pause » : retirée)
        self.question_pause("04-question", "04b-reponse", ["Du palmier au rocher : 4 cm.", "Combien de pas ?"],
                            [self.t("24 pas", 30), self.t("80 pas", 30), self.t("5 pas", 30)], 1,
                            ["4 × 20 = 80 pas."], mot_q="Du palmier", autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire : le bateau à 15 cm ──
        self.dire("05-commentaire")
        c5 = carte_tresor(mer=True).move_to(P(0, 1.2))
        coffre5 = coffre(0.55).move_to(P(1.45, 1.1))
        self.au_mot("Et toi")
        self.play(FadeIn(c5, scale=0.9), FadeIn(coffre5), run_time=0.4)
        bt = bateau(0.85).move_to(P(-1.45, 1.25))
        self.au_mot("Le bateau")
        self.play(FadeIn(bt, shift=RIGHT * 0.3), run_time=0.45)
        ligne15 = DashedLine(bt.get_right() + P(0.05, -0.2), coffre5.get_left() + P(-0.05, 0), color="#1d4ed8",
                             stroke_width=5, dash_length=0.1)
        l15 = Text("15 cm", font_size=28, color="#1d4ed8", weight=BOLD).next_to(ligne15, DOWN, buff=0.12)
        self.au_mot("15 cm")
        qq = self.borne(self.ligne([("15 cm", BLEU_CALCUL), ("→ ? pas", VERT_OK)], 42), 0.9).move_to(P(0, -0.35))
        qq[1].sans_synchro = True
        self.play(Create(ligne15), FadeIn(l15, scale=1.3), FadeIn(qq[0], scale=1.3), run_time=0.45)
        self.au_mot("Combien")
        self.play(FadeIn(qq[1], shift=RIGHT * 0.2), run_time=0.4)
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-1.45)
