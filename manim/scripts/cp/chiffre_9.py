# Écriture du chiffre « 5 » — CP
#
# ⭐ LE DERNIER DES DIX, ET LE PLUS SIMPLE — SI ON LE PREND DANS LE BON SENS.
# Le « 6 » est une grande vague qui descend en tournant, puis une boucle qui
# remonte et vient se refermer sur elle-même. D'un seul trait, sans lever.
# ⚠️ CE QUI SE JOUE DANS LA HAUTEUR DE LA BOUCLE : trop basse et écrasée, le
# ventre déborde et le chiffre se lit « 0 mal fermé ». La forme retenue (B, sur
# trois proposées) monte la boucle jusqu'à 0,76 — le ventre reste franchement
# sous la médiane, et la vague garde son élan.
# ⚠️ Et c'est la première vidéo à porter les deux écrans du 06/09 : l'annonce
# « Maintenant, plus vite ! » et l'appel à la fiche à télécharger. Le tracer d'un seul trait obligerait le crayon à REVENIR EN ARRIÈRE sur
# son propre chemin — c'est exactement l'erreur du point du « i », et elle
# s'entend dans la main d'un enfant : un geste qui rebrousse chemin n'est pas un
# geste d'écriture.
# ⚠️ La voix le DIT en clair (« et maintenant, ATTENTION : on lève le crayon »).
# Un lever qu'on montre sans le nommer passe pour un défaut d'animation.
#
# ⭐ Le saut du crayon est visible : le stylo se soulève, traverse, et se repose.
# C'est le seul moment de la série où l'on voit la main quitter la feuille et y
# revenir — le geste que le « 5 », le « 7 » barré et les majuscules demanderont.
#
# ⛔ TOUJOURS --disable_caching. ⛔ ON NE REND QUE LES SHORTS.
#
# portrait droitier : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_4.py Chiffre9CpPortrait \
#                       -o eleveai-maths-cp-chiffre-5-droitier-portrait --media_dir manim/scripts/cp/media
# portrait gaucher  : python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/cp/chiffre_4.py Chiffre9CpPortraitGaucher \
#                       -o eleveai-maths-cp-chiffre-5-gaucher-portrait --media_dir manim/scripts/cp/media

import sys
import wave
from pathlib import Path

import numpy as np
from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
sys.path.insert(0, str(Path(__file__).resolve().parent))  # dossier cp/
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

from chiffre_commune import OBJETS, groupe, referent_corporel  # noqa: E402
from lettre_commune import (  # noqa: E402
    EPS,
    INTERLIGNE,
    LARGEUR_REGLURE,
    Portrait,
    angle_main,
    page_de_fin,
    page_de_garde,
    poser_stylo,
    ecran_plus_vite,
    verifier_ecran_vide,
    stylo_neuf,
    verifier,
)

CHIFFRE = "9"
MOT = "neuf"

# ─── Le chemin du « 9 », d'un seul trait ──────────────────────────────────────
# ⭐⭐ LE « 9 » N'EST PAS UN « 6 » RETOURNÉ, ET C'EST TOUT LE POINT.
# À l'imprimerie, si : la forme est la même à 180°. À la main, non — un geste
# ne se retourne pas. Le « 6 » COMMENCE par la grande vague et FINIT par la
# boucle ; le « 9 » commence par la boucle, en haut, et finit par la jambe.
# ⛔ Enseigner « c'est un 6 à l'envers » ferait tracer le rond dans le mauvais
# sens et descendre la jambe depuis le mauvais point — l'enfant obtiendrait la
# bonne image par un geste faux, et le geste faux est ce qui restera.
# ⭐ La formule de la voix dit donc autre chose : « le neuf, c'est un rond avec
# une jambe ». Rond d'abord, jambe ensuite, sans lever.
# ⚠️ La jambe descend DROIT et s'arrête sur la ligne de base — elle ne plonge
# pas dessous. Un « 9 » à jambage serait un « g ».
DEPART = np.array([0.30, 1.86, 0])
COURBES = [
    ((0.06, 2.04), (-0.34, 1.94), (-0.36, 1.58)),   # le rond, vers la gauche
    ((-0.38, 1.24), (-0.02, 1.06), (0.20, 1.22)),   # le bas du rond, qui remonte
    ((0.30, 1.30), (0.32, 1.42), (0.32, 1.58)),     # …et qui se ferme sur lui-même
    ((0.32, 1.10), (0.30, 0.50), (0.24, 0.00)),     # la jambe, droit jusqu'en bas
]


def chemin_9(stroke_width: float = 10, color: str = WHITE) -> VGroup:
    """Un seul tracé, dans un VGroup d'un élément (voir `chiffre_5`)."""
    p = VMobject(stroke_width=stroke_width, stroke_color=color)
    p.set_fill(opacity=0)
    p.start_new_path(DEPART)
    for c1, c2, fin in COURBES:
        p.add_cubic_bezier_curve_to(
            np.array([*c1, 0]), np.array([*c2, 0]), np.array([*fin, 0])
        )
    return VGroup(p)


def reglure_chiffres() -> VGroup:
    """Deux interlignes — la bande où s'écrit un chiffre."""
    g = VGroup()
    for k in range(3):
        y = k * INTERLIGNE
        forte = k == 0
        g.add(
            Line(
                np.array([-LARGEUR_REGLURE / 2, y, 0]),
                np.array([LARGEUR_REGLURE / 2, y, 0]),
                stroke_width=3 if forte else 1.5,
                stroke_color=GREY_B if forte else GREY_D,
            )
        )
    return g


VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-chiffre-9"
DUREE = {
    "00-aujourdhui": 4.23, "01-ecoute": 2.54, "02-regarde": 4.02, "03-depart": 17.21,
    "04-encore": 2.93, "05-combien": 3.07, "06-a": 1.87, "07-b": 2.04,
    "08-c": 1.89, "09-d": 1.68, "10-e": 2.01, "10-pareil": 4.80,
    "11-relance": 3.55, "12-va-sur": 3.16, "14-bientot": 1.71,
}
CLIPS = ["06-a", "07-b", "08-c", "09-d", "10-e"]


class _Chiffre9Base(Scene):
    vertical = False
    gaucher = False

    def dire(self, nom: str) -> float:
        """⛔⛔ RENDRE SANS CACHE, sinon les sons sautent sans un mot."""
        chemin = VOIX / f"{nom}.wav"
        self.add_sound(str(chemin))
        # ⭐⭐ LA DURÉE SE LIT DANS LE FICHIER, elle ne se recopie plus à la main
        # dans `DUREE`. Une table écrite à la main se désynchronise dès qu'on
        # régénère une voix — et le symptôme n'est pas une erreur, c'est une
        # phrase coupée en fin de vidéo, que personne ne revérifie.
        # ⚠️ `DUREE` reste dans le fichier : c'est la trace de ce qui a été dit,
        # utile pour relire le script sans ouvrir les WAV. Mais elle ne commande
        # plus rien.
        with wave.open(str(chemin), "rb") as w:
            return w.getnframes() / float(w.getframerate())

    def construct(self):
        son = Text(CHIFFRE, font_size=150, color=JAUNE_TITRE)
        titre = Text("le chiffre", font_size=44, color=BLEU_CALCUL).next_to(son, UP, buff=0.5)
        margo = MascotteMargouillat().scale(0.85 if not self.vertical else 0.7)
        if self.vertical:
            margo.next_to(son, DOWN, buff=0.9)
        else:
            margo.to_edge(RIGHT, buff=1.1)

        garde, garde_main = page_de_garde(
            # ⚠️ LES DEUX TRAITS, pas `[0]` : la garde affichait un « 4 »
            # amputé de sa barre verticale.
            self, CHIFFRE, chemin_9(stroke_width=12), MascotteMargouillat(),
            hauteur_cursive=1.9, notion="Les chiffres",
        )
        self.play(
            FadeOut(garde), FadeOut(garde_main),
            FadeIn(titre), FadeIn(son), FadeIn(margo),
            run_time=0.25,
        )
        d0 = self.dire("00-aujourdhui")
        self.wait(d0)
        d = self.dire("01-ecoute")
        self.play(Indicate(son, scale_factor=1.25, color=JAUNE_TITRE))
        self.wait(max(0.2, d - 1.0))
        self.play(
            FadeOut(titre),
            FadeOut(margo, shift=RIGHT * 0.4),
            son.animate.scale(0.40).to_corner(UL, buff=0.55),
        )
        self.wait(0.4)

        # ── LE GESTE, EN DEUX TEMPS ─────────────────────────────────────────
        lignes = reglure_chiffres()
        traits = chemin_9(stroke_width=14 if not self.vertical else 16)
        VGroup(lignes, traits).move_to(ORIGIN).shift(DOWN * 0.3)

        modele = chemin_9(stroke_width=14 if not self.vertical else 16, color=GREY_D)
        for m, t in zip(modele, traits):
            m.match_points(t)
        imprime = Text(
            CHIFFRE, font_size=130 if not self.vertical else 110, color=JAUNE_TITRE
        ).move_to(modele)

        d = self.dire("02-regarde")
        self.play(Create(lignes), run_time=0.8)
        self.play(FadeIn(imprime, scale=0.85), run_time=0.3)
        self.play(Transform(imprime, modele), run_time=0.8)
        point = Dot(traits[0].get_start(), radius=0.14, color=VERT_OK)
        self.play(FadeIn(point, scale=2), run_time=0.5)
        self.wait(max(0.3, d - 2.4))

        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        a_main = angle_main(self.gaucher)
        self.remove(traits)

        d = self.dire("03-depart")
        # ⭐ On répartit le temps de la phrase : premier trait, le SAUT, second
        # trait. Le saut prend 1,4 s — assez pour qu'on le voie, pas assez pour
        # qu'on s'ennuie.
        # ⭐ UN SEUL TRAIT : tout le temps de la phrase lui revient. Plus de
        # budget de 1,4 s pour un saut qui n'existe plus.
        t1 = d - 0.4

        # ⛔⛔ LES TRACÉS SE COLLECTIONNENT, ILS NE S'EFFACENT PAS TOUT SEULS.
        # `trace` naît DANS la boucle : il y en a un par trait, et seul le
        # dernier survivrait dans une variable. Les autres restent à l'écran.
        # C'est exactement ce qui est arrivé (Frédéric, 05/09, capture à l'appui :
        # « enlève le 4, tu as oublié de l'effacer ») — le chiffre blanc traînait
        # derrière la liste des quantités, en plein sur « quatre bougies ».
        # ⚠️ ET C'EST UN BOGUE NÉ DU LEVER DE CRAYON. Les chiffres 0 à 3 n'ont
        # qu'un seul trait : leur `trace` est nommé hors boucle, donc effacé. Le
        # défaut n'apparait qu'à partir du premier chiffre en deux temps, là où
        # personne ne pensait à revérifier une ligne de nettoyage qui marchait.
        # ⛔ ET IL EST INVISIBLE PENDANT LA LEÇON : la reprise rapide (`refait`)
        # redessine la MÊME géométrie par-dessus. Les deux se superposent au
        # pixel près. Le tracé fantôme n'apparait qu'au moment où l'on efface
        # `refait` — un écran plus loin, quand on ne regarde plus le chiffre.
        traces = []
        for i, duree in ((0, t1),):
            chemin = traits[i]
            avance = ValueTracker(0.0)
            trace = VMobject(
                stroke_width=14 if not self.vertical else 16, stroke_color=WHITE
            )
            trace.set_fill(opacity=0)
            trace.add_updater(
                lambda m, c=chemin, a=avance: m.become(
                    c.copy().pointwise_become_partial(c, 0, max(a.get_value(), EPS))
                )
            )
            stylo.add_updater(
                lambda m, c=chemin, a=avance: poser_stylo(
                    m, modele_stylo, c, a.get_value(), a_main
                )
            )
            self.add(trace, stylo)
            traces.append(trace)
            self.play(avance.animate.set_value(1.0), run_time=duree, rate_func=linear)
            trace.clear_updaters()
            stylo.clear_updaters()

            # ⛔ LE SAUT NE SE JOUE QUE S'IL Y A UN TRAIT SUIVANT. Écrit
            # `if i == 0` tout court, il repartait sur le chemin d'un seul
            # trait — le crayon aurait sauté vers nulle part.
            if i == 0 and len(traits) > 1:
                # ⭐⭐ LE SAUT DU CRAYON, MONTRÉ. Il se soulève (il grossit un
                # peu, comme s'il s'éloignait de la feuille), traverse, et se
                # repose. ⛔ Le faire disparaitre puis réapparaitre se lirait
                # comme un défaut d'animation, pas comme un geste.
                depart_2 = traits[1].get_start()
                pointe = chemin.point_from_proportion(1 - EPS)
                self.play(
                    stylo.animate.shift(UP * 0.55).scale(1.12),
                    run_time=0.45,
                )
                self.play(
                    stylo.animate.shift(depart_2 - pointe + DOWN * 0.55).scale(1 / 1.12),
                    run_time=0.95,
                )

        self.play(FadeOut(stylo, scale=0.6))
        self.wait(0.6)

        # ── ON REFAIT, PLUS VITE ────────────────────────────────────────────
        # ⚠️ Les deux reprises redessinent LES DEUX TRAITS, dans l'ordre et avec
        # la coupure entre eux : une reprise d'un seul tenant effacerait la
        # leçon qu'on vient de donner.
        d_encore = self.dire("04-encore")
        annonce = ecran_plus_vite(self, duree=1.1)
        refait = None
        for duree in (2.0, 1.2):
            if refait is not None:
                # ⛔ `self.remove(refait)` NE MARCHE PAS ICI, et c'est le même
                # piège qu'au FadeOut : `Create(refait[0])` a ajouté LE TRAIT,
                # pas le groupe, et `Scene.remove` ne descend pas dans les
                # sous-objets. La première reprise restait donc à l'écran pour
                # toujours — invisible, recouverte par la seconde.
                self.remove(*refait)
            refait = chemin_9(stroke_width=14 if not self.vertical else 16)
            for r, t in zip(refait, traits):
                r.match_points(t)
            for r in refait:
                self.play(Create(r), run_time=duree / len(refait), rate_func=linear)
            self.wait(0.35)

        self.play(
            FadeOut(annonce),
            FadeOut(point), FadeOut(lignes), FadeOut(imprime), FadeOut(*refait),
            *[FadeOut(t) for t in traces],
        )
        verifier_ecran_vide(self, "la fin du tracé", garder=(son,))

        # ── QUATRE, ÇA VEUT DIRE COMBIEN ? ──────────────────────────────────
        d = self.dire("05-combien")
        if self.vertical:
            question = VGroup(
                Text(f"{MOT},", font_size=34, color=BLEU_CALCUL),
                Text("c'est combien ?", font_size=34, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.18)
        else:
            question = Text(f"{MOT}, c'est combien ?", font_size=52, color=BLEU_CALCUL)
        for m in (question if self.vertical else [question]):
            verifier(m, "la question")
        question.to_edge(UP, buff=1.2 if self.vertical else 0.9)
        self.play(FadeIn(question, shift=DOWN * 0.3))
        self.wait(max(0.3, d - 1.0))

        # ⭐ Les cinq mêmes objets d'un chiffre à l'autre : c'est ce qui laisse
        # comparer quatre pommes à six pommes. Voir `chiffre_commune.py`.
        n = int(CHIFFRE)
        # ⛔ Mesuré : à 0,52 le bloc faisait 4,25 pour 3,90 utiles, et
        # `verifier()` a arrêté le rendu. Quatre objets par ligne prennent
        # plus de large que trois.
        echelle = 0.66 if not self.vertical else 0.38
        lignes_obj = VGroup()
        for mot, faire in OBJETS:
            t = Text(f"{MOT} {mot}", font_size=40 if not self.vertical else 24)
            t[0:len(MOT)].set_color(JAUNE_TITRE)
            lignes_obj.add(
                VGroup(t, groupe(n, faire).scale(echelle)).arrange(RIGHT, buff=0.40)
            )
        lignes_obj.arrange(DOWN, buff=0.30, aligned_edge=LEFT)
        bloc = lignes_obj.move_to(ORIGIN).shift(DOWN * 0.4)
        bloc.scale(0.95 if not self.vertical else 0.88)
        verifier(bloc, "bloc des cinq quantités")

        for ligne, clip in zip(lignes_obj, CLIPS):
            duree = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.35)
            self.play(ligne.animate.scale(1.16), run_time=0.30)
            self.wait(0.30)
            self.play(ligne.animate.scale(1 / 1.16), run_time=0.28)
            self.wait(max(0.15, duree - 1.23))
        dp = self.dire("10-pareil")
        self.wait(dp)

        # ── ⭐⭐ CINQ, C'EST LES DOIGTS DE TA MAIN ────────────────────────────
        # Frédéric, 05/09 : « le chiffre 5 doit être comme les 5 doigts de la
        # main ». C'est plus fort que cinq pommes : les pommes, il faut les
        # avoir sous les yeux ; la main, l'enfant l'a TOUJOURS AVEC LUI. C'est
        # le seul référent qu'il peut convoquer en pleine dictée.
        # ⚠️ EN CONCLUSION, PAS À LA PLACE DES OBJETS : les cinq objets restent
        # identiques d'un chiffre à l'autre, et c'est cette constance qui laisse
        # comparer cinq pommes à quatre pommes. La main ne vaut que pour SON
        # chiffre — dans la liste, elle casserait la comparaison.
        referent = referent_corporel(int(CHIFFRE))
        if referent is not None:
            dessin, lignes_legende = referent
            self.play(FadeOut(bloc), run_time=0.3)
            dessin.scale(1.15 if not self.vertical else 1.0)
            # ⚠️ En paysage la légende tient sur une ligne ; en portrait, non.
            # Le découpage arrive de `referent_corporel`, on le recolle si le
            # cadre est large.
            if self.vertical:
                texte = VGroup(*[
                    Text(l, font_size=26, color=VERT_OK) for l in lignes_legende
                ]).arrange(DOWN, buff=0.14)
                for m in texte:
                    verifier(m, "la légende du référent corporel")
            else:
                texte = Text(" ".join(lignes_legende), font_size=34, color=VERT_OK)
                verifier(texte, "la légende du référent corporel")
            groupe_ref = VGroup(dessin, texte).arrange(DOWN, buff=0.45)
            groupe_ref.move_to(ORIGIN).shift(DOWN * 0.4)
            verifier(groupe_ref, "le référent corporel")
            dm = self.dire("10-main")
            self.play(GrowFromCenter(dessin), run_time=0.45)
            self.play(FadeIn(texte, shift=UP * 0.25), run_time=0.35)
            self.play(dessin.animate.scale(1.10), run_time=0.30)
            self.play(dessin.animate.scale(1 / 1.10), run_time=0.28)
            self.wait(max(0.4, dm - 1.38 + 0.25))
            self.play(FadeOut(groupe_ref), run_time=0.3)
            bloc = groupe_ref

        # ── LA RELANCE ──────────────────────────────────────────────────────
        self.play(FadeOut(question), FadeOut(bloc))
        if self.vertical:
            relance = VGroup(
                Text("Cherche une chose", font_size=28, color=VERT_OK),
                Text("dont il y en a", font_size=28, color=VERT_OK),
                Text(CHIFFRE, font_size=90, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.22)
        else:
            relance = VGroup(
                Text("Cherche une chose dont il y en a", font_size=48, color=VERT_OK),
                Text(CHIFFRE, font_size=120, color=JAUNE_TITRE),
            ).arrange(DOWN, buff=0.35)
        for m in relance:
            verifier(m, "relance")
        d = self.dire("11-relance")
        self.play(FadeIn(relance, scale=0.85))
        self.play(relance.animate.scale(1.06), run_time=0.5)
        self.wait(max(0.8, d - 1.4))
        self.play(FadeOut(relance), FadeOut(son))

        page_de_fin(self, margo, "12-va-sur", clip_bientot="14-bientot")


class Chiffre9Cp(_Chiffre9Base):
    """16:9, droitier — conservée, mais on ne la rend plus."""


class Chiffre9CpGaucher(_Chiffre9Base):
    gaucher = True


class Chiffre9CpPortrait(Portrait, _Chiffre9Base):
    """9:16, droitier — LE format qui est vu."""


class Chiffre9CpPortraitGaucher(Portrait, _Chiffre9Base):
    gaucher = True
