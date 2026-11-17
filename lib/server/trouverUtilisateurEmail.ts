// Retrouve le compte Auth d'une adresse email (comptes indépendants).
// Utilisé par /api/code-6-chiffres et par la remise à zéro admin.
import type { SupabaseClient, User } from "@supabase/supabase-js";

export async function trouverUtilisateur(
  admin: SupabaseClient,
  email: string
): Promise<User | null> {
  // 1) Par le profil applicatif (le cas général : auth_user_id rempli).
  const { data: profil } = await admin
    .from("users_email")
    .select("auth_user_id")
    .eq("email", email)
    .maybeSingle();
  if (profil?.auth_user_id) {
    const { data } = await admin.auth.admin.getUserById(profil.auth_user_id);
    if (data?.user) return data.user;
  }
  // 2) Compte Auth sans profil (inscription commencée, jamais finie).
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error || !data?.users?.length) break;
    const u = data.users.find((x) => (x.email ?? "").toLowerCase() === email);
    if (u) return u;
    if (data.users.length < 1000) break;
  }
  return null;
}
