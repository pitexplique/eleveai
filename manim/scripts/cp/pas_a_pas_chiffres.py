# « La belle écriture — pas à pas » : les 10 chiffres en PAYSAGE LENT.
#
# ── POURQUOI CE FICHIER EXISTE (03/11/2026) ───────────────────────────────────
# ⭐⭐ Frédéric, en 6e : un élève avec AESH (il devrait être en ULIS, pas de
# place) ne sait pas écrire. Devant les vidéos de CP, « il n'avait pas écrit
# depuis 10 ans, il a écrit ». Il demande des PAYSAGES (« les shorts sont trop
# simples »), LENTS, qui commencent par un ENCOURAGEMENT et une MÉTHODE, avec
# une QUESTION SIMPLE « pour qu'il se sente valorisé ». Les 10 chiffres d'abord,
# puis l'alphabet. Script validé le 03/11 : manim/ecriture-pas-a-pas-script-modele.md
#
# ⭐ CE QUI CHANGE PAR RAPPORT AUX SHORTS `chiffre_N.py` :
#   · la méthode en 3 images, LA MÊME que sur la fiche (`fiche_ecriture_ulis.py`) ;
#   · le tracé PAR MORCEAUX : une phrase, un morceau, le crayon s'arrête ;
#   · le doigt en l'air : l'élève fait le geste pendant la vidéo ;
#   · 3 questions à DEUX choix, 8 s pour répondre, « Bravo ! » à chaque fois.
#     Elles ne testent pas : elles font réussir.
#
# ⛔ Les tracés viennent des scènes `chiffre_N.py` (`chemin_N`) : la vidéo, le
# short et la fiche montrent le même geste.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python manim/scripts/cp/pas_a_pas_chiffres.py            → écrit les 10 JSON de voix
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-pas-a-pas-chiffre-1.json
#   python -m manim render -qh --disable_caching manim/scripts/cp/pas_a_pas_chiffres.py PasAPasChiffre1 \
#       -o eleveai-francais-cp-pas-a-pas-chiffre-1 --media_dir manim/scripts/cp/media
# ⛔ TOUJOURS --disable_caching (sinon les sons sautent sans un mot).

import importlib
import json
import sys
import wave
from pathlib import Path

import numpy as np
from manim import *

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[2]
sys.path.insert(0, str(ICI.parents[1]))  # manim/
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "seconde"))
from charte import *  # noqa: F403,E402
from mascotte import MascotteMargouillat  # noqa: E402

from chiffre_commune import etoile, groupe, main_ouverte, pomme  # noqa: E402
from lettre_commune import (  # noqa: E402
    EPS, angle_main, page_de_garde, poser_stylo, stylo_neuf, verifier,
)
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Largeur au-delà de laquelle une consigne du HAUT passe sur deux lignes :
# au-delà, elle touche le petit chiffre de rappel du coin haut gauche.
HAUT = 11.0

MOTS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"]

# ── LES MORCEAUX DU TRACÉ ─────────────────────────────────────────────────────
# (phrase, trait, fin) : le crayon va jusqu'à la proportion `fin` du trait.
# `trait = None` = LEVER DE CRAYON : on le repose au début du trait suivant.
# ⭐ Les coupures sont MESURÉES sur les chemins (relevé du 03/11, 21 points par
# trait) : le « 1 » atteint son sommet à 0,25, le « 9 » ferme son rond à 0,57…
MORCEAUX = {
    0: [("Je tourne vers la gauche, et je descends.", 0, 0.50),
        ("Je remonte de l'autre côté, et je ferme le rond.", 0, 1.0)],
    1: [("Je monte en biais, jusqu'en haut.", 0, 0.25),
        ("Je descends tout droit, jusqu'à la ligne.", 0, 1.0)],
    2: [("Je fais une petite boucle vers la droite.", 0, 0.35),
        ("Je descends en biais, jusqu'à la ligne.", 0, 0.76),
        ("Je trace un trait bien droit, vers la droite.", 0, 1.0)],
    3: [("Je fais une première boucle vers la droite.", 0, 0.42),
        ("Je reviens au milieu.", 0, 0.50),
        ("Je fais une deuxième boucle, plus grande, et je remonte.", 0, 1.0)],
    4: [("Je descends en biais, vers la gauche.", 0, 0.70),
        ("Je trace un trait droit, vers la droite.", 0, 1.0),
        ("Attention : je lève le crayon ! Je le repose en haut.", None, 0),
        ("Je descends tout droit, jusqu'à la ligne.", 1, 1.0)],
    5: [("Je trace la barre, vers la gauche.", 0, 0.18),
        ("Je descends tout droit.", 0, 0.40),
        ("Je fais une grosse panse, vers la droite.", 0, 1.0)],
    6: [("Je descends en tournant vers la gauche, comme une vague.", 0, 0.56),
        ("En bas, je fais une boucle qui remonte, et je la ferme.", 0, 1.0)],
    7: [("Je trace la barre, vers la droite.", 0, 0.28),
        ("Je descends en biais, jusqu'en bas.", 0, 1.0),
        ("Attention : je lève le crayon ! Je le repose au milieu.", None, 0),
        ("Je trace la petite barre qui traverse.", 1, 1.0)],
    8: [("Je fais une petite boucle vers la gauche.", 0, 0.24),
        ("Je descends en biais, jusqu'en bas.", 0, 0.50),
        ("Je fais un grand rond, et je remonte en croisant le trait.", 0, 0.82),
        ("Je reviens tout en haut, et je ferme.", 0, 1.0)],
    9: [("Je fais un rond vers la gauche, et je le ferme.", 0, 0.57),
        ("Sans lever le crayon, je descends tout droit.", 0, 1.0)],
}

# ⭐ LE LEURRE DE LA QUESTION 2 SE VOIT TOUT DE SUITE : forme très différente.
LEURRE = {0: 4, 1: 8, 2: 0, 3: 1, 4: 0, 5: 1, 6: 4, 7: 3, 8: 1, 9: 2}
# Question 3 : l'autre quantité est loin (écart ≥ 2), pour qu'on la voie.
AUTRE = {0: 2, 1: 4, 2: 5, 3: 6, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6}

# ⭐ LE RÉFÉRENT CORPOREL, seulement là où il est VRAI (règle du 05-06/09) :
# 1 = le nez, 2 = les deux mains, 5 = les doigts. Les autres n'en ont pas.
REFERENT = {
    1: "Un, comme ton nez. Tu n'en as qu'un !",
    2: "Deux, comme tes deux mains !",
    5: "Cinq, comme les cinq doigts de ta main !",
}


def bon_a_droite(n: int, q: int) -> bool:
    """La bonne réponse change de côté : jamais toujours à gauche."""
    return (n + q) % 2 == 0


def voix(n: int) -> dict:
    mot = MOTS[n]
    cote2 = "celui de droite" if bon_a_droite(n, 2) else "celui de gauche"
    autre = AUTRE[n]
    # « une étoile » : au féminin pour un.
    dire_n = "une" if n == 1 else mot
    dire_autre = "une" if autre == 1 else MOTS[autre]
    choix3 = (f"{dire_autre}, ou {dire_n}" if bon_a_droite(n, 3)
              else f"{dire_n}, ou {dire_autre}")
    v = {
        "00-bonjour": f"Bonjour ! Aujourd'hui, on écrit le chiffre {mot}.",
        "01-courage": "Tu vas y arriver. On va doucement, et c'est très bien comme ça.",
        "02-methode": "Voici ma méthode.",
        "03-methode-1": "Un : je pose mon crayon sur le point vert.",
        "04-methode-2": "Deux : je suis la flèche, tout doucement.",
        "05-methode-3": "Trois : quand j'ai fini, je colorie mon étoile.",
        "06-q1": "Question ! Pour commencer, où je pose mon crayon ? Sur le point vert, ou sur le point rouge ?",
        "07-q1-rep": "Sur le point vert ! Bravo, tu as retenu la méthode.",
        "08-regarde": "Regarde bien le crayon. Je le pose sur le point vert.",
    }
    for k, (phrase, _, _) in enumerate(MORCEAUX[n]):
        v[f"09-morceau-{k}"] = phrase
    v.update({
        "12-entier": "Encore une fois, en entier. Doucement.",
        "13-doigt": f"À toi ! Lève ton doigt, et trace le {mot} en l'air avec moi.",
        "14-doigt-bravo": "Super ! Ton doigt connaît le chemin.",
        "15-plus-vite": "Maintenant, un peu plus vite.",
        "16-q2": f"Question ! Lequel est le chiffre {mot} ? Celui de gauche, ou celui de droite ?",
        "17-q2-rep": f"C'est {cote2} ! Bravo, tu le reconnais déjà.",
    })
    if n == 0:
        v["18-combien"] = "Zéro, ça veut dire combien ? Regarde l'assiette : il n'y a rien dedans."
        v["20-q3"] = f"Question ! Combien de pommes dans l'assiette ? {choix3.capitalize()} ?"
        v["21-q3-rep"] = "Zéro ! Il n'y en a pas. Bravo."
    else:
        v["18-combien"] = f"{mot.capitalize()}, ça veut dire combien ? Compte avec moi."
        for i in range(1, n + 1):
            v[f"18-compte-{i}"] = MOTS[i] if i > 1 else "une"
        v["20-q3"] = f"Question ! Combien d'étoiles ? {choix3.capitalize()} ?"
        v["21-q3-rep"] = (f"{dire_n.capitalize()} étoile{'s' if n > 1 else ''} ! Bravo, tu as bien compté.")
    if n in REFERENT:
        v["19-referent"] = REFERENT[n]
    v.update({
        "22-fiche": f"Maintenant, prends ta fiche et ton crayon. Pars du point vert, et écris le {mot}, doucement.",
        "23-bravo": "Tu as très bien travaillé aujourd'hui. Bravo à toi !",
        "24-abonne": "Entraîne-toi sur éleveai point f r. Et abonne-toi !",
    })
    return v


# ── LES COULEURS ET LES PETITS DESSINS ────────────────────────────────────────
ORANGE = "#F97316"
VERT_POINT = "#22C55E"


def fleche_methode() -> VGroup:
    return Arrow(LEFT * 0.5, RIGHT * 0.5, color=ORANGE, stroke_width=10, buff=0,
                 max_tip_length_to_length_ratio=0.45)


def etoile_contour(r=0.42) -> Star:
    return Star(5, outer_radius=r, inner_radius=r * 0.45, color=JAUNE_TITRE,
                stroke_width=6).set_fill(opacity=0)


def visage() -> VGroup:
    """Pour « un, comme ton nez » : un visage de face, le nez en orange."""
    tete = Circle(radius=1.0, color=WHITE, stroke_width=6)
    yeux = VGroup(Dot([-0.36, 0.25, 0], radius=0.09), Dot([0.36, 0.25, 0], radius=0.09))
    nez = Ellipse(width=0.26, height=0.36, color=ORANGE, stroke_width=0).set_fill(ORANGE, 1)
    nez.shift(DOWN * 0.08)
    bouche = Arc(radius=0.42, start_angle=-PI * 0.78, angle=PI * 0.56, color=WHITE,
                 stroke_width=6).shift(DOWN * 0.12)
    return VGroup(tete, yeux, nez, bouche)


def assiette() -> VGroup:
    a = Ellipse(width=3.0, height=1.0, color=WHITE, stroke_width=6)
    b = Ellipse(width=2.0, height=0.6, color=GREY_B, stroke_width=3)
    return VGroup(a, b)


def traits(groupe_vm) -> list:
    """Un VGroup (4, 7) ou un VMobject nu → la liste de ses traits."""
    if groupe_vm.submobjects and not groupe_vm.get_num_points():
        return [t for t in groupe_vm.submobjects if t.get_num_points()]
    return [groupe_vm]


class _PasAPas(Scene):
    n = 1
    vertical = False
    gaucher = False

    # ── la voix ──────────────────────────────────────────────────────────────
    def dire(self, nom: str) -> float:
        chemin = RACINE / "public" / "sons" / f"cp-pas-a-pas-chiffre-{self.n}" / f"{nom}.wav"
        self.add_sound(str(chemin))
        # ⭐ L'instant de chaque clip, pour les questions et chapitres du
        # manifeste : mesuré au rendu, jamais estimé.
        print(f"TEMPS {nom} {self.renderer.time:.2f}", flush=True)
        with wave.open(str(chemin), "rb") as w:
            return w.getnframes() / float(w.getframerate())

    def texte(self, t, taille=40, couleur=WHITE, nom="texte", largeur_max=12.0):
        """⛔ Une phrase trop longue passe sur DEUX LIGNES, jamais à l'échelle
        (règle de `verifier`) : « Attention : je lève le crayon ! Je le repose
        au milieu. » mesurait 16,4 pour 13,6 utiles.
        ⛔ Les consignes du haut passent `largeur_max=11` : à 11,9 de large, « À
        toi ! Trace le six… » touchait le petit 6 du coin et se lisait « 6 À toi »."""
        m = Text(t, font_size=taille, color=couleur)
        if m.width > largeur_max:
            mots = t.split(" ")
            # La coupure la plus proche du milieu, de préférence après une ponctuation.
            def cout(i):
                g, d = " ".join(mots[:i]), " ".join(mots[i:])
                return abs(len(g) - len(d)) - (8 if g[-1] in ",:!." else 0)
            i = min(range(1, len(mots)), key=cout)
            m = VGroup(Text(" ".join(mots[:i]), font_size=taille, color=couleur),
                       Text(" ".join(mots[i:]), font_size=taille, color=couleur)
                       ).arrange(DOWN, buff=0.2)
        for ligne in (m if isinstance(m, VGroup) and not isinstance(m, Text) else [m]):
            verifier(ligne, nom)
        return m

    def chemin(self, k: int, **kw):
        mod = importlib.import_module(f"chiffre_{k}")
        return getattr(mod, f"chemin_{k}")(**kw)

    # ── la question à deux choix ─────────────────────────────────────────────
    def question(self, clip_q, clip_rep, gauche, droite, bon_droite, titre_q, y_choix=-0.6):
        titre = self.texte("Question !", 64, JAUNE_TITRE, "titre question").to_edge(UP, buff=0.5)
        sous = self.texte(titre_q, 40, WHITE, "question").next_to(titre, DOWN, buff=0.3)
        gauche.move_to(LEFT * 3.0 + UP * y_choix)
        droite.move_to(RIGHT * 3.0 + UP * y_choix)
        d = self.dire(clip_q)
        self.play(FadeIn(titre, scale=1.3), run_time=0.4)
        self.play(FadeIn(sous), FadeIn(gauche, shift=UP * 0.2), FadeIn(droite, shift=UP * 0.2),
                  run_time=0.6)
        self.wait(max(0.2, d - 1.0))
        # ⭐ 8 s POUR RÉPONDRE (5 s dans les autres paysages) : un élève lent
        # doit avoir le temps de choisir — c'est là qu'il se sent capable.
        barre = Rectangle(width=8.0, height=0.22, stroke_width=0).set_fill(BLEU_CALCUL, 1)
        barre.to_edge(DOWN, buff=0.6)
        pause = self.texte("À toi de choisir !", 34, BLEU_CALCUL, "pause").next_to(barre, UP, buff=0.2)
        self.play(FadeIn(barre), FadeIn(pause), run_time=0.3)
        self.play(barre.animate.stretch(0.01, 0, about_edge=LEFT), run_time=7.7, rate_func=linear)
        self.play(FadeOut(barre), FadeOut(pause), run_time=0.3)
        bon, faux = (droite, gauche) if bon_droite else (gauche, droite)
        cadre = SurroundingRectangle(bon, color=VERT_OK, buff=0.3, stroke_width=8, corner_radius=0.2)
        # ⭐ « Bravo ! » ENTRE les deux choix : en dessous, il sortait du cadre
        # quand les choix sont bas (question 3).
        bravo = self.texte("Bravo !", 72, VERT_OK, "bravo").move_to(UP * y_choix)
        d = self.dire(clip_rep)
        self.play(Create(cadre), faux.animate.set_opacity(0.25), run_time=0.6)
        self.play(FadeIn(bravo, scale=1.4), run_time=0.4)
        self.wait(max(0.3, d - 1.0) + 0.4)
        self.play(*[FadeOut(m) for m in (titre, sous, gauche, droite, cadre, bravo)], run_time=0.5)

    def construct(self):
        n, mot = self.n, MOTS[self.n]
        margo = MascotteMargouillat().scale(0.9).to_edge(RIGHT, buff=0.9).shift(DOWN * 0.4)

        # ── 0. LA GARDE ──────────────────────────────────────────────────────
        garde, garde_main = page_de_garde(
            self, str(n), self.chemin(n, stroke_width=12), MascotteMargouillat(),
            hauteur_cursive=1.9, notion="Les chiffres, pas à pas",
        )
        # ── 1. BONJOUR + ENCOURAGEMENT ───────────────────────────────────────
        grand = self.chemin(n, stroke_width=16, color=JAUNE_TITRE)
        grand.height = 3.0
        titre = self.texte(f"Le chiffre {mot}", 60, BLEU_CALCUL, "titre").to_edge(UP, buff=0.6)
        grand.move_to(LEFT * 2.0 + DOWN * 0.2)
        # ⚠️ En HAUT À DROITE elle touchait « Le chiffre deux » ; en bas à gauche,
        # à l'échelle 0,6, elle reste loin de « Tu vas y arriver ! » (centré).
        ceinture = echelle_ceintures("blanche", largeur=0.6).scale(0.6).to_corner(DL, buff=0.4)
        self.play(FadeOut(garde), FadeOut(garde_main), FadeIn(titre), FadeIn(grand),
                  FadeIn(margo), FadeIn(ceinture), run_time=0.3)
        self.wait(self.dire("00-bonjour"))
        # Sous le chiffre, AU-DESSUS de la ceinture (posée en bas à gauche).
        courage = self.texte("Tu vas y arriver !", 52, VERT_OK, "courage").move_to(DOWN * 2.35)
        d = self.dire("01-courage")
        self.play(FadeIn(courage, scale=1.2), run_time=0.5)
        self.wait(max(0.2, d - 0.5) + 0.3)
        self.play(*[FadeOut(m) for m in (titre, grand, courage, ceinture)], margo.animate.scale(0.7).to_corner(DR, buff=0.4))

        # ── 2. LA MÉTHODE, en trois images (les mêmes que sur la fiche) ─────
        t_meth = self.texte("Ma méthode", 60, JAUNE_TITRE, "méthode").to_edge(UP, buff=0.6)
        d = self.dire("02-methode")
        self.play(FadeIn(t_meth), run_time=0.4)
        self.wait(max(0.1, d - 0.4))
        pictos = [Dot(radius=0.32, color=VERT_POINT), fleche_methode(), etoile_contour()]
        phrases = ["1. Je pose mon crayon sur le point vert.",
                   "2. Je suis la flèche, tout doucement.",
                   "3. Quand j'ai fini, je colorie mon étoile."]
        lignes = VGroup()
        for p, ph in zip(pictos, phrases):
            t = self.texte(ph, 40, WHITE, "ligne de méthode")
            case = Rectangle(width=1.1, height=0.9, stroke_opacity=0).move_to(p)
            lignes.add(VGroup(VGroup(case, p), t).arrange(RIGHT, buff=0.4))
        lignes.arrange(DOWN, buff=0.7, aligned_edge=LEFT).next_to(t_meth, DOWN, buff=0.8)
        for ligne, clip in zip(lignes, ["03-methode-1", "04-methode-2", "05-methode-3"]):
            d = self.dire(clip)
            self.play(FadeIn(ligne, shift=RIGHT * 0.3), run_time=0.5)
            self.play(Indicate(ligne[0][1], scale_factor=1.3), run_time=0.6)
            self.wait(max(0.2, d - 1.1) + 0.3)
        self.wait(0.6)
        self.play(FadeOut(t_meth), FadeOut(lignes), FadeOut(margo))

        # ── 3. QUESTION 1 : le point vert ────────────────────────────────────
        vert = VGroup(Dot(radius=0.6, color=VERT_POINT),
                      self.texte("vert", 40, VERT_POINT, "vert")).arrange(DOWN, buff=0.3)
        rouge = VGroup(Dot(radius=0.6, color=ROUGE_ERREUR),
                       self.texte("rouge", 40, ROUGE_ERREUR, "rouge")).arrange(DOWN, buff=0.3)
        self.question("06-q1", "07-q1-rep", vert, rouge, False,
                      "Où je pose mon crayon pour commencer ?")

        # ── 4. LE GESTE, PAR MORCEAUX ────────────────────────────────────────
        importlib.import_module(f"chiffre_{n}")
        lignes_r = importlib.import_module(f"chiffre_{n}").reglure_chiffres()
        forme = self.chemin(n, stroke_width=16)
        bloc = VGroup(lignes_r, forme).scale(1.35).move_to(DOWN * 0.7)
        modele = forme.copy().set_stroke(color=GREY_D)
        les_traits = traits(forme)
        rappel = self.chemin(n, stroke_width=8, color=JAUNE_TITRE)
        rappel.height = 0.9
        rappel.to_corner(UL, buff=0.5)
        self.play(Create(lignes_r), FadeIn(modele), FadeIn(rappel), run_time=1.0)
        point = Dot(les_traits[0].get_start(), radius=0.16, color=VERT_POINT)

        # Un tracker par trait : 0 → 1. Le trait k se dessine jusqu'à sa valeur.
        avances = [ValueTracker(0.0) for _ in les_traits]
        dessins = VGroup()
        for t, a in zip(les_traits, avances):
            m = VMobject(stroke_width=16 * 1.35, stroke_color=WHITE).set_fill(opacity=0)

            def maj(mm, t=t, a=a):
                v = a.get_value()
                if v <= EPS:
                    mm.set_points(np.zeros((0, 3)))
                else:
                    mm.become(t.copy().set_stroke(color=WHITE).pointwise_become_partial(t, 0, min(v, 1)))
            m.add_updater(maj)
            dessins.add(m)
        self.add(dessins)

        modele_stylo = stylo_neuf()
        stylo = stylo_neuf()
        courant = {"k": 0}
        a_main = angle_main(self.gaucher)
        stylo.add_updater(lambda m: poser_stylo(
            m, modele_stylo, les_traits[courant["k"]], avances[courant["k"]].get_value(), a_main))

        consigne = self.texte(" ", 40)
        d = self.dire("08-regarde")
        self.play(FadeIn(point, scale=2.5), run_time=0.6)
        self.add(stylo)
        self.play(Flash(point, color=VERT_POINT, flash_radius=0.5), run_time=0.8)
        self.wait(max(0.2, d - 1.4) + 0.4)

        for k, (phrase, trait, fin) in enumerate(MORCEAUX[n]):
            nouvelle = self.texte(phrase, 40, BLEU_CALCUL, "morceau", HAUT).to_edge(UP, buff=0.55)
            d = self.dire(f"09-morceau-{k}")
            self.play(FadeOut(consigne), FadeIn(nouvelle), run_time=0.3)
            consigne = nouvelle
            if trait is None:
                # ⛔ LE LEVER SE MONTRE : le crayon disparait, puis réapparait au
                # départ du trait suivant, marqué d'un nouveau point vert.
                courant["k"] += 1
                stylo.suspend_updating()
                p2 = Dot(les_traits[courant["k"]].get_start(), radius=0.16, color=VERT_POINT)
                self.play(stylo.animate.shift(UP * 0.8).set_opacity(0), run_time=0.8)
                self.play(FadeIn(p2, scale=2.5), run_time=0.5)
                stylo.set_opacity(1)
                stylo.resume_updating()
                self.wait(max(0.3, d - 1.6))
            else:
                courant["k"] = trait
                # ⭐ Le tracé dure le temps de la phrase : il dit ce qu'il fait.
                self.play(avances[trait].animate.set_value(fin), run_time=max(2.5, d - 0.3),
                          rate_func=linear)
            self.wait(0.9)

        self.play(FadeOut(consigne), FadeOut(stylo))
        stylo.clear_updaters()

        def retracer(duree, clip=None, avec_stylo=True, titre=None):
            for a in avances:
                a.set_value(0)
            courant["k"] = 0
            if avec_stylo:
                stylo.add_updater(lambda m: poser_stylo(
                    m, modele_stylo, les_traits[courant["k"]], avances[courant["k"]].get_value(), a_main))
                self.add(stylo)
            part = duree / len(les_traits)
            for k, a in enumerate(avances):
                courant["k"] = k
                if k:
                    self.wait(0.4)  # le lever de crayon
                self.play(a.animate.set_value(1), run_time=part, rate_func=linear)
            if avec_stylo:
                stylo.clear_updaters()
                self.play(FadeOut(stylo), run_time=0.3)

        # Entier, lentement.
        t_ent = self.texte("En entier, doucement.", 40, BLEU_CALCUL, "entier").to_edge(UP, buff=0.55)
        d = self.dire("12-entier")
        self.play(FadeIn(t_ent), run_time=0.3)
        self.wait(max(0.2, d - 0.3))
        retracer(8.0)
        self.play(FadeOut(t_ent))

        # Le doigt en l'air.
        doigt = main_ouverte(1).scale(1.8).to_edge(LEFT, buff=1.4).shift(DOWN * 0.4)
        t_doigt = self.texte(f"À toi ! Trace le {mot} en l'air avec ton doigt.", 40,
                             JAUNE_TITRE, "doigt", HAUT).to_edge(UP, buff=0.55)
        d = self.dire("13-doigt")
        self.play(FadeIn(t_doigt), FadeIn(doigt, shift=UP * 0.3), run_time=0.5)
        self.wait(max(0.2, d - 0.5))
        retracer(7.0)
        t_bravo = self.texte("Super ! Ton doigt connaît le chemin.", 40, VERT_OK,
                             "doigt bravo", HAUT).to_edge(UP, buff=0.55)
        d = self.dire("14-doigt-bravo")
        self.play(FadeOut(t_doigt), FadeIn(t_bravo), run_time=0.4)
        self.wait(max(0.2, d - 0.4) + 0.3)
        self.play(FadeOut(t_bravo), FadeOut(doigt))

        # ⭐ « Plus vite » se MONTRE en deux passages, 2,0 s puis 1,2 s (règle du 07/09).
        t_vite = self.texte("Un peu plus vite !", 40, BLEU_CALCUL, "vite").to_edge(UP, buff=0.55)
        d = self.dire("15-plus-vite")
        self.play(FadeIn(t_vite), run_time=0.3)
        self.wait(max(0.1, d - 0.3))
        for duree in (2.0, 1.2):
            retracer(duree, avec_stylo=False)
            self.wait(0.4)
        self.play(*[FadeOut(m) for m in (t_vite, dessins, modele, lignes_r, point)]
                  + [FadeOut(m) for m in self.mobjects if isinstance(m, Dot) and m is not point])
        dessins.clear_updaters()

        # ── 5. QUESTION 2 : lequel est le chiffre ? ──────────────────────────
        bon_d = bon_a_droite(n, 2)
        vrai = self.chemin(n, stroke_width=14)
        faux = self.chemin(LEURRE[n], stroke_width=14)
        for c in (vrai, faux):
            c.height = 2.6
        g, dr = (faux, vrai) if bon_d else (vrai, faux)
        self.question("16-q2", "17-q2-rep", g, dr, bon_d, f"Lequel est le chiffre {mot} ?")

        # ── 6. COMBIEN ? ─────────────────────────────────────────────────────
        t_comb = self.texte(f"{mot.capitalize()}, c'est combien ?", 52, BLEU_CALCUL,
                            "combien").to_edge(UP, buff=0.6)
        d = self.dire("18-combien")
        self.play(FadeIn(t_comb), run_time=0.4)
        if n == 0:
            plat = assiette().move_to(DOWN * 0.3)
            self.play(FadeIn(plat), run_time=0.6)
            self.wait(max(0.3, d - 1.0) + 0.6)
            self.play(FadeOut(plat))
        else:
            # ⚠️ `pomme()` est dessinée petite (pour 9 en portrait) : on fixe la
            # HAUTEUR du groupe, sinon une pomme seule fait la taille d'un point.
            pommes = groupe(n, pomme, ecart=0.9)
            pommes.height = 2.4 if n <= 5 else 3.6
            if pommes.width > 11:
                pommes.width = 11
            pommes.move_to(DOWN * 0.3)
            verifier(pommes, "pommes")
            # ⭐ Les pommes sont là dès la question, PÂLES : pas d'écran vide
            # pendant « compte avec moi ». Chacune s'allume quand on la compte.
            pommes.set_stroke(width=8, opacity=0.5)
            self.play(FadeIn(pommes), run_time=0.5)
            self.wait(max(0.2, d - 0.9))
            nombres = VGroup()
            for i, p in enumerate([p for r in pommes for p in r], start=1):
                di = self.dire(f"18-compte-{i}")
                nombre = Text(str(i), font_size=48, color=JAUNE_TITRE).next_to(p, DOWN, buff=0.15)
                nombres.add(nombre)
                # Comptée, la pomme se REMPLIT : on voit ce qu'on a déjà compté.
                self.play(p[0].animate.set_stroke(opacity=1).set_fill(ROUGE_ERREUR, 0.9),
                          p[1].animate.set_stroke(opacity=1), FadeIn(nombre), run_time=0.4)
                self.wait(max(0.3, di - 0.4) + 0.25)
            self.wait(0.6)
            self.play(FadeOut(pommes), FadeOut(nombres), run_time=0.5)
        if n in REFERENT:
            dessin = (visage() if n == 1 else
                      VGroup(main_ouverte(5, gauche=True), main_ouverte(5)).arrange(RIGHT, buff=0.6)
                      if n == 2 else main_ouverte(5)).scale(1.6).move_to(DOWN * 0.4)
            leg = self.texte(REFERENT[n], 44, JAUNE_TITRE, "référent").to_edge(DOWN, buff=0.6)
            d = self.dire("19-referent")
            self.play(FadeIn(dessin), FadeIn(leg), run_time=0.6)
            if n == 1:
                self.play(Indicate(dessin[2], scale_factor=1.6, color=ORANGE), run_time=1.0)
            self.wait(max(0.3, d - 1.6) + 0.5)
            self.play(FadeOut(dessin), FadeOut(leg))
        self.play(FadeOut(t_comb))

        # ── 7. QUESTION 3 : combien ? ────────────────────────────────────────
        bon_d = bon_a_droite(n, 3)
        if n == 0:
            objets = assiette().scale(0.7).move_to(UP * 0.4)
            titre_q = "Combien de pommes dans l'assiette ?"
        else:
            objets = groupe(n, etoile, ecart=0.8)
            objets.height = 1.2 if n <= 5 else 2.0
            objets.set_stroke(width=6).set_fill(JAUNE_TITRE, 0.85)
            if objets.width > 10:
                objets.width = 10
            objets.move_to(UP * (0.7 if n <= 5 else 0.5))
            titre_q = "Combien d'étoiles ?"
        verifier(objets, "étoiles")
        self.play(FadeIn(objets), run_time=0.4)
        vrai = self.chemin(n, stroke_width=12)
        faux = self.chemin(AUTRE[n], stroke_width=12)
        for c in (vrai, faux):
            c.height = 1.4
        g, dr = (faux, vrai) if bon_d else (vrai, faux)
        # Les choix descendent sous les objets.
        self.question("20-q3", "21-q3-rep", g, dr, bon_d, titre_q, y_choix=-1.6)
        self.play(FadeOut(objets))

        # ── 8. LA FICHE ──────────────────────────────────────────────────────
        png = RACINE / "public" / "fiches-ecriture" / "mon-cahier" / f"cahier-ecriture-chiffre-{n}.png"
        fiche = ImageMobject(str(png)).set_height(6.6)
        t_fiche = VGroup(
            self.texte("Prends ta fiche", 52, JAUNE_TITRE, "fiche 1"),
            self.texte("et ton crayon.", 52, JAUNE_TITRE, "fiche 2"),
            self.texte("Pars du point vert,", 40, WHITE, "fiche 3"),
            self.texte(f"et écris le {mot},", 40, WHITE, "fiche 4"),
            self.texte("doucement.", 40, WHITE, "fiche 5"),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        # ⛔ L'ENSEMBLE se centre : posé à droite de la fiche, le texte sortait
        # de l'écran (« doucemer… ») — `verifier` mesure une largeur, pas une place.
        Group(fiche, t_fiche).arrange(RIGHT, buff=0.7).move_to(ORIGIN)
        assert t_fiche.get_right()[0] < config.frame_width / 2 - 0.3, "texte de la fiche hors cadre"
        d = self.dire("22-fiche")
        self.play(FadeIn(fiche, shift=RIGHT * 0.3), FadeIn(t_fiche), FadeOut(rappel), run_time=0.6)
        self.wait(max(0.3, d - 0.6) + 0.8)
        self.play(FadeOut(fiche), FadeOut(t_fiche))

        # ── 9. BRAVO + FIN ───────────────────────────────────────────────────
        margo = MascotteMargouillat().scale(1.0).to_edge(RIGHT, buff=1.0)
        t_b = VGroup(self.texte("Tu as très bien travaillé", 54, VERT_OK, "bravo 1"),
                     self.texte("aujourd'hui.", 54, VERT_OK, "bravo 2"),
                     self.texte("Bravo à toi !", 64, JAUNE_TITRE, "bravo 3")
                     ).arrange(DOWN, buff=0.3).move_to(LEFT * 2.2)
        d = self.dire("23-bravo")
        self.play(FadeIn(margo), FadeIn(t_b, scale=0.9), run_time=0.6)
        self.wait(max(0.3, d - 0.6) + 0.5)
        self.play(FadeOut(t_b))
        site = self.texte("eleveai.fr", 72, WHITE, "site")
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.3, stroke_width=6, corner_radius=0.2)
        fin = VGroup(
            self.texte("Entraîne-toi sur", 48, BLEU_CALCUL, "fin 1"),
            VGroup(site, cadre),
            self.texte("Abonne-toi !", 56, JAUNE_TITRE, "fin 2"),
            self.texte("@eleveai974", 40, WHITE, "fin 3"),
        ).arrange(DOWN, buff=0.35).move_to(LEFT * 2.2)
        d = self.dire("24-abonne")
        self.play(FadeIn(fin), run_time=0.5)
        self.wait(max(0.3, d - 0.5) + 1.5)


# Une classe par chiffre : PasAPasChiffre0 … PasAPasChiffre9.
for _n in range(10):
    globals()[f"PasAPasChiffre{_n}"] = type(f"PasAPasChiffre{_n}", (_PasAPas,), {"n": _n})


if __name__ == "__main__":
    for k in range(10):
        f = RACINE / "manim" / "voix" / f"cp-pas-a-pas-chiffre-{k}.json"
        f.write_text(json.dumps(voix(k), ensure_ascii=False, indent=2), encoding="utf-8")
        print(f)
