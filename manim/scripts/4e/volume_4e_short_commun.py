# volume_4e_short_commun.py
# EleveAI — la base des 28 SHORTS de la série 4e + 3e « Périmètre, aire, volume, solides ».
# ⛔ À partir de la 4e, le short est en MANIM, pas en dessin animé (REGLES.md, 09/11/2026),
# et il porte toujours un DÉFI (Frédéric, 15/11/2026).
# Tiré du pilote 4e_volume_pyramide_short.py, dont les leçons sont ici une fois pour toutes :
#   · le cadre fait 4,5 d'unités de large : TOUT texte passe par ajuster() (3,9 maximum),
#     sinon un titre de 24 lettres déborde sans prévenir (BORDS=1 le voit, l'œil non) ;
#   · la phrase de correction est en 30 et non 26 : ses élèves lisent mal ;
#   · la fin se construit à ces tailles-ci, celle du commun frôle les bords.
# Structure d'un short : 00-accroche, 01-defi, 02-question (la question-pause de 3 s,
# qui EST le défi), 02b-reponse, 03-visuel, 04-commentaire, 05-abonne.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403  (pose aussi les chemins de manim/)

from gabarit_sixieme import Short6e  # noqa: E402
from pythagore_pauses import PausesShort, sans_audit  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

Y_TITRE, Y_ECHELLE, Y_ACCROCHE = 3.3, 2.55, 2.0


class Short4e(PausesShort, Short6e):
    """Le short de la série : cadre 9:16, ceinture blanche, question-pause de 3 s."""

    LARGE = 3.9   # la largeur utile (4,5 moins 3 % de marge de chaque côté)
    FS_PH = 30    # la phrase de correction (26 se lit mal sur un téléphone)

    def ajuster(self, mob):
        if mob.width > self.LARGE:
            mob.scale_to_fit_width(self.LARGE)
        return mob

    def t(self, s, fs=28, couleur=WHITE):
        return self.ajuster(Text(s, font_size=fs, color=couleur, weight=BOLD))

    def grand(self, s, font_size=40, color=WHITE):
        return self.ajuster(Text(s, font_size=font_size, color=color, weight=BOLD))

    def m2a(self, s, fs=28, couleur=WHITE):
        """Un texte à exposant (m², cm³…), ajusté au cadre."""
        return self.ajuster(m2(s, fs, couleur))

    def echelle_short(self, couleur="blanche"):
        """L'échelle ENTIÈRE des sept ceintures, 70 % de la largeur (REGLES.md, 13/10)."""
        return echelle_ceintures(couleur).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, Y_ECHELLE))

    def ouverture(self, titre, fs=34):
        """Le titre et l'échelle des ceintures, posés ensemble au début du 00."""
        t = self.grand(titre, font_size=fs, color=JAUNE_TITRE).move_to(P(0, Y_TITRE))
        e = self.echelle_short()
        self.play(FadeIn(t), FadeIn(e), run_time=0.7)
        return t, e

    def accroche(self, texte, fs=28, couleur=PYR_FACE, y=Y_ACCROCHE):
        return self.grand(texte, font_size=fs, color=couleur).move_to(P(0, y))

    def page_abonnement(self, voix="05-abonne"):
        """La fin du 05/11, aux tailles de ce cadre (celle du commun frôle les bords)."""
        self.clear()
        self.margo_bas()
        self.dire(voix)
        entraine = self.grand("Entraîne-toi sur", font_size=34, color=JAUNE_TITRE).move_to(P(0, 2.4))
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

    def commentaire(self, y=-2.9, fs=30):
        """Les deux lignes de la question posée en commentaire, à la fin du 04."""
        rep = VGroup(self.grand("en commentaire !", font_size=fs, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=fs, color=BLEU_CALCUL)))
        return rep.arrange(DOWN, buff=0.14).move_to(P(0, y))
