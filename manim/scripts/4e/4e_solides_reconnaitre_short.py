# 4e_solides_reconnaitre_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S1 « reconnaître les solides » (micro vision_reconnaitre).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric le redit le 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : le chapeau du personnage a une base ronde, une pointe, aucune
# arête sur le côté — quel solide ? Réponse B (un cône).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_solides_reconnaitre_short.py ShortSolidesReconnaitre4e

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402


def bonhomme(u, o):
    """Le personnage de Yuna, fait de solides simples : un pavé (corps), une boule (tête)."""
    corps = pave(1.0, 0.7, 1.3, u, o)
    tete = boule(0.42, u, o + P(0.62 * u, 2.0 * u), couleur="#fbbf24", bord="#78350f")
    bras = VGroup(Line(o + P(-0.1 * u, 1.0 * u), o + P(-0.6 * u, 0.5 * u)),
                  Line(o + P(1.1 * u, 1.0 * u), o + P(1.6 * u, 0.5 * u))).set_stroke("#fbbf24", 7)
    g = VGroup(bras, corps, tete)
    g.corps, g.tete, g.sommet_tete = corps, tete, o + P(0.62 * u, 2.45 * u)
    return g


class ShortSolidesReconnaitre4e(Short4e):
    nom_voix = "4e-solides-reconnaitre-short"
    fichier_marques = "4e_solides_reconnaitre_short_marques.json"

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

        # ── 00 : le personnage, sans chapeau ────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Le chapeau du personnage", fs=28)
        b = bonhomme(0.62, P(-0.6, -1.9))
        self.au_mot("termine son personnage")
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Il lui manque")
        vide = sans_audit(self.t("?", 44, JAUNE_TITRE)).move_to(b.sommet_tete + UP * 0.45)
        self.play(FadeIn(vide, scale=1.3), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        x = 0.0
        self.au_mot("une base ronde")
        l1 = sans_audit(self.t("base ronde", 24, BASE_C)).move_to(P(x, 1.35))
        self.play(FadeIn(l1), run_time=0.35)
        self.au_mot("une pointe en haut")
        l2 = sans_audit(self.t("une pointe", 24, "#fb923c")).move_to(P(x, 0.9))
        self.play(FadeIn(l2), run_time=0.35)
        self.au_mot("aucune arête")
        l3 = sans_audit(self.t("aucune arête", 24, ROUGE_ERREUR)).move_to(P(x, 0.45))
        self.play(FadeIn(l3), run_time=0.35)
        self.au_mot("Quel solide")
        q = self.accroche("Quel solide ?", fs=30, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Base ronde, une pointe,", "aucune arête.", "Quel solide ?"],
                            ["une pyramide", "un cône", "un cylindre"], 1,
                            [["Base ronde", "+ pointe"], "= un cône."])

        # ── 03 : un disque, une pointe ──────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Un disque, une pointe", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        co = cone(0.8, 1.9, 0.62, P(0, -0.6), corps="#fb923c", disque="#fdba74", bord="#7c2d12")
        self.add(co)
        self.au_mot("Un disque")
        self.play(FadeIn(co.disque, scale=1.15), Indicate(co.disque, color=BASE_C, scale_factor=1.1),
                  run_time=0.6)
        self.au_mot("une pointe")
        self.play(Flash(co.S, color=JAUNE_TITRE, line_length=0.3), run_time=0.5)
        self.au_mot("un cône")
        r = sans_audit(self.grand("un cône", font_size=38, color=VERT_OK)).move_to(P(0, -2.4))
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
        cy = cylindre(0.8, 1.7, 0.62, P(0, -0.5), corps="#38bdf8", dessus="#7dd3fc", bord="#0c4a6e")
        self.au_mot("deux disques")
        e1 = sans_audit(self.t("deux disques", 28, BASE_C)).move_to(P(0, 1.85))
        self.play(FadeIn(cy), FadeIn(e1, scale=1.15), run_time=0.55)
        self.au_mot("pas de pointe")
        e2 = sans_audit(self.t("pas de pointe, aucune arête", 24, ROUGE_ERREUR)).move_to(P(0, 1.3))
        self.play(FadeIn(e2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.75)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
