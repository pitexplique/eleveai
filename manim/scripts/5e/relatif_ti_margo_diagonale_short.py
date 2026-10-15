# relatif_ti_margo_diagonale_short.py
# EleveAI — Maths 5e — short DESSIN ANIMÉ « Ti Margo court la Diagonale des Fous ».
# CEINTURE BLANCHE. Frédéric, 12/10/2026 : après un short « survol du parcours »
# à 136 k vues, « est-on capable de faire la même chose en mettant des maths »,
# puis « ou alors un dessin animé » → « go ».
# Voix validée : manim/voix/5e-relatif-nombre-short-ti-margo-diagonale.json (Julie, débit −8).
#
# EN HAUT : Ti Margo court sur le VRAI profil (les 35 points du descriptif
# officiel, gabarit_diagonale.PARCOURS), le décor défile derrière lui. Le tracé
# est vert là où ça monte, rouge là où ça descend : le même code que les + et −
# qui s'écrivent EN BAS, au moment où il arrive à chaque étape.
# ⭐ Le dessin montre la réponse à la question finale : dans la « descente » vers
# Hell-Bourg, on voit du vert (Croisée Kerveguen, 2 475 m) — des montées que
# l'addition par étapes ne compte pas.
# Calcul : +2 021 − 1 028 + 955 − 1 901 = 47 = 49 − 2 (arrivée − départ).
# ⛔ Pas de zoom de caméra (son choix) : c'est le décor qui défile.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/relatif_ti_margo_diagonale_short.py ShortTiMargoDiagonale5e -o eleveai-maths-5e-relatif-nombre-short-ti-margo-diagonale --media_dir manim/scripts/5e/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_diagonale import ALT_MAX, PARCOURS
from gabarit_sixieme import Short6e
from mascotte import MascotteMargouillat
from signes_expression_2de import ceinture

# ── le monde ────────────────────────────────────────────────────────────────
S_KM = 10.0 / 180.8          # unités par km : le parcours fait 10 de long
K_ALT = 1.75 / ALT_MAX       # unités par mètre
Y_MER = -0.35                # le niveau de la mer à l'écran
Y_SOL = -0.6                 # le bas du sol dessiné
Y_CIEL = 2.05                # le haut du ciel
X_MARGO = -0.85              # Ti Margo court ici, le décor défile
H_MARGO = 0.8
PIEDS = 0.14                 # marge transparente sous les pieds, en fraction de hauteur

NUIT = "#0B1430"
JOUR = "#1F4E8C"
SOL = "#1E4D2B"
MONTAGNES = "#16213A"

KM = np.array([p[0] for p in PARCOURS])
ALT = np.array([p[1] for p in PARCOURS], dtype=float)
FIN = KM[-1]

# Les étapes de l'addition : (km, nom, altitude, variation)
ETAPES = [
    (0.0, "Saint-Pierre", 2, None),
    (45.4, "Nez de Bœuf", 2023, +2021),
    (80.6, "Hell-Bourg", 995, -1028),
    (123.9, "Maïdo", 1950, +955),
    (180.8, "Saint-Denis", 49, -1901),
]


def altitude(km):
    """Le profil officiel, avec de petites bosses entre deux points.

    ⭐ Les bosses s'annulent AUX points de pointage (sin(nπt) = 0 en t = 0 et 1) :
    les altitudes des étapes restent exactement celles du descriptif.
    """
    km = min(max(km, 0.0), FIN)
    i = min(int(np.searchsorted(KM, km, side="right")) - 1, len(KM) - 2)
    a, b = KM[i], KM[i + 1]
    t = (km - a) / (b - a)
    base = ALT[i] + (ALT[i + 1] - ALT[i]) * t
    n = max(1, round((b - a) / 3))
    return base + 30 * math.sin(n * math.pi * t)


def wx(km):
    return km * S_KM


def wy(alt):
    return Y_MER + max(alt, 0) * K_ALT


def signe(v):
    return f"+{v:,}".replace(",", " ") if v > 0 else f"−{-v:,}".replace(",", " ")


class ShortTiMargoDiagonale5e(Short6e):
    nom_voix = "5e-relatif-nombre-short-ti-margo-diagonale"

    # ── le temps de la voix ─────────────────────────────────────────────────

    def instant(self, extrait):
        """L'instant (estimé) où la voix dit `extrait` — même calcul que au_mot."""
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        return self._debut_voix + self._duree_voix * i / len(self._texte_voix)

    def courir(self, km, mot_arrivee, *anims):
        """Ti Margo court jusqu'au km, pour arriver quand la voix dit `mot_arrivee`."""
        duree = max(1.0, self.instant(mot_arrivee) - self.renderer.time)
        self.play(self.km.animate.set_value(km), *anims, run_time=duree, rate_func=smooth)

    # ── le décor ────────────────────────────────────────────────────────────

    def construire_monde(self):
        pas = np.arange(0, FIN + 0.25, 0.25)
        pts = [np.array([wx(k), wy(altitude(k)), 0]) for k in pas]

        monde = VGroup()
        # la mer, avant le départ et après l'arrivée
        mer = VGroup(
            Rectangle(width=3.5, height=Y_MER - Y_SOL, stroke_width=0, fill_color="#1E3A8A",
                      fill_opacity=1).move_to([-1.75, (Y_MER + Y_SOL) / 2, 0]),
            Rectangle(width=3.5, height=Y_MER - Y_SOL, stroke_width=0, fill_color="#1E3A8A",
                      fill_opacity=1).move_to([wx(FIN) + 1.75, (Y_MER + Y_SOL) / 2, 0]),
        )
        sol = Polygon(*pts, [pts[-1][0], Y_SOL, 0], [pts[0][0], Y_SOL, 0],
                      stroke_width=0, fill_color=SOL, fill_opacity=1)
        # le tracé, tronçon par tronçon : vert si ça monte, rouge si ça descend
        trace = VGroup()
        for a, b in zip(pts[:-1], pts[1:]):
            trace.add(Line(a, b, stroke_width=4, color=VERT_OK if b[1] >= a[1] else ROUGE_ERREUR))
        self.repere = Dot([0, 0, 0], radius=0.001, fill_opacity=0)
        monde.add(self.repere, mer, sol, trace)

        # les drapeaux des étapes, cachés jusqu'à ce que la voix les nomme
        self.drapeaux = []
        for k, nom, alt, _ in ETAPES:
            p = np.array([wx(k), wy(alt), 0])
            mat = Line(p, p + UP * 0.5, stroke_width=2, color=WHITE)
            t1 = Text(nom, font_size=17, color=WHITE)
            t2 = Text(f"{alt:,} m".replace(",", " "), font_size=19, color=JAUNE_TITRE)
            lab = VGroup(t1, t2).arrange(DOWN, buff=0.05)
            fond = BackgroundRectangle(lab, color=BLACK, fill_opacity=0.7, buff=0.07)
            # ⚠️ À DROITE du mât : au-dessus, l'étiquette tombait sur la tête de
            # Ti Margo, arrêté pile au point d'étape.
            etiquette = VGroup(fond, lab).next_to(p + UP * 0.5, RIGHT, buff=0.42)
            if etiquette.get_top()[1] > Y_CIEL - 0.05:
                etiquette.shift(DOWN * (etiquette.get_top()[1] - Y_CIEL + 0.05))
            # ⛔ Révélé par un ValueTracker, JAMAIS par `.animate` sur ce morceau :
            # animer un enfant du monde figeait le défilement pour le reste de la
            # vidéo (constaté au brouillon du 12/10, Ti Margo courait sur place).
            vis = ValueTracker(0.0)

            def montrer(m, vis=vis):
                v = vis.get_value()
                m[0].set_stroke(opacity=v)
                m[1][0].set_fill(opacity=0.7 * v)
                m[1][1].set_opacity(v)

            d = VGroup(mat, etiquette)
            d.add_updater(montrer)
            montrer(d)
            self.drapeaux.append(vis)
            monde.add(d)

        def suivre(m):
            cible = X_MARGO - wx(self.km.get_value())
            m.shift(RIGHT * (cible - self.repere.get_center()[0]))

        monde.add_updater(suivre)
        return monde

    def montrer_drapeau(self, i):
        return self.drapeaux[i].animate.set_value(1.0)

    def construire_ciel(self):
        ciel = Rectangle(width=4.6, height=Y_CIEL - Y_SOL, stroke_width=0, fill_opacity=1,
                         fill_color=NUIT).move_to([0, (Y_CIEL + Y_SOL) / 2, 0])
        ciel.add_updater(lambda m: m.set_fill(
            interpolate_color(ManimColor(NUIT), ManimColor(JOUR), min(1, self.km.get_value() / 60))))
        rng = np.random.default_rng(7)
        etoiles = VGroup(*[Dot([rng.uniform(-2.2, 2.2), rng.uniform(0.6, Y_CIEL - 0.1), 0],
                               radius=rng.uniform(0.008, 0.022), color=WHITE) for _ in range(45)])
        etoiles.add_updater(lambda m: m.set_opacity(max(0, 1 - self.km.get_value() / 45)))
        lune = Circle(radius=0.17, stroke_width=0, fill_color="#F4F1C9", fill_opacity=1).move_to([1.55, 1.65, 0])
        # Les montagnes du fond défilent trois fois moins vite (la profondeur).
        xs = np.linspace(-3, 9, 60)
        fond_pts = [[x, -0.05 + 0.55 * (0.5 + 0.5 * math.sin(1.7 * x) * math.cos(0.6 * x)), 0] for x in xs]
        fond = Polygon(*fond_pts, [xs[-1], Y_SOL, 0], [xs[0], Y_SOL, 0],
                       stroke_width=0, fill_color=MONTAGNES, fill_opacity=1)
        fond.add_updater(lambda m: m.move_to([xs.mean() - wx(self.km.get_value()) / 3, m.get_center()[1], 0]))
        return VGroup(ciel, etoiles, lune, fond)

    def construire_margo(self):
        m = MascotteMargouillat()
        m.height = H_MARGO

        def poser(mob, dt):
            k = self.km.get_value()
            vitesse = abs(k - self._km_prec)
            self._km_prec = k
            self._pas += dt * (14 if vitesse > 1e-4 else 0)
            saut = 0.07 * abs(math.sin(self._pas)) if vitesse > 1e-4 else 0
            sol = wy(altitude(k))
            mob.move_to([X_MARGO, sol + H_MARGO * (0.5 - PIEDS) + saut, 0])

        self._km_prec, self._pas = 0.0, 0.0
        m.add_updater(poser)
        return m

    # ── la bande des maths ──────────────────────────────────────────────────

    def bande(self, *mobs, y=-1.15):
        """Remplace le texte d'information de la bande (pas les termes de la somme)."""
        g = VGroup(*mobs).arrange(DOWN, buff=0.12).move_to([0, y, 0])
        anims = [FadeIn(g, shift=UP * 0.15)]
        if getattr(self, "_bande", None) is not None:
            anims.insert(0, FadeOut(self._bande))
        self.play(*anims, run_time=0.5)
        self._bande = g
        return g

    def terme(self, v):
        """Ajoute un terme à la somme qui se construit en bas, à sa place."""
        t = self.grand(signe(v), font_size=36, color=VERT_OK if v > 0 else ROUGE_ERREUR)
        x = [-1.1, 1.1][len(self.termes) % 2]
        y = [-0.9, -1.45][len(self.termes) // 2]
        t.move_to([x, y, 0])
        self.termes.add(t)
        return t

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_depart(self):
        self.dire("00-depart")
        titre = self.grand("La Diagonale des Fous", font_size=32, color=JAUNE_TITRE).move_to([0, 2.8, 0])
        badge = VGroup(ceinture("#F5F5F5", 0.8).scale(0.6), self.grand("Ceinture blanche", font_size=20))
        badge.arrange(RIGHT, buff=0.15).move_to([0, 2.37, 0])
        self.add(titre, badge)
        self.play(self.montrer_drapeau(0), run_time=0.6)
        self.au_mot("Jeudi")
        self.bande(self.grand("jeudi, 22 h", font_size=36, color=BLEU_CALCUL))
        self.au_mot("180 kilomètres")
        self.bande(self.grand("jeudi, 22 h", font_size=36, color=BLEU_CALCUL),
                   self.grand("180 km", font_size=52, color=WHITE))
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(self._bande), run_time=0.4)
        self._bande = None

    def ecran_etape(self, voix, i, mot_depart, mot_arrivee, mot_terme):
        k, nom, alt, v = ETAPES[i]
        self.dire(voix)
        self.au_mot(mot_depart)
        self.courir(k, mot_arrivee)
        self.play(self.montrer_drapeau(i), Flash(self.margo.get_top(), color=JAUNE_TITRE), run_time=0.5)
        self.au_mot(mot_terme)
        t = self.terme(v)
        self.play(FadeIn(t, scale=1.6), run_time=0.5)
        self.attendre_voix(marge=0.25)

    def ecran_somme(self):
        self.dire("05-somme")
        cadre = SurroundingRectangle(self.termes, color=JAUNE_TITRE, buff=0.12, stroke_width=2)
        self.play(Create(cadre))
        for j, mot in enumerate(["plus 2021", "moins 1028", "plus 955", "moins 1901"]):
            self.au_mot(mot)
            self.play(Indicate(self.termes[j], scale_factor=1.25), run_time=0.45)
        self.au_mot("égale 47")
        res = self.grand("= 47", font_size=54, color=JAUNE_TITRE).move_to([0, -2.0, 0])
        self.play(FadeIn(res, scale=1.5))
        self.au_mot("47 mètres, c'est")
        self.play(FadeOut(self.termes), FadeOut(cadre), res.animate.move_to([0, -0.9, 0]))
        self.au_mot("49 moins 2")
        eq = self.grand("= 49 − 2", font_size=46, color=JAUNE_TITRE).move_to([0, -1.55, 0])
        leg = self.grand("arrivée − départ", font_size=26, color=WHITE).move_to([0, -2.05, 0])
        self.play(FadeIn(eq, shift=UP * 0.15), FadeIn(leg))
        self.attendre_voix(marge=0.3)
        self._bande = VGroup(res, eq, leg)

    def ecran_officiel(self):
        self.dire("06-officiel")
        # Le parcours entier, en petit, par-dessus le ciel : le vrai profil (vert
        # et rouge) et, en blanc, les quatre étapes de notre addition.
        panneau = Rectangle(width=4.3, height=2.0, stroke_width=2, stroke_color=WHITE,
                            fill_color=BLACK, fill_opacity=0.88).move_to([0, 0.95, 0])
        sx, sy, x0, y0 = 3.9 / FIN, 1.5 / ALT_MAX, -1.95, 0.15
        pas = np.arange(0, FIN + 0.5, 0.5)
        pts = [np.array([x0 + k * sx, y0 + altitude(k) * sy, 0]) for k in pas]
        vrai = VGroup(*[Line(a, b, stroke_width=2.5, color=VERT_OK if b[1] >= a[1] else ROUGE_ERREUR)
                        for a, b in zip(pts[:-1], pts[1:])])
        cordes = VGroup(*[DashedLine([x0 + a[0] * sx, y0 + a[2] * sy, 0], [x0 + b[0] * sx, y0 + b[2] * sy, 0],
                                     stroke_width=3, color=WHITE, dash_length=0.08)
                          for a, b in zip(ETAPES[:-1], ETAPES[1:])])
        self.play(FadeIn(panneau), Create(vrai), run_time=1.0)
        self.play(Create(cordes), run_time=0.7)
        self.au_mot("10200")
        self.bande(self.grand("officiel :", font_size=30, color=WHITE),
                   self.grand("+10 200 m", font_size=50, color=VERT_OK),
                   self.grand("de montée", font_size=30, color=WHITE), y=-1.3)
        self.attendre_voix(marge=0.3)

    def ecran_question(self):
        # ⛔ Frédéric, 12/10 : « on comprend rien, ça doit être un défi, une
        # énigme ». Plus de « pourquoi » : un cas chiffré, UN nombre à trouver.
        # Réponse : +10 200 + (−10 153) = +47 → 10 153 m de descente.
        self.dire("07-question")
        self.play(FadeOut(self._bande), run_time=0.4)
        titre = self.grand("ÉNIGME", font_size=44, color=ORANGE_RETENUE).move_to([0, -0.85, 0])
        self.play(GrowFromCenter(titre), run_time=0.5)
        self.au_mot("a monté")
        l1 = self.grand("montée : +10 200 m", font_size=30, color=VERT_OK).move_to([0, -1.3, 0])
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("47 mètres plus haut")
        l2 = self.grand("arrivée : 47 m plus haut", font_size=30, color=JAUNE_TITRE).move_to([0, -1.68, 0])
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de mètres")
        l3 = self.grand("descente : ? m", font_size=34, color=ROUGE_ERREUR).move_to([0, -2.08, 0])
        self.play(FadeIn(l3, scale=1.4), run_time=0.5)
        self.play(Indicate(l3, color=ROUGE_ERREUR), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        # Le panneau du parcours s'efface : le rappel « commentaire » prend sa place.
        rep = self.grand("Réponds en commentaire !", font_size=30, color=VERT_OK).move_to([0, 0.95, 0])
        fond = BackgroundRectangle(rep, color=BLACK, fill_opacity=0.9, buff=0.15)
        cadre = SurroundingRectangle(rep, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(fond), FadeIn(rep, scale=1.2), Create(cadre))
        self.attendre_voix(marge=1.5)

    def construct(self):
        self.km = ValueTracker(0.0)
        self.termes = VGroup()
        self.add(self.construire_ciel())
        self.add(self.construire_monde())
        self.margo = self.construire_margo()
        self.add(self.margo)

        self.ecran_depart()
        self.ecran_etape("01-nez", 1, "Ça monte", "à 2023", "plus 2021")
        self.ecran_etape("02-hell", 2, "Ça descend", "à 995", "moins 1028")
        self.ecran_etape("03-maido", 3, "Ça remonte", "à 1950", "plus 955")
        self.ecran_etape("04-arrivee", 4, "Puis tout", "49 mètres", "Moins 1901")
        self.ecran_somme()
        self.ecran_officiel()
        self.ecran_question()
