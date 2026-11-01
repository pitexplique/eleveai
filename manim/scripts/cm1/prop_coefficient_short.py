# prop_coefficient_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 05 « Le coefficient
# de proportionnalité » (micro prop_coefficient), COMMUN : rendu une fois,
# copié sous les deux noms (il n'affiche aucune classe). CEINTURE BLANCHE
# (règle du short blanc, REGLES.md) : on VOIT le coefficient.
# Il AMUSE : « Combien de fois ton cœur bat-il pendant une récré ? »
#   · EN HAUT, l'image qui bouge : un cœur qui bat (environ 80 fois par minute) ;
#   · EN BAS, au même instant, le tableau minutes → battements se remplit
#     (1 → 80, 15 → 1 200), le coefficient « × 80 » au-dessus du tableau
#     (cadre étroit : leçon du lot 1) ; code couleur partagé : le cœur ROUGE =
#     les battements ;
#   · 1 question-pause (3 s) : 10 minutes → 800 (90 = ajouter, 8 000 = un zéro
#     de trop) ;
#   · fin : en 1 heure, 60 minutes ? (4 800) en commentaire.
# Centres d'intérêt : corps-sante.
# Donnée réelle (WebSearch, 01/11/2026) : fréquence cardiaque au repos d'un
# enfant de 10 ans entre 70 et 110 battements par minute (American Heart
# Association, citée par Whoop, « What's a normal heart rate for my age »,
# whoop.com) ; 75 à 118/min pour les 5-12 ans (tableau de gambin.co).
# « Environ 80 fois par minute » est dans la fourchette : voix gardée.
# Ajouté ICI (absent du module) : coeur(), battre() (le cœur qui bat).
#
# Voix : manim/voix/cm-prop-coefficient-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm-prop-coefficient-short/ ; marques :
# manim/scripts/cm1/prop_coefficient_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_coefficient_short.py PropCoefficientShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_coefficient_short.py PropCoefficientShortCM -o eleveai-maths-cm1-prop-coefficient-short --media_dir manim/scripts/cm1/media-prop-coefficient-short
# Sorties (le même fichier, copié) :
#   manim/sorties/cm1/maths/proportionnalite/05-coefficient/eleveai-maths-cm1-prop-coefficient-short.mp4
#   manim/sorties/cm2/maths/proportionnalite/05-coefficient/eleveai-maths-cm2-prop-coefficient-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

ROUGE_C = "#ef4444"     # le cœur, et les battements dans le texte
ROUGE_FONCE = "#b91c1c"


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def coeur(s=1.0):
    """Un cœur rouge (deux ronds et une pointe), un reflet blanc."""
    g1 = Circle(radius=0.3, fill_color=ROUGE_C, fill_opacity=1, stroke_width=0).move_to(P(-0.24, 0.12))
    g2 = Circle(radius=0.3, fill_color=ROUGE_C, fill_opacity=1, stroke_width=0).move_to(P(0.24, 0.12))
    pointe = Polygon(P(-0.52, -0.02), P(0.52, -0.02), P(0, -0.62), fill_color=ROUGE_C, fill_opacity=1, stroke_width=0)
    reflet = Ellipse(width=0.14, height=0.09, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to(P(-0.32, 0.28))
    return VGroup(pointe, g1, g2, reflet).scale(s)


def battre(c, par_minute=80):
    """Updater : le cœur se gonfle à chaque battement (80 par minute)."""
    etat = {"t": 0.0}
    base = c.copy()
    periode = 60.0 / par_minute

    def maj(m, dt):
        etat["t"] = (etat["t"] + dt) % periode
        a = etat["t"] / periode
        k = 1 + 0.14 * np.exp(-((a - 0.12) / 0.07) ** 2) + 0.07 * np.exp(-((a - 0.35) / 0.07) ** 2)
        m.become(base.copy().scale(k))
    return maj


def ligne_ecg(larg=3.6, y=0.0):
    """Le tracé du cœur (électrocardiogramme) : une ligne avec 3 pics."""
    pts = []
    for k in range(3):
        x0 = -larg / 2 + k * larg / 3
        d = larg / 3
        pts += [P(x0, y), P(x0 + d * 0.35, y), P(x0 + d * 0.42, y + 0.12), P(x0 + d * 0.48, y - 0.1),
                P(x0 + d * 0.55, y + 0.45), P(x0 + d * 0.62, y - 0.2), P(x0 + d * 0.7, y)]
    pts.append(P(larg / 2, y))
    return VMobject(stroke_color=ROUGE_C, stroke_width=4).set_points_as_corners(pts)


class PropCoefficientShortCM(ShortProp):
    nom_voix = "cm-prop-coefficient-short"
    fichier_marques = "prop_coefficient_short_marques.json"
    ceinture = "blanche"

    def fleche_80(self, tb):
        """La flèche « × 80 » à droite, son étiquette AU-DESSUS (cadre étroit)."""
        fl = tb.fleche_lat("× 80", fs=30)
        e = fl.etiquette
        e.move_to(P(min(fl.fleche.get_center()[0], 1.7 - e.width / 2), tb.carte.get_top()[1] + 0.08 + e.height / 2))
        return fl

    def _disposer_q(self, question, choix, phrase):
        """Les textes des choix s'arrêtent à 0,8 du bord droit de leur carte :
        la coche de la bonne réponse (posée à 0,33 du bord) ne les touche pas."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c in cartes:
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.8
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g)
                corps.shift(RIGHT * (g - corps.get_left()[0]))
        return tete, q, cartes, pause, rebours, ph

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["10 ×", "80 =", "800 battements."])
        sc.au_mot("On multiplie")
        sc.play(Indicate(self.petit, color=WHITE, scale_factor=1.2), run_time=0.4)
        for m, mot in zip(lg, ["10 fois", "80, égale", "800 battements"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Ton cœur en récré", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        self.tb = tb = TableauProp(["Minutes", "Battements"], [[1, 15], [80, "1 200"]], montrer=False,
                                   largeur_case=0.85, largeur_libelle=1.6, hauteur=0.62, fs=28, marge=0.12,
                                   centre=P(-0.2, -0.75))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        gros = coeur(1.25).move_to(P(0, 1.15))
        self.au_mot("Combien")
        self.play(Write(titre), FadeIn(gros, scale=0.6), run_time=0.7)
        gros.add_updater(battre(gros))
        q = self.borne(self.ligne([("Une récré", WHITE), ("→ ? battements", ROUGE_C)], 32), 0.9).move_to(P(0, -0.4))
        q[1].sans_synchro = True  # « battements » : la question de la ligne (« bat-il »)
        self.au_mot("récré")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : 80 battements par minute ──
        self.dire("01-minute")
        ecg = pas_audit(ligne_ecg(3.4, 0.3))
        self.au_mot("Au repos")
        self.play(FadeOut(q), Create(ecg), run_time=0.6)
        self.au_mot("bat environ")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeOut(ecg), run_time=0.4)
        self.au_mot("80 fois")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), run_time=0.35)
        self.au_mot("par minute")
        un = pas_audit(tb.valeur(0, 0))  # « par minute » : 1 minute, dit sans le nombre
        self.play(FadeIn(un, scale=1.4), tb.allumer(0, 0), run_time=0.35)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.25)
        self.attendre_voix(marge=0.1)

        # ── 02 : le coefficient × 80, la récré de 15 minutes ──
        self.dire("02-recre")
        fl = self.fleche_80(tb)
        self.au_mot("le coefficient")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4), run_time=0.45)
        self.insister(fl.etiquette, 1.2)
        self.au_mot("pour 1")
        self.play(Indicate(tb.colonne(0), color=ROUGE_C, scale_factor=1.1), run_time=0.6)
        self.au_mot("15 minutes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  run_time=0.4)
        lg = self.borne(self.ligne([("15 ×", WHITE), ("80 =", WHITE), ("1 200 battements", ROUGE_C)], 30), 0.9)
        lg.move_to(P(0, -2.05))
        self.au_mot("15 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("80, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.12), Indicate(fl.etiquette, color=AMBRE), run_time=0.3)
        self.au_mot("1 200")
        self.play(FadeIn(lg[2], scale=1.3), tb.remplir(1, 1, "1 200"), tb.eteindre(0, 1), run_time=0.45)
        self.play(tb.allumer(1, 1), run_time=0.25)
        self.insister(lg[2], 1.12)
        self.attendre_voix(marge=0.3)
        gros.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question-pause (3 s) ──
        self.petit = coeur(0.55).move_to(P(-1.35, -2.8))  # à gauche de Ti-Margo, sous les choix
        self.play(FadeIn(self.petit, scale=0.6), run_time=0.3)
        self.petit.add_updater(battre(self.petit))
        self.question_pause("03-question", "03b-reponse", ["Et en 10 minutes ?"],
                            [self.t("90 battements", 30), self.t("800 battements", 30),
                             self.t("8 000 battements", 30)], 1,
                            ["10 × 80 = 800 battements."], mot_q="Et en", autres_r=self._rep_q)
        self.petit.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.9))
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        r = self.borne(self.ligne([("?", AMBRE), ("battements", ROUGE_C)], 38), 0.9).move_to(P(0, 1.1))
        self.au_mot("Combien")
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.insister(r[0], 1.4)
        h = self.t("en 1 heure", 36).move_to(P(0, 0.3))
        self.au_mot("1 heure")
        self.play(FadeIn(h, shift=UP * 0.15), run_time=0.35)
        m60 = self.t("= 60 minutes", 36).move_to(P(0, -0.45))
        self.au_mot("60 minutes")
        self.play(FadeIn(m60, shift=UP * 0.15), run_time=0.35)
        self.appel_commentaire(y=-1.4)
