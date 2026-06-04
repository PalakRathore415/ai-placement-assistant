"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    if (!question) return;

    setAnswer("Thinking...");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-8">
      <nav className="flex justify-between items-center mb-20">
        <h2 className="text-3xl font-bold">PlacementAI</h2>

        <div className="flex gap-8 text-gray-300">
          <a href="#">Home</a>
          <a href="#">Resume</a>
          <a href="#">Practice</a>
          <a href="#">Interview</a>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
          AI Placement <br /> Preparation Assistant 🚀
        </h1>

        <p className="text-gray-300 text-lg max-w-3xl mb-12">
          Prepare smarter with AI-powered resume analysis, coding practice,
          mock interviews, aptitude preparation, and placement guidance —
          all in one platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">📄 Resume Review</h2>
            <p className="text-gray-400">
              Upload your resume and get AI suggestions to improve it.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">💻 Coding Practice</h2>
            <p className="text-gray-400">
              Practice DSA and coding interview questions with AI guidance.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">🎤 Mock Interviews</h2>
            <p className="text-gray-400">
              Prepare for HR and technical interviews interactively.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16 bg-gray-800 rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Ask PlacementAI 🤖
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Ask anything about resumes, interviews, coding rounds, HR questions,
          or placement preparation.
        </p>

        <div className="bg-gray-900 rounded-2xl p-6 mb-4 min-h-40">
          <p className="text-gray-300 whitespace-pre-wrap">
            {answer || "AI response will appear here..."}
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your placement question..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white outline-none"
          />

          <button
            onClick={askAI}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold"
          >
            Ask
          </button>
        </div>
      </section>
    </main>
  );
}