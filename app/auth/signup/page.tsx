// L'inscription et la connexion par email passent désormais par un seul flux
// unifié sur /auth/signin (entre ton email → reçois un code → complète ton
// profil si c'est un nouveau compte). Cette page ne fait plus que rediriger,
// en conservant l'éventuel ?type= des anciens liens « Je m'inscris ».
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpRedirect() {
  const router = useRouter();

  useEffect(() => {
    // « signup » = une inscription : on garde ?type= et on ajoute
    // inscription=1 (email seul, pas de bloc établissement).
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    if (!params.has("inscription")) params.set("inscription", "1");
    router.replace(`/auth/signin?${params.toString()}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
      <p className="text-sm">Redirection vers la connexion…</p>
    </main>
  );
}
