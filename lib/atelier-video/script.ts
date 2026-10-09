// lib/atelier-video/script.ts
//
// ⭐ 09/10/2026 — L'ATELIER VIDÉO (Frédéric : « une page où les élèves écrivent
// un script vidéo et ça donne un rendu Manim »). L'élève écrit en français, une
// instruction par ligne ; ce module la lit (`lireScript`) et la traduit en code
// Manim (`versManim`). Le MÊME découpage sert l'aperçu du navigateur : ce que
// l'élève voit dans l'aperçu est ce que Manim rendra.
//
// Le vrai rendu se fait sur try.manim.community (Binder, gratuit, sans compte),
// testé le 09/10/2026 : Manim 0.21, accents et MathTex OK, ~25 s de rendu.
//
// Ses règles de vidéaste, vérifiées ici :
// - une phrase d'objectif ;
// - la voix = ce qui est écrit : chaque nombre dit doit être à l'écran.

export type Couleur = "blanc" | "jaune" | "vert" | "bleu" | "rouge" | "orange" | "rose";

export const COULEURS: Record<Couleur, string> = {
  blanc: "#FFFFFF",
  jaune: "#FFD84D",
  vert: "#5BD16B",
  bleu: "#58A6FF",
  rouge: "#FF6B6B",
  orange: "#FFA94D",
  rose: "#F783AC",
};

export type Contenu =
  | { kind: "texte"; texte: string }
  | { kind: "formule"; latex: string; brut: string };

type Base = { ligne: number; voix?: string };

export type Etape = Base &
  (
    | { type: "titre"; texte: string }
    | { type: "ecris"; contenu: Contenu }
    | { type: "transforme"; contenu: Contenu }
    | { type: "entoure"; couleur: Couleur }
    | { type: "agrandis" }
    | { type: "couleur"; couleur: Couleur }
    | { type: "efface" }
    | { type: "droite"; de: number; a: number }
    | { type: "billes"; rangees: number; colonnes: number }
    | { type: "pause"; secondes: number }
    | { type: "dis" }
  );

export type Remarque = { ligne: number; niveau: "erreur" | "conseil"; message: string };

export type Script = { objectif?: string; etapes: Etape[]; remarques: Remarque[] };

/** Nombre maximal d'objets empilés à l'écran avant que ça déborde. */
export const PILE_MAX = 4;

function sansAccents(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

const MOTS_CLES: Record<string, Etape["type"] | "objectif"> = {
  objectif: "objectif",
  titre: "titre",
  ecris: "ecris",
  ecrire: "ecris",
  ecrit: "ecris",
  affiche: "ecris",
  "transforme en": "transforme",
  transforme: "transforme",
  devient: "transforme",
  entoure: "entoure",
  encadre: "entoure",
  agrandis: "agrandis",
  agrandir: "agrandis",
  insiste: "agrandis",
  couleur: "couleur",
  colorie: "couleur",
  efface: "efface",
  "efface tout": "efface",
  droite: "droite",
  "droite graduee": "droite",
  billes: "billes",
  pause: "pause",
  attends: "pause",
  dis: "dis",
  voix: "dis",
};

function lireCouleur(s: string | undefined): Couleur | null {
  const c = sansAccents(s ?? "");
  if (!c) return null;
  return (Object.keys(COULEURS) as Couleur[]).find((k) => c.startsWith(k)) ?? null;
}

/** Une formule si aucun mot de 3 lettres ou plus (hors « racine »). */
export function estFormule(s: string) {
  const mots = s.replace(/racine/gi, "").match(/[A-Za-zÀ-ÿ]{3,}/g);
  return !mots && /[0-9a-zA-Z]/.test(s);
}

function sansParentheses(s: string) {
  return s.startsWith("(") && s.endsWith(")") ? s.slice(1, -1) : s;
}

/** « 3/4 × 2,5 » → LaTeX. Le même LaTeX sert KaTeX (aperçu) et MathTex (Manim). */
export function versLatex(brut: string) {
  let s = brut.trim();
  s = s.replace(/racine\s*\(([^()]*)\)/gi, "\\sqrt{$1}");
  const frac = /(\([^()]*\)|[0-9a-zA-Z,]+)\s*\/\s*(\([^()]*\)|[0-9a-zA-Z,]+)/;
  for (let i = 0; i < 10 && frac.test(s); i++) {
    s = s.replace(frac, (_, a: string, b: string) => `\\frac{${sansParentheses(a)}}{${sansParentheses(b)}}`);
  }
  s = s
    .replace(/²/g, "^{2}")
    .replace(/³/g, "^{3}")
    .replace(/\^\s*(-?\d+|[a-zA-Z])/g, "^{$1}")
    .replace(/\*/g, " \\times ")
    .replace(/×/g, " \\times ")
    .replace(/(\d)\s*x\s*(\d)/g, "$1 \\times $2")
    .replace(/÷/g, " \\div ")
    .replace(/(\d)\s*:\s*(\d)/g, "$1 \\div $2")
    .replace(/<=|≤/g, " \\leq ")
    .replace(/>=|≥/g, " \\geq ")
    .replace(/≠/g, " \\neq ")
    .replace(/%/g, "\\%")
    .replace(/(\d),(\d)/g, "$1{,}$2");
  return s.replace(/\s+/g, " ").trim();
}

function lireContenu(s: string): Contenu {
  return estFormule(s) ? { kind: "formule", latex: versLatex(s), brut: s } : { kind: "texte", texte: s };
}

/** Les nombres d'un texte, virgule décimale comprise : « 0,75 », « -3 », « 12 ». */
function nombres(s: string) {
  return (s.match(/\d+(?:[,.]\d+)?/g) ?? []).map((n) => n.replace(".", ","));
}

export function lireScript(source: string): Script {
  const etapes: Etape[] = [];
  const remarques: Remarque[] = [];
  let objectif: string | undefined;

  // Ce qui est écrit à l'écran, pour la règle « la voix = ce qui est écrit ».
  let ecran: string[] = [];
  let titre = "";
  let pile = 0;

  source.split(/\r?\n/).forEach((brute, i) => {
    const ligne = i + 1;
    const texte = brute.trim();
    if (!texte || texte.startsWith("#")) return;

    const [gauche, ...droite] = texte.split("|");
    let voix: string | undefined;
    const reste = droite.join("|").trim();
    if (reste) {
      const m = reste.match(/^(dis|voix)\s*:\s*(.*)$/i);
      if (m && m[2].trim()) voix = m[2].trim();
      else
        remarques.push({ ligne, niveau: "erreur", message: "Après « | », écris « dis : » puis la phrase à dire." });
    }

    const m = gauche.trim().match(/^([^:]+?)\s*(?::\s*(.*))?$/);
    const cle = sansAccents(m?.[1] ?? "");
    const valeur = (m?.[2] ?? "").trim();
    const type = MOTS_CLES[cle];
    if (!type) {
      remarques.push({
        ligne,
        niveau: "erreur",
        message: `Je ne connais pas « ${m?.[1] ?? gauche} ». Regarde la liste des instructions.`,
      });
      return;
    }

    const erreur = (message: string) => remarques.push({ ligne, niveau: "erreur", message });
    const trop = () =>
      remarques.push({
        ligne,
        niveau: "conseil",
        message: `Déjà ${PILE_MAX} lignes à l'écran : mets « efface » avant, sinon ça déborde.`,
      });
    const besoinObjet = () => {
      if (pile === 0) {
        erreur("Il n'y a rien à l'écran : écris d'abord quelque chose.");
        return false;
      }
      return true;
    };

    let etape: Etape | null = null;
    switch (type) {
      case "objectif":
        if (!valeur) erreur("Écris ton objectif après « objectif : ».");
        objectif = valeur;
        return;
      case "titre":
        if (!valeur) return erreur("Écris le titre après « titre : ».");
        etape = { type, texte: valeur, ligne, voix };
        titre = valeur;
        break;
      case "ecris":
        if (!valeur) return erreur("Écris ce qu'il faut afficher après « écris : ».");
        if (pile >= PILE_MAX) trop();
        etape = { type, contenu: lireContenu(valeur), ligne, voix };
        ecran.push(valeur);
        pile++;
        break;
      case "transforme":
        if (!valeur) return erreur("Écris le résultat après « transforme en : ».");
        if (!besoinObjet()) return;
        etape = { type, contenu: lireContenu(valeur), ligne, voix };
        ecran[ecran.length - 1] = valeur;
        break;
      case "entoure":
      case "couleur": {
        if (!besoinObjet()) return;
        const c = lireCouleur(valeur) ?? (type === "entoure" ? "jaune" : null);
        if (!c) return erreur(`Couleurs possibles : ${Object.keys(COULEURS).join(", ")}.`);
        etape = { type, couleur: c, ligne, voix };
        break;
      }
      case "agrandis":
        if (!besoinObjet()) return;
        etape = { type, ligne, voix };
        break;
      case "efface":
        etape = { type, ligne, voix };
        ecran = [];
        pile = 0;
        break;
      case "droite": {
        const d = valeur.match(/(-?\d+)\s*(?:à|a|;|\.\.)\s*(-?\d+)/i);
        if (!d) return erreur("Écris par exemple « droite : -5 à 5 ».");
        const de = Number(d[1]);
        const a = Number(d[2]);
        if (a <= de || a - de > 20) return erreur("De la plus petite à la plus grande, 20 graduations au plus.");
        if (pile >= PILE_MAX) trop();
        etape = { type, de, a, ligne, voix };
        const graduations: string[] = [];
        for (let k = de; k <= a; k++) graduations.push(String(k));
        ecran.push(graduations.join(" "));
        pile++;
        break;
      }
      case "billes": {
        const b = valeur.match(/(\d+)\D+(\d+)/);
        if (!b) return erreur("Écris par exemple « billes : 3 x 4 » (3 rangées de 4).");
        const rangees = Number(b[1]);
        const colonnes = Number(b[2]);
        if (!rangees || !colonnes || rangees > 10 || colonnes > 12)
          return erreur("Au plus 10 rangées de 12 billes.");
        if (pile >= PILE_MAX) trop();
        etape = { type, rangees, colonnes, ligne, voix };
        ecran.push(`${rangees} ${colonnes} ${rangees * colonnes}`);
        pile++;
        break;
      }
      case "pause": {
        const s = Number((valeur || "1").replace(",", "."));
        if (!(s > 0 && s <= 10)) return erreur("Une pause dure entre 0,5 et 10 secondes.");
        etape = { type, secondes: s, ligne, voix };
        break;
      }
      case "dis":
        if (!valeur && !voix) return erreur("Écris la phrase à dire après « dis : ».");
        etape = { type, ligne, voix: voix ?? valeur };
        break;
    }
    if (!etape) return;

    // ⛔ Sa règle : chaque nombre dit est écrit à l'écran, au moment où il est dit.
    if (etape.voix) {
      const visibles = new Set(nombres([titre, ...ecran].join(" ")));
      const absents = [...new Set(nombres(etape.voix))].filter((n) => !visibles.has(n));
      if (absents.length)
        remarques.push({
          ligne,
          niveau: "conseil",
          message: `La voix dit ${absents.join(", ")}, mais ce n'est pas écrit à l'écran à ce moment-là.`,
        });
    }
    etapes.push(etape);
  });

  if (!objectif)
    remarques.unshift({
      ligne: 1,
      niveau: "conseil",
      message: "Commence par « objectif : » et une seule phrase : ce que la vidéo doit faire comprendre.",
    });

  return { objectif, etapes, remarques };
}

/** Durée de lecture d'une phrase, en secondes (~15 caractères par seconde). */
export function dureeVoix(voix: string) {
  return Math.max(1.2, voix.length / 15);
}

function py(s: string) {
  // JSON.stringify produit une chaîne Python valide (guillemets, \n, \\).
  return JSON.stringify(s);
}

function enLignes(s: string, max = 55) {
  const lignes: string[] = [];
  let courante = "";
  for (const mot of s.split(/\s+/)) {
    if (courante && (courante + " " + mot).length > max) {
      lignes.push(courante);
      courante = mot;
    } else courante = courante ? `${courante} ${mot}` : mot;
  }
  if (courante) lignes.push(courante);
  return lignes.join("\n");
}

function mobject(c: Contenu, couleur = "#FFFFFF") {
  return c.kind === "formule"
    ? `MathTex(${py(c.latex)}, font_size=72, color=${py(couleur)})`
    : `Text(${py(c.texte)}, font_size=40, color=${py(couleur)})`;
}

/** Une phrase enregistrée par l'élève : lien signé vers son fichier, et sa durée. */
export type VoixEleve = { url: string; duree: number };

/**
 * Le script de l'élève en code Manim, prêt à coller dans try.manim.community.
 *
 * ⛔ 09/10/2026 — PAS de `%%manim` : dans une session Binder neuve, cette
 * commande n'existe qu'APRÈS un `import manim` dans une case précédente. Le
 * code est donc autonome : il rend la scène lui-même et affiche la vidéo.
 *
 * Voix de chaque phrase « dis : » : celle que l'élève a enregistrée
 * (`voixEleve`, clé = la phrase), sinon la voix générée (gTTS) si `voix` est
 * coché, sinon rien (sous-titres et attentes seulement).
 */
export function versManim(
  script: Script,
  options: { sousTitres: boolean; voix: boolean; voixEleve?: Record<string, VoixEleve> },
) {
  const L: string[] = [];
  const dans = (s: string) => L.push(`        ${s}`);
  const voixEleve = options.voixEleve ?? {};
  const phrases = script.etapes.map((e) => e.voix).filter((v): v is string => !!v);
  const avecVoix = options.voix && phrases.some((p) => !voixEleve[p]);
  const avecEleve = phrases.some((p) => voixEleve[p]);
  L.push("import os");
  L.push("import time");
  if (avecEleve) L.push("import urllib.parse");
  if (avecEleve) L.push("import urllib.request");
  L.push("from IPython.display import Video, display");
  if (avecVoix) {
    // ⭐ 09/10/2026 — LA VOIX SANS MICRO : gTTS (synthèse vocale de Google,
    // gratuite) fabrique la voix pendant le rendu. Testé sur try.manim.community :
    // pip n'y écrit ni dans le système ni dans --user, d'où --target ./voix.
    L.push("import subprocess");
    L.push("import sys");
    L.push("from manim import *");
    L.push("");
    L.push("# La voix générée : installée au premier rendu (environ 20 secondes).");
    L.push("try:");
    L.push("    from gtts import gTTS");
    L.push("    from mutagen.mp3 import MP3");
    L.push("except ImportError:");
    L.push('    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "--target", "./voix", "gTTS", "mutagen"])');
    L.push('    sys.path.insert(0, "./voix")');
    L.push("    from gtts import gTTS");
    L.push("    from mutagen.mp3 import MP3");
    L.push("");
    L.push("");
    L.push("class MaVideo(Scene):");
    L.push("    def dire(self, phrase):");
    L.push("        # Fabrique la voix de la phrase et la pose sur la bande-son ; renvoie sa durée.");
    L.push('        self.nb_voix = getattr(self, "nb_voix", 0) + 1');
    L.push('        fichier = f"voix_{self.nb_voix}.mp3"');
    L.push('        gTTS(phrase, lang="fr").save(fichier)');
    L.push("        self.add_sound(fichier)");
    L.push("        return MP3(fichier).info.length");
    L.push("");
  } else {
    L.push("from manim import *");
    L.push("");
    L.push("");
    L.push("class MaVideo(Scene):");
  }
  if (avecEleve) {
    // ⭐ 09/10/2026 — VERSION 2 : la voix de l'élève, enregistrée sur l'atelier,
    // rangée dans Supabase. Le son webm du navigateur passe dans Manim (testé).
    L.push("    def ma_voix(self, lien, duree):");
    L.push("        # Télécharge MA voix, enregistrée sur l'atelier, et la pose sur la bande-son.");
    L.push('        self.nb_voix = getattr(self, "nb_voix", 0) + 1');
    L.push("        extension = os.path.splitext(urllib.parse.urlparse(lien).path)[1]");
    L.push('        fichier = f"ma_voix_{self.nb_voix}{extension}"');
    L.push("        urllib.request.urlretrieve(lien, fichier)");
    L.push("        self.add_sound(fichier)");
    L.push("        return duree");
    L.push("");
  }
  L.push("    def construct(self):");
  if (script.objectif) dans(`# Objectif : ${script.objectif}`);
  dans("titre = None");
  dans("pile = []    # ce qui est écrit à l'écran, de haut en bas");
  dans("cadres = []  # les rectangles « entoure »");
  dans("");

  let n = 0;
  // Le cadre « entoure » de la dernière ligne : il la suit quand elle grandit ou change.
  let cadre: { v: string; couleur: string } | null = null;
  const placer = (v: string) => {
    cadre = null;
    dans(`if pile:`);
    dans(`    ${v}.next_to(pile[-1], DOWN, buff=0.5)`);
    dans(`else:`);
    dans(`    ${v}.move_to(UP * 1.8)`);
    dans(`pile.append(${v})`);
  };

  for (const e of script.etapes) {
    const voix = e.voix ? enLignes(e.voix) : "";
    dans(`# Ligne ${e.ligne}${e.voix ? ` — voix : ${e.voix.replace(/\n/g, " ")}` : ""}`);
    if (voix && options.sousTitres) {
      dans(`sous_titre = Text(${py(voix)}, font_size=24, color="#DDDDDD").to_edge(DOWN, buff=0.3)`);
      dans(`self.add(sous_titre)`);
    }
    const parle = e.voix ? (voixEleve[e.voix] ? "eleve" : options.voix ? "gtts" : null) : null;
    if (e.voix && parle) {
      dans(`debut = self.renderer.time`);
      if (parle === "eleve") {
        const enreg = voixEleve[e.voix];
        dans(`duree = self.ma_voix(${py(enreg.url)}, ${enreg.duree.toFixed(2)})`);
      } else dans(`duree = self.dire(${py(e.voix)})`);
    }
    const v = `o${++n}`;
    switch (e.type) {
      case "titre":
        dans(`nouveau_titre = Text(${py(e.texte)}, font_size=44).to_edge(UP, buff=0.5)`);
        dans(`if nouveau_titre.width > 13:`);
        dans(`    nouveau_titre.scale_to_fit_width(13)`);
        dans(`if titre:`);
        dans(`    self.play(Transform(titre, nouveau_titre))`);
        dans(`else:`);
        dans(`    titre = nouveau_titre`);
        dans(`    self.play(Write(titre))`);
        break;
      case "ecris":
        dans(`${v} = ${mobject(e.contenu)}`);
        dans(`if ${v}.width > 12:`);
        dans(`    ${v}.scale_to_fit_width(12)`);
        placer(v);
        dans(`self.play(Write(${v}))`);
        break;
      case "transforme":
        dans(`${v} = ${mobject(e.contenu)}`);
        dans(`${v}.move_to(pile[-1])`);
        if (cadre) {
          dans(`self.play(`);
          dans(`    TransformMatchingShapes(pile[-1], ${v}),`);
          dans(`    Transform(${cadre.v}, SurroundingRectangle(${v}, color=${py(cadre.couleur)}, buff=0.2)),`);
          dans(`)`);
        } else dans(`self.play(TransformMatchingShapes(pile[-1], ${v}))`);
        dans(`pile[-1] = ${v}`);
        break;
      case "entoure":
        dans(`${v} = SurroundingRectangle(pile[-1], color=${py(COULEURS[e.couleur])}, buff=0.2)`);
        dans(`cadres.append(${v})`);
        dans(`self.play(Create(${v}))`);
        cadre = { v, couleur: COULEURS[e.couleur] };
        break;
      case "agrandis": {
        // ⛔ Sa règle : pour insister, AGRANDIR puis rétrécir.
        const cible = cadre ? `VGroup(pile[-1], ${cadre.v})` : "pile[-1]";
        dans(`self.play(${cible}.animate.scale(1.5))`);
        dans(`self.play(${cible}.animate.scale(1 / 1.5))`);
        break;
      }
      case "couleur":
        dans(`self.play(pile[-1].animate.set_color(${py(COULEURS[e.couleur])}))`);
        break;
      case "efface":
        dans(`if pile or cadres:`);
        dans(`    self.play(*[FadeOut(m) for m in pile + cadres])`);
        dans(`pile, cadres = [], []`);
        cadre = null;
        break;
      case "droite":
        dans(
          `${v} = NumberLine(x_range=[${e.de}, ${e.a}, 1], length=11, include_numbers=True, font_size=30)`,
        );
        placer(v);
        dans(`self.play(Create(${v}))`);
        break;
      case "billes":
        dans(
          `${v} = VGroup(*[Dot(radius=0.16, color="#58A6FF") for _ in range(${e.rangees * e.colonnes})])`,
        );
        dans(`${v}.arrange_in_grid(rows=${e.rangees}, cols=${e.colonnes}, buff=0.3)`);
        placer(v);
        dans(`self.play(LaggedStart(*[GrowFromCenter(b) for b in ${v}], lag_ratio=0.05))`);
        break;
      case "pause":
        dans(`self.wait(${e.secondes})`);
        break;
      case "dis":
        break;
    }
    if (e.voix && parle) {
      // On laisse la voix finir sa phrase avant le plan suivant.
      dans(`reste = duree - (self.renderer.time - debut)`);
      dans(`self.wait(max(reste, 0) + 0.3)`);
      if (options.sousTitres) dans(`self.remove(sous_titre)`);
    } else if (e.voix) {
      // Le temps de dire la phrase, moins ~1 s d'animation déjà passée.
      const reste = Math.max(0.5, dureeVoix(e.voix) - (e.type === "dis" ? 0 : 1));
      dans(`self.wait(${reste.toFixed(1)})`);
      if (options.sousTitres) dans(`self.remove(sous_titre)`);
    }
    dans("");
  }
  dans("self.wait(1)");
  L.push("");
  L.push("");
  L.push("# Le rendu, puis la vidéo sous la case.");
  L.push('config.quality = "medium_quality"');
  // Un nom neuf à chaque rendu : sinon Manim garde le nom du premier rendu de la
  // session et le navigateur peut ressortir l'ancienne vidéo de son cache.
  L.push('config.output_file = f"ma_video_{int(time.time())}"');
  L.push("scene = MaVideo()");
  L.push("scene.render()");
  L.push('display(Video(os.path.relpath(scene.renderer.file_writer.movie_file_path), html_attributes="controls"))');
  return L.join("\n") + "\n";
}

/** Les matières de l'accueil : le clap du bandeau ouvre l'exemple de la sienne. */
export type MatiereAtelier = "maths" | "francais" | "anglais" | "espagnol" | "economie" | "ia";

// ⭐ 09/10/2026 — UN EXEMPLE PAR MATIÈRE (Frédéric : « cela concerne le
// français, pour la rédaction », puis « maths français anglais espagnol
// économie IA »). La voix reste française : en langues, l'explication est en
// français et les mots étrangers restent courts.
export const EXEMPLES: { nom: string; matiere: MatiereAtelier; script: string }[] = [
  {
    nom: "Trois quarts",
    matiere: "maths",
    script: `objectif : comprendre que 3/4 = 0,75
titre : Trois quarts, c'est combien ? | dis : Trois quarts, c'est combien ?
écris : 3/4 | dis : On part de 3 sur 4.
écris : 3 ÷ 4 | dis : Une fraction, c'est une division : 3 divisé par 4.
transforme en : 0,75 | dis : 3 divisé par 4, ça fait 0,75.
entoure : vert | dis : Trois quarts, c'est 0,75.
agrandis`,
  },
  {
    nom: "12 billes",
    matiere: "maths",
    script: `objectif : voir que 12 = 3 × 4, donc 12 ÷ 4 = 3
titre : 12 billes | dis : J'ai 12 billes.
billes : 3 x 4 | dis : Je les range en 3 rangées de 4.
écris : 12 = 3 × 4 | dis : 12 égale 3 fois 4.
écris : 12 ÷ 4 = 3 | dis : Donc 12 divisé par 4 égale 3.
entoure : jaune
agrandis | dis : C'est la même égalité, lue dans l'autre sens.`,
  },
  {
    nom: "Droite graduée",
    matiere: "maths",
    script: `objectif : voir sur une droite graduée que -3 est plus petit que 2
titre : Les nombres relatifs | dis : Les nombres relatifs.
droite : -5 à 5 | dis : Voici une droite graduée, de -5 à 5.
écris : -3 < 2 | dis : -3 est à gauche de 2, donc -3 est plus petit que 2.
couleur : jaune
agrandis`,
  },
  {
    nom: "Raconter une histoire",
    matiere: "francais",
    script: `objectif : comprendre les trois temps d'un récit
titre : Raconter une histoire | dis : Une histoire se raconte en trois temps.
écris : La situation de départ | dis : D'abord, la situation de départ : qui, où, quand.
écris : Les péripéties | dis : Ensuite, les péripéties : ce qui arrive aux personnages.
écris : La fin | dis : Enfin, la fin : comment tout se termine.
entoure : jaune | dis : Sans fin, ton lecteur reste sur sa faim.`,
  },
  {
    nom: "Le prétérit",
    matiere: "anglais",
    script: `objectif : savoir former le prétérit des verbes réguliers
titre : Le prétérit en anglais | dis : Le prétérit, c'est le passé en anglais.
écris : I play | dis : Au présent : I play, je joue.
transforme en : I played | dis : Au passé, on ajoute E D : I played, j'ai joué.
couleur : jaune
agrandis | dis : Verbe régulier : on ajoute E D.`,
  },
  {
    nom: "Hablar",
    matiere: "espagnol",
    script: `objectif : savoir conjuguer hablar au présent
titre : Hablar, au présent | dis : Hablar veut dire parler.
écris : yo hablo | dis : Je parle : yo hablo.
écris : tú hablas | dis : Tu parles : tú hablas.
écris : él habla | dis : Il parle : él habla.
entoure : vert | dis : Le radical habl ne change pas : seule la fin change.`,
  },
  {
    nom: "L'inflation",
    matiere: "economie",
    script: `objectif : comprendre ce qu'est l'inflation
titre : L'inflation | dis : L'inflation, c'est la hausse des prix.
écris : Une baguette : 1 € | dis : L'an dernier, une baguette coûtait 1 euro.
transforme en : Une baguette : 1,10 € | dis : Cette année, elle coûte 1,10 euro.
écris : + 10 % | dis : Les prix ont augmenté de 10 %.
entoure : rouge | dis : Avec le même argent, on achète moins.`,
  },
  {
    nom: "Comment une IA écrit",
    matiere: "ia",
    script: `objectif : comprendre qu'une IA prédit le mot suivant
titre : Comment une IA écrit | dis : Une IA écrit un mot après l'autre.
écris : Le chat boit du … | dis : Elle lit le début de la phrase.
écris : lait : très probable | dis : Elle devine le mot le plus probable : lait.
écris : vélo : très peu probable | dis : Vélo, c'est très peu probable.
entoure : vert | dis : Elle choisit, puis recommence, mot après mot.`,
  },
];

export const AIDE: { instruction: string; exemple: string; effet: string }[] = [
  { instruction: "objectif :", exemple: "objectif : comprendre que 3/4 = 0,75", effet: "La phrase qui dit ce que la vidéo fait comprendre. Elle n'apparaît pas à l'écran." },
  { instruction: "titre :", exemple: "titre : Les fractions", effet: "Écrit le titre en haut." },
  { instruction: "écris :", exemple: "écris : 3/4 + 1/4 = 1", effet: "Écrit une ligne sous la précédente. 3/4 devient une fraction, x ou × un « fois », ÷ ou : un « divisé par »." },
  { instruction: "transforme en :", exemple: "transforme en : 0,75", effet: "La dernière ligne se change en une autre." },
  { instruction: "entoure :", exemple: "entoure : vert", effet: "Encadre la dernière ligne." },
  { instruction: "agrandis", exemple: "agrandis", effet: "Agrandit puis rétrécit la dernière ligne, pour insister." },
  { instruction: "couleur :", exemple: "couleur : jaune", effet: "Change la couleur de la dernière ligne." },
  { instruction: "efface", exemple: "efface", effet: "Efface tout, sauf le titre." },
  { instruction: "droite :", exemple: "droite : -5 à 5", effet: "Dessine une droite graduée." },
  { instruction: "billes :", exemple: "billes : 3 x 4", effet: "Dessine 3 rangées de 4 billes." },
  { instruction: "pause :", exemple: "pause : 2", effet: "Attend 2 secondes." },
  { instruction: "| dis :", exemple: "écris : 3/4 | dis : trois quarts", effet: "En bout de ligne : la phrase dite (et écrite en sous-titre) pendant ce plan." },
];
