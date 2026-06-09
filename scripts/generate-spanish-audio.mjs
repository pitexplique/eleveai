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
// Format : { file: "groupe/nom.mp3", text: "texte à lire en espagnol" }

const AUDIO_ENTRIES = [

  // ── CHIFFRES (0 → 10) ────────────────────────────────────────────────────
  { file: "digits/cero.mp3",   text: "cero"   },
  { file: "digits/uno.mp3",    text: "uno"    },
  { file: "digits/dos.mp3",    text: "dos"    },
  { file: "digits/tres.mp3",   text: "tres"   },
  { file: "digits/cuatro.mp3", text: "cuatro" },
  { file: "digits/cinco.mp3",  text: "cinco"  },
  { file: "digits/seis.mp3",   text: "seis"   },
  { file: "digits/siete.mp3",  text: "siete"  },
  { file: "digits/ocho.mp3",   text: "ocho"   },
  { file: "digits/nueve.mp3",  text: "nueve"  },
  { file: "digits/diez.mp3",   text: "diez"   },

  // ── NOMBRES (11 → 1000) ──────────────────────────────────────────────────
  { file: "numbers/once.mp3",         text: "once"         },
  { file: "numbers/doce.mp3",         text: "doce"         },
  { file: "numbers/trece.mp3",        text: "trece"        },
  { file: "numbers/catorce.mp3",      text: "catorce"      },
  { file: "numbers/quince.mp3",       text: "quince"       },
  { file: "numbers/veinte.mp3",       text: "veinte"       },
  { file: "numbers/treinta.mp3",      text: "treinta"      },
  { file: "numbers/cuarenta.mp3",     text: "cuarenta"     },
  { file: "numbers/cincuenta.mp3",    text: "cincuenta"    },
  { file: "numbers/sesenta.mp3",      text: "sesenta"      },
  { file: "numbers/setenta.mp3",      text: "setenta"      },
  { file: "numbers/ochenta.mp3",      text: "ochenta"      },
  { file: "numbers/noventa.mp3",      text: "noventa"      },
  { file: "numbers/cien.mp3",         text: "cien"         },
  { file: "numbers/mil.mp3",          text: "mil"          },

  // ── OPÉRATIONS ───────────────────────────────────────────────────────────
  { file: "operations/mas.mp3",              text: "más"              },
  { file: "operations/menos.mp3",            text: "menos"            },
  { file: "operations/por.mp3",              text: "por"              },
  { file: "operations/dividido.mp3",         text: "dividido"         },
  { file: "operations/igual.mp3",            text: "igual"            },
  { file: "operations/suma.mp3",             text: "suma"             },
  { file: "operations/resta.mp3",            text: "resta"            },
  { file: "operations/multiplicacion.mp3",   text: "multiplicación"   },
  { file: "operations/division.mp3",         text: "división"         },
  { file: "operations/resultado.mp3",        text: "resultado"        },

  // ── FORMES ───────────────────────────────────────────────────────────────
  { file: "shapes/circulo.mp3",    text: "círculo"    },
  { file: "shapes/cuadrado.mp3",   text: "cuadrado"   },
  { file: "shapes/triangulo.mp3",  text: "triángulo"  },
  { file: "shapes/rectangulo.mp3", text: "rectángulo" },
  { file: "shapes/ovalo.mp3",      text: "óvalo"      },
  { file: "shapes/rombo.mp3",      text: "rombo"      },
  { file: "shapes/pentagono.mp3",  text: "pentágono"  },
  { file: "shapes/hexagono.mp3",   text: "hexágono"   },
  { file: "shapes/esfera.mp3",     text: "esfera"     },
  { file: "shapes/cubo.mp3",       text: "cubo"       },

  // ── COULEURS ─────────────────────────────────────────────────────────────
  { file: "colors/rojo.mp3",     text: "rojo"     },
  { file: "colors/azul.mp3",     text: "azul"     },
  { file: "colors/verde.mp3",    text: "verde"    },
  { file: "colors/amarillo.mp3", text: "amarillo" },
  { file: "colors/negro.mp3",    text: "negro"    },
  { file: "colors/blanco.mp3",   text: "blanco"   },
  { file: "colors/naranja.mp3",  text: "naranja"  },
  { file: "colors/rosa.mp3",     text: "rosa"     },
  { file: "colors/morado.mp3",   text: "morado"   },
  { file: "colors/marron.mp3",   text: "marrón"   },
  { file: "colors/gris.mp3",     text: "gris"     },

  // ── FAMILLE ──────────────────────────────────────────────────────────────
  { file: "family/madre.mp3",    text: "madre"    },
  { file: "family/padre.mp3",    text: "padre"    },
  { file: "family/hermano.mp3",  text: "hermano"  },
  { file: "family/hermana.mp3",  text: "hermana"  },
  { file: "family/abuelo.mp3",   text: "abuelo"   },
  { file: "family/abuela.mp3",   text: "abuela"   },
  { file: "family/hijo.mp3",     text: "hijo"     },
  { file: "family/hija.mp3",     text: "hija"     },
  { file: "family/tio.mp3",      text: "tío"      },
  { file: "family/tia.mp3",      text: "tía"      },
  { file: "family/primo.mp3",    text: "primo"    },
  { file: "family/prima.mp3",    text: "prima"    },

  // ── ÉCOLE ────────────────────────────────────────────────────────────────
  { file: "school/escuela.mp3",   text: "escuela"   },
  { file: "school/clase.mp3",     text: "clase"     },
  { file: "school/libro.mp3",     text: "libro"     },
  { file: "school/lapiz.mp3",     text: "lápiz"     },
  { file: "school/boligrafo.mp3", text: "bolígrafo" },
  { file: "school/cuaderno.mp3",  text: "cuaderno"  },
  { file: "school/mochila.mp3",   text: "mochila"   },
  { file: "school/pizarra.mp3",   text: "pizarra"   },
  { file: "school/profe.mp3",     text: "profe"     },
  { file: "school/alumno.mp3",    text: "alumno"    },
  { file: "school/examen.mp3",    text: "examen"    },
  { file: "school/deberes.mp3",   text: "deberes"   },

  // ── CORPS ────────────────────────────────────────────────────────────────
  { file: "body/cabeza.mp3",   text: "cabeza"   },
  { file: "body/ojo.mp3",      text: "ojo"      },
  { file: "body/nariz.mp3",    text: "nariz"    },
  { file: "body/boca.mp3",     text: "boca"     },
  { file: "body/oreja.mp3",    text: "oreja"    },
  { file: "body/mano.mp3",     text: "mano"     },
  { file: "body/pie.mp3",      text: "pie"      },
  { file: "body/brazo.mp3",    text: "brazo"    },
  { file: "body/pierna.mp3",   text: "pierna"   },
  { file: "body/espalda.mp3",  text: "espalda"  },

  // ── ALIMENTATION ─────────────────────────────────────────────────────────
  { file: "food/agua.mp3",     text: "agua"     },
  { file: "food/pan.mp3",      text: "pan"      },
  { file: "food/leche.mp3",    text: "leche"    },
  { file: "food/fruta.mp3",    text: "fruta"    },
  { file: "food/manzana.mp3",  text: "manzana"  },
  { file: "food/naranja.mp3",  text: "naranja"  },
  { file: "food/carne.mp3",    text: "carne"    },
  { file: "food/pescado.mp3",  text: "pescado"  },
  { file: "food/arroz.mp3",    text: "arroz"    },
  { file: "food/verdura.mp3",  text: "verdura"  },
  { file: "food/huevo.mp3",    text: "huevo"    },
  { file: "food/queso.mp3",    text: "queso"    },

  // ── ANIMAUX ──────────────────────────────────────────────────────────────
  { file: "animals/perro.mp3",    text: "perro"    },
  { file: "animals/gato.mp3",     text: "gato"     },
  { file: "animals/caballo.mp3",  text: "caballo"  },
  { file: "animals/vaca.mp3",     text: "vaca"     },
  { file: "animals/pajaro.mp3",   text: "pájaro"   },
  { file: "animals/pez.mp3",      text: "pez"      },
  { file: "animals/conejo.mp3",   text: "conejo"   },
  { file: "animals/leon.mp3",     text: "león"     },
  { file: "animals/elefante.mp3", text: "elefante" },
  { file: "animals/tortuga.mp3",  text: "tortuga"  },

  // ── VÊTEMENTS ────────────────────────────────────────────────────────────
  { file: "clothes/camisa.mp3",   text: "camisa"   },
  { file: "clothes/pantalon.mp3", text: "pantalón" },
  { file: "clothes/zapato.mp3",   text: "zapato"   },
  { file: "clothes/vestido.mp3",  text: "vestido"  },
  { file: "clothes/falda.mp3",    text: "falda"    },
  { file: "clothes/calcetin.mp3", text: "calcetín" },
  { file: "clothes/abrigo.mp3",   text: "abrigo"   },
  { file: "clothes/gorra.mp3",    text: "gorra"    },
  { file: "clothes/bufanda.mp3",  text: "bufanda"  },
  { file: "clothes/sudadera.mp3", text: "sudadera" },

  // ── MAISON ───────────────────────────────────────────────────────────────
  { file: "house/casa.mp3",       text: "casa"       },
  { file: "house/cocina.mp3",     text: "cocina"     },
  { file: "house/salon.mp3",      text: "salón"      },
  { file: "house/dormitorio.mp3", text: "dormitorio" },
  { file: "house/bano.mp3",       text: "baño"       },
  { file: "house/jardin.mp3",     text: "jardín"     },
  { file: "house/puerta.mp3",     text: "puerta"     },
  { file: "house/ventana.mp3",    text: "ventana"    },
  { file: "house/mesa.mp3",       text: "mesa"       },
  { file: "house/silla.mp3",      text: "silla"      },
  { file: "house/cama.mp3",       text: "cama"       },

  // ── JOURS ────────────────────────────────────────────────────────────────
  { file: "days/lunes.mp3",      text: "lunes"      },
  { file: "days/martes.mp3",     text: "martes"     },
  { file: "days/miercoles.mp3",  text: "miércoles"  },
  { file: "days/jueves.mp3",     text: "jueves"     },
  { file: "days/viernes.mp3",    text: "viernes"    },
  { file: "days/sabado.mp3",     text: "sábado"     },
  { file: "days/domingo.mp3",    text: "domingo"    },

  // ── MOIS ─────────────────────────────────────────────────────────────────
  { file: "days/enero.mp3",      text: "enero"      },
  { file: "days/febrero.mp3",    text: "febrero"    },
  { file: "days/marzo.mp3",      text: "marzo"      },
  { file: "days/abril.mp3",      text: "abril"      },
  { file: "days/mayo.mp3",       text: "mayo"       },
  { file: "days/junio.mp3",      text: "junio"      },
  { file: "days/julio.mp3",      text: "julio"      },
  { file: "days/agosto.mp3",     text: "agosto"     },
  { file: "days/septiembre.mp3", text: "septiembre" },
  { file: "days/octubre.mp3",    text: "octubre"    },
  { file: "days/noviembre.mp3",  text: "noviembre"  },
  { file: "days/diciembre.mp3",  text: "diciembre"  },

  // ── SALUTATIONS ──────────────────────────────────────────────────────────
  { file: "greetings/hola.mp3",           text: "hola"             },
  { file: "greetings/adios.mp3",          text: "adiós"            },
  { file: "greetings/buenos_dias.mp3",    text: "buenos días"      },
  { file: "greetings/buenas_tardes.mp3",  text: "buenas tardes"    },
  { file: "greetings/buenas_noches.mp3",  text: "buenas noches"    },
  { file: "greetings/por_favor.mp3",      text: "por favor"        },
  { file: "greetings/gracias.mp3",        text: "gracias"          },
  { file: "greetings/de_nada.mp3",        text: "de nada"          },
  { file: "greetings/perdon.mp3",         text: "perdón"           },
  { file: "greetings/como_te_llamas.mp3", text: "¿Cómo te llamas?" },
  { file: "greetings/me_llamo.mp3",       text: "me llamo"         },
  { file: "greetings/cuantos_anos.mp3",   text: "¿Cuántos años tienes?" },

  // ════════════════════════════════════════════════════════════════════════
  // A2 — Vie quotidienne, voyage, métiers, météo
  // ════════════════════════════════════════════════════════════════════════

  // ── VIE QUOTIDIENNE ──────────────────────────────────────────────────────
  { file: "daily_life/ciudad.mp3", text: "ciudad" },
  { file: "daily_life/calle.mp3",  text: "calle"  },

  // ── SHOPPING ─────────────────────────────────────────────────────────────
  { file: "shopping/tienda.mp3",  text: "tienda"  },
  { file: "shopping/mercado.mp3", text: "mercado" },
  { file: "shopping/banco.mp3",   text: "banco"   },

  // ── SANTÉ ────────────────────────────────────────────────────────────────
  { file: "health/hospital.mp3",  text: "hospital"  },
  { file: "health/farmacia.mp3",  text: "farmacia"  },

  // ── VOYAGE ───────────────────────────────────────────────────────────────
  { file: "travel/autobus.mp3", text: "autobús" },
  { file: "travel/tren.mp3",    text: "tren"    },
  { file: "travel/avion.mp3",   text: "avión"   },

  // ── MÉTIERS ──────────────────────────────────────────────────────────────
  { file: "jobs/medico.mp3",     text: "médico"    },
  { file: "jobs/enfermero.mp3",  text: "enfermero" },
  { file: "jobs/maestro.mp3",    text: "maestro"   },
  { file: "jobs/policia.mp3",    text: "policía"   },
  { file: "jobs/bombero.mp3",    text: "bombero"   },

  // ── MÉTÉO ─────────────────────────────────────────────────────────────────
  { file: "weather/tiempo.mp3", text: "tiempo" },
  { file: "weather/lluvia.mp3", text: "lluvia" },
  { file: "weather/sol.mp3",    text: "sol"    },
  { file: "weather/viento.mp3", text: "viento" },
  { file: "weather/nieve.mp3",  text: "nieve"  },

  // ════════════════════════════════════════════════════════════════════════
  // B1 — Environnement, opinions, médias, économie, science
  // ════════════════════════════════════════════════════════════════════════

  // ── ENVIRONNEMENT ────────────────────────────────────────────────────────
  { file: "environment/medio_ambiente.mp3",   text: "medio ambiente"   },
  { file: "environment/contaminacion.mp3",    text: "contaminación"    },
  { file: "environment/reciclaje.mp3",        text: "reciclaje"        },
  { file: "environment/cambio_climatico.mp3", text: "cambio climático" },
  { file: "environment/energia_solar.mp3",    text: "energía solar"    },

  // ── OPINIONS ─────────────────────────────────────────────────────────────
  { file: "opinions/opinion.mp3",          text: "opinión"          },
  { file: "opinions/creo_que.mp3",         text: "creo que"         },
  { file: "opinions/estoy_de_acuerdo.mp3", text: "estoy de acuerdo" },

  // ── MÉDIAS ───────────────────────────────────────────────────────────────
  { file: "media/periodico.mp3",   text: "periódico"  },
  { file: "media/television.mp3",  text: "televisión" },

  // ── ÉCONOMIE ─────────────────────────────────────────────────────────────
  { file: "economy/economia.mp3", text: "economía"  },
  { file: "economy/empresa.mp3",  text: "empresa"   },

  // ── SCIENCE ──────────────────────────────────────────────────────────────
  { file: "science/laboratorio.mp3",  text: "laboratorio" },
  { file: "science/experimento.mp3",  text: "experimento" },

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
