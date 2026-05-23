// app/english-maths/page.tsx

import EnglishMathsClient from "./EnglishMathsClient";

export const metadata = {
  title: "English Maths - EleveAI",
  description: "5 mots de maths en anglais par jour.",
};

export default function EnglishMathsPage() {
  return <EnglishMathsClient />;
}