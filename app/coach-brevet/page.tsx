import type { Metadata } from "next";
import CoachBrevetClient from "./CoachBrevetClient";

export const metadata: Metadata = {
  title: "Coach Brevet Maths",
  description:
    "Sprint 30 jours pour préparer le Brevet des collèges en maths. Automatismes, problèmes guidés et sujets express.",
};

export default function CoachBrevetPage() {
  return <CoachBrevetClient />;
}
