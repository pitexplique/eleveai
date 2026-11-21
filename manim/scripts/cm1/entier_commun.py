# entier_commun.py
# EleveAI — LE COMMUN de la série NOMBRES ENTIERS, du CM1 à la 6e (21/11/2026, poste 2).
# 11 épisodes = 22 vidéos. Voix validées par Frédéric le 21/11 (« Oui, lance la prod »).
#
# ⛔ POURQUOI UN COMMUN NEUF, ET DES COPIES PLUTÔT QUE DES IMPORTS
# Le poste 1 reprend la série Masses ce week-end. Importer `masse_commun.py` ou
# `masse_cp_estimer.py` ferait bouger NOS rendus sous nos pieds à chacun de ses commits, et un MP4
# rendu avec un commun qui a changé devient « douteux » pour toujours (manim/REGLES.md, « le SOURCE
# n'est pas le RÉSULTAT » et « on ne modifie pas le source d'un script déjà rendu »).
# On part donc de `contenance_cm1_commun` (série CM1 FINIE, personne n'y touche), et les trois
# helpers de droite graduée sont COPIÉS de manim/scripts/6e/decimal_arrondir.py.
#
# CE QUE LE COMMUN HÉRITÉ DONNE DÉJÀ (ne pas réécrire) :
#   - `TableauNum(rangs=…, virgule_apres=None)` : LE tableau de numération, avec .cases, .entetes,
#     .chiffre(i, v), .colonne(i) — le dessin central de cette série ;
#   - `personne(peau=, tenue=, cheveux=, longs=)` (+ .tete) et `casquette(p, couleur)`, `lunettes` ;
#   - la machinerie des paysages : dire/ecran, garde, au_mot/au_t, ligne/bloc/t/gros, col, gauche,
#     question_gauche/choix, pause_defi, finale_gauche/montrer_ligne, attendre_voix,
#     page_abonnement, hors_audit, l'audit de synchro et le contrôle des bords.
#
# ⚠️ LE PIÈGE DU LOT : cette série est pleine de nombres à ESPACE (12 030, 70 000 957, 6 999 999).
#   - `au_mot("12 030")` : toujours commencer l'extrait PAR le nombre (sinon on prend la marque d'avant) ;
#   - l'audit affiche « AUDIT-ABSENT 1000 » pour tout nombre à espace : il ne le vérifie pas, il faut
#     regarder la planche ;
#   - à l'écran, écrire ces nombres avec une ESPACE FINE INSÉCABLE (`ESP`, ci-dessous) : une espace
#     ordinaire laisse Manim couper le nombre en deux mots qui ne s'alignent plus.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F403

# ── L'espace des milliers ────────────────────────────────────────────────────────────────────────
# U+202F (espace fine insécable) : le groupe de chiffres reste UN seul mot pour Manim.
ESP = " "


def nb(n):
    """12030 → « 12 030 » avec l'espace fine insécable. ⛔ Passer par ici pour TOUT nombre à l'écran."""
    return f"{n:,}".replace(",", ESP)


# ── Couleurs propres à la série (jamais redéfinies ailleurs) ─────────────────────────────────────
CLASSE_MILLE = "#a78bfa"    # la classe des mille
CLASSE_UNITE = BLEU_D       # la classe des unités
CLASSE_MILLION = "#f472b6"  # la classe des millions (écran « Et au CM2 »)
ZERO_C = ORANGE_RETENUE     # le zéro qui garde la place
GARDE_C = BLEU_D            # « on garde » (arrondir)
MONTE_C = "#fb923c"         # « on monte » (arrondir)


# ── LE TABLEAU DE NUMÉRATION PAR CLASSES ────────────────────────────────────────────────────────
def tableau_classes(classes=("mille", "unités"), larg=1.05, h=0.95, fs_ent=22, fs_ban=22):
    """Le tableau de numération groupé par CLASSES de trois chiffres — le dessin que la banque
    utilise (`tableau_donnees`, « classe des mille | classe des unités »).

    `classes` : les noms, de gauche à droite (« millions », « mille », « unités »).
    Rend un VGroup avec, en plus de `TableauNum` :
      .tab       le TableauNum (cases, entetes, .chiffre(i, v))
      .bandeaux  un VGroup, un bandeau de classe au-dessus de chaque groupe de 3 colonnes
      .poser(s)  la liste des chiffres de la chaîne s, alignés à DROITE (non ajoutés)
      .case_de(i) la case de la i-ème colonne en partant de la DROITE (0 = les unités)
    """
    coul = {"millions": CLASSE_MILLION, "mille": CLASSE_MILLE, "unités": CLASSE_UNITE}
    rangs, couleurs = [], {}
    for k, cl in enumerate(classes):
        for r in ("c", "d", "u"):
            # une entête unique par colonne : TableauNum indexe ses couleurs PAR NOM de rang
            nom = f"{r}{k}"
            rangs.append(nom)
            couleurs[nom] = coul.get(cl, WHITE)
    tab = TableauNum(rangs=rangs, larg=larg, h=h, fs_ent=fs_ent, virgule_apres=None, couleurs=couleurs)
    # les entêtes montrent « c », « d », « u » et non « c0 » : on réécrit le texte en place
    for i, ent in enumerate(tab.entetes):
        lettre = ("c", "d", "u")[i % 3]
        neuf = hors_audit(Text(lettre, font_size=fs_ent, color=ent.color, weight=BOLD))
        neuf.move_to(ent)
        ent.become(neuf)
    bandeaux = VGroup()
    for k, cl in enumerate(classes):
        trio = VGroup(*[tab.cases[3 * k + j] for j in range(3)])
        c = coul.get(cl, WHITE)
        barre = RoundedRectangle(width=trio.width, height=0.42, corner_radius=0.1, fill_color=c,
                                 fill_opacity=0.22, stroke_color=c, stroke_width=3)
        barre.next_to(trio, UP, buff=0.52)
        lab = hors_audit(Text(f"classe des {cl}", font_size=fs_ban, color=c, weight=BOLD))
        k_ = min(1.0, (trio.width - 0.18) / max(lab.width, 0.01))
        lab.scale(k_).move_to(barre)
        bandeaux.add(VGroup(barre, lab))
    g = VGroup(tab, bandeaux)
    g.tab, g.bandeaux = tab, bandeaux

    def case_de(i):
        """La case i colonnes à partir de la DROITE (0 = unités, 1 = dizaines, 3 = unités de mille)."""
        return tab.cases[len(rangs) - 1 - i]

    def poser(s, couleur=WHITE, zeros=None):
        """Les chiffres de s (« 12030 », espaces ignorées) alignés à DROITE dans le tableau.
        `zeros` : une couleur pour les 0, pour montrer qu'ils gardent la place."""
        chiffres = [c for c in str(s) if c.isdigit()]
        out = VGroup()
        for j, c in enumerate(reversed(chiffres)):
            col = len(rangs) - 1 - j
            if col < 0:
                break
            cc = (zeros or couleur) if c == "0" and zeros else couleur
            out.add(tab.chiffre(col, c, cc))
        return VGroup(*reversed(out.submobjects))

    g.case_de, g.poser = case_de, poser
    return g


def etiquette_chiffre(d, s=1.0, couleur=JAUNE_TITRE, fs=46):
    """Une étiquette-chiffre (le défi « quatre étiquettes : 6, 2, 7, 9 »)."""
    carte = RoundedRectangle(width=0.78 * s, height=0.92 * s, corner_radius=0.1 * s, fill_color=CASE,
                             fill_opacity=0.9, stroke_color=couleur, stroke_width=4)
    t = hors_audit(Text(str(d), font_size=int(fs * s), color=couleur, weight=BOLD)).move_to(carte)
    g = VGroup(carte, t)
    g.carte, g.txt = carte, t
    return g


def paquets(total, par, s=1.0, couleur=VERT_OK, couleur_reste=ROUGE_ERREUR, par_ligne=6):
    """Les paquets pleins et le RESTE (multiples, défi des ballotins).
    Rend un VGroup : .pleins (les paquets complets), .reste (les unités en trop)."""
    n_pleins, reste = divmod(total, par)
    pleins = VGroup()
    for i in range(n_pleins):
        boite = VGroup(RoundedRectangle(width=0.5 * s, height=0.5 * s, corner_radius=0.07 * s, fill_color=couleur,
                                        fill_opacity=0.3, stroke_color=couleur, stroke_width=3))
        pleins.add(boite)
    if n_pleins:
        pleins.arrange_in_grid(cols=par_ligne, buff=0.14 * s)
    rest = VGroup(*[Circle(radius=0.11 * s, fill_color=couleur_reste, fill_opacity=1, stroke_width=0)
                    for _ in range(reste)])
    if reste:
        rest.arrange(RIGHT, buff=0.1 * s)
    g = VGroup(pleins, rest)
    if n_pleins and reste:
        rest.next_to(pleins, RIGHT, buff=0.45 * s)
    g.pleins, g.reste = pleins, rest
    g.n_pleins, g.n_reste = n_pleins, reste
    return g


# ── LA DROITE GRADUÉE (copiée de manim/scripts/6e/decimal_arrondir.py, 21/11) ────────────────────
# ⛔ COPIE assumée : arrondir (CM1/CM2) et encadrer (6e) en ont besoin, et `decimal_arrondir.py` est
#    un script d'épisode déjà rendu — on n'en fait pas une dépendance.
class Droite(VGroup):
    """Une droite graduée de a à b, coupée en n parts (graduations sans nombres).
    .x(v) : le point de la valeur v ; .nombre(v, s) : l'étiquette (non ajoutée) sous v."""

    def __init__(self, a, b, n=10, larg=6.0, couleur=WHITE, **kw):
        super().__init__(**kw)
        self.a, self.b, self.larg = a, b, larg
        self.ligne = Line(P(-larg / 2 - 0.25, 0), P(larg / 2 + 0.25, 0), color=couleur, stroke_width=5)
        self.grads = VGroup(*[Line(P(-larg / 2 + larg * i / n, -0.13), P(-larg / 2 + larg * i / n, 0.13),
                                   color=couleur, stroke_width=3) for i in range(1, n)])
        self.bouts = VGroup(*[Line(P(x, -0.26), P(x, 0.26), color=couleur, stroke_width=6)
                              for x in (-larg / 2, larg / 2)])
        self.add(self.ligne, self.grads, self.bouts)
        hors_audit(self)

    def x(self, v):
        return self.ligne.get_center() + RIGHT * (self.larg * ((v - self.a) / (self.b - self.a) - 0.5))

    def nombre(self, v, s=None, fs=30, couleur=WHITE, audit=False):
        t = Text(s if s is not None else nb(v), font_size=fs, color=couleur, weight=BOLD)
        if not audit:  # une graduation n'est pas « dite » : elle n'attend pas la voix
            hors_audit(t)
        return t.next_to(self.x(v), DOWN, buff=0.35)


def fixe(m):
    """Posé AU MOT par la scène : n'attend pas le retour du même nombre dans la voix
    (« 24 », redit trois secondes plus tard), mais reste contrôlé par l'audit."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


def repere(droite, v, s, couleur=AMBRE_D, fs=32, audit=False):
    """Le nombre placé : un triangle sur la droite et son écriture au-dessus."""
    tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI)
    tri.move_to(droite.x(v) + UP * 0.2)
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(tri, UP, buff=0.1)
    if not audit:
        hors_audit(t)
    g = VGroup(tri, t)
    g.tri, g.txt = tri, t
    return g


def milieu(droite, v1, v2, couleur=GRAY_B):
    """Le trait du MILIEU entre deux bornes rondes (arrondir : « avant ou après le milieu ? »)."""
    m = (v1 + v2) / 2
    tr = DashedLine(droite.x(m) + DOWN * 0.3, droite.x(m) + UP * 0.75, color=couleur, stroke_width=4,
                    dash_length=0.1)
    return hors_audit(VGroup(tr))


# ── LES 11 PERSONNAGES (un par épisode ; 6 femmes, 5 hommes) ────────────────────────────────────
# ⚠️ `ines` et `malik` existent DÉJÀ dans le commun hérité (vendeuse de jus, pompier) : nos noms
#    sont donc distincts, sinon on les écraserait pour les autres séries.
def _avec_lunettes(p, couleur="#1f2937"):
    try:
        p.add(lunettes(p, couleur))
    except Exception:
        pass
    return p


def diego(s=1.0):
    """A1 lire — Diego, cartographe : chemise verte, crayon sur l'oreille."""
    p = personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    crayon = VGroup(Rectangle(width=r * 0.14, height=r * 0.8, fill_color="#f59e0b", fill_opacity=1, stroke_width=0),
                    Triangle(fill_color="#fbbf24", fill_opacity=1, stroke_width=0).scale(r * 0.09))
    crayon[1].next_to(crayon[0], UP, buff=0)
    crayon.rotate(-0.35).move_to(c + P(r * 0.95, r * 0.1))
    p.add(crayon)
    return p


def malik_bib(s=1.0):
    """A2 comparer — Malik, bibliothécaire : gilet bordeaux, lunettes."""
    p = personne(peau="#a16207", tenue="#9f1239", cheveux="#1f2937", s=s)
    return _avec_lunettes(p)


def thomas(s=1.0):
    """A3 décomposer — Thomas, imprimeur : tablier gris, manchettes d'encre."""
    p = personne(peau="#f1c27d", tenue="#475569", cheveux="#78350f", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    tache = Circle(radius=r * 0.16, fill_color=BLEU_D, fill_opacity=1, stroke_width=0)
    tache.move_to(p.corps.get_center() + P(r * 0.55, -r * 0.3))
    p.add(tache)
    return p


def lena(s=1.0):
    """A4 arrondir — Léna, météorologue : veste bleu ciel, cheveux longs."""
    return personne(peau="#c68642", tenue="#0ea5e9", cheveux="#422006", longs=True, s=s)


def awa(s=1.0):
    """A5 multiples — Awa, fleuriste : tablier vert, fleur dans les cheveux."""
    p = personne(peau="#6b3f1d", tenue="#15803d", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    fleur = VGroup(*[Circle(radius=r * 0.13, fill_color="#f472b6", fill_opacity=1, stroke_width=0)
                     .move_to(c + P(-r * 0.95, r * 0.55) + P(0.1 * r, 0).__mul__(1) * 0)
                     for _ in range(1)])
    petales = VGroup(*[Circle(radius=r * 0.1, fill_color="#fbcfe8", fill_opacity=1, stroke_width=0)
                       .move_to(c + P(-r * 0.95 + r * 0.17 * dx, r * 0.55 + r * 0.17 * dy))
                       for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))])
    p.add(petales, fleur)
    return p


def sarah(s=1.0):
    """A6 défi — Sarah, factrice : tenue jaune, casquette bleue."""
    p = personne(peau="#f1c27d", tenue="#facc15", cheveux="#7c2d12", longs=True, s=s)
    p.add(casquette(p, "#1d4ed8"))
    return p


def ines_ctrl(s=1.0):
    """B1 rang — Inès, contrôleuse aérienne : chemise blanche, casque audio CLAIR.
    ⛔ VU SEULEMENT À L'IMAGE (aperçu -ql du 21/11) : un casque anthracite (#334155) posé sur des
    cheveux noirs faisait un CASQUE INTÉGRAL — arceau, oreillettes et calotte fondus en une seule
    masse noire, dont ne sortait qu'un petit ovale de peau ; et le micro, qui finissait à
    0,5 r du centre, passait EN TRAVERS du visage. Aucun instrument ne voit ça.
    Remède : le casque est CLAIR (gris ardoise pâle), posé au-dessus de la calotte, les oreillettes
    sont rejetées à 1,2 r (hors des mèches) et le micro descend À CÔTÉ du visage, jamais dessus."""
    p = personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    CAS = "#cbd5e1"
    arceau = Arc(radius=r * 1.22, start_angle=0.15, angle=PI - 0.3, color=CAS,
                 stroke_width=7).move_arc_center_to(c)
    oreillettes = VGroup(*[RoundedRectangle(width=r * 0.3, height=r * 0.46, corner_radius=r * 0.12,
                                            fill_color=CAS, fill_opacity=1, stroke_color="#64748b",
                                            stroke_width=2).move_to(c + P(sgn * r * 1.2, r * 0.08))
                           for sgn in (-1, 1)])
    micro = VGroup(Line(c + P(-r * 1.2, -r * 0.12), c + P(-r * 1.0, -r * 0.8), color=CAS, stroke_width=4),
                   Circle(radius=r * 0.1, fill_color=CAS, fill_opacity=1, stroke_width=0)
                   .move_to(c + P(-r * 0.97, -r * 0.88)))
    p.add(arceau, oreillettes, micro)
    return p


def noe(s=1.0):
    """B2 comparer — Noé, astronome : pull bleu nuit, lunettes."""
    p = personne(peau="#c68642", tenue="#1e3a8a", cheveux="#111827", s=s)
    return _avec_lunettes(p, "#e2e8f0")


def clara(s=1.0):
    """B3 encadrer — Clara, guide de haute montagne : veste rouge, bonnet."""
    p = personne(peau="#f1c27d", tenue="#dc2626", cheveux="#422006", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bonnet = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0,
                                  fill_color="#0f766e", fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62),
                    Rectangle(width=r * 2.1, height=r * 0.22, fill_color="#115e59", fill_opacity=1, stroke_width=0)
                    .move_to(c + UP * r * 0.58),
                    Circle(radius=r * 0.17, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
                    .move_to(c + UP * r * 1.55))
    p.add(bonnet)
    return p


def ethan(s=1.0):
    """B4 décomposer — Ethan, game designer : sweat violet, manette."""
    p = personne(peau="#6b3f1d", tenue="#7c3aed", cheveux="#111827", s=s)
    r = p.tete.width / 2
    manette = VGroup(RoundedRectangle(width=r * 1.05, height=r * 0.5, corner_radius=r * 0.2,
                                      fill_color="#1f2937", fill_opacity=1, stroke_color="#64748b", stroke_width=2),
                     Circle(radius=r * 0.08, fill_color="#ef4444", fill_opacity=1, stroke_width=0),
                     Circle(radius=r * 0.08, fill_color="#22c55e", fill_opacity=1, stroke_width=0))
    manette[1].move_to(manette[0].get_center() + P(r * 0.28, 0))
    manette[2].move_to(manette[0].get_center() + P(-r * 0.28, 0))
    manette.next_to(p.corps, RIGHT, buff=0.04).shift(DOWN * r * 0.25)
    p.add(manette)
    return p


def maya(s=1.0):
    """B5 défi — Maya, volcanologue au Piton de la Fournaise : combinaison orange, casque blanc."""
    p = personne(peau="#8d5524", tenue="#ea580c", cheveux="#111827", longs=True, s=s)
    p.add(casquette(p, "#f8fafc"))
    return p


# ── LA PLACE DE LA COCHE AU BOUT D'UNE CARTE DE CHOIX ───────────────────────────────────────────
class _CocheAuBout:
    """⛔ Le gabarit étire le libellé d'un choix jusqu'à 0,4 du bord de la carte, or le ✓ de la
    bonne réponse se pose DANS la carte, à 0,4 du bord droit : sur un libellé long il touche la
    dernière lettre. Vu à l'image sur l'écran 08 de A2 (« 3 045, 3 405, 3 450✓ », écart 1 px) ;
    ⚠️ `BORDS=1` ne voit rien, rien ne sort du cadre. Même remède que dans `4e/3e_section_*.py`.
    ⚠️ En paysage la carte vient de `_carte_choix`, PAS de `_carte` : surcharger `_carte` ne fait
    RIEN du tout, et ça ne se voit qu'à l'image.
    ⭐ Les libellés courts ne bougent pas : la ligne « COCHE-RESERVE » du rendu dit lesquels ont
    été rétrécis — A1, rendu en HD avant cette surcharge, n'en affiche aucune (mesuré, pas supposé).

    ⭐ `au_t(t)` : attendre un instant LU DANS LE WAV, pour les 29 nombres à espace de la série qui
    n'ont pas de marque (liste par épisode dans manim/INVENTAIRE-entiers-cm1-6e.md § 6bis).
    ⛔ A1 et A2, rendus avant que cette méthode existe, ne l'appellent pas : leur image est inchangée."""

    def au_t(self, t):
        """Attend l'instant t (s) DEPUIS LE DÉBUT de la voix de l'écran courant — relevé sur
        l'énergie du WAV quand WinRT n'a pas posé de marque sur le mot (nombre à espace dit deux
        fois, ou repris dans une liste de choix). Copié de cm2/longueur_estimer.py."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.02:
            self.wait(reste)

    def _carte_choix(self, lettre, txt, largeur, fs):
        c = super()._carte_choix(lettre, txt, largeur, fs)
        cadre, ligne = c
        if ligne.width > largeur - 1.0:
            print(f"COCHE-RESERVE {txt if isinstance(txt, str) else '<figure>'}", flush=True)
            ligne.scale_to_fit_width(largeur - 1.0).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return c


# ── LES DEUX BASES DE PAYSAGE ───────────────────────────────────────────────────────────────────
class PaysageEntierCM1(_CocheAuBout, PaysageContenanceCM1):
    """Lot A : les 6 épisodes servis au CM1 ET au CM2 (notion `nombre_entier`, mécanisme `aussi`).
    ⚠️ Chaque épisode porte un écran `07-cm2` qui ouvre la classe des millions (ou le critère de
    divisibilité) : décision de Frédéric le 21/11, « Oui, garde-le » — ⛔ ne pas le retirer."""
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PaysageEntier6e(_CocheAuBout, PaysageContenanceCM1):
    """Lot B : les 5 épisodes de 6e (notion `entier_nombre`).
    ⛔ `entier_lire_ecrire` n'est PAS produit : l'ancienne vidéo `6e-entier-nombre` le couvre."""
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
