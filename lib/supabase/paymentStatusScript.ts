import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type PaymentStatus = "payant" | "non_payant";

export type PaymentRow = {
  user_id: string;
  has_paid: boolean;
  checked_at?: string;
};

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase non configuré pour le suivi des paiements");
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function upsertPaymentStatus(userId: string, status: PaymentStatus) {
  const supabase = getClient();
  const { error } = await supabase.from("user_payments").upsert({
    user_id: userId,
    has_paid: status === "payant",
    checked_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Erreur lors de l'enregistrement du statut paiement : ${error.message}`);
  }
}

export async function fetchPaymentStatus(userId: string): Promise<PaymentRow | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("user_payments")
    .select("user_id, has_paid, checked_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de récupérer le statut paiement : ${error.message}`);
  }

  return data;
}