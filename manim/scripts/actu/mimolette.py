# manim/scripts/actu/mimolette.py
#
# LA MIMOLETTE — MOYENNE, ÉCART TYPE, ET LE MATHÉMATICIEN À 1 000 € (28/09/2026)
#
# Frédéric, 28/09 : « à chaque fois que je leur explique la moyenne et l'écart
# type, je leur donne l'exemple de la mimolette » — la mimolette DURE, en sachet
# plastique de grande surface, annoncée 200 g. Il en pèse : 210 à 240 g. « Ils
# rigolent, mais après ils rigolent pas, et le lendemain ils vont tous peser. »
#
# ⭐ DEUX LEÇONS, dans cet ordre : des maths simples améliorent TON budget ; et
# elles améliorent la QUALITÉ — la qualité, c'est la constance (réduire l'écart
# type, métier du responsable qualité).
#
# ⚠️ LES PESÉES À L'ÉCRAN SONT DES VALEURS D'EXEMPLE (moyenne 225 exacte), en
# attendant les siennes. Le saucisson est un SCHÉMA, et l'écran le dit.
# ⛔ Aucune marque. « 240 au lieu de 200 » = +20 % de FROMAGE (le prix au kilo
# ne baisse, lui, que de 17 %) : la voix dit « fromage en plus ».
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/actu-mimolette-short.json -Debit 6
# Rendu :
#   python -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/actu/mimolette.py MimoletteShort -o brouillon --media_dir manim/scripts/actu/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/mimolette.py MimoletteShort -o eleveai-maths-actu-mimolette-short --media_dir manim/scripts/actu/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *
from PIL import Image, ImageDraw

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

RACINE = Path(__file__).resolve().parents[3]
VOIX = SONS / "actu-mimolette-short"
AVATAR = RACINE / "public" / "images" / "avatar-frederic-Lacoste.jpg"

ETIQUETTE = 200
AVANT = [210, 220, 220, 230, 230, 240]      # moyenne 225
APRES = [212, 216, 218, 222, 224, 228]      # moyenne 220 : même tolérance, moins dispersé
# Schéma, pas mesure : même moyenne, dispersions différentes.
METROPOLE = [246, 248, 249, 250, 251, 252, 254]
REUNION = [232, 238, 244, 250, 256, 262, 268]


def moyenne(v):
    return sum(v) / len(v)


def ecart_type(v):
    m = moyenne(v)
    return (sum((x - m) ** 2 for x in v) / len(v)) ** 0.5


def fr(x, d=1):
    return f"{x:.{d}f}".replace(".", ",")


def photo_ronde_png():
    """La photo de Frédéric, découpée en rond une fois pour toutes (PNG RGBA)."""
    sortie = Path(__file__).resolve().parent / "media" / "frederic-rond.png"
    if not sortie.exists():
        sortie.parent.mkdir(parents=True, exist_ok=True)
        av = Image.open(AVATAR).convert("RGBA")
        s = min(av.size)
        av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                      (av.width + s) // 2, (av.height + s) // 2)).resize((600, 600), Image.LANCZOS)
        masque = Image.new("L", (600, 600), 0)
        ImageDraw.Draw(masque).ellipse([0, 0, 599, 599], fill=255)
        av.putalpha(masque)
        av.save(sortie)
    return str(sortie)


class MimoletteShort(ShortBases):
    dossier_voix = VOIX

    # ── Les objets ────────────────────────────────────────────────────────────
    def moi(self, hauteur=1.3):
        img = ImageMobject(photo_ronde_png()).set_height(hauteur)
        cercle = Circle(radius=hauteur / 2, color=JAUNE_TITRE, stroke_width=4).move_to(img)
        return Group(img, cercle)

    def sachet(self, poids, couleur=ORANGE_RETENUE, h=1.5):
        corps = RoundedRectangle(width=1.35, height=h, corner_radius=0.18,
                                 stroke_color=WHITE, stroke_width=2,
                                 fill_color=couleur, fill_opacity=0.85)
        soudure = Rectangle(width=1.35, height=0.14, stroke_width=0,
                            fill_color=WHITE, fill_opacity=0.6).align_to(corps, UP)
        lab = Text(f"{poids} g", font_size=26, color=BLACK, weight=BOLD).move_to(corps)
        return VGroup(corps, soudure, lab)

    def axe(self, lo=200, hi=250, y=0.0, pas=10):
        a = NumberLine(x_range=[lo, hi, 5], length=3.9, include_numbers=False,
                       include_tip=False, color=GREY_B, stroke_width=2)
        a.move_to([0, y, 0])
        nums = VGroup(*[Text(str(v), font_size=15, color=GREY_B).next_to(a.n2p(v), DOWN, buff=0.12)
                        for v in range(lo, hi + 1, pas)])
        return a, nums

    def points(self, axe, valeurs, couleur=ORANGE_RETENUE, r=0.075):
        """Un point par sachet ; les valeurs égales s'EMPILENT."""
        vus = {}
        g = VGroup()
        for v in valeurs:
            k = vus.get(v, 0)
            vus[v] = k + 1
            g.add(Dot(axe.n2p(v) + UP * (0.18 + 0.2 * k), radius=r, color=couleur))
        return g

    def repere(self, axe, v, texte, couleur, haut=1.0, dash=True):
        base = axe.n2p(v)
        cls = DashedLine if dash else Line
        trait = cls(base + DOWN * 0.05, base + UP * haut, color=couleur, stroke_width=3)
        lab = Text(texte, font_size=16, color=couleur).next_to(trait, UP, buff=0.06)
        return VGroup(trait, lab)

    # ── Le métronome ──────────────────────────────────────────────────────────
    # ⭐ Frédéric, 28/09 : « il faut captiver l'auditeur, seconde après seconde ».
    # Chaque objet apparaît AU MOT qui le nomme : on donne des instants ABSOLUS
    # depuis le début de la phrase (mesurés à l'oreille sur la voix Julie, débit
    # +6), au lieu d'empiler des attentes qui dérivent.
    def top(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self._t0 = self.renderer.time

    def a(self, t):
        reste = self._t0 + t - self.renderer.time
        if reste > 0.02:
            self.wait(reste)

    def compteur(self, suivi, pos, font_size=52, color=JAUNE_TITRE, suffixe=" €"):
        """⭐ Frédéric, 28/09 : « le chiffre 1000 euros doit être animé vers 2000 ».
        ⛔ Pas de `DecimalNumber` : il passe par LaTeX, absent du poste. Un `Text`
        redessiné à chaque image, arrondi à la centaine pour que ça défile net."""
        def dessin():
            v = int(round(suivi.get_value() / 100.0)) * 100
            return self.grand(f"{v:,}".replace(",", " ") + suffixe,
                              font_size=font_size, color=color).move_to(pos)
        return always_redraw(dessin)

    # ── Les écrans ────────────────────────────────────────────────────────────
    def ecran_accroche(self):
        self.top("00-accroche")
        # ⭐ L'IMAGE À 1 SECONDE est POSÉE : la promesse de la miniature, le
        # sachet et le visage.
        euros = ValueTracker(1000)
        haut = self.grand("comment gagner", font_size=32, color=WHITE).move_to([0, 3.4, 0])
        cpt = self.compteur(euros, [0, 2.7, 0], font_size=58)
        jour = self.grand("par jour ?", font_size=32, color=WHITE).move_to([0, 2.05, 0])
        s = self.sachet(200, h=1.5).move_to([0.95, 0.55, 0])
        moi = self.moi(1.25).move_to([-1.05, 0.55, 0])
        self.add(haut, cpt, jour, s, moi)
        self.a(2.2)                                               # « deux mille »
        self.play(euros.animate.set_value(2000), run_time=0.8, rate_func=linear)
        self.play(euros.animate.set_value(3000), run_time=0.9, rate_func=rush_into)   # « voire plus »
        plus = self.grand("et plus !", font_size=26, color=VERT_OK).next_to(jour, RIGHT, buff=0.15)
        if plus.get_right()[0] > config.frame_width / 2 - 0.1:
            VGroup(jour, plus).arrange(RIGHT, buff=0.15).move_to([0, 2.05, 0])
        self.play(FadeIn(plus, scale=1.4), run_time=0.3)
        self.play(Wiggle(s), run_time=0.6)                        # « … avec une mimolette ? »
        self.a(5.0)
        l1 = self.grand("ils rigolent…", font_size=32, color=WHITE).move_to([0, -0.9, 0])
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.a(6.3)
        l2 = VGroup(
            self.grand("le lendemain :", font_size=24, color=GREY_B),
            self.grand("ils vont tous peser", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.08).move_to([0, -1.85, 0])
        self.play(FadeIn(l2[0]), run_time=0.3)
        self.play(GrowFromCenter(l2[1]), run_time=0.4)
        self.attendre_voix(marge=0.2)

    def ecran_pesee(self):
        self.top("01-pesee")
        titre = self.grand("sachet « 200 g »", font_size=32, color=JAUNE_TITRE).move_to([0, 3.15, 0])
        self.play(FadeIn(titre, shift=DOWN * 0.1), run_time=0.35)
        a, nums = self.axe(y=0.6)
        # ⛔ Brouillon 1 : à 1,6 de haut, « étiquette » et « moyenne » tombaient
        # SUR la liste des six pesées.
        et = self.repere(a, ETIQUETTE, "étiquette", ROUGE_ERREUR, haut=1.1)
        et[1].align_to(et[0], LEFT)   # ⛔ centré sur 200, le mot sortait à gauche
        self.play(Create(a), FadeIn(nums), FadeIn(et), run_time=0.5)
        pts = self.points(a, AVANT)
        liste = VGroup(*[Text(f"{v}", font_size=22, color=WHITE) for v in AVANT]).arrange(RIGHT, buff=0.18)
        liste.move_to([0, 2.5, 0])
        # « Je pèse. » puis une pesée par seconde environ, au mot.
        for k, (d, t) in enumerate(zip(pts, liste)):
            self.a(3.1 + 1.12 * k)
            self.play(FadeIn(t, scale=1.4), GrowFromCenter(d), run_time=0.3)
        self.play(Flash(pts[-1], color=ORANGE_RETENUE, line_length=0.2), run_time=0.4)
        self.a(10.4)                                              # « Aucun ne fait deux cents. »
        self.play(Indicate(et, color=ROUGE_ERREUR), run_time=0.7)
        self.a(12.2)                                              # « En moyenne : 225. »
        m = moyenne(AVANT)
        moy = self.repere(a, m, f"moyenne {m:.0f} g", JAUNE_TITRE, haut=1.1, dash=False)
        moy[1].align_to(moy[0], LEFT).shift(LEFT * 0.05)   # vers la droite : loin d'« étiquette »
        self.play(Create(moy[0]), FadeIn(moy[1]), run_time=0.45)
        self.a(14.2)                                              # « 25 grammes offerts »
        plus = VGroup(
            self.grand(f"+{m - ETIQUETTE:.0f} g", font_size=60, color=VERT_OK),
            self.grand("offerts, dans chaque sachet", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.1).move_to([0, -1.0, 0])
        self.play(GrowFromCenter(plus[0]), run_time=0.4)
        self.play(FadeIn(plus[1]), run_time=0.3)
        self.attendre_voix(marge=0.2)

    def ecran_budget(self):
        self.top("02-budget")
        titre = self.grand("prends le plus lourd", font_size=32, color=JAUNE_TITRE).move_to([0, 3.1, 0])
        s1 = self.sachet(200, couleur=GREY_B, h=1.5).move_to([-1.05, 1.4, 0])
        s2 = self.sachet(240, couleur=ORANGE_RETENUE, h=1.8).move_to([1.05, 1.55, 0])
        self.play(FadeIn(titre), FadeIn(s1), run_time=0.35)
        self.a(1.4)
        self.play(FadeIn(s2, shift=DOWN * 0.3), run_time=0.35)
        self.play(Circumscribe(s2, color=VERT_OK), run_time=0.6)
        self.a(2.9)                                               # « Même prix »
        prix = self.grand("même prix", font_size=26, color=WHITE).move_to([0, 0.05, 0])
        self.play(FadeIn(prix), run_time=0.3)
        self.a(3.8)
        gain = VGroup(
            self.grand("+20 %", font_size=64, color=VERT_OK),
            self.grand("de fromage", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.1).move_to([0, -1.0, 0])
        self.play(GrowFromCenter(gain[0]), FadeIn(gain[1]), run_time=0.4)
        self.a(5.8)                                               # « Mais le vrai argent… »
        usine = self.grand("le vrai argent : à l'usine", font_size=24, color=ORANGE_RETENUE).move_to([0, -2.35, 0])
        self.play(FadeIn(usine, shift=LEFT * 0.3), run_time=0.4)
        self.attendre_voix(marge=0.2)

    def ecran_pourquoi(self):
        self.top("03-pourquoi")
        titre = self.grand("pourquoi l'usine offre du fromage ?", font_size=24, color=JAUNE_TITRE).move_to([0, 3.15, 0])
        self.play(FadeIn(titre), run_time=0.35)
        # ⛔ Brouillon 1 : l'axe partait de 200, la zone interdite sortait du cadre.
        a, nums = self.axe(lo=190, hi=250, y=1.0)
        pts = self.points(a, AVANT)
        self.play(FadeIn(a), FadeIn(nums), FadeIn(pts), run_time=0.4)
        self.a(2.2)                                               # « la loi lui interdit… »
        zone = Rectangle(width=a.n2p(200)[0] - a.n2p(190)[0], height=1.4, stroke_width=0,
                         fill_color=ROUGE_ERREUR, fill_opacity=0.35)
        zone.move_to(a.n2p(200) + LEFT * zone.width / 2 + UP * 0.7)
        interdit = Text("interdit", font_size=15, color=ROUGE_ERREUR).next_to(zone, UP, buff=0.05)
        self.play(FadeIn(zone), FadeIn(interdit), run_time=0.4)
        self.play(Indicate(interdit, color=ROUGE_ERREUR), run_time=0.5)
        self.a(6.4)                                               # « de 210 à 240 »
        acc = BraceBetweenPoints(a.n2p(210) + DOWN * 0.45, a.n2p(240) + DOWN * 0.45, DOWN, color=BLEU_CALCUL)
        disp = Text("210 → 240 : ça se disperse", font_size=18, color=BLEU_CALCUL).next_to(acc, DOWN, buff=0.08)
        self.play(GrowFromCenter(acc), FadeIn(disp), run_time=0.45)
        self.a(9.6)                                               # « … a un nom : l'écart type »
        et = VGroup(
            self.grand("écart type", font_size=42, color=BLEU_CALCUL),
            self.grand(f"≈ {fr(ecart_type(AVANT))} g", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.1).move_to([0, -1.05, 0])
        self.play(GrowFromCenter(et[0]), run_time=0.4)
        self.play(FadeIn(et[1]), run_time=0.25)
        self.a(11.8)                                              # « … viser haut »
        regle = self.grand("grand écart type → viser haut", font_size=21, color=WHITE).move_to([0, -2.05, 0])
        self.play(FadeIn(regle, shift=UP * 0.1), run_time=0.35)
        self.a(14.6)                                              # « Et plus elle perd. »
        perd = self.grand("et plus elle PERD", font_size=28, color=ROUGE_ERREUR).move_to([0, -2.6, 0])
        self.play(GrowFromCenter(perd), run_time=0.35)
        self.attendre_voix(marge=0.2)

    def ecran_mathematicien(self):
        self.top("04-mathematicien")
        moi = self.moi(1.1).move_to([-1.35, 3.0, 0])
        souvenir = VGroup(
            Text("1990", font_size=28, color=JAUNE_TITRE),
            Text("stage dans l'industrie", font_size=18, color=WHITE),
        ).arrange(DOWN, buff=0.06, aligned_edge=LEFT).next_to(moi, RIGHT, buff=0.25)
        self.play(FadeIn(moi), run_time=0.35)
        self.a(1.6)                                               # « … en 1990 »
        self.play(FadeIn(souvenir, shift=LEFT * 0.2), run_time=0.4)

        def rangee(valeurs, y, couleur, nom):
            a, nums = self.axe(y=y)
            pts = self.points(a, valeurs, couleur=couleur)
            m = moyenne(valeurs)
            moy = self.repere(a, m, f"{m:.0f}", JAUNE_TITRE, haut=0.95, dash=False)
            et = self.repere(a, ETIQUETTE, "", ROUGE_ERREUR, haut=0.95)
            lab = Text(nom, font_size=17, color=couleur).move_to([-1.55, y + 1.05, 0])
            return VGroup(a, nums, et, pts, moy, lab)

        avant = rangee(AVANT, 0.85, ORANGE_RETENUE, "avant")
        apres = rangee(APRES, -1.05, VERT_OK, "après")
        self.a(4.6)                                               # « Un mathématicien entre… »
        self.play(FadeIn(avant), run_time=0.45)
        self.a(7.6)                                               # « … et il la réduit »
        self.play(TransformFromCopy(avant[3], apres[3]), FadeIn(VGroup(apres[:3], apres[4:])), run_time=0.9)
        self.a(10.0)                                              # « 220 au lieu de 225 »
        self.play(Indicate(apres[4], color=JAUNE_TITRE), run_time=0.6)
        self.a(12.6)                                              # « Cinq grammes. »
        gain = self.grand("5 g", font_size=56, color=VERT_OK).move_to([0, -2.35, 0])
        self.play(GrowFromCenter(gain), run_time=0.35)
        self.a(13.8)                                              # « Ça paraît ridicule ? »
        q = self.grand("ridicule ?", font_size=30, color=WHITE).next_to(gain, RIGHT, buff=0.25)
        self.play(FadeIn(q), run_time=0.3)
        self.attendre_voix(marge=0.2)

    def ecran_mille_euros(self):
        self.top("05-mille-euros")
        l1 = self.grand("5 g", font_size=48, color=WHITE).move_to([0, 3.0, 0])
        l2 = self.grand("× 1 000 000 sachets", font_size=30, color=WHITE).move_to([0, 2.25, 0])
        l3 = self.grand("= 5 tonnes", font_size=54, color=ORANGE_RETENUE).move_to([0, 1.35, 0])
        self.play(FadeIn(l1, scale=1.3), run_time=0.3)
        self.a(1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.a(3.0)                                               # « cinq tonnes »
        self.play(GrowFromCenter(l3), run_time=0.4)
        self.a(4.8)                                               # « Chaque année. »
        an = self.grand("chaque année", font_size=22, color=GREY_B).move_to([0, 0.65, 0])
        self.play(FadeIn(an), run_time=0.3)
        self.a(5.9)                                               # « Alors 1 000, 2 000, 3 000 »
        # ⭐ Le même compteur que l'accroche : 1 000 qui monte à 2 000, puis 3 000.
        euros = ValueTracker(1000)
        cpt = self.compteur(euros, [0, -0.25, 0], font_size=54)
        jour = self.grand("par jour de mathématicien", font_size=21, color=GREY_B).move_to([0, -0.95, 0])
        self.play(FadeIn(cpt, scale=1.4), FadeIn(jour), run_time=0.3)
        self.a(6.7)
        self.play(euros.animate.set_value(2000), run_time=0.7, rate_func=linear)
        self.a(7.5)
        self.play(euros.animate.set_value(3000), run_time=0.7, rate_func=linear)
        self.a(10.3)                                              # « C'est rentable. »
        verdict = self.grand("RENTABLE", font_size=58, color=VERT_OK).move_to([0, -2.0, 0])
        self.play(GrowFromCenter(verdict), run_time=0.35)
        self.play(Flash(verdict, color=VERT_OK, line_length=0.4), run_time=0.5)
        self.attendre_voix(marge=0.2)

    def ecran_saucisson(self):
        self.top("06-saucisson")
        titre = self.grand("et chez nous ?", font_size=36, color=JAUNE_TITRE).move_to([0, 3.15, 0])
        self.play(GrowFromCenter(titre), run_time=0.35)

        def rangee(valeurs, y, couleur, nom):
            a, nums = self.axe(lo=230, hi=270, y=y)
            pts = self.points(a, valeurs, couleur=couleur)
            lab = Text(nom, font_size=20, color=couleur).move_to([0, y + 0.85, 0])
            return VGroup(a, nums, pts, lab)

        met = rangee(METROPOLE, 1.55, BLEU_CALCUL, "métropole")
        reu = rangee(REUNION, -0.15, ORANGE_RETENUE, "La Réunion")
        self.a(2.8)                                               # « Métropole… »
        self.play(FadeIn(met), run_time=0.4)
        self.a(3.9)                                               # « … contre La Réunion »
        self.play(FadeIn(reu), run_time=0.4)
        # ⛔ Sous l'axe, l'accolade passait dessus.
        schema = Text("schéma", font_size=14, color=GREY_B).move_to([1.75, 0.7, 0])
        self.add(schema)
        self.a(5.6)                                               # « l'écart type est bien plus grand »
        acc = BraceBetweenPoints(reu[0].n2p(232) + DOWN * 0.45, reu[0].n2p(268) + DOWN * 0.45,
                                 DOWN, color=ORANGE_RETENUE)
        self.play(GrowFromCenter(acc), run_time=0.4)
        concl = self.grand("écart type bien plus grand", font_size=24, color=ORANGE_RETENUE).move_to([0, -1.55, 0])
        self.play(FadeIn(concl), run_time=0.3)
        self.a(8.2)                                               # « … de l'argent sur la table »
        argent = self.grand("de l'argent sur la table", font_size=26, color=VERT_OK).move_to([0, -2.3, 0])
        self.play(GrowFromCenter(argent), run_time=0.4)
        self.attendre_voix(marge=0.2)

    def ecran_retenir(self):
        self.top("07-retenir")
        q = self.grand("la qualité", font_size=40, color=WHITE).move_to([0, 3.0, 0])
        self.play(FadeIn(q, shift=DOWN * 0.1), run_time=0.35)
        self.a(3.5)                                               # « C'est un produit qui reste le même »
        c = self.grand("= la constance", font_size=42, color=JAUNE_TITRE).move_to([0, 2.25, 0])
        self.play(GrowFromCenter(c), run_time=0.4)
        rangee = VGroup(*[self.sachet(200, h=0.9).scale(0.62) for _ in range(5)]).arrange(RIGHT, buff=0.1)
        rangee.scale_to_fit_width(config.frame_width - 0.7).move_to([0, 1.1, 0])   # ⛔ touchait les bords
        self.play(LaggedStart(*[FadeIn(s, shift=UP * 0.2) for s in rangee], lag_ratio=0.25), run_time=1.0)
        self.a(6.9)                                               # « Les maths, ça sert à rien… »
        fin = VGroup(
            self.grand("les maths, ça sert à rien…", font_size=24, color=WHITE),
            self.grand("sauf à gagner de l'argent", font_size=27, color=VERT_OK),
            self.grand("avec une mimolette", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.14).move_to([0, -0.9, 0])
        self.play(FadeIn(fin[0]), run_time=0.35)
        self.a(8.7)
        self.play(FadeIn(fin[1], shift=UP * 0.1), run_time=0.35)
        self.a(10.0)
        self.play(GrowFromCenter(fin[2]), run_time=0.35)
        self.attendre_voix(marge=0.3)

    def construct(self):
        self.ecran_accroche()
        self.ecran_pesee()
        self.ecran_budget()
        self.ecran_pourquoi()
        self.ecran_mathematicien()
        self.ecran_mille_euros()
        self.ecran_saucisson()
        self.ecran_retenir()
        self.ecran_renvoi("08-fin")
