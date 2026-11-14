# passe_solides_ce2.py
# Passe finale de la série SOLIDES ET ESPACE CE2 (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) : les entrées
# du manifeste (paysage + short Ti Margo par épisode). Calquée sur passe_perimetre_ce2.py : temps des
# chapitres et des questions relevés dans l'AUDIO des mp4 (passe_relatifs.mesurer), questions lues
# dans les voix validées. Le manifeste a des modifications non commitées d'autres sessions : on relit
# la copie de travail et on ajoute ou remplace SEULEMENT nos entrées.
# Le CM1 a sa propre série (cm1-solides-*). Pas de fiche CE2 : le coach.
#
#   python manim/passe_solides_ce2.py temps [slug]  → manim/sorties/ce2/maths/solides/temps.json
#   python manim/passe_solides_ce2.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_solides_ce2.py manifeste      → ajoute ou remplace les entrées ce2-solides-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "ce2" / "maths" / "solides"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "solides"
COACH = "https://www.eleveai.fr/coach/serie?classe=ce2&matiere=maths&notion=solides&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : 16, 18, 20, 22 et 24/01/2027 (manifeste relu le 14/11 : 1 paysage par jour ces jours-là, on passe à 2 paysages et 3 vidéos).
EP = [
 dict(n=1, slug="reconnaitre", micro="ce2_solide_reconnaitre", nom="Les solides", date="2027-01-16", ceinture="blanche",
      titre="Cube, pavé, boule ou cylindre : comment s'appellent ces formes ?",
      intro="Jade tient un magasin de jouets. Ce matin, elle range ses étagères : une étagère pour chaque forme. Mais comment s'appellent ces formes qu'on peut prendre dans la main ?",
      points=["un solide : une forme qu'on peut prendre dans la main",
              "le cube et le pavé : des faces plates, des carrés ou des rectangles",
              "la boule et le cylindre : ils roulent",
              "le cône et la pyramide : une pointe, mais pas la même base"],
      defi="une bille, un cube de construction et une petite canette : quel est le nom de chaque solide ?",
      chap={"00-garde": "Comment s'appellent ces formes ?", "02-solide": "Un solide", "03-cube": "Le cube",
            "04-pave": "Le pavé", "05-question": "Question 1", "06-rouler": "Ce qui roule",
            "07-pointe": "Ce qui a une pointe", "08-piege": "Le piège", "09-question": "Question 2",
            "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
      tags=["solides", "cube", "pavé", "boule", "cylindre", "cône", "pyramide", "magasin de jouets"],
      centres=["jeux-defis"],
      s_titre="Rond en bas, pointu en haut : une pyramide, tu paries ?",
      s_accroche="Ma sœur a caché un objet dans ce sac. Je ne regarde pas, je touche : c'est rond en bas… et ça pique en haut ! Une pyramide ? Pourquoi ma sœur rigole ?",
      s_toi="une boîte de conserve, c'est quel solide ?",
      s_tags=["solides", "cône", "pyramide", "sac mystère"], s_centres=["cuisine"]),
 dict(n=2, slug="decrire", micro="ce2_solide_decrire", nom="Faces, arêtes et sommets", date="2027-01-18", ceinture="jaune",
      titre="Faces, arêtes, sommets : comment compter sans en oublier ?",
      intro="Hugo est logisticien : il prépare des colis qui partent en camion. Ce colis est un cube. Il doit coller des étiquettes, mettre du scotch et protéger les coins. Combien de chaque ?",
      points=["les faces : les surfaces plates, 6 pour le cube",
              "les arêtes : là où deux faces se touchent, 4 en haut, 4 en bas, 4 debout = 12",
              "les sommets : les coins, 4 en haut et 4 en bas = 8",
              "le piège : on ne voit pas tout, il faut compter aussi ce qui est caché"],
      defi="un colis en forme de pyramide à base carrée : combien de faces, d'arêtes et de sommets ?",
      chap={"00-garde": "Comment les compter ?", "02-faces": "Les faces", "03-aretes": "Les arêtes",
            "04-sommets": "Les sommets", "05-question": "Question 1", "06-piege": "Le piège",
            "07-cache": "Ce qui est caché", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["solides", "faces", "arêtes", "sommets", "cube", "pavé", "logisticien", "colis"],
      centres=["transports", "argent-budget"],
      s_titre="4 gommettes sur mon dé, c'est fini, tu paries ?", s_ceinture="blanche",
      s_accroche="Je colle une gommette sur chaque coin de mon dé géant : 1, 2, 3, 4. C'est fini ? Je retourne le dé… dessous, il y a encore des coins tout nus !",
      s_toi="combien de sommets a une pyramide à base carrée ?",
      s_tags=["sommets", "cube", "dé", "gommettes"], s_centres=["jeux-defis"]),
 dict(n=3, slug="pyramide", micro="ce2_solide_faces_pyramide", nom="Les faces d'une pyramide", date="2027-01-20", ceinture="jaune",
      titre="Une pyramide, est-ce seulement des triangles ?",
      intro="Amina est archéologue : elle étudie les monuments très anciens. Elle fabrique une maquette en carton d'une pyramide d'Égypte. Quelles formes doit-elle découper ?",
      points=["des triangles qui montent vers la pointe",
              "une base, en dessous : un carré pour la pyramide d'Égypte",
              "4 triangles + 1 carré = 5 faces",
              "le piège : la base cachée compte aussi ; base triangulaire, rectangulaire…"],
      defi="une pyramide à base triangulaire : combien de faces en tout ?",
      chap={"00-garde": "Seulement des triangles ?", "02-triangles": "Les triangles", "03-base": "La base",
            "04-total": "Toutes les faces", "05-question": "Question 1", "06-piege": "Le piège du dessous",
            "07-bases": "D'autres bases", "08-question": "Question 2", "09-defi": "À toi de jouer",
            "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["solides", "pyramide", "faces", "base", "triangle", "archéologue", "Égypte", "maquette"],
      centres=["histoire-geographie"],
      s_titre="4 triangles, 4 pots de peinture : fini, tu paries ?", s_ceinture="blanche",
      s_accroche="Je peins ma pyramide en carton : un pot de peinture par triangle, 4 triangles, 4 pots ! Je la soulève… et dessous, il reste un carré tout blanc !",
      s_toi="une pyramide à base rectangulaire a combien de faces ?",
      s_tags=["pyramide", "faces", "peinture"], s_centres=["art-design"]),
 dict(n=4, slug="patron", micro="ce2_solide_patron", nom="Le patron du cube", date="2027-01-22", ceinture="orange",
      titre="Comment un carton à plat devient-il un cube ?",
      intro="Théo est designer d'emballages : il invente les boîtes qu'on trouve dans les magasins. Il veut une boîte en forme de cube, qu'il dessine d'abord à plat, sur un carton.",
      points=["un patron : on le découpe, on le plie, il se referme en solide",
              "le patron du cube : 6 carrés, un par face",
              "la croix : un fond, 4 côtés qui se relèvent, un couvercle qui se rabat",
              "le piège : 6 carrés en ligne ne font pas un cube"],
      defi="la croix de Théo n'a que 5 carrés : où ajouter le sixième ?",
      chap={"00-garde": "Un carton à plat", "02-patron": "Un patron", "03-six": "6 carrés",
            "04-plier": "On plie", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["solides", "patron", "patron du cube", "cube", "plier", "designer", "emballage"],
      centres=["art-design"],
      s_titre="6 carrés en ligne, et hop, un dé, tu paries ?", s_ceinture="jaune",
      s_accroche="Je fabrique un dé géant : 6 carrés de carton, collés en ligne. Je plie… je plie… C'est un tunnel ! Le dessus et le dessous sont ouverts !",
      s_toi="dans la croix, combien de carrés touchent le carré du milieu ?",
      s_tags=["patron du cube", "dé", "croix"], s_centres=["jeux-defis"]),
 dict(n=5, slug="defi", micro="ce2_solide_defi", nom="Un défi sur les solides", date="2027-01-24", ceinture="bleue",
      titre="Des indices, des arêtes à mesurer : sauras-tu tout trouver ?",
      intro="Lou est créatrice de lampes. Ses lampes ont la forme de solides, et elle pose un fil de lumière sur leurs arêtes. Deux défis l'attendent : une lampe mystère à deviner, et du fil à mesurer.",
      points=["deviner un solide avec des indices : faces, arêtes, sommets",
              "un cube a 12 arêtes, toutes de la même longueur",
              "le fil d'un cube : 12 × la longueur d'une arête",
              "le piège : 8 sommets, ce n'est pas 12 arêtes"],
      defi="une lampe en cube avec des arêtes de 10 cm, et 100 cm de fil : est-ce assez ?",
      chap={"00-garde": "Un défi sur les solides", "02-devinette": "La lampe mystère", "03-piege": "Le piège",
            "04-question": "Question 1", "05-fil": "Le fil de lumière", "06-question": "Question 2",
            "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
      tags=["solides", "arêtes", "cube", "pyramide", "devinette", "lampe", "créatrice"],
      centres=["sciences", "construction"],
      s_titre="8 spaghettis pour un cube, tu paries ?", s_ceinture="orange",
      s_accroche="Je construis un cube avec des spaghettis et des boules de pâte à modeler. Un spaghetti par arête : j'en prends 8 ! Il reste des trous partout… mon cube s'écroule !",
      s_toi="pour une pyramide à base carrée, combien de spaghettis ?",
      s_tags=["arêtes", "cube", "spaghettis", "pâte à modeler"], s_centres=["cuisine"]),
]

COMMUNS = ["solides", "géométrie dans l'espace", "maths", "CE2", "primaire", "cycle 2", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"ce2-solides-{slug}"
        if ident not in temps:
            continue
        dos = f"ce2/maths/solides/{n:02d}-{slug}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CE2"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Solides et espace d'EleveAI, en CE2."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "ce2",
            "ceinture": e["ceinture"], "serie": "Maths CE2", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #ce2"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #solides #ce2 #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "ce2", "ceinture": sc, "serie": "Maths CE2", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()] + COMMUNS + ["Shorts"],
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        })
        for x in (titre, stitre):
            if len(x) > 100:
                print(f"TITRE TROP LONG ({len(x)}) : {x}", file=sys.stderr)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        res = json.loads(TEMPS.read_text(encoding="utf-8")) if TEMPS.exists() else {}
        for e in EP:
            if filtre and filtre != e["slug"]:
                continue
            for suf in ("", "-short"):
                nom = f"ce2-solides-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['n']:02d}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                if not mp4.exists():
                    print("pas encore :", nom)
                    continue
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-solides-ce2.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
