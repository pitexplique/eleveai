# passe_demi_droite.py
# Passe finale de la série « Repérer sur une demi-droite graduée » (6e, une paysage
# par micro) et de la paysage commune CM1/CM2 decimal_droite + son short Ti Margo
# (08/11/2026). Calquée sur passe_decimaux.py : les temps des chapitres et des
# questions sont relevés dans l'AUDIO de chaque mp4 (corrélation avec les WAV des
# clips), jamais estimés. Les shorts Manim 6e (6e-demi-droite-short-*) existent
# déjà et restent tels quels.
# Le manifeste a des modifications non commitées d'autres sessions : on sauvegarde,
# on relit la copie de travail et on ajoute seulement ; `--base HEAD` écrit la même
# insertion à partir de la version committée (pour committer NOS entrées seules).
#
#   python manim/passe_demi_droite.py temps      → temps.json à côté des vidéos
#   python manim/passe_demi_droite.py voir       → les entrées, sans rien écrire
#   python manim/passe_demi_droite.py manifeste  → ajoute ou remplace nos entrées
#   python manim/passe_demi_droite.py manifeste-head <sortie.json>  → idem sur la version HEAD

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SORTIES / "6e" / "maths" / "demi-droite-graduee" / "temps.json"
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre

COACH = "https://www.eleveai.fr/coach/serie?classe={classe}&matiere=maths&notion={notion}&microId={micro}&display=simple"
NOTION6 = "demi_droite_graduee"
FICHE6 = "https://www.eleveai.fr/fiches-cours/maths/6e/demi-droite-graduee"
EXOS6 = "https://www.eleveai.fr/fiches-exercices/maths/6e/demi-droite-graduee"
COMMUNS6 = ["demi-droite graduée", "abscisse", "maths", "6e", "collège", "cycle 3", "CRPE", "EleveAI"]

# Les 4 paysages 6e (le short de chaque micro est le short Manim déjà fait).
EP6 = [
    dict(n=1, slug="lire", micro="abscisse_lire", ceinture="blanche", nom="Lire une abscisse",
         titre="Où est le ravitaillement du trail ?", voix="6e-demi-droite-lire",
         short="6e-demi-droite-short-lire",
         intro="Inès organise des courses de trail. Sur son plan, le sentier devient une demi-droite graduée. Où est le ravitaillement ? Et le photographe ?",
         points=["l'origine vaut 0, les traits sont à la même distance",
                 "avant de lire, je trouve le pas : ce que vaut un saut",
                 "je compte les SAUTS depuis l'origine, pas les traits",
                 "un pas de 1, de 0,5, de 0,1 : on le calcule"],
         defi="0 et 1 avec 5 sauts entre les deux : quelle est l'abscisse du point F ?",
         chap={"00-garde": "Où est-on sur le parcours ?", "02-origine": "L'origine et l'abscisse", "03-pas": "Trouver le pas",
               "04-lire-un": "Lire une abscisse", "05-question": "Question 1", "06-demi-pas": "Un pas de 0,5",
               "08-question": "Question 2", "09-dixiemes-pas": "Un pas de 0,1", "11-question": "Question 3",
               "12-defi": "À toi de jouer", "12b-correction": "Correction", "13-finale": "Ce que tu as appris"},
         qs=[("05-question", "On lit 0 et 20, avec 4 sauts entre les deux. Que vaut le pas ?", ["1 km", "4 km", "5 km"], 2,
              "20 ÷ 4 = 5 : un saut vaut 5 km. Un saut ne vaut pas toujours 1."),
             ("08-question", "Le pas vaut 0,5. Quelle est l'abscisse du point S ?", ["4", "2", "2,5"], 1,
              "Je compte les sauts : 0,5 ; 1 ; 1,5 ; 2. 4 compte les traits, 2,5 compte le trait de l'origine."),
             ("11-question", "Le pas vaut 0,1. Quelle est l'abscisse du point M ?", ["13", "1,3", "4"], 1,
              "10 sauts de 0,1 mènent à 1, puis 3 sauts : 1,3.")],
         tags=["lire une abscisse", "pas d'une graduation", "trail", "course à pied", "organisatrice de courses"],
         centres=["sport", "course-trail"]),
    dict(n=2, slug="placer", micro="abscisse_placer", ceinture="jaune", nom="Placer un nombre décimal",
         titre="38,3 °C : où est-ce sur le thermomètre ?", voix="6e-demi-droite-placer",
         short="6e-demi-droite-short-placer",
         intro="Karim est infirmier. Il prend la température d'une patiente : 38,3 degrés. Son thermomètre est gradué. À partir de 38, c'est la fièvre. Où se trouve 38,3 ?",
         points=["d'abord le pas : 10 sauts entre 0 et 1, chacun vaut 0,1",
                 "2,3 : 2 grands sauts, puis 3 petits sauts",
                 "quand le pas vaut 0,5 : placer entre deux traits",
                 "zoomer entre 38 et 39 pour être précis"],
         defi="37,8 degrés : combien de petits sauts après 37 ? La fièvre est-elle tombée ?",
         chap={"00-garde": "Où se trouve 38,3 ?", "02-pas": "D'abord, le pas", "03-placer": "Placer 2,3",
               "04-question": "Question 1", "05-demi": "Un pas de 0,5", "06-question": "Question 2",
               "07-zoom": "Le zoom du thermomètre", "08-defi": "À toi de jouer", "08b-correction": "Correction",
               "09-finale": "Ce que tu as appris"},
         qs=[("04-question", "Quel point a pour abscisse 2,3 ?", ["le point A", "le point B", "le point C"], 0,
              "2 grands sauts, puis 3 petits sauts. B est sur 2,2 : on a compté les traits, pas les sauts."),
             ("06-question", "Le pas vaut 0,5. Où se place 3,7 ?", ["entre 3 et 3,5", "entre 3,5 et 4", "7 traits après 3"], 1,
              "3,7 est plus grand que 3,5 et plus petit que 4. 7 traits après 3, ce serait un pas de 0,1.")],
         tags=["placer un nombre décimal", "demi-droite graduée", "thermomètre", "fièvre", "infirmier", "santé"],
         centres=["corps-sante"]),
    dict(n=3, slug="fraction", micro="abscisse_fraction", ceinture="orange", nom="Placer une fraction",
         titre="3/4 de litre : jusqu'où verser le lait ?", voix="6e-demi-droite-fraction",
         short="6e-demi-droite-short-fraction",
         intro="Chloé est pâtissière. Sa recette de crêpes dit : 3 quarts de litre de lait. Son verre doseur est gradué en quarts. Jusqu'où verser ?",
         points=["le dénominateur : en combien de parts égales on coupe l'unité",
                 "le numérateur : combien de sauts on fait depuis 0",
                 "7/4 dépasse 1 : 4 quarts font 1",
                 "le piège : compter les sauts, pas les traits ; en dixièmes, 7/10 = 0,7"],
         defi="place 5/3 sur une droite où l'unité est coupée en 3.",
         chap={"00-garde": "Où se trouve 3/4 ?", "02-coucher": "Le verre doseur couché", "03-denominateur": "Le dénominateur",
               "04-numerateur": "Le numérateur", "05-question": "Question 1", "06-sept-quarts": "7/4, plus grand que 1",
               "07-question": "Question 2", "08-piege": "Le piège des traits", "09-dixiemes": "En dixièmes",
               "10-question": "Question 3", "11-defi": "À toi de jouer", "11b-correction": "Correction",
               "12-finale": "Ce que tu as appris"},
         qs=[("05-question", "L'unité est coupée en 5. Le point est sur le 2e trait après 0. Son abscisse ?", ["3/5", "2/5", "2"], 1,
              "On compte les sauts depuis 0 : 2 sauts d'un cinquième. Le trait de 0 ne compte pas."),
             ("07-question", "Entre quels nombres entiers se place 9/4 ?", ["entre 0 et 1", "entre 9 et 10", "entre 2 et 3"], 2,
              "4 quarts font 1, 8 quarts font 2 : 9/4, c'est 2 plus 1 quart."),
             ("10-question", "Droite graduée en dixièmes : quel nombre est au 3e trait après 0 ?", ["3/4", "3/10", "3"], 1,
              "Chaque saut vaut 1 dixième : 3/10. 3/4 n'est pas là !")],
         tags=["placer une fraction", "fraction sur une demi-droite", "numérateur", "dénominateur", "pâtissière", "cuisine"],
         centres=["cuisine"]),
    dict(n=4, slug="graduer", micro="abscisse_graduer", ceinture="orange", nom="Graduer une demi-droite",
         titre="Comment graduer une barre de vie en quarts ?", voix="6e-demi-droite-graduer",
         short="6e-demi-droite-short-graduer",
         intro="Inès est game designer. Dans son jeu, le héros a une barre de vie. Elle veut la graduer en quarts : où tracer les traits pour que chaque quart soit juste ?",
         points=["choisir l'unité : la longueur qui vaut 1",
                 "trouver le pas : 12 cm ÷ 4 = 3 cm",
                 "reporter le pas : des sauts tous égaux",
                 "une demi-droite continue après 1"],
         defi="8 cm pour 1, gradué en quarts : tous les combien de cm, et où écrire 3/4 ?",
         chap={"00-garde": "Comment graduer en quarts ?", "03-unite": "Choisir l'unité", "04-pas": "Trouver le pas",
               "05-reporter": "Reporter le pas", "07-question": "Question 1", "08-piege": "Le piège des sauts inégaux",
               "09-demi-droite": "Une demi-droite", "10-question": "Question 2", "11-defi": "À toi de jouer",
               "11b-correction": "Correction", "12-finale": "Ce que tu as appris"},
         qs=[("07-question", "Pour couper la barre en 4 parts égales, combien de traits à l'intérieur ?", ["4", "3", "5"], 1,
              "Les deux bouts sont déjà là : 4 parts, mais 3 traits à l'intérieur."),
             ("10-question", "10 cm valent 1, gradués en cinquièmes. À combien de cm du 0 est le trait 3/5 ?", ["3 cm", "6 cm", "5 cm"], 1,
              "Un saut mesure 10 ÷ 5 = 2 cm ; trois sauts : 3 × 2 = 6 cm.")],
         tags=["graduer une demi-droite", "graduer un segment", "pas", "unité", "game designer", "jeux vidéo"],
         centres=["jeux-video"]),
]

# La paysage commune CM1/CM2 (une voix, deux gardes) et son short Ti Margo.
CM = dict(
    micro="decimal_droite", notion="nombre_decimal", voix="commun-cm-decimal-droite",
    titre="L'école est à 0,7 km : où s'arrête le bus ? — Un décimal sur une droite graduée",
    intro="Inès est conductrice de bus. Sa ligne part du dépôt, au kilomètre 0, jusqu'à la gare, au kilomètre 1. La route est partagée en 10 parts égales. L'arrêt de l'école est à 0,7 km : où est-il ?",
    points=["10 parts égales entre deux entiers : chaque saut vaut 1 dixième, 0,1",
            "0,7 : on part de 0 et on fait 7 sauts",
            "le piège : on compte les sauts, pas le trait du départ",
            "0,08 n'est pas 0,8 ; 0,5 et 0,50, c'est la même place",
            "entre 2 et 3 : on part de 2, pas de 0"],
    defi="placer 4,6 km sur une droite qui va de 4 à 5.",
    chap={"00-garde": "Où se trouve 0,7 ?", "02-methode": "La méthode : 10 parts, 7 sauts", "03-piege": "Le piège des traits",
          "04-question": "Question 1", "05-centiemes": "0,08 ou 0,8 ?", "06-milieu": "Le milieu : 0,5",
          "07-apres": "Après 1", "08-question": "Question 2", "09-defi": "À toi de jouer",
          "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
    qs=[("04-question", "Le bus est au point bleu. Quel nombre ?", ["0,7", "0,06", "0,6"], 2,
         "Depuis 0, il y a 6 sauts de 1 dixième : 0,6. Pas 0,7 : le trait du départ ne compte pas."),
        ("08-question", "Cette droite va de 2 à 3. Où est le point bleu ?", ["0,4", "2,4", "2,5"], 1,
         "On part de 2, pas de 0. Puis 4 sauts de 1 dixième : 2,4.")],
    tags=["placer un nombre décimal", "droite graduée", "dixièmes", "conductrice de bus", "transports"],
    centres=["transports"],
    # Le short (rempli d'après le rapport de l'agent).
    s_titre="Tu paries que mon bus s'arrête pile à l'école ?",
    s_accroche="Ti Margo conduit le bus. L'école est à 0,7 km : il compte 7 traits... et s'arrête trop tôt ! Le trait du départ ne compte pas : on compte les SAUTS de 0,1.",
    s_toi="la route va de 3 à 4 km. Le bus part de 3 et fait 4 sauts. À quel kilomètre est-il ?",
    s_q=("02-question", "Pour aller de 0 à 0,7, combien de sauts fait le bus ?", ["6 sauts", "7 sauts", "8 sauts"], 1,
         "Chaque saut vaut 1 dixième. 7 sauts : 0,7."), s_tags=["droite graduée", "dixièmes", "bus"], s_centres=["transports"],
)
COMMUNS_CM = {"cm1": ["nombres décimaux", "maths", "CM1", "école", "cycle 3", "CRPE", "EleveAI"],
              "cm2": ["nombres décimaux", "maths", "CM2", "école", "cycle 3", "CRPE", "EleveAI"]}


def chapitres(chap, t, duree):
    """Les chapitres, au son ; un chapitre de moins de 10 s est fondu dans le précédent."""
    cles = list(chap)
    debuts = [0.0] + [t[c] for c in cles[1:]]
    res = []
    for i, c in enumerate(cles):
        fin = debuts[i + 1] if i + 1 < len(cles) else duree
        if res and fin - debuts[i] < 10:
            print("  chapitre fondu :", c, chap[c], file=sys.stderr)
            continue
        res.append((debuts[i], chap[c]))
    return [[mmss(d), lib] for d, lib in res]


def mp4s():
    """(nom de voix, mp4) de chaque vidéo à mesurer."""
    out = []
    for e in EP6:
        out.append((e["voix"], SORTIES / f"6e/maths/demi-droite-graduee/{e['n']:02d}-{e['slug']}/eleveai-maths-6e-demi-droite-{e['slug']}.mp4"))
    out.append((CM["voix"], SORTIES / "cm1/maths/nombres-decimaux/decimal-droite/eleveai-maths-cm1-decimal-droite.mp4"))
    out.append((CM["voix"] + "-short", SORTIES / "cm1/maths/nombres-decimaux/decimal-droite/eleveai-maths-cm1-decimal-droite-short.mp4"))
    return out


def qs(liste, t):
    return [dict(t=mmss(t[c]), question=q, choix=ch, reponse=r, explication=x) for c, q, ch, r, x in liste]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP6:
        n, slug = e["n"], e["slug"]
        dos = f"6e/maths/demi-droite-graduee/{n:02d}-{slug}"
        nom = f"eleveai-maths-6e-demi-droite-{slug}"
        coach = COACH.format(classe="6e", notion=NOTION6, micro=e["micro"])
        t = temps[e["voix"]]
        nq = len(e["qs"])
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += f"\n\n⏸ {nq} questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {FICHE6}\n• les exercices corrigés : {EXOS6}\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} sur 4 de la série « Repérer sur une demi-droite graduée » d'EleveAI, en 6e."
        out.append({
            "id": f"6e-demi-droite-{slug}", "pas_avant": PAS_AVANT, "notionId": NOTION6, "microId": e["micro"], "classe": "6e",
            "ceinture": e["ceinture"], "serie": "Maths 6e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": f"{e['titre']} — {e['nom']} — épisode {n} · Maths 6e", "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "fiche": FICHE6, "fiche_exercices": EXOS6, "tags": e["tags"] + COMMUNS6, "questions": qs(e["qs"], t["clips"]),
            "centres": e["centres"],
        })
    t = temps[CM["voix"]]
    for classe, ceinture in (("cm1", "verte"), ("cm2", "jaune")):
        dos = f"{classe}/maths/nombres-decimaux/decimal-droite"
        nom = f"eleveai-maths-{classe}-decimal-droite"
        coach = COACH.format(classe=classe, notion=CM["notion"], micro=CM["micro"])
        fiche = f"https://www.eleveai.fr/fiches-cours/maths/{classe}/nombre-decimal"
        acc = CM["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in CM["points"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {ceinture}.\nUn défi en fin de vidéo, avec sa correction : {CM['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {fiche}\n• la série du coach sur cette compétence : {coach}"
        v = {
            "id": f"{classe}-decimal-droite", "pas_avant": PAS_AVANT, "notionId": CM["notion"], "microId": CM["micro"], "classe": classe,
            "ceinture": ceinture, "serie": f"Maths {classe.upper()}", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": f"{CM['titre']} · Maths {classe.upper()}", "accroche": acc,
            "chapitres": chapitres(CM["chap"], t["clips"], t["duree"]),
            "fiche": fiche, "tags": CM["tags"] + COMMUNS_CM[classe], "questions": qs(CM["qs"], t["clips"]), "centres": CM["centres"],
        }
        if classe == "cm2":
            v["meme_video_que"] = "cm1-decimal-droite"
        out.append(v)
        if CM["s_titre"]:
            ts = temps[CM["voix"] + "-short"]
            sdos = "cm1/maths/nombres-decimaux/decimal-droite"
            sacc = CM["s_accroche"] + "\n\nFilm d'animation 3D, voix de synthèse.\n🥋 Ceinture blanche : la version 100 % visuelle."
            sacc += f"\n👉 À toi : {CM['s_toi']} Réponds en commentaire !"
            sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #decimaux #{classe}"
            s = {
                "id": f"{classe}-decimal-droite-short", "pas_avant": PAS_AVANT, "notionId": CM["notion"], "microId": CM["micro"], "classe": classe,
                "ceinture": "blanche", "serie": f"Maths {classe.upper()}", "type": "short", "renvoie_vers": f"{classe}-decimal-droite",
                "fichier": f"{sdos}/eleveai-maths-cm1-decimal-droite-short.mp4",
                "miniature": f"{sdos}/eleveai-maths-cm1-decimal-droite-short-miniature.png",
                "titre": f"{CM['s_titre']} #maths #{classe}", "accroche": sacc,
                "tags": CM["s_tags"] + ["Ti Margo", "film d'animation 3D", "ceinture blanche"] + COMMUNS_CM[classe] + ["Shorts"],
                "questions": qs([CM["s_q"]], ts["clips"]) if CM["s_q"] else [], "centres": CM["s_centres"],
            }
            if classe == "cm2":
                s["meme_video_que"] = "cm1-decimal-droite-short"
            out.append(s)
    for v in out:
        if len(v["titre"]) > 100:
            print(f"TITRE TROP LONG ({len(v['titre'])}) : {v['titre']}", file=sys.stderr)
    return out


def inserer(texte):
    data = json.loads(texte)
    neuves = entrees()
    ids = {n["id"] for n in neuves}
    for v in data["videos"]:
        if v["id"] in ids and v.get("url"):
            raise SystemExit("déjà publiée : " + v["id"])
    avant = len(data["videos"])
    data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
    sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if "\r\n" in texte:
        sortie = sortie.replace("\n", "\r\n")
    return sortie, avant, len(data["videos"])


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for nom, mp4 in mp4s():
            if not mp4.exists():
                print("pas encore de vidéo :", mp4)
                continue
            clips, duree = mesurer(nom, mp4)
            res[nom] = {"duree": duree, "clips": clips}
            print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-demi-droite.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_bytes().decode("utf-8")
        sortie, avant, apres = inserer(texte)
        MANIFESTE.write_bytes(sortie.encode("utf-8"))
        print("manifeste :", avant, "→", apres, "sauvegarde", sauve)
    elif mode == "manifeste-head":
        texte = subprocess.run(["git", "show", "HEAD:manim/manifeste-youtube.json"], cwd=RACINE,
                               capture_output=True, check=True).stdout.decode("utf-8")
        sortie, avant, apres = inserer(texte)
        Path(sys.argv[2]).write_bytes(sortie.encode("utf-8"))
        print("manifeste HEAD :", avant, "→", apres, "→", sys.argv[2])


if __name__ == "__main__":
    main()
