# stats_frequence_short.py
# EleveAI — Maths 2de — short jumeau de l'épisode 05 « Calculer une fréquence »
# (micro stat_frequence). CEINTURE ORANGE (un cran sous la paysage verte : une
# seule fréquence, 23 ÷ 113, et le code se casse tout seul).
# Il AMUSE : « Une lettre revient sans arrêt : quelle lettre se cache derrière ? »
#   · en HAUT, le début du message codé (César +3) : OHV KRPPHV, les H allumés ;
#   · en BAS, le diagramme du coach (canvas_stats.Barres) des lettres codées
#     H, V, W, Q, L : la barre du H domine ; ses étiquettes redeviennent E, S, T,
#     N, I quand on décale à l'envers, et le message se lit : LES HOMMES ;
#   · une question-pause (3 s) : 60 E sur 500 lettres → 12 % ;
#   · fin : à 12 %, combien de E dans 2 500 lettres ? (300) en commentaire.
# Données réelles : voir stats_frequence.py (article premier de la Déclaration
# de 1789, 113 lettres, 23 E ; codé, ce sont 23 H).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/2de-stats-frequence-short.json (débit −10) ; calage :
# manim/scripts/seconde/stats_frequence_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/stats_frequence_short.py StatsFrequenceShort -o eleveai-maths-seconde-stats-frequence-short --media_dir manim/scripts/seconde/media-stats-frequence-short
# Sortie : manim/sorties/seconde/maths/statistiques/05-frequence/eleveai-maths-seconde-stats-frequence-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403
from stats_frequence import CODE, EFFS, LETTRES, cadenas, tuile  # noqa: E402

HAUT_GRAPHE = -0.15
MSG_CODE = "OHV KRPPHV"
MSG_CLAIR = "LES HOMMES"


class StatsFrequenceShort(Short2de):
    nom_voix = "2de-stats-frequence-short"
    fichier_marques = "stats_frequence_short_marques.json"

    def graphe(self):
        g = Barres(CODE, EFFS, pas=5, maxi=25, largeur=3.3, hauteur=1.2, fs=22, nom_axe="Effectif",
                   couleurs=["#fdba74"] + ["#cbd5e1"] * 4)
        g.scale_to_fit_width(4.0)
        return g.move_to(P(0, HAUT_GRAPHE), aligned_edge=UP)

    def message(self, texte, couleur_h=ORANGE_RETENUE, y=1.35):
        tuiles = VGroup()
        for ch in texte:
            if ch == " ":
                tuiles.add(VectorizedPoint())
            else:
                tuiles.add(tuile(ch, 0.36, couleur_h if ch in "HE" else "#475569"))
        tuiles.arrange(RIGHT, buff=0.05)
        return self.borne(tuiles).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le code secret", "orange")
        cd = cadenas(0.55).move_to(P(1.5, 2.0))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        msg = self.message(MSG_CODE)
        self.play(Write(titre), FadeIn(badge), FadeIn(cd), run_time=0.7)
        self.au_mot("113 lettres")
        n113 = self.ligne([("113", BLEU_CALCUL), ("lettres", WHITE)], 32).move_to(P(-0.6, 2.0))
        self.play(FadeIn(n113), LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in msg], lag_ratio=0.06), run_time=0.8)
        self.au_mot("le H, 23 fois")
        h23 = self.ligne([("H :", ORANGE_RETENUE), ("23 fois", WHITE)], 36).move_to(P(0, 0.55))
        hs = [msg[k] for k, ch in enumerate(MSG_CODE) if ch == "H"]
        self.play(FadeIn(h23, shift=UP * 0.2), *[Indicate(h, color=ORANGE_RETENUE, scale_factor=1.4) for h in hs],
                  run_time=0.6)
        self.au_mot("Devine")
        q = self.ligne([("H =", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, -0.1))
        self.play(FadeIn(q, scale=0.7), run_time=0.35)
        self.insister(q[1], 1.7)
        self.attendre_voix(marge=0.1)

        # ── 01 : la fréquence casse le code ──
        self.dire("01-image")
        g = self.graphe()
        vals = VGroup(*[g.valeur(i, fs=20) for i in range(5)])
        self.play(FadeOut(q), FadeOut(h23), FadeIn(g.fond), g.pousser(run_time=0.4, lag=0.05), FadeIn(vals),
                  run_time=0.4)
        self.au_mot("23 sur 113")
        f1, f2 = (self.ligne([("23 ÷ 113", WHITE)], 32), self.ligne([("≈", WHITE), ("20 %", AMBRE)], 32))
        ligne = VGroup(f1, f2).arrange(RIGHT, buff=0.2).move_to(P(0, 0.72))
        self.play(FadeIn(f1, shift=UP * 0.15), FadeOut(n113), run_time=0.35)
        self.au_mot("environ 20 %")
        self.play(FadeIn(f2, scale=1.3), g.focus(0), run_time=0.4)
        self.au_mot("une lettre sur cinq")
        self.insister(f2, 1.25)
        self.au_mot("c'est le E")
        reine = self.ligne([("En français, la reine :", WHITE), ("E", AMBRE)], 28)
        self.borne(reine).move_to(P(0, 0.22))
        self.play(FadeIn(reine, shift=UP * 0.15), run_time=0.4)
        self.au_mot("E devient H")
        dec = self.ligne([("E", AMBRE), ("+3 →", WHITE), ("H", ORANGE_RETENUE)], 34).move_to(P(0, 0.22))
        self.play(FadeOut(reine), FadeIn(dec, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Donc le H, c'est un E")
        neufs = [texte(x, 22, NUIT).scale(g.etiquettes[k].height / texte(x, 22, NUIT).height).move_to(g.etiquettes[k])
                 for k, x in enumerate(LETTRES)]
        self.play(*[Transform(g.etiquettes[k], neufs[k]) for k in range(5)], run_time=0.6)
        self.au_mot("Message décodé")
        clair = self.message(MSG_CLAIR, couleur_h=AMBRE)
        self.play(*[Transform(msg[k], clair[k]) for k in range(len(MSG_CLAIR))], FadeOut(ligne),
                  cd[0].animate.shift(UP * 0.12 + RIGHT * 0.08).rotate(-0.4), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question-pause ──
        t0 = self.question_short("02-question", "02b-reponse", ["500 lettres, dont 60 E :", "fréquence du E ?"],
                                 ["60 %", "12 %", "8,3 %"], 1,
                                 [("60 ÷ 500 = 0,12 = 12 %", VERT_OK, "60 divisé"),
                                  ("60 % : l'effectif, pas un %", ROUGE_CLAIR, "60 %, c'est")],
                                 efface=[msg, dec, cd])
        print(f"QUESTION SHORT t = {mmss(t0)}", flush=True)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        self.au_mot("à 12 %")
        self.play(FadeOut(VGroup(msg, dec)), run_time=0.3)
        l1 = self.borne(self.ligne([("12 %", AMBRE), ("de", WHITE), ("2 500 lettres", BLEU_CALCUL)], 32)).move_to(P(0, 0.9))
        self.play(FadeIn(l1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("combien de E")
        q2 = self.ligne([("E :", AMBRE), ("?", ORANGE_RETENUE)], 40).move_to(P(0, 0.2))
        self.play(FadeIn(q2, scale=0.8), run_time=0.35)
        self.insister(q2[1], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 30, VERT_OK), 0.9).move_to(P(0, 1.7))
        self.play(FadeIn(appel, scale=0.7), FadeOut(cd), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
