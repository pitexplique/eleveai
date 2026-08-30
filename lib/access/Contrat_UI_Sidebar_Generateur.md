# Contrat UI — Sidebar Générateur (EleveAI)

> **Document interne (dev / produit)**  
> Objectif : figer une **politique d’affichage** claire et durable pour éviter les doublons Header/Sidebar et garder une UX cohérente quand on ajoute des rôles (email, collège, direction, prof collège, etc.).  
> Date : 2026-01-11  
> Statut : **Contrat vivant** (à maintenir si on change l’architecture)

---

## 1) Périmètre

### ✅ La Sidebar “Générateur” s’affiche uniquement sur :
- `/espace-profs`
- `/espace-eleves`
- `/espace-parents`
(+ leurs sous-pages éventuelles)

> ⛔ **`/espace-atelier-IA` et `/atelier-IA` N’EXISTENT PLUS** — supprimées le
> 24/06/2026 (commit `3765686c`). Elles figuraient encore ici le 29/08, soit
> deux mois pendant lesquels ce contrat décrivait un écran disparu. Ne pas les
> réintroduire en lisant une vieille version de ce fichier : `/atelier-IA` rend
> un 404, volontairement, et ne doit pas être redirigée (décision de Frédéric,
> 29/08 : « faut enlever atelier-ia »).

👉 Ces pages sont les **générateurs de prompts**.

### ⛔ La Sidebar “Générateur” ne s’affiche jamais sur :
- `/dashboard/*` (email)
- `/direction` (chef d’établissement)
- pages d’auth (`/auth/*`)
- pages publiques (`/accueil`, blog, etc.)

✅ En revanche, le **Header global reste visible partout**, y compris dans le dashboard et la direction, pour revenir facilement aux générateurs.

---

## 2) Règles UX globales (Header vs Sidebar)

### Header global
- Sert à naviguer entre les univers : Profs / Élèves / Parents. (L’univers
  « Atelier-IA » a été retiré le 24/06/2026, voir le § 1.)
- Évite les liens “en double” : si une route est déjà dans le Header, on n’a pas besoin de la remettre en gros dans la Sidebar.

### Sidebar Générateur
- Sert d’outil **fonctionnel** lié à la génération :
  - Quota du jour
  - Bibliothèque (si dispo)
  - Historique (si dispo)
  - Conseils rapides
  - Footer Auth (Compte/Connexion/Déconnexion selon état)

---

## 3) États supportés (fondation)

Les états sont ceux de `/test` via `AccessMock` :

### Plans (droits)
- `anon` : 1 req/j, bibliothèque OFF
- `email_free` : 3 req/j, bibliothèque OFF
- `email_paid` : 30 req/j (plafond technique), bibliothèque ON illimitée
- `college` : 5 req/j, bibliothèque ON 30 jours

### AuthType
- `anon`
- `email`
- `college`

### Rôles collège
- `eleve`
- `prof` ✅ (nouveau)
- `direction`
- `vie_scolaire`
- `aesh`
- `personnels`
- `administration`

---

## 4) Contrat de contenu — Sidebar Générateur

### 4.1 Sections à afficher
Dans la sidebar (sur générateurs uniquement), on affiche toujours :

1. **Quota du jour**
   - `usedToday / dailyLimit — reste X`

2. **Bibliothèque**
   - OFF si `plan = anon | email_free`
   - ON si `plan = email_paid | college`
   - Mention :
     - `illimitée` si `email_paid`
     - `30 jours` si `college`

3. **Historique**
   - OFF si `anon`
   - ON si connecté (`email_*` ou `college`)
   - (Si besoin de finesse plus tard → ajouter un FeatureFlag dédié)

4. **Conseils rapides**
   - Toujours ON (élément pédagogique)

---

## 5) Contrat de navigation — Footer Auth de la Sidebar

Le footer (en bas de sidebar générateur) ne doit jamais casser l’architecture (pas de dashboard en double, etc.).

### 5.1 Cas : invité (anon)
- Bouton 1 : **Connexion** → `/auth/signin`
- Bouton 2 : **Inscription** → `/auth/signup`

### 5.2 Cas : connecté EMAIL (email_free / email_paid)
- Bouton 1 : **Mon compte** → `/dashboard`
- Bouton 2 : **Déconnexion** → `/auth/signout`

✅ Le dashboard gère ses propres pages (`/dashboard/presets`, `/dashboard/historique`, etc.)  
⛔ Le dashboard n’a pas de sidebar (la sidebar est réservée aux générateurs)

### 5.3 Cas : connecté COLLÈGE — direction (principal)
- Bouton 1 : **Mon compte** → `/direction`
- Bouton 2 : **Déconnexion** → `/auth/signout`

### 5.4 Cas : connecté COLLÈGE — non direction (élève, prof, vie, aesh, etc.)
- Bouton 1 : **Mon établissement** → `/espace-colleges`
- Bouton 2 : **Déconnexion** → `/auth/signout`

✅ Important : le **prof collège** est dans ce cas.  
Il utilise tous les générateurs pédagogiques via Header + quotas collège.

---

## 6) Feature flags (affichage routes)

L’affichage des routes (hub collège, espaces collège, direction, etc.) est **piloté par features**.

- `canSeeDashboard`
- `canSeeCollegeHub`
- `canSeeDirection`
- `canSeeCollegeAdministration`
- `canSeeCollegeVieScolaire`
- `canSeeCollegeAesh`
- `canSeeCollegePersonnels`

> Remarque : pour le prof collège, on n’a pas créé de feature spécifique.  
> Il est “college standard” : accès générateurs + accès hub collège.

---

## 7) Outil interne : page /test (notre garde-fou)

### Rôle de `/test`
- Page interne non exposée utilisateur
- Permet de vérifier visuellement :
  - l’état Access (plan/auth/role)
  - les features
  - les routes visibles
  - le contrat sidebar (sections + footer auth)

### Règle
Si on modifie l’architecture UI, on met à jour :
- `lib/access/access.mock.ts`
- `app/test/TestClient.tsx`
- et ce fichier `Contrat_UI_Sidebar_Generateur.md`

---

# Annexe A — Code (référence)

## A1) `lib/access/access.mock.ts` (version avec `college_prof`)

> Coller ici le code complet que nous avons validé.

```ts
// lib/access/access.mock.ts
import type { Access, AuthType, Plan } from "@/lib/access/access";
import {
  getDailyLimit,
  getLibraryRetentionDays,
  isLibraryEnabled,
  toUIMode,
} from "@/lib/access/access";

/* =========================================================
   1) TYPES (fondation)
========================================================= */

export type MockKey =
  | "anon"
  | "email_free"
  | "email_paid"
  | "college_eleve"
  | "college_prof"
  | "college_admin"
  | "college_vie"
  | "college_aesh"
  | "college_personnels"
  | "college_administration";

export type CollegeRole =
  | "eleve"
  | "prof"
  | "direction"
  | "vie_scolaire"
  | "aesh"
  | "personnels"
  | "administration";

export type FeatureFlag =
  | "canSeeDashboard"
  | "canSeeCollegeHub"
  | "canSeeCollegeAdministration"
  | "canSeeCollegeVieScolaire"
  | "canSeeCollegeAesh"
  | "canSeeCollegePersonnels"
  | "canSeeDirection";

export type AccessMock = Access & {
  mockKey: MockKey;
  userLabel: string;

  isLoggedIn: boolean;

  usedToday: number;

  collegeCode?: string;
  collegeName?: string;
  userCode?: string;
  collegeRole?: CollegeRole;

  features: FeatureFlag[];
};

/* =========================================================
   2) HELPERS
========================================================= */

export function getRemainingToday(
  access: Pick<AccessMock, "dailyLimit" | "usedToday">,
) {
  return Math.max(0, access.dailyLimit - Math.max(0, access.usedToday));
}

function hasFeature(access: Pick<AccessMock, "features">, flag: FeatureFlag) {
  return access.features.includes(flag);
}

export function canSeeDirection(access: Pick<AccessMock, "features">) {
  return hasFeature(access, "canSeeDirection");
}

/* =========================================================
   3) FABRIQUE DE MOCK (cohérente)
========================================================= */

function buildMock(params: {
  mockKey: MockKey;
  authType: AuthType;
  plan: Plan;
  userLabel: string;

  usedToday: number;

  collegeCode?: string;
  collegeName?: string;
  userCode?: string;
  collegeRole?: CollegeRole;

  features: FeatureFlag[];
}): AccessMock {
  const {
    mockKey,
    authType,
    plan,
    userLabel,
    usedToday,
    collegeCode,
    collegeName,
    userCode,
    collegeRole,
    features,
  } = params;

  const dailyLimit = getDailyLimit(plan);
  const libraryRetentionDays = getLibraryRetentionDays(plan);
  const libraryEnabled = isLibraryEnabled(plan);

  const isLoggedIn = plan !== "anon";

  return {
    mockKey,
    userLabel,
    isLoggedIn,

    authType,
    plan,
    uiMode: toUIMode(plan),

    dailyLimit,
    libraryEnabled,
    libraryRetentionDays,

    hints: {
      underGenerateFree: "🕒 Il te reste X requêtes aujourd’hui",
      underGeneratePaid: libraryEnabled
        ? "📚 Cette requête sera ajoutée à ta bibliothèque"
        : undefined,
    },

    usedToday,

    ...(collegeCode ? { collegeCode } : {}),
    ...(collegeName ? { collegeName } : {}),
    ...(userCode ? { userCode } : {}),
    ...(collegeRole ? { collegeRole } : {}),

    features,
  };
}

/* =========================================================
   4) MOCKS “CANON”
========================================================= */

const COLLEGE = {
  collegeCode: "DIMITILE",
  collegeName: "Collège Capitaine Dimitile",
} as const;

const COLLEGE_BASE_FEATURES: FeatureFlag[] = [
  "canSeeDashboard",
  "canSeeCollegeHub",
];

export const ACCESS_MOCKS: Record<MockKey, AccessMock> = {
  anon: buildMock({
    mockKey: "anon",
    authType: "anon",
    plan: "anon",
    userLabel: "Invité (sans connexion)",
    usedToday: 0,
    features: [],
  }),

  email_free: buildMock({
    mockKey: "email_free",
    authType: "email",
    plan: "email_free",
    userLabel: "Compte email (gratuit)",
    usedToday: 1,
    features: ["canSeeDashboard"],
  }),

  email_paid: buildMock({
    mockKey: "email_paid",
    authType: "email",
    plan: "email_paid",
    userLabel: "Compte email (abonné)",
    usedToday: 4,
    features: ["canSeeDashboard"],
  }),

  college_eleve: buildMock({
    mockKey: "college_eleve",
    authType: "college",
    plan: "college",
    userLabel: "Élève (collège)",
    usedToday: 2,
    ...COLLEGE,
    userCode: "eleve-demo",
    collegeRole: "eleve",
    features: [...COLLEGE_BASE_FEATURES],
  }),

  college_prof: buildMock({
    mockKey: "college_prof",
    authType: "college",
    plan: "college",
    userLabel: "Prof (collège)",
    usedToday: 1,
    ...COLLEGE,
    userCode: "prof",
    collegeRole: "prof",
    features: [...COLLEGE_BASE_FEATURES],
  }),

  college_admin: buildMock({
    mockKey: "college_admin",
    authType: "college",
    plan: "college",
    userLabel: "Direction (principal)",
    usedToday: 0,
    ...COLLEGE,
    userCode: "theboss",
    collegeRole: "direction",
    features: [
      ...COLLEGE_BASE_FEATURES,
      "canSeeDirection",
      "canSeeCollegeAdministration",
      "canSeeCollegeVieScolaire",
      "canSeeCollegeAesh",
      "canSeeCollegePersonnels",
    ],
  }),

  college_vie: buildMock({
    mockKey: "college_vie",
    authType: "college",
    plan: "college",
    userLabel: "Vie scolaire",
    usedToday: 1,
    ...COLLEGE,
    userCode: "vie",
    collegeRole: "vie_scolaire",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeVieScolaire"],
  }),

  college_aesh: buildMock({
    mockKey: "college_aesh",
    authType: "college",
    plan: "college",
    userLabel: "AESH",
    usedToday: 1,
    ...COLLEGE,
    userCode: "aesh",
    collegeRole: "aesh",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeAesh"],
  }),

  college_personnels: buildMock({
    mockKey: "college_personnels",
    authType: "college",
    plan: "college",
    userLabel: "Personnels",
    usedToday: 1,
    ...COLLEGE,
    userCode: "perso",
    collegeRole: "personnels",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegePersonnels"],
  }),

  college_administration: buildMock({
    mockKey: "college_administration",
    authType: "college",
    plan: "college",
    userLabel: "Administration",
    usedToday: 1,
    ...COLLEGE,
    userCode: "admin",
    collegeRole: "administration",
    features: [...COLLEGE_BASE_FEATURES, "canSeeCollegeAdministration"],
  }),
};

export function pickAccessMock(input?: string | null): AccessMock {
  const key = (input ?? "").trim() as MockKey;
  if (key && key in ACCESS_MOCKS) return ACCESS_MOCKS[key];
  return ACCESS_MOCKS.email_free;
}


