import { chercher } from "@/lib/matrice/moteur";
const cas: Array<{ label: string; v: any }> = [
  { label: "élève 4e — ÉCONOMIE (chip)", v: { quiEsTu: "4e", classe: null, question: "", chip: "Économie" } },
  { label: "élève 4e — « je comprends pas l'économie »", v: { quiEsTu: "4e", classe: null, question: "je comprends pas l'économie", chip: null } },
  { label: "élève 4e — ESPAGNOL (témoin, matière déclarée)", v: { quiEsTu: "4e", classe: null, question: "", chip: "Espagnol" } },
];
for (const c of cas) {
  const r: any = chercher(c.v);
  console.log("\n── " + c.label + "   [matiere lue = " + (r.lecture?.matiere ?? "aucune") + "]");
  r.recommandations.forEach((x: any, i: number) => {
    const id = String(x.id ?? x.ressource?.id);
    console.log("   " + (i + 1) + ". " + id.padEnd(22) + " " + (x.url ?? x.ressource?.url ?? ""));
  });
}
