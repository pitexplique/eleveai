# passe_solides_cm2.py
# Passe finale de la série SOLIDES CM2 (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) : les entrées
# du manifeste (paysage + short Ti Margo par épisode). Copie de passe_solides_cm1.py (classe cm2) : temps des
# chapitres et des questions relevés dans l'AUDIO des mp4, questions lues dans les voix validées. Le manifeste
# a des modifications non commitées d'autres sessions : on relit la copie de travail et on ajoute ou remplace
# SEULEMENT nos entrées.
#
#   python manim/passe_solides_cm2.py temps [slug]  → manim/sorties/cm2/maths/solides/temps.json
#   python manim/passe_solides_cm2.py voir           → affiche les entrées sans rien écrire
#   python manim/passe_solides_cm2.py manifeste      → ajoute ou remplace les entrées cm2-solides-<slug>[-short]
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "cm2" / "maths" / "solides"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
NOTION = "solide"  # la notion CM2 du coach s'appelle « solide »
COACH = "https://www.eleveai.fr/coach/serie?classe=cm2&matiere=maths&notion=solide&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "verte": "Ceinture verte", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Dates : 27/03 → 01/04/2027, réservées dans manim/PLAN-perimetre-aire-volume.md (CM2), 1 paysage + son short par jour.
EP = [
 dict(n=1, slug="reconnaitre", micro="solide_reconnaitre", nom="Reconnaître les solides", date="2027-03-27", ceinture="jaune",
      titre="Prisme, pyramide, cylindre, cône : les distinguer",
      intro="Gabriel est ingénieur spatial : il dessine des fusées et des stations dans l'espace. Sa station est faite de morceaux, et chaque morceau a la forme d'un solide. Lesquels ?",
      points=["premier tri : ça roule (boule, cylindre, cône) ou que des faces plates (cube, pavé, prisme, pyramide)",
              "deuxième tri : une pointe (cône, pyramide) ou deux bases pareilles face à face (cylindre, prisme)",
              "la station : module en cylindre, nez en cône, réservoir en boule, panneau solaire en pavé très plat",
              "le piège : cylindre ou prisme, cône ou pyramide ? un disque, ou un polygone"],
      defi="6 faces, toutes des rectangles, mais pas toutes des carrés : qui suis-je ?",
      chap={"00-garde": "Comment les distinguer ?", "02-rouler": "Ça roule ?", "03-pointe": "Une pointe ou deux bases ?",
            "04-station": "La station de Gabriel", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["reconnaître les solides", "prisme droit", "pyramide", "cylindre", "cône", "boule", "pavé droit", "ingénieur spatial"],
      centres=["espace", "sciences"],
      s_titre="Il roule et a 2 disques : une boule ? Raté !",
      s_accroche="Devinette avec mon frère ! Il a caché un solide. Il roule, et il a 2 disques. Facile : une boule ! … Vraiment ?",
      s_toi="j'ai 1 disque, je roule, et j'ai une pointe. Qui suis-je ?",
      s_tags=["solides", "cylindre", "devinette", "boule"], s_centres=["jeux-defis"]),
 dict(n=2, slug="sommets-aretes-faces", micro="solide_sommet_arete_face", nom="Sommets, arêtes et faces", date="2027-03-28", ceinture="verte",
      titre="Compter sommets, arêtes et faces sans en oublier",
      intro="Lisa est sculptrice. Elle taille une pyramide dans un bloc de pierre. Pour la finir, elle doit polir chaque face, adoucir chaque arête et arrondir chaque sommet. Combien de chaque ?",
      points=["face = surface plate ; arête = bord où deux faces se touchent ; sommet = coin où les arêtes se rejoignent",
              "les arêtes cachées en pointillés ; on compte étage par étage : en bas, sur les côtés, en haut",
              "pyramide à base carrée : 5 faces, 8 arêtes, 5 sommets",
              "le piège : sur le dessin d'un pavé, on voit 9 arêtes… il en a 12"],
      defi="une pyramide a 10 arêtes : combien de côtés a sa base ?",
      chap={"00-garde": "Sans en oublier", "02-rappel": "Face, arête, sommet", "03-cache": "Ce qui est caché",
            "04-pyramide": "La pyramide de Lisa", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["sommets", "arêtes", "faces", "pyramide", "pavé droit", "arêtes cachées", "sculptrice"],
      centres=["art-design", "histoire-geographie"],
      s_titre="4 boules de pâte pour ma pyramide ? Elle s'écroule !",
      s_accroche="Je construis une pyramide avec des pailles et de la pâte à modeler. Base carrée. Une boule de pâte par sommet : 4 boules, c'est bon ! … Vraiment ?",
      s_toi="combien de pailles faut-il pour cette pyramide à base carrée ?",
      s_tags=["pyramide", "sommets", "arêtes", "pailles", "bricolage"], s_centres=["art-design"]),
 dict(n=3, slug="faces", micro="solide_face", nom="Les faces d'un solide", date="2027-03-29", ceinture="jaune",
      titre="Combien de faces, et de quelles formes ?",
      intro="Victor est chocolatier. Il fabrique des boîtes en chocolat, et il décore chaque face avec un dessin. Pour chaque boîte, il doit savoir : combien de faces, et de quelles formes ?",
      points=["le pavé droit : 6 faces rectangles, par paires face à face (3 paires)",
              "un pavé de 10 × 6 × 4 cm : dessus 10 sur 6, devant 10 sur 4, côtés 6 sur 4",
              "le prisme à base triangulaire : 2 triangles (les bases) et 3 rectangles, 5 faces",
              "le piège : le cylindre n'a que 2 faces plates, la boule aucune"],
      defi="une boîte en pyramide à base pentagonale : combien d'étiquettes, et de quelles formes ?",
      chap={"00-garde": "Combien de faces ?", "02-pave": "Le pavé droit", "03-mesures": "Les mesures des faces",
            "04-prisme": "Le prisme", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["faces", "solides", "pavé droit", "prisme", "pyramide", "cylindre", "chocolatier"],
      centres=["cuisine", "art-design"],
      s_titre="4 couleurs pour ma boîte à chaussures ? Raté !",
      s_accroche="Je peins une boîte à chaussures, une couleur par face. Rouge sur le dessus, puis bleu, vert et jaune sur les côtés. 4 couleurs, c'est fini ! … Vraiment ?",
      s_toi="une boîte en prisme a 2 bases en triangle. Combien de faces en tout ?",
      s_tags=["faces", "pavé droit", "peinture", "boîte"], s_centres=["art-design"]),
 dict(n=4, slug="patron", micro="solide_patron", nom="Reconnaître un patron", date="2027-03-30", ceinture="verte",
      titre="Quel solide donne ce patron, une fois plié ?",
      intro="Julia est maquettiste : elle construit des maquettes de bâtiments en carton, pour les architectes. Chaque bâtiment commence à plat, par un patron. Mais quel patron donne quel solide ?",
      points=["un patron : un dessin d'un seul morceau qui, plié, forme un solide sans trou ni face en double",
              "compter les faces et leurs formes : 6 rectangles = pavé ; 1 carré + 4 triangles = pyramide ; 2 triangles + 3 rectangles = prisme",
              "vérifier les longueurs : deux bords qui se collent ont la même longueur",
              "le piège : 6 faces ne suffisent pas, il faut plier dans sa tête"],
      defi="le patron d'une tour en pavé : 4 rectangles de 5 cm sur 12 et 2 carrés : quel côté pour les carrés ?",
      chap={"00-garde": "Quel solide, une fois plié ?", "02-definition": "Un patron, c'est…", "03-compter": "Compter les faces",
            "04-longueurs": "Vérifier les longueurs", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["patron", "solides", "pavé droit", "pyramide", "prisme", "maquette", "maquettiste"],
      centres=["construction", "art-design"],
      s_titre="Ma boîte pyramide a un trou ! 3 triangles, ça suffit ?",
      s_accroche="Je fabrique une boîte cadeau en pyramide pour Maman. Mon patron : 1 carré, et 3 triangles autour. Je plie, je colle… Oups !",
      s_toi="un patron a 1 pentagone et 5 triangles. Quel solide donne-t-il ?",
      s_tags=["patron", "pyramide", "boîte cadeau", "bricolage"], s_centres=["art-design"]),
 dict(n=5, slug="patron-construire", micro="solide_patron_construire", nom="Construire un patron de cube", date="2027-03-31", ceinture="verte",
      titre="Patron de cube : où placer la dernière face ?",
      intro="Anna crée des lanternes en papier, en forme de cube. Elle dessine chaque patron sur une feuille quadrillée. Aujourd'hui, il lui manque une face. Où la mettre ?",
      points=["un patron de cube : 6 carrés pareils, et aucune face ne se retrouve sur une autre",
              "la croix : 4 carrés en ligne (le tour) et 1 de chaque côté",
              "il existe 11 patrons du cube ; dans une ligne de 3 carrés, le premier et le dernier sont face à face",
              "le piège : 2 rangées de 3 carrés, ce n'est pas un patron de cube"],
      defi="un dé en lanterne : 1 et 2 sur une ligne de 4 carrés, quels nombres sur le 3e et le 4e ?",
      chap={"00-garde": "Où placer la dernière face ?", "02-regles": "6 carrés, sans superposition", "03-croix": "La croix",
            "04-onze": "11 patrons", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["patron du cube", "11 patrons", "cube", "dé", "faces opposées", "lanterne", "pliage"],
      centres=["art-design", "jeux-defis"],
      s_titre="Mon dé en 2 rangées de 3 ne se ferme pas ! Pourquoi ?",
      s_accroche="Je découpe un patron pour fabriquer mon dé. 6 carrés : 3 en haut, 3 en bas. Je plie… Deux faces l'une sur l'autre, et un trou de chaque côté !",
      s_toi="sur un dé, le 1 est en face du 6. Qu'y a-t-il en face du 3 ?",
      s_tags=["patron du cube", "dé", "pliage", "11 patrons"], s_centres=["jeux-defis"]),
 dict(n=6, slug="defi", micro="solide_defi", nom="Défi : l'aquarium", date="2027-04-01", ceinture="bleue",
      titre="Combien de joint pour toutes les arêtes d'un aquarium ?",
      intro="Ethan fabrique des aquariums en verre, en forme de pavé droit. Sur chaque arête, il colle un joint. Son aquarium mesure 60 cm de long, 30 de large et 40 de haut. Combien de joint lui faut-il ?",
      points=["un pavé a 12 arêtes : 4 longueurs, 4 largeurs, 4 hauteurs",
              "4 × 60 + 4 × 30 + 4 × 40 = 520 cm, soit 5,2 m de joint",
              "ouvert en haut : 6 faces moins 1, 5 vitres",
              "le piège : 60 + 30 + 40 ne compte que 3 arêtes sur 12"],
      defi="10 m de joint, des aquariums en cube de 40 cm d'arête : combien peut-il en finir ?",
      chap={"00-garde": "Combien de joint ?", "02-par-quatre": "12 arêtes, 4 de chaque", "03-calcul": "Le calcul",
            "04-vitres": "Combien de vitres ?", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["défi", "arêtes", "pavé droit", "cube", "aquarium", "problème", "mètres et centimètres"],
      centres=["animaux-marins", "construction"],
      s_titre="27 morceaux de gâteau : combien ont 3 faces au chocolat ?",
      s_accroche="Mon gâteau est un cube. Je le couvre de chocolat partout, même dessous. Puis je le coupe en 27 petits cubes : 3, 3 et 3. Les meilleurs morceaux ont 3 faces au chocolat. Il y en a sûrement plein !",
      s_toi="combien de morceaux n'ont pas du tout de chocolat ?",
      s_tags=["cube", "sommets", "gâteau", "défi", "27 cubes"], s_centres=["cuisine"]),
]


COMMUNS = ["solides", "géométrie dans l'espace", "maths", "CM2", "primaire", "cycle 3", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EP:
        n, slug = e["n"], e["slug"]
        ident = f"cm2-solides-{slug}"
        if ident not in temps:
            continue
        dos = f"cm2/maths/solides/{n:02d}-{slug}"
        nom = f"eleveai-maths-{ident}"
        coach = COACH.format(micro=e["micro"])
        voix = json.loads((VOIX / f"{ident}.json").read_text(encoding="utf-8"))
        t = temps[ident]
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths CM2"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série Solides d'EleveAI, en CM2."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        out.append({
            "id": ident, "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"], "classe": "cm2",
            "ceinture": e["ceinture"], "serie": "Maths CM2", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        if f"{ident}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{ident}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{ident}-short"]
        stitre = f"{e['s_titre']} #maths #cm2"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : la version 100 % visuelle." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 "Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #solides #cm2 #primaire")
        out.append({
            "id": f"{ident}-short", "pas_avant": e["date"], "prioritaire": True, "notionId": NOTION, "microId": e["micro"],
            "classe": "cm2", "ceinture": sc, "serie": "Maths CM2", "type": "short", "renvoie_vers": ident,
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
                nom = f"cm2-solides-{e['slug']}{suf}"
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
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-solides-cm2.json"
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
