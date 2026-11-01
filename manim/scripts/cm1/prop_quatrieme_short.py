# prop_quatrieme_short.py
# EleveAI — Maths CM2 — short jumeau de l'épisode 06 « La quatrième
# proportionnelle » (micro prop_quatrieme), CM2 SEUL. CEINTURE BLANCHE (règle
# du short blanc, REGLES.md) : on VOIT la course se couper en secondes.
# Il AMUSE : « L'animal le plus rapide du monde » :
#   · EN HAUT, l'image qui bouge : le guépard court sur une piste ; ses 90 m en
#     3 s se coupent en 3 morceaux d'1 s (30 m), puis il file jusqu'à 5 s ;
#   · EN BAS, au même instant, le tableau du coach se remplit (3 → 1 → 5 s ;
#     90 → 30 → 150 m), flèches « ÷ 3 » puis « × 5 » : le passage par l'unité ;
#   · 1 question-pause (3 s) : en 4 s → 120 m (91 = ajouter 1 ; 360 = 90 × 4,
#     sans passer par 1) ;
#   · fin : en 7 s, combien de mètres ? (210 m) en commentaire.
# Centres d'intérêt : animaux, sport.
# Fait réel (WebSearch, 01/11/2026) : le guépard est l'animal terrestre le plus
# rapide, vitesse de pointe ≈ 110 à 120 km/h selon les sources, tenue quelques
# dizaines de secondes seulement (Futura-Sciences, « Pourquoi le guépard ne
# peut-il maintenir sa vitesse de pointe que pendant 30 secondes ? » ; Zoo de
# Montpellier, livret enseignant « Le guépard » ; Vikidia, « Guépard »).
# 30 m/s = 108 km/h : « environ 90 m en 3 s, lancé à fond » est juste. Voix gardée.
# Ajouté ICI (absent du module) : guepard(), la piste et ses repères.
#
# Voix : manim/voix/cm2-prop-quatrieme-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm2-prop-quatrieme-short/ ; marques :
# manim/scripts/cm1/prop_quatrieme_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_quatrieme_short.py PropQuatriemeShortCM2
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_quatrieme_short.py PropQuatriemeShortCM2 -o eleveai-maths-cm2-prop-quatrieme-short --media_dir manim/scripts/cm1/media-prop-quatrieme-short
# Sortie : manim/sorties/cm2/maths/proportionnalite/06-quatrieme/eleveai-maths-cm2-prop-quatrieme-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # cm1 DEVANT

from prop_commun import *  # noqa: E402,F403

PELAGE = "#f59e0b"
TACHE = "#1f2937"
PISTE = "#94a3b8"
X_DEP = -1.15    # la ligne de départ (le museau du guépard)
PAS = 0.62       # 1 seconde de course sur la piste
Y_PISTE = 1.7


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def guepard(s=1.0):
    """Un guépard lancé, vu de profil, museau à DROITE (largeur ≈ 1,15 × s)."""
    corps = Ellipse(width=0.8, height=0.28, fill_color=PELAGE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    tete = Circle(radius=0.13, fill_color=PELAGE, fill_opacity=1, stroke_width=0).move_to(P(0.48, 0.5))
    museau = Ellipse(width=0.14, height=0.1, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(
        P(0.58, 0.46))
    oreille = Triangle(fill_color=PELAGE, fill_opacity=1, stroke_width=0).scale(0.06).move_to(P(0.44, 0.64))
    oeil = Dot(P(0.52, 0.53), radius=0.02, color=TACHE)
    larme = Line(P(0.52, 0.51), P(0.56, 0.43), color=TACHE, stroke_width=2)
    taches = VGroup(*[Dot(P(x, y), radius=0.025, color=TACHE) for x, y in
                      ((-0.25, 0.45), (-0.1, 0.5), (0.05, 0.44), (0.18, 0.5), (-0.18, 0.36), (0.1, 0.36), (0.28, 0.42))])
    pattes = VGroup(*[Line(a, b, color=PELAGE, stroke_width=5) for a, b in
                      ((P(0.25, 0.35), P(0.5, 0.12)), (P(0.18, 0.34), P(0.35, 0.08)),
                       (P(-0.25, 0.35), P(-0.5, 0.12)), (P(-0.3, 0.36), P(-0.42, 0.06)))])
    queue = VMobject(stroke_color=PELAGE, stroke_width=4).set_points_smoothly(
        [P(-0.38, 0.47), P(-0.55, 0.55), P(-0.62, 0.42)])
    g = VGroup(queue, pattes, corps, taches, tete, oreille, museau, oeil, larme).scale(s)
    return g


def au_depart(g, x):
    """Pose le guépard, museau à l'abscisse x, pattes sur la piste."""
    return g.move_to(P(x - g.width / 2, Y_PISTE + g.height / 2 + 0.02))


class PropQuatriemeShortCM2(ShortProp):
    nom_voix = "cm2-prop-quatrieme-short"
    fichier_marques = "prop_quatrieme_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        pas_audit(rebours)  # le compte à rebours : pas un nombre de la voix
        return tete, q, cartes, pause, rebours, ph

    def x(self, sec):
        return X_DEP + sec * PAS

    def mesure(self, s0, s1, txt, couleur=WHITE, fs=28):
        """Un trait de mesure sous la piste, de s0 à s1 secondes, et son texte."""
        y = Y_PISTE - 0.18
        tr = VGroup(Line(P(self.x(s0), y), P(self.x(s1), y), color=couleur, stroke_width=3),
                    Line(P(self.x(s0), y + 0.08), P(self.x(s0), y - 0.08), color=couleur, stroke_width=3),
                    Line(P(self.x(s1), y + 0.08), P(self.x(s1), y - 0.08), color=couleur, stroke_width=3))
        t = self.t(txt, fs, couleur).next_to(tr, DOWN, buff=0.08)
        return VGroup(tr, t)

    def fleches(self, c0, c1, lab):
        tb = self.tb
        return (tb.fleche_col(c0, c1, lab, ligne=0, couleur=AMBRE), tb.fleche_col(c0, c1, lab, ligne=1, couleur=AMBRE))

    @staticmethod
    def jouer_fl(*fls):
        return [a for fl in fls for a in (Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4))]

    def calc(self, morceaux, mots, r, c, v, avec=None, y=0.5):
        """« 90 ÷ 3 = 30 m » morceau par morceau (mots[k] ; None : avec le
        précédent) ; le dernier remplit la case (r, c)."""
        lg = self.borne(self.ligne(morceaux, 34), 0.5).move_to(P(0, y))
        avec = avec or {}
        lots = []
        for k, mot in enumerate(mots):
            if mot or not lots:
                lots.append((mot, [k]))
            else:
                lots[-1][1].append(k)
        for mot, ks in lots:
            if mot:
                self.au_mot(mot)
            anims = []
            for k in ks:
                anims.append(FadeIn(lg[k], scale=1.3) if k == len(lg) - 1 else FadeIn(lg[k], shift=RIGHT * 0.12))
                anims += list(avec.get(k, []))
                if k == len(lg) - 1:
                    anims.append(self.tb.remplir(r, c, v))
            self.play(*anims, run_time=0.3)
        self.play(self.tb.allumer(r, c), run_time=0.25)
        return lg

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["30 ×", "4 =", "120 m."])
        for m, mot in zip(lg, ["30 fois", "4, égale", "120 mètres"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.play(self.petit.animate.shift(RIGHT * 0.5), run_time=0.4)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le plus rapide !", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        self.tb = tb = TableauProp(["Secondes", "Mètres"], [[3, 1, 5], [90, 30, 150]], montrer=False,
                                   largeur_case=0.8, largeur_libelle=1.15, hauteur=0.62, fs=28, marge=0.12,
                                   centre=P(0, -1.45))
        piste = Line(P(X_DEP - 0.65, Y_PISTE), P(self.x(5) + 0.08, Y_PISTE), color=PISTE, stroke_width=5)
        depart = Line(P(X_DEP, Y_PISTE - 0.12), P(X_DEP, Y_PISTE + 0.12), color=WHITE, stroke_width=4)
        g = au_depart(guepard(0.55), X_DEP)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("L'animal")
        self.play(Write(titre), FadeIn(piste), FadeIn(depart), FadeIn(g, shift=RIGHT * 0.3), run_time=0.7)
        self.au_mot("rapide")
        self.play(g.animate(rate_func=linear).shift(RIGHT * 5 * PAS), run_time=0.8)
        self.play(FadeOut(g, shift=RIGHT * 0.1), run_time=0.2)
        au_depart(g, X_DEP)
        self.au_mot("calculer")
        trous = [tb.trou(r, c) for r in range(2) for c in range(3)]
        self.play(FadeIn(g), FadeIn(tb.fond, shift=UP * 0.2), *[FadeIn(t, scale=1.3) for t in trous], run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 90 m en 3 s ──
        self.dire("01-trois")
        vit = VGroup(*[Line(P(0, y), P(-0.2, y), color=WHITE, stroke_width=3) for y in (0.1, 0.25, 0.4)])
        vit.next_to(g, LEFT, buff=-0.1)
        self.au_mot("Lancé à fond")
        self.play(FadeIn(vit, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("parcourt")
        self.play(g.animate(rate_func=linear).shift(RIGHT * 3 * PAS), vit.animate(rate_func=linear).shift(
            RIGHT * 3 * PAS), run_time=1.0)
        m90 = self.mesure(0, 3, "≈ 90 m")
        self.au_mot("90 mètres")
        self.play(FadeIn(m90, shift=UP * 0.1), tb.remplir(1, 0, 90), run_time=0.4)
        self.au_mot("3 secondes")
        self.play(tb.remplir(0, 0, 3), run_time=0.4)
        self.play(tb.allumer(0, 0), tb.allumer(1, 0), run_time=0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : 1 seconde (÷ 3), puis 5 secondes (× 5) ──
        self.dire("02-unite")
        reperes = VGroup(*[Line(P(self.x(k), Y_PISTE - 0.1), P(self.x(k), Y_PISTE + 0.1), color=AMBRE,
                                stroke_width=4) for k in (1, 2, 3)])
        self.au_mot("En 1 seconde")
        self.play(tb.remplir(0, 1, 1), FadeIn(reperes), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.4)
        self.play(tb.allumer(0, 1), run_time=0.25)
        h3, b3 = self.fleches(0, 1, "÷ 3")
        self.au_mot("3 fois moins")
        un = Line(P(self.x(0), Y_PISTE), P(self.x(1), Y_PISTE), color=AMBRE, stroke_width=9)
        self.play(*self.jouer_fl(h3), Create(un), run_time=0.45)
        m30 = self.mesure(0, 1, "30 m", VERT_OK, 24)
        l1 = self.calc([("90 ÷", WHITE), ("3", AMBRE), ("=", WHITE), ("30 m", VERT_OK)],
                       ["90 divisé", "par 3", None, "30 mètres"], 1, 1, 30,
                       avec={1: self.jouer_fl(b3), 3: [FadeOut(m90), FadeIn(m30, shift=UP * 0.1)]})
        self.play(tb.eteindre(0, 1), run_time=0.25)
        self.insister(l1[-1], 1.3)
        h5, b5 = self.fleches(1, 2, "× 5")
        reperes5 = VGroup(*[Line(P(self.x(k), Y_PISTE - 0.1), P(self.x(k), Y_PISTE + 0.1), color=AMBRE,
                                 stroke_width=4) for k in (4, 5)])
        self.au_mot("En 5 secondes")
        self.play(FadeOut(l1), tb.remplir(0, 2, 5), FadeIn(reperes5), run_time=0.4)
        self.play(tb.allumer(0, 2), g.animate(rate_func=linear).shift(RIGHT * 2 * PAS),
                  vit.animate(rate_func=linear).shift(RIGHT * 2 * PAS), run_time=0.7)
        m150 = self.mesure(0, 5, "150 m", VERT_OK, 28)
        self.calc([("30 ×", WHITE), ("5", AMBRE), ("=", WHITE), ("150 m", VERT_OK)],
                  ["30 fois", "5, égale", None, "150 mètres"], 1, 2, 150,
                  avec={1: self.jouer_fl(h5, b5), 3: [FadeOut(m30), FadeIn(m150, shift=UP * 0.1)]})
        self.play(tb.eteindre(0, 2), run_time=0.25)
        self.insister(tb.textes[1][2], 1.5, 0.25)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question-pause (3 s) ──
        self.petit = guepard(0.5).move_to(P(-1.35, -2.85))  # à gauche de Ti-Margo, sous les choix
        self.play(FadeIn(self.petit, shift=RIGHT * 0.3), run_time=0.3)
        self.question_pause("03-question", "03b-reponse", ["Et en 4 secondes ?"],
                            [self.t("91 m", 30), self.t("120 m", 30), self.t("360 m", 30)], 1,
                            ["30 × 4 = 120 m."], mot_q="Et en 4", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.85))
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        l7 = VGroup(guepard(0.5), self.t("7 secondes", 36)).arrange(RIGHT, buff=0.25).move_to(P(0, 0.95))
        self.au_mot("7 secondes")
        self.play(FadeIn(l7, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Combien")
        r = self.borne(self.ligne([("?", AMBRE), ("mètres", WHITE)], 40), 0.9).move_to(P(0, 0.05))
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.insister(r[0], 1.4)
        self.appel_commentaire(y=-1.0)
