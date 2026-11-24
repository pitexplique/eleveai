# manim/poste2/controler-maths-shorts-ps-espace.py
# LA PASSE MATHS des SIX SHORTS du produit scalaire (E7 a E12), terminale spe (23/11/2026).
#
# POURQUOI CE FICHIER EXISTE, et c'est un TROU D'INSTRUMENT mesure, pas une precaution.
# Les deux controles de la serie ne lisent QUE les douze paysages :
#   · `verifier-voix-espace.py`        -> « 12 episodes · 15 clips attendus chacun »
#   · `controler-maths-voix-espace.py` -> « 0 affirmation fausse sur les voix des 12 episodes »
# Les douze SHORTS n'y entrent pas (verifie a la commande : `grep -i short` sur le premier
# ne rend AUCUNE ligne). Les deux rendent donc un zero parfaitement plausible, sur un
# perimetre qui n'est pas celui qu'on croit -- exactement la faute que la note des entiers
# appelle « un audit francais pris pour un audit de maths ».
# ⛔ Donc : un « 0 faute » des deux outils de la serie ne dit RIEN des shorts.
#
# Ce script couvre les SIX shorts du produit scalaire. ⚠️ Les six de la geometrie (E1 a E6)
# restent sans passe maths executee : ce n'est pas mon territoire, c'est signale.
#
#   python -X utf8 manim/poste2/controler-maths-shorts-ps-espace.py
#   python -X utf8 manim/poste2/controler-maths-shorts-ps-espace.py --etalonner
#
# ⚠️ Comme son grand frere, il ne LIT pas les voix pour en extraire l'arithmetique : il ne
# saurait pas comprendre « moins 1 fois 2 fait moins 2 ». Les affirmations sont recopiees
# ici a la main, clip par clip, et REFAITES en Python. Deux ecritures independantes du
# meme nombre, et un desaccord qui se voit.
# ⭐ Il lit en revanche le texte des voix pour UNE chose, qui est textuelle et non
# arithmetique : que la lettre annoncee dans « Reponse X » soit bien celle du tirage.

import json
import sys
from math import acos, degrees, isclose, sqrt
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

RACINE = Path(__file__).resolve().parents[2]
VOIX = RACINE / "manim" / "voix"

FAUX = 0
VU = 0


def dit(ep, clip, affirmation, vrai):
    """Une affirmation de la voix, et le calcul qui la refait."""
    global FAUX, VU
    VU += 1
    if not vrai:
        FAUX += 1
        print(f"  ⛔ {ep} {clip} : {affirmation}")


# ---------- outils, volontairement minuscules et independants ----------
def ps(u, v):
    return sum(x * y for x, y in zip(u, v))


def norme(u):
    return sqrt(ps(u, u))


def vectoriel(u, v):
    return (u[1] * v[2] - u[2] * v[1],
            u[2] * v[0] - u[0] * v[2],
            u[0] * v[1] - u[1] * v[0])


def colineaires(u, v):
    return all(isclose(a, 0, abs_tol=1e-12) for a in vectoriel(u, v))


def se_coupent(p1, d1, p2, d2):
    """Deux droites de l'espace se coupent-elles ? Elles le font si et seulement si elles
    sont COPLANAIRES (le produit mixte s'annule) sans être parallèles.
    ⛔ Ce contrôle a d'abord été écrit `not any(isclose(0, 1) …)` — c'est-à-dire VRAI quoi
    qu'il arrive, le test creux que la note de la série nomme explicitement. Il est refait
    ici en calcul, et il peut donc avoir tort."""
    if colineaires(d1, d2):
        return False
    ecart = tuple(p2[i] - p1[i] for i in range(3))
    return isclose(ps(ecart, vectoriel(d1, d2)), 0, abs_tol=1e-12)


def dans_plan(p, eq):
    a, b, c, d = eq
    return isclose(a * p[0] + b * p[1] + c * p[2] + d, 0, abs_tol=1e-12)


def angle(u, v):
    return degrees(acos(ps(u, v) / (norme(u) * norme(v))))


def passe(faux_expres=False):
    """Toutes les affirmations numeriques des six shorts. `faux_expres` plante UNE
    faute, pour verifier que l'instrument crie (etalonnage)."""
    # Le cube ABCDEFGH dans le repere (A ; AB, AD, AE), arete 1 : le decor de la serie.
    A, B, D, E, G = (0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 1)

    # ===================== E7 · ps_espace_calculer =====================
    u, v = (1, 2, 3), (4, -1, 2)
    dit("E7", "01", "u(1;2;3) · v(4;−1;2) = 8", ps(u, v) == 8)

    u, v = (3, 0, 1), (2, 1, -1)
    attendu = 3 if faux_expres else 5
    dit("E7", "02", "bonne réponse 5", ps(u, v) == attendu)
    # le leurre B : le signe moins oublie sur le dernier produit -- et il doit DIFFERER
    # de la bonne reponse, sinon ce n'est pas un leurre.
    leurre_b = 3 * 2 + 0 * 1 + abs(1 * -1)
    dit("E7", "02b", "leurre B = 7 (signe oublié), et ≠ 5",
        leurre_b == 7 and leurre_b != ps(u, v))
    # le leurre C : le produit terme a terme -- un VECTEUR, pas un nombre : erreur de type
    dit("E7", "02b", "leurre C = le vecteur (6;0;−1), erreur de TYPE",
        tuple(a * b for a, b in zip(u, v)) == (6, 0, -1))
    dit("E7", "03", "défi u(2;−1;1) · v(3;1;5) = 10 (non dit)", ps((2, -1, 1), (3, 1, 5)) == 10)

    # ===================== E8 · ps_espace_orthogonalite =====================
    nord, est, normale_du_sol = (0, 1, 0), (1, 0, 0), (0, 0, 1)
    dit("E8", "02", "nord ⊥ est", ps(nord, est) == 0)
    # « le nord est DANS le sol » : le sol est le plan z = 0
    dit("E8", "02b", "le nord est dans le sol (z = 0)", dans_plan(nord, (0, 0, 1, 0)))
    # et il n'est PAS orthogonal au sol : il faudrait qu'il soit colineaire a la normale
    dit("E8", "02b", "le nord n'est PAS orthogonal au sol",
        not colineaires(nord, normale_du_sol))
    AB, CG = (1, 0, 0), (0, 0, 1)
    dit("E8", "03", "(AB) ⊥ (CG)", ps(AB, CG) == 0)
    # non secantes : (AB) passe par A de direction AB, (CG) passe par C de direction CG.
    C = (1, 1, 0)
    dit("E8", "03", "(AB) et (CG) ne se coupent jamais",
        not se_coupent(A, AB, C, CG))
    # ⭐ et le temoin du meme instrument : deux droites qui SE COUPENT vraiment doivent
    # etre vues. (AB) et (AD) se coupent en A. Sans ce temoin, `se_coupent` pourrait
    # repondre « non » a tout et le controle ci-dessus passerait pour la mauvaise raison.
    dit("E8", "03", "témoin : (AB) et (AD) se coupent bien, elles",
        se_coupent(A, AB, A, (0, 1, 0)))

    # ===================== E9 · ps_espace_norme_distance =====================
    dit("E9", "01", "10 km à plat + 1 km de dénivelé : un peu plus de 10, pas 11",
        isclose(sqrt(10 ** 2 + 1 ** 2), 10.0498756, rel_tol=1e-6) and sqrt(101) < 11)
    dit("E9", "02", "√(3² + 4²) = 5", isclose(sqrt(3 ** 2 + 4 ** 2), 5))
    # les deux leurres : chacun est la faute qu'il nomme, ET il diffère de la vraie valeur.
    vrai = sqrt(3 ** 2 + 4 ** 2)
    dit("E9", "02b", "leurre A = 7 (la racine distribuée), et ≠ 5",
        3 + 4 == 7 and not isclose(3 + 4, vrai))
    dit("E9", "02b", "leurre C = 25 (la racine oubliée), et ≠ 5",
        3 ** 2 + 4 ** 2 == 25 and not isclose(25, vrai))
    dit("E9", "03", "défi : norme de (2;3;6) = 7 (non dit)", isclose(norme((2, 3, 6)), 7))

    # ===================== E10 · ps_espace_angle =====================
    AG, AB = (1, 1, 1), (1, 0, 0)
    dit("E10", "01", "AG · AB = 1", ps(AG, AB) == 1)
    dit("E10", "01", "‖AG‖ = √3 et ‖AB‖ = 1",
        isclose(norme(AG), sqrt(3)) and isclose(norme(AB), 1))
    cos = ps(AG, AB) / (norme(AG) * norme(AB))
    dit("E10", "01", "cos ≈ 0,577", isclose(cos, 0.57735, abs_tol=5e-6))
    a = angle(AG, AB)
    dit("E10", "02b", "angle ≈ 54,7°, donc 55° au degré près",
        isclose(a, 54.7356, abs_tol=1e-3) and round(a) == 55)
    # les deux leurres : leur cosinus n'est PAS celui qu'on vient de calculer
    from math import cos as _cos, radians
    dit("E10", "02b", "leurre A : 45° ⟹ cos 0,71 ≠ 0,577",
        not isclose(_cos(radians(45)), cos, abs_tol=1e-3))
    dit("E10", "02b", "leurre B : 60° ⟹ cos 0,5 ≠ 0,577",
        not isclose(_cos(radians(60)), cos, abs_tol=1e-3))
    # Le defi : un produit scalaire negatif donne un angle obtus. ⛔ On ne le teste PAS sur
    # deux vecteurs opposes (l'angle y vaut exactement 180°, cas degenere qui ferait passer
    # le controle sans rien prouver) : on le teste sur plusieurs paires dont le produit
    # scalaire vaut bien −6 et qui ne sont pas colineaires.
    paires_moins_six = (((1, 2, 3), (-1, -1, -1)), ((2, 1, 0), (-2, -2, 5)), ((3, 0, 1), (-1, 4, -3)))
    for p, q in paires_moins_six:
        dit("E10", "03", f"défi : u·v = −6 sur {p}·{q} ⟹ obtus (non dit)",
            ps(p, q) == -6 and not colineaires(p, q) and 90 < angle(p, q) < 180)

    # ===================== E11 · ps_espace_plan_normal =====================
    # la normale se LIT dans les coefficients : on le verifie en testant l'orthogonalite
    # a deux vecteurs du plan, ce qui est la definition -- pas une relecture des chiffres.
    def normale_lue(eq):
        return (eq[0], eq[1], eq[2])

    def deux_vecteurs_du_plan(eq):
        """Deux vecteurs non colineaires du plan ax+by+cz+d=0, construits sans la normale."""
        a, b, c, d = eq
        pts = []
        for essai in ((1, 0, None), (0, 1, None), (1, 1, None), (0, 0, None), (2, 1, None)):
            x, y, _ = essai
            if c != 0:
                pts.append((x, y, (-d - a * x - b * y) / c))
        base = pts[0]
        cands = [tuple(p[i] - base[i] for i in range(3)) for p in pts[1:]]
        u0 = next(w for w in cands if norme(w) > 1e-9)
        v0 = next(w for w in cands if norme(w) > 1e-9 and not colineaires(u0, w))
        return u0, v0

    for ep_clip, eq, attendu_n in (
        ("01", (2, -1, 3, -5), (2, -1, 3)),
        ("02", (3, -1, 2, 4), (3, -1, 2)),
        ("03", (1, -4, 1, -9), (1, -4, 1)),
    ):
        n = normale_lue(eq)
        u0, v0 = deux_vecteurs_du_plan(eq)
        dit("E11", ep_clip, f"la normale lue {attendu_n} est bien normale au plan",
            n == attendu_n and isclose(ps(n, u0), 0, abs_tol=1e-9)
            and isclose(ps(n, v0), 0, abs_tol=1e-9) and not colineaires(u0, v0))

    n2 = (3, -1, 2)
    dit("E11", "02b", "leurre A (3;1;2) n'est pas colinéaire à la normale",
        not colineaires((3, 1, 2), n2))
    dit("E11", "02b", "leurre C (0;0;4) n'est pas colinéaire à la normale",
        not colineaires((0, 0, 4), n2))

    # ===================== E12 · ps_espace_defi =====================
    eq_bde = (1, 1, 1, -1)
    dit("E12", "01", "(BDE) : x + y + z − 1 = 0 contient B, D et E",
        all(dans_plan(p, eq_bde) for p in (B, D, E)))
    dit("E12", "01", "la normale (1;1;1) est celle de l'équation", eq_bde[:3] == (1, 1, 1))
    t = 1 / 3
    dit("E12", "01", "substitution 3t − 1 = 0 ⟹ t = 1/3", isclose(3 * t - 1, 0))
    K = (t, t, t)
    dit("E12", "01", "K = (1/3 ; 1/3 ; 1/3) est dans le plan", dans_plan(K, eq_bde))
    AK = tuple(K[i] - A[i] for i in range(3))
    dit("E12", "02b", "K est au tiers de AG",
        all(isclose(AK[i], AG[i] / 3) for i in range(3)))
    dit("E12", "02b", "leurre B, le milieu, n'est PAS dans le plan",
        not dans_plan((0.5, 0.5, 0.5), eq_bde))
    dit("E12", "02b", "leurre C, les deux tiers, n'est PAS dans le plan",
        not dans_plan((2 / 3, 2 / 3, 2 / 3), eq_bde))
    dit("E12", "03", "défi : distance A au plan = √3/3 ≈ 0,577 (non dit)",
        isclose(norme(AK), sqrt(3) / 3) and isclose(norme(AK), 0.57735, abs_tol=5e-6))


# ---------- le second controle : la LETTRE annoncee est celle du tirage ----------
# Textuel, pas arithmetique : c'est la seule chose qu'on lit dans les voix.
TIRAGE = {
    "terminale-ps-espace-calculer-short": "A",
    "terminale-ps-espace-orthogonalite-short": "C",
    "terminale-ps-espace-norme-distance-short": "B",
    "terminale-ps-espace-angle-short": "C",
    "terminale-ps-espace-plan-normal-short": "B",
    "terminale-ps-espace-defi-short": "A",
}


def lettres():
    global FAUX, VU
    for nom, attendue in TIRAGE.items():
        f = VOIX / (nom + ".json")
        VU += 1
        if not f.exists():
            FAUX += 1
            print(f"  ⛔ {nom} : voix absente")
            continue
        clips = json.loads(f.read_text(encoding="utf-8"))
        rep = clips.get("02b-reponse", "")
        if not rep.startswith(f"Réponse {attendue}"):
            FAUX += 1
            print(f"  ⛔ {nom} : la voix n'annonce pas « Réponse {attendue} » "
                  f"(elle dit : {rep[:28]}…)")
        # et la question doit bien proposer les trois lettres
        q = clips.get("02-question", "")
        VU += 1
        if not all(f"{L} :" in q for L in "ABC"):
            FAUX += 1
            print(f"  ⛔ {nom} : la question ne propose pas A, B et C")


def main():
    etalon = "--etalonner" in sys.argv
    print("PASSE MATHS — les SIX shorts du produit scalaire (E7 à E12)")
    if etalon:
        print("⚙️  ÉTALONNAGE : une faute est plantée exprès, l'instrument DOIT crier.")
    passe(faux_expres=etalon)
    lettres()
    print(f"{FAUX} affirmation(s) fausse(s) sur {VU} contrôlées")
    if etalon:
        if FAUX >= 1:
            print("✅ étalonné : l'instrument a bien crié sur la faute plantée.")
            return 0
        print("⛔ ÉTALONNAGE RATÉ : la faute plantée n'a pas été vue. "
              "Le « 0 faute » du mode normal ne prouve donc RIEN.")
        return 1
    if FAUX == 0:
        print("✅ chaque nombre dit par les six voix a été refait ici, indépendamment du .md")
        print("⚠️  ce script ne contrôle ni le ton, ni la longueur, ni ce qui s'AFFICHE.")
        print("⛔ et il ne couvre PAS les six shorts de la géométrie (E1 à E6), qui n'ont "
              "aucune passe maths exécutée.")
    return 1 if FAUX else 0


if __name__ == "__main__":
    sys.exit(main())
