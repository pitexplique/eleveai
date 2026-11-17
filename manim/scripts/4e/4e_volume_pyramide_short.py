# 4e_volume_pyramide_short.py
# EleveAI — Maths 4e — SHORT jumeau du pilote « le volume d'une pyramide » (micro volume_pyramide).
# ⛔ En MANIM, pas en dessin animé : à partir de la 4e, le short reste en Manim (REGLES.md, 09/11/2026),
# et il porte toujours un DÉFI (Frédéric, 15/11/2026). CEINTURE BLANCHE, format 9:16.
# Le défi : un prisme plein de sable (60 cm³) versé dans des pyramides de même base et de même hauteur.
# Combien en remplit-on ? La question-pause (3 s) EST le défi ; réponse C (3 pyramides).
# Base : PausesShort (question-pause des shorts 4e, pythagore_pauses.py) + Short6e (cadre 4,5 × 8),
# figures du commun du lot (volume_4e_commun.py : pyramide, pave, sable).
# Voix : manim/voix/4e-volume-pyramide-short.json ;
# marques : python manim/scripts/4e/volume_4e_marques.py 4e-volume-pyramide-short
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_volume_pyramide_short.py ShortVolumePyramide4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/4e_volume_pyramide_short.py ShortVolumePyramide4e -o eleveai-maths-4e-volume-pyramide-short --media_dir manim/scripts/4e/media
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus) : Frédéric, 15/11.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403  (pose aussi les chemins de manim/)
from volume_4e_commun import pyramide, pave, sable, PYR_FACE, PRI_FACE, SABLE_C  # noqa: E402

from gabarit_sixieme import Short6e  # noqa: E402
from pythagore_pauses import PausesShort, sans_audit  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_TITRE, Y_ECHELLE, Y_ACCROCHE = 3.3, 2.55, 2.0


class ShortVolumePyramide4e(PausesShort, Short6e):
    nom_voix = "4e-volume-pyramide-short"
    fichier_marques = "4e_volume_pyramide_short_marques.json"

    LARGE = 3.9   # la largeur utile du cadre 9:16 (4,5 moins 3 % de marge sur chaque bord)
    FS_PH = 30    # la phrase de correction : 26 se lit mal sur un téléphone (ses élèves lisent mal)

    def ajuster(self, mob):
        """⛔ RIEN NE DOIT ÊTRE ROGNÉ : dans un cadre de 4,5 d'unités, un titre de 24 lettres déborde.
        Tout texte de ce short passe par ici (le dry run BORDS=1 l'a montré au premier essai)."""
        if mob.width > self.LARGE:
            mob.scale_to_fit_width(self.LARGE)
        return mob

    def t(self, s, fs=28, couleur=WHITE):
        return self.ajuster(Text(s, font_size=fs, color=couleur, weight=BOLD))

    def grand(self, s, font_size=40, color=WHITE):
        return self.ajuster(Text(s, font_size=font_size, color=color, weight=BOLD))

    def page_abonnement(self, voix="05-abonne"):
        """La fin du 05/11, aux tailles de CE cadre : celle du commun frôle les bords (BORD au dry run)."""
        self.clear()
        self.margo_bas()
        self.dire(voix)
        entraine = self.grand("Entraîne-toi sur", font_size=34, color=JAUNE_TITRE).move_to(P(0, 2.4))
        # ⛔ Le cadre se construit APRÈS l'ajustement du texte : ajuster le groupe écrasait le rectangle.
        site = self.grand("eleveai.fr", font_size=46, color=BLEU_CALCUL)
        site.move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        abonne = self.grand("Abonne-toi !", font_size=36, color=VERT_OK).move_to(P(0, 0.1))
        poignee = sans_audit(self.grand("@eleveai974", font_size=36, color=VERT_OK)).move_to(P(0, -0.75))
        gestes = sans_audit(self.t("Un pouce · La cloche", 26, WHITE)).move_to(P(0, -1.7))
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.au_mot("la cloche")
        self.play(FadeIn(gestes, shift=UP * 0.1), Flash(poignee, color=VERT_OK, line_length=0.2), run_time=0.45)
        self.attendre_voix(marge=1.0)

    def echelle_short(self, couleur):
        """L'échelle ENTIÈRE des sept ceintures, 70 % de la largeur, sous le titre (REGLES.md, 13/10)."""
        return echelle_ceintures(couleur).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, Y_ECHELLE))

    def construct(self):
        self.margo_bas()

        # ── 00 : le prisme plein de sable ───────────────────────────────────
        self.dire("00-accroche")
        titre = self.grand("Trois fois le même sable", font_size=34, color=JAUNE_TITRE).move_to(P(0, Y_TITRE))
        badge = self.echelle_short("blanche")
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.7)
        # ⭐ Les deux solides CÔTE À CÔTE, même base posée à la même hauteur : « même base, même
        # hauteur » doit se VOIR, pas seulement s'écrire (l'un sous l'autre, on ne compare rien).
        u = 0.33
        pr = pave(2.1, 2.1, 2.3, u, P(-2.0, -0.95), face=PRI_FACE, dessus="#7dd3fc", cote="#0284c7",
                  bord="#0c4a6e", sw=3, op=0.92)
        self.au_mot("rempli ce prisme")
        self.play(FadeIn(pr, shift=UP * 0.2), run_time=0.5)
        gr = sable(pr.face, n=16, r=0.038)
        self.au_mot("de sable")
        self.play(FadeIn(gr), run_time=0.4)
        self.au_mot("60 centimètres cubes")
        e60 = m2("60 cm³", 28, SABLE_C).move_to(P(-1.15, 0.95))
        self.play(FadeIn(e60, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi (les pyramides de même base et même hauteur) ───────
        self.dire("01-defi")
        py = pyramide(2.1, 2.3, u, P(0.25, -0.95), sw=3)
        self.au_mot("dans des pyramides")
        self.play(FadeIn(py, shift=RIGHT * 0.25), run_time=0.5)
        self.au_mot("la même base et la même hauteur")
        meme = self.t("même base, même hauteur", 21, WHITE).move_to(P(0, -1.55))
        self.play(FadeIn(meme), Indicate(pr.face, color=JAUNE_TITRE, scale_factor=1.06),
                  Indicate(py.base, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.6)
        self.au_mot("Combien de pyramides")
        q = self.grand("Combien de pyramides ?", font_size=28, color=PYR_FACE).move_to(P(0, Y_ACCROCHE))
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause, 3 s — c'est le défi (réponse C) ─────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le prisme :", "60 cm³ de sable.", "Combien de pyramides ?"],
                            ["2 pyramides", "1 pyramide", "3 pyramides"], 2,
                            # ⛔ « 60 » et « ÷ 3 » séparés : ensemble, le 3 s'affichait 3,8 s avant d'être dit.
                            [["Une pyramide", "= le tiers :"], ["60", "÷ 3", "= 20 cm³"], "chacune."])

        # ── 03 : on verse, une, deux, trois ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("On verse", font_size=34, color=JAUNE_TITRE).move_to(P(0, Y_TITRE))
        self.add(tit)
        pyr3, et3 = VGroup(), VGroup()
        for k in range(3):
            p = pyramide(1.1, 1.2, 0.42, P(-1.78 + k * 1.3, 0.95), sw=3)
            pyr3.add(p)
            et3.add(sans_audit(m2("20 cm³", 17, SABLE_C)).move_to(P(p.get_center()[0], 0.62)))
        prv = pave(1.6, 1.6, 1.8, 0.38, P(-0.55, -2.25), face=PRI_FACE, dessus="#7dd3fc", cote="#0284c7",
                   bord="#0c4a6e", sw=3, op=0.9)
        self.add(prv)
        reste = [Polygon(prv.pt(0, 0, 0), prv.pt(1.6, 0, 0), prv.pt(1.6, 0, 1.8 * (3 - k) / 3),
                         prv.pt(0, 0, 1.8 * (3 - k) / 3), fill_color=SABLE_C, fill_opacity=0.9, stroke_width=0)
                 for k in range(4)]
        self.add(reste[0])
        nums = ["Une", "Deux", "Trois"]
        for k, mot in enumerate(nums):
            self.au_mot(mot)
            n = sans_audit(self.t(mot, 22, SABLE_C)).move_to(P(pyr3[k].get_center()[0], 1.85))
            grains = sable(pyr3[k].faces, n=6, r=0.035, graine=3 + k)
            self.remove(reste[k])
            self.add(reste[k + 1])
            self.play(FadeIn(pyr3[k]), FadeIn(grains), FadeIn(et3[k]), FadeIn(n, shift=DOWN * 0.1), run_time=0.5)
        self.remove(reste[3])
        self.au_mot("plus un grain")
        vide = sans_audit(self.t("le prisme est vide !", 24, VERT_OK)).move_to(P(0, -2.75))
        self.play(FadeIn(vide, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))), run_time=0.4)
        py1 = pyramide(1.6, 1.7, 0.5, P(-0.55, 0.9), sw=3)
        self.au_mot("une pyramide fait 25 centimètres cubes")
        e25 = m2("25 cm³", 28, PYR_FACE).move_to(P(0, 0.45))
        self.play(FadeIn(py1), FadeIn(e25, scale=1.15), run_time=0.5)
        self.au_mot("le volume du prisme")
        pr1 = pave(1.6, 1.6, 1.8, 0.5, P(-0.55, -1.75), face=PRI_FACE, dessus="#7dd3fc", cote="#0284c7",
                   bord="#0c4a6e", sw=3, op=0.9)
        inc = sans_audit(self.t("?", 36, SABLE_C)).move_to(P(1.45, -0.9))
        self.play(FadeIn(pr1), FadeIn(inc, scale=1.2), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=30, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=30, color=BLEU_CALCUL))).arrange(DOWN, buff=0.14)
        self.play(FadeIn(rep.move_to(P(0, -2.9))), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 : la fin ────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
