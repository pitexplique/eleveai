import type { Metadata } from "next";
import BilanClient from "./BilanClient";

export const metadata: Metadata = {
  title: "Bilan de la classe",
  robots: { index: false, follow: false },
};

export default function BilanPage() {
  return <BilanClient />;
}
