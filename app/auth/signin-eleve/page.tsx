import { redirect } from "next/navigation";

export default function SignInEleveRedirectPage() {
  redirect("/auth/signin?mode=eleve");
}
