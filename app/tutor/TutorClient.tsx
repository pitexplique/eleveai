"use client";

import { useState } from "react";

type Mastery = { boMastery: Record<string, number>; notionMastery: Record<string, number> };

export default function TutorClient() {
  const [classe, setClasse] = useState("6e");
  const [matiere, setMatiere] = useState("maths");
  const [notion, setNotion] = useState("fractions");
  const [style, setStyle] = useState<"dys" | "middle" | "challenge">("middle");
  const [enigmes, setEnigmes] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState("");
  const [mastery, setMastery] = useState<Mastery>({ boMastery: {}, notionMastery: {} });

  const startSession = async () => {
    const res = await fetch("/api/tutor/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classe, matiere, notion, style, enigmes }),
    });
    const data = await res.json();
    if (!res.ok) return setFeedback(data.error || "Erreur de démarrage");
    setSessionId(data.sessionId);
    setQuestion(data.question?.text || "");
    setMastery(data.mastery);
    setFeedback("");
  };

  const sendAnswer = async () => {
    const res = await fetch("/api/tutor/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, answer }),
    });
    const data = await res.json();
    if (!res.ok) return setFeedback(data.error || "Erreur d'envoi");
    setFeedback(data.feedback || "");
    setQuestion(data.nextQuestion?.text || "");
    setMastery(data.mastery);
    setAnswer("");
  };

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tuteur IA Maths</h1>
      <div className="grid grid-cols-2 gap-3">
        <input className="border p-2" value={classe} onChange={(e) => setClasse(e.target.value)} placeholder="classe" />
        <input className="border p-2" value={matiere} onChange={(e) => setMatiere(e.target.value)} placeholder="matière" />
        <input className="border p-2" value={notion} onChange={(e) => setNotion(e.target.value)} placeholder="notion" />
        <select className="border p-2" value={style} onChange={(e) => setStyle(e.target.value as "dys" | "middle" | "challenge")}>
          <option value="dys">dys</option>
          <option value="middle">middle</option>
          <option value="challenge">challenge</option>
        </select>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={enigmes} onChange={(e) => setEnigmes(e.target.checked)} /> Énigmes
      </label>

      <button className="bg-black text-white px-4 py-2 rounded" onClick={startSession}>Démarrer</button>

      {sessionId && (
        <section className="space-y-3 border rounded p-4">
          <p><strong>Question :</strong> {question}</p>
          <input className="border p-2 w-full" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Ta réponse" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendAnswer}>Envoyer</button>
          {feedback && <p><strong>Feedback :</strong> {feedback}</p>}
        </section>
      )}

      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold">BO mastery</h2>
          {Object.entries(mastery.boMastery).map(([k, v]) => (
            <div key={k} className="mb-2">
              <div className="text-sm">{k}: {v}%</div>
              <div className="h-2 bg-gray-200 rounded"><div className="h-2 bg-green-500 rounded" style={{ width: `${v}%` }} /></div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Notion mastery</h2>
          {Object.entries(mastery.notionMastery).map(([k, v]) => (
            <div key={k} className="mb-2">
              <div className="text-sm">{k}: {v}%</div>
              <div className="h-2 bg-gray-200 rounded"><div className="h-2 bg-purple-500 rounded" style={{ width: `${v}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
