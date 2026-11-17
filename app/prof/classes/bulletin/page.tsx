import type { Metadata } from "next";
import BulletinClient from "./BulletinClient";

export const metadata: Metadata = {
  title: "Bulletin de la classe",
  robots: { index: false, follow: false },
};

export default function BulletinPage() {
  return <BulletinClient />;
}
