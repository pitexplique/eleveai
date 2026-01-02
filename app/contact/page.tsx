// app/contact/page.tsx
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { metadata as pageMetadata } from "./metadata";

export const metadata: Metadata = pageMetadata;

export default function ContactPage() {
  return <ContactClient />;
}





