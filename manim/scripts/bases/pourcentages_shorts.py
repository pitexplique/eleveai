# pourcentages_shorts.py
# EleveAI — « Les bases » — Les pourcentages : le short « +20 % puis −20 % ».
#
# ⭐ 21/09/2026 — le short de la Une du COLLÈGE. Frédéric : « j'aime bien +20 % et
# −20 % », puis, entre quatre objets proposés : « tablette de chocolat parfait ».
# ⭐ POURQUOI LA TABLETTE ET PAS UN NIVEAU DANS UN VERRE : l'écart final n'est que
# de 4 %. Sur une bouteille, c'est un filet de 4 cL sur 100 — invisible sur un
# téléphone. Sur une grille de 100 carrés, UN CARRÉ VAUT 1 % : les 4 carrés qui
# manquent se COMPTENT, en rouge, dans le cadre de départ. (Le verre doseur vit
# dans la feuille d'exercices, exercice 14.)
#
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU : les pourcentages se travaillent de la 6e à la
# 1re — voir `manim/gabarit_bases.py`. Le short mène à la feuille de 3e
# (`lib/fiches-exercices/maths-3e-proportionnalite.tsx`, exercices 17 et 18) et
# peut mener à celle de seconde (information chiffrée).
# ⭐ LA TABLETTE NE DISPARAÎT JAMAIS entre les écrans 1 à 4 : pas de `clear()`.
# Seuls le titre et la ligne du bas changent — c'est le MÊME objet qu'on regarde
# grandir puis rétrécir, et le cadre pointillé « départ » reste posé dessus.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-pourcentages-short-tablette.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/pourcentages_shorts.py PourcentagesShortTablette -o eleveai-maths-bases-pourcentages-short-tablette --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

CHOCOLAT = "#9C6B3C"
PAS = 0.28       # d'un carré au suivant
COTE = 0.235     # le carré lui-même
X0, Y0 = -4.5 * PAS, -0.8    # le centre du carré en bas à gauche


class PourcentagesShortTablette(ShortBases):
    """LE PARADOXE — deux « 20 % » qui ne portent pas sur la même quantité."""

    dossier_voix = SONS / "bases-pourcentages-short-tablette"

    # ── les briques ─────────────────────────────────────────────────────────

    def carre(self, k, couleur=CHOCOLAT):
        """Le k-ième carré : les rangées se remplissent du BAS vers le haut, donc
        les 20 carrés du « +20 % » se posent AU-DESSUS, comme un étage de plus."""
        c = Square(side_length=COTE, stroke_width=0, fill_color=couleur, fill_opacity=1)
        return c.move_to([X0 + (k % 10) * PAS, Y0 + (k // 10) * PAS, 0])

    def titre(self, texte, couleur=JAUNE_TITRE, font_size=40):
        return self.grand(texte, font_size=font_size, color=couleur).move_to([0, 2.95, 0])

    def bas(self, texte, couleur=WHITE, font_size=40):
        return self.grand(texte, font_size=font_size, color=couleur).move_to([0, -1.6, 0])

    # ── l'accroche ──────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        l1 = self.grand("+20 %", font_size=92, color=VERT_OK).move_to([0, 2.35, 0])
        l2 = self.grand("puis −20 %", font_size=70, color=ROUGE_ERREUR).move_to([0, 1.15, 0])
        l3 = self.grand("retour au départ ?", font_size=40, color=WHITE).move_to([0, 0.05, 0])
        # ⭐ l'image de la 1re seconde porte déjà la question entière
        self.add(l1, l2, l3)
        self.wait(4.5)   # le « Non. » de la voix tombe vers 5 s : l'écran l'attend
        non = self.grand("NON.", font_size=110, color=JAUNE_TITRE).move_to([0, -1.25, 0])
        self.play(FadeIn(non, scale=1.4), run_time=0.4)
        self.play(Flash(non, color=JAUNE_TITRE, line_length=0.45))
        self.attendre_voix(marge=0.4)

    # ── la tablette, d'un seul tenant (écrans 1 à 4) ────────────────────────

    def ecrans_tablette(self):
        self.clear()
        self.margo_bas()

        # 1. cent carrés, et le cadre « départ » qui ne bougera plus
        self.dire("01-tablette")
        t = self.titre("100 carrés")
        self.play(Write(t), run_time=0.6)
        cent = VGroup(*[self.carre(k) for k in range(100)])
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cent], lag_ratio=0.012), run_time=1.6)
        cadre = DashedVMobject(
            Rectangle(width=10 * PAS + 0.08, height=10 * PAS + 0.08, color=WHITE, stroke_width=3)
            .move_to([0, Y0 + 4.5 * PAS, 0]),
            num_dashes=44,
        )
        depart = Text("départ", font_size=22, color=WHITE).rotate(PI / 2).next_to(cadre, RIGHT, buff=0.1)
        b = self.bas("1 carré = 1 %", couleur=ORANGE_RETENUE)
        self.play(Create(cadre), FadeIn(depart), FadeIn(b))
        self.attendre_voix(marge=0.4)

        # 2. +20 % : un étage de plus
        self.dire("02-plus")
        t2 = self.titre("+20 %", couleur=VERT_OK, font_size=56)
        self.play(FadeOut(t), FadeOut(b), FadeIn(t2))
        vingt = VGroup(*[self.carre(k, VERT_OK) for k in range(100, 120)])
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in vingt], lag_ratio=0.05), run_time=1.4)
        b2 = self.bas("100 + 20 = 120", couleur=VERT_OK)
        self.play(FadeIn(b2))
        self.attendre_voix(marge=0.4)

        # 3. −20 %… de quoi ? De 120 : on retire 24 carrés, pas 20.
        self.dire("03-moins")
        t3 = self.titre("−20 %… de QUOI ?", couleur=ROUGE_ERREUR, font_size=44)
        self.play(FadeOut(t2), FadeOut(b2), FadeIn(t3))
        self.wait(1.6)
        b3 = self.bas("20 % de 120 = 24", couleur=ROUGE_ERREUR)
        self.play(FadeIn(b3))
        # Les 20 verts s'en vont… et QUATRE carrés de la tablette de départ avec eux.
        quatre = VGroup(*[cent[k] for k in range(96, 100)])
        self.play(vingt.animate.set_fill(ROUGE_ERREUR), quatre.animate.set_fill(ROUGE_ERREUR), run_time=0.6)
        self.wait(0.8)
        self.play(
            FadeOut(vingt, shift=UP * 0.25),
            quatre.animate.set_fill(opacity=0).set_stroke(ROUGE_ERREUR, width=3.5, opacity=1),
            run_time=0.9,
        )
        b3b = self.bas("120 − 24 = 96", couleur=WHITE)
        self.play(FadeOut(b3), FadeIn(b3b))
        self.attendre_voix(marge=0.4)

        # 4. il en manque 4 — ils se COMPTENT dans le cadre de départ
        self.dire("04-manque")
        t4 = self.titre("il en manque 4", couleur=ROUGE_ERREUR, font_size=48)
        self.play(FadeOut(t3), FadeOut(b3b), FadeIn(t4))
        self.play(LaggedStart(*[Flash(c, color=ROUGE_ERREUR, line_length=0.16, flash_radius=0.2) for c in quatre],
                              lag_ratio=0.25), run_time=1.6)
        b4 = self.bas("−4 %", couleur=ROUGE_ERREUR, font_size=64)
        self.play(FadeIn(b4, scale=1.3))
        self.wait(1.4)
        # VU AU RENDU : sur une ligne, `grand()` la réduisait à une taille illisible.
        regle = VGroup(
            self.grand("× 1,2  puis  × 0,8", font_size=40, color=JAUNE_TITRE),
            self.grand("=  × 0,96", font_size=48, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.16).move_to([0, -1.8, 0])
        self.play(FadeOut(b4), FadeIn(regle))
        self.attendre_voix(marge=0.5)

    # ── le défi ─────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.play(Write(Text("À toi", font_size=46, color=ORANGE_RETENUE).move_to([0, 2.8, 0])), run_time=0.5)
        l1 = self.grand("1 000 abonnés", font_size=56, color=WHITE).move_to([0, 1.6, 0])
        l2 = self.grand("−20 %", font_size=70, color=ROUGE_ERREUR).move_to([0, 0.45, 0])
        l3 = self.grand("puis +20 %", font_size=62, color=VERT_OK).move_to([0, -0.55, 0])
        l4 = self.grand("= ?", font_size=96, color=JAUNE_TITRE).move_to([0, -1.75, 0])
        for m in (l1, l2, l3):
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(FadeIn(l4, scale=1.2))
        self.play(Flash(l4, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_accroche()
        self.ecrans_tablette()
        self.ecran_defi()
        self.ecran_renvoi()
