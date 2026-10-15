# manim/scripts/actu/fiche_de_paie.py
#
# « QUI A RAISON ? » — LA FICHE DE PAIE (20/09/2026)
#
# Frédéric, 19/09 : « je voudrais faire une vidéo sur la fiche de paie et son
# évolution depuis 20 ans — livre de Sarah Knafo, Le Casse du siècle ». Puis le
# 20/09 : « on envoie la vidéo, mais elle doit être connectée à un coach IA en
# maths avec fiche de cours et fiche d'exercices — comme avec les baleines »,
# « il faut comparer avec les autres pays », et : « c'est important, car pour
# certains ce sont de futurs électeurs ».
#
# ⭐⭐ LA LIGNE : LA VIDÉO DONNE L'OUTIL, PAS LA CONSIGNE DE VOTE. Frédéric, le
# 20/09 : « sur la vidéo il faut mettre : Sarah Knafo a-t-elle raison ? », « elle
# fait le buzz, il faut apporter une réponse mathématique ». Le short 1 la nomme
# donc — c'est le format de la rubrique — mais :
#   ⛔ on ne lui fait dire QUE ce qui est vérifié : les deux montants de son
#     livre (coût 3 922 €, net 2 079 € — JDD et franceinfo, septembre 2026) ;
#     aucune citation entre guillemets, aucune thèse qu'on lui prêterait ;
#   ⛔ le verdict a DEUX côtés : son chiffre est juste (47 %, l'OCDE dit 47,2),
#     et la part baisse depuis vingt ans ; le mot « casse », lui, n'est pas un
#     calcul — la vidéo dit ce que ces euros financent et s'arrête là ;
#   ⛔ ni « trop » ni « pas assez » : « c'est ton choix d'électeur ».
# Ce qu'elle enseigne vaut contre n'importe quel camp : « pour cent de QUOI ?
# pour QUI ? en points ou en pour cent ? ». Frédéric est enseignant contractuel
# et ses élèves regardent la chaîne : la vérification à deux côtés est aussi ce
# qui le protège.
#
# ⭐ LA NOTION : `information_chiffree_evolutions` (seconde ; et « analyse de
# l'information chiffrée » du tronc commun de première). ⛔ Pas d'étiquette de
# classe à l'écran. Fiche : /fiches-cours/maths/seconde/information-chiffree-
# evolutions ; feuille : /fiches-exercices/… (mêmes chiffres, mêmes sources).
#
# ── LES CHIFFRES, relevés le 20/09/2026 À LA SOURCE PRIMAIRE ─────────────────
# OCDE, base « Taxing Wages », API SDMX :
#   https://sdmx.oecd.org/public/rest/data/OECD.CTP.TPS,DSD_TAX_WAGES_COMP@DF_TW_COMP,/FRA......?startPeriod=2000
#   (7 dimensions ; `.AV_TW..S_C0.AW100+AW67._Z.A` pour tous les pays)
#   Mesure AV_TW = part des prélèvements (cotisations salariales + patronales +
#   impôt sur le revenu, CSG comprise) dans le COÛT du travail. Célibataire sans
#   enfant.
#     France, salaire moyen (AW100) : 50,5 % (2005) → 47,2 % (2025) = −3,3 points
#     France, 67 % du salaire moyen : 46,5 → 41,2 = −5,3 points
#     France, 167 %                 : 53,3 → 54,1 = +0,8 point
#     2025, salaire moyen : Belgique 52,5 · Allemagne 49,3 · France 47,2 (3e sur
#     38) · Autriche 47,1 · Italie 45,8 · moyenne OCDE 35,1 · Royaume-Uni 32,4 ·
#     États-Unis 30,0 · Suisse 23,0.
#     Salaire moyen français : brut 30 521 € (2005) → 45 964 € (2025) ; net après
#     impôt 21 710 → 33 104 € ; coût (= net ÷ (1 − part)) 43 864 → 62 671 €.
#     Par mois : coût 3 655 → 5 223 € (+42,9 %), net 1 809 → 2 759 € (+52,5 %).
# INSEE, indice des prix à la consommation, série 001759970 (base 2015) :
#     moyenne 2005 = 87,85 ; moyenne 2025 = 120,95 ; soit +37,7 %.
# URSSAF, simulateur mon-entreprise (API /api/v1/evaluate, règles 2026) :
#     2 950 € brut → coût 3 925 €, net avant impôt 2 313 € ; SMIC 1 823 € brut →
#     coût 1 899 €, net 1 421 €. (Sert la feuille d'exercices, pas la vidéo.)
#
# ⭐ LA VÉRIFICATION CROISÉE : le bulletin du livre (coût 3 922 €, net 2 079 €)
# donne 1 843 ÷ 3 922 = 47,0 %. L'OCDE donne 47,2 %. Deux chemins, un nombre :
# le NIVEAU annoncé est juste. C'est l'ÉVOLUTION sur vingt ans qui surprend —
# elle baisse — et c'est le second short.
#
# ⛔ RÈGLE DE LA RUBRIQUE (mémoire « Qui a raison ? ») : les chiffres ne donnent
# pas toujours raison à la voix dissonante. Short 2 : la part baisse (contre le
# titre du livre) MAIS le niveau reste 3e sur 38 (pour lui). Les deux à l'écran.
#
# ⛔ CE QUE LA VIDÉO NE DIT PAS : rien sur ce que « rapportent » les cotisations
# (retraite future, santé) — c'est un autre calcul, avec d'autres hypothèses.
# Elle dit seulement qu'elles les financent.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/actu-paie-short-deux.json -Debit 6
#        (⚠️ +6 et non le −4 du lycée : à −4 le short 1 durait 74 s ; à +6, 67 s.)
#        powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/actu-paie-short-vingt-ans.json -Debit -4
# Rendu :
#   python -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/actu/fiche_de_paie.py PaieShortDeuxPourcents -o brouillon --media_dir manim/scripts/actu/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/fiche_de_paie.py PaieShortDeuxPourcents -o eleveai-maths-actu-paie-short-deux --media_dir manim/scripts/actu/media
#   (idem PaieShortVingtAns → eleveai-maths-actu-paie-short-vingt-ans)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

VOIX_DEUX = SONS / "actu-paie-short-deux"
VOIX_VINGT = SONS / "actu-paie-short-vingt-ans"

# ── Les chiffres, une seule fois, pour que l'écran et le calcul ne divergent pas
COUT = 5223            # salaire moyen France 2025, par mois (OCDE)
NET = 2759
PRELEV = COUT - NET    # 2 464 — calculé, pas recopié
PART_COUT = 100 * PRELEV / COUT   # 47,2
PART_NET = 100 * PRELEV / NET     # 89,3

# Le bulletin du livre (« Le Casse du siècle », 2026) — les deux seuls nombres
# qu'on lui emprunte. 1 843 ÷ 3 922 = 47,0 % ; 1 843 ÷ 2 079 = 88,6 %.
LIVRE_COUT = 3922
LIVRE_NET = 2079
LIVRE_PRELEV = LIVRE_COUT - LIVRE_NET

# (pays, part des prélèvements dans le coût, 2025) — ordre décroissant
PAYS = [
    ("Belgique", 52.5),
    ("Allemagne", 49.3),
    ("France", 47.2),
    ("OCDE", 35.1),          # la moyenne des 38 pays
    ("Suisse", 23.0),
]

# France, part prélevée 2005 → 2025, par niveau de salaire
SERIE = [
    ("bas salaires", 46.5, 41.2),
    ("salaire moyen", 50.5, 47.2),
    ("hauts salaires", 53.3, 54.1),
]


def fr(x, d=1):
    """47.18 → « 47,2 » ; le signe moins est le vrai (−), pas le tiret."""
    s = f"{abs(x):.{d}f}".replace(".", ",")
    return ("−" if x < 0 else "") + s


def euros(n):
    return f"{n:,}".replace(",", " ") + " €"


class _Paie:
    """⭐ L'OBJET DE LA SÉRIE : une barre = ce que le salarié COÛTE.

    En bas, en bleu, ce qu'il touche ; au-dessus, en orange, les prélèvements.
    Tout le short 1 consiste à changer de TOTAL devant la même barre : l'accolade
    embrasse la barre entière (47 %), puis seulement le bleu (89 %). L'orange ne
    bouge pas d'un pixel — c'est la démonstration.
    """

    H_BARRE = 4.0          # hauteur de la barre « coût », en unités Manim
    # ⛔ À −1,15 le mot de l'accolade (tourné, à gauche) sortait du cadre 9:16.
    X_BARRE = -0.92
    BAS = -1.75

    def bulletin(self, cout=COUT, net_euros=NET):
        e = self.H_BARRE / cout
        net = Rectangle(width=1.0, height=net_euros * e, stroke_width=1.5, stroke_color=BLACK,
                        fill_color=BLEU_CALCUL, fill_opacity=0.9)
        net.move_to([self.X_BARRE, self.BAS + net.height / 2, 0])
        prel = Rectangle(width=1.0, height=(cout - net_euros) * e, stroke_width=1.5,
                         stroke_color=BLACK,
                         fill_color=ORANGE_RETENUE, fill_opacity=0.92)
        prel.next_to(net, UP, buff=0)
        return net, prel

    def etiquette(self, rect, texte, valeur, couleur):
        bloc = VGroup(
            Text(texte, font_size=20, color=WHITE),
            Text(valeur, font_size=26, color=couleur),
        ).arrange(DOWN, buff=0.06, aligned_edge=LEFT)
        return bloc.next_to(rect, RIGHT, buff=0.28)

    def total(self, cible, texte):
        """L'accolade du TOTAL, à gauche : c'est elle qui change entre 47 et 89."""
        acc = Brace(cible, LEFT, buff=0.08, color=JAUNE_TITRE)
        mot = Text(texte, font_size=17, color=JAUNE_TITRE).rotate(PI / 2)
        mot.next_to(acc, LEFT, buff=0.06)
        return VGroup(acc, mot)

    # Une seule échelle pour toutes les barres horizontales de pourcentages.
    # ⛔ 2,9 faisait déborder les rangées de pays des DEUX côtés (brouillon du
    # 20/09) : nom + barre + valeur doivent tenir dans 4,5 unités.
    LARG_100 = 2.15

    def barre_pct(self, pct, couleur, hauteur=0.34):
        return Rectangle(width=self.LARG_100 * pct / 100.0, height=hauteur, stroke_width=0,
                         fill_color=couleur, fill_opacity=0.9)

    def rang(self, nom, corps, valeur, coul_val=WHITE, f_nom=19, f_val=21):
        return VGroup(
            Text(nom, font_size=f_nom, color=WHITE),
            corps,
            Text(valeur, font_size=f_val, color=coul_val),
        ).arrange(RIGHT, buff=0.12)

    def aligner(self, rangs):
        """⛔ Les barres doivent PARTIR DU MÊME X (leçon du short essence)."""
        larg = max(r[0].width for r in rangs)
        for r in rangs:
            r[1].shift(RIGHT * (larg - r[0].width))
            r[2].shift(RIGHT * (larg - r[0].width))
        return rangs

    def _duo_annees(self, avant, apres, y, nom=None, f=21):
        """2005 en gris, 2025 en orange, à la même échelle depuis zéro : l'écart
        est petit, et il doit le RESTER à l'image."""
        duo = VGroup(
            self.rang("2005", self.barre_pct(avant, GREY_B), f"{fr(avant)} %", f_nom=f, f_val=f + 1),
            self.rang("2025", self.barre_pct(apres, ORANGE_RETENUE), f"{fr(apres)} %",
                      coul_val=JAUNE_TITRE, f_nom=f, f_val=f + 1),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.aligner(duo)
        if nom:
            duo = VGroup(Text(nom, font_size=f, color=WHITE), duo).arrange(
                DOWN, buff=0.1, aligned_edge=LEFT)
        return duo.move_to([0, y, 0])


# ══════════════════════════════════════════════════════════════════════════════
#  SHORT 1 — « SARAH KNAFO A-T-ELLE RAISON ? » — celui de la Une
#  On vérifie son chiffre, on change de total, on compare, on regarde vingt ans.
# ══════════════════════════════════════════════════════════════════════════════

class PaieShortDeuxPourcents(ShortBases, _Paie):
    """⭐ Le même bulletin, deux pourcentages justes : tout dépend du total."""

    dossier_voix = VOIX_DEUX

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        # ⭐ L'IMAGE À 1 SECONDE : le nom et la question sont POSÉS, pas animés —
        # c'est elle qui décide du short, et c'est le nom que les gens cherchent.
        t = VGroup(
            self.grand("Sarah Knafo", font_size=46, color=WHITE),
            self.grand("a-t-elle raison ?", font_size=42, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.18).move_to([0, 2.3, 0])
        # ⭐ LA QUESTION DE FOND (Frédéric : « elle est essentielle ») ouvre le
        # short en bandeau et le referme en plein écran (`ecran_confiance`).
        bandeau = self.grand("peut-on faire confiance aux politiques ?", font_size=21,
                             color=GREY_B).move_to([0, 3.35, 0])
        self.add(t, bandeau)
        oui = self.grand("OUI", font_size=76, color=VERT_OK).move_to([0, 0.35, 0])
        non = self.grand("… ET NON", font_size=60, color=ROUGE_ERREUR).move_to([0, -0.85, 0])
        self.wait(0.5)
        self.play(GrowFromCenter(oui), run_time=0.35)
        self.play(GrowFromCenter(non), run_time=0.35)
        preuve = self.grand("preuve en 1 minute", font_size=24, color=GREY_B)
        self.play(FadeIn(preuve.move_to([0, -2.0, 0])), run_time=0.3)
        self.attendre_voix(marge=0.3)

    def _poser_bulletin(self):
        """Le bulletin DU LIVRE, posé d'un coup : les deux écrans qui suivent ne
        changent que l'accolade du total."""
        titre = self.grand(f"son livre : {euros(LIVRE_COUT)} → {euros(LIVRE_NET)}",
                           font_size=24, color=JAUNE_TITRE)
        titre.move_to([0, 3.15, 0])
        net, prel = self.bulletin(LIVRE_COUT, LIVRE_NET)
        # ⛔ « cotisations + impôt » sortait du cadre à droite (mesuré au brouillon
        # du 20/09) : le cadre 9:16 ne fait que 4,5 unités de large.
        e_prel = self.etiquette(prel, "prélevé", euros(LIVRE_PRELEV), ORANGE_RETENUE)
        self.add(titre, net, prel, e_prel)
        return net, prel

    def _ecran_division(self, voix, cible_total, mot_total, diviseur, resultat, couleur, legende):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        net, prel = self._poser_bulletin()
        cible = VGroup(net, prel) if cible_total == "cout" else net
        acc = self.total(cible, mot_total)
        self.play(FadeIn(acc, shift=RIGHT * 0.1), run_time=0.45)
        calcul = VGroup(
            Text(f"{euros(LIVRE_PRELEV)}", font_size=24, color=ORANGE_RETENUE),
            Text(f"÷ {euros(diviseur)}", font_size=24, color=JAUNE_TITRE),
            Text(f"= {resultat} %", font_size=44, color=couleur),
            Text(legende, font_size=19, color=WHITE),
        ).arrange(DOWN, buff=0.14, aligned_edge=LEFT)
        calcul.next_to(net, RIGHT, buff=0.28).align_to(net, DOWN)
        for m in calcul[:2]:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.35)
        self.play(GrowFromCenter(calcul[2]), run_time=0.45)
        self.play(FadeIn(calcul[3]), Flash(calcul[2], color=couleur, line_length=0.35))
        return calcul

    def ecran_cout(self):
        """LA VÉRIFICATION : son chiffre, recalculé, puis recoupé par l'OCDE."""
        self._ecran_division("01-verif", "cout", "le total : ce qu'il coûte", LIVRE_COUT,
                             fr(100 * LIVRE_PRELEV / LIVRE_COUT, 0), ORANGE_RETENUE,
                             "de ce qu'il coûte")
        ocde = VGroup(
            self.grand("l'OCDE mesure 47,2 %", font_size=23, color=WHITE),
            self.grand("SON CHIFFRE EST JUSTE", font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.12).move_to([0, -2.35, 0])
        self.play(FadeIn(ocde[0], shift=UP * 0.1), run_time=0.4)
        self.play(GrowFromCenter(ocde[1]), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_net(self):
        self._ecran_division("02-net", "net", "le total : son net", LIVRE_NET,
                             fr(100 * LIVRE_PRELEV / LIVRE_NET, 0), BLEU_CALCUL,
                             "de ce qu'il touche")
        chute = VGroup(
            self.grand("les mêmes euros, un autre total", font_size=22, color=WHITE),
            self.grand("pour cent DE QUOI ?", font_size=30, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.12).move_to([0, -2.35, 0])
        self.play(FadeIn(chute, shift=UP * 0.1), run_time=0.4)
        self.play(Flash(chute[1], color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_vingt_ans(self):
        """Ce que le chiffre seul ne dit pas : la pente. Elle descend."""
        self.clear()
        self.margo_bas()
        self.dire("04-vingt-ans")
        titre = VGroup(
            self.grand("et depuis 20 ans ?", font_size=32, color=JAUNE_TITRE),
            self.grand("France, salaire moyen", font_size=20, color=GREY_B),
        ).arrange(DOWN, buff=0.1).move_to([0, 3.1, 0])
        self.play(Write(titre[0]), FadeIn(titre[1]))
        duo = self._duo_annees(50.5, 47.2, 1.5, f=25)
        for r in duo:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.55)
        baisse = VGroup(
            self.grand("ÇA BAISSE", font_size=46, color=VERT_OK),
            self.grand("−3,3 points", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.14).move_to([0, -0.45, 0])
        self.play(GrowFromCenter(baisse[0]), run_time=0.45)
        self.play(FadeIn(baisse[1], shift=UP * 0.1), run_time=0.35)
        source = Text("source : OCDE, célibataire sans enfant", font_size=15, color=GREY_B)
        self.play(FadeIn(source.move_to([0, -1.75, 0])), run_time=0.3)
        self.attendre_voix(marge=0.4)

    def ecran_pays(self):
        """Frédéric : « il faut comparer avec les autres pays ». Même mesure,
        même source, une seule échelle : la part dans le COÛT (le total est dit)."""
        self.clear()
        self.margo_bas()
        self.dire("03-pays")
        titre = VGroup(
            self.grand("et ailleurs ?", font_size=32, color=JAUNE_TITRE),
            self.grand("part prélevée sur le coût", font_size=20, color=GREY_B),
        ).arrange(DOWN, buff=0.1).move_to([0, 3.1, 0])
        self.play(Write(titre[0]), FadeIn(titre[1]))
        rangs = VGroup(*[
            self.rang(nom,
                      self.barre_pct(p, ORANGE_RETENUE if nom == "France" else BLEU_CALCUL),
                      f"{fr(p)} %",
                      coul_val=JAUNE_TITRE if nom == "France" else WHITE)
            for nom, p in PAYS
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.36)
        self.aligner(rangs).move_to([0, 0.95, 0])
        for r in rangs:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.55)
        rang_fr = self.grand("France : 3e sur 38 pays", font_size=27, color=JAUNE_TITRE)
        self.play(FadeIn(rang_fr.move_to([0, -1.35, 0]), shift=UP * 0.1))
        self.play(Circumscribe(rangs[2], color=JAUNE_TITRE, buff=0.08))
        # ⛔ La version longue (« célibataire au salaire moyen ») touchait les deux bords.
        source = Text("source : OCDE 2025, salaire moyen", font_size=15, color=GREY_B)
        self.play(FadeIn(source.move_to([0, -1.95, 0])), run_time=0.3)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        """⭐ LE VERDICT, EN CLAIR (Frédéric : « il faut être clair »). Trois
        lignes, chacune tranchée. ⛔ La troisième ne dit ni « trop » ni « pas
        assez » : elle dit que le mot n'est pas un calcul, et ce que ça finance."""
        self.clear()
        self.margo_bas()
        self.dire("05-retenir")
        titre = self.grand("le verdict", font_size=36, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.1, 0])), run_time=0.4)
        lignes = VGroup(
            VGroup(self.grand("son chiffre, 47 %", font_size=27, color=WHITE),
                   self.grand("VRAI", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08),
            VGroup(self.grand("depuis 20 ans", font_size=27, color=WHITE),
                   self.grand("ÇA BAISSE", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08),
            VGroup(self.grand("le mot « casse »", font_size=27, color=WHITE),
                   self.grand("PAS UN CALCUL", font_size=36, color=ORANGE_RETENUE),
                   self.grand("retraite · santé · chômage", font_size=21, color=BLEU_CALCUL),
                   ).arrange(DOWN, buff=0.08),
        ).arrange(DOWN, buff=0.34).move_to([0, 0.75, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=UP * 0.12), run_time=0.5)
        fin = self.grand("trop ? pas assez ? ton choix d'électeur", font_size=21, color=GREY_B)
        self.play(FadeIn(fin.move_to([0, -2.2, 0])), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_confiance(self):
        """Frédéric, 20/09 : « il faut rajouter quelque part : peut-on faire
        confiance aux hommes et femmes politiques ? ». La réponse de la vidéo ne
        vise aucun camp, et c'est pour ça qu'elle tient : on ne fait pas confiance
        sur parole, on VÉRIFIE — c'est ce que le short vient de faire."""
        self.clear()
        self.margo_bas()
        self.dire("06-confiance")
        q = VGroup(
            self.grand("peut-on faire confiance", font_size=30, color=WHITE),
            self.grand("aux hommes et femmes", font_size=30, color=WHITE),
            self.grand("politiques ?", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.18).move_to([0, 1.9, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.5)
        r = VGroup(
            self.grand("fais mieux :", font_size=30, color=GREY_B),
            self.grand("VÉRIFIE", font_size=72, color=VERT_OK),
        ).arrange(DOWN, buff=0.18).move_to([0, -0.6, 0])
        self.play(FadeIn(r[0]), run_time=0.3)
        self.play(GrowFromCenter(r[1]), run_time=0.4)
        self.play(Flash(r[1], color=VERT_OK, line_length=0.45))
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_cout()
        self.ecran_net()
        self.ecran_pays()
        self.ecran_vingt_ans()
        self.ecran_retenir()
        self.ecran_confiance()
        self.ecran_renvoi("07-fin")


# ══════════════════════════════════════════════════════════════════════════════
#  SHORT 2 — « EN VINGT ANS, ÇA A BAISSÉ » — points, pour cent, et pour qui
# ══════════════════════════════════════════════════════════════════════════════

class PaieShortVingtAns(ShortBases, _Paie):
    """⭐ Un niveau haut ET une pente qui descend : les deux sont vrais."""

    dossier_voix = VOIX_VINGT

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("en 20 ans", font_size=34, color=WHITE),
            self.grand("la part prélevée", font_size=28, color=WHITE),
            self.grand("sur un salaire moyen", font_size=28, color=WHITE),
            self.grand("A BAISSÉ", font_size=54, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, 1.5, 0])
        for m in t[:3]:
            self.play(FadeIn(m), run_time=0.3)
        self.play(GrowFromCenter(t[3]), run_time=0.45)
        self.play(Flash(t[3], color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_serie(self):
        self.clear()
        self.margo_bas()
        self.dire("01-serie")
        titre = VGroup(
            self.grand("France, salaire moyen", font_size=28, color=JAUNE_TITRE),
            self.grand("part prélevée sur le coût", font_size=20, color=GREY_B),
        ).arrange(DOWN, buff=0.1).move_to([0, 3.1, 0])
        self.play(Write(titre[0]), FadeIn(titre[1]))
        duo = self._duo_annees(50.5, 47.2, 1.4, f=25)
        for r in duo:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.6)
        source = Text("source : OCDE, célibataire sans enfant", font_size=15, color=GREY_B)
        self.play(FadeIn(source.move_to([0, 0.35, 0])), run_time=0.3)
        self.attendre_voix(marge=0.4)

    def ecran_points(self):
        """Le piège du chapitre, sur un vrai chiffre : −3,3 POINTS, pas −3,3 %."""
        self.clear()
        self.margo_bas()
        self.dire("02-points")
        calc = self.grand("47,2 − 50,5", font_size=34, color=WHITE).move_to([0, 3.0, 0])
        self.play(Write(calc), run_time=0.5)
        juste = VGroup(
            self.grand("−3,3 POINTS", font_size=46, color=VERT_OK),
        ).move_to([0, 1.9, 0])
        self.play(GrowFromCenter(juste), run_time=0.45)
        faux = self.grand("−3,3 %", font_size=40, color=ROUGE_ERREUR).move_to([0, 0.7, 0])
        self.play(FadeIn(faux), run_time=0.35)
        self.play(Create(Cross(faux, stroke_color=ROUGE_ERREUR, stroke_width=6)), run_time=0.4)
        rel = VGroup(
            self.grand("en relatif :", font_size=22, color=GREY_B),
            self.grand("−3,3 ÷ 50,5 = −6,5 %", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.12).move_to([0, -0.75, 0])
        self.play(FadeIn(rel, shift=UP * 0.1), run_time=0.45)
        regle = self.grand("entre deux %, on compte en points", font_size=21, color=JAUNE_TITRE)
        self.play(FadeIn(regle.move_to([0, -2.1, 0])), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_qui(self):
        self.clear()
        self.margo_bas()
        self.dire("03-qui")
        titre = self.grand("mais pour QUI ?", font_size=34, color=JAUNE_TITRE)
        self.play(Write(titre.move_to([0, 3.15, 0])))
        ys = [1.95, 0.35, -1.25]
        for (nom, a, b), y in zip(SERIE, ys):
            ecart = b - a
            libelle = f"{nom} : {'+' if ecart > 0 else ''}{fr(ecart)} pt"
            bloc = self._duo_annees(a, b, y, nom=libelle, f=18)
            bloc[0].set_color(VERT_OK if ecart < 0 else ROUGE_ERREUR)
            self.play(FadeIn(bloc, shift=RIGHT * 0.15), run_time=0.6)
        chute = self.grand("un pays, trois histoires", font_size=25, color=WHITE)
        self.play(FadeIn(chute.move_to([0, -2.35, 0])), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_euros(self):
        """Coût +42,9 %, net +52,5 %, prix +37,7 % : trois barres, une échelle."""
        self.clear()
        self.margo_bas()
        self.dire("04-euros")
        titre = VGroup(
            self.grand("en euros, en 20 ans", font_size=30, color=JAUNE_TITRE),
            self.grand("salaire moyen, par mois", font_size=20, color=GREY_B),
        ).arrange(DOWN, buff=0.1).move_to([0, 3.1, 0])
        self.play(Write(titre[0]), FadeIn(titre[1]))
        lignes = VGroup(*[
            self.rang(nom, self.barre_pct(p, coul), f"+{fr(p, 0)} %", coul_val=coul, f_nom=21, f_val=24)
            for nom, p, coul in (("le coût", 42.9, ORANGE_RETENUE),
                                 ("le net", 52.5, BLEU_CALCUL),
                                 ("les prix", 37.7, GREY_B))
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        self.aligner(lignes).move_to([0, 1.3, 0])
        for r in lignes:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.6)
        detail = VGroup(
            Text(f"coût : {euros(3655)} → {euros(COUT)}", font_size=17, color=GREY_B),
            Text(f"net : {euros(1809)} → {euros(NET)}", font_size=17, color=GREY_B),
            Text("sources : OCDE, INSEE", font_size=15, color=GREY_B),
        ).arrange(DOWN, buff=0.08).move_to([0, -0.55, 0])
        self.play(FadeIn(detail), run_time=0.35)
        chute = VGroup(
            self.grand("le net a couru", font_size=26, color=WHITE),
            self.grand("plus vite que les prix", font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.12).move_to([0, -1.9, 0])
        self.play(FadeIn(chute, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_mais(self):
        """⛔ LE CONTREPOINT OBLIGATOIRE : la pente descend, le niveau reste haut."""
        self.clear()
        self.margo_bas()
        self.dire("05-mais")
        titre = self.grand("mais", font_size=44, color=ROUGE_ERREUR)
        self.play(GrowFromCenter(titre.move_to([0, 3.1, 0])))
        rangs = VGroup(*[
            self.rang(nom, self.barre_pct(p, ORANGE_RETENUE if nom == "France" else BLEU_CALCUL),
                      f"{fr(p)} %", coul_val=JAUNE_TITRE if nom == "France" else WHITE)
            for nom, p in PAYS
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.aligner(rangs).move_to([0, 1.2, 0])
        self.play(FadeIn(rangs, shift=RIGHT * 0.15), run_time=0.7)
        self.play(Circumscribe(rangs[2], color=JAUNE_TITRE, buff=0.08))
        bloc = VGroup(
            self.grand("3e sur 38 pays", font_size=34, color=JAUNE_TITRE),
            self.grand("près de la moitié", font_size=25, color=WHITE),
            self.grand("de ce que tu coûtes", font_size=25, color=WHITE),
        ).arrange(DOWN, buff=0.14).move_to([0, -1.55, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("06-retenir")
        bloc = VGroup(
            self.grand("un niveau HAUT", font_size=32, color=ORANGE_RETENUE),
            self.grand("une pente qui DESCEND", font_size=30, color=VERT_OK),
            self.grand("les deux sont vrais", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.7, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        fin = VGroup(
            self.grand("méfie-toi de qui", font_size=26, color=GREY_B),
            self.grand("n'en montre qu'un", font_size=32, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.14).move_to([0, -1.1, 0])
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.5)
        self.play(Flash(fin[1], color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_serie()
        self.ecran_points()
        self.ecran_qui()
        self.ecran_euros()
        self.ecran_mais()
        self.ecran_retenir()
        self.ecran_renvoi("07-fin")
