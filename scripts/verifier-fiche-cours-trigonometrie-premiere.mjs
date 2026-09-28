// Recalcul indépendant des nombres cités dans la fiche de cours de trigonométrie
// de 1re spé (lib/fiches/maths-premiere-trigonometrie.tsx). Les valeurs des
// cercles, elles, sont calculées par le canvas : rien à vérifier ici.
//   node scripts/verifier-fiche-cours-trigonometrie-premiere.mjs
const { PI, cos, sin, sqrt, abs } = Math;
let ko = 0;
const ok = (nom, a, b, tol = 1e-9) => {
  const bon = abs(a - b) <= tol;
  if (!bon) ko++;
  console.log(`${bon ? "✅" : "❌"} ${nom} : ${a} ≟ ${b}`);
};

// Radian et arc
ok("30° = π/6", (30 * PI) / 180, PI / 6);
ok("135° = 3π/4", (135 * PI) / 180, (3 * PI) / 4);
ok("arc R=4, 3π/4 ≈ 9,42", 4 * (3 * PI) / 4, 9.42, 0.005);
ok("arc R=2, π/3 ≈ 2,09", (2 * PI) / 3, 2.09, 0.005);
ok("150° = 5π/6", (150 * PI) / 180, (5 * PI) / 6);

// Valeurs remarquables et démonstrations
ok("cos π/3 = 1/2", cos(PI / 3), 0.5);
ok("sin π/3 = √3/2", sin(PI / 3), sqrt(3) / 2);
ok("cos π/4 = √2/2", cos(PI / 4), sqrt(2) / 2);
ok("sin π/6 = 1/2", sin(PI / 6), 0.5);

// Angles associés, grands réels
ok("cos 47π/6 = √3/2", cos((47 * PI) / 6), sqrt(3) / 2);
ok("sin 47π/6 = −1/2", sin((47 * PI) / 6), -0.5);
ok("47π/6 = 8π − π/6", (47 * PI) / 6, 8 * PI - PI / 6);
ok("cos 25π/4 = √2/2", cos((25 * PI) / 4), sqrt(2) / 2);
ok("cos 2π/3 = −1/2", cos((2 * PI) / 3), -0.5);
ok("sin 2π/3 = √3/2", sin((2 * PI) / 3), sqrt(3) / 2);
ok("sin −π/4 = −√2/2", sin(-PI / 4), -sqrt(2) / 2);

// cos² + sin² = 1
ok("sin x = 3/5 → |cos x| = 4/5", sqrt(1 - 9 / 25), 0.8);
ok("cos x = 0,6 → |sin x| = 0,8", sqrt(1 - 0.36), 0.8);

// Grande roue
ok("55 + 50 sin π/6 = 80", 55 + 50 * sin(PI / 6), 80);

// Archimède
ok("6 sin π/6 = 3", 6 * sin(PI / 6), 3);
ok("12 sin π/12 ≈ 3,1058", 12 * sin(PI / 12), 3.1058, 5e-5);
ok("96 sin π/96 ≈ 3,1410", 96 * sin(PI / 96), 3.141, 5e-5);
ok("96 sin π/96 < π", 96 * sin(PI / 96) < PI ? 1 : 0, 1);

console.log(ko ? `\n❌ ${ko} erreur(s)` : "\n✅ Tout est juste.");
process.exit(ko ? 1 : 0);
