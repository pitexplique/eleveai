// Voix de la série Saphir : synthèse Windows (scripts/film-noel-voix.ps1, perso « PereNoel » = Paul grave), puis réglage propre au vieil homme.
//   node scripts/film-saphir-voix.mjs episode1  → manim/film-saphir/voix/episode1/*.wav + durees.json
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const REGLAGES = { PereNoel: { hauteur: .84, tempo: 1.02 } }; // le vieil homme : grave, lent, à voix basse
const partie = process.argv[2] || 'episode1';
const RACINE = process.cwd();
const json = path.join(RACINE, `manim/film-saphir/dialogues-${partie}.json`);
const dossier = path.join(RACINE, `manim/film-saphir/voix/${partie}`);
const r = spawnSync('powershell', ['-ExecutionPolicy', 'Bypass', '-File', path.join(RACINE, 'scripts/film-noel-voix.ps1'), '-Fichier', json, '-Dossier', dossier], { stdio: 'inherit' });
if (r.status !== 0) throw new Error('Synthèse des voix échouée');
const lignes = JSON.parse(readFileSync(json, 'utf8')), durees = {};
for (const [id, { perso }] of Object.entries(lignes)) {
  const brut = path.join(dossier, `${id}-brut.wav`), fin = path.join(dossier, `${id}.wav`), R = REGLAGES[perso];
  const taux = Number(spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=sample_rate', '-of', 'csv=p=0', brut], { encoding: 'utf8' }).stdout.trim());
  const f = [`asetrate=${Math.round(taux * R.hauteur)}`, 'aresample=44100', `atempo=${R.tempo}`, 'highpass=f=70', 'lowpass=f=7000',
    'acompressor=threshold=0.25:ratio=2.5:makeup=1.4', 'aecho=0.8:0.5:60:0.12', 'volume=0.8',
    'silenceremove=start_periods=1:start_threshold=-45dB', 'areverse', 'silenceremove=start_periods=1:start_threshold=-45dB', 'areverse'];
  const q = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', brut, '-af', f.join(','), '-ac', '1', fin], { stdio: 'inherit' });
  if (q.status !== 0) throw new Error('Réglage de la voix échoué : ' + id);
  rmSync(brut);
  durees[id] = Number(spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fin], { encoding: 'utf8' }).stdout.trim());
}
writeFileSync(path.join(dossier, 'durees.json'), JSON.stringify(durees, null, 1));
console.log(durees);
