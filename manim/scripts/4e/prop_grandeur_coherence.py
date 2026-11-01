# prop_grandeur_coherence.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 18 PROPRE À LA 4e : VÉRIFIER UN RÉSULTAT PAR SON UNITÉ
# (micro du coach : grandeur_coherence, notion grandeur_composee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_grandeur_coherence_short.py (blanche).
# ⭐ Méthode travaillée : l'UNITÉ contrôle le résultat, sans refaire le calcul :
# longueur → m, aire (deux longueurs) → m², volume (trois longueurs) → m³ ;
# 1 m³ = 10 dm × 10 dm × 10 dm = 1 000 L ; on n'additionne pas deux grandeurs
# différentes ; m³ ÷ m³/h = h. Pas de produit en croix ; « ÷ » écrit.
# ⭐ Le geste (brief du lot 4, cohérence) : la FICHE DU CHANTIER, chaque ligne
# fausse BARRÉE en rouge, l'unité juste écrite À CÔTÉ en vert.
# ⭐ Leurres : la mauvaise unité (question 1 : m, m³ pour une aire) ; 1 m³ =
# 100 L (question 2 : erreur de conversion, 100 au lieu de 1 000 ; 10 L) ;
# additionner deux grandeurs différentes (question 3 : 1 400 m, 1 400 m²).
#
# Décor et métier : SPORT et chantier, Enzo, PISCINISTE (il construit des
# piscines) ; un apprenti remplit la fiche du chantier.
# Chiffres réels : bassin olympique 50 m × 25 m, profondeur 2 m au moins
# (World Aquatics, règlement des installations FR 2, relevé le 31/10/2026).
# Le débit de la pompe (50 m³/h) est inventé, plausible.
# Centres d'intérêt : sport, sciences.
#
# Écrans : 00 garde · 01 Enzo, le bassin 50 × 25 × 2 m, la fiche · 02 ligne 1 :
# volume 2 500 m² barré → m³ · 03 longueur m / aire m² / volume m³ ·
# 04 QUESTION 1 (unité de l'aire du fond) · 05 ligne 2 : 2 500 m³ = 250 000 L
# barré, le cube de 1 m³ = 10 × 10 × 10 dm³ = 1 000 L → 2 500 000 L ·
# 06 QUESTION 2 (litres dans 1 m³) · 07 ligne 3 : 150 m + 1 250 m² barré ·
# 08 QUESTION 3 (peut-on additionner ?) · 09 défi ligne 4 : 2 500 ÷ 50 = 50 m³ ?
# · 09b correction : m³ ÷ m³/h = h, 50 h ≈ un peu plus de 2 jours, plausible ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-grandeur-coherence.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-grandeur-coherence/ ;
# marques mot à mot : manim/scripts/4e/prop_grandeur_coherence_marques.json
# (scripts/marques_dump.ps1 puis un cues2marques qui garde une marque par
# occurrence : « 10 fois 10 fois 10 »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; repris des épisodes 13 (Pave, proj : perspective cavalière) et
# 16 (unite_barre, question_pause qui n'audite plus les choix à la réponse).
# Ajouté ICI : Fiche (la fiche du chantier, papier clair, lignes barrées),
# bassin(), enzo(), apprenti(), icone_tour(), icone_fond(), icone_eau(), cube_m3(),
# pompe(), croix_r() ; _disposer_q : le texte des choix loin de la coche.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_coherence.py PropGrandeurCoherence4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_coherence.py PropGrandeurCoherence4e -o eleveai-maths-4e-prop-grandeur-coherence --media_dir manim/media-prop-4e-18
# Sortie : manim/sorties/4e/maths/proportionnalite/18-grandeur-coherence/eleveai-maths-4e-prop-grandeur-coherence.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import PropAgrandissementRapportBase, gras, sans  # noqa: E402
from prop_agrandissement_volume import Pave, proj, EAU  # noqa: E402
from prop_grandeur_unite import unite_barre  # noqa: E402

ENCRE = "#0f172a"      # l'écriture de l'apprenti sur la fiche
STYLO_R = "#dc2626"    # le trait qui BARRE (rouge)
STYLO_V = "#15803d"    # l'unité juste, À CÔTÉ (vert foncé, lisible sur le papier)
PAPIER = "#f8fafc"
LONG_C = "#fb923c"     # une LONGUEUR (m) : orange
AIRE_C = "#facc15"     # une AIRE (m²) : jaune
VOL_C = "#38bdf8"      # un VOLUME (m³) : bleu
ARDOISE = "#94a3b8"


def barre_r(m, sw=6):
    """Le trait rouge qui BARRE une ligne fausse (elle reste lisible)."""
    return Line(m.get_left() + LEFT * 0.1, m.get_right() + RIGHT * 0.1, color=STYLO_R, stroke_width=sw)


def croix_r(m, r=0.36, sw=8):
    """Une grande croix rouge sur un signe (le « + » interdit)."""
    c = m.get_center()
    return VGroup(Line(c + P(-r, -r), c + P(r, r), color=STYLO_R, stroke_width=sw),
                  Line(c + P(-r, r), c + P(r, -r), color=STYLO_R, stroke_width=sw))


def ecrit(s, fs=30, couleur=ENCRE):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


class Fiche(VGroup):
    """La fiche du chantier : papier clair, pince, titre, lignes réglées.
    .x0 (bord gauche d'écriture) ; Y[k] : hauteur de la ligne k (0 à 3) ;
    YC[k] : hauteur de la correction écrite SOUS la ligne k (1 et 2)."""

    def __init__(self, centre=P(-3.25, 0.0), l=6.6, h=5.6, **kw):
        super().__init__(**kw)
        cx, cy = centre[0], centre[1]
        self.papier = RoundedRectangle(width=l, height=h, corner_radius=0.18, fill_color=PAPIER, fill_opacity=1,
                                       stroke_color=ARDOISE, stroke_width=3).move_to(centre)
        self.pince = RoundedRectangle(width=1.5, height=0.32, corner_radius=0.08, fill_color="#64748b",
                                      fill_opacity=1, stroke_width=0).move_to(P(cx, cy + h / 2))
        self.titre = sans(ecrit("Fiche du chantier", 30, "#1d4ed8")).move_to(P(cx, cy + h / 2 - 0.55))
        self.x0 = cx - l / 2 + 0.35
        self.Y = [cy + 1.45, cy + 0.45, cy - 0.95, cy - 2.05]
        self.YC = {1: cy - 0.12, 2: cy - 1.52}
        regles = VGroup(*[Line(P(cx - l / 2 + 0.25, y - 0.27), P(cx + l / 2 - 0.25, y - 0.27), color="#bfdbfe",
                               stroke_width=2) for y in self.Y])
        self.fond = VGroup(self.papier, regles, self.pince, self.titre)
        self.add(self.fond)

    def ligne(self, morceaux, k, fs=27, buff=0.14, y=None):
        """Les morceaux (texte, couleur) écrits sur la ligne k, à gauche."""
        lg = VGroup(*[ecrit(s, fs, c) for s, c in morceaux]).arrange(RIGHT, buff=buff)
        lg.move_to(P(0, self.Y[k] if y is None else y)).align_to(P(self.x0, 0), LEFT)
        return lg


# ── l'état de la fiche à chaque écran : les lignes déjà corrigées ───────────
def ligne1(f):
    lg = f.ligne([("Volume d'eau :", ENCRE), ("2 500 m²", ENCRE)], 0)
    juste = ecrit("m³", 32, STYLO_V).next_to(lg, RIGHT, buff=0.3)
    return lg, juste


def ligne2(f):
    lg = f.ligne([("2 500 m³ =", ENCRE), ("250 000 L", ENCRE)], 1)
    juste = f.ligne([("→", STYLO_V), ("2 500 000 L", STYLO_V)], 1, y=f.YC[1])
    juste.shift(RIGHT * 0.9)
    return lg, juste


def ligne3(f):
    lg = f.ligne([("150 m", ENCRE), ("+", ENCRE), ("1 250 m²", ENCRE)], 2)
    juste = f.ligne([("pas les mêmes grandeurs !", STYLO_R)], 2, fs=24, y=f.YC[2])
    juste.shift(RIGHT * 0.3)
    return lg, juste


def ligne4(f):
    lg = f.ligne([("2 500 ÷", ENCRE), ("50", ENCRE), ("= 50 m³", ENCRE)], 3)
    juste = ecrit("50 h", 32, STYLO_V).next_to(lg, RIGHT, buff=0.35)
    return lg, juste


def fiche_corrigee(n, centre=P(-3.25, 0.0)):
    """La fiche avec ses n premières lignes déjà barrées et corrigées (décor
    redit : sans synchro ni audit)."""
    f = Fiche(centre)
    for fn in (ligne1, ligne2, ligne3)[:n]:
        lg, juste = fn(f)
        f.add(lg, barre_r(lg), juste)
    sans(f)
    return f


# ── les décors ──────────────────────────────────────────────────────────────
def bassin(o=ORIGIN, u=1.0, a=5.0, b=2.5, c=0.8):
    """Le bassin olympique en perspective cavalière (50 m → a, 25 m → b ;
    2 m → c, profondeur exagérée pour se voir) : l'eau, la margelle, les
    lignes des couloirs. .pave .coins .margelle"""
    pv = Pave(a, b, c, o=o, u=u, couleurs=EAU)
    k = pv.coins
    lignes = VGroup(*[Line(proj(0.15, b * i / 10, c, o, u), proj(a - 0.15, b * i / 10, c, o, u),
                           color=WHITE, stroke_width=2, stroke_opacity=0.7) for i in range(1, 10)])
    marg = Polygon(k["c"], k["ac"], k["bc"], k["dc"], fill_opacity=0, stroke_color=WHITE, stroke_width=5)
    g = VGroup(pv, lignes, marg)
    g.pave, g.coins, g.margelle = pv, k, marg
    return g


def enzo(s=1.0):
    """Enzo, pisciniste : polo bleu piscine, casquette blanche, mètre ruban."""
    p = personne(peau="#e0ac69", tenue="#0891b2", cheveux="#3f2a14")
    visiere = RoundedRectangle(width=0.62, height=0.12, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                               stroke_width=0).move_to(P(0.22, 0.27))
    calotte = AnnularSector(inner_radius=0, outer_radius=0.47, angle=PI, start_angle=0, fill_color=WHITE,
                            fill_opacity=1, stroke_width=0).move_to(P(0, 0.24))
    ruban = VGroup(Square(0.34, fill_color="#facc15", fill_opacity=1, stroke_color="#78350f", stroke_width=2),
                   Line(P(0.17, -0.1), P(0.6, -0.1), color="#facc15", stroke_width=6)).move_to(P(0.75, -1.25))
    g = VGroup(p, calotte, visiere, ruban)
    g.corps = p.corps
    return g.scale(s)


def apprenti(s=1.0):
    """L'apprenti : tenue orange, la fiche à la main."""
    p = personne(peau="#8d5524", tenue="#ea580c", cheveux="#111827")
    plan = VGroup(Rectangle(width=0.5, height=0.65, fill_color=PAPIER, fill_opacity=1, stroke_color=ARDOISE,
                            stroke_width=2),
                  Rectangle(width=0.24, height=0.08, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(
                      P(0, 0.33))).move_to(P(0.7, -1.15))
    for i in range(3):
        plan.add(Line(P(0.52, -1.0 - 0.14 * i), P(0.88, -1.0 - 0.14 * i), color=ENCRE, stroke_width=2))
    g = VGroup(p, plan)
    g.plan = plan
    return g.scale(s)


def icone_tour(w=1.7, h=0.85):
    """Le TOUR du bassin (vu de dessus) : un contour orange, une longueur."""
    return Rectangle(width=w, height=h, stroke_color=LONG_C, stroke_width=8, fill_opacity=0)


def icone_fond(w=1.7, h=0.85):
    """Le FOND (vu de dessus) : une surface jaune quadrillée, une aire."""
    r = Rectangle(width=w, height=h, fill_color=AIRE_C, fill_opacity=0.9, stroke_color="#a16207", stroke_width=3)
    g = VGroup(r)
    for i in range(1, 6):
        g.add(Line(r.get_corner(DL) + RIGHT * w * i / 6, r.get_corner(UL) + RIGHT * w * i / 6, color="#a16207",
                   stroke_width=1.5))
    for j in range(1, 3):
        g.add(Line(r.get_corner(DL) + UP * h * j / 3, r.get_corner(DR) + UP * h * j / 3, color="#a16207",
                   stroke_width=1.5))
    return g


def icone_eau(u=0.34):
    """L'EAU du bassin : un pavé bleu, un volume."""
    return Pave(5, 2.5, 1.6, u=u, couleurs=EAU)


def cube_m3(o=ORIGIN, u=0.2):
    """Le cube de 1 m³ (10 dm de côté, u par dm), quadrillé en dm sur ses
    trois faces vues. .pave .rang (la rangée de 10 dm³, devant en bas)
    .face (la face avant : 100 dm³) ; arête du bas : .bas (de o à o + 10u)."""
    pv = Pave(10, 10, 10, o=o, u=u, couleurs=("#e2e8f0", "#f1f5f9", "#cbd5e1"), bord="#334155", sw=3)
    gr = VGroup()
    q = lambda x, y, z: proj(x, y, z, o, u)  # noqa: E731
    for i in range(1, 10):
        st = dict(color="#64748b", stroke_width=1.2)
        gr.add(Line(q(i, 0, 0), q(i, 0, 10), **st), Line(q(0, 0, i), q(10, 0, i), **st),      # devant
               Line(q(i, 0, 10), q(i, 10, 10), **st), Line(q(0, i, 10), q(10, i, 10), **st),  # dessus
               Line(q(10, i, 0), q(10, i, 10), **st), Line(q(10, 0, i), q(10, 10, i), **st))  # droite
    rang = Polygon(q(0, 0, 0), q(10, 0, 0), q(10, 0, 1), q(0, 0, 1), fill_color=LONG_C, fill_opacity=0.9,
                   stroke_width=0)
    face = Polygon(q(0, 0, 0), q(10, 0, 0), q(10, 0, 10), q(0, 0, 10), fill_color=AIRE_C, fill_opacity=0.75,
                   stroke_width=0)
    g = VGroup(pv, gr)
    g.pave, g.grille, g.rang, g.face = pv, gr, rang, face
    g.bas = (q(0, 0, 0), q(10, 0, 0))
    return g


def pompe(s=1.0):
    """La pompe du chantier : un moteur gris, un tuyau, l'eau qui coule."""
    corps = RoundedRectangle(width=0.9, height=0.6, corner_radius=0.1, fill_color="#475569", fill_opacity=1,
                             stroke_width=0)
    hublot = Circle(radius=0.17, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(P(-0.15, 0))
    tuyau = VMobject(stroke_color="#1e293b", stroke_width=10).set_points_smoothly(
        [P(0.45, 0.1), P(0.9, 0.4), P(1.35, 0.2), P(1.45, -0.2)])
    eau = VGroup(*[Line(P(1.45 + dx, -0.3), P(1.45 + dx, -0.75), color=VOL_C, stroke_width=4)
                   for dx in (-0.06, 0.0, 0.06)])
    g = VGroup(corps, hublot, tuyau, eau)
    g.eau = eau
    return g.scale(s)


class PropGrandeurCoherenceBase(PropAgrandissementRapportBase):
    nom_voix = "4e-prop-grandeur-coherence"
    fichier_marques = "prop_grandeur_coherence_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le texte de chaque choix s'arrête à 0,8 du bord droit de sa carte :
        la coche verte de la réponse ne le frôle jamais (leçon des 11, 14, 16)."""
        r = super()._disposer_q(question, choix, phrase)
        for c in r[2]:
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.8
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        return r

    def question_pause(self, *a, **k):
        """Celle de la base ; les choix, audités quand ils entrent (question),
        ne sont plus audités pendant la réponse (la carte juste s'agrandit)."""
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

    def boite(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=4)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Vérifier un résultat par son unité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Vérifier")
        bs = bassin(P(-5.6, -1.0), u=0.62)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(bs, shift=UP * 0.2),
                  run_time=0.8)
        q = VGroup(self.t("Ce résultat", 42), self.t("peut-il être juste ?", 42, AMBRE))
        q.arrange(DOWN, buff=0.16).move_to(P(2.6, 0.25))
        self.au_mot("Ce résultat")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("peut-il")
        self.play(FadeIn(q[1], scale=1.15), run_time=0.45)
        self.insister(q[1], 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Enzo, pisciniste ; le bassin 50 m × 25 m × 2 m ; la fiche ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = enzo(0.8).move_to(P(-5.7, 0.75))
        nom = self.t("Enzo", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.2)
        self.montre("Voici Enzo", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("pisciniste", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.montre("pisciniste", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        bs = bassin(P(-4.3, -2.65), u=0.92)
        self.montre("construit des", FadeIn(bs, shift=UP * 0.3), rt=0.6)
        k = bs.coins
        c50 = gras("50 m", 30, WHITE).next_to((k["o"] + k["a"]) / 2, DOWN, buff=0.12)
        c25 = gras("25 m", 30, WHITE).next_to((k["c"] + k["dc"]) / 2, UL, buff=0.12)
        c2 = gras("2 m", 30, WHITE).next_to((k["o"] + k["c"]) / 2, LEFT, buff=0.15)
        L1 = self.lc([("Bassin :", WHITE), ("50 m", BLEU_CALCUL), ("sur", WHITE), ("25 m", BLEU_CALCUL)], 2.6, fs=38)
        self.jouer(L1, ["un bassin", "50 m", None, "25 m"], {1: [FadeIn(c50, scale=1.3)], 3: [FadeIn(c25, scale=1.3)]})
        L2 = self.lc([("2 m", BLEU_CALCUL), ("de profondeur", WHITE)], 1.85, fs=38)
        self.jouer(L2, ["2 m de", "profondeur"], {0: [FadeIn(c2, scale=1.3), Indicate(bs.pave.avant, color=WHITE)]})
        L3 = self.lc([("Piscine olympique", AMBRE)], 1.05, fs=40)
        src = sans(self.t("Source : World Aquatics (FR 2)", 22, ARDOISE)).next_to(L3, DOWN, buff=0.18).align_to(L3, LEFT)
        self.montre("piscine olympique", FadeIn(L3, shift=RIGHT * 0.15), FadeIn(src),
                    Circumscribe(bs.margelle, color=AMBRE), rt=0.7)
        ap = apprenti(0.6).move_to(P(2.0, -1.75))
        lap = self.t("son apprenti", 26, ORANGE_RETENUE).next_to(ap, UP, buff=0.12)
        self.montre("Son apprenti", FadeIn(ap, shift=UP * 0.2), FadeIn(lap), rt=0.45)
        lf = self.t("la fiche du chantier", 28, WHITE).move_to(P(4.3, -1.2))
        self.montre("la fiche", FadeIn(lf, shift=RIGHT * 0.15), Indicate(ap.plan, color=YELLOW, scale_factor=1.5),
                    rt=0.6)
        self.montre("Enzo vérifie", Indicate(pers, color=YELLOW, scale_factor=1.08), rt=0.6)
        self.attendre_voix()

    # ── 02 : ligne 1 : 2 500 m² pour un volume → barré, m³ à côté ──────────
    def ecran_impossible(self):
        self.ecran("02-impossible")
        f = Fiche()
        self.montre("Première ligne", FadeIn(f.fond, shift=UP * 0.2), rt=0.5)
        lg, juste = ligne1(f)
        self.jouer(lg, ["volume d'eau", "2 500"])
        R0 = self.lc([("Sans refaire le calcul,", WHITE)], 2.55, fs=36)
        self.jouer(R0, ["Sans refaire"])
        R1 = self.lc([("Enzo raye !", ROUGE_ERREUR)], 1.85, fs=40)
        b = barre_r(lg)
        self.jouer(R1, ["Enzo raye"], {0: [Create(b)]})
        R2 = self.lc([("Volume :", VOL_C), ("m × m × m", WHITE), ("= m³", VOL_C)], 0.8, fs=40)
        self.jouer(R2, ["Un volume", "trois longueurs", "des mètres cubes"],
                   {2: [FadeIn(juste, scale=1.4)]})
        self.play(Circumscribe(juste, color=STYLO_V, buff=0.08), run_time=0.5)
        R3 = self.lc([("m × m = m²", WHITE), (": une aire", AIRE_C)], -0.15, fs=40)
        self.jouer(R3, ["Des mètres carrés", "une aire"])
        tp = self.tampon("L'unité seule suffit !", fs=30).move_to(P(3.6, -1.45))
        self.montre("L'unité seule", FadeIn(tp, scale=1.3), rt=0.45)
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : chaque grandeur a son unité : m, m², m³ ───────────────────────
    def ecran_choisir(self):
        self.ecran("03-choisir")
        tit = self.t("Chaque grandeur a son unité", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.montre("Chaque grandeur", Write(tit), rt=0.6)
        rangs = [(icone_tour(), "Le tour du bassin :", "une longueur", LONG_C, "m",
                  ["Le tour", "une longueur", "en mètres"], lambda m: Create(m)),
                 (icone_fond(), "Le fond :", "une aire", AIRE_C, "m²",
                  ["Le fond", "une aire", "mètres carrés"], lambda m: GrowFromCenter(m)),
                 (icone_eau(), "L'eau :", "un volume", VOL_C, "m³",
                  ["L'eau", "un volume", "mètres cubes"], lambda m: GrowFromEdge(m, DOWN))]
        for (ic, nom, gr, coul, u, mots, entree), y in zip(rangs, (1.6, 0.0, -1.6)):
            ic.move_to(P(-5.1, y))
            lg = self.ligne([(nom, WHITE), (gr, coul)], 36).move_to(P(0, y)).align_to(P(-3.8, 0), LEFT)
            un = gras(u, 60, coul)
            cad = RoundedRectangle(width=1.5, height=1.05, corner_radius=0.14, stroke_color=coul, stroke_width=4,
                                   fill_opacity=0)
            ut = VGroup(cad, un.move_to(cad)).move_to(P(5.25, y))
            self.au_mot(mots[0])
            self.play(entree(ic), FadeIn(lg[0], shift=RIGHT * 0.15), run_time=0.5)
            self.montre(mots[1], FadeIn(lg[1], shift=RIGHT * 0.15), rt=0.35)
            self.montre(mots[2], FadeIn(ut, scale=1.3), rt=0.4)
            self.play(Indicate(ut, color=coul, scale_factor=1.12), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (l'unité de l'aire du fond) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fd = icone_fond(4.0, 2.0).move_to(P(-3.1, 0.3))
        self.add(fd)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["50 m ×", "25 m =", "1 250 m²"])
            c50 = gras("50 m", 32, WHITE).next_to(fd, DOWN, buff=0.15)
            c25 = gras("25 m", 32, WHITE).next_to(fd, LEFT, buff=0.15)
            sc.montre("50 m fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(c50, scale=1.3), rt=0.3)
            sc.montre("25 m", FadeIn(l0[1], shift=UP * 0.15), FadeIn(c25, scale=1.3), rt=0.3)
            sc.montre("1 250", FadeIn(l0[2], scale=1.3), Indicate(fd, color=AIRE_C, scale_factor=1.05), rt=0.5)
            sc.au_mot("Deux longueurs")
            sc.rep(1)
            sc.rep_fin()
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Quelle unité pour l'aire", "du fond du bassin ?"],
                            [self.t("le mètre (m)", 26), self.t("le mètre carré (m²)", 26),
                             self.t("le mètre cube (m³)", 26)], 1,
                            ["50 m × 25 m = 1 250 m²", "Deux longueurs : une aire."], mot_q="Quelle unité",
                            autres_r=apres)

    # ── 05 : ligne 2 : 2 500 m³ = 250 000 L ? 1 m³ = 1 000 L ───────────────
    def ecran_litres(self):
        self.ecran("05-litres")
        f = fiche_corrigee(1)
        self.montre("Deuxième ligne", FadeIn(f, shift=UP * 0.2), rt=0.5)
        lg, juste = ligne2(f)
        self.jouer(lg, ["2 500", "250 000"])
        q = gras("?", 54, STYLO_R).next_to(lg, RIGHT, buff=0.25)
        self.montre("Enzo fronce", FadeIn(q, scale=1.6), rt=0.4)
        self.insister(q, 1.3, 0.25)
        cu = cube_m3(P(2.15, -0.55), u=0.19)
        cu.grille.set_z_index(3)
        cu.rang.set_z_index(2)
        cu.face.set_z_index(1)
        R0 = self.lc([("1 m³ :", VOL_C), ("10 dm", WHITE), ("de côté", WHITE)], 2.65, fs=38)
        sans(R0[0])
        self.jouer(R0[:1], ["Un mètre cube"])
        self.montre("un cube de", FadeIn(cu, scale=0.8), rt=0.5)
        a0, a1 = cu.bas
        arete = Line(a0, a1, color=AMBRE, stroke_width=8).set_z_index(4)
        c10 = gras("10 dm", 30, AMBRE).next_to(arete, DOWN, buff=0.12)
        self.jouer(R0[1:], ["10 décimètres", "côté"], {0: [Create(arete), FadeIn(c10, scale=1.3)]})
        R1 = self.lc([("10 ×", WHITE), ("10 ×", WHITE), ("10", WHITE), ("= 1 000 L", VOL_C)], -1.5, fs=40)
        pv = cu.pave
        self.jouer(R1, [("10 fois", 1), ("10 fois", 2), "10, égale", "1 000"],
                   {0: [FadeIn(cu.rang)], 1: [FadeIn(cu.face)],
                    2: [FadeOut(cu.rang), FadeOut(cu.face), pv.teinter(EAU)]})
        self.insister(R1[3], 1.2, 0.25)
        R2 = self.lc([("Pas 100 L !", ROUGE_ERREUR)], -2.3, fs=40)
        self.jouer(R2, ["Pas 100"])
        b = barre_r(lg)
        self.montre(("2 500 mètres", 2), FadeOut(q), Create(b), rt=0.45)
        self.montre("2 500 000", FadeIn(juste, scale=1.3), rt=0.45)
        self.play(Circumscribe(juste, color=STYLO_V, buff=0.08), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (combien de litres dans 1 m³ ?) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cu = cube_m3(P(-5.4, -1.45), u=0.27)
        for fa, c in zip((cu.pave.avant, cu.pave.dessus, cu.pave.droite), EAU):
            fa.set_fill(c)  # le cube plein d'eau, posé tel quel
        self.add(cu)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["10 ×", "10 ×", "10 dm³", "= 1 000 L"])
            for m, mot in zip(l0, [("10 fois", 1), ("10 fois", 2), "10 décimètres", "1 000"]):
                sc.au_mot(*mot) if isinstance(mot, tuple) else sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.15), run_time=0.25)
            sc.play(Indicate(cu, color=VOL_C, scale_factor=1.05), run_time=0.5)
            sc.au_mot("Un mètre cube")
            sc.rep(1)
            sc.rep_fin()
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Combien de litres", "dans 1 m³ ?"],
                            [self.t("100 L", 34), self.t("1 000 L", 34), self.t("10 L", 34)], 1,
                            ["10 × 10 × 10 dm³ = 1 000 L", "Un mètre cube d'eau pèse une tonne !"],
                            mot_q="Combien", autres_r=apres)

    # ── 07 : ligne 3 : 150 m + 1 250 m² → barré ────────────────────────────
    def ecran_additionner(self):
        self.ecran("07-additionner")
        f = fiche_corrigee(2)
        self.montre("Troisième ligne", FadeIn(f, shift=UP * 0.2), rt=0.5)
        lg, juste = ligne3(f)
        tr = icone_tour(1.6, 0.8).move_to(P(2.2, 1.9))
        fd = icone_fond(1.6, 0.8).move_to(P(5.25, 1.9))
        plus = gras("+", 64, WHITE).move_to(P(3.72, 1.9))
        self.montre("le tour du bassin", Create(tr), rt=0.5)
        self.montre("l'aire du fond", GrowFromCenter(fd), rt=0.45)
        c150 = gras("150 m", 34, LONG_C).next_to(tr, DOWN, buff=0.2)
        c1250 = gras("1 250 m²", 34, AIRE_C).next_to(fd, DOWN, buff=0.2)
        self.jouer(lg, ["150 mètres", "plus", "1 250"],
                   {0: [FadeIn(c150, scale=1.3)], 1: [FadeIn(plus, scale=1.4)], 2: [FadeIn(c1250, scale=1.3)]})
        x = croix_r(plus)
        self.montre("On n'additionne", Create(x), Create(barre_r(lg)), rt=0.45)
        g1 = gras("une longueur", 30, LONG_C).next_to(c150, DOWN, buff=0.2)
        g2 = gras("une aire", 30, AIRE_C).next_to(c1250, DOWN, buff=0.2)
        self.montre("une longueur", FadeIn(g1, shift=UP * 0.1), Indicate(tr, color=LONG_C), rt=0.4)
        self.montre("une aire", FadeIn(g2, shift=UP * 0.1), Indicate(fd, color=AIRE_C), rt=0.4)
        R = self.lc([("Pas les mêmes", ROUGE_ERREUR), ("grandeurs !", ROUGE_ERREUR)], -0.85, fs=42)
        self.jouer(R, ["les mêmes", "grandeurs."], {1: [FadeIn(juste, shift=RIGHT * 0.15)]})
        self.insister(R, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (peut-on additionner 150 m et 1 250 m² ?) ───────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        tr = icone_tour(2.0, 1.0).move_to(P(-5.0, 0.3))
        fd = icone_fond(2.0, 1.0).move_to(P(-2.1, 0.3))
        plus = gras("+", 70, WHITE).move_to(P(-3.55, 0.3))
        self.add(tr, fd, plus)

        def apres(sc):
            sc.au_mot("s'additionnent")
            sc.play(Create(croix_r(plus, 0.42)), run_time=0.4)

        self.question_pause("08-question", "08b-reponse",
                            ["Peut-on additionner", "150 m et 1 250 m² ?"],
                            [self.t("oui, ça fait 1 400 m", 24), self.t("oui, ça fait 1 400 m²", 24),
                             self.t("non, pas les mêmes" + chr(10) + "grandeurs", 24)], 2,
                            ["Des m et des m²", "ne s'additionnent pas."], mot_q="Peut-on",
                            autres_r=apres)

    # ── 09 : défi : 2 500 ÷ 50 = 50 m³ ? quelle unité, plausible ? ──────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        f = fiche_corrigee(3)
        self.add(f)
        tit = self.lc([("À toi de jouer !", JAUNE_TITRE)], 2.95, fs=48)
        self.jouer(tit, ["À toi de jouer"])
        po = pompe(1.0).move_to(P(2.3, 0.85))
        d = VGroup(gras("50", 38, VOL_C), unite_barre("m³", "h", fs=38, couleur=VOL_C)).arrange(RIGHT, buff=0.15)
        L0 = self.lc([("La pompe :", WHITE)], 2.0, fs=36)
        d.next_to(L0, RIGHT, buff=0.25)
        self.jouer(L0, ["La pompe"], {0: [FadeIn(po, shift=DOWN * 0.2)]})
        self.montre("50 mètres", FadeIn(d[0], scale=1.3), FadeIn(d[1].avant), rt=0.35)
        self.montre("par heure", FadeIn(d[1].barre, scale=1.4), FadeIn(d[1].apres), rt=0.3)
        self.play(Wiggle(po.eau), run_time=0.6)
        lg, _ = ligne4(f)
        self.jouer(lg, ["2 500 divisé", "par 50", "égale 50"])
        L1 = self.lc([("Quelle unité ?", ORANGE_RETENUE)], -0.25, fs=42)
        self.jouer(L1, ["Quelle unité"], {0: [Circumscribe(lg[2], color=ORANGE_RETENUE, buff=0.08)]})
        L2 = self.lc([("Plausible ?", ORANGE_RETENUE)], -1.0, fs=42)
        self.jouer(L2, ["plausible"])
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        f = fiche_corrigee(3)
        lg, juste = ligne4(f)
        sans(lg)
        self.add(f, lg)
        tit = self.lc([("Correction", JAUNE_TITRE)], 2.95, fs=48)
        self.play(FadeIn(tit[0], shift=RIGHT * 0.15), run_time=0.4)
        op = VGroup(gras("m³", 44, VOL_C), gras("÷", 44, WHITE), unite_barre("m³", "h", fs=44, couleur=VOL_C),
                    gras("=", 44, WHITE), gras("h", 48, VERT_OK)).arrange(RIGHT, buff=0.28)
        self.col(op, 1.95, 1.3)
        self.jouer(op, ["Des mètres cubes", "divisés", "cubes par heure", "ça donne", "des heures"],
                   {4: [Create(barre_r(lg))]})
        L1 = self.lc([("50 h", VERT_OK)], 1.0, fs=46)
        self.jouer(L1, ["50 heures"], {0: [FadeIn(juste, scale=1.4)]})
        L2 = self.lc([("un peu plus de 2 jours", WHITE)], 0.25, fs=38)
        self.jouer(L2, ["un peu plus"])
        jours = VGroup(*[Rectangle(width=1.35, height=0.5, stroke_color=WHITE, stroke_width=3)
                         for _ in range(3)]).arrange(RIGHT, buff=0.12).move_to(P(3.45, -0.55))
        pleins = VGroup(*[Rectangle(width=w, height=0.5, fill_color=VOL_C, fill_opacity=0.9, stroke_width=0)
                          .align_to(j, LEFT).set_y(j.get_y()) for w, j in zip((1.35, 1.35, 1.35 * 2 / 24), jours)])
        sans(jours)
        self.play(FadeIn(jours), LaggedStart(*[GrowFromEdge(p, LEFT) for p in pleins], lag_ratio=0.6),
                  run_time=1.0)
        tp = self.tampon("Plausible !", fs=40).move_to(P(3.3, -1.5))
        self.montre("C'est plausible", FadeIn(tp, scale=1.3), rt=0.45)
        self.insister(tp, 1.08, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        rangs = VGroup()
        for ic, u, c in ((icone_tour(1.1, 0.55), "m", LONG_C), (icone_fond(1.1, 0.55), "m²", AIRE_C),
                         (icone_eau(0.19), "m³", VOL_C)):
            rangs.add(VGroup(ic, gras(u, 44, c)).arrange(RIGHT, buff=0.35))
        fig = sans(rangs.arrange(DOWN, buff=0.45, aligned_edge=LEFT))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("L'unité contrôle le résultat :", "longueur en m, aire en m²,", "volume en m³."),
            ("1 m³ = 1 000 L.",),
            ("On n'additionne jamais", "deux grandeurs différentes.")], fs=36)
        self.au_mot("L'unité contrôle")
        self.montrer_ligne(lignes[0])
        self.au_mot("1 mètre cube")
        self.montrer_ligne(lignes[1])
        self.au_mot("On n'additionne")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_impossible()
        self.ecran_choisir()
        self.ecran_question1()
        self.ecran_litres()
        self.ecran_question2()
        self.ecran_additionner()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropGrandeurCoherence4e(PropGrandeurCoherenceBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
