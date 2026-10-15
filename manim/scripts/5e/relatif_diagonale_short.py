# relatif_diagonale_short.py
# EleveAI — Maths 5e — short « Les nombres relatifs, c'est ta course ».
# Voix validée par Frédéric le 08/10/2026 (« go ») :
#   manim/voix/5e-relatif-nombre-short-diagonale.json, Julie, débit −8.
#
# L'idée (Frédéric, 08/10, après le bandeau d'accueil redessiné) : les nombres
# relatifs sur le parcours de la Diagonale des Fous 2026, « avec un compteur en
# bas ». Monter = +, descendre = − ; de la mer à la mer, la somme fait 0, mais
# les jambes ont monté 10 200 m (D+ annoncé par l'organisation, presse 2026).
#
# ⚠️ Altitudes : Nez-de-Bœuf ≈ 2 070 m, Hell-Bourg ≈ 930 m, belvédère du Maïdo
# ≈ 2 190 m (sites de randonnée et de tourisme, vérifiés le 08/10). La mer = 0.
# ⚠️ Le compteur est un `Text` refait à chaque image : `DecimalNumber` passe par
# LaTeX, absent du poste (voir gabarit_seconde.py).
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/relatif_diagonale_short.py ShortDiagonaleRelatif5e -o eleveai-maths-5e-relatif-nombre-short-diagonale --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Short6e

# (km, altitude, nom, nom au-dessus du point ?)
ETAPES = [
    (0, 0, "Saint-Pierre", False),
    (30, 2070, "Nez-de-Bœuf", True),
    (86, 930, "Hell-Bourg", False),
    (138, 2190, "Maïdo", "droite"),  # au-dessus, il touchait le titre
    (160, 0, "La Possession", False),
]


def nombre(n):
    """2070 → « 2 070 » ; le signe se met à part."""
    return f"{abs(n):,}".replace(",", " ")


def signe(n):
    return f"+{nombre(n)}" if n > 0 else (f"−{nombre(n)}" if n < 0 else "0")


def couleur(n):
    return VERT_OK if n > 0 else (ROUGE_ERREUR if n < 0 else JAUNE_TITRE)


class ShortDiagonaleRelatif5e(Short6e):
    nom_voix = "5e-relatif-nombre-short-diagonale"

    # ── le profil, en haut ──────────────────────────────────────────────────

    def pt(self, km, alt):
        x = -1.85 + km / 160 * 3.7
        # ⚠️ Trois bandes qui ne se touchent pas (planche du 08/10) : profil
        # 0,95 → 2,7 ; calcul 0,7 → −0,8 ; compteur −0,93 → −2,18.
        y = 1.2 + alt / 2190 * 1.15
        return np.array([x, y, 0])

    def zone_milieu(self, *mobs):
        """Remplace ce qui est écrit au milieu (entre le profil et le compteur)."""
        anciens = getattr(self, "_milieu", None)
        nouveau = VGroup(*mobs)
        anims = [FadeIn(nouveau, shift=UP * 0.15)]
        if anciens is not None and len(anciens):
            # Chaque morceau est sur la scène pour lui-même (Write ajouté
            # après coup) : on les efface UN PAR UN, sinon ils restent.
            anims[:0] = [FadeOut(m) for m in anciens]
        self.play(*anims)
        self._milieu = nouveau

    # ── le compteur, en bas ─────────────────────────────────────────────────

    def compteur(self):
        self.alt = ValueTracker(0)
        self.variation = None
        cadre = RoundedRectangle(width=4.2, height=1.25, corner_radius=0.2,
                                 stroke_color=BLEU_CALCUL, stroke_width=3,
                                 fill_color="#0b1b2b", fill_opacity=0.9).move_to([0, -1.55, 0])
        lib_alt = Text("Altitude", font_size=22, color=BLEU_CALCUL).move_to([-1.05, -1.17, 0])
        lib_var = Text("Variation", font_size=22, color=BLEU_CALCUL).move_to([1.05, -1.17, 0])
        sep = Line([0, -1.0, 0], [0, -2.1, 0], color=BLEU_CALCUL, stroke_width=2)

        def val_alt():
            return Text(f"{nombre(round(self.alt.get_value()))} m", font_size=32,
                        color=WHITE).move_to([-1.05, -1.7, 0])

        self.val_alt = always_redraw(val_alt)
        self.val_var = Text("—", font_size=32, color=WHITE).move_to([1.05, -1.7, 0])
        self.play(FadeIn(VGroup(cadre, lib_alt, lib_var, sep), shift=UP * 0.2),
                  FadeIn(self.val_alt), FadeIn(self.val_var))

    def montrer_variation(self, v):
        nv = Text(signe(v), font_size=34, color=couleur(v)).move_to([1.05, -1.7, 0])
        self.play(Transform(self.val_var, nv), Flash(nv, color=couleur(v), line_length=0.2))

    # ── un tronçon de course ────────────────────────────────────────────────

    def troncon(self, i, duree=2.2):
        km0, a0, _, _ = ETAPES[i - 1]
        km1, a1, nom, dessus = ETAPES[i]
        p0, p1 = self.pt(km0, a0), self.pt(km1, a1)
        trait = Line(p0, p1, color=VERT_OK if a1 > a0 else ROUGE_ERREUR, stroke_width=5)
        self.traits.add(trait)
        if a1 > a0:
            self.montees.add(trait)
        self.play(Create(trait), self.coureur.animate.move_to(p1),
                  self.alt.animate.set_value(a1), run_time=duree, rate_func=linear)
        d = Dot(p1, radius=0.07, color=WHITE)
        lbl = Text(nom, font_size=17, color=WHITE)
        cote = RIGHT if dessus == "droite" else (UP if dessus else DOWN)
        lbl.next_to(d, cote, buff=0.12)
        # Bornes du cadre : rien ne sort à gauche ni à droite.
        if lbl.get_left()[0] < -2.15:
            lbl.align_to([-2.15, 0, 0], LEFT)
        if lbl.get_right()[0] > 2.15:
            lbl.align_to([2.15, 0, 0], RIGHT)
        self.play(FadeIn(d), FadeIn(lbl), run_time=0.4)

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.margo_bas()
        self.dire("00-accroche")
        a = VGroup(self.grand("Les maths,", font_size=50),
                   self.grand("ça sert à rien…", font_size=50)).arrange(DOWN, buff=0.2)
        a.move_to([0, 1.6, 0])
        self.play(Write(a))
        self.au_mot("sauf à")
        b = VGroup(self.grand("… sauf à courir", font_size=42, color=JAUNE_TITRE),
                   self.grand("la Diagonale", font_size=50, color=JAUNE_TITRE),
                   self.grand("des Fous", font_size=50, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        b.move_to([0, -0.6, 0])
        self.play(FadeIn(b, scale=1.2))
        self.attendre_voix(marge=0.4)
        self.play(FadeOut(a), FadeOut(b))

    def ecran_depart(self):
        self.dire("01-depart")
        titre = Text("Diagonale des Fous 2026", font_size=22, color=JAUNE_TITRE).move_to([0, 2.85, 0])
        mer = Line([-2.15, 1.2, 0], [2.15, 1.2, 0], color=BLEU_CALCUL, stroke_width=2)
        lmer = Text("mer : 0 m", font_size=15, color=BLEU_CALCUL).next_to(mer, DOWN, buff=0.08).set_x(0.25)
        self.play(Write(titre), Create(mer), FadeIn(lmer))
        self.traits = VGroup()
        self.montees = VGroup()
        p0 = self.pt(0, 0)
        d = Dot(p0, radius=0.07, color=WHITE)
        lbl = Text("Saint-Pierre", font_size=17, color=WHITE).next_to(d, DOWN, buff=0.12).align_to([-2.15, 0, 0], LEFT)
        self.coureur = Dot(p0, radius=0.12, color=ORANGE_RETENUE)
        self.play(FadeIn(d), FadeIn(lbl), FadeIn(self.coureur, scale=2))
        self.au_mot("Altitude")
        self.compteur()
        self.attendre_voix(marge=0.3)

    def ecran_nez(self):
        self.dire("02-nez")
        self.troncon(1)
        self.au_mot("Le compteur")
        self.zone_milieu(self.grand("+2 070", font_size=64, color=VERT_OK).move_to([0, 0.05, 0]))
        self.montrer_variation(2070)
        self.attendre_voix(marge=0.3)

    def ecran_hellbourg(self):
        self.dire("03-hellbourg")
        self.troncon(2)
        self.au_mot("930 moins")
        calc = self.grand("930 − 2 070", font_size=44).move_to([0, 0.15, 0])
        self.zone_milieu(calc)
        self.au_mot(": moins 1140")
        res = self.grand("= −1 140", font_size=50, color=ROUGE_ERREUR).next_to(calc, DOWN, buff=0.1)
        self.play(Write(res))
        self._milieu.add(res)
        self.montrer_variation(-1140)
        self.attendre_voix(marge=0.3)

    def ecran_maido(self):
        self.dire("04-maido")
        self.troncon(3)
        self.au_mot("Plus 1260")
        self.zone_milieu(VGroup(self.grand("2 190 − 930", font_size=40),
                                self.grand("= +1 260", font_size=50, color=VERT_OK)
                                ).arrange(DOWN, buff=0.1).move_to([0, 0.05, 0]))
        self.montrer_variation(1260)
        self.attendre_voix(marge=0.3)

    def ecran_possession(self):
        self.dire("05-possession")
        self.troncon(4)
        self.au_mot("Moins 2190")
        self.zone_milieu(VGroup(self.grand("0 − 2 190", font_size=40),
                                self.grand("= −2 190", font_size=50, color=ROUGE_ERREUR)
                                ).arrange(DOWN, buff=0.1).move_to([0, 0.05, 0]))
        self.montrer_variation(-2190)
        self.attendre_voix(marge=0.3)

    def ecran_somme(self):
        self.dire("06-somme")
        termes = [2070, -1140, 1260, -2190]
        reperes = ["plus 2070", "moins 1140", "plus 1260", "moins 2190"]
        # Deux par ligne : sur une seule, il fallait les écrire trop petit.
        lignes = VGroup(*[Text(signe(v), font_size=34, color=couleur(v)) for v in termes])
        lignes.arrange_in_grid(rows=2, cols=2, buff=(0.45, 0.12))
        lignes.move_to([0, 0.4, 0])
        self.zone_milieu(VGroup())
        for m, rep in zip(lignes, reperes):
            self.au_mot(rep)
            self.play(FadeIn(m, scale=0.6), run_time=0.4)
        self._milieu.add(*lignes)
        self.au_mot("zéro")
        zero = self.grand("= 0", font_size=52, color=JAUNE_TITRE).move_to([0, -0.42, 0])
        self.play(GrowFromCenter(zero))
        self.play(Circumscribe(zero, color=JAUNE_TITRE))
        self._milieu.add(zero)
        self.attendre_voix(marge=0.3)

    def ecran_jambes(self):
        self.dire("07-jambes")
        a = self.grand("0 m de gagné", font_size=38, color=JAUNE_TITRE).move_to([0, 0.3, 0])
        self.zone_milieu(a)
        self.au_mot("et pourtant")
        montees = self.montees
        b = self.grand("10 200 m de montée", font_size=36, color=VERT_OK).move_to([0, -0.3, 0])
        self.play(Write(b), Indicate(montees, color=VERT_OK, scale_factor=1.05))
        self._milieu.add(b)
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.dire("08-regle")
        # Le compteur et le profil laissent la place à la règle.
        self.play(*[FadeOut(m) for m in self.mobjects if m not in self._margo])
        m1 = self.grand("Monter = +", font_size=58, color=VERT_OK).move_to([0, 1.9, 0])
        self.play(Write(m1))
        self.au_mot("Descendre")
        m2 = self.grand("Descendre = −", font_size=58, color=ROUGE_ERREUR).move_to([0, 0.7, 0])
        self.play(Write(m2))
        self.au_mot("Les nombres relatifs")
        m3 = VGroup(self.grand("Les nombres relatifs,", font_size=38, color=JAUNE_TITRE),
                    self.grand("c'est ta course !", font_size=44, color=JAUNE_TITRE)
                    ).arrange(DOWN, buff=0.15).move_to([0, -0.9, 0])
        self.play(FadeIn(m3, scale=1.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.ecran_accroche()
        self._margo = list(self.mobjects)
        self.ecran_depart()
        self.ecran_nez()
        self.ecran_hellbourg()
        self.ecran_maido()
        self.ecran_possession()
        self.ecran_somme()
        self.ecran_jambes()
        self.ecran_regle()
        # Le renvoi vers la vidéo longue des relatifs, sans voix (la voix
        # validée s'arrête sur « c'est ta course ») : l'écran parle seul.
        self.ecran_renvoi("09-fin-muet")
