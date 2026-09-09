# gabarit_seconde.py
# LE GABARIT DES VIDÉOS DE NOTION DU LYCÉE.
#
# ── POURQUOI CE MODULE EXISTE (09/09/2026) ────────────────────────────────────
# La première vidéo de seconde (`scripts/seconde/racine_carree_2de.py`) portait
# ses briques communes en commentaire « à remonter ici une fois validées ».
# Elles l'ont été par Frédéric le 09/09 : page de garde, annonce des OBJECTIFS,
# page finale cochée, écran d'abonnement, radical dessiné, phrase de bas d'écran.
# À la troisième notion il fallait choisir entre les recopier vingt-deux fois ou
# les sortir. Elles sont ici, et un script de notion ne contient plus que sa
# matière : ses écrans.
#
# ── ⛔ CE QUE CE GABARIT SAIT, ET QU'ON NE REDÉCOUVRE PAS ─────────────────────
# 1. AUCUN LaTeX. `MathTex` ne se rend PAS sur ce poste (ni MiKTeX ni TeX Live).
#    Les maths se composent en Text + dessin — d'où `radical()`. ⚠️ Le piège
#    caché : `include_numbers=True` sur un `NumberLine` ou des `Axes` passe AUSSI
#    par LaTeX. Il faut TOUJOURS `label_constructor=Text`, sinon le rendu meurt
#    sur un `FileNotFoundError` qui ne nomme ni LaTeX ni la ligne fautive.
# 2. LA VOIX FAIT LA DURÉE. Chaque écran appelle `dire()` en entrant et
#    `attendre_voix()` en sortant : l'image attend la phrase, jamais l'inverse.
#    ⛔⛔ RENDRE SANS CACHE (`--disable_caching`) ou les sons sautent en silence.
# 3. PAS D'EMOJI dans un `Text` : la police les rend en carrés. Tout pictogramme
#    se trace (voir `coche()`).
# 4. Le même gabarit sert le PAYSAGE et le SHORT 9:16 : `chute()` lit
#    `config.frame_width` au lieu d'une largeur écrite en dur.
#
# ── COMMENT S'EN SERVIR ───────────────────────────────────────────────────────
#   from gabarit_seconde import NotionSeconde, ShortSeconde
#
#   class MaNotion(NotionSeconde):
#       dossier_voix = VOIX          # public/sons/<nom du json>
#       def construct(self):
#           self.page_de_garde(titre=…, accroche=…, promesse=…)
#           self.page_objectifs([…])          # 3 au plus, en verbes d'action
#           …ses écrans à elle…
#           self.page_finale(points=[…], rappel=…)   # MÊME ordre que les objectifs
#           self.page_abonnement()

import wave
from pathlib import Path

from manim import *

from charte import *
from mascotte import MascotteMargouillat

SONS = Path(__file__).resolve().parents[1] / "public" / "sons"
# Les clips partagés par toutes les vidéos (l'appel à l'abonnement), déjà
# générés pour le CP : on les emprunte au lieu d'en refaire une copie par notion.
COMMUN = SONS / "cp-commun"


class NotionSeconde(Scene):
    """Une vidéo de notion, format paysage 16:9."""

    dossier_voix = None

    # ── la voix ─────────────────────────────────────────────────────────────

    def dire(self, nom, dossier=None):
        """Lance le clip de l'écran et retient l'instant où il finit.

        ⭐ La durée se LIT dans le WAV : une table de durées écrite à la main se
        désynchronise dès qu'on régénère une voix, et le symptôme n'est pas une
        erreur mais une phrase coupée que personne ne revérifie.
        """
        dossier = dossier or self.dossier_voix
        chemin = (dossier / f"{nom}.wav") if dossier else None
        if chemin is None or not chemin.exists():
            self._fin_voix = None
            return 0.0
        self.add_sound(str(chemin))
        with wave.open(str(chemin), "rb") as w:
            duree = w.getnframes() / float(w.getframerate())
        self._fin_voix = self.renderer.time + duree
        return duree

    def attendre_voix(self, marge=0.7):
        """Tient l'écran jusqu'à la fin de la phrase, plus une respiration."""
        fin = getattr(self, "_fin_voix", None)
        if fin is None:
            self.wait(marge)
            return
        self.wait(max(marge, fin - self.renderer.time + marge))

    # ── les objets récurrents ───────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def chute(self, texte, color=BLEU_CALCUL, font_size=30):
        """La phrase du bas — celle qui conclut l'écran.

        ⛔ Elle ne doit pas passer derrière Ti-Margo. En paysage il occupe le
        coin bas-droit ; en vertical il est au centre-bas, et la phrase se pose
        alors PLUS HAUT que lui.
        """
        t = Text(texte, font_size=font_size, color=color)
        vertical = config.frame_width < 8
        largeur_max = config.frame_width - (0.5 if vertical else 3.8)
        if t.width > largeur_max:
            t.scale_to_fit_width(largeur_max)
        return t.to_edge(DOWN, buff=1.45 if vertical else 0.7).shift(
            LEFT * (0.0 if vertical else 0.6))

    def radical(self, radicande, coefficient="", font_size=44, color=WHITE):
        """Un radical DESSINÉ : coefficient, signe √, radicande, et sa barre.

        ⛔ Sans LaTeX, « √50 » seul manque de son vinculum et l'élève ne voit pas
        où s'arrête le nombre sous le radical. On trace la barre.
        """
        morceaux = []
        if coefficient:
            morceaux.append(Text(coefficient, font_size=font_size, color=color))
        signe = Text("√", font_size=font_size * 1.15, color=color)
        nombre = Text(str(radicande), font_size=font_size, color=color)
        morceaux += [signe, nombre]

        groupe = VGroup(*morceaux).arrange(RIGHT, buff=0.06, aligned_edge=DOWN)
        barre = Line(
            nombre.get_corner(UL) + LEFT * 0.02 + UP * 0.06,
            nombre.get_corner(UR) + RIGHT * 0.04 + UP * 0.06,
            stroke_width=2.5, color=color,
        )
        return VGroup(groupe, barre)

    def puissance(self, base, exposant, font_size=44, color=WHITE, color_exp=None):
        """Une puissance COMPOSÉE : la base, et l'exposant plus petit, en haut.

        ⛔ Pas d'exposants Unicode (⁴, ⁻⁵) : ils n'existent pas pour tous les
        caractères et la police les rend de tailles inégales. On pose deux
        `Text` et on décale le second — c'est le pendant de `radical()`.
        ⭐ `color_exp` permet de mettre l'exposant en évidence quand c'est LUI
        que la règle transforme (l'addition des exposants, par exemple).
        """
        b = Text(str(base), font_size=font_size, color=color)
        e = Text(str(exposant).replace("-", "−"),
                 font_size=font_size * 0.62, color=color_exp or color)
        e.next_to(b, UR, buff=0.02).shift(DOWN * font_size * 0.004)
        return VGroup(b, e)

    def coche(self, couleur=VERT_OK, taille=0.22):
        """Une coche DESSINÉE (deux segments), jamais un emoji."""
        c = VMobject(stroke_color=couleur, stroke_width=5)
        c.set_points_as_corners([
            [-taille, 0.0, 0],
            [-taille * 0.25, -taille * 0.75, 0],
            [taille, taille * 0.8, 0],
        ])
        return c

    def axes_notion(self, x_range, y_range, x_length=7.5, y_length=4.0, font_size=22):
        """Des axes prêts à l'emploi.

        ⛔ `label_constructor=Text` EST OBLIGATOIRE : par défaut Manim écrit les
        graduations en `DecimalNumber`, qui passe par LaTeX — absent du poste.
        """
        return Axes(
            x_range=x_range, y_range=y_range,
            x_length=x_length, y_length=y_length,
            axis_config={"include_numbers": True, "label_constructor": Text,
                         "font_size": font_size},
            tips=False,
        )

    # ── les quatre écrans de structure ──────────────────────────────────────

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        """Quatre lignes, toujours dans cet ordre : titre, identité, ACCROCHE
        (une question, jamais un résumé — c'est elle que YouTube prélève à une
        seconde), puis la promesse en trois mots.
        """
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.9)
        identite = Text("Maths seconde — EleveAI", font_size=30, color=WHITE)
        identite.next_to(t, DOWN, buff=0.35)
        acc = Text(accroche, font_size=34, color=BLEU_CALCUL)
        acc.next_to(identite, DOWN, buff=0.95)
        prom = Text(promesse, font_size=26, color=WHITE)
        prom.next_to(acc, DOWN, buff=0.55)

        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        self.play(GrowFromCenter(acc))
        self.play(Flash(acc, color=BLEU_CALCUL, line_length=0.3))
        self.play(FadeIn(prom, shift=UP * 0.2))
        self.attendre_voix()

    def page_objectifs(self, objectifs, voix="00b-objectifs"):
        """L'ANNONCE DES OBJECTIFS — l'enseignement explicite.

        ⭐ Frédéric, 09/09/2026 : « on doit savoir en début de vidéo ce que l'on
        va savoir faire ». La méthode veut qu'un cours s'ouvre sur son objectif
        et se ferme sur sa vérification : `page_finale()` reprend CES MÊMES
        phrases, cochées et dans le même ordre.
        ⭐ Les objectifs se lisent dans les MICRO-COMPÉTENCES de la notion : elles
        sont déjà écrites comme des savoir-faire, et l'élève retrouvera le même
        énoncé, mot pour mot, dans la liste du coach.
        ⚠️ TROIS AU PLUS, en verbes d'action — sept micros ne font pas sept
        lignes, on les regroupe, sinon plus personne ne retient l'annonce.
        """
        self.clear()
        self.add_mascotte()
        self.dire(voix)

        titre = Text("À la fin, tu sauras", font_size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.75)
        self.play(Write(titre))

        lignes = VGroup()
        for i, texte in enumerate(objectifs):
            num = Text(f"{i + 1}.", font_size=32, color=BLEU_CALCUL)
            corps = Text(texte, font_size=30, color=WHITE)
            lignes.add(VGroup(num, corps).arrange(RIGHT, buff=0.28, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.72).move_to([0, 0.15, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.25), run_time=0.55)

        self.play(Write(self.chute(f"{len(objectifs)} objectifs. On y va.", color=BLEU_CALCUL)))
        self.attendre_voix()

    def page_finale(self, points, rappel, voix="10-finale"):
        """La clôture : elle REVIENT à l'annonce du début, cochée, puis isole la
        phrase-piège du chapitre — celle que le prof voit revenir sur les copies.
        """
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire(voix)

        titre = Text("Tu sais maintenant", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        lignes = VGroup()
        for p in points:
            lignes.add(VGroup(self.coche(), Text(p, font_size=26, color=WHITE))
                       .arrange(RIGHT, buff=0.3, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([0, 0.75, 0])

        piege = Text(rappel, font_size=27, color=ORANGE_RETENUE)
        if piege.width > 11.0:
            piege.scale_to_fit_width(11.0)
        piege.move_to([0, -1.35, 0])
        cadre = SurroundingRectangle(piege, color=ORANGE_RETENUE, buff=0.25, stroke_width=2)

        signature = Text(SIGNATURE, font_size=25, color=VERT_OK).to_edge(DOWN, buff=0.85)

        self.play(Write(titre))
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Write(piege), Create(cadre))
        self.play(Flash(piege, color=ORANGE_RETENUE, line_length=0.25))
        self.play(FadeIn(signature))
        self.attendre_voix(marge=1.0)

    def page_abonnement(self):
        """⭐ La POIGNÉE est écrite en toutes lettres, jamais un bouton dessiné :
        rien n'est cliquable dans une vidéo, et imiter l'interface de YouTube
        promettrait une action que l'image ne peut pas rendre.
        ⭐ Signature « Frédéric Lacoste — La Réunion », SANS le mot enseignant :
        formule arrêtée le 03/09/2026 pour YouTube.
        """
        self.clear()
        self.dire("abonne", dossier=COMMUN)
        vertical = config.frame_width < 8
        if vertical:
            self.add(MascotteMargouillat().scale(0.38).move_to([0, -3.45, 0]))
        else:
            self.add_mascotte(scale=0.9)

        appel = Text("Abonne-toi à la chaîne !", font_size=52, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        poignee = Text("@eleveai974", font_size=64, color=BLEU_CALCUL).move_to([0, 0.75, 0])
        if vertical:
            appel.scale_to_fit_width(config.frame_width - 0.6).move_to([0, 2.1, 0])
            poignee.scale_to_fit_width(config.frame_width - 1.0).move_to([0, 0.7, 0])
        cadre = SurroundingRectangle(poignee, color=BLEU_CALCUL, buff=0.28, stroke_width=3)

        site = Text("Toutes les fiches sur eleveai.fr", font_size=32, color=VERT_OK).move_to([0, -0.75, 0])
        auteur = Text("Frédéric Lacoste — La Réunion", font_size=27, color=WHITE).move_to([0, -1.65, 0])
        if vertical:
            site.scale_to_fit_width(config.frame_width - 1.2).move_to([0, -0.85, 0])
            auteur.scale_to_fit_width(config.frame_width - 1.4).move_to([0, -1.8, 0])

        self.play(Write(appel))
        self.play(GrowFromCenter(poignee), Create(cadre))
        self.play(Flash(poignee, color=BLEU_CALCUL, line_length=0.35))
        self.play(FadeIn(site, shift=UP * 0.2))
        self.play(FadeIn(auteur))
        self.attendre_voix(marge=1.4)


class ShortSeconde(NotionSeconde):
    """Un short 9:16 — l'appât, pas le cours.

    ⭐ Il prend UN seul micro, le retourne en 40 à 50 secondes, et renvoie à la
    vidéo longue. Un short par notion, pas un short par micro.
    ⭐ Le même fichier sert YouTube Shorts, Instagram Reels et TikTok. Ce qui
    diffère est la ZONE SÛRE : Instagram recouvre le haut (nom du compte) en plus
    du bas. Rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
    ⚠️ Sur les deux plateformes, RIEN N'EST CLIQUABLE : la poignée s'écrit.

    Rendu : `-r 1080,1920`.
    """

    def __init__(self, **kwargs):
        # ⛔ AVANT super().__init__() : `-r` ne change que les PIXELS, pas le
        # cadre logique. Sans ces deux lignes, tout le texte déborde.
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def margo_bas(self):
        """Ti-Margo dans la bande basse — celle que l'interface recouvre. Il n'y
        porte aucune information : il peut être masqué sans rien coûter."""
        m = MascotteMargouillat().scale(0.38).move_to([0, -3.45, 0])
        self.add(m)
        return m

    def ecran_renvoi(self, voix="05-fin"):
        """Le renvoi vers la vidéo longue — l'objet même du Short."""
        self.clear()
        self.margo_bas()
        self.dire(voix)

        appel = VGroup(
            Text("La vidéo complète", font_size=34, color=WHITE),
            Text("sur la chaîne", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.1, 0])
        self.play(LaggedStart(*[Write(m) for m in appel], lag_ratio=0.3))

        poignee = Text("@eleveai974", font_size=42, color=BLEU_CALCUL).move_to([0, 0.65, 0])
        cadre = SurroundingRectangle(poignee, color=BLEU_CALCUL, buff=0.24, stroke_width=3)
        self.play(GrowFromCenter(poignee), Create(cadre))
        self.play(Flash(poignee, color=BLEU_CALCUL, line_length=0.3))

        site = Text("eleveai.fr", font_size=34, color=VERT_OK).move_to([0, -0.85, 0])
        auteur = Text("Frédéric Lacoste", font_size=24, color=WHITE).move_to([0, -1.75, 0])
        lieu = Text("La Réunion", font_size=24, color=WHITE).move_to([0, -2.2, 0])
        self.play(FadeIn(site, shift=UP * 0.15))
        self.play(FadeIn(auteur), FadeIn(lieu))
        self.attendre_voix(marge=1.5)
