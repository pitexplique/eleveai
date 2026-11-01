# prop_reconnaitre.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 20 : RECONNAÎTRE LA PROPORTIONNALITÉ (micro du coach :
# prop_reconnaitre, notion prop_proportionnalite), AVEC VOIX. PAYSAGE SEULEMENT
# (le short de la micro existe déjà : 4e-prop-*-short-*). CEINTURE VERTE.
# ⭐ Méthode travaillée : les QUOTIENTS (prix ÷ distance : le même nombre, le
# coefficient) et le GRAPHIQUE (points alignés avec l'origine). Pas de produit
# en croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Fil rouge (erreur 2) : croire tout proportionnel. La PRISE EN CHARGE du
# taxi (4 € pour monter) casse la proportionnalité ; l'âge et la taille ; le
# forfait ; le tarif dégressif du défi. Leurres : question 1, B = ajouter au
# lieu de multiplier (24 − 15) ; question 2, B (forfait) et C (taille) barrés
# quand la voix les cite.
#
# Décor et métier : TRANSPORTS, Hugo, CHAUFFEUR DE TAXI (4 € pour monter, puis
# 2 € par km) ; un vélo-taxi (3 € par km) ; une pompe à essence ; une salle
# d'escalade (défi).
# Centres d'intérêt : transports, argent-budget.
# Chiffres réels : essence ≈ 1,80 €/L (ordre de grandeur, exemple de la voix ;
# prix-carburant.eu, relevé le 01/11/2026 : SP95-E10 moyenne 2025 = 1,70 €/L,
# 1,90 €/L au 30/06/2026, ≈ 2,14 €/L le 10/10/2026). Taille à 2 ans ≈ 85 cm
# (médiane OMS 0-5 ans : 85,7 cm filles, 87,1 cm garçons). Les tarifs du taxi,
# du vélo-taxi et de l'escalade sont inventés, plausibles.
#
# Écrans : 00 garde · 01 Hugo, la cliente, 4 € + 2 € par km · 02 le tableau
# (10 km → 24 €, 20 km → 44 €, pas 48 €) avec les barres « 4 € + … » ·
# 03 les quotients 2,4 ≠ 2,2 · 04 QUESTION 1 (vélo-taxi) · 05 le graphique
# (DroiteOrigine : vélo-taxi par l'origine, Hugo part de 4 €) · 06 piège âge
# et taille (8 m 50) · 07 QUESTION 2 (essence, forfait, taille) · 08 défi
# escalade · 08b correction (12 ≠ 10, dégressif) · 09 ce que tu as appris ·
# 10 fin.
#
# Voix : manim/voix/4e-prop-reconnaitre.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-reconnaitre/ ; marques mot à mot :
# manim/scripts/4e/prop_reconnaitre_marques.json (scripts/marques_dump.ps1
# puis le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropAgrandissementRapportBase (ligne_rep, lc, jouer) ;
# _disposer_q et question_pause de l'épisode 18 (coche loin du texte).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_reconnaitre.py PropReconnaitre4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_reconnaitre.py PropReconnaitre4e -o eleveai-maths-4e-prop-reconnaitre --media_dir manim/media-prop-4e-20
# Sortie : manim/sorties/4e/maths/proportionnalite/20-reconnaitre/eleveai-maths-4e-prop-reconnaitre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import PropAgrandissementRapportBase, gras, sans  # noqa: E402

JAUNE_TAXI = "#facc15"
FIXE_C = "#94a3b8"     # la prise en charge (4 €) : gris
KM_C = "#38bdf8"       # le prix des kilomètres : bleu
VELO_C = "#22c55e"     # le vélo-taxi : vert
HUGO_C = "#fb923c"     # le taxi de Hugo : orange


def hugo(s=1.0):
    """Hugo, chauffeur de taxi : veste sombre, casquette jaune."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#3f2a14", s=s)
    t = p.tete
    visiere = RoundedRectangle(width=t.width * 0.75, height=t.height * 0.16, corner_radius=0.04 * s,
                               fill_color=JAUNE_TAXI, fill_opacity=1, stroke_width=0)
    calotte = AnnularSector(inner_radius=0, outer_radius=t.width * 0.55, angle=PI, start_angle=0,
                            fill_color=JAUNE_TAXI, fill_opacity=1, stroke_width=0)
    calotte.move_to(t.get_top() + DOWN * t.height * 0.08)
    visiere.next_to(calotte, DOWN, buff=0).shift(RIGHT * t.width * 0.25)
    p.add(calotte, visiere)
    return p


def cliente(s=1.0):
    """La cliente : cheveux longs, manteau rouge, un sac."""
    p = personne(peau="#8d5524", tenue="#be123c", cheveux="#111827", longs=True, s=s)
    sac = RoundedRectangle(width=0.35 * s, height=0.3 * s, corner_radius=0.05 * s, fill_color="#78350f",
                           fill_opacity=1, stroke_width=0).move_to(p.corps.get_center() + P(0.65 * s, -0.3 * s))
    p.add(sac)
    return p


def roue(r, c):
    return VGroup(Circle(radius=r, fill_color="#111827", fill_opacity=1, stroke_color="#475569", stroke_width=3),
                  Circle(radius=r * 0.4, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)).move_to(c)


def taxi(s=1.0):
    """Un taxi jaune vu de profil, son enseigne TAXI sur le toit."""
    caisse = RoundedRectangle(width=3.2, height=0.75, corner_radius=0.2, fill_color=JAUNE_TAXI, fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.2))
    toit = Polygon(P(-0.95, 0.55), P(0.85, 0.55), P(0.55, 1.15), P(-0.65, 1.15), fill_color=JAUNE_TAXI,
                   fill_opacity=1, stroke_width=0)
    vitres = VGroup(Polygon(P(-0.8, 0.6), P(-0.08, 0.6), P(-0.08, 1.05), P(-0.58, 1.05)),
                    Polygon(P(0.02, 0.6), P(0.72, 0.6), P(0.48, 1.05), P(0.02, 1.05))).set_fill("#bae6fd", 1) \
        .set_stroke(width=0)
    enseigne = RoundedRectangle(width=0.8, height=0.3, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                                stroke_color="#111827", stroke_width=2).move_to(P(-0.05, 1.32))
    mot = Text("TAXI", font_size=18, color="#111827", weight=BOLD).move_to(enseigne)
    damier = VGroup(*[Square(0.14, fill_color="#111827" if (i + j) % 2 else WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(P(-1.3 + i * 0.14, 0.18 + j * 0.14)) for i in range(19) for j in range(1)])
    roues = VGroup(roue(0.33, P(-1.0, -0.2)), roue(0.33, P(1.0, -0.2)))
    g = VGroup(toit, caisse, vitres, damier, enseigne, mot, roues).scale(s)
    sans(g)
    return g


def velo_taxi(s=1.0):
    """Un vélo-taxi (triporteur) : deux roues arrière, une banquette, une capote verte."""
    r1, r2 = roue(0.35, P(-0.9, -0.5)), roue(0.35, P(1.0, -0.5))
    cadre = VGroup(Line(P(-0.9, -0.5), P(-0.1, 0.1)), Line(P(-0.1, 0.1), P(1.0, -0.5)),
                   Line(P(-0.9, 0.35), P(-0.9, -0.5)), Line(P(-1.1, 0.4), P(-0.75, 0.4))).set_stroke("#e2e8f0", 6)
    banquette = RoundedRectangle(width=1.0, height=0.25, corner_radius=0.08, fill_color="#7c2d12", fill_opacity=1,
                                 stroke_width=0).move_to(P(0.85, 0.15))
    capote = Arc(radius=0.6, start_angle=0, angle=PI, arc_center=P(0.85, 0.3), stroke_width=0,
                 fill_color=VELO_C, fill_opacity=1)
    selle = RoundedRectangle(width=0.35, height=0.1, corner_radius=0.04, fill_color="#111827", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.1, 0.2))
    return VGroup(cadre, r1, r2, banquette, capote, selle).scale(s)


def pompe_essence(s=1.0):
    """Une pompe à essence : colonne verte, écran, pistolet et son tuyau."""
    col = RoundedRectangle(width=1.1, height=2.0, corner_radius=0.12, fill_color="#16a34a", fill_opacity=1,
                           stroke_width=0)
    ecran = RoundedRectangle(width=0.8, height=0.45, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                             stroke_width=0).move_to(col.get_top() + DOWN * 0.45)
    socle = Rectangle(width=1.4, height=0.2, fill_color="#334155", fill_opacity=1, stroke_width=0) \
        .next_to(col, DOWN, buff=0)
    tuyau = VMobject(stroke_color="#111827", stroke_width=7).set_points_smoothly(
        [col.get_right() + DOWN * 0.1, col.get_right() + P(0.45, -0.5), col.get_right() + P(0.4, 0.4)])
    pistolet = RoundedRectangle(width=0.18, height=0.45, corner_radius=0.05, fill_color="#111827", fill_opacity=1,
                                stroke_width=0).move_to(col.get_right() + P(0.4, 0.55))
    return VGroup(col, ecran, socle, tuyau, pistolet).scale(s)


def mur_escalade(s=1.0):
    """Un mur d'escalade : panneau incliné et prises colorées."""
    mur = Polygon(P(-1.2, -1.4), P(1.2, -1.4), P(0.9, 1.4), P(-1.4, 1.4), fill_color="#475569", fill_opacity=1,
                  stroke_color="#cbd5e1", stroke_width=3)
    cols = ["#f43f5e", "#facc15", "#22c55e", "#38bdf8", "#a855f7"]
    pos = [(-0.8, -1.0), (0.3, -0.8), (-0.3, -0.3), (0.6, 0.0), (-0.7, 0.35), (0.1, 0.6), (-0.4, 1.0), (0.5, 1.1)]
    prises = VGroup(*[Circle(radius=0.11, fill_color=cols[i % 5], fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for i, (x, y) in enumerate(pos)])
    corde = Line(P(0.75, 1.4), P(0.75, -1.4), color="#fde68a", stroke_width=3)
    return VGroup(mur, prises, corde).scale(s)


def enfant(h, couleur="#38bdf8"):
    """Silhouette de hauteur totale h, pieds en (0, 0) (celle du pilote 6e)."""
    r = h / 12
    tete = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, h - r))
    corps = RoundedRectangle(width=h * 0.26, height=h * 0.45, corner_radius=h * 0.06, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).move_to(P(0, h * 0.58))
    jambes = VGroup(*[RoundedRectangle(width=h * 0.09, height=h * 0.4, corner_radius=h * 0.04,
                                       fill_color=couleur, fill_opacity=1, stroke_width=0)
                      .move_to(P(x * h * 0.07, h * 0.2)) for x in (-1, 1)])
    bras = VGroup(*[RoundedRectangle(width=h * 0.07, height=h * 0.36, corner_radius=h * 0.03,
                                     fill_color=couleur, fill_opacity=1, stroke_width=0)
                    .move_to(P(x * h * 0.17, h * 0.6)).rotate(x * 0.25) for x in (-1, 1)])
    return VGroup(jambes, bras, corps, tete)


def bulle(lignes, fs=28, couleur=NUIT, largeur=None):
    """Une bulle de parole claire (textes renvoyés dans .textes, à poser au mot)."""
    ts = VGroup(*[Text(s, font_size=fs, color=couleur) for s in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
    fond = RoundedRectangle(width=largeur or ts.width + 0.5, height=ts.height + 0.4, corner_radius=0.2,
                            fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(ts)
    g = VGroup(fond, ts)
    g.fond, g.textes = fond, ts
    return g


def barre_prix(fixe, km, u=0.12, h=0.55, fs=26):
    """Le prix du taxi en barre : le bloc gris de la prise en charge PUIS le bloc
    bleu des kilomètres. .fixe, .km (VGroup(rectangle, texte))."""
    def bloc(e, c):
        r = Rectangle(width=e * u, height=h, fill_color=c, fill_opacity=1, stroke_color=BLACK, stroke_width=3)
        t = Text(f"{e} €", font_size=fs, color=BLACK, weight=BOLD)
        if t.width > r.width - 0.08:  # bloc étroit : le prix écrit au-dessus, de sa couleur
            return VGroup(r, t.set_color(c).next_to(r, UP, buff=0.08))
        return VGroup(r, t.move_to(r))
    a, b = bloc(fixe, FIXE_C), bloc(km, KM_C)
    b.next_to(a, RIGHT, buff=0)
    g = VGroup(a, b)
    g.fixe, g.km = a, b
    return g


class PropReconnaitreBase(PropAgrandissementRapportBase):
    nom_voix = "4e-prop-reconnaitre"
    fichier_marques = "prop_reconnaitre_marques.json"
    LIBS = ["Distance (km)", "Prix (€)"]

    # -- les outils de l'épisode 18 (coche loin du texte, choix figés à la réponse) --
    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        for c in r[2]:
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.8
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        return r

    def question_pause(self, *a, **k):
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def montre(self, mot, *anims, n=1, rt=0.4):
        if isinstance(mot, tuple):
            mot, n = mot
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def table_taxi(self, montrer=False, centre=P(-3.3, 1.5), quotients=False):
        libs = self.LIBS + (["Prix ÷ distance"] if quotients else [])
        vals = [[10, 20], [24, 44]] + ([[2.4, 2.2]] if quotients else [])
        return TableauProp(libs, vals, montrer=montrer, largeur_case=1.5, largeur_libelle=3.0, fs=36,
                           centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître la proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tx = taxi(0.9).move_to(P(-1.0, 0.3))
        nom = self.t("Le taxi de Hugo", 40, JAUNE_TAXI).next_to(tx, RIGHT, buff=0.5)
        self.au_mot("Le taxi")
        self.play(FadeIn(tx, shift=RIGHT * 1.5), FadeIn(nom, shift=LEFT * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, la cliente, 4 € pour monter puis 2 € par km ──────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        h = hugo(0.9).move_to(P(-5.5, 0.55))
        tx = taxi(1.0).move_to(P(-3.3, -2.15))
        cl = cliente(0.9).move_to(P(-1.1, 0.55))
        L0 = self.lc([("Hugo", BLEU_CALCUL), ("chauffeur de taxi", WHITE)], 2.9, fs=38)
        self.jouer(L0, ["Voici Hugo", "chauffeur"], {0: [FadeIn(h, shift=UP * 0.3)],
                                                      1: [FadeIn(tx, shift=RIGHT * 1.0)]})
        b = bulle(["10 km, ça fera combien ?"], fs=28).next_to(cl, UP, buff=0.3)
        b.shift(LEFT * (b.get_right()[0] - 0.4) if b.get_right()[0] > 0.4 else 0)
        for f in b.textes:
            f.sans_synchro = True  # posée au mot « 10 kilomètres » (la phrase entière est la bulle)
        self.montre("Une cliente", FadeIn(cl, shift=LEFT * 0.4))
        self.montre("10 kilomètres", FadeIn(b.fond, scale=0.8), FadeIn(b.textes, shift=UP * 0.1), rt=0.4)
        L1 = self.lc([("4 €", FIXE_C), ("pour monter,", WHITE)], 1.6, fs=40)
        self.jouer(L1, ["4 euros", "pour monter"], {0: [Indicate(h, scale_factor=1.05)]})
        L2 = self.lc([("puis", WHITE), ("2 € par km", KM_C)], 0.75, fs=40)
        self.jouer(L2, ["puis 2", "2 euros par"])
        L3 = self.lc([("Le prix est-il proportionnel", ORANGE_RETENUE)], -0.55, fs=36)
        L4 = self.lc([("à la distance ?", ORANGE_RETENUE)], -1.15, fs=36)
        self.jouer(L3, ["Le prix est-il"])
        self.jouer(L4, ["à la distance"])
        self.attendre_voix()

    # ── 02 : le tableau : 24 € puis 44 €, et pas 48 € ───────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb = self.table_taxi()
        self.montre("Faisons un tableau", FadeIn(tb.fond, shift=UP * 0.2), rt=0.6)
        b1, b2 = barre_prix(4, 20), barre_prix(4, 40)
        b1.move_to(P(-4.9, -1.3), aligned_edge=LEFT)
        b2.move_to(P(-4.9, -2.5), aligned_edge=LEFT)
        n1 = self.t("10 km", 28).next_to(b1.fixe[0], LEFT, buff=0.2)
        n2 = self.t("20 km", 28).next_to(b2.fixe[0], LEFT, buff=0.2)
        for f in (n1, n2):
            f._pas_audit = True  # redit dans la même phrase que la case du tableau
        L1 = self.lc([("10 km :", WHITE), ("4 +", FIXE_C), ("20 =", KM_C), ("24 €", VERT_OK)], 2.65, fs=40)
        self.jouer(L1, ["10 kilomètres", "4 plus 20", "20, égale", "24 euros"],
                   {0: [FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(n1)], 1: [GrowFromEdge(b1.fixe, LEFT)],
                    2: [GrowFromEdge(b1.km, LEFT)], 3: [FadeIn(tb.valeur(1, 0), scale=1.4)]})
        L2 = self.lc([("20 km :", WHITE), ("4 +", FIXE_C), ("40 =", KM_C), ("44 €", VERT_OK)], 1.75, fs=40)
        self.jouer(L2, ["20 kilomètres", "4 plus 40", "40, égale", "44 euros"],
                   {0: [FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(n2)], 1: [GrowFromEdge(b2.fixe, LEFT)],
                    2: [GrowFromEdge(b2.km, LEFT)], 3: [FadeIn(tb.valeur(1, 1), scale=1.4)]})
        h = tb.fleche_col(0, 1, "× 2", ligne=0, hauteur=PI / 3.2)
        b = tb.fleche_col(0, 1, "pas × 2", ligne=1, couleur=ROUGE_ERREUR, hauteur=PI / 3.2)
        h.etiquette._pas_audit = b.etiquette._pas_audit = True  # la voix dit « double »
        h.etiquette.sans_synchro = b.etiquette.sans_synchro = True
        self.montre("La distance double", Create(h.fleche), FadeIn(h.etiquette, scale=1.3), tb.allumer(0, 0),
                    tb.allumer(0, 1), rt=0.5)
        self.au_mot("10, puis")
        self.play(Indicate(tb.textes[0][0], color=AMBRE), run_time=0.4)
        self.au_mot("puis 20")
        self.play(Indicate(tb.textes[0][1], color=AMBRE), run_time=0.4)
        self.montre("Mais le prix", Create(b.fleche), FadeIn(b.etiquette, scale=1.3), tb.eteindre(0, 0),
                    tb.eteindre(0, 1), rt=0.5)
        L3 = self.lc([("44 €,", VERT_OK), ("et pas", WHITE), ("48 €", ROUGE_ERREUR)], 0.55, fs=42)
        L3[0]._pas_audit = True  # redit (case du tableau)
        x48 = Line(L3[2].get_left() + LEFT * 0.08, L3[2].get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                   stroke_width=6)
        self.jouer(L3, [("44 euros", 2), "et pas", "pas 48"], {0: [tb.allumer(1, 1)]})
        self.play(Create(x48), run_time=0.4)
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 30)
        self.col(v, -0.7, 1.5)
        self.montre("Le prix n'est pas", FadeIn(v, scale=1.3), Indicate(VGroup(b1.fixe, b2.fixe), color=AMBRE),
                    rt=0.5)
        self.insister(v, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : les quotients : 2,4 ≠ 2,2 ─────────────────────────────────────
    def ecran_quotients(self):
        self.ecran("03-quotients")
        tb = self.table_taxi(centre=P(-3.3, 1.2), quotients=True)
        for r in range(2):
            for c in range(2):
                tb.add(sans(tb.valeur(r, c)))
        self.add(tb)
        L0 = self.lc([("On divise chaque prix", WHITE)], 2.85, fs=36)
        L1 = self.lc([("par sa distance.", WHITE)], 2.3, fs=36)
        self.jouer(L0, ["on divise"])
        self.jouer(L1, ["par sa distance"], {0: [Circumscribe(VGroup(tb.case(0, 0), tb.case(1, 1)), color=AMBRE)]})
        L2 = self.lc([("24 ÷", WHITE), ("10 =", WHITE), ("2,4", VERT_OK)], 1.25, fs=42)
        self.jouer(L2, ["24 divisé", "par 10", "égale 2,4"],
                   {0: [tb.allumer(1, 0)], 1: [tb.allumer(0, 0)], 2: [FadeIn(tb.valeur(2, 0), scale=1.4)]})
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        L3 = self.lc([("44 ÷", WHITE), ("20 =", WHITE), ("2,2", VERT_OK)], 0.4, fs=42)
        self.jouer(L3, ["44 divisé", "par 20", "égale 2,2"],
                   {0: [tb.allumer(1, 1)], 1: [tb.allumer(0, 1)], 2: [FadeIn(tb.valeur(2, 1), scale=1.4)]})
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.3)
        L4 = self.lc([("2,4", ROUGE_ERREUR), ("≠", ROUGE_ERREUR), ("2,2", ROUGE_ERREUR)], -0.55, fs=44)
        sans(L4)  # redit : les deux quotients qu'on vient d'écrire
        self.jouer(L4, ["Les quotients", None, None],
                   {0: [tb.allumer(2, 0, "#fee2e2", "#991b1b"), tb.allumer(2, 1, "#fee2e2", "#991b1b")]},
                   run_time=0.3)
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 40)
        self.col(v, -1.45, 1.3)
        self.montre("ce n'est pas", FadeIn(v, scale=1.3), rt=0.45)
        D = [self.ligne([(s, c)], 32).move_to(P(-4.0, y)) for s, c, y in (
            ("Proportionnalité :", WHITE, -0.95), ("on multiplie toujours", WHITE, -1.5),
            ("par le même nombre :", WHITE, -2.05), ("le coefficient.", AMBRE, -2.65))]
        for d in D:
            d.align_to(P(-5.9, 0), LEFT)
        for d, mot in zip(D, ["Dans une situation", "on multiplie", "par le même", "le coefficient"]):
            self.jouer(d, [mot])
        self.insister(D[3], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (vélo-taxi : 5 km → 15 €, 8 km → 24 €) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        vt = velo_taxi(1.5).move_to(P(-3.3, 0.2))
        nom = sans(self.t("vélo-taxi", 36, VELO_C).next_to(vt, DOWN, buff=0.4))
        tb = TableauProp(self.LIBS, [[5, 8], [15, 24]], montrer=False, largeur_case=1.25, largeur_libelle=2.7,
                         fs=34, centre=P(-3.75, 0.6))

        def avant(sc):
            sc.play(FadeIn(vt, shift=RIGHT * 0.5), FadeIn(nom), run_time=0.4)

        def apres(sc):
            sc.play(FadeOut(vt), FadeOut(nom), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["15 ÷", "5 =", "3"])
            l1 = sc.ligne_rep(1, ["24 ÷", "8 =", "3"])
            l2 = sc.ligne_rep(2, ["Même quotient :", "3 € par km."])
            lat = tb.fleche_lat("× 3", fs=32)
            sc.montre("15 divisé", FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), rt=0.3)
            sc.montre("par 5", FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), rt=0.3)
            sc.montre("égale 3", FadeIn(l0[2], scale=1.3), rt=0.3)
            sc.montre("24 divisé", FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), rt=0.3)
            sc.montre("par 8", FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), rt=0.3)
            sc.montre(("égale 3", 2), FadeIn(l1[2], scale=1.3), rt=0.3)
            sc.montre("Même quotient", FadeIn(l2[0], shift=UP * 0.15), Create(lat.fleche), rt=0.4)
            sc.montre("3 euros", FadeIn(l2[1], scale=1.2), FadeIn(lat.etiquette, scale=1.3), rt=0.4)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Vélo-taxi : 5 km → 15 € ;", "8 km → 24 €.", "Le prix est-il proportionnel ?"],
                            [self.t("Oui, le coefficient est 3.", 30), self.t("Non, car 24 − 15 ≠ 3.", 30),
                             self.t("On ne peut pas savoir.", 30)], 0,
                            ["15 ÷ 5 = 3", "24 ÷ 8 = 3", "Même quotient : 3 € par km."],
                            mot_q="Un vélo-taxi", avant_q=avant, autres_r=apres)

    # ── 05 : le graphique : par l'origine, ou pas ───────────────────────────
    def repere(self, centre=P(-3.3, -0.1), largeur=5.0, hauteur=4.4):
        dr = DroiteOrigine(20, 50, 5, 10, largeur=largeur, hauteur=hauteur, fs=24, nom_x="km", nom_y="€",
                           centre=centre)
        sans(dr.fond)
        return dr

    def ecran_graphique(self):
        self.ecran("05-graphique")
        dr = self.repere()
        self.montre("On peut aussi dessiner", FadeIn(dr.fond, shift=UP * 0.2), rt=0.6)
        pv = VGroup(dr.point(5, 15, VELO_C, 0.11), dr.point(8, 24, VELO_C, 0.11))
        dv = dr.droite_origine(8, 24, VELO_C)
        L0 = self.lc([("Vélo-taxi :", VELO_C)], 2.75, fs=38)
        self.jouer(L0, ["Pour le vélo-taxi"], {0: [LaggedStart(*[FadeIn(p, scale=3) for p in pv], lag_ratio=0.4)]})
        L1 = self.lc([("alignés avec l'origine", WHITE)], 2.15, fs=36)
        self.jouer(L1, ["les points sont alignés"], {0: [Create(dv)]}, run_time=0.8)
        o = Circle(radius=0.22, color=AMBRE, stroke_width=5).move_to(dr.p(0, 0))
        self.montre("l'origine", Create(o), Flash(dr.p(0, 0), color=AMBRE, line_length=0.25), rt=0.5)
        L2 = self.lc([("0 km,", AMBRE), ("0 €", AMBRE)], 1.5, fs=38)
        self.jouer(L2, ["0 kilomètre", "0 euro"])
        ph = VGroup(dr.point(10, 24, HUGO_C, 0.11), dr.point(20, 44, HUGO_C, 0.11))
        L3 = self.lc([("Taxi de Hugo :", HUGO_C)], 0.6, fs=38)
        self.jouer(L3, ["Pour le taxi de Hugo"],
                   {0: [FadeOut(o), LaggedStart(*[FadeIn(p, scale=3) for p in ph], lag_ratio=0.4)]})
        dh = Line(dr.p(0, 4), dr.p(20, 44), color=HUGO_C, stroke_width=5)
        self.montre(("les points sont alignés", 2), Create(dh), rt=0.8)
        d4 = dr.point(0, 4, HUGO_C, 0.13)
        e4 = gras("4 €", 32, HUGO_C).move_to(dr.p(3, 30))
        e4 = VGroup(e4, Arrow(e4.get_bottom(), d4.get_center(), buff=0.12, color=HUGO_C, stroke_width=4,
                              max_tip_length_to_length_ratio=0.3))
        L4 = self.lc([("la droite part de", WHITE), ("4 €", HUGO_C)], 0.0, fs=36)
        self.jouer(L4, ["mais la droite", "4 euros"], {1: [FadeIn(d4, scale=2), FadeIn(e4, scale=1.3)]})
        self.insister(VGroup(d4, e4), 1.4, 0.25)
        x0 = croix(Circle(radius=0.2).move_to(dr.p(0, 0)), sw=6)
        L5 = self.lc([("pas par l'origine", ROUGE_ERREUR)], -0.65, fs=36)
        self.jouer(L5, ["Elle ne passe pas"], {0: [Create(x0)]})
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 40)
        self.col(v, -1.55, 1.3)
        self.montre("ce n'est pas", FadeIn(v, scale=1.3), rt=0.45)
        self.attendre_voix()

    # ── 06 : le piège : l'âge et la taille ──────────────────────────────────
    K_CM, SOL = 0.0068, -3.15

    def ecran_piege(self):
        self.ecran("06-piege")
        k, sol = self.K_CM, self.SOL
        T = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.95, fs=44)
        self.jouer(T, ["Attention"])
        sol_l = Line(P(-6.3, sol), P(0.4, sol), color=GREY_C, stroke_width=4)
        regle = VGroup(Line(P(-6.2, sol), P(-6.2, sol + 860 * k), color=GREY_B, stroke_width=5),
                       *[Line(P(-6.32, sol + m * 100 * k), P(-6.08, sol + m * 100 * k), color=GREY_B,
                              stroke_width=4) for m in range(9)])
        L0 = self.lc([("L'âge et la taille", JAUNE_TITRE)], 2.1, fs=40)
        self.jouer(L0, ["L'âge"], {0: [Create(sol_l), Create(regle)]})
        bebe = enfant(85 * k, "#7dd3fc").move_to(P(-5.3, sol + 85 * k / 2))
        e85 = self.t("85 cm", 28, "#7dd3fc").next_to(bebe, UP, buff=0.1)
        a2 = self.t("2 ans", 28, WHITE).next_to(e85, UP, buff=0.08)
        L1 = self.lc([("2 ans :", WHITE), ("85 cm", "#7dd3fc")], 1.3, fs=40)
        self.jouer(L1, ["À 2 ans", "85 centimètres"], {0: [GrowFromEdge(bebe, DOWN), FadeIn(a2)],
                                                       1: [FadeIn(e85)]})
        adulte = enfant(175 * k * 1.0, "#38bdf8").move_to(P(-3.95, sol + 175 * k / 2))
        a20 = self.t("20 ans", 28, WHITE).next_to(adulte, UP, buff=0.1)
        L2 = self.lc([("20 ans :", WHITE), ("10 fois plus ?", ORANGE_RETENUE)], 0.5, fs=40)
        self.jouer(L2, ["À 20 ans", "10 fois plus"], {0: [GrowFromEdge(adulte, DOWN), FadeIn(a20)]})
        geant = enfant(850 * k, ROUGE_ERREUR).set_opacity(0.45).move_to(P(-2.2, sol + 850 * k / 2))
        e850 = self.t("8 m 50", 30, ROUGE_ERREUR).next_to(geant, RIGHT, buff=0.25).align_to(geant, UP).shift(DOWN * 0.7)
        L3 = self.lc([("8 m 50 :", ROUGE_ERREUR), ("impossible !", ROUGE_ERREUR)], -0.3, fs=42)
        self.jouer(L3, ["8 mètres", "impossible"], {0: [GrowFromEdge(geant, DOWN), FadeIn(e850)]})
        self.insister(L3[1], 1.15, 0.25)
        x = croix(geant, sw=7)
        self.play(Create(x), run_time=0.4)
        L4 = self.lc([("Augmentent ensemble ?", WHITE)], -1.05, fs=36)
        L5 = self.lc([("Pas forcément", AMBRE)], -1.65, fs=38)
        L6 = self.lc([("proportionnelles !", AMBRE)], -2.2, fs=38)
        self.jouer(L4, ["augmentent ensemble"])
        self.jouer(L5, ["pas forcément"])
        self.jouer(L6, ["proportionnelles"])
        self.attendre_voix()

    # ── 07 : QUESTION 2 (essence, forfait, taille) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pe = pompe_essence(1.3).move_to(P(-3.4, 0.2))
        tb = TableauProp(["Essence (L)", "Prix (€)"], [[1, 10], ["1,80", 18]], montrer=False, largeur_case=1.15,
                         largeur_libelle=2.1, fs=32, centre=P(-4.2, 0.6))

        def avant(sc):
            sc.play(FadeIn(pe, shift=UP * 0.3), run_time=0.4)

        def apres(sc):
            sc.play(FadeOut(pe), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["1 L →", "1,80 € ;", "10 L →", "18 €."])
            l1 = sc.ligne_rep(1, ["Toujours ×", "1,80."])
            lat = tb.fleche_lat("× 1,80", fs=30)
            sc.montre("1 litre", FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), rt=0.3)
            sc.montre("1,80 euro", FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), rt=0.3)
            sc.montre("10 litres", FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), rt=0.3)
            sc.montre("18 euros", FadeIn(l0[3], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), rt=0.3)
            sc.montre("on multiplie", FadeIn(l1[0], shift=UP * 0.15), Create(lat.fleche), rt=0.4)
            sc.montre(("1,80", 2), FadeIn(l1[1], scale=1.3), FadeIn(lat.etiquette, scale=1.3), rt=0.35)
            for i, mot in ((1, "Le forfait"), (2, "Et la taille")):
                corps = sc.cartes_q[i][1][1]
                tr = Line(corps.get_left() + LEFT * 0.08, corps.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                          stroke_width=6)
                sc.au_mot(mot)
                sc.rep(i + 1, avec=[Create(tr)])
            sc.rep_fin()
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Laquelle de ces situations", "est proportionnelle ?"],
                            [self.t("L'essence et les litres", 28),
                             self.t("Forfait de 10 € et appels", 28),
                             self.t("La taille et l'âge", 28)], 0,
                            ["1 L → 1,80 € ; 10 L → 18 €.", "Toujours × 1,80.", "Le forfait ne change pas.",
                             "La taille s'arrête de grandir."],
                            mot_q="Laquelle", avant_q=avant, autres_r=apres)

    # ── 08 : défi : la salle d'escalade ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        mur = mur_escalade(0.9).move_to(P(-5.1, -1.4))
        tb = TableauProp(["Entrées", "Prix (€)"], [[1, 3], [12, 30]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.4, fs=38, centre=P(0.3, 1.45))
        self.montre("salle d'escalade", FadeIn(mur, shift=UP * 0.3), FadeIn(tb.fond, shift=UP * 0.2), rt=0.5)
        for (r, c), mot in zip([(0, 0), (1, 0), (0, 1), (1, 1)], ["1 entrée", "12 euros", "3 entrées", "30 euros"]):
            self.montre(mot, FadeIn(tb.valeur(r, c), scale=1.4), rt=0.35)
        q1 = self.t("Le prix est-il proportionnel", 38, ORANGE_RETENUE).move_to(P(0.6, -0.3))
        q2 = self.t("au nombre d'entrées ?", 38, ORANGE_RETENUE).move_to(P(0.6, -0.9))
        self.montre("Le prix est-il", FadeIn(q1, shift=UP * 0.2), rt=0.4)
        self.montre("au nombre", FadeIn(q2, shift=UP * 0.2), rt=0.4)
        self.pause_defi(y=-1.85)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tb = TableauProp(["Entrées", "Prix (€)", "Prix ÷ entrées"], [[1, 3], [12, 30], [12, 10]], montrer=False,
                         largeur_case=1.5, largeur_libelle=3.0, fs=36, centre=P(-3.3, 0.9))
        for r in range(2):
            for c in range(2):
                tb.add(sans(tb.valeur(r, c)))
        self.add(tb)
        tit = self.lc([("Correction", JAUNE_TITRE)], 2.95, fs=48)
        self.play(FadeIn(tit[0], shift=RIGHT * 0.15), run_time=0.4)
        L1 = self.lc([("12 ÷", WHITE), ("1 =", WHITE), ("12", VERT_OK)], 1.95, fs=42)
        self.jouer(L1, ["12 divisé", "par 1", "égale 12"],
                   {0: [tb.allumer(1, 0)], 1: [tb.allumer(0, 0)], 2: [FadeIn(tb.valeur(2, 0), scale=1.4)]})
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        L2 = self.lc([("30 ÷", WHITE), ("3 =", WHITE), ("10", VERT_OK)], 1.1, fs=42)
        self.jouer(L2, ["30 divisé", "par 3", "égale 10"],
                   {0: [tb.allumer(1, 1)], 1: [tb.allumer(0, 1)], 2: [FadeIn(tb.valeur(2, 1), scale=1.4)]})
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.3)
        L3 = sans(self.lc([("12", ROUGE_ERREUR), ("≠", ROUGE_ERREUR), ("10", ROUGE_ERREUR)], 0.15, fs=44))
        self.jouer(L3, ["Les quotients", None, None],
                   {0: [tb.allumer(2, 0, "#fee2e2", "#991b1b"), tb.allumer(2, 1, "#fee2e2", "#991b1b")]},
                   run_time=0.3)
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 30)
        self.col(v, -0.8, 1.5)
        self.montre("ce n'est pas", FadeIn(v, scale=1.3), rt=0.45)
        self.insister(v, 1.1, 0.25)
        D0 = self.ligne([("Tarif dégressif :", AMBRE)], 36).move_to(P(-3.3, -1.45))
        D1 = self.ligne([("plus on achète d'entrées,", WHITE)], 32).move_to(P(-3.3, -2.1))
        D2 = self.ligne([("moins chacune coûte cher.", WHITE)], 32).move_to(P(-3.3, -2.65))
        for d in (D0, D2):
            d.align_to(D1, LEFT)
        self.jouer(D0, ["tarif dégressif"])
        self.jouer(D1, ["plus on achète"])
        self.jouer(D2, ["moins chacune"], {0: [Indicate(VGroup(tb.case(2, 0), tb.case(2, 1), tb.textes[2][0],
                                                               tb.textes[2][1]), color=AMBRE)]})
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        dr = self.repere(centre=ORIGIN)
        fig = VGroup(dr, dr.droite_origine(8, 24, VELO_C), Line(dr.p(0, 4), dr.p(20, 44), color=HUGO_C,
                                                                 stroke_width=5),
                     dr.point(5, 15, VELO_C, 0.11), dr.point(8, 24, VELO_C, 0.11),
                     dr.point(10, 24, HUGO_C, 0.11), dr.point(20, 44, HUGO_C, 0.11), dr.point(0, 4, HUGO_C, 0.13))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Proportionnelles : on multiplie", "toujours par le même nombre."),
            ("On vérifie : quotients égaux,", "ou points alignés avec l'origine."),
            ("Un prix de départ, un forfait :", "plus proportionnel.")], fs=36)
        self.au_mot("Deux grandeurs")
        self.montrer_ligne(lignes[0])
        self.au_mot("On le vérifie")
        self.montrer_ligne(lignes[1], Indicate(fig[1], color=VELO_C))
        self.au_mot("Un prix de départ")
        self.montrer_ligne(lignes[2], Indicate(fig[2], color=HUGO_C))
        lignes[2][1][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_quotients()
        self.ecran_question1()
        self.ecran_graphique()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropReconnaitre4e(PropReconnaitreBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
