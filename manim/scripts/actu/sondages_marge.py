# sondages_marge.py
# EleveAI — « Trois instituts, la même semaine, 4,5 points d'écart. »
# LA VIDÉO PAYSAGE et ses quatre shorts.
#
# ── POURQUOI CETTE VIDÉO (12/09/2026) ─────────────────────────────────────────
# Frédéric cherchait un sujet d'actualité vraiment mathématique. Celui-ci l'est
# jusqu'à l'os : début septembre 2026, trois instituts publient la même semaine
# leur mesure de la MÊME intention de vote, et trouvent 30 %, 34 % et 34,5 %.
# Le réflexe est de demander lequel a raison. La bonne question est : est-ce que
# l'écart tient dans la marge ? Réponse mesurée : presque pas — les trois
# intervalles à 95 % ne se recouvrent que sur UN DIXIÈME DE POINT.
#
# ⛔⛔ AUCUN NOM DE CANDIDAT. Ni titre, ni écran, ni voix. On garde les noms
# d'INSTITUTS — c'est la partie vérifiable — et on jette le reste. Sans cette
# règle, la section commentaires devient un débat électoral et une chaîne
# d'élèves est morte. Le sujet est la MESURE, pas l'élection.
#
# ⛔ CHAQUE CHIFFRE A SA SOURCE, et elle va dans la description YouTube :
# « Liste de sondages sur l'élection présidentielle française de 2027 »,
# Wikipédia, consulté le 12/09/2026, qui cite les notices des instituts.
#   Cluster17  31 août – 1er sept.  n = 1 711  ->  30,0 %
#   Ipsos      31 août – 2 sept.    n = 1 500  ->  34,5 %
#   OpinionWay  9 – 10 sept.        n = 1 001  ->  34,0 %
#
# ⭐ LES INTERVALLES SONT CALCULÉS, PAS RECOPIÉS (1,96 × √(p(1−p)/n)) :
#   Cluster17  ± 2,2 pt  [27,8 ; 32,2]
#   Ipsos      ± 2,4 pt  [32,1 ; 36,9]
#   OpinionWay ± 2,9 pt  [31,1 ; 36,9]
#   recouvrement commun : [32,1 ; 32,2] — 0,1 point.
#
# ⚠️ CE QUE LA VIDÉO NE PRÉTEND PAS. La formule classique suppose un tirage
# aléatoire simple ; les instituts travaillent par quotas. L'ordre de grandeur
# tient, la précision au dixième non — et c'est justement le propos : la marge
# affichée est un MINIMUM.
#
# ⚠️ « C'est pas un peu trop maths, les intervalles ? » (Frédéric). Non, parce
# que l'intervalle EST le schéma : trois segments posés l'un sous l'autre, on
# voit d'un coup qu'ils ne se touchent pas. Aucune formule n'est nécessaire pour
# le comprendre — d'où le défi qui est une LECTURE de dessin, pas un calcul.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/actu/sondages_marge.py SondagesLongue -o eleveai-maths-actu-sondages --media_dir manim/scripts/actu/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/sondages_marge.py SondagesShortMille -o eleveai-maths-actu-sondages-short-mille --media_dir manim/scripts/actu/media
#   (idem ShortTrois / ShortRacine / ShortAvance)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases, ShortBases
from gabarit_seconde import SONS

VOIX = SONS / "actu-sondages"
VOIX_MILLE = SONS / "actu-sondages-short-mille"
VOIX_TROIS = SONS / "actu-sondages-short-trois"
VOIX_RACINE = SONS / "actu-sondages-short-racine"
VOIX_AVANCE = SONS / "actu-sondages-short-avance"

# (nom, n, score, marge) — la marge est calculée, pas recopiée.
INSTITUTS = [
    ("Cluster17", 1711, 30.0, 2.2),
    ("Ipsos", 1500, 34.5, 2.4),
    ("OpinionWay", 1001, 34.0, 2.9),
]


class _Sondages:
    """Les objets que toute la fratrie dessine : une échelle en pourcents, un
    segment d'incertitude, deux populations."""

    PMIN, PMAX = 26.0, 38.0

    def bornes(self):
        """La largeur utile, qui n'est pas la même en paysage et en 9:16."""
        demi = config.frame_width / 2 - 0.55
        return -demi, demi

    def ech(self, p):
        """Un pourcentage -> une abscisse. Toute la vidéo partage cette échelle :
        c'est ce qui permet de SUPERPOSER les segments et de voir le
        recouvrement sans rien calculer."""
        x0, x1 = self.bornes()
        return x0 + (p - self.PMIN) / (self.PMAX - self.PMIN) * (x1 - x0)

    def axe_pourcents(self, y, pas=2, font_size=20, couleur=GREY_B):
        """L'axe gradué, dessiné à la main — pas de NumberLine, pas de LaTeX."""
        x0, x1 = self.bornes()
        g = VGroup(Line([x0, y, 0], [x1, y, 0], color=couleur, stroke_width=3))
        p = int(self.PMIN)
        while p <= self.PMAX:
            x = self.ech(p)
            g.add(Line([x, y, 0], [x, y - 0.13, 0], color=couleur, stroke_width=2.5))
            g.add(Text(f"{p}", font_size=font_size, color=couleur)
                  .move_to([x, y - 0.38, 0]))
            p += pas
        return g

    def segment_ic(self, p, marge, y, couleur, epaisseur=6, haut=0.13):
        """Un intervalle de confiance : le trait, ses deux bornes, et le point
        mesuré. ⭐ C'EST LE SCHÉMA de toute la vidéo — le spectateur voit un
        segment là où le journal affiche un nombre."""
        xa, xb = self.ech(p - marge), self.ech(p + marge)
        return VGroup(
            Line([xa, y, 0], [xb, y, 0], color=couleur, stroke_width=epaisseur),
            Line([xa, y - haut, 0], [xa, y + haut, 0], color=couleur, stroke_width=epaisseur),
            Line([xb, y - haut, 0], [xb, y + haut, 0], color=couleur, stroke_width=epaisseur),
            Dot([self.ech(p), y, 0], color=WHITE, radius=0.07),
        )

    def bande(self, p1, p2, y_bas, y_haut, couleur=JAUNE_TITRE, opacite=0.30):
        """La zone où les segments se recouvrent — une bande verticale.
        ⚠️ Largeur minimale : 0,1 point d'échelle donne un rectangle invisible,
        or c'est précisément ce qu'on veut montrer. On garde un trait épais."""
        xa, xb = self.ech(p1), self.ech(p2)
        larg = max(0.05, xb - xa)
        r = Rectangle(width=larg, height=y_haut - y_bas, stroke_width=0,
                      fill_color=couleur, fill_opacity=opacite)
        r.move_to([(xa + xb) / 2, (y_bas + y_haut) / 2, 0])
        return r

    def population(self, cote, centre, n_texte, nom, couleur=BLEU_CALCUL,
                   font_size=24, cuillere=0.34):
        """Une population (le grand carré) et l'échantillon qu'on y prélève (le
        petit carré, TOUJOURS de la même taille). ⭐ L'image dit à elle seule ce
        que la formule dit : n change la précision, N ne la change pas."""
        grand = Square(side_length=cote, stroke_width=3, color=couleur)
        grand.set_fill(couleur, opacity=0.10).move_to(centre)
        petit = Square(side_length=cuillere, stroke_width=2.5, color=JAUNE_TITRE)
        petit.set_fill(JAUNE_TITRE, opacity=0.85).move_to(centre)
        lab = Text(nom, font_size=font_size, color=WHITE)
        lab.next_to(grand, DOWN, buff=0.18)
        val = Text(n_texte, font_size=font_size - 2, color=couleur)
        val.next_to(lab, DOWN, buff=0.10)
        return VGroup(grand, petit, lab, val)


# ══════════════════════════════════════════════════════════════════════════════
#  LA VIDÉO PAYSAGE
# ══════════════════════════════════════════════════════════════════════════════

class SondagesLongue(NotionBases, _Sondages):

    dossier_voix = VOIX
    identite = "Les sondages · EleveAI"

    # ── 1 : les trois chiffres, et d'où ils viennent ────────────────────────

    def ecran_trois(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("01-trois")
        self.titre_ecran("La même semaine, le même candidat")

        lignes = VGroup()
        for nom, n, p, _ in INSTITUTS:
            lignes.add(VGroup(
                Text(nom, font_size=30, color=WHITE),
                Text(f"n = {n}", font_size=26, color=GREY_B),
                Text(f"{p} %".replace(".", ","), font_size=40, color=BLEU_CALCUL),
            ).arrange(RIGHT, buff=0.6))
        # les colonnes s'alignent : sinon l'œil compare des nombres décalés
        larg = [max(l[i].width for l in lignes) for i in range(3)]
        for l in lignes:
            for i in (1, 2):
                l[i].shift(RIGHT * sum(larg[j] - l[j].width for j in range(i)))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.55, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)

        ecart = Text("4,5 points d'écart", font_size=44, color=ORANGE_RETENUE)
        ecart.move_to([0, -1.55, 0])
        self.play(GrowFromCenter(ecart), Flash(ecart, color=ORANGE_RETENUE, line_length=0.3))
        self.play(Write(self.chute("Ils mesurent pourtant la même chose, au même moment.")))
        self.attendre_voix()

    # ── 2 : mille personnes, et pourquoi N ne compte pas ────────────────────

    def ecran_echantillon(self):
        self.clear()
        self.dire("02-echantillon")
        self.titre_ecran("« 1 000 personnes, c'est trop peu ! »")

        # ⚠️ Les étiquettes pendent SOUS le carré : un carré de 3 unités centré
        # à 0,3 descend jusqu'à −1,2, et ses deux lignes de légende mordaient
        # sur la note du bas (premier tirage). On remonte le tout.
        fr = self.population(2.7, [-3.3, 0.85, 0], "48 000 000 d'électeurs", "France")
        lu = self.population(1.0, [2.6, 0.85, 0], "500 000 électeurs", "Luxembourg",
                             couleur=VERT_OK)
        self.play(FadeIn(fr, shift=UP * 0.15))
        self.play(FadeIn(lu, shift=UP * 0.15))

        # ⭐ La même cuillère dans les deux casseroles : c'est TOUT le message.
        note = Text("le carré jaune : 1 000 personnes, dans les deux cas",
                    font_size=28, color=JAUNE_TITRE).move_to([0, -2.05, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.play(Flash(fr[1], color=JAUNE_TITRE, line_length=0.25),
                  Flash(lu[1], color=JAUNE_TITRE, line_length=0.25))
        self.play(Write(self.chute("Même précision. La taille de la marmite n'y change rien.",
                                   color=VERT_OK)))
        self.attendre_voix()

    # ── 3 : un score est un segment ─────────────────────────────────────────

    def ecran_marge(self):
        self.clear()
        self.dire("03-marge")
        self.titre_ecran("Un score n'est pas un nombre")

        avant = Text("34 %", font_size=76, color=GREY_B).move_to([-4.0, 1.5, 0])
        self.play(FadeIn(avant))
        # La flèche part de la DROITE du texte mesurée, pas d'une abscisse
        # devinée : au premier tirage elle était collée au « % ».
        fleche = Arrow(avant.get_right() + RIGHT * 0.35, [-1.5, 1.5, 0], color=JAUNE_TITRE,
                       stroke_width=6, max_tip_length_to_length_ratio=0.3)
        apres = Text("entre 31 et 37", font_size=52, color=VERT_OK)
        apres.move_to([1.6, 1.5, 0])
        self.play(GrowArrow(fleche), FadeIn(apres, shift=RIGHT * 0.2))

        axe = self.axe_pourcents(-1.6)
        self.play(Create(axe))
        seg = self.segment_ic(34.0, 2.9, -0.55, BLEU_CALCUL)
        self.play(Create(seg))
        lab = Text("sur 1 000 personnes : environ ± 3 points",
                   font_size=30, color=BLEU_CALCUL).move_to([0, 0.25, 0])
        self.play(FadeIn(lab, shift=UP * 0.12))
        self.play(Write(self.chute("Toujours un segment. Jamais un point.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 4 : LES TROIS SEGMENTS — l'image qui porte la vidéo ────────────────

    def ecran_segments(self):
        self.clear()
        self.dire("04-segments")
        self.titre_ecran("Les trois, sur la même échelle")

        axe = self.axe_pourcents(-2.35)
        self.play(Create(axe))

        # ⛔ LE NOM DE L'INSTITUT EST LA PARTIE VÉRIFIABLE : il ne peut pas
        # manquer. Au premier tirage je le construisais sans jamais l'ajouter à
        # la scène — l'écran n'affichait que les pourcentages, donc trois
        # chiffres sans source. Nom AU-DESSUS, valeur EN DESSOUS : ça tient quel
        # que soit l'endroit du segment, alors qu'un `next_to(LEFT)` sort du
        # cadre dès que la borne basse s'approche du bord.
        couleurs = [VERT_OK, BLEU_CALCUL, VIOLET_ACCENT]
        ys = [1.45, 0.35, -0.75]
        for (nom, n, p, m), y, c in zip(INSTITUTS, ys, couleurs):
            s = self.segment_ic(p, m, y, c)
            lab = Text(f"{nom}   n = {n}", font_size=24, color=c)
            lab.move_to([self.ech(p), y + 0.40, 0])
            val = Text(f"{p} %".replace(".", ","), font_size=28, color=c)
            val.move_to([self.ech(p), y - 0.38, 0])
            self.play(Create(s), FadeIn(lab), FadeIn(val), run_time=0.6)

        # ⭐ LE POINT DE BASCULE : la bande de recouvrement, large de 0,1 point.
        bande = self.bande(32.1, 32.2, -2.35, 1.9)
        self.play(FadeIn(bande))
        fleche = Text("0,1 point", font_size=30, color=JAUNE_TITRE)
        fleche.move_to([self.ech(32.15) + 1.9, -1.75, 0])
        trait = Line(fleche.get_left() + LEFT * 0.12, [self.ech(32.15) + 0.08, -1.75, 0],
                     color=JAUNE_TITRE, stroke_width=3)
        self.play(FadeIn(fleche), Create(trait))
        self.play(Write(self.chute("Le hasard du tirage n'explique pas tout. Il reste autre chose.",
                                   color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 5 : la racine carrée décide du budget ──────────────────────────────

    def ecran_racine(self):
        self.clear()
        self.dire("05-racine")
        self.titre_ecran("Pour être deux fois plus précis ?")

        lignes = VGroup()
        for n, m, c in [("1 000 personnes", "± 3 points", BLEU_CALCUL),
                        ("4 000 personnes", "± 1,5 point", VERT_OK),
                        ("9 000 personnes", "± 1 point", VIOLET_ACCENT)]:
            lignes.add(VGroup(Text(n, font_size=34, color=WHITE),
                              Text(m, font_size=34, color=c)).arrange(RIGHT, buff=1.1))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([0, 0.75, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)

        note = VGroup(
            Text("× 4 de monde  →  ÷ 2 la marge", font_size=34, color=JAUNE_TITRE),
            Text("× 9 de monde  →  ÷ 3 la marge", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.24).move_to([0, -1.55, 0])
        cadre = SurroundingRectangle(note, color=JAUNE_TITRE, buff=0.26, stroke_width=3)
        self.play(FadeIn(note), Create(cadre))
        self.play(Write(self.chute("La précision suit la RACINE du nombre de personnes.")))
        self.attendre_voix()

    # ── 6 : quand un écart n'est pas un écart ──────────────────────────────

    def ecran_classement(self):
        self.clear()
        self.dire("06-classement")
        self.titre_ecran("« Il passe devant »")

        axe = self.axe_pourcents(-2.1)
        self.play(Create(axe))
        a = self.segment_ic(34.0, 3.0, 0.9, BLEU_CALCUL)
        b = self.segment_ic(33.5, 3.0, -0.25, ORANGE_RETENUE)
        # ⚠️ Chaque étiquette se pose sur SON centre : les deux pointaient sur
        # 34,0 au premier tirage, ce qui mentait de 0,5 point sur l'écran qui
        # parle justement d'un demi-point.
        for s, p, t, c, y in ((a, 34.0, "34 %", BLEU_CALCUL, 1.32),
                              (b, 33.5, "33,5 %", ORANGE_RETENUE, 0.18)):
            self.play(Create(s), FadeIn(Text(t, font_size=28, color=c)
                                        .move_to([self.ech(p), y, 0])), run_time=0.55)

        verdict = Text("un demi-point d'écart, trois points de marge",
                       font_size=32, color=WHITE).move_to([0, -1.35, 0])
        self.play(FadeIn(verdict, shift=UP * 0.12))
        self.play(Write(self.chute("Ce n'est pas lire le sondage. C'est lire le bruit.",
                                   color=ROUGE_ERREUR)))
        self.attendre_voix()

    # ── 7 : ce qui reste — l'effet d'institut ──────────────────────────────

    def ecran_institut(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("07-institut")
        self.titre_ecran("Alors, d'où vient l'écart ?")

        blocs = VGroup(
            Text("chacun corrige ses résultats à sa façon", font_size=32, color=BLEU_CALCUL),
            Text("chacun formule ses questions autrement", font_size=32, color=BLEU_CALCUL),
            Text("chacun décide qui ira voter", font_size=32, color=BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([-0.4, 0.95, 0])
        for b in blocs:
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.45)

        nom = Text("l'effet d'institut", font_size=46, color=JAUNE_TITRE)
        nom.move_to([0, -0.75, 0])
        self.play(GrowFromCenter(nom))
        lecon = Text("la marge affichée ne compte que le hasard, pas les décisions humaines",
                     font_size=28, color=WHITE).move_to([0, -1.65, 0])
        if lecon.width > 12.0:
            lecon.scale_to_fit_width(12.0)
        self.play(FadeIn(lecon, shift=UP * 0.12))
        self.play(Write(self.chute("C'est un MINIMUM, pas un maximum.", color=ROUGE_ERREUR)))
        self.attendre_voix()

    # ── 8 : le défi — une LECTURE, pas un calcul ───────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("08-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        enonce = VGroup(
            Text("Deux candidats : 34 %  et  31 %", font_size=40, color=WHITE),
            Text("La marge est de 3 points.", font_size=36, color=BLEU_CALCUL),
            Text("Peut-on dire lequel est devant ?", font_size=40, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.38).move_to([0, 0.75, 0])
        for e in enonce:
            self.play(FadeIn(e, shift=UP * 0.12), run_time=0.5)

        indice = Text("Dessine les deux segments avant de répondre.",
                      font_size=30, color=ORANGE_RETENUE).move_to([0, -1.35, 0])
        self.play(FadeIn(indice, shift=UP * 0.12))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.dire("09-correction")
        self.titre_ecran("Correction")

        axe = self.axe_pourcents(-2.1)
        self.play(Create(axe))
        a = self.segment_ic(34.0, 3.0, 0.95, BLEU_CALCUL)
        b = self.segment_ic(31.0, 3.0, -0.2, ORANGE_RETENUE)
        self.play(Create(a), FadeIn(Text("34 %  →  de 31 à 37", font_size=28,
                                         color=BLEU_CALCUL).move_to([0, 1.45, 0])))
        self.play(Create(b), FadeIn(Text("31 %  →  de 28 à 34", font_size=28,
                                         color=ORANGE_RETENUE).move_to([0, 0.3, 0])))

        bande = self.bande(31.0, 34.0, -2.1, 1.25)
        self.play(FadeIn(bande))
        note = Text("3 points de recouvrement sur 6", font_size=32, color=JAUNE_TITRE)
        note.move_to([0, -1.3, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.play(Write(self.chute("On ne peut pas les départager.", color=ROUGE_ERREUR)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Qui a raison ?",
            accroche="30 %, 34 %, 34,5 % — la même semaine.",
            promesse="Tu vas apprendre à lire un sondage sans te faire avoir.",
        )
        self.page_objectifs([
            "comprendre pourquoi 1 000 personnes suffisent",
            "lire un score comme un segment, pas comme un nombre",
            "savoir reconnaître un écart qui n'en est pas un",
        ])
        self.ecran_trois()
        self.ecran_echantillon()
        self.ecran_marge()
        self.ecran_segments()
        self.ecran_racine()
        self.ecran_classement()
        self.ecran_institut()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "1 000 personnes suffisent : la taille du pays n'y change rien",
                "un score de sondage est un segment, pas un point",
                "un écart plus petit que la marge n'est pas un écart",
            ],
            rappel="La marge affichée est un MINIMUM, pas un maximum.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES QUATRE SHORTS
#  Chacun tient sur UNE idée et se regarde sans les autres.
#  ⭐ Le retournement est dans les 30 premiers signes du titre ET dans la
#  première ligne de la garde : c'est ce qui a fait 227 vues en une matinée.
# ══════════════════════════════════════════════════════════════════════════════

class SondagesShortMille(ShortBases, _Sondages):
    """1 000 personnes pour 48 millions — et la taille du pays n'y entre pas."""

    dossier_voix = VOIX_MILLE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.grand("1 000", font_size=92, color=JAUNE_TITRE),
            self.grand("personnes", font_size=40, color=WHITE),
            self.grand("pour en représenter", font_size=32, color=WHITE),
            self.grand("48 000 000", font_size=62, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.7, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.15), run_time=0.55)
        q = self.grand("absurde ?", font_size=52, color=ORANGE_RETENUE)
        q.move_to([0, -0.9, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_formule(self):
        self.clear()
        self.margo_bas()
        self.dire("01-formule")
        self.play(Write(self.grand("La précision dépend", font_size=34,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("du NOMBRE", font_size=44, color=VERT_OK),
            self.grand("de personnes", font_size=38, color=VERT_OK),
            self.grand("interrogées", font_size=38, color=VERT_OK),
            self.grand("et de rien d'autre", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        chiffre = self.grand("1 000  →  ± 3 points", font_size=38, color=BLEU_CALCUL)
        chiffre.move_to([0, -0.9, 0])
        self.play(FadeIn(chiffre, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_population(self):
        self.clear()
        self.margo_bas()
        self.dire("02-population")
        self.play(Write(self.grand("Et la population ?", font_size=36,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))
        # ⛔ CÔTE À CÔTE, PAS EMPILÉES. Empilées, les deux légendes pendantes
        # descendaient sur la note du bas et la rendaient illisible — et surtout
        # on ne COMPARE pas deux tailles qu'on ne voit pas en même temps : c'est
        # tout l'argument de l'écran.
        fr = self.population(1.8, [-1.0, 1.5, 0], "48 millions", "France", font_size=20)
        lu = self.population(0.8, [1.3, 1.5, 0], "500 000", "Luxembourg",
                             couleur=VERT_OK, font_size=20)
        self.play(FadeIn(fr, shift=UP * 0.12))
        self.play(FadeIn(lu, shift=UP * 0.12))
        note = VGroup(
            self.grand("même carré jaune", font_size=32, color=JAUNE_TITRE),
            self.grand("même précision", font_size=38, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.9, 0])
        self.play(FadeIn(note, shift=UP * 0.1))
        self.attendre_voix(marge=0.4)

    def ecran_soupe(self):
        self.clear()
        self.margo_bas()
        self.dire("03-soupe")
        self.play(Write(self.grand("La règle de la soupe", font_size=36,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("une cuillère", font_size=40, color=WHITE),
            self.grand("bien mélangée", font_size=40, color=VERT_OK),
            self.grand("renseigne autant", font_size=34, color=WHITE),
            self.grand("sur une casserole", font_size=32, color=BLEU_CALCUL),
            self.grand("que sur une marmite", font_size=32, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("le vrai risque", font_size=36, color=WHITE),
            self.grand("d'un sondage", font_size=36, color=WHITE),
            self.grand("ce n'est pas", font_size=32, color=ROUGE_ERREUR),
            self.grand("sa TAILLE", font_size=44, color=ROUGE_ERREUR),
            self.grand("c'est son MÉLANGE", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        self.play(Flash(bloc[4], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_formule(); self.ecran_population()
        self.ecran_soupe(); self.ecran_retenir(); self.ecran_renvoi()


class SondagesShortTrois(ShortBases, _Sondages):
    """Trois instituts, la même semaine, 4,5 points d'écart."""

    dossier_voix = VOIX_TROIS

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        haut = VGroup(
            self.grand("trois instituts", font_size=40, color=WHITE),
            self.grand("la même semaine", font_size=36, color=WHITE),
            self.grand("le même candidat", font_size=36, color=WHITE),
        ).arrange(DOWN, buff=0.18).move_to([0, 2.7, 0])
        self.play(FadeIn(haut, shift=DOWN * 0.12), run_time=0.5)
        chiffres = VGroup(
            self.grand("30 %", font_size=66, color=VERT_OK),
            self.grand("34 %", font_size=66, color=VIOLET_ACCENT),
            self.grand("34,5 %", font_size=66, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.4, 0])
        for c in chiffres:
            self.play(FadeIn(c, shift=UP * 0.1), run_time=0.32)
        self.attendre_voix(marge=0.4)

    def ecran_chiffres(self):
        self.clear()
        self.margo_bas()
        self.dire("01-chiffres")
        self.play(Write(self.grand("Les sources", font_size=36,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))
        lignes = VGroup()
        for nom, n, p, _ in INSTITUTS:
            lignes.add(VGroup(
                Text(nom, font_size=28, color=WHITE),
                Text(f"n = {n}", font_size=22, color=GREY_B),
                Text(f"{p} %".replace(".", ","), font_size=34, color=BLEU_CALCUL),
            ).arrange(DOWN, buff=0.10))
        # ⚠️ Trois blocs de TROIS lignes font près de 3,5 unités de haut :
        # centré à 1,1 le premier montait dans le titre (premier tirage).
        lignes.arrange(DOWN, buff=0.42).move_to([0, 0.75, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.42)
        ecart = self.grand("4,5 points d'écart", font_size=38, color=ORANGE_RETENUE)
        ecart.move_to([0, -2.05, 0])
        self.play(GrowFromCenter(ecart))
        self.attendre_voix(marge=0.4)

    def ecran_marge(self):
        self.clear()
        self.margo_bas()
        self.dire("02-marge")
        bloc = VGroup(
            self.grand("un score", font_size=40, color=WHITE),
            self.grand("n'est pas", font_size=36, color=WHITE),
            self.grand("un nombre", font_size=44, color=ROUGE_ERREUR),
            self.grand("c'est un SEGMENT", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.8, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        seg = self.segment_ic(34.0, 2.9, -0.7, BLEU_CALCUL, epaisseur=7)
        axe = self.axe_pourcents(-1.5, pas=4, font_size=18)
        self.play(Create(axe), Create(seg))
        self.attendre_voix(marge=0.4)

    def ecran_recouvrement(self):
        self.clear()
        self.margo_bas()
        self.dire("03-recouvrement")
        self.play(Write(self.grand("Les trois segments", font_size=34,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))
        axe = self.axe_pourcents(-0.9, pas=4, font_size=18)
        self.play(Create(axe))
        for (nom, n, p, m), y, c in zip(INSTITUTS, [2.3, 1.45, 0.6],
                                        [VERT_OK, BLEU_CALCUL, VIOLET_ACCENT]):
            s = self.segment_ic(p, m, y, c, epaisseur=7)
            lab = Text(nom, font_size=20, color=c).move_to([0, y + 0.32, 0])
            self.play(Create(s), FadeIn(lab), run_time=0.5)
        bande = self.bande(32.1, 32.2, -0.9, 2.55)
        self.play(FadeIn(bande))
        note = VGroup(
            self.grand("ils se croisent", font_size=32, color=WHITE),
            self.grand("sur 0,1 point", font_size=40, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -2.0, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_institut(self):
        self.clear()
        self.margo_bas()
        self.dire("04-institut")
        bloc = VGroup(
            self.grand("ce qui reste", font_size=34, color=WHITE),
            self.grand("l'effet", font_size=42, color=JAUNE_TITRE),
            self.grand("d'institut", font_size=42, color=JAUNE_TITRE),
            self.grand("chacun corrige", font_size=30, color=BLEU_CALCUL),
            self.grand("et filtre à sa façon", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.6, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        fin = VGroup(
            self.grand("la marge affichée", font_size=30, color=ROUGE_ERREUR),
            self.grand("est un MINIMUM", font_size=36, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.9, 0])
        self.play(FadeIn(fin, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_chiffres(); self.ecran_marge()
        self.ecran_recouvrement(); self.ecran_institut(); self.ecran_renvoi()


class SondagesShortRacine(ShortBases, _Sondages):
    """× 4 de monde ne divise la marge que par 2."""

    dossier_voix = VOIX_RACINE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.grand("4 × plus", font_size=62, color=JAUNE_TITRE),
            self.grand("de monde", font_size=44, color=JAUNE_TITRE),
            self.grand("ce n'est pas", font_size=32, color=WHITE),
            self.grand("4 × plus précis", font_size=44, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.8, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.14), run_time=0.55)
        q = self.grand("seulement 2 ×", font_size=46, color=VERT_OK)
        q.move_to([0, -0.85, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_mille(self):
        self.clear()
        self.margo_bas()
        self.dire("01-mille")
        self.play(Write(self.grand("Le point de départ", font_size=34,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("1 000 personnes", font_size=44, color=WHITE),
            self.grand("± 3 points", font_size=52, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.8, 0])
        self.play(FadeIn(bloc, shift=UP * 0.12))
        q = VGroup(
            self.grand("pour descendre", font_size=32, color=WHITE),
            self.grand("à ± 1,5 point ?", font_size=38, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.5, 0])
        self.play(FadeIn(q, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_quatre(self):
        self.clear()
        self.margo_bas()
        self.dire("02-quatre")
        faux = self.grand("2 000 ?", font_size=56, color=ROUGE_ERREUR)
        faux.move_to([0, 2.6, 0])
        self.play(FadeIn(faux))
        barre = Line(faux.get_corner(DL) + LEFT * 0.5, faux.get_corner(UR) + RIGHT * 0.5,
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))
        vrai = self.grand("4 000", font_size=76, color=VERT_OK).move_to([0, 1.2, 0])
        self.play(GrowFromCenter(vrai), Flash(vrai, color=VERT_OK, line_length=0.35))
        note = VGroup(
            self.grand("la précision suit", font_size=32, color=WHITE),
            self.grand("la RACINE CARRÉE", font_size=36, color=JAUNE_TITRE),
            self.grand("du nombre de gens", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.7, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_neuf(self):
        self.clear()
        self.margo_bas()
        self.dire("03-neuf")
        # ⚠️ Même taille de police pour les trois lignes, puis on borne le
        # GROUPE : sinon la plus longue rétrécit seule et la pile part en
        # perspective (défaut constaté sur les fractions le 11/09).
        lignes = VGroup(*[
            Text(t, font_size=34, color=c)
            for t, c in [("1 000  →  ± 3 pt", BLEU_CALCUL),
                         ("4 000  →  ± 1,5 pt", VERT_OK),
                         ("9 000  →  ± 1 pt", VIOLET_ACCENT)]
        ]).arrange(DOWN, buff=0.45)
        if lignes.width > config.frame_width - 0.5:
            lignes.scale_to_fit_width(config.frame_width - 0.5)
        lignes.move_to([0, 1.9, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.12), run_time=0.45)
        note = VGroup(
            self.grand("9 × plus de monde", font_size=34, color=ORANGE_RETENUE),
            self.grand("pour gagner", font_size=30, color=WHITE),
            self.grand("UN seul point", font_size=38, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.9, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("personne ne sonde", font_size=34, color=WHITE),
            self.grand("10 000 personnes", font_size=40, color=BLEU_CALCUL),
            self.grand("10 × le prix", font_size=34, color=ROUGE_ERREUR),
            self.grand("3 × moins d'erreur", font_size=34, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.7, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        fin = VGroup(
            self.grand("c'est la racine carrée", font_size=30, color=VERT_OK),
            self.grand("qui décide du budget", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.85, 0])
        self.play(FadeIn(fin, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_mille(); self.ecran_quatre()
        self.ecran_neuf(); self.ecran_retenir(); self.ecran_renvoi()


class SondagesShortAvance(ShortBases, _Sondages):
    """Un demi-point d'avance n'est pas une avance."""

    dossier_voix = VOIX_AVANCE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        duo = VGroup(
            self.grand("34 %", font_size=62, color=BLEU_CALCUL),
            self.grand("contre", font_size=32, color=WHITE),
            self.grand("33,5 %", font_size=62, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([0, 2.3, 0])
        self.play(FadeIn(duo, shift=DOWN * 0.14), run_time=0.55)
        titre = VGroup(
            self.grand("le titre dit :", font_size=30, color=WHITE),
            self.grand("« il passe devant »", font_size=36, color=ROUGE_ERREUR),
            self.grand("le sondage, non", font_size=36, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.4, 0])
        self.play(FadeIn(titre, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_marge(self):
        self.clear()
        self.margo_bas()
        self.dire("01-marge")
        bloc = VGroup(
            self.grand("sur 1 000 personnes", font_size=32, color=WHITE),
            self.grand("± 3 points", font_size=52, color=BLEU_CALCUL),
            self.grand("chaque score est", font_size=32, color=WHITE),
            self.grand("un SEGMENT", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.6, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_segments(self):
        self.clear()
        self.margo_bas()
        self.dire("02-segments")
        self.play(Write(self.grand("Les deux segments", font_size=34,
                                   color=JAUNE_TITRE).move_to([0, 3.2, 0])))
        axe = self.axe_pourcents(-0.6, pas=4, font_size=18)
        self.play(Create(axe))
        a = self.segment_ic(34.0, 3.0, 1.9, BLEU_CALCUL, epaisseur=7)
        b = self.segment_ic(33.5, 3.0, 0.85, ORANGE_RETENUE, epaisseur=7)
        self.play(Create(a), FadeIn(Text("34 %", font_size=22, color=BLEU_CALCUL)
                                    .move_to([0, 2.25, 0])))
        self.play(Create(b), FadeIn(Text("33,5 %", font_size=22, color=ORANGE_RETENUE)
                                    .move_to([0, 1.2, 0])))
        bande = self.bande(31.0, 36.5, -0.6, 2.1)
        self.play(FadeIn(bande))
        note = self.grand("ils se recouvrent presque", font_size=30, color=JAUNE_TITRE)
        note.move_to([0, -1.7, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_verdict(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verdict")
        bloc = VGroup(
            self.grand("un demi-point", font_size=40, color=WHITE),
            self.grand("d'écart", font_size=36, color=WHITE),
            self.grand("trois points", font_size=40, color=BLEU_CALCUL),
            self.grand("de marge", font_size=36, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.0, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        fin = self.grand("INDISCERNABLES", font_size=44, color=ROUGE_ERREUR)
        fin.move_to([0, -0.7, 0])
        self.play(GrowFromCenter(fin), Flash(fin, color=ROUGE_ERREUR, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        regle = VGroup(
            self.grand("si l'écart", font_size=36, color=WHITE),
            self.grand("est plus petit", font_size=36, color=WHITE),
            self.grand("que la marge", font_size=36, color=WHITE),
            self.grand("il n'y a pas d'écart", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.8, 0])
        cadre = SurroundingRectangle(regle, color=VERT_OK, buff=0.26, stroke_width=3)
        self.play(FadeIn(regle), Create(cadre))
        fin = VGroup(
            self.grand("y lire un classement", font_size=28, color=ROUGE_ERREUR),
            self.grand("c'est lire le BRUIT", font_size=34, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.2, 0])
        self.play(FadeIn(fin, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_marge(); self.ecran_segments()
        self.ecran_verdict(); self.ecran_retenir(); self.ecran_renvoi()
