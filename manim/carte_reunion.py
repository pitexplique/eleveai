# carte_reunion.py
# LA CARTE DE LA RÉUNION — le décor commun de la série « Maths Réel · 974 ».
#
# ── POURQUOI CE MODULE (10/09/2026) ───────────────────────────────────────────
# Frédéric, devant une carte météo de l'île : « et si on faisait des shorts sur
# la carte de la Réunion — CP jusqu'en terminale ». Une seule carte, et des
# maths différentes à chaque niveau : au CP on CONSTATE l'écart de température,
# en seconde on le MODÉLISE.
#
# ⛔ LA CARTE SE DESSINE, ELLE NE SE COPIE PAS. La capture qui a donné l'idée
# vient d'un service météo : elle ne se réutilise pas. Le contour ci-dessous est
# construit à partir de COORDONNÉES GÉOGRAPHIQUES, il n'appartient donc à
# personne — et il resservira à toute la série.
#
# ⭐ LE FAIT QUI PORTE TOUTE LA SÉRIE : quinze degrés d'écart sur soixante
# kilomètres. Saint-Gilles à 26 °C, le Maïdo à 11 °C, le même matin. Ce n'est
# pas une curiosité, c'est une fonction affine — et un enfant du CP peut déjà
# lire les deux nombres.
#
# ⚠️ LES TEMPÉRATURES SONT DES VALEURS TYPIQUES, PAS UN BULLETIN. Une vidéo vit
# des années, un bulletin météo un jour. Elles sont à faire valider par
# Frédéric, qui connait l'île mieux que n'importe quelle source.

from manim import *

# ── Le contour ────────────────────────────────────────────────────────────────
# Longitude Est, latitude Sud (négative), dans le sens des aiguilles depuis le
# nord. Vingt-trois points : assez pour que l'île soit RECONNAISSABLE, assez peu
# pour rester lisible une fois réduite à quelques centimètres dans un Short.
CONTOUR = [
    (55.45, -20.88),   # Saint-Denis
    (55.55, -20.90),   # Sainte-Marie
    (55.61, -20.91),   # Sainte-Suzanne
    (55.65, -20.96),   # Saint-André
    (55.68, -21.00),   # Bras-Panon
    (55.71, -21.03),   # Saint-Benoît
    (55.74, -21.08),   # Sainte-Anne
    (55.79, -21.13),   # Sainte-Rose
    (55.83, -21.27),   # Pointe du Tremblet
    (55.81, -21.31),   # Pointe de la Table
    (55.77, -21.36),   # Saint-Philippe
    (55.70, -21.38),   # Basse-Vallée
    (55.62, -21.39),   # Saint-Joseph
    (55.57, -21.36),   # Petite-Île
    (55.48, -21.34),   # Saint-Pierre
    (55.40, -21.30),   # Saint-Louis
    (55.36, -21.27),   # L'Étang-Salé
    (55.29, -21.17),   # Saint-Leu
    (55.23, -21.09),   # Saint-Gilles
    (55.22, -21.03),   # Boucan Canot
    (55.27, -20.99),   # Saint-Paul
    (55.29, -20.93),   # Pointe des Galets
    (55.35, -20.92),   # La Possession
]

# ── Les lieux, leur altitude et leur température typique ──────────────────────
# (nom, longitude, latitude, altitude en m, température typique en °C)
# ⭐ Le gradient qui relie les deux : environ −0,65 °C par 100 m d'altitude.
LIEUX = {
    "Saint-Gilles":     (55.23, -21.06,    0, 26),
    "Saint-Denis":      (55.45, -20.88,   20, 25),
    "Saint-Pierre":     (55.48, -21.34,   10, 25),
    "Saint-Benoît":     (55.71, -21.03,   30, 24),
    "Le Tampon":        (55.51, -21.28,  550, 22),
    "Plaine-des-Palmistes": (55.63, -21.13, 1000, 19),
    "Cilaos":           (55.47, -21.13, 1200, 18),
    "Bourg-Murat":      (55.58, -21.21, 1600, 15),
    "Le Maïdo":         (55.38, -21.07, 2200, 11),
    "Piton des Neiges": (55.48, -21.10, 3070,  6),
}

# La droite qui les relie toutes : T = T0 − PENTE × altitude.
T0 = 26.0
PENTE = 0.0065          # °C par mètre
PENTE_100 = 0.65        # °C par 100 m — la forme qui se dit à voix haute


def temperature(altitude):
    """La température prédite par le modèle affine, à l'altitude donnée."""
    return T0 - PENTE * altitude


class CarteReunion:
    """Le contour de l'île, mis à l'échelle du cadre — paysage ou vertical.

    ⚠️ `hauteur` est la hauteur VOULUE à l'écran : le contour est mis à l'échelle
    en respectant les proportions réelles de l'île (elle est presque ronde —
    environ 67 km d'est en ouest, 61 km du nord au sud).
    """

    def __init__(self, hauteur=3.6, centre=ORIGIN,
                 couleur=None, remplissage=None, opacite=0.35, epaisseur=3):
        self.lon_min = min(p[0] for p in CONTOUR)
        self.lon_max = max(p[0] for p in CONTOUR)
        self.lat_min = min(p[1] for p in CONTOUR)
        self.lat_max = max(p[1] for p in CONTOUR)

        # ⭐ Un degré de longitude ne vaut pas un degré de latitude : à 21° de
        # latitude, il fait environ 104 km contre 111. Sans cette correction,
        # l'île sort trop large de 7 % — assez pour qu'un Réunionnais le voie.
        self.kx = 104.0
        self.ky = 111.0
        larg_km = (self.lon_max - self.lon_min) * self.kx
        haut_km = (self.lat_max - self.lat_min) * self.ky
        self.echelle = hauteur / haut_km
        self.centre = np.array(centre, dtype=float)
        self.larg = larg_km * self.echelle
        self.haut = hauteur

        self.couleur = couleur if couleur is not None else GREEN_D
        self.remplissage = remplissage if remplissage is not None else GREEN_E
        self.opacite = opacite
        self.epaisseur = epaisseur

    def point(self, lon, lat):
        """Une position géographique → un point du cadre Manim."""
        cx = (self.lon_min + self.lon_max) / 2
        cy = (self.lat_min + self.lat_max) / 2
        x = (lon - cx) * self.kx * self.echelle
        y = (lat - cy) * self.ky * self.echelle
        return self.centre + np.array([x, y, 0.0])

    def lieu(self, nom):
        lon, lat, alt, t = LIEUX[nom]
        return self.point(lon, lat)

    def contour(self, lisse=True):
        """L'île, en un seul polygone fermé.

        ⭐ `lisse` arrondit le trait de côte : vingt-trois points suffisent à
        rendre l'île RECONNAISSABLE, mais laissent des angles que La Réunion n'a
        pas. Le lissage les efface sans déplacer les villes.
        """
        pts = [self.point(lon, lat) for lon, lat in CONTOUR]
        ile = Polygon(*pts, color=self.couleur, stroke_width=self.epaisseur)
        if lisse:
            ile.make_smooth()
        ile.set_fill(self.remplissage, opacity=self.opacite)
        return ile

    def mer(self):
        """Le fond marin — il remplit TOUT le cadre.

        ⛔ Pas un rectangle serré autour de l'île : on verrait ses bords, et
        l'océan aurait l'air d'une piscine (constaté au premier tirage).
        """
        r = Rectangle(width=config.frame_width, height=config.frame_height,
                      stroke_width=0)
        r.set_fill(BLUE_E, opacity=0.22).move_to(ORIGIN)
        return r

    def pastille(self, nom, texte=None, couleur=WHITE, taille=24, direction=UP, buff=0.14):
        """Un lieu : un point, et son étiquette (la température par défaut)."""
        lon, lat, alt, t = LIEUX[nom]
        p = Dot(self.point(lon, lat), color=couleur, radius=0.075)
        lab = Text(texte if texte is not None else f"{t}°",
                   font_size=taille, color=couleur)
        lab.next_to(p, direction, buff=buff)
        return VGroup(p, lab)
