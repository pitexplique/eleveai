/**
 * generate-spanish-audio.mjs
 *
 * Génère les fichiers audio MP3 pour le Coach Espagnol
 * via l'API TTS d'OpenAI (voice: onyx — voix grave, neutre, adaptée à l'espagnol castillan).
 *
 * Usage :
 *   node scripts/generate-spanish-audio.mjs
 *   node scripts/generate-spanish-audio.mjs --dry-run
 *   node scripts/generate-spanish-audio.mjs --missing
 *   node scripts/generate-spanish-audio.mjs --group=digits
 *   node scripts/generate-spanish-audio.mjs --force
 *
 * Groupes disponibles : digits, numbers, operations, shapes, colors,
 *   family, school, body, food, animals, clothes, house, days, greetings
 *
 * Note ElevenLabs : Pour passer à ElevenLabs (voix castillane native),
 *   remplacer generateAudio() par un appel à l'API ElevenLabs.
 *   Voice ID recommandé : "nPczCjzI2devNBz1zQrb" (Brian castillan) ou similaire.
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "audio", "espagnol");

// ─── Charge .env.local automatiquement ───────────────────────────────────────
function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const VOICE = "onyx";   // grave, naturel — bon pour l'espagnol castillan
const MODEL = "tts-1";
const DELAY_MS = 300;

// ─── AUDIO ENTRIES ────────────────────────────────────────────────────────────
// Format : { file: "groupe/niveau/nom.mp3", text: "texte à lire en espagnol" }
// Niveaux : a1, a2, b1, b2 (même convention que public/audio/english-maths)

const AUDIO_ENTRIES = [

  // ── CHIFFRES (0 → 10) ────────────────────────────────────────────────────
  { file: "digits/a1/cero.mp3",   text: "cero"   },
  { file: "digits/a1/uno.mp3",    text: "uno"    },
  { file: "digits/a1/dos.mp3",    text: "dos"    },
  { file: "digits/a1/tres.mp3",   text: "tres"   },
  { file: "digits/a1/cuatro.mp3", text: "cuatro" },
  { file: "digits/a1/cinco.mp3",  text: "cinco"  },
  { file: "digits/a1/seis.mp3",   text: "seis"   },
  { file: "digits/a1/siete.mp3",  text: "siete"  },
  { file: "digits/a1/ocho.mp3",   text: "ocho"   },
  { file: "digits/a1/nueve.mp3",  text: "nueve"  },
  { file: "digits/a1/diez.mp3",   text: "diez"   },

  // ── NOMBRES (11 → 1000) ──────────────────────────────────────────────────
  { file: "numbers/a1/once.mp3",         text: "once"         },
  { file: "numbers/a1/doce.mp3",         text: "doce"         },
  { file: "numbers/a1/trece.mp3",        text: "trece"        },
  { file: "numbers/a1/catorce.mp3",      text: "catorce"      },
  { file: "numbers/a1/quince.mp3",       text: "quince"       },
  { file: "numbers/a1/veinte.mp3",       text: "veinte"       },
  { file: "numbers/a1/treinta.mp3",      text: "treinta"      },
  { file: "numbers/a1/cuarenta.mp3",     text: "cuarenta"     },
  { file: "numbers/a1/cincuenta.mp3",    text: "cincuenta"    },
  { file: "numbers/a1/sesenta.mp3",      text: "sesenta"      },
  { file: "numbers/a1/setenta.mp3",      text: "setenta"      },
  { file: "numbers/a1/ochenta.mp3",      text: "ochenta"      },
  { file: "numbers/a1/noventa.mp3",      text: "noventa"      },
  { file: "numbers/a1/cien.mp3",         text: "cien"         },
  { file: "numbers/a1/mil.mp3",          text: "mil"          },

  // ── OPÉRATIONS ───────────────────────────────────────────────────────────
  { file: "operations/a1/mas.mp3",              text: "más"              },
  { file: "operations/a1/menos.mp3",            text: "menos"            },
  { file: "operations/a1/por.mp3",              text: "por"              },
  { file: "operations/a1/dividido.mp3",         text: "dividido"         },
  { file: "operations/a1/igual.mp3",            text: "igual"            },
  { file: "operations/a1/suma.mp3",             text: "suma"             },
  { file: "operations/a1/resta.mp3",            text: "resta"            },
  { file: "operations/a1/multiplicacion.mp3",   text: "multiplicación"   },
  { file: "operations/a1/division.mp3",         text: "división"         },
  { file: "operations/a1/resultado.mp3",        text: "resultado"        },

  // ── FORMES ───────────────────────────────────────────────────────────────
  { file: "shapes/a1/circulo.mp3",    text: "círculo"    },
  { file: "shapes/a1/cuadrado.mp3",   text: "cuadrado"   },
  { file: "shapes/a1/triangulo.mp3",  text: "triángulo"  },
  { file: "shapes/a1/rectangulo.mp3", text: "rectángulo" },
  { file: "shapes/a1/ovalo.mp3",      text: "óvalo"      },
  { file: "shapes/a1/rombo.mp3",      text: "rombo"      },
  { file: "shapes/a1/pentagono.mp3",  text: "pentágono"  },
  { file: "shapes/a1/hexagono.mp3",   text: "hexágono"   },
  { file: "shapes/a1/esfera.mp3",     text: "esfera"     },
  { file: "shapes/a1/cubo.mp3",       text: "cubo"       },

  // ── COULEURS ─────────────────────────────────────────────────────────────
  { file: "colors/a1/rojo.mp3",     text: "rojo"     },
  { file: "colors/a1/azul.mp3",     text: "azul"     },
  { file: "colors/a1/verde.mp3",    text: "verde"    },
  { file: "colors/a1/amarillo.mp3", text: "amarillo" },
  { file: "colors/a1/negro.mp3",    text: "negro"    },
  { file: "colors/a1/blanco.mp3",   text: "blanco"   },
  { file: "colors/a1/naranja.mp3",  text: "naranja"  },
  { file: "colors/a1/rosa.mp3",     text: "rosa"     },
  { file: "colors/a1/morado.mp3",   text: "morado"   },
  { file: "colors/a1/marron.mp3",   text: "marrón"   },
  { file: "colors/a1/gris.mp3",     text: "gris"     },

  // ── FAMILLE ──────────────────────────────────────────────────────────────
  { file: "family/a1/madre.mp3",    text: "madre"    },
  { file: "family/a1/padre.mp3",    text: "padre"    },
  { file: "family/a1/hermano.mp3",  text: "hermano"  },
  { file: "family/a1/hermana.mp3",  text: "hermana"  },
  { file: "family/a1/abuelo.mp3",   text: "abuelo"   },
  { file: "family/a1/abuela.mp3",   text: "abuela"   },
  { file: "family/a1/hijo.mp3",     text: "hijo"     },
  { file: "family/a1/hija.mp3",     text: "hija"     },
  { file: "family/a1/tio.mp3",      text: "tío"      },
  { file: "family/a1/tia.mp3",      text: "tía"      },
  { file: "family/a1/primo.mp3",    text: "primo"    },
  { file: "family/a1/prima.mp3",    text: "prima"    },

  // ── ÉCOLE ────────────────────────────────────────────────────────────────
  { file: "school/a1/escuela.mp3",   text: "escuela"   },
  { file: "school/a1/clase.mp3",     text: "clase"     },
  { file: "school/a1/libro.mp3",     text: "libro"     },
  { file: "school/a1/lapiz.mp3",     text: "lápiz"     },
  { file: "school/a1/boligrafo.mp3", text: "bolígrafo" },
  { file: "school/a1/cuaderno.mp3",  text: "cuaderno"  },
  { file: "school/a1/mochila.mp3",   text: "mochila"   },
  { file: "school/a1/pizarra.mp3",   text: "pizarra"   },
  { file: "school/a1/profe.mp3",     text: "profe"     },
  { file: "school/a1/alumno.mp3",    text: "alumno"    },
  { file: "school/a1/examen.mp3",    text: "examen"    },
  { file: "school/a1/deberes.mp3",   text: "deberes"   },

  // ── CORPS ────────────────────────────────────────────────────────────────
  { file: "body/a1/cabeza.mp3",   text: "cabeza"   },
  { file: "body/a1/ojo.mp3",      text: "ojo"      },
  { file: "body/a1/nariz.mp3",    text: "nariz"    },
  { file: "body/a1/boca.mp3",     text: "boca"     },
  { file: "body/a1/oreja.mp3",    text: "oreja"    },
  { file: "body/a1/mano.mp3",     text: "mano"     },
  { file: "body/a1/pie.mp3",      text: "pie"      },
  { file: "body/a1/brazo.mp3",    text: "brazo"    },
  { file: "body/a1/pierna.mp3",   text: "pierna"   },
  { file: "body/a1/espalda.mp3",  text: "espalda"  },

  // ── ALIMENTATION ─────────────────────────────────────────────────────────
  { file: "food/a1/agua.mp3",     text: "agua"     },
  { file: "food/a1/pan.mp3",      text: "pan"      },
  { file: "food/a1/leche.mp3",    text: "leche"    },
  { file: "food/a1/fruta.mp3",    text: "fruta"    },
  { file: "food/a1/manzana.mp3",  text: "manzana"  },
  { file: "food/a1/naranja.mp3",  text: "naranja"  },
  { file: "food/a1/carne.mp3",    text: "carne"    },
  { file: "food/a1/pescado.mp3",  text: "pescado"  },
  { file: "food/a1/arroz.mp3",    text: "arroz"    },
  { file: "food/a1/verdura.mp3",  text: "verdura"  },
  { file: "food/a1/huevo.mp3",    text: "huevo"    },
  { file: "food/a1/queso.mp3",    text: "queso"    },

  // ── ANIMAUX ──────────────────────────────────────────────────────────────
  { file: "animals/a1/perro.mp3",    text: "perro"    },
  { file: "animals/a1/gato.mp3",     text: "gato"     },
  { file: "animals/a1/caballo.mp3",  text: "caballo"  },
  { file: "animals/a1/vaca.mp3",     text: "vaca"     },
  { file: "animals/a1/pajaro.mp3",   text: "pájaro"   },
  { file: "animals/a1/pez.mp3",      text: "pez"      },
  { file: "animals/a1/conejo.mp3",   text: "conejo"   },
  { file: "animals/a1/leon.mp3",     text: "león"     },
  { file: "animals/a1/elefante.mp3", text: "elefante" },
  { file: "animals/a1/tortuga.mp3",  text: "tortuga"  },

  // ── VÊTEMENTS ────────────────────────────────────────────────────────────
  { file: "clothes/a1/camisa.mp3",   text: "camisa"   },
  { file: "clothes/a1/pantalon.mp3", text: "pantalón" },
  { file: "clothes/a1/zapato.mp3",   text: "zapato"   },
  { file: "clothes/a1/vestido.mp3",  text: "vestido"  },
  { file: "clothes/a1/falda.mp3",    text: "falda"    },
  { file: "clothes/a1/calcetin.mp3", text: "calcetín" },
  { file: "clothes/a1/abrigo.mp3",   text: "abrigo"   },
  { file: "clothes/a1/gorra.mp3",    text: "gorra"    },
  { file: "clothes/a1/bufanda.mp3",  text: "bufanda"  },
  { file: "clothes/a1/sudadera.mp3", text: "sudadera" },

  // ── MAISON ───────────────────────────────────────────────────────────────
  { file: "house/a1/casa.mp3",       text: "casa"       },
  { file: "house/a1/cocina.mp3",     text: "cocina"     },
  { file: "house/a1/salon.mp3",      text: "salón"      },
  { file: "house/a1/dormitorio.mp3", text: "dormitorio" },
  { file: "house/a1/bano.mp3",       text: "baño"       },
  { file: "house/a1/jardin.mp3",     text: "jardín"     },
  { file: "house/a1/puerta.mp3",     text: "puerta"     },
  { file: "house/a1/ventana.mp3",    text: "ventana"    },
  { file: "house/a1/mesa.mp3",       text: "mesa"       },
  { file: "house/a1/silla.mp3",      text: "silla"      },
  { file: "house/a1/cama.mp3",       text: "cama"       },

  // ── JOURS ────────────────────────────────────────────────────────────────
  { file: "days/a1/lunes.mp3",      text: "lunes"      },
  { file: "days/a1/martes.mp3",     text: "martes"     },
  { file: "days/a1/miercoles.mp3",  text: "miércoles"  },
  { file: "days/a1/jueves.mp3",     text: "jueves"     },
  { file: "days/a1/viernes.mp3",    text: "viernes"    },
  { file: "days/a1/sabado.mp3",     text: "sábado"     },
  { file: "days/a1/domingo.mp3",    text: "domingo"    },

  // ── MOIS ─────────────────────────────────────────────────────────────────
  { file: "days/a1/enero.mp3",      text: "enero"      },
  { file: "days/a1/febrero.mp3",    text: "febrero"    },
  { file: "days/a1/marzo.mp3",      text: "marzo"      },
  { file: "days/a1/abril.mp3",      text: "abril"      },
  { file: "days/a1/mayo.mp3",       text: "mayo"       },
  { file: "days/a1/junio.mp3",      text: "junio"      },
  { file: "days/a1/julio.mp3",      text: "julio"      },
  { file: "days/a1/agosto.mp3",     text: "agosto"     },
  { file: "days/a1/septiembre.mp3", text: "septiembre" },
  { file: "days/a1/octubre.mp3",    text: "octubre"    },
  { file: "days/a1/noviembre.mp3",  text: "noviembre"  },
  { file: "days/a1/diciembre.mp3",  text: "diciembre"  },

  // ── SALUTATIONS ──────────────────────────────────────────────────────────
  { file: "greetings/a1/hola.mp3",           text: "hola"             },
  { file: "greetings/a1/adios.mp3",          text: "adiós"            },
  { file: "greetings/a1/buenos_dias.mp3",    text: "buenos días"      },
  { file: "greetings/a1/buenas_tardes.mp3",  text: "buenas tardes"    },
  { file: "greetings/a1/buenas_noches.mp3",  text: "buenas noches"    },
  { file: "greetings/a1/por_favor.mp3",      text: "por favor"        },
  { file: "greetings/a1/gracias.mp3",        text: "gracias"          },
  { file: "greetings/a1/de_nada.mp3",        text: "de nada"          },
  { file: "greetings/a1/perdon.mp3",         text: "perdón"           },
  { file: "greetings/a1/como_te_llamas.mp3", text: "¿Cómo te llamas?" },
  { file: "greetings/a1/me_llamo.mp3",       text: "me llamo"         },
  { file: "greetings/a1/cuantos_anos.mp3",   text: "¿Cuántos años tienes?" },

  // ════════════════════════════════════════════════════════════════════════
  // A2 — Vie quotidienne, voyage, métiers, météo
  // ════════════════════════════════════════════════════════════════════════

  // ── VIE QUOTIDIENNE ──────────────────────────────────────────────────────
  { file: "daily_life/a2/ciudad.mp3", text: "ciudad" },
  { file: "daily_life/a2/calle.mp3",  text: "calle"  },

  // ── SHOPPING ─────────────────────────────────────────────────────────────
  { file: "shopping/a2/tienda.mp3",  text: "tienda"  },
  { file: "shopping/a2/mercado.mp3", text: "mercado" },
  { file: "shopping/a2/banco.mp3",   text: "banco"   },

  // ── SANTÉ ────────────────────────────────────────────────────────────────
  { file: "health/a2/hospital.mp3",  text: "hospital"  },
  { file: "health/a2/farmacia.mp3",  text: "farmacia"  },

  // ── VOYAGE ───────────────────────────────────────────────────────────────
  { file: "travel/a2/autobus.mp3", text: "autobús" },
  { file: "travel/a2/tren.mp3",    text: "tren"    },
  { file: "travel/a2/avion.mp3",   text: "avión"   },

  // ── MÉTIERS ──────────────────────────────────────────────────────────────
  { file: "jobs/a2/medico.mp3",     text: "médico"    },
  { file: "jobs/a2/enfermero.mp3",  text: "enfermero" },
  { file: "jobs/a2/maestro.mp3",    text: "maestro"   },
  { file: "jobs/a2/policia.mp3",    text: "policía"   },
  { file: "jobs/a2/bombero.mp3",    text: "bombero"   },

  // ── MÉTÉO ─────────────────────────────────────────────────────────────────
  { file: "weather/a2/tiempo.mp3", text: "tiempo" },
  { file: "weather/a2/lluvia.mp3", text: "lluvia" },
  { file: "weather/a2/sol.mp3",    text: "sol"    },
  { file: "weather/a2/viento.mp3", text: "viento" },
  { file: "weather/a2/nieve.mp3",  text: "nieve"  },

  // ════════════════════════════════════════════════════════════════════════
  // B1 — Environnement, opinions, médias, économie, science
  // ════════════════════════════════════════════════════════════════════════

  // ── ENVIRONNEMENT ────────────────────────────────────────────────────────
  { file: "environment/b1/medio_ambiente.mp3",   text: "medio ambiente"   },
  { file: "environment/b1/contaminacion.mp3",    text: "contaminación"    },
  { file: "environment/b1/reciclaje.mp3",        text: "reciclaje"        },
  { file: "environment/b1/cambio_climatico.mp3", text: "cambio climático" },
  { file: "environment/b1/energia_solar.mp3",    text: "energía solar"    },

  // ── OPINIONS ─────────────────────────────────────────────────────────────
  { file: "opinions/b1/opinion.mp3",          text: "opinión"          },
  { file: "opinions/b1/creo_que.mp3",         text: "creo que"         },
  { file: "opinions/b1/estoy_de_acuerdo.mp3", text: "estoy de acuerdo" },

  // ── MÉDIAS ───────────────────────────────────────────────────────────────
  { file: "media/b1/periodico.mp3",   text: "periódico"  },
  { file: "media/b1/television.mp3",  text: "televisión" },

  // ── ÉCONOMIE ─────────────────────────────────────────────────────────────
  { file: "economy/b1/economia.mp3", text: "economía"  },
  { file: "economy/b1/empresa.mp3",  text: "empresa"   },

  // ── SCIENCE ──────────────────────────────────────────────────────────────
  { file: "science/b1/laboratorio.mp3",  text: "laboratorio" },
  { file: "science/b1/experimento.mp3",  text: "experimento" },

  // ════════════════════════════════════════════════════════════════════════
  // B2 — Géopolitique, littérature, économie, philosophie
  // ════════════════════════════════════════════════════════════════════════

  // ── GÉOPOLITIQUE ─────────────────────────────────────────────────────────
  { file: "geopolitics/b2/democracia.mp3",   text: "democracia"   },
  { file: "geopolitics/b2/dictadura.mp3",    text: "dictadura"    },
  { file: "geopolitics/b2/inmigracion.mp3",  text: "inmigración"  },

  // ── LITTÉRATURE ──────────────────────────────────────────────────────────
  { file: "literature/b2/literatura.mp3",    text: "literatura"   },
  { file: "literature/b2/poesia.mp3",        text: "poesía"       },

  // ── ÉCONOMIE B2 ──────────────────────────────────────────────────────────
  { file: "economics/b2/globalizacion.mp3",  text: "globalización" },
  { file: "economics/b2/desigualdad.mp3",    text: "desigualdad"   },

  // ── PHILOSOPHIE ──────────────────────────────────────────────────────────
  { file: "philosophy/b2/etica.mp3",         text: "ética"        },
  { file: "philosophy/b2/libertad.mp3",      text: "libertad"     },
  { file: "philosophy/b2/justicia.mp3",      text: "justicia"     },

];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateAudio(text, outputPath) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      response_format: "mp3",
    });

    const options = {
      hostname: "api.openai.com",
      path: "/v1/audio/speech",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errorData = "";
        res.on("data", (chunk) => (errorData += chunk));
        res.on("end", () => reject(new Error(`HTTP ${res.statusCode}: ${errorData}`)));
        return;
      }

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);
        resolve();
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const isDryRun  = args.includes("--dry-run");
  const onlyMissing = args.includes("--missing");
  const forceAll  = args.includes("--force");
  const groupArg  = args.find((a) => a.startsWith("--group="))?.split("=")[1];

  if (!isDryRun && !OPENAI_API_KEY) {
    console.error("❌  Variable OPENAI_API_KEY manquante dans .env.local");
    console.error("    Ajoutez : OPENAI_API_KEY=sk-...");
    process.exit(1);
  }

  let entries = AUDIO_ENTRIES;

  if (groupArg) {
    entries = entries.filter((e) => e.file.startsWith(groupArg));
    console.log(`\n🔍  Groupe "${groupArg}" : ${entries.length} fichiers\n`);
  }

  if (onlyMissing) {
    entries = entries.filter((e) => !fileExists(path.join(OUTPUT_DIR, e.file)));
    console.log(`\n🔍  Fichiers manquants uniquement : ${entries.length}\n`);
  }

  const total = entries.length;
  let generated = 0;
  let skipped   = 0;
  let errors    = 0;

  console.log(`\n🎙️  OpenAI TTS — voice: ${VOICE} — model: ${MODEL}`);
  console.log(`📁  Destination : public/audio/espagnol/`);
  console.log(`📊  Total : ${total} fichiers\n`);

  for (const entry of entries) {
    const outputPath = path.join(OUTPUT_DIR, entry.file);

    if (!forceAll && fileExists(outputPath)) {
      process.stdout.write(`⏭️  skip   ${entry.file}\n`);
      skipped++;
      continue;
    }

    if (isDryRun) {
      process.stdout.write(`🔵  [dry]  ${entry.file} → "${entry.text}"\n`);
      generated++;
      continue;
    }

    try {
      ensureDir(outputPath);
      await generateAudio(entry.text, outputPath);
      process.stdout.write(`✅  gen    ${entry.file}\n`);
      generated++;
      await sleep(DELAY_MS);
    } catch (err) {
      process.stdout.write(`❌  error  ${entry.file} — ${err.message}\n`);
      errors++;
    }
  }

  console.log(`\n─────────────────────────────────────────`);
  console.log(`✅  Générés  : ${generated}`);
  console.log(`⏭️  Ignorés  : ${skipped}`);
  console.log(`❌  Erreurs  : ${errors}`);
  console.log(`─────────────────────────────────────────\n`);
}

main();
