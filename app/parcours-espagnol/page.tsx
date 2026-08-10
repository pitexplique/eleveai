import type { Metadata } from "next";
import ParcoursEspagnolClient from "./ParcoursEspagnolClient";

export const metadata: Metadata = {
  title: "Parcours Espagnol",
  description:
    "Diagnostique ton vocabulaire espagnol du niveau A1 au B2 : QCM, écoute audio et bilan notion par notion.",
};

export default function ParcoursEspagnolPage() {
  return <ParcoursEspagnolClient />;
}
