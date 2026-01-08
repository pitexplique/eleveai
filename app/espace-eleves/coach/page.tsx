// app/espace-eleves/coach/page.tsx
import CoachElevesClient from "./CoachElevesClient";

export const dynamic = "force-dynamic";
export { metadata } from "./metadata";

export default function Page() {
  return <CoachElevesClient />;
}
