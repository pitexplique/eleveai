# 4e_volume_lien_aire_short.py
# EleveAI — Maths 4e — SHORT de l'épisode V1 « aire de base et volume » (micro volume_lien_aire).
# ⛔ En MANIM (REGLES.md, 09/11) et avec un DÉFI (Frédéric, 15/11). CEINTURE BLANCHE, 9:16.
# Le défi : la piscine gonflable du jardin, fond de 3 m², 50 cm d'eau — combien de litres ?
# Réponse A (1 500 L) : 3 × 0,5 = 1,5 m³, et 1 m³ = 1 000 L.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_volume_lien_aire_short.py ShortVolumeLienAire4e

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

EAU_C, EAU_D, EAU_COTE, EAU_B = "#38bdf8", "#7dd3fc", "#0284c7", "#0c4a6e"


def piscine(L, l, h, u, o, sw=3, op=0.9):
    v = pave(L, l, h, u, o, face=EAU_C, dessus=EAU_D, cote=EAU_COTE, bord=EAU_B, sw=sw, op=op)
    q = v.pt
    v.fond = Polygon(q(0, 0, 0), q(L, 0, 0), q(L, l, 0), q(0, l, 0), fill_color="#0369a1",
                     fill_opacity=0.95, stroke_color=JAUNE_TITRE, stroke_width=4)
    return v


class ShortVolumeLienAire4e(Short4e):
    nom_voix = "4e-volume-lien-aire-short"
    fichier_marques = "4e_volume_lien_aire_short_marques.json"

    def _carte(self, lettre, contenu, fs):
        """⛔ La carte d'un choix, avec la PLACE DU ✓ au bout. Le gabarit étire le libellé
        jusqu'à 0,8 du bord de la carte, or le ✓ de la bonne réponse se pose à 0,38 du bord
        DROIT : sur un libellé long il TOUCHE la dernière lettre (« le deuxièm✓e »,
        « environ 51,4 m✓² » — mesuré à l'image, 10 des 20 shorts de 4e, écarts de -8 à
        -27 px). `BORDS=1` ne voit rien : rien ne sort du cadre. Même remède qu'en CM2
        (`manim/scripts/cm2/aire_comprendre.py`). Les libellés courts ne bougent pas : la
        condition ne les atteint jamais."""
        g = super()._carte(lettre, contenu, fs)
        cadre, ligne = g
        if ligne.width > self.LARG - 1.2:
            ligne.scale_to_fit_width(self.LARG - 1.2)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 : la piscine gonflable ───────────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("La piscine gonflable", fs=32)
        b = piscine(2.4, 1.8, 1.0, 0.5, P(-0.95, -1.0))
        self.au_mot("du jardin")
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.5)
        self.au_mot("3 mètres carrés")
        e3 = self.m2a("fond : 3 m²", 26, BASE_C).move_to(P(0, -1.75))
        self.play(FadeIn(b.fond), FadeIn(e3, scale=1.15), run_time=0.5)
        self.au_mot("50 centimètres d'eau")
        e50 = sans_audit(self.t("50 cm", 26, HAUTEUR_C)).move_to(P(1.4, -0.35))
        self.play(FadeIn(e50, scale=1.15), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("100 litres par minute")
        tuyau = VGroup(Line(P(-1.9, 1.3), P(-1.0, 0.55), stroke_color="#16a34a", stroke_width=9),
                       Dot(P(-1.0, 0.55), radius=0.07, color="#16a34a"))
        deb = sans_audit(self.t("100 L / min", 24, "#16a34a")).move_to(P(0.75, 1.15))
        self.play(Create(tuyau), FadeIn(deb), run_time=0.5)
        self.au_mot("Combien de litres")
        q = self.accroche("Combien de litres ?", fs=28, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Fond : 3 m².", "Eau : 0,5 m.", "Combien de litres ?"],
                            ["1 500 L", "150 L", "15 000 L"], 0,
                            [["3", "× 0,5", "= 1,5 m³"], ["1 m³", "= 1 000 L"], "donc 1 500 L."])

        # ── 03 : le quart d'heure ───────────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Le temps du tuyau", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        b2 = piscine(2.4, 1.8, 1.0, 0.5, P(-0.95, 0.3))
        self.add(b2, b2.fond)
        self.au_mot("1 500 litres")
        e = self.m2a("1 500 L", 32, SABLE_C).move_to(P(0, -0.85))
        self.play(FadeIn(e, scale=1.2), run_time=0.45)
        self.au_mot("100 litres par minute")
        d = sans_audit(self.t("100 L / min", 26, "#16a34a")).move_to(P(0, -1.55))
        self.play(FadeIn(d), run_time=0.4)
        self.au_mot("un quart d'heure")
        r = sans_audit(self.grand("15 minutes", font_size=38, color=VERT_OK)).move_to(P(0, -2.45))
        self.play(FadeIn(r, scale=1.2), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))), run_time=0.4)
        b3 = piscine(2.6, 1.9, 0.9, 0.5, P(-1.0, 0.5))
        self.au_mot("6 mètres carrés")
        e6 = self.m2a("fond : 6 m²", 28, BASE_C).move_to(P(0, -0.35))
        self.play(FadeIn(b3), FadeIn(b3.fond), FadeIn(e6, scale=1.15), run_time=0.5)
        self.au_mot("40 centimètres d'eau")
        e40 = sans_audit(self.t("eau : 40 cm", 28, HAUTEUR_C)).move_to(P(0, -1.0))
        self.play(FadeIn(e40, scale=1.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire()), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
