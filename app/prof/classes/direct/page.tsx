import type { Metadata } from "next";
import EnDirectClient from "./EnDirectClient";

export const metadata: Metadata = {
  title: "En direct",
  robots: { index: false, follow: false },
};

export default function EnDirectPage() {
  return <EnDirectClient />;
}
